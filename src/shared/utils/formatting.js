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
    
    // 优化：使用 JSON.stringify 来自动处理所有转义字符（包括 " \ \n \t 等）。
    // 原来的手动 replace 容易漏掉反斜杠本身，导致导出格式错误。
    // JSON.stringify(text) 会返回带双引号的字符串，例如 "Hello"，
    // 我们把它直接嵌入到数组模板中即可。
    const result = texts.map(text =>
        `    [${JSON.stringify(text)}, ""]`
    );
    
    return `[\n${result.join(',\n')}\n]`;
};