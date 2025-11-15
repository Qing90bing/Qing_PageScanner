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
import { saveActiveSession, clearActiveSession } from '../../shared/services/sessionPersistence.js';

// --- 模块级变量 ---
let isRecording = false;
let isPaused = false;
let observer = null;
let worker = null;
let useFallback = false;
let onSummaryCallback = null;
let onUpdateCallback = null;
let currentCount = 0; // 新增：在模块级别跟踪计数值
let sessionTextsMirror = new Set(); // 主线程数据镜像

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
    sessionTextsMirror.clear();
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

export const start = async (onUpdate, resumedData = null) => {
    if (isRecording) return;

    // --- 1. 彻底清理旧状态 ---
    isPaused = false;
    if (worker) {
        worker.terminate();
        worker = null;
    }
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    
    // --- 2. 初始化本次会话的状态 ---
    currentCount = 0;
    sessionTextsMirror.clear();
    onUpdateCallback = onUpdate;
    useFallback = false;
    isRecording = true;

    // --- 3. 加载初始数据和设置 ---
    const [initialTexts, settings, workerAllowed] = await Promise.all([
        extractAndProcessText(),
        loadSettings(),
        isWorkerAllowed()
    ]);

    if (resumedData && Array.isArray(resumedData)) {
        resumedData.forEach(text => {
            initialTexts.push(text);
            sessionTextsMirror.add(text);
        });
    }
    const { filterRules, enableDebugLogging } = settings;

    // --- 4. 定义后备模式激活函数 ---
    const activateFallbackMode = () => {
        log(t('log.sessionScan.switchToFallback'), 'warn');
        if (worker) {
            worker.terminate();
            worker = null;
        }
        useFallback = true;
        
        fallback.initFallback(filterRules);
        if (initialTexts.length > 0) {
            fallback.processTextsInFallback(initialTexts);
            const count = fallback.getCountInFallback();
            if (onUpdateCallback) onUpdateCallback(count);
            updateScanCount(count, 'session');
        }
    };

    // --- 5. 尝试启动 Web Worker ---
    if (workerAllowed) {
        try {
            log(t('log.sessionScan.worker.starting'));
            worker = new Worker(trustedWorkerUrl);

            worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'countUpdated') {
                    currentCount = payload.count;
                    if (onUpdateCallback) onUpdateCallback(payload.count);
                    updateScanCount(payload.count, 'session');

                    if (payload.newTexts && Array.isArray(payload.newTexts)) {
                        payload.newTexts.forEach(text => sessionTextsMirror.add(text));
                    }
                } else if (type === 'summaryReady' && onSummaryCallback) {
                    onSummaryCallback(payload, currentCount);
                    onSummaryCallback = null;
                }
            };

            worker.onerror = (error) => {
                log(t('log.sessionScan.worker.initFailed'), 'warn');
                log(t('log.sessionScan.worker.originalError', { error: error.message }), 'debug');
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
                    initialData: initialTexts
                },
            });
            log(t('log.sessionScan.worker.initialized', { count: initialTexts.length }));

        } catch (e) {
            log(t('log.sessionScan.worker.initSyncError', { error: e.message }), 'error');
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            activateFallbackMode();
        }
    } else {
        log(t('log.sessionScan.worker.cspBlocked'), 'warn');
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        activateFallbackMode();
    }

    // --- 6. 统一启动 MutationObserver ---
    // 无论之前的路径如何（成功、CSP阻塞、同步/异步失败），
    // 都在这里统一、安全地启动 DOM 监听。
    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('beforeunload', handleSessionScanUnload);
    log(t('log.sessionScan.domObserver.started'));
};

const handleSessionScanUnload = () => {
    saveActiveSession('session-scan');
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
    window.removeEventListener('beforeunload', handleSessionScanUnload);
    clearActiveSession();
    isRecording = false;
    isPaused = false;
    sessionTextsMirror.clear();
    onUpdateCallback = null;

    if (onStopped) {
        if (useFallback) {
            onStopped(fallback.getCountInFallback());
        } else if (worker) {
            const finalCountListener = (event) => {
                const { type, payload } = event.data;
                if (type === 'countUpdated' && typeof payload.count !== 'undefined') {
                    onStopped(payload.count);
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

export const getSessionTexts = () => {
    return sessionTextsMirror;
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

export const pauseSessionScan = () => {
    if (!isRecording || isPaused) return;
    isPaused = true;
    showNotification(t('notifications.sessionScanPaused'), { type: 'info' });
    if (observer) {
        observer.disconnect();
    }
};

export const resumeSessionScan = () => {
    if (!isRecording || !isPaused) return;
    isPaused = false;
    showNotification(t('notifications.sessionScanResumed'), { type: 'success' });
    if (observer) {
        observer.observe(document.body, { childList: true, subtree: true });
    }
};
