// src/shared/utils/text/textProcessor.js

/**
 * @module core/processor
 * @description 包含了脚本的核心文本处理功能，负责从页面 DOM 中提取、过滤和格式化文本。
 */

import { appConfig } from '../../../features/settings/config.js';
import { shouldFilter } from './filterLogic.js';

// --- 性能优化 ---
// 将忽略选择器的拼接移到函数外部。
// 之前这行代码在递归遍历每个 DOM 元素时都会执行，如果在有 10000 个节点的页面上，
// 就要重复拼接 10000 次字符串。现在只需执行 1 次。
const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(', ');
const ourUiSelector = '#text-extractor-container';

// 定义一个包含所有块级元素的 Set，用于高效查找。
// 列表参考了 MDN 的块级元素列表。
const blockElements = new Set(['ADDRESS', 'ARTICLE', 'ASIDE', 'BLOCKQUOTE', 'DETAILS', 'DIALOG', 'DD', 'DIV', 'DL', 'DT', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'HGROUP', 'HR', 'LI', 'MAIN', 'NAV', 'OL', 'P', 'PRE', 'SECTION', 'TABLE', 'UL']);

// --- 私有函数 ---

/**
 * @private
 * @description 递归地遍历一个 DOM 节点及其后代（包括 Shadow DOM），提取属性和文本节点中的文本内容。
 *              此函数经过重构，能够识别块级元素和 <br> 标签，并在提取的文本中智能地插入换行符。
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
            // 使用外部缓存的 selector 字符串，显著减少内存分配和 CPU 消耗
            if (node.closest(ignoredSelectorString) || node.closest(ourUiSelector)) {
                return;
            }

            // 特殊处理 <br> 标签，它代表一个换行
            if (node.tagName === 'BR') {
                textCallback('\n');
                return; // <br> 是一个空元素，没有子节点，直接返回
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

            // 特殊处理 IFRAME 元素
            // 尝试进入 iframe 内部提取内容。
            // 注意：这仅适用于同源 iframe。跨域 iframe 会抛出安全错误，我们将其捕获并忽略。
            if (node.tagName === 'IFRAME') {
                try {
                    const iframeDoc = node.contentDocument || (node.contentWindow && node.contentWindow.document);
                    if (iframeDoc) {
                        traverseDOMAndExtract(iframeDoc, textCallback);
                    }
                } catch (e) {
                    // 忽略跨域访问错误 (SecurityError)
                }
            }
            // 元素节点的处理并没有在这里结束，下面还会继续遍历其子节点
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

    // 3. 如果存在 Shadow DOM（无论是开放还是封闭模式），都递归遍历它
    const shadowRoot = node.shadowRoot || node._shadowRoot;
    if (node.nodeType === Node.ELEMENT_NODE && shadowRoot) {
        traverseDOMAndExtract(shadowRoot, textCallback);
    }

    // 4. 在处理完一个元素的所有子节点（和 Shadow DOM）之后，检查它是否是块级元素。
    // 如果是，我们就在其内容后面追加一个换行符，以模拟其在布局中的换行效果。
    if (node.nodeType === Node.ELEMENT_NODE && blockElements.has(node.tagName)) {
        textCallback('\n');
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
        // 规范化文本，但不再合并多个换行符
        const normalizedText = rawText.normalize('NFC');
        // 此处的修改至关重要：
        // 1. 我们将 \r\n (Windows) 和 \r (旧 Mac) 统一为 \n (Unix)。
        // 2. 我们不使用 `+` 量词，因此不会将多个 `\n` 合并为一个。
        let text = normalizedText.replace(/\r\n|\r/g, '\n');

        // 我们仍然需要移除纯粹由不可见空格组成的字符串，但要保留包含换行符的字符串。
        if (text.trim() === '' && !text.includes('\n')) {
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
 * 这是在 Web Worker 和主线程回退逻辑中共享的核心处理步骤。
 * @param {string[]} texts - 原始文本数组。
 * @param {object} filterRules - 应用于文本的过滤规则。
 * @param {boolean} enableDebugLogging - 是否启用调试日志。
 * @param {function(string, string): void} [logFiltered] - (可选) 用于记录被过滤文本的日志函数。
 * @returns {string[]} 返回一个经过处理的、唯一的文本数组。
 */
export const filterAndNormalizeTexts = (texts, filterRules, enableDebugLogging, logFiltered) => {
    // 这里为了避免循环依赖，我们动态导入或者要求调用者传入 shouldFilter 逻辑。
    // 但鉴于这是微创修改，我们假设 shouldFilter 已经在 processor-worker 中正确处理。
    // 注意：此文件目前在项目中主要负责“提取”。过滤逻辑实际上主要发生在 workers/processing.worker.js 或 fallback.js 中。
    // 为了保持此文件作为“提取器”的单一职责，我们保持原样，但在 filterAndNormalizeTexts 中
    // 实际需要依赖 filterLogic.js。

    const uniqueTexts = new Set();

    if (Array.isArray(texts)) {
        texts.forEach(rawText => {
            if (!rawText || typeof rawText !== 'string') return;

            // 规范化文本（仅统一换行符类型，不合并），并移除首尾的空白字符（非换行符）。
            // 注意：trim() 会移除首尾的换行符，所以我们用一个更安全的 trim 方式。
            const normalizedText = rawText.normalize('NFC').replace(/\r\n|\r/g, '\n');
            const textForFiltering = normalizedText.replace(/^[ \t]+|[ \t]+$/gm, '');

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
            uniqueTexts.add(normalizedText);
        });
    }

    return Array.from(uniqueTexts);
};

/**
 * @public
 * @description 从指定的单个DOM元素及其后代中提取所有原始文本，不进行过滤或去重。
 * 此函数设计为在主线程中运行，为 Web Worker 准备数据。
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