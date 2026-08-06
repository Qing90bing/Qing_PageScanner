/**
 * 将原文或原文/译文对格式化为项目支持的三种输出格式。
 * 传入字符串时保持旧行为，译文默认为空字符串。
 *
 * @param {Array<string|{sourceText?: string, source?: string, translation?: string}|[string, string]>} texts
 * @param {'array'|'object'|'csv'} [format='array']
 * @param {{includeArrayBrackets?: boolean}} [options]
 * @returns {string}
 */
export const formatTextsForTranslation = (texts, format = 'array', options = {}) => {
    const { includeArrayBrackets = true } = options;
    const pairs = Array.isArray(texts)
        ? texts
              .map((item) => {
                  if (typeof item === 'string') {
                      return { sourceText: item, translation: '' };
                  }
                  if (Array.isArray(item)) {
                      return {
                          sourceText: String(item[0] || ''),
                          translation: String(item[1] || ''),
                      };
                  }
                  return {
                      sourceText: String(item?.sourceText ?? item?.source ?? ''),
                      translation: String(item?.translation ?? ''),
                  };
              })
              .filter((pair) => pair.sourceText !== '')
        : [];

    if (pairs.length === 0) {
        if (format === 'object') return includeArrayBrackets ? '{}' : '';
        if (format === 'csv') return '';
        return includeArrayBrackets ? '[]' : '';
    }

    if (format === 'object') {
        const indent = includeArrayBrackets ? '    ' : '';
        const result = pairs.map(
            (pair) => `${indent}${JSON.stringify(pair.sourceText)}: ${JSON.stringify(pair.translation)}`
        );
        return includeArrayBrackets ? `{\n${result.join(',\n')}\n}` : result.join(',\n');
    }

    if (format === 'csv') {
        return pairs
            .map((pair) => {
                const escapedSource = pair.sourceText.replace(/"/g, '""');
                const escapedTranslation = pair.translation.replace(/"/g, '""');
                return `"${escapedSource}","${escapedTranslation}"`;
            })
            .join('\n');
    }

    const indent = includeArrayBrackets ? '    ' : '';
    const result = pairs.map(
        (pair) => `${indent}[${JSON.stringify(pair.sourceText)}, ${JSON.stringify(pair.translation)}]`
    );
    return includeArrayBrackets ? `[\n${result.join(',\n')}\n]` : result.join(',\n');
};
