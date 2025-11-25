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
import { debounce } from '../../shared/utils/debounce.js';
import { EVENT_BUS, WORKER_MESSAGES } from '../../shared/constants/events.js';
import * as fallback from './fallback.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { saveActiveSession, clearActiveSession, enablePersistence } from '../../shared/services/sessionPersistence.js';

// --- 模块级变量 ---
const STATE = {
    IDLE: 'idle',
    RECORDING: 'recording',
    PAUSED: 'paused',
};

const sessionState = {
    status: STATE.IDLE,
    observer: null,
    worker: null,
    useFallback: false,
    onSummaryCallback: null,
    onUpdateCallback: null,
    currentCount: 0,
    cachedTexts: [],
};

let autoSaveInterval = null; // 自动保存定时器

// --- 事件监听 ---
on(EVENT_BUS.CLEAR_SESSION_SCAN, () => {
    clearSessionData();
});

// --- MutationObserver 回调 ---
const handleMutations = debounce((mutations) => {
    if (sessionState.status !== STATE.RECORDING) return; // 防止停止后处理残留的 mutation
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
        if (sessionState.useFallback) {
            if (fallback.processTextsInFallback(textsBatch, logPrefix)) {
                const count = fallback.getCountInFallback();
                if (sessionState.onUpdateCallback) sessionState.onUpdateCallback(count);
                updateScanCount(count, 'session');
                saveActiveSession('session-scan'); // 立即保存变更
            }
        } else if (sessionState.worker) {
            sessionState.worker.postMessage({
                type: WORKER_MESSAGES.SESSION_ADD_TEXTS,
                payload: { texts: textsBatch }
            });
        }
    }
}, appConfig.session.mutationDebounceMs);

/**
 * @private
 * @description 清空会话期间收集的所有文本。
 */
function clearSessionData() {
    sessionState.currentCount = 0; // 重置计数值
    saveActiveSession('session-scan', []); // 保存清空后的状态

    if (sessionState.useFallback) {
        fallback.clearInFallback();
        if (sessionState.onUpdateCallback) sessionState.onUpdateCallback(0);
        updateScanCount(0, 'session');
        fire(EVENT_BUS.SESSION_CLEARED); // 触发事件
    } else if (sessionState.worker) {
        sessionState.worker.postMessage({ type: WORKER_MESSAGES.SESSION_CLEAR });
        log(t('log.sessionScan.worker.clearCommandSent'));
    }
}

// --- 公开函数 ---

export const start = async (onUpdate, resumedData = null) => {
    if (sessionState.status !== STATE.IDLE) return;

    // --- 1. 彻底清理旧状态 ---
    if (sessionState.worker) {
        sessionState.worker.terminate();
        sessionState.worker = null;
    }
    if (sessionState.observer) {
        sessionState.observer.disconnect();
        sessionState.observer = null;
    }
    
    // --- 2. 初始化本次会话的状态 ---
    sessionState.currentCount = 0;
    sessionState.onUpdateCallback = onUpdate;
    sessionState.useFallback = false;
    sessionState.status = STATE.RECORDING;
    sessionState.cachedTexts = [];

    // --- 3. 加载初始数据和设置 ---
    const [initialTexts, settings, workerAllowed] = await Promise.all([
        extractAndProcessText(),
        loadSettings(),
        isWorkerAllowed()
    ]);

    // 在数据加载和初始保存之前，明确启用持久化
    enablePersistence();

    if (resumedData && Array.isArray(resumedData)) {
        resumedData.forEach(text => {
            initialTexts.push(text);
        });
    }
    const { filterRules, enableDebugLogging } = settings;

    // --- 4. 定义后备模式激活函数 ---
    const activateFallbackMode = () => {
        log(t('log.sessionScan.switchToFallback'), 'warn');
        if (sessionState.worker) {
            sessionState.worker.terminate();
            sessionState.worker = null;
        }
        sessionState.useFallback = true;
        
        fallback.initFallback(filterRules);
        if (initialTexts.length > 0) {
            fallback.processTextsInFallback(initialTexts);
            const count = fallback.getCountInFallback();
            if (sessionState.onUpdateCallback) sessionState.onUpdateCallback(count);
            updateScanCount(count, 'session');
            saveActiveSession('session-scan'); // 初始化后保存
        }
    };

    // --- 5. 尝试启动 Web Worker ---
    if (workerAllowed) {
        try {
            log(t('log.sessionScan.worker.starting'));
            sessionState.worker = new Worker(trustedWorkerUrl);

            sessionState.worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === WORKER_MESSAGES.COUNT_UPDATED) {
                    sessionState.currentCount = payload.count;
                    if (sessionState.onUpdateCallback) sessionState.onUpdateCallback(payload.count);
                    updateScanCount(payload.count, 'session');
                } else if (type === WORKER_MESSAGES.SESSION_SYNC_DATA) {
                    sessionState.cachedTexts = payload.texts;
                } else if (type === WORKER_MESSAGES.SUMMARY_READY && sessionState.onSummaryCallback) {
                    sessionState.onSummaryCallback(payload, sessionState.currentCount);
                    sessionState.onSummaryCallback = null;
                }
            };

            sessionState.worker.onerror = (error) => {
                log(t('log.sessionScan.worker.initFailed'), 'warn');
                log(t('log.sessionScan.worker.originalError', { error: error.message }), 'debug');
                showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
                activateFallbackMode();
            };

            sessionState.worker.postMessage({
                type: WORKER_MESSAGES.SESSION_START,
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
    sessionState.observer = new MutationObserver(handleMutations);
    sessionState.observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('beforeunload', handleSessionScanUnload);

    // 启动自动保存心跳，确保时间戳刷新
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    autoSaveInterval = setInterval(() => {
        if (sessionState.status === STATE.RECORDING) {
            const dataToSave = sessionState.useFallback
                ? fallback.getAllTextsInFallback()
                : sessionState.cachedTexts;
            saveActiveSession('session-scan', dataToSave);
        }
    }, appConfig.session.autoSaveIntervalMs);

    // 立即保存一次以初始化会话
    const initialDataToSave = sessionState.useFallback
        ? fallback.getAllTextsInFallback()
        : sessionState.cachedTexts;
    saveActiveSession('session-scan', initialDataToSave);

    log(t('log.sessionScan.domObserver.started'));
};

const handleSessionScanUnload = () => {
    if (sessionState.status !== STATE.IDLE) {
        const dataToSave = sessionState.useFallback
            ? fallback.getAllTextsInFallback()
            : sessionState.cachedTexts;
        saveActiveSession('session-scan', dataToSave);
    }
};

export const stop = (onStopped) => {
    if (sessionState.status === STATE.IDLE) {
        if (onStopped) onStopped(0);
        return;
    }

    log(t('log.sessionScan.domObserver.stopped'));
    if (sessionState.observer) {
        sessionState.observer.disconnect();
        sessionState.observer = null;
    }
    window.removeEventListener('beforeunload', handleSessionScanUnload);

    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }

    clearActiveSession();
    sessionState.status = STATE.IDLE;
    sessionState.onUpdateCallback = null;

    if (onStopped) {
        if (sessionState.useFallback) {
            onStopped(fallback.getCountInFallback());
        } else if (sessionState.worker) {
            const finalCountListener = (event) => {
                const { type, payload } = event.data;
                if (type === WORKER_MESSAGES.COUNT_UPDATED && typeof payload.count !== 'undefined') {
                    onStopped(payload.count);
                    sessionState.worker.removeEventListener('message', finalCountListener);
                }
            };
            sessionState.worker.addEventListener('message', finalCountListener);
            sessionState.worker.postMessage({ type: WORKER_MESSAGES.SESSION_GET_COUNT });
        } else {
            onStopped(0);
        }
    }
};

export const requestSummary = (onReady) => {
    if (!onReady) return;

    if (sessionState.useFallback) {
        const summaryText = fallback.getSummaryInFallback();
        const summaryCount = fallback.getCountInFallback();
        onReady(summaryText, summaryCount);
    } else if (sessionState.worker) {
        sessionState.onSummaryCallback = onReady;
        sessionState.worker.postMessage({ type: WORKER_MESSAGES.SESSION_GET_SUMMARY });
    } else {
        onReady("[]", 0);
    }
};

export const isSessionRecording = () => sessionState.status === STATE.RECORDING || sessionState.status === STATE.PAUSED;

export const pauseSessionScan = () => {
    if (sessionState.status !== STATE.RECORDING) return;
    sessionState.status = STATE.PAUSED;
    showNotification(t('notifications.sessionScanPaused'), { type: 'info' });
    if (sessionState.observer) {
        sessionState.observer.disconnect();
    }
};

export const resumeSessionScan = () => {
    if (sessionState.status !== STATE.PAUSED) return;
    sessionState.status = STATE.RECORDING;
    showNotification(t('notifications.sessionScanContinued'), { type: 'success' });
    if (sessionState.observer) {
        sessionState.observer.observe(document.body, { childList: true, subtree: true });
    }
};
