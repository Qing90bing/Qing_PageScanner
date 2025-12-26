// src/features/session-scan/fallback.js

/**
 * @module SessionScanFallback
 * @description 为会话扫描提供一个在主线程中运行的备选方案，
 *              模拟 Web Worker 的状态和行为。
 */

import { filterAndNormalizeTexts } from '../../shared/utils/text/textProcessor.js';
import { log } from '../../shared/utils/core/logger.js';
import { t } from '../../shared/i18n/index.js';
import { formatTextsForTranslation } from '../../shared/utils/text/formatting.js';
import { loadSettings } from '../settings/logic.js';

// --- 状态变量 (模拟 Worker 的内部状态) ---
let sessionTexts = new Set();
let filterRules = {};

/**
 * @description 初始化备选模块，设置过滤规则。
 * @param {object} rules - 过滤规则对象。
 */
export function initFallback(rules) {
    filterRules = rules || {};
    log(t('log.sessionScan.fallback.initialized'));
}

/**
 * @description 处理并添加一批文本。
 * @param {string[]} texts - 待处理的原始文本数组。
 * @param {string} [logPrefix=''] - 用于日志输出的前缀。
 * @returns {boolean} - 如果成功添加了新文本，则返回 true。
 */
export function processTextsInFallback(texts, logPrefix = '') {
    const originalSize = sessionTexts.size;

    // 定义一个适配 session-scan 日志格式的日志记录器
    const logFiltered = (text, reason) => {
        const prefix = logPrefix ? `${logPrefix} ` : '';
        log(prefix + t('log.textProcessor.filtered', { text, reason }));
    };

    // 调用核心处理函数，注意：这里假设调试日志在需要时已通过外部逻辑启用
    const processedTexts = filterAndNormalizeTexts(texts, filterRules, true, logFiltered);

    // 将处理后的文本添加到会话 Set 中
    processedTexts.forEach(text => sessionTexts.add(text));

    // 如果 Set 的大小发生变化，则返回 true
    return sessionTexts.size > originalSize;
}

/**
 * @description 获取当前处理的文本总数。
 * @returns {number}
 */
export function getCountInFallback() {
    return sessionTexts.size;
}

/**
 * @description 生成用于导出的总结文本。
 * @returns {string} - 格式化后的文本字符串。
 */
export function getSummaryInFallback() {
    const textsArray = Array.from(sessionTexts);
    const { outputFormat } = loadSettings();
    return formatTextsForTranslation(textsArray, outputFormat);
}

/**
 * @description 清空所有已存储的文本。
 */
export function clearInFallback() {
    sessionTexts.clear();
    log(t('log.sessionScan.fallback.cleared'));
}
