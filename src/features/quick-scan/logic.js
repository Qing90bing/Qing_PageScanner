// src/features/quick-scan/logic.js

/**
 * @module QuickScanLogic
 * @description 负责协调静态扫描 Web Worker 的创建、通信和结果处理。
 */

import { loadSettings } from '../settings/logic.js';
import { log } from '../../shared/utils/logger.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';

/**
 * @description 执行一次性的静态页面扫描。
 * @param {string[]} texts - 从 DOM 提取的原始文本数组。
 * @returns {Promise<{formattedText: string, count: number}>} - 返回一个 Promise，
 *          该 Promise 在扫描完成时解析为一个包含格式化文本和计数的对象。
 */
export const performQuickScan = (texts) => {
    return new Promise((resolve, reject) => {
        let worker = null;
        log('[静态扫描] 开始执行...');
        try {
            // eslint-disable-next-line no-undef
            const workerScript = __QUICK_SCAN_WORKER_STRING__;
            const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
            const trustedUrl = createTrustedWorkerUrl(workerUrl);
            worker = new Worker(trustedUrl);
            log('[静态扫描] Web Worker 实例已创建。');

            // 监听来自 Worker 的消息
            worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'scanCompleted') {
                    log(`[静态扫描] 从 Worker 收到处理结果，共 ${payload.count} 条文本。`);
                    resolve(payload); // 解析 Promise 并返回结果
                    worker.terminate(); // 完成任务后立即终止 Worker
                    log('[静态扫描] Worker 已终止。');
                }
            };

            // 监听错误
            worker.onerror = (error) => {
                log(`[静态扫描] Worker 发生错误: ${error.message}`);
                reject(error); // 拒绝 Promise
                worker.terminate();
            };

            // 发送数据到 Worker 开始处理
            const { filterRules, enableDebugLogging } = loadSettings();
            log(`[静态扫描] 向 Worker 发送 ${texts.length} 条文本进行处理...`);
            worker.postMessage({
                type: 'scan',
                payload: { texts, filterRules, enableDebugLogging }
            });

        } catch (e) {
            log(`[静态扫描] Worker 初始化或执行失败: ${e.message}`);
            if (worker) worker.terminate();
            reject(e);
        }
    });
};
