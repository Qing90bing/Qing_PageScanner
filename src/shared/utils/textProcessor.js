// src/core/processor.js

/**
 * @module core/processor
 * @description 包含了脚本的核心文本处理功能，负责从页面 DOM 中提取、过滤和格式化文本。
 */

import { appConfig } from '../../features/settings/config.js';
import { shouldFilter } from './filterLogic.js';

// --- 私有函数 ---

/**
 * @private
 * @description 递归地遍历一个 DOM 节点及其后代（包括 Shadow DOM），提取属性和文本节点中的文本内容。
 * @param {Node} node - 开始遍历的节点（可以是 Element, ShadowRoot, 或其他 Node 类型）。
 * @param {function(string): void} textCallback - 每当提取到一个原始文本字符串时，就会调用此回调函数。
 */
const traverseDOMAndExtract = (node, textCallback) => {
    if (!node) {
        return;
    }

    // 根据节点类型进行不同处理
    switch (node.nodeType) {
        // 对于元素节点
        case Node.ELEMENT_NODE: {
            const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
            const ourUiSelector = '.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay';

            // 如果元素匹配忽略选择器，则停止遍历此分支
            if (node.closest(ignoredSelectorString) || node.closest(ourUiSelector)) {
                return;
            }
            
            // 1. 首先提取当前元素自身的属性文本
            const attributesToExtract = appConfig.scanner.attributesToExtract;
            attributesToExtract.forEach(attr => {
                const attrValue = node.getAttribute(attr);
                if (attrValue) {
                    textCallback(attrValue);
                }
            });

            // 特殊处理 input 元素的 value 属性
            if (node.tagName === 'INPUT' && ['button', 'submit', 'reset'].includes(node.type)) {
                const value = node.getAttribute('value');
                if (value) {
                    textCallback(value);
                }
            }
            // 元素节点处理完毕后，继续向下遍历其子节点和 Shadow DOM
            break;
        }
        
        // 对于文本节点
        case Node.TEXT_NODE: {
            // 再次检查父元素，确保不提取 <script> 或 <style> 标签内的文本
            const parent = node.parentElement;
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                return;
            }
            textCallback(node.nodeValue);
            return; // 文本节点没有子节点，直接返回
        }

        // 对于其他类型的节点（如注释节点），我们什么都不做，但允许继续遍历其子节点
        default:
            break;
    }

    // 2. 递归遍历所有子节点
    for (const child of node.childNodes) {
        traverseDOMAndExtract(child, textCallback);
    }
    
    // 3. 如果存在 Shadow DOM，则递归遍历它
    if (node.nodeType === Node.ELEMENT_NODE && node.shadowRoot) {
        traverseDOMAndExtract(node.shadowRoot, textCallback);
    }
};


// --- 公开函数 ---

/**
 * @public
 * @returns {string[]} 一个包含从页面上提取并处理过的、唯一的文本字符串的数组。
 * @description 这是脚本的核心功能函数。它会从 document.body 开始执行一次高效的 DOM 遍历，
 * 提取所有文本节点，然后返回一个去重后的原始文本数组。
 */
export const extractAndProcessText = () => {
    const uniqueTexts = new Set();

    const processAndAddText = (rawText) => {
        if (!rawText) return;
        const normalizedText = rawText.normalize('NFC');
        let text = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n');
        if (text.trim() === '') {
            return;
        }
        uniqueTexts.add(text);
    };

    // 1. 始终将页面标题作为第一个文本进行处理
    processAndAddText(document.title);

    // 2. 从 document.body 开始执行单次遍历
    if (document.body) {
        traverseDOMAndExtract(document.body, processAndAddText);
    }

    // 3. 将结果转换为数组并返回
    return Array.from(uniqueTexts);
};


/**
 * @public
 * @description 接收一个原始文本数组，并对其进行规范化、过滤和去重。
 *              这是在 Web Worker 和主线程回退逻辑中共享的核心处理步骤。
 * @param {string[]} texts - 原始文本数组。
 * @param {object} filterRules - 应用于文本的过滤规则。
 * @param {boolean} enableDebugLogging - 是否启用调试日志。
 * @param {function(string, string): void} [logFiltered] - (可选) 用于记录被过滤文本的日志函数。
 * @returns {string[]} 返回一个经过处理的、唯一的文本数组。
 */
export const filterAndNormalizeTexts = (texts, filterRules, enableDebugLogging, logFiltered) => {
    const uniqueTexts = new Set();

    if (Array.isArray(texts)) {
        texts.forEach(rawText => {
            if (!rawText || typeof rawText !== 'string') return;

            // 规范化文本，统一换行符并移除首尾空格
            const normalizedText = rawText.normalize('NFC');
            const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
            if (textForFiltering === '') return;

            // 应用过滤规则
            const filterResult = shouldFilter(textForFiltering, filterRules);
            if (filterResult) {
                if (enableDebugLogging && logFiltered) {
                    logFiltered(textForFiltering, filterResult);
                }
                return;
            }

            // 将处理过的、符合条件的文本添加到结果集
            uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
        });
    }

    return Array.from(uniqueTexts);
};


/**
 * @public
 * @description 从指定的单个DOM元素及其后代中提取所有原始文本，不进行过滤或去重。
 *              此函数设计为在主线程中运行，为 Web Worker 准备数据。
 * @param {HTMLElement} element - 开始提取文本的根元素。
 * @returns {string[]} 一个包含所有找到的原始文本的数组。
 */
export const extractRawTextFromElement = (element) => {
    if (!element) return [];

    const texts = [];
    traverseDOMAndExtract(element, (rawText) => {
        texts.push(rawText);
    });

    return texts;
};


/**
 * @public
 * @description 从指定的单个DOM元素及其后代中提取、处理并返回唯一的文本字符串数组。
 * @param {HTMLElement} element - 开始提取文本的根元素。
 * @returns {string[]} 一个包含处理过的、唯一文本的数组。
 */
export const extractAndProcessTextFromElement = (element) => {
    if (!element) return [];

    const uniqueTexts = new Set();

    const processAndAddText = (rawText) => {
        if (!rawText) return;
        const normalizedText = rawText.normalize('NFC');
        let text = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n');
        if (text.trim() === '') return;

        uniqueTexts.add(text);
    };

    traverseDOMAndExtract(element, processAndAddText);

    return Array.from(uniqueTexts);
};
