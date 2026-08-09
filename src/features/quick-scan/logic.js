// src/features/quick-scan/logic.js

/**
 * @module QuickScanLogic
 * @description 负责协调静态扫描 Web Worker 的创建、通信和结果处理。
 */

import { loadSettings } from '../../shared/services/settings.js';
import { log } from '../../shared/utils/core/logger.js';
import { isWorkerAllowed } from '../../shared/utils/core/csp-checker.js';
import { formatTextsForTranslation } from '../../shared/utils/text/formatting.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { extractAndProcessText, filterAndNormalizeTexts } from '../../shared/utils/text/textProcessor.js';

/**
 * @description 执行一次性的静态页面扫描。
 * @returns {Promise<{formattedText: string, count: number}>} - 返回一个 Promise，
 *          该 Promise 在扫描完成时解析为一个包含格式化文本和计数的对象。
 */
export const performQuickScan = async () => {
    const { filterRules, enableDebugLogging, outputFormat, includeArrayBrackets } = loadSettings();

    // 并行执行文本提取和 CSP 检查
    const [texts, workerAllowed] = await Promise.all([extractAndProcessText(), isWorkerAllowed()]);

    const runFallback = () => {
        log(t('log.quickScan.switchToFallback'));
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        const logFiltered = (text, reason) => {
            log(t('log.textProcessor.filtered', { text, reason }));
        };

        const filteredTexts = filterAndNormalizeTexts(texts, filterRules, enableDebugLogging, logFiltered);
        const formattedText = formatTextsForTranslation(filteredTexts, outputFormat, { includeArrayBrackets });
        const result = { formattedText, count: filteredTexts.length };
        updateScanCount(result.count, 'static');
        return result;
    };

    if (!workerAllowed) {
        log(t('log.quickScan.worker.cspBlocked'), 'warn');
        return runFallback();
    }

    return new Promise((resolve) => {
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
                resolve(runFallback());
            };

            log(t('log.quickScan.worker.sendingData', { count: texts.length }));
            worker.postMessage({
                type: 'process-single',
                payload: {
                    texts,
                    filterRules,
                    enableDebugLogging,
                    outputFormat,
                    includeArrayBrackets,
                    translations: {
                        workerLogPrefix: t('log.quickScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        scanComplete: t('log.quickScan.worker.completed'),
                        filterReasons: getTranslationObject('filterReasons'),
                    },
                },
            });
        } catch (error) {
            log(t('log.quickScan.worker.initSyncError', { error: error.message }), 'error');
            resolve(runFallback());
        }
    });
};
