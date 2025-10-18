// src/core/sessionExtractor.js

/**
 * @module core/sessionExtractor
 * @description 负责管理一个持续的文本提取“会话”。
 */

import { extractAndProcessText } from '../../shared/utils/textProcessor.js';
import { loadSettings } from '../settings/logic.js';
import IGNORED_SELECTORS from '../../shared/utils/ignoredSelectors.js';
import { shouldFilter } from '../../shared/utils/filterLogic.js'; // 导入新的通用过滤函数

// --- 模块级变量 ---
let isRecording = false;
let sessionTexts = new Set();
let observer = null;
let onTextAddedCallback = null; // 用于更新UI的回调

// --- 辅助函数 ---
function processAndAddText(rawText, textSet, filterRules) {
    if (!rawText || typeof rawText !== 'string') return false;

    // 规范化并 trim 文本以供过滤检查
    const normalizedText = rawText.normalize('NFC');
    let textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
    if (textForFiltering === '') return false;

    // 使用重构后的通用函数来应用所有过滤规则
    if (shouldFilter(textForFiltering, filterRules)) {
        return false;
    }

    const originalSize = textSet.size;
    // 添加原始的、未 trimmed 的版本，但规范化换行符
    textSet.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));

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

            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                if (processAndAddText(walker.currentNode.nodeValue, sessionTexts, filterRules)) {
                    textAdded = true;
                }
            }
        });
    });

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

    const initialTexts = extractAndProcessText();
    const { filterRules } = loadSettings();

    initialTexts.forEach(text => {
        // 这里调用的 processAndAddText 已经是重构后的版本
        processAndAddText(text, sessionTexts, filterRules);
    });
    console.log(`会话初始捕获到 ${sessionTexts.size} 条文本。`);

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
    onTextAddedCallback = null;
    return getSessionTexts();
};

export const isSessionRecording = () => isRecording;

export const getSessionTexts = () => Array.from(sessionTexts);
