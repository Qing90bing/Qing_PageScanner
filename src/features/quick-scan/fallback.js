// src/features/quick-scan/fallback.js

/**
 * @module QuickScanFallback
 * @description 为静态扫描提供一个在主线程中运行的备选方案，
 *              用于无法创建 Web Worker 的情况（例如由于 CSP 限制）。
 */

import { shouldFilter } from '../../shared/utils/filterLogic.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
import { log } from '../../shared/utils/logger.js';

/**
 * @description 在主线程中同步执行文本扫描和处理。
 * @param {string[]} texts - 从 DOM 提取的原始文本数组。
 * @param {object} filterRules - 应用于文本的过滤规则。
 * @param {boolean} enableDebugLogging - 是否启用调试日志。
 * @returns {{formattedText: string, count: number}} - 包含格式化文本和计数的对象。
 */
export const performScanInMainThread = (texts, filterRules, enableDebugLogging) => {
    log('[静态扫描 - 备选方案] 开始在主线程中处理...');
    const uniqueTexts = new Set();

    if (Array.isArray(texts)) {
        texts.forEach(rawText => {
            // 1. 基本验证
            if (!rawText || typeof rawText !== 'string') return;

            // 2. 规范化文本 (NFC, 统一换行符, trim)
            const normalizedText = rawText.normalize('NFC');
            const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
            if (textForFiltering === '') return;

            // 3. 应用过滤规则
            const filterResult = shouldFilter(textForFiltering, filterRules);
            if (filterResult) {
                if (enableDebugLogging) {
                    log(`文本已过滤: "${textForFiltering}" (原因: ${filterResult})`);
                }
                return;
            }

            // 4. 添加到结果集 (存储带统一换行符的版本)
            uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
        });
    }

    const textsArray = Array.from(uniqueTexts);
    const formattedText = formatTextsForTranslation(textsArray);

    log(`[静态扫描 - 备选方案] 处理完成，共 ${textsArray.length} 条有效文本。`);

    return {
        formattedText,
        count: textsArray.length
    };
};
