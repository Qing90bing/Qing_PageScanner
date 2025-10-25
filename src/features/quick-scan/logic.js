// src/features/quick-scan/logic.js

/**
 * @module QuickScanLogic
 * @description 负责管理快速扫描的 Web Worker，将繁重任务委托给后台处理。
 */

import { extractAndProcessText } from '../../shared/utils/textProcessor.js';
import { loadSettings } from '../settings/logic.js';
import { log } from '../../shared/utils/logger.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';

let worker = null;

/**
 * 执行一次快速扫描。
 * @param {Function} onResult - 当扫描结果准备好时调用的回调函数。
 */
export function performQuickScan(onResult) {
    // 如果之前的 worker 仍在运行，先终止它
    if (worker) {
        worker.terminate();
    }

    try {
        // eslint-disable-next-line no-undef
        const workerScript = __QUICK_SCAN_WORKER_STRING__;
        const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
        const trustedUrl = createTrustedWorkerUrl(workerUrl);
        worker = new Worker(trustedUrl);

        worker.onmessage = (event) => {
            const { type, payload } = event.data;
            if (type === 'result' && onResult) {
                onResult(payload);
            }
            // 一次性任务完成后立即终止 Worker
            worker.terminate();
            worker = null;
        };

        worker.onerror = (error) => {
            console.error('Quick Scan Worker error:', error);
            log(`[快速扫描] Worker 发生错误: ${error.message}`);
            if (onResult) {
                // 发生错误时返回空结果
                onResult({ formattedText: '[]', count: 0 });
            }
            worker.terminate();
            worker = null;
        };

        // 1. 在主线程中提取原始文本
        const rawTexts = extractAndProcessText();
        const { filterRules } = loadSettings();

        // 2. 将数据发送给 Worker 进行处理
        worker.postMessage({
            type: 'process',
            payload: { rawTexts, filterRules }
        });

    } catch (e) {
        console.error('Failed to initialize quick scan worker:', e);
        log(`[快速扫描] Worker 初始化失败: ${e.message}`);
        if (onResult) {
            // 初始化失败时也返回空结果
            onResult({ formattedText: '[]', count: 0 });
        }
    }
}
