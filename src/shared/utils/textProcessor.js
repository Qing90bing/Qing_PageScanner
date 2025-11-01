// src/core/processor.js

/**
 * @module core/processor
 * @description 包含了脚本的核心文本处理功能，负责从页面 DOM 中提取、过滤和格式化文本。
 */

import { loadSettings } from '../../features/settings/logic.js';
import { appConfig } from '../../features/settings/config.js';
import { shouldFilter } from './filterLogic.js'; // 导入新的通用过滤函数
import { log } from './logger.js';
import { t } from '../i18n/index.js';

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
        const filterReason = shouldFilter(trimmedText, filterRules);
        if (filterReason) {
            log(t('log.textProcessor.filtered', { text: trimmedText, reason: filterReason }));
            return;
        }

        // 如果通过所有过滤，则添加到 Set 中
        uniqueTexts.add(text);
    };

    // 3. 提取页面标题
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

        // 5.2 使用 TreeWalker 高效遍历其内部的所有文本节点
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;

            // 5.3 进行初步排除，跳过无效的或不需要处理的节点
            // 排除 <script> 和 <style> 标签内部的文本内容
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest(ignoredSelectorString))) {
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
 * @description 从指定的单个DOM元素及其后代中提取、处理并返回唯一的文本字符串数组。
 * @param {HTMLElement} element - 开始提取文本的根元素。
 * @returns {string[]} 一个包含处理过的、唯一文本的数组。
 */
export const extractAndProcessTextFromElement = (element) => {
    if (!element) return [];

    const settings = loadSettings();
    const { filterRules } = settings;
    const uniqueTexts = new Set();

    const processAndAddText = (rawText) => {
        if (!rawText) return;
        const normalizedText = rawText.normalize('NFC');
        let text = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, '\\n');
        if (text.trim() === '') return;

        const trimmedText = text.trim();
        const filterReason = shouldFilter(trimmedText, filterRules);
        if (filterReason) {
            log(t('log.textProcessor.filtered', { text: trimmedText, reason: filterReason }));
            return;
        }
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

    // 使用 TreeWalker 遍历其内部的所有文本节点
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest(ignoredSelectorString) || parent.closest('.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay'))) {
            continue;
        }
        processAndAddText(node.nodeValue);
    }

    return Array.from(uniqueTexts);
};
