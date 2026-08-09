import { filterAndNormalizeTexts } from '../../shared/utils/text/textProcessor.js';
import { isWorkerAllowed } from '../../shared/utils/core/csp-checker.js';
import { log } from '../../shared/utils/core/logger.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';

let workerInstance = null;
let fallbackNotificationShown = false;

function runFallback(texts, settings) {
    log(t('log.elementScan.worker.fallback'), 'info');
    if (!fallbackNotificationShown) {
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        fallbackNotificationShown = true;
    }

    const logFiltered = (text, reason) => {
        log(t('log.textProcessor.filtered', { text, reason }));
    };
    return filterAndNormalizeTexts(texts, settings.filterRules, settings.enableDebugLogging, logFiltered);
}

export function resetTextFilterState() {
    fallbackNotificationShown = false;
}

export function terminateTextFilterWorker() {
    if (!workerInstance) return;
    workerInstance.terminate();
    workerInstance = null;
    log(t('log.elementScan.worker.terminated'));
}

export async function filterTextsWithWorker(texts, settings) {
    const workerAllowed = await isWorkerAllowed();
    if (!workerAllowed) {
        log(t('log.elementScan.worker.cspBlocked'), 'warn');
        return runFallback(texts, settings);
    }

    return new Promise((resolve) => {
        try {
            if (!workerInstance) {
                log(t('log.elementScan.worker.initializing'), 'info');
                workerInstance = new Worker(trustedWorkerUrl);
            }

            // 元素扫描请求串行执行，因此可以复用 Worker 的消息处理器。
            workerInstance.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'textsFiltered') resolve(payload.texts);
            };

            workerInstance.onerror = () => {
                log(t('log.elementScan.worker.runtimeError'), 'warn');
                workerInstance.terminate();
                workerInstance = null;
                resolve(runFallback(texts, settings));
            };

            workerInstance.postMessage({
                type: 'filter-texts',
                payload: {
                    texts,
                    filterRules: settings.filterRules,
                    enableDebugLogging: settings.enableDebugLogging,
                    translations: {
                        workerLogPrefix: t('log.elementScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        filterReasons: getTranslationObject('filterReasons'),
                    },
                },
            });
        } catch (error) {
            log(t('log.elementScan.worker.initSyncError', { error: error.message }), 'error');
            resolve(runFallback(texts, settings));
        }
    });
}
