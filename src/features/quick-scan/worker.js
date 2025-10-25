// src/features/quick-scan/worker.js

/**
 * @module QuickScanWorker
 * @description 这个 Web Worker 在后台处理所有与快速扫描相关的繁重任务，
 *              包括文本过滤、去重和格式化。
 */

// 动态导入共享的工具函数，esbuild 会在构建时将其内联
import { shouldFilter } from '../../shared/utils/filterLogic.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
import { appConfig } from '../settings/config.js';

/**
 * 处理并过滤文本集合。
 * @param {string[]} rawTexts - 待处理的原始文本数组。
 * @param {object} filterRules - 应用的过滤规则。
 * @returns {string[]} - 经过过滤和去重后的文本数组。
 */
function processTexts(rawTexts, filterRules) {
    const processedTexts = new Set();

    rawTexts.forEach(rawText => {
        if (!rawText || typeof rawText !== 'string') return;

        const normalizedText = rawText.normalize('NFC');
        let textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
        if (textForFiltering === '') return;

        if (!shouldFilter(textForFiltering, filterRules)) {
            processedTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
        }
    });

    return Array.from(processedTexts);
}

self.onmessage = (event) => {
    const { type, payload } = event.data;

    if (type === 'process') {
        const { rawTexts, filterRules } = payload;

        // 1. 过滤和去重
        const uniqueTexts = processTexts(rawTexts, filterRules);

        // 2. 格式化为最终的字符串
        const formattedText = formatTextsForTranslation(uniqueTexts);

        // 3. 将结果和最终计数发送回主线程
        self.postMessage({
            type: 'result',
            payload: {
                formattedText,
                count: uniqueTexts.length
            }
        });
    }
};
