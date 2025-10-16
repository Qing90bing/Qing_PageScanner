// src/core/sessionExtractor.js

/**
 * @module core/sessionExtractor
 * @description 负责管理一个持续的文本提取“会话”。
 */

import { extractAndProcessText } from './processor.js';
import { loadSettings } from './settings.js';
import IGNORED_SELECTORS from './ignoredSelectors.js';
import IGNORED_TERMS from './ignoredTerms.js';

// --- 模块级变量 ---
let isRecording = false;
let sessionTexts = new Set();
let observer = null;

// --- 辅助函数 (从 processor.js 中借鉴并简化) ---
const numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;
const pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;
const containsChineseRegex = /[\u4e00-\u9fa5]/u;
const emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
const containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;

function processAndAddText(rawText, textSet, filterRules) {
    if (!rawText || typeof rawText !== 'string') return;
    let text = rawText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
    if (text === '') return;

    if (filterRules.numbers && numberAndCurrencyRegex.test(text)) return;
    if (filterRules.chinese && pureChineseRegex.test(text)) return;
    if (filterRules.containsChinese && containsChineseRegex.test(text)) return;
    if (filterRules.emojiOnly && emojiOnlyRegex.test(text)) return;
    if (filterRules.symbols && !containsLetterOrNumberRegex.test(text)) return;
    if (filterRules.termFilter && IGNORED_TERMS.includes(text)) return;

    textSet.add(rawText.replace(/(\r\n|\n|\r)+/g, '\n')); // 添加未 trimmed 的版本
}

// --- MutationObserver 回调 ---
const handleMutations = (mutations) => {
    const { filterRules } = loadSettings();
    const ignoredSelectorString = IGNORED_SELECTORS.join(', ');

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.closest(ignoredSelectorString)) return;

            // 使用一个简单的 TreeWalker 只处理新节点
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                processAndAddText(walker.currentNode.nodeValue, sessionTexts, filterRules);
            }
        });
    });
};


// --- 公开函数 ---
export const start = () => {
    if (isRecording) return;
    console.log('开始新的提取会话...');
    isRecording = true;
    sessionTexts.clear();

    // 关键修复：使用原始的、可靠的函数获取初始文本
    const initialTexts = extractAndProcessText();
    initialTexts.forEach(text => sessionTexts.add(text));
    console.log(`会话初始捕获到 ${initialTexts.length} 条文本。`);

    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
};

export const stop = () => {
    if (!isRecording) return;
    console.log('停止提取会话。');
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    isRecording = false;
};

export const isSessionRecording = () => isRecording;

export const getSessionTexts = () => Array.from(sessionTexts);