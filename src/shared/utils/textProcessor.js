// src/core/processor.js

/**
 * @module core/processor
 * @description 包含了脚本的核心文本处理功能，负责从页面 DOM 中提取、过滤和格式化文本。
 */

import { appConfig } from '../../features/settings/config.js';

// --- 私有函数 ---

/**
 * @private
 * @description 递归地遍历一个节点及其所有后代，包括开放的 Shadow DOM，并对找到的每个文本节点执行一个回调函数。
 * @param {Node} node - 开始遍历的节点（可以是 Element 或 ShadowRoot）。
 * @param {function(Node): void} callback - 一个回调函数，当找到一个文本节点时，会以该文本节点作为参数来调用它。
 */
const traverseNodeWithShadows = (node, callback) => {
    // 检查节点是否有效，以及是否是元素节点或文档片段节点（ShadowRoot是一种文档片段）
    if (!node || ![Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(node.nodeType)) {
        return;
    }

    // 遍历当前节点的所有子节点
    for (const child of node.childNodes) {
        // 如果是文本节点，执行回调
        if (child.nodeType === Node.TEXT_NODE) {
            callback(child);
        } 
        // 如果是元素节点，则递归地继续遍历
        else if (child.nodeType === Node.ELEMENT_NODE) {
            traverseNodeWithShadows(child, callback); // 遍历子元素的常规子节点
        }
    }

    // 在遍历完常规子节点后，检查当前节点（如果是元素）是否有 Shadow DOM
    if (node.nodeType === Node.ELEMENT_NODE && node.shadowRoot) {
        // 如果有，则以 ShadowRoot 为起点，递归地进行遍历
        traverseNodeWithShadows(node.shadowRoot, callback);
    }
};


// --- 公开函数 ---

/**
 * @public
 * @returns {string[]} 一个包含从页面上提取并处理过的、唯一的文本字符串的数组。
 * @description 这是脚本的核心功能函数。它会遍历整个页面的 DOM 树，
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

    processAndAddText(document.title);

    // 4. 根据配置文件中的选择器，获取所有目标元素
    const targetElements = document.querySelectorAll(appConfig.scanner.targetSelectors.join(', '));

    // 5. 遍历每一个目标元素，提取其属性和内部文本
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
    targetElements.forEach(element => {
        // 检查元素或其任何父元素是否匹配“禁止扫描”的选择器
        if (element.closest(ignoredSelectorString)) {
            return; // 如果匹配，则完全跳过此元素及其后代
        }
        // 5.1 提取指定属性的文本
        const attributesToExtract = appConfig.scanner.attributesToExtract;
        // 对于特定类型的 input，也提取其 value
        if (element.tagName === 'INPUT' && ['button', 'submit', 'reset'].includes(element.type)) {
            // 创建一个副本以避免修改原始配置
            const dynamicAttributes = [...attributesToExtract, 'value'];
            dynamicAttributes.forEach(attr => {
                const attrValue = element.getAttribute(attr);
                if (attrValue) {
                    processAndAddText(attrValue);
                }
            });
        } else {
            attributesToExtract.forEach(attr => {
                const attrValue = element.getAttribute(attr);
                if (attrValue) {
                    processAndAddText(attrValue);
                }
            });
        }

        // 5.2 使用新的遍历函数递归处理每个目标元素及其所有后代（包括 Shadow DOM）
        traverseNodeWithShadows(element, (node) => {
            const parent = node.parentElement;

            // 5.3 应用与之前相同的排除逻辑
            // 排除 <script> 和 <style> 标签内部的文本内容
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest(ignoredSelectorString))) {
                return;
            }
            // 排除我们自己注入的 UI 元素（悬浮按钮、模态框、设置面板）内的文本
            if (parent && parent.closest('.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay')) {
                return;
            }
            
            processAndAddText(node.nodeValue);
        });
    });

    // 6. 将 Set 转换为数组并返回
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

    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
    if (element.closest(ignoredSelectorString)) {
        return [];
    }

    // 提取元素自身的属性
    const attributesToExtract = appConfig.scanner.attributesToExtract;
    attributesToExtract.forEach(attr => {
        const attrValue = element.getAttribute(attr);
        if (attrValue) {
            texts.push(attrValue);
        }
    });

    // 使用新的遍历函数来处理节点及其 Shadow DOM
    traverseNodeWithShadows(element, (node) => {
        const parent = node.parentElement;
        // 应用与之前相同的排除逻辑
        if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest(ignoredSelectorString) || parent.closest('.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay'))) {
            return;
        }
        if (node.nodeValue) {
            texts.push(node.nodeValue);
        }
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
        let text = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, '\\n');
        if (text.trim() === '') return;

        uniqueTexts.add(text);
    };

    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
    if (element.closest(ignoredSelectorString)) {
        return [];
    }

    // 提取元素自身的属性
    const attributesToExtract = appConfig.scanner.attributesToExtract;
    attributesToExtract.forEach(attr => {
        const attrValue = element.getAttribute(attr);
        if (attrValue) {
            processAndAddText(attrValue);
        }
    });

    // 使用新的遍历函数来处理节点及其 Shadow DOM
    traverseNodeWithShadows(element, (node) => {
        const parent = node.parentElement;
        if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest(ignoredSelectorString) || parent.closest('.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay'))) {
            return;
        }
        processAndAddText(node.nodeValue);
    });

    return Array.from(uniqueTexts);
};
