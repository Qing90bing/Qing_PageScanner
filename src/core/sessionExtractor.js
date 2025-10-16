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
let onTextAddedCallback = null; // 用于更新UI的回调

// --- 辅助函数 (从 processor.js 中借鉴并简化) ---
const numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;
const pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;
const containsChineseRegex = /[\u4e00-\u9fa5]/u;
const emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
const containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;

function processAndAddText(rawText, textSet, filterRules) {
    if (!rawText || typeof rawText !== 'string') return false;
    let text = rawText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
    if (text === '') return false;

    if (filterRules.numbers && numberAndCurrencyRegex.test(text)) return false;
    if (filterRules.chinese && pureChineseRegex.test(text)) return false;
    if (filterRules.containsChinese && containsChineseRegex.test(text)) return false;
    if (filterRules.emojiOnly && emojiOnlyRegex.test(text)) return false;
    if (filterRules.symbols && !containsLetterOrNumberRegex.test(text)) return false;
    if (filterRules.termFilter && IGNORED_TERMS.includes(text)) return false;

    const originalSize = textSet.size;
    textSet.add(rawText.replace(/(\r\n|\n|\r)+/g, '\n')); // 添加未 trimmed 的版本

    // 返回一个布尔值，指示是否添加了新文本
    return textSet.size > originalSize;
}

// --- MutationObserver 回调 ---
const handleMutations = (mutations) => {
    const { filterRules } = loadSettings();
    const ignoredSelectorString = IGNORED_SELECTORS.join(', ');
    let textAdded = false;

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.closest(ignoredSelectorString)) return;

            // 使用一个简单的 TreeWalker 只处理新节点
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                if (processAndAddText(walker.currentNode.nodeValue, sessionTexts, filterRules)) {
                    textAdded = true;
                }
            }
        });
    });

    // 在处理完所有突变后，如果确实添加了新文本，则调用一次回调
    if (textAdded && onTextAddedCallback) {
        onTextAddedCallback(sessionTexts.size);
    }
};


// --- 公开函数 ---
export const start = (onUpdate) => {
    if (isRecording) return;
    console.log('开始新的提取会话...');
    isRecording = true;
    sessionTexts.clear();
    onTextAddedCallback = onUpdate || null;

    // 关键修复：使用原始的、可靠的函数获取初始文本
    const initialTexts = extractAndProcessText();
    const { filterRules } = loadSettings();
    let textAdded = false;

    // 使用我们自己的处理函数来添加，确保过滤和回调被触发
    initialTexts.forEach(text => {
        if (processAndAddText(text, sessionTexts, filterRules)) {
            textAdded = true;
        }
    });
    console.log(`会话初始捕获到 ${sessionTexts.size} 条文本。`);

    // 立即使用初始计数值调用一次回调，以设置UI的初始状态
    if (onTextAddedCallback) {
        onTextAddedCallback(sessionTexts.size);
    }

    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
};

export const stop = () => {
    if (!isRecording) return [];
    console.log('停止提取会话。');
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    isRecording = false;
    onTextAddedCallback = null; // 清理回调
    return getSessionTexts(); // 返回最终结果
};

export const isSessionRecording = () => isRecording;

export const getSessionTexts = () => Array.from(sessionTexts);