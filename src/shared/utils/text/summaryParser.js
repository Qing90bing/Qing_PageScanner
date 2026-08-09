const ARRAY_ENTRY_PATTERN = /\[\s*("(?:\\.|[^"\\])*")\s*,\s*("(?:\\.|[^"\\])*")?\s*\]/g;
const OBJECT_ENTRY_PATTERN = /("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")?/g;
const CSV_LINE_PATTERN = /^("(?:""|[^"])*")(?:,("(?:""|[^"])*"))?$/gm;

function unescapeCsvField(field) {
    return field.slice(1, -1).replace(/""/g, '"');
}

/**
 * Extract the source texts that are still present in an editable AI summary.
 * Tolerant of malformed lines: entries that cannot be parsed are omitted and
 * therefore treated as deleted by the caller.
 * @param {string} content
 * @param {'array'|'object'|'csv'} [format='array']
 * @returns {string[]}
 */
export function parseSummarySourceTexts(content, format = 'array') {
    if (!content || typeof content !== 'string' || !content.trim()) return [];

    if (format === 'csv') {
        const sources = [];
        let match;
        CSV_LINE_PATTERN.lastIndex = 0;
        while ((match = CSV_LINE_PATTERN.exec(content)) !== null) {
            if (match[1]) sources.push(unescapeCsvField(match[1]));
        }
        return sources;
    }

    if (format === 'object') {
        const sources = [];
        let match;
        OBJECT_ENTRY_PATTERN.lastIndex = 0;
        while ((match = OBJECT_ENTRY_PATTERN.exec(content)) !== null) {
            try {
                sources.push(JSON.parse(match[1]));
            } catch {
                // Ignore malformed entries; the item is treated as deleted.
            }
        }
        return sources;
    }

    const sources = [];
    let match;
    ARRAY_ENTRY_PATTERN.lastIndex = 0;
    while ((match = ARRAY_ENTRY_PATTERN.exec(content)) !== null) {
        try {
            sources.push(JSON.parse(match[1]));
        } catch {
            // Ignore malformed entries; the item is treated as deleted.
        }
    }
    return sources;
}
