// src/features/quick-scan/logic.js

/**
 * @module QuickScanLogic
 * @description 负责协调静态扫描 Web Worker 的创建、通信和结果处理。
 */

import { loadSettings } from '../settings/logic.js';
import { log } from '../../shared/utils/logger.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';
import { performScanInMainThread } from './fallback.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';

/**
 * @description 执行一次性的静态页面扫描。
 * @param {string[]} texts - 从 DOM 提取的原始文本数组。
 * @returns {Promise<{formattedText: string, count: number}>} - 返回一个 Promise，
 *          该 Promise 在扫描完成时解析为一个包含格式化文本和计数的对象。
 */
export const performQuickScan = (texts) => {
    return new Promise((resolve, reject) => {
        const { filterRules, enableDebugLogging } = loadSettings();

        // 备选方案逻辑
        const runFallback = () => {
            log('[静态扫描] 切换到主线程备选方案。');
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            try {
                const result = performScanInMainThread(texts, filterRules, enableDebugLogging);
                updateScanCount(result.count, 'static');
                resolve(result);
            } catch (fallbackError) {
                log(`[静态扫描] 主线程备选方案失败: ${fallbackError.message}`, 'error');
                reject(fallbackError);
            }
        };

        try {
            log('[静态扫描] 开始执行，尝试使用 Web Worker...');
            const workerScript = __QUICK_SCAN_WORKER_STRING__;
            const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
            const trustedUrl = createTrustedWorkerUrl(workerUrl);
            const worker = new Worker(trustedUrl);

            worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'scanCompleted') {
                    log(`[静态扫描] Worker 处理成功，收到 ${payload.count} 条文本。`);
                    updateScanCount(payload.count, 'static');
                    resolve(payload);
                    worker.terminate();
                }
            };

            worker.onerror = (error) => {
                log('[静态扫描] Worker 初始化失败。这很可能是由于网站的内容安全策略（CSP）阻止了脚本。', 'warn');
                log(`[静态扫描] 原始错误: ${error.message}`, 'debug');
                worker.terminate();
                runFallback();
            };

            // 只有在 onerror 没有立即触发的情况下，这些日志才有意义
            log(`[静态扫描] Web Worker 已创建，正在发送 ${texts.length} 条文本进行处理...`);
            worker.postMessage({
                type: 'scan',
                payload: { texts, filterRules, enableDebugLogging }
            });

        } catch (e) {
            // 同步错误（例如，如果浏览器完全不支持 Worker）
            log(`[静态扫描] Worker 初始化时发生同步错误: ${e.message}`, 'error');
            runFallback();
        }
    });
};
