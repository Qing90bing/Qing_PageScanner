// src/features/element-scan/fallback.js

/**
 * @module ElementScanFallback
 * @description 为“选取元素扫描”提供在主线程中执行文本处理的后备方案。
 *              当 Web Worker 由于 CSP 或其他原因无法启动时使用。
 */

import { shouldFilter } from '../../shared/utils/filterLogic.js';
import { log } from '../../shared/utils/logger.js';
import { t } from '../../shared/i18n/index.js';

/**
 * @description 在主线程中执行选取元素扫描的文本处理。
 * @param {string[]} texts - 从 DOM 元素中提取的原始文本数组。
 * @param {object} filterRules - 当前的过滤规则。
 * @param {boolean} enableDebugLogging - 是否启用调试日志。
 * @returns {{texts: string[], count: number}} - 返回包含过滤后文本数组和计数的对象。
 */
export const performScanInMainThread = (texts, filterRules, enableDebugLogging) => {
    const uniqueTexts = new Set();

    if (Array.isArray(texts)) {
        texts.forEach(rawText => {
            if (!rawText || typeof rawText !== 'string') return;

            const normalizedText = rawText.normalize('NFC');
            const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
            if (textForFiltering === '') return;

            const filterResult = shouldFilter(textForFiltering, filterRules);
            if (filterResult) {
                // 直接使用全局 log，并确保在 debug 模式开启时打印
                if (enableDebugLogging) {
                    log(t('log.textProcessor.filtered', { text: textForFiltering, reason: filterResult }));
                }
                return;
            }

            uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
        });
    }

    const textsArray = Array.from(uniqueTexts);

    return {
        texts: textsArray,
        count: textsArray.length
    };
};
