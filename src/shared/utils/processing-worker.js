// src/shared/utils/processing-worker.js

/**
 * @module ProcessingWorker
 * @description 一个通用的 Web Worker，负责在后台处理文本，
 *              支持一次性扫描和持续性会话模式，以减少代码重复并提高效率。
 */

// --- 依赖导入 ---
// esbuild 会在构建时将这些模块内联进来
// @ts-ignore
import { shouldFilter } from './filterLogic.js';
// @ts-ignore
import { formatTextsForTranslation } from './formatting.js';

// --- 状态变量 ---
let sessionTexts = new Set();
let filterRules = {};
let translations = {};
let enableDebugLogging = false;

// --- 辅助函数 ---

/**
 * @description 获取翻译文本。
 * @param {string} key - 翻译键。
 * @param {object} [replacements] - 占位符替换对象。
 * @returns {string} - 翻译后的文本。
 */
const t = (key, replacements) => {
    let value = translations[key] || key;
    if (replacements) {
        let finalReplacements = { ...replacements };
        if (key === 'textFiltered' && replacements.reason && translations.filterReasons) {
            const reasonKey = replacements.reason;
            finalReplacements.reason = translations.filterReasons[reasonKey] || reasonKey;
        }
        Object.keys(finalReplacements).forEach(placeholder => {
            const regex = new RegExp(`{{${placeholder}}}`, 'g');
            value = value.replace(regex, finalReplacements[placeholder]);
        });
    }
    return value;
};

/**
 * @description Worker 内部的条件日志记录器。
 * @param {...*} args - 要打印的参数。
 */
const log = (...args) => {
    if (enableDebugLogging) {
        console.log(t('workerLogPrefix'), ...args);
    }
};

/**
 * @description 处理单个文本的核心逻辑：规范化、过滤、添加到 Set。
 * @param {string} rawText - 原始文本。
 * @param {Set<string>} textSet - 用于存储结果的 Set 对象。
 * @returns {boolean} - 如果有新文本被添加，则返回 true。
 */
function processText(rawText, textSet) {
    if (!rawText || typeof rawText !== 'string') return false;

    const normalizedText = rawText.normalize('NFC');
    const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
    if (textForFiltering === '') return false;

    const filterResult = shouldFilter(textForFiltering, filterRules);
    if (filterResult) {
        log(t('textFiltered', { text: textForFiltering, reason: filterResult }));
        return false;
    }

    const originalSize = textSet.size;
    textSet.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
    return textSet.size > originalSize;
}

// --- Worker 通信接口 ---

self.onmessage = (event) => {
    const { type, payload } = event.data;

    // 任何消息都可以更新这些核心设置
    if (payload && payload.translations) {
        translations = payload.translations;
    }
    if (payload && typeof payload.enableDebugLogging !== 'undefined') {
        enableDebugLogging = payload.enableDebugLogging;
    }
    if (payload && payload.filterRules) {
        filterRules = payload.filterRules;
    }

    switch (type) {
        /**
         * 处理一次性扫描任务 (用于 Quick Scan 和 Element Scan)
         */
        case 'process-single': {
            const { texts } = payload;
            const uniqueTexts = new Set();

            if (Array.isArray(texts)) {
                texts.forEach(text => processText(text, uniqueTexts));
            }

            const textsArray = Array.from(uniqueTexts);
            const formattedText = formatTextsForTranslation(textsArray);

            log(t('scanComplete', { count: textsArray.length }));
            self.postMessage({
                type: 'scanCompleted',
                payload: {
                    formattedText,
                    count: textsArray.length
                }
            });
            break;
        }

        /**
         * 只过滤文本并返回数组 (用于 Element Scan 的暂存)
         */
        case 'filter-texts': {
            const { texts } = payload;
            const filteredTexts = new Set();

            if (Array.isArray(texts)) {
                texts.forEach(text => processText(text, filteredTexts));
            }

            self.postMessage({
                type: 'textsFiltered',
                payload: {
                    texts: Array.from(filteredTexts)
                }
            });
            break;
        }

        /**
         * 会话模式：开始一个新的会话
         */
        case 'session-start':
            const { initialData } = payload;
            sessionTexts.clear();
            const newTexts = [];
            if (Array.isArray(initialData)) {
                initialData.forEach(text => {
                    if (processText(text, sessionTexts)) {
                        newTexts.push(text);
                    }
                });
            }
            log(`Session started with ${sessionTexts.size} initial items.`);
            // After processing initial data, send an immediate count update
            self.postMessage({
                type: 'countUpdated',
                payload: {
                    count: sessionTexts.size,
                    newTexts: newTexts,
                },
            });
            break;

        /**
         * 会话模式：添加文本
         */
        case 'session-add-texts': {
            const { texts } = payload;
            const newTexts = [];
            if (Array.isArray(texts)) {
                texts.forEach(text => {
                    // processText 的副作用是将文本添加到 sessionTexts
                    if (processText(text, sessionTexts)) {
                        // 如果文本被成功添加（是新的），则也将其添加到 newTexts
                        newTexts.push(text);
                    }
                });
            }
            if (newTexts.length > 0) {
                self.postMessage({
                    type: 'countUpdated',
                    payload: {
                        count: sessionTexts.size,
                        newTexts: newTexts
                    }
                });
            }
            break;
        }

        /**
         * 会话模式：请求总结
         */
        case 'session-get-summary': {
            const sessionTextsArray = Array.from(sessionTexts);
            const formattedText = formatTextsForTranslation(sessionTextsArray);
            self.postMessage({ type: 'summaryReady', payload: formattedText });
            break;
        }

        /**
         * 会话模式：清空会话
         */
        case 'session-clear':
            sessionTexts.clear();
            log('Session cleared.');
            self.postMessage({ type: 'countUpdated', payload: { count: 0, newTexts: [] } });
            break;

        /**
         * 会话模式：获取当前计数值
         */
        case 'session-get-count':
            self.postMessage({ type: 'countUpdated', payload: { count: sessionTexts.size } });
            break;
    }
};
