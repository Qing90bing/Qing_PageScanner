/**
 * 提取并处理当前页面上所有可翻译的文本。
 * @returns {string[]} 一个包含唯一且经过处理的文本字符串的数组。
 */
export const extractAndProcessText = () => {
    const uniqueTexts = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);

    while (walker.nextNode()) {
        const node = walker.currentNode;
        
        // 排除 <script> 和 <style> 标签内的文本
        const parent = node.parentElement;
        if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
            continue;
        }

        // 排除我们自己 UI 元素内的文本
        if (parent && parent.closest('.text-extractor-fab, .text-extractor-modal-overlay')) {
            continue;
        }

        let text = node.nodeValue || '';

        // 规则 1: 将多个连续的换行符合并为一个 \n
        text = text.replace(/(\r\n|\n|\r)+/g, '\n');

        // 规则 2: 不修改空格，但如果字符串在修剪后为空，则丢弃
        if (text.trim() === '') {
            continue;
        }
        
        // 规则 3: 过滤掉纯数字字符串
        if (/^\d+$/.test(text.trim())) {
            continue;
        }
        
        uniqueTexts.add(text);
    }

    return Array.from(uniqueTexts);
};

/**
 * 将字符串数组格式化为期望的翻译数组格式。
 * @param {string[]} texts - 需要格式化的文本字符串数组。
 * @returns {string} 格式化后的、用于翻译的字符串。
 */
export const formatTextsForTranslation = (texts) => {
    const result = texts.map(text => `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`);
    return `[\n${result.join(',\n')}\n]`;
};
