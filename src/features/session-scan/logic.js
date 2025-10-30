// src/features/session-scan/logic.js

/**
 * @module core/sessionExtractor
 * @description 负责管理一个持续的文本提取“会话”，将繁重任务委托给 Web Worker。
 */

import { extractAndProcessText } from '../../shared/utils/textProcessor.js';
import { loadSettings } from '../settings/logic.js';
import { appConfig } from '../settings/config.js';
import { log } from '../../shared/utils/logger.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { fire } from '../../shared/utils/eventBus.js';
import * as fallback from './fallback.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';

// --- 模块级变量 ---
let isRecording = false;
let observer = null;
let worker = null;
let useFallback = false; // 新增：用于标记是否使用备选方案
let onSummaryCallback = null; // 存储用于总结的回调
let onUpdateCallback = null; // 新增：存储UI更新回调

// --- MutationObserver 回调 ---
// 根据模式（Worker 或备选方案）处理 DOM 变动的回调
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
                type: 'data',
                payload: { texts: textsBatch, logPrefix }
            });
        }
    }
};

// --- 公开函数 ---

/**
 * 启动会话扫描。
 * @param {Function} onUpdate - 当文本计数更新时调用的UI回调函数。
 */
export const start = (onUpdate) => {
    if (isRecording) return;

    if (worker) worker.terminate();
    onUpdateCallback = onUpdate;
    useFallback = false;
    isRecording = true;

    const { filterRules } = loadSettings();

    // 备选模式激活逻辑
    const activateFallbackMode = (initialTexts) => {
        log(t('log.sessionScan.switchToFallback'), 'warn');
        worker = null;
        useFallback = true;
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });

        fallback.initFallback(filterRules);
        if (fallback.processTextsInFallback(initialTexts)) {
            const count = fallback.getCountInFallback();
            if (onUpdateCallback) onUpdateCallback(count);
            updateScanCount(count, 'session');
        }

        // 在备选模式初始化后启动观察者
        observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });
    };

    const initialTexts = extractAndProcessText();

    try {
        log(t('log.sessionScan.worker.starting'));
        const workerScript = __WORKER_STRING__;
        const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
        const trustedUrl = createTrustedWorkerUrl(workerUrl);
        worker = new Worker(trustedUrl);

        worker.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'countUpdated') {
                if (onUpdateCallback) onUpdateCallback(payload);
                updateScanCount(payload, 'session');
            } else if (type === 'summaryReady' && onSummaryCallback) {
                onSummaryCallback(payload);
                onSummaryCallback = null;
            }
        };

        worker.onerror = (error) => {
            log(t('log.sessionScan.worker.initFailed'), 'warn');
            log(t('log.sessionScan.worker.originalError', { error: error.message }), 'debug');
            if (worker) worker.terminate();
            activateFallbackMode(initialTexts);
        };

        worker.postMessage({
            type: 'init',
            payload: {
                filterRules,
                translations: {
                    workerLogPrefix: t('log.sessionScan.worker.logPrefix'),
                    textFiltered: t('log.textProcessor.filtered'),
                },
            },
        });
        // 初始扫描不带 logPrefix
        worker.postMessage({ type: 'data', payload: { texts: initialTexts } });
        log(t('log.sessionScan.worker.initialized', { count: initialTexts.length }));

    } catch (e) {
        // 同步错误（如浏览器不支持 Worker）
        log(t('log.sessionScan.worker.initSyncError', { error: e.message }), 'error');
        activateFallbackMode(initialTexts);
    }

    // 只有在 Worker 模式成功初始化时，才在这里启动观察者
    if (!useFallback) {
        observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });
    }
};

/**
 * 停止会话扫描的监听，但保留 Worker 和数据以供总结。
 * @param {Function} onStopped - 停止后执行的回调，用于获取最终计数值。
 */
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
    onUpdateCallback = null; // 清除回调

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
            worker.postMessage({ type: 'getCount' });
        } else {
            onStopped(0);
        }
    }
};

/**
 * 请求文本总结。
 * @param {Function} onReady - 当总结文本准备好时调用的回调函数。
 */
export const requestSummary = (onReady) => {
    if (!onReady) return;

    if (useFallback) {
        onReady(fallback.getSummaryInFallback());
    } else if (worker) {
        onSummaryCallback = onReady;
        worker.postMessage({ type: 'getSummary' });
    } else {
        onReady("[]");
    }
};

export const isSessionRecording = () => isRecording;

/**
 * @description 清空会话期间收集的所有文本。
 */
export function clearSessionTexts() {
    if (useFallback) {
        fallback.clearInFallback();
        if (onUpdateCallback) onUpdateCallback(0);
        updateScanCount(0, 'session');
        fire('sessionCleared'); // 触发事件
    } else if (worker) {
        worker.postMessage({ type: 'clear' });
        // Worker 在清空后会发送一个 countUpdated 消息，其中 payload 为 0
        // 这会触发 onUpdateCallback 和 updateScanCount，所以我们不需要在这里重复
        log(t('log.sessionScan.worker.clearCommandSent'));
    }
}
