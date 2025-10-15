// src/core/processor.js

/**
 * @module core/processor
 * @description 包含了脚本的核心文本处理功能，负责从页面 DOM 中提取、过滤和格式化文本。
 */

import { loadSettings } from './settings.js';
import config from '../config.js';

// --- 常量 ---

/**
 * @private
 * @readonly
 * @type {RegExp}
 * @description 用于检测一个字符串是否只包含数字、逗号、小数点、空格和常见货币符号（$, €, £, ¥）。
 * 用于实现“过滤纯数字/货币”的功能。
 */
const numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;

/**
 * @private
 * @readonly
 * @type {RegExp}
 * @description 用于检测一个字符串是否完全由中文字符和空白字符组成。
 * `\u4e00-\u9fa5` 是中文字符的 Unicode 范围。
 * `u` 标志启用了对 Unicode 的支持。
 * 用于实现“过滤纯中文”的功能。
 */
const pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;

/**
 * @private
 * @readonly
 * @type {RegExp}
 * @description 用于检测一个字符串是否包含至少一个中文字符。
 * u 标志启用了对 Unicode 的支持。
 * 用于实现“过滤包含中文”的功能。
 */
const containsChineseRegex = /[\u4e00-\u9fa5]/u;

/**
 * @private
 * @readonly
 * @type {RegExp}
 * @description 用于检测一个字符串是否完全由表情符号和空白字符组成。
 * 这个正则表达式涵盖了常见的表情符号 Unicode 范围。
 * u 标志启用了对 Unicode 的支持。
 * 用于实现“过滤纯表情符号”的功能。
 */
const emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;

/**
 * @private
 * @readonly
 * @type {RegExp}
 * @description 用于检测一个字符串是否包含任何语言的字母或任何形式的数字。
 * `\p{L}` 匹配任何语言的字母 (Letter)。
 * `\p{N}` 匹配任何形式的数字 (Number)。
 * u 标志启用了对 Unicode 的支持。
 * 用于实现“过滤纯符号”的功能（逻辑上是反向使用的）。
 */
const containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;


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

    // 3. 根据配置文件中的选择器，获取所有目标元素
    const targetElements = document.querySelectorAll(selectors.join(', '));

    // 4. 遍历每一个目标元素，并在其内部提取文本
    targetElements.forEach(element => {
        // 为每个目标元素创建一个 TreeWalker，以高效地遍历其内部的所有文本节点
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

        while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;

            // 5. 进行初步排除，跳过无效的或不需要处理的节点
            // 排除 <script> 和 <style> 标签内部的文本内容
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                continue;
            }
            // 排除我们自己注入的 UI 元素（悬浮按钮、模态框、设置面板）内的文本
            if (parent && parent.closest('.text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay')) {
                continue;
            }

            let text = node.nodeValue || '';

            // 6. 文本预处理与过滤
            // 规则 1: 将多个连续的换行符合并为一个标准换行符 `\n`，以规范化文本
            text = text.replace(/(\r\n|\n|\r)+/g, '\n');

            // 规则 2: 如果一个字符串在去除首尾空格后为空，则认为它是无效的，直接跳过
            if (text.trim() === '') {
                continue;
            }

            // 规则 3: 根据从 settings.js 加载的过滤规则，动态地应用过滤
            const trimmedText = text.trim();
            if (filterRules.numbers && numberAndCurrencyRegex.test(trimmedText)) {
                continue;
            }
            if (filterRules.chinese && pureChineseRegex.test(trimmedText)) {
                continue;
            }
            if (filterRules.containsChinese && containsChineseRegex.test(trimmedText)) {
                continue;
            }
            if (filterRules.emojiOnly && emojiOnlyRegex.test(trimmedText)) {
                continue;
            }
            if (filterRules.symbols && !containsLetterOrNumberRegex.test(trimmedText)) {
                continue;
            }

            // 7. 如果文本通过了所有过滤，则将其添加到 Set 中
            uniqueTexts.add(text);
        }
    });

    // 8. 将 Set 转换为数组并返回
    return Array.from(uniqueTexts);
};

/**
 * @public
 * @param {string[]} texts - 需要被格式化的文本字符串数组。
 * @returns {string} 一个格式化后的字符串，可以直接复制用于翻译工作流。
 * @description 将一个字符串数组转换成特定的二维数组格式的字符串，例如 `[["text1", ""], ["text2", ""]]`。
 * 这个格式通常用于某些翻译平台或工具。
 */
export const formatTextsForTranslation = (texts) => {
    // 1. 遍历数组中的每一个文本字符串
    const result = texts.map(text =>
        // 2. 对每个字符串进行处理：
        //    - 将字符串中的双引号 " 转义为 \"
        //    - 将字符串中的换行符 \n 转义为 \\n
        //    - 然后按照 `["...", ""]` 的格式包裹起来
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`
    );

    // 3. 将处理后的所有字符串用逗号和换行符连接起来，并用 `[\n...\n]` 包裹，形成最终的格式
    return `[\n${result.join(',\n')}\n]`;
};
