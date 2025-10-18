// src/core/processor.js

/**
 * @module core/processor
 * @description 包含了脚本的核心文本处理功能，负责从页面 DOM 中提取、过滤和格式化文本。
 */

import { loadSettings } from '../../features/settings/logic.js';
import config from '../../config.js';
import IGNORED_SELECTORS from './ignoredSelectors.js';
import { shouldFilter } from './filterLogic.js'; // 导入新的通用过滤函数

// --- 公开函数 ---

/**
 * @public
 * @returns {string[]} 一个包含从页面上提取并处理过的、唯一的文本字符串的数组。
 * @description 这是脚本的核心功能函数。它会遍历整个页面的 DOM 树，
 * 提取所有文本节点，然后根据用户设置的过滤规则进行筛选，最后返回一个去重后的文本数组。
 */
export const extractAndProcessText = () => {
    // 1. 加载最新的用户设置和静态配置
    const settings = loadSettings();
    const { filterRules } = settings;
    const { selectors } = config;

    // 2. 使用 Set 来存储唯一的文本，可以自动去重
    const uniqueTexts = new Set();

    /**
     * @private
     * @description 对单个文本片段进行预处理、过滤，并将有效的文本添加到 uniqueTexts 集合中。
     * @param {string | null | undefined} rawText - 需要处理的原始文本。
     */
    const processAndAddText = (rawText) => {
        if (!rawText) return;

        // Unicode 标准化，修复特殊字符（如组合字符）的显示问题
        const normalizedText = rawText.normalize('NFC');

        // 规范化换行符
        let text = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n');

        // 忽略纯空白字符串
        if (text.trim() === '') {
            return;
        }

        const trimmedText = text.trim();

        // 使用重构后的通用函数来应用所有过滤规则
        if (shouldFilter(trimmedText, filterRules)) {
            return;
        }

        // 如果通过所有过滤，则添加到 Set 中
        uniqueTexts.add(text);
    };

    // 3. 提取页面标题
    processAndAddText(document.title);

    // 4. 根据配置文件中的选择器，获取所有目标元素
    const targetElements = document.querySelectorAll(selectors.join(', '));

    // 5. 遍历每一个目标元素，提取其属性和内部文本
    const ignoredSelectorString = IGNORED_SELECTORS.join(', ');
    targetElements.forEach(element => {
        // 检查元素或其任何父元素是否匹配“禁止扫描”的选择器
        if (element.closest(ignoredSelectorString)) {
            return; // 如果匹配，则完全跳过此元素及其后代
        }
        // 5.1 提取指定属性的文本
        const attributesToExtract = ['placeholder', 'alt', 'title', 'aria-label'];
        // 对于特定类型的 input，也提取其 value
        if (element.tagName === 'INPUT' && ['button', 'submit', 'reset'].includes(element.type)) {
            attributesToExtract.push('value');
        }
        attributesToExtract.forEach(attr => {
            const attrValue = element.getAttribute(attr);
            if (attrValue) {
                processAndAddText(attrValue);
            }
        });

        // 5.2 使用 TreeWalker 高效遍历其内部的所有文本节点
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;

            // 5.3 进行初步排除，跳过无效的或不需要处理的节点
            // 排除 <script> 和 <style> 标签内部的文本内容
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                continue;
            }
            // 排除我们自己注入的 UI 元素（悬浮按钮、模态框、设置面板）内的文本
            if (parent && parent.closest('.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay')) {
                continue;
            }
            
            processAndAddText(node.nodeValue);
        }
    });

    // 6. 将 Set 转换为数组并返回
    return Array.from(uniqueTexts);
};

/**
 * @public
 * @param {string[]} texts - 需要被格式化的文本字符串数组。
 * @returns {string} 一个格式化后的字符串，可以直接复制用于翻译工作流。
 * @description 将一个字符串数组转换成特定的二维数组格式的字符串，例如 `[["text1", ""], ["text2", ""]]`。
 */
export const formatTextsForTranslation = (texts) => {
    const result = texts.map(text =>
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`
    );
    return `[\n${result.join(',\n')}\n]`;
};
