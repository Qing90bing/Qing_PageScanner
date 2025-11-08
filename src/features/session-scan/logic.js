// src/features/session-scan/logic.js

/**
 * @module core/sessionExtractor
 * @description 负责管理一个持续的文本提取“会话”，将繁重任务委托给 Web Worker。
 */

import { extractAndProcessText } from '../../shared/utils/textProcessor.js';
import { loadSettings } from '../settings/logic.js';
import { appConfig } from '../settings/config.js';
import { log } from '../../shared/utils/logger.js';
import { isWorkerAllowed } from '../../shared/utils/csp-checker.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
import { fire, on } from '../../shared/utils/eventBus.js';
import * as fallback from './fallback.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';

// --- 模块级变量 ---
let isRecording = false;
let observer = null;
let worker = null;
let useFallback = false;
let onSummaryCallback = null;
let onUpdateCallback = null;
let currentCount = 0; // 新增：在模块级别跟踪计数值

// --- 事件监听 ---
on('clearSessionScan', () => {
    clearSessionData();
});

// --- MutationObserver 回调 ---
const handleMutations = (mutations) => {
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
    const textsBatch = [];

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE || node.closest(ignoredSelectorString)) return;

            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                if (walker.currentNode.nodeValue) {
                    textsBatch.push(walker.currentNode.nodeValue);
                }
            }
        });
    });

    if (textsBatch.length > 0) {
        const logPrefix = '动态新发现';
        if (useFallback) {
            if (fallback.processTextsInFallback(textsBatch, logPrefix)) {
                const count = fallback.getCountInFallback();
                if (onUpdateCallback) onUpdateCallback(count);
                updateScanCount(count, 'session');
            }
        } else if (worker) {
            worker.postMessage({
                type: 'session-add-texts',
                payload: { texts: textsBatch }
            });
        }
    }
};

/**
 * @private
 * @description 清空会话期间收集的所有文本。
 */
function clearSessionData() {
    currentCount = 0; // 重置计数值
    if (useFallback) {
        fallback.clearInFallback();
        if (onUpdateCallback) onUpdateCallback(0);
        updateScanCount(0, 'session');
        fire('sessionCleared'); // 触发事件
    } else if (worker) {
        worker.postMessage({ type: 'session-clear' });
        log(t('log.sessionScan.worker.clearCommandSent'));
    }
}

// --- 公开函数 ---

export const start = async (onUpdate) => {
    if (isRecording) return;

    if (worker) worker.terminate();
    currentCount = 0;
    onUpdateCallback = onUpdate;
    useFallback = false;
    isRecording = true;

    const [initialTexts, settings, workerAllowed] = await Promise.all([
        extractAndProcessText(),
        loadSettings(),
        isWorkerAllowed()
    ]);

    const { filterRules, enableDebugLogging } = settings;

    const activateFallbackMode = () => {
        log(t('log.sessionScan.switchToFallback'), 'warn');
        worker = null;
        useFallback = true;

        fallback.initFallback(filterRules);
        fallback.processTextsInFallback(initialTexts);
        const count = fallback.getCountInFallback();
        if (onUpdateCallback) onUpdateCallback(count);
        updateScanCount(count, 'session');

        observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (!workerAllowed) {
        log(t('log.sessionScan.worker.cspBlocked'), 'warn');
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        activateFallbackMode();
        return;
    }

    try {
        log(t('log.sessionScan.worker.starting'));
        worker = new Worker(trustedWorkerUrl);

        worker.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'countUpdated') {
                currentCount = payload; // 更新模块内的计数值
                if (onUpdateCallback) onUpdateCallback(payload);
                updateScanCount(payload, 'session');
            } else if (type === 'summaryReady' && onSummaryCallback) {
                // Worker只返回文本(payload)，我们使用模块内跟踪的计数值
                onSummaryCallback(payload, currentCount);
                onSummaryCallback = null;
            }
        };

        worker.onerror = (error) => {
            log(t('log.sessionScan.worker.initFailed'), 'warn');
            log(t('log.sessionScan.worker.originalError', { error: error.message }), 'debug');
            if (worker) worker.terminate();
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            activateFallbackMode();
        };

        worker.postMessage({
            type: 'session-start',
            payload: {
                filterRules,
                enableDebugLogging,
                translations: {
                    workerLogPrefix: t('log.sessionScan.worker.logPrefix'),
                    textFiltered: t('log.textProcessor.filtered'),
                    filterReasons: getTranslationObject('filterReasons'),
                },
            },
        });
        worker.postMessage({ type: 'session-add-texts', payload: { texts: initialTexts } });
        log(t('log.sessionScan.worker.initialized', { count: initialTexts.length }));

    } catch (e) {
        log(t('log.sessionScan.worker.initSyncError', { error: e.message }), 'error');
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        activateFallbackMode();
    }

    if (!useFallback) {
        observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

export const stop = (onStopped) => {
    if (!isRecording) {
        if (onStopped) onStopped(0);
        return;
    }

    log(t('log.sessionScan.domObserver.stopped'));
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    isRecording = false;
    onUpdateCallback = null;

    if (onStopped) {
        if (useFallback) {
            onStopped(fallback.getCountInFallback());
        } else if (worker) {
            const finalCountListener = (event) => {
                if (event.data.type === 'countUpdated') {
                    onStopped(event.data.payload);
                    worker.removeEventListener('message', finalCountListener);
                }
            };
            worker.addEventListener('message', finalCountListener);
            worker.postMessage({ type: 'session-get-count' });
        } else {
            onStopped(0);
        }
    }
};

export const requestSummary = (onReady) => {
    if (!onReady) return;

    if (useFallback) {
        const summaryText = fallback.getSummaryInFallback();
        const summaryCount = fallback.getCountInFallback();
        onReady(summaryText, summaryCount);
    } else if (worker) {
        onSummaryCallback = onReady;
        worker.postMessage({ type: 'session-get-summary' });
    } else {
        onReady("[]", 0);
    }
};

export const isSessionRecording = () => isRecording;
