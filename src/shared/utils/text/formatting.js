/**
 * @public
 * @param {string[]} texts - 需要被格式化的文本字符串数组。
 * @param {string} format - 输出格式 ('array', 'object', 'csv')。默认为 'array'。
 * @param {object} options - 可选的配置选项。
 * @param {boolean} [options.includeArrayBrackets=true] - 是否包含首尾符号（如 [] 或 {}）。
 * @returns {string} 一个格式化后的字符串，可以直接复制用于翻译工作流。
 * @description 将一个字符串数组转换成特定的格式字符串。
 */
export const formatTextsForTranslation = (texts, format = 'array', options = {}) => {
    const { includeArrayBrackets = true } = options;

    if (!texts || texts.length === 0) {
        if (format === 'object') return includeArrayBrackets ? '{}' : '';
        if (format === 'csv') return '';
        return includeArrayBrackets ? '[]' : '';
    }

    // 优化：使用 JSON.stringify 来自动处理所有转义字符（包括 " \ \n \t 等）。

    if (format === 'object') {
        const indent = includeArrayBrackets ? '    ' : '';
        const result = texts.map(text =>
            `${indent}${JSON.stringify(text)}: ""`
        );
        if (includeArrayBrackets) {
            return `{\n${result.join(',\n')}\n}`;
        } else {
            return result.join(',\n');
        }
    } else if (format === 'csv') {
        // CSV Format: "Source",""
        // Need to escape double quotes by doubling them
        // CSV 格式不受 includeArrayBrackets 设置影响
        const result = texts.map(text => {
            const escaped = text.replace(/"/g, '""');
            return `"${escaped}",""`;
        });
        return result.join('\n');
    } else {
        // Default 'array' format
        const indent = includeArrayBrackets ? '    ' : '';
        const result = texts.map(text =>
            `${indent}[${JSON.stringify(text)}, ""]`
        );
        if (includeArrayBrackets) {
            return `[\n${result.join(',\n')}\n]`;
        } else {
            return result.join(',\n');
        }
    }
};
