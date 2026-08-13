import { getTranslationObject, t } from '../../shared/i18n/index.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { log } from '../../shared/utils/core/logger.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import * as fallback from './fallback.js';

export function createSessionWorkerController({ state, sessionStore }) {
    const runtime = {
        worker: null,
        summaryCallback: null,
    };

    function emitCount(count) {
        state.currentCount = count;
        if (state.onUpdate) state.onUpdate(count);
        updateScanCount(count, 'session');
    }

    function terminateWorker(workerToTerminate = runtime.worker) {
        if (!workerToTerminate) return;
        workerToTerminate.terminate();
        if (runtime.worker === workerToTerminate) runtime.worker = null;
        runtime.summaryCallback = null;
    }

    function activateFallbackMode(filterRules, initialTexts) {
        if (runtime.worker) terminateWorker();
        state.useFallback = true;
        fallback.initFallback(filterRules);
        if (initialTexts.length === 0) return;
        fallback.processTextsInFallback(initialTexts);
        emitCount(fallback.getCountInFallback());
        sessionStore.save();
    }

    function handleWorkerMessage(event) {
        const { type, payload } = event.data;
        if (type === 'countUpdated') {
            emitCount(payload.count);
            if (payload.newTexts && Array.isArray(payload.newTexts)) {
                sessionStore.addTexts(payload.newTexts);
            }
        } else if (type === 'summaryReady' && runtime.summaryCallback) {
            runtime.summaryCallback(payload, state.currentCount);
            runtime.summaryCallback = null;
        }
    }

    function handleWorkerError(error, filterRules, initialTexts) {
        if (!state.isRecording) return;
        logWorkerFailure(error);
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        activateFallbackMode(filterRules, initialTexts);
    }

    function logWorkerFailure(error) {
        // 让警告路径不依赖具体 Worker 实例，这样 CSP 阻止 Worker 时也能正常记录。
        log(t('log.sessionScan.worker.initFailed'), 'warn');
        if (error?.message) log(t('log.sessionScan.worker.originalError', { error: error.message }), 'debug');
    }

    function start({ initialTexts, settings, workerAllowed }) {
        const { filterRules, enableDebugLogging, outputFormat, includeArrayBrackets, tabSize } = settings;
        state.useFallback = false;

        if (!workerAllowed) {
            logWorkerFailure({ message: t('log.sessionScan.worker.cspBlocked') });
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            activateFallbackMode(filterRules, initialTexts);
            return;
        }

        try {
            runtime.worker = new Worker(trustedWorkerUrl);
            runtime.worker.onmessage = handleWorkerMessage;
            runtime.worker.onerror = (error) => handleWorkerError(error, filterRules, initialTexts);
            runtime.worker.postMessage({
                type: 'session-start',
                payload: {
                    filterRules,
                    enableDebugLogging,
                    outputFormat,
                    includeArrayBrackets,
                    tabSize,
                    translations: {
                        workerLogPrefix: t('log.sessionScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        filterReasons: getTranslationObject('filterReasons'),
                    },
                    initialData: initialTexts,
                },
            });
        } catch (error) {
            logWorkerFailure(error);
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            activateFallbackMode(filterRules, initialTexts);
        }
    }

    function processTexts(textsBatch) {
        if (textsBatch.length === 0) return;
        const logPrefix = '动态新发现';
        if (state.useFallback) {
            if (!fallback.processTextsInFallback(textsBatch, logPrefix)) return;
            const count = fallback.getCountInFallback();
            emitCount(count);
            sessionStore.addTexts(textsBatch);
            sessionStore.save();
        } else if (runtime.worker) {
            runtime.worker.postMessage({
                type: 'session-add-texts',
                payload: { texts: textsBatch },
            });
        }
    }

    function updateSettings(settings) {
        if (!runtime.worker) return;
        runtime.worker.postMessage({
            type: 'update-settings',
            payload: {
                outputFormat: settings.outputFormat,
                includeArrayBrackets: settings.includeArrayBrackets,
                tabSize: settings.tabSize,
            },
        });
    }

    function clear() {
        if (state.useFallback) {
            fallback.clearInFallback();
            emitCount(0);
            return;
        }
        if (runtime.worker) runtime.worker.postMessage({ type: 'session-clear' });
    }

    function requestSummary(onReady) {
        if (!onReady) return;
        if (state.useFallback) {
            onReady(fallback.getSummaryInFallback(), fallback.getCountInFallback());
        } else if (runtime.worker) {
            runtime.summaryCallback = onReady;
            runtime.worker.postMessage({ type: 'session-get-summary' });
        } else {
            onReady('[]', 0);
        }
    }

    function stop(onStopped) {
        if (state.useFallback) {
            const finalCount = fallback.getCountInFallback();
            state.useFallback = false;
            runtime.summaryCallback = null;
            if (onStopped) onStopped(finalCount);
            return;
        }

        const workerToStop = runtime.worker;
        if (!workerToStop) {
            if (onStopped) onStopped(0);
            return;
        }

        if (!onStopped) {
            terminateWorker(workerToStop);
            return;
        }

        const finish = (count) => {
            workerToStop.removeEventListener('message', handleFinalCount);
            workerToStop.removeEventListener('error', handleFinalError);
            workerToStop.terminate();
            if (runtime.worker === workerToStop) runtime.worker = null;
            runtime.summaryCallback = null;
            state.currentCount = count;
            state.useFallback = false;
            onStopped(count);
        };
        const handleFinalCount = (event) => {
            const { type, payload } = event.data;
            if (type === 'countUpdated' && typeof payload.count !== 'undefined') finish(payload.count);
        };
        const handleFinalError = () => finish(state.currentCount);
        workerToStop.addEventListener('message', handleFinalCount);
        workerToStop.addEventListener('error', handleFinalError);
        workerToStop.postMessage({ type: 'session-get-count' });
    }

    return {
        clear,
        dispose: () => terminateWorker(),
        isFallback: () => state.useFallback,
        processTexts,
        requestSummary,
        start,
        stop,
        updateSettings,
    };
}
