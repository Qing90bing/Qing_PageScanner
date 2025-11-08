// src/features/quick-scan/logic.js

/**
 * @module QuickScanLogic
 * @description 负责协调静态扫描 Web Worker 的创建、通信和结果处理。
 */

import { loadSettings } from '../settings/logic.js';
import { log } from '../../shared/utils/logger.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';
import { performScanInMainThread } from './fallback.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
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
            log(t('log.quickScan.switchToFallback'));
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            try {
                const result = performScanInMainThread(texts, filterRules, enableDebugLogging);
                updateScanCount(result.count, 'static');
                resolve(result);
            } catch (fallbackError) {
                log(t('log.quickScan.fallbackFailed', { error: fallbackError.message }), 'error');
                reject(fallbackError);
            }
        };

        try {
            log(t('log.quickScan.worker.starting'));
            const worker = new Worker(trustedWorkerUrl);

            worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'scanCompleted') {
                    log(t('log.quickScan.worker.completed', { count: payload.count }));
                    updateScanCount(payload.count, 'static');
                    resolve(payload);
                    worker.terminate();
                }
            };

            worker.onerror = (error) => {
                log(t('log.quickScan.worker.initFailed'), 'warn');
                log(t('log.quickScan.worker.originalError', { error: error.message }), 'debug');
                worker.terminate();
                runFallback();
            };

            // 只有在 onerror 没有立即触发的情况下，这些日志才有意义
            log(t('log.quickScan.worker.sendingData', { count: texts.length }));
            worker.postMessage({
                type: 'process-single',
                payload: {
                    texts,
                    filterRules,
                    enableDebugLogging,
                    translations: {
                        workerLogPrefix: t('log.quickScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        scanComplete: t('log.quickScan.worker.completed'),
                        filterReasons: getTranslationObject('filterReasons'),
                    },
                },
            });

        } catch (e) {
            // 同步错误（例如，如果浏览器完全不支持 Worker）
            log(t('log.quickScan.worker.initSyncError', { error: e.message }), 'error');
            runFallback();
        }
    });
};
