// src/features/session-scan/worker.js

/**
 * @module SessionScanWorker
 * @description 这个 Web Worker 在后台处理所有与会话扫描相关的繁重任务，
 *              包括文本过滤、去重和存储，以保持主线程的流畅响应。
 */

// --- 状态变量 ---
let sessionTexts = new Set();
let filterRules = {};

// --- 核心逻辑 (从主线程迁移而来) ---

// 动态导入过滤逻辑，esbuild 会在构建时将其内联
// @ts-ignore
import { shouldFilter } from '../../shared/utils/filterLogic.js';

/**
 * 处理并可能添加单个文本片段到会话集合中。
 * @param {string} rawText - 待处理的原始文本。
 * @returns {boolean} - 如果成功添加了新文本，则返回 true。
 */
function processAndAddText(rawText) {
    if (!rawText || typeof rawText !== 'string') return false;

    // 规范化并 trim 文本以供过滤检查
    const normalizedText = rawText.normalize('NFC');
    let textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
    if (textForFiltering === '') return false;

    // 应用过滤规则
    if (shouldFilter(textForFiltering, filterRules)) {
        return false;
    }

    const originalSize = sessionTexts.size;
    // 添加规范化换行符后的版本
    sessionTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));

    return sessionTexts.size > originalSize;
}

/**
 * 将文本数组格式化为用于翻译的二维数组字符串。
 * @param {string[]} texts - 文本字符串数组。
 * @returns {string} - 格式化后的字符串。
 */
const formatTextsForTranslation = (texts) => {
    if (!texts || texts.length === 0) {
        return '[]';
    }
    const result = texts.map(text =>
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`
    );
    return `[\n${result.join(',\n')}\n]`;
};


// --- Worker 通信接口 ---

self.onmessage = (event) => {
    const { type, payload } = event.data;

    switch (type) {
        // 初始化：接收过滤规则
        case 'init':
            filterRules = payload.filterRules || {};
            break;

        // 数据处理：接收一批原始文本进行处理
        case 'data': {
            let changed = false;
            if (Array.isArray(payload)) {
                payload.forEach(text => {
                    if (processAndAddText(text)) {
                        changed = true;
                    }
                });
            }
            // 如果有新文本被添加，则通知主线程更新计数
            if (changed) {
                self.postMessage({ type: 'countUpdated', payload: sessionTexts.size });
            }
            break;
        }

        // 总结请求：格式化并返回所有文本
        case 'getSummary': {
            const sessionTextsArray = Array.from(sessionTexts);
            const formattedText = formatTextsForTranslation(sessionTextsArray);
            self.postMessage({ type: 'summaryReady', payload: formattedText });
            break;
        }

        // 获取当前计数值
        case 'getCount':
            self.postMessage({ type: 'countUpdated', payload: sessionTexts.size });
            break;

        // 可选：添加一个清空指令
        case 'clear':
            sessionTexts.clear();
            self.postMessage({ type: 'countUpdated', payload: 0 });
            break;
    }
};
