// src/features/element-scan/fallback.js

/**
 * @module ElementScanFallback
 * @description 为“选取元素扫描”提供在主线程中执行文本处理的后备方案。
 *              当 Web Worker 由于 CSP 或其他原因无法启动时使用。
 */

import { shouldFilter } from '../../shared/utils/filterLogic.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
import { log } from '../../shared/utils/logger.js';
import { t } from '../../shared/i18n/index.js';

/**
 * @description 在主线程中执行选取元素扫描的文本处理。
 * @param {string[]} texts - 从 DOM 元素中提取的原始文本数组。
 * @param {object} filterRules - 当前的过滤规则。
 * @param {boolean} enableDebugLogging - 是否启用调试日志。
 * @returns {{formattedText: string, count: number}} - 返回包含格式化文本和计数的对象。
 */
export const performScanInMainThread = (texts, filterRules, enableDebugLogging) => {
    const uniqueTexts = new Set();

    const mainThreadLog = (message, ...args) => {
        if (enableDebugLogging) {
            log(message, ...args);
        }
    };

    if (Array.isArray(texts)) {
        texts.forEach(rawText => {
            if (!rawText || typeof rawText !== 'string') return;

            const normalizedText = rawText.normalize('NFC');
            const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
            if (textForFiltering === '') return;

            const filterResult = shouldFilter(textForFiltering, filterRules);
            if (filterResult) {
                mainThreadLog(t('log.textProcessor.filtered', { text: textForFiltering, reason: filterResult }));
                return;
            }

            uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
        });
    }

    const textsArray = Array.from(uniqueTexts);
    const formattedText = formatTextsForTranslation(textsArray);

    return {
        formattedText,
        count: textsArray.length
    };
};
