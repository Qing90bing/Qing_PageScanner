/**
 * @public
 * @param {string[]} texts - 需要被格式化的文本字符串数组。
 * @param {string} format - 输出格式 ('array', 'object', 'csv')。默认为 'array'。
 * @returns {string} 一个格式化后的字符串，可以直接复制用于翻译工作流。
 * @description 将一个字符串数组转换成特定的格式字符串。
 */
export const formatTextsForTranslation = (texts, format = 'array') => {
    if (!texts || texts.length === 0) {
        if (format === 'object') return '{}';
        if (format === 'csv') return '';
        return '[]';
    }
    
    // 优化：使用 JSON.stringify 来自动处理所有转义字符（包括 " \ \n \t 等）。
    
    if (format === 'object') {
        const result = texts.map(text =>
            `    ${JSON.stringify(text)}: ""`
        );
        return `{\n${result.join(',\n')}\n}`;
    } else if (format === 'csv') {
        // CSV Format: "Source",""
        // Need to escape double quotes by doubling them
        const result = texts.map(text => {
            const escaped = text.replace(/"/g, '""');
            return `"${escaped}",""`;
        });
        return result.join('\n');
    } else {
        // Default 'array' format
        const result = texts.map(text =>
            `    [${JSON.stringify(text)}, ""]`
        );
        return `[\n${result.join(',\n')}\n]`;
    }
};
