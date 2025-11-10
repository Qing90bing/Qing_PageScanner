/**
 * @public
 * @param {string[]} texts - 需要被格式化的文本字符串数组。
 * @returns {string} 一个格式化后的字符串，可以直接复制用于翻译工作流。
 * @description 将一个字符串数组转换成特定的二维数组格式的字符串，例如 `[["text1", ""], ["text2", ""]]`。
 */
export const formatTextsForTranslation = (texts) => {
    if (!texts || texts.length === 0) {
        return '[]';
    }
    const result = texts.map(text =>
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`
    );
    return `[\n${result.join(',\n')}\n]`;
};
