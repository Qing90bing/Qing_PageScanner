// src/features/session-scan/fallback.js

/**
 * @module SessionScanFallback
 * @description 为会话扫描提供一个在主线程中运行的备选方案，
 *              模拟 Web Worker 的状态和行为。
 */

import { shouldFilter } from '../../shared/utils/filterLogic.js';
import { log } from '../../shared/utils/logger.js';

// --- 状态变量 (模拟 Worker 的内部状态) ---
let sessionTexts = new Set();
let filterRules = {};

/**
 * @description 初始化备选模块，设置过滤规则。
 * @param {object} rules - 过滤规则对象。
 */
export function initFallback(rules) {
    filterRules = rules || {};
    log('[会话扫描 - 备选方案] 初始化完成。');
}

/**
 * @description 处理并添加一批文本。
 * @param {string[]} texts - 待处理的原始文本数组。
 * @param {string} [logPrefix=''] - 用于日志输出的前缀。
 * @returns {boolean} - 如果成功添加了新文本，则返回 true。
 */
export function processTextsInFallback(texts, logPrefix = '') {
    let changed = false;
    if (Array.isArray(texts)) {
        texts.forEach(rawText => {
            if (!rawText || typeof rawText !== 'string') return;

            const normalizedText = rawText.normalize('NFC');
            const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
            if (textForFiltering === '') return;

            const filterResult = shouldFilter(textForFiltering, filterRules);
            if (filterResult) {
                const prefix = logPrefix ? `${logPrefix} ` : '';
                log(`${prefix}文本已过滤: "${textForFiltering}" (原因: ${filterResult.reason})`);
                return;
            }

            const originalSize = sessionTexts.size;
            sessionTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));

            if (sessionTexts.size > originalSize) {
                changed = true;
            }
        });
    }
    return changed;
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
    if (!textsArray || textsArray.length === 0) {
        return '[]';
    }
    const result = textsArray.map(text =>
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`
    );
    return `[\n${result.join(',\n')}\n]`;
}

/**
 * @description 清空所有已存储的文本。
 */
export function clearInFallback() {
    sessionTexts.clear();
    log('[会话扫描 - 备选方案] 数据已清空。');
}
