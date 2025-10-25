// src/features/session-scan/logic.js

/**
 * @module core/sessionExtractor
 * @description 负责管理一个持续的文本提取“会话”。
 */

// --- 工具函数 ---
/**
 * 创建一个节流版的函数，确保目标函数在指定的时间间隔内最多被调用一次。
 * 它会立即执行第一次调用，然后在一个冷却周期结束后，执行最后一次被延迟的调用。
 * @param {Function} func - 要进行节流的函数。
 * @param {number} limit - 节流的时间间隔（毫秒）。
 * @returns {Function} - 一个新的、经过节流处理的函数。
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}


import { extractAndProcessText } from '../../shared/utils/textProcessor.js';
import { loadSettings } from '../settings/logic.js';
import { appConfig } from '../settings/config.js';
import { shouldFilter } from '../../shared/utils/filterLogic.js'; // 导入新的通用过滤函数
import { log } from '../../shared/utils/logger.js';
import { updateModalContent, SHOW_PLACEHOLDER } from '../../shared/ui/mainModal.js';

// --- 模块级变量 ---
let isRecording = false;
let sessionTexts = new Set();
let observer = null;
let throttledUpdateCallback = null; // 用于更新UI的节流回调

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
    let changed = false;

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.closest(ignoredSelectorString)) return;

            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
            while(walker.nextNode()) {
                const textNode = walker.currentNode;
                if (processAndAddText(textNode.nodeValue, sessionTexts, filterRules)) {
                    changed = true;
                    log(`[会话扫描] 新增: "${textNode.nodeValue.trim()}" (当前总数: ${sessionTexts.size})`);
                }
            }
        });
    });

    if (changed && throttledUpdateCallback) {
        throttledUpdateCallback(sessionTexts.size);
    }
};


// --- 公开函数 ---
export const start = (onUpdate) => {
    if (isRecording) return;
    log('会话扫描：初始扫描开始...');
    isRecording = true;
    sessionTexts.clear();

    // 创建节流回调
    throttledUpdateCallback = onUpdate ? throttle(onUpdate, 200) : null;

    const initialTexts = extractAndProcessText();
    const { filterRules } = loadSettings();

    initialTexts.forEach(text => {
        if (processAndAddText(text, sessionTexts, filterRules)) {
             log(`[会话扫描] 新增: "${text.trim()}" (当前总数: ${sessionTexts.size})`);
        }
    });

    // 立即进行一次初始UI更新
    if (throttledUpdateCallback) {
        throttledUpdateCallback(sessionTexts.size);
    }

    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
};

export const stop = () => {
    if (!isRecording) return new Set();
    log('[会话扫描] 已停止。');
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    isRecording = false;
    throttledUpdateCallback = null;
    return sessionTexts;
};

export const isSessionRecording = () => isRecording;

export const getSessionTexts = () => sessionTexts;

/**
 * @description 清空会话期间收集的所有文本。
 */
export function clearSessionTexts() {
    sessionTexts.clear();
    log('[会话扫描] 会话数据已清空。');
}
