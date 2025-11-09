// src/shared/utils/fallbackProcessor.js

/**
 * @module FallbackProcessor
 * @description 提供在主线程中执行文本处理的通用后备方案。
 *              当 Web Worker 由于 CSP 或其他原因无法启动时使用。
 */

import { filterAndNormalizeTexts } from './textProcessor.js';
import { log } from './logger.js';
import { t } from '../i18n/index.js';

/**
 * @description 在主线程中执行文本扫描和处理。这是一个通用的、无状态的函数，
 *              用于替代无法在 Web Worker 中执行的一次性处理任务。
 * @param {string[]} texts - 从 DOM 中提取的原始文本数组。
 * @param {object} filterRules - 当前的过滤规则。
 * @param {boolean} enableDebugLogging - 是否启用调试日志。
 * @returns {{texts: string[], count: number}} - 返回包含过滤后文本数组和计数的对象。
 */
export const performScanInMainThread = (texts, filterRules, enableDebugLogging) => {
    // 定义一个日志记录函数以传递给核心处理器
    const logFiltered = (text, reason) => {
        log(t('log.textProcessor.filtered', { text, reason }));
    };

    // 调用新的核心处理函数
    const textsArray = filterAndNormalizeTexts(texts, filterRules, enableDebugLogging, logFiltered);

    // 返回标准化的对象结构
    return {
        texts: textsArray,
        count: textsArray.length
    };
};
