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

// --- 模块级变量 ---
let isRecording = false;
let observer = null;
let worker = null;
let onSummaryCallback = null; // 存储用于总结的回调

// --- MutationObserver 回调 ---
// 主线程的回调现在只负责收集原始文本并发送给 Worker
const handleMutations = (mutations) => {
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
    const textsBatch = [];

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            // 只处理元素节点
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            // 跳过被忽略的元素
            if (node.closest(ignoredSelectorString)) return;

            // 使用 TreeWalker 高效遍历所有文本节点
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                const textNode = walker.currentNode;
                if (textNode.nodeValue) {
                    textsBatch.push(textNode.nodeValue);
                }
            }
        });
    });

    if (textsBatch.length > 0 && worker) {
        // 将收集到的文本批量发送给 Worker
        worker.postMessage({ type: 'data', payload: textsBatch });
    }
};

// --- 公开函数 ---

/**
 * 启动会话扫描。
 * @param {Function} onUpdate - 当文本计数更新时调用的UI回调函数。
 */
export const start = (onUpdate) => {
    if (isRecording) return;

    // 如果已存在一个 worker 实例（来自上一次未被清除的会话），先终止它
    if (worker) {
        worker.terminate();
    }

    log('会话扫描：启动 Worker 并开始初始扫描...');
    isRecording = true;

    // 创建并初始化 Worker
    try {
        // eslint-disable-next-line no-undef
        const workerScript = __WORKER_STRING__;
        const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
        const trustedUrl = createTrustedWorkerUrl(workerUrl);
        worker = new Worker(trustedUrl);

        // 设置 Worker 的消息监听器
        worker.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'countUpdated' && onUpdate) {
                onUpdate(payload); // 更新UI计数器
            } else if (type === 'summaryReady' && onSummaryCallback) {
                onSummaryCallback(payload); // 提供总结数据
                onSummaryCallback = null; // 一次性回调
            }
        };

        worker.onerror = (error) => {
            console.error('Worker error:', error);
            log(`[会话扫描] Worker 发生错误: ${error.message}`);
            // 可以在这里通知UI
            stop(); // 出现错误时停止会话
        };

        // 向 Worker 发送初始化配置
        const { filterRules } = loadSettings();
        worker.postMessage({ type: 'init', payload: { filterRules } });

        // 执行初始页面扫描
        const initialTexts = extractAndProcessText();
        worker.postMessage({ type: 'data', payload: initialTexts });
        log(`[会话扫描] 已发送 ${initialTexts.length} 条初始文本到 Worker。`);

        // 启动 MutationObserver
        observer = new MutationObserver(handleMutations);
        observer.observe(document.body, { childList: true, subtree: true });

    } catch (e) {
        console.error('Failed to initialize web worker:', e);
        log(`[会话扫描] Worker 初始化失败: ${e.message}`);
        isRecording = false;
        worker = null;
    }
};

/**
 * 停止会话扫描的监听，但保留 Worker 和数据以供总结。
 * @param {Function} onStopped - 停止后执行的回调，用于获取最终计数值。
 */
export const stop = (onStopped) => {
    if (!isRecording) {
        if (onStopped) onStopped(0); // 如果未在录制，返回0
        return;
    }

    log('[会话扫描] 已停止监听 DOM 变化。');
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    isRecording = false;

    // 请求最终的计数值
    if (onStopped && worker) {
        // 使用一次性的消息监听器来获取最终计数
        const finalCountListener = (event) => {
            if (event.data.type === 'countUpdated') {
                onStopped(event.data.payload);
                worker.removeEventListener('message', finalCountListener);
            }
        };
        worker.addEventListener('message', finalCountListener);
        // 触发一次计数更新请求
        worker.postMessage({ type: 'getCount' });
    } else if (onStopped) {
        onStopped(0);
    }
};

/**
 * 请求文本总结。
 * @param {Function} onReady - 当总结文本准备好时调用的回调函数。
 */
export const requestSummary = (onReady) => {
    if (worker && onReady) {
        onSummaryCallback = onReady;
        worker.postMessage({ type: 'getSummary' });
    } else if (onReady) {
        // 如果 worker 不存在，立即用空结果调用回调
        onReady("[]");
    }
};

export const isSessionRecording = () => isRecording;

/**
 * @description 请求 Worker 清空会话期间收集的所有文本。
 */
export function clearSessionTexts() {
    if (worker) {
        worker.postMessage({ type: 'clear' });
        log('[会话扫描] 已向 Worker 发送清空指令。');
    }
}
