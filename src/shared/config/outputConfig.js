export const DEFAULT_OUTPUT_TAB_SIZE = 2;
export const MIN_OUTPUT_TAB_SIZE = 0;
export const MAX_OUTPUT_TAB_SIZE = 3;

export function normalizeOutputTabSize(value) {
    if (value === null || value === undefined || value === '' || typeof value === 'boolean') {
        return DEFAULT_OUTPUT_TAB_SIZE;
    }

    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue)) {
        return DEFAULT_OUTPUT_TAB_SIZE;
    }

    return Math.min(MAX_OUTPUT_TAB_SIZE, Math.max(MIN_OUTPUT_TAB_SIZE, parsedValue));
}

export function getOutputTabIndent(tabSize) {
    return ' '.repeat(normalizeOutputTabSize(tabSize));
}
