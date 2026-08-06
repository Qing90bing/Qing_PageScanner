const INVISIBLE_TEXT_PATTERN = /[\u200B-\u200D\u2060\uFEFF]/g;

/**
 * Normalize source text at the AI service boundary.
 * @param {unknown} value
 * @returns {string}
 */
export function normalizeAiSourceText(value) {
    return String(value ?? '')
        .normalize('NFC')
        .replace(/\r\n|\r/g, '\n')
        .replace(INVISIBLE_TEXT_PATTERN, '')
        .replace(/[ \t]+/g, ' ')
        .trim();
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function hasMeaningfulAiSourceText(value) {
    return normalizeAiSourceText(value).length > 0;
}

/**
 * @param {unknown} candidate
 * @returns {boolean}
 */
export function isSubmittableAiCandidate(candidate) {
    return Boolean(candidate && hasMeaningfulAiSourceText(candidate.sourceText));
}
