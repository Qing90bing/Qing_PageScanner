// src/core/sessionExtractor.js

/**
 * @module core/sessionExtractor
 * @description 负责管理一个持续的文本提取“会话”。
 */

import { extractAndProcessText } from '../../shared/utils/textProcessor.js';
import { loadSettings } from '../settings/logic.js';
import { appConfig } from '../settings/config.js';
import { shouldFilter } from '../../shared/utils/filterLogic.js'; // 导入新的通用过滤函数
import { log } from '../../shared/utils/logger.js';

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
    const filterReason = shouldFilter(textForFiltering, filterRules);
    if (filterReason) {
        log(`文本已过滤: "${textForFiltering}" (原因: ${filterReason})`);
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
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.closest(ignoredSelectorString)) return;

            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                const textNode = walker.currentNode;
                if (processAndAddText(textNode.nodeValue, sessionTexts, filterRules)) {
                    const newCount = sessionTexts.size;
                    // 立即打印合并后的日志
                    log(`[会话扫描] 新增: "${textNode.nodeValue.trim()}" (当前总数: ${newCount})`);
                    // 立即更新UI
                    if (onTextAddedCallback) {
                        onTextAddedCallback(newCount);
                    }
                }
            }
        });
    });
};


// --- 公开函数 ---
export const start = (onUpdate) => {
    if (isRecording) return;
    log('会话扫描：初始扫描开始...');
    isRecording = true;
    sessionTexts.clear();
    onTextAddedCallback = onUpdate || null;

    const initialTexts = extractAndProcessText();
    const { filterRules } = loadSettings();

    initialTexts.forEach(text => {
        if (processAndAddText(text, sessionTexts, filterRules)) {
            const newCount = sessionTexts.size;
            // 立即打印合并后的日志
            log(`[会话扫描] 新增: "${text.trim()}" (当前总数: ${newCount})`);
            // 立即更新UI
            if (onTextAddedCallback) {
                onTextAddedCallback(newCount);
            }
        }
    });

    // 不再需要单独的完成日志

    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
};

export const stop = () => {
    if (!isRecording) return [];
    log('[会话扫描] 已停止。');
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
