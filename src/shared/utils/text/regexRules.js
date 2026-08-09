const MAX_REGEX_PATTERN_LENGTH = 1000;
const MAX_REGEX_REPLACEMENT_LENGTH = 1000;
const ALLOWED_REGEX_FLAGS = /^[dgimsuvy]*$/;
const RULE_MARKER_PATTERN = /qps-rule:([a-zA-Z0-9_-]+)/;
const DYNAMIC_VALUE_MARKER = '<value>';
const DYNAMIC_VALUE_PATTERN =
    /[$€£¥₹]\s*\d+(?:[.,]\d+)*|\b\d+(?:\.\d+)+(?:[a-z]+)?\b|\b\d+(?:[.,]\d+)?(?:p|k|m|b|ms|s)?\b/gi;

export function createDynamicRegexShape(sourceText) {
    const shape = String(sourceText || '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(DYNAMIC_VALUE_PATTERN, DYNAMIC_VALUE_MARKER);
    return shape.includes(DYNAMIC_VALUE_MARKER) ? shape.toLocaleLowerCase('en-US') : '';
}

export function hasDynamicRegexValue(sourceText) {
    return Boolean(createDynamicRegexShape(sourceText));
}

export function isSingleSampleRegexCandidate(sourceText) {
    return hasDynamicRegexValue(sourceText) && /[•:()/]/.test(String(sourceText || ''));
}

function escapeFixedRegexText(value) {
    return String(value)
        .split(/(\s+)/)
        .map((part) => (/^\s+$/.test(part) ? '\\s+' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
        .join('');
}

function capturePatternForDynamicValue(value) {
    const currency = String(value).match(/^([$€£¥₹])\s*\d/);
    if (currency) return `(${escapeFixedRegexText(currency[1])}\\s*[\\d,.]+)`;
    const unit = String(value).match(/(?:p|k|m|b|ms|s)$/i)?.[0];
    if (unit) return `(\\d+(?:[.,]\\d+)?${escapeFixedRegexText(unit)})`;
    if (/\d(?:\.\d+)+/.test(value)) return '(\\d+(?:\\.\\d+)+)';
    return '(\\d+(?:[.,]\\d+)?)';
}

export function createSingleSampleRegexRule({ id, sourceId, sourceText, translation, confidence = 1 }) {
    const source = String(sourceText || '');
    const target = String(translation || '');
    if (!isSingleSampleRegexCandidate(source) || !target || source.trim() === target.trim()) return null;

    const values = Array.from(source.matchAll(new RegExp(DYNAMIC_VALUE_PATTERN.source, DYNAMIC_VALUE_PATTERN.flags)));
    if (values.length === 0) return null;

    let sourceIndex = 0;
    let translationIndex = 0;
    let pattern = '^';
    let replacement = '';
    for (let index = 0; index < values.length; index += 1) {
        const value = values[index][0];
        const valueIndex = values[index].index;
        const targetValueIndex = target.indexOf(value, translationIndex);
        if (targetValueIndex < 0) return null;
        pattern += escapeFixedRegexText(source.slice(sourceIndex, valueIndex));
        pattern += capturePatternForDynamicValue(value);
        replacement += target.slice(translationIndex, targetValueIndex);
        replacement += `$${index + 1}`;
        sourceIndex = valueIndex + value.length;
        translationIndex = targetValueIndex + value.length;
    }
    pattern += `${escapeFixedRegexText(source.slice(sourceIndex))}$`;
    replacement += target.slice(translationIndex);

    const rule = {
        id,
        sourceIds: [sourceId],
        pattern,
        flags: 'i',
        replacement,
        confidence,
        category: 'single-sample-dynamic',
        reason: 'future-proof-dynamic-value',
        origin: 'ai',
    };
    const validated = validateRegexRuleDefinition(rule, {
        sourceTexts: [source],
        requireSourceMatch: true,
        requireAnchors: true,
        requireDynamicCapture: true,
    });
    return validated.valid ? validated.rule : null;
}

export function matchEditedRegexRulesToExisting(editedRules, existingRules) {
    const edited = Array.isArray(editedRules) ? editedRules : [];
    const existing = Array.isArray(existingRules) ? existingRules : [];
    const existingById = new Map(existing.map((rule) => [rule.id, rule]));
    const matches = Array(edited.length).fill(null);
    const usedIds = new Set();

    edited.forEach((rule, index) => {
        const requestedId = String(rule?.id || '').trim();
        const match = requestedId ? existingById.get(requestedId) : null;
        if (!match) return;
        matches[index] = match;
        usedIds.add(match.id);
    });
    edited.forEach((rule, index) => {
        if (rule?.id || matches[index]) return;
        const exactMatch = existing.find(
            (candidate) =>
                !usedIds.has(candidate.id) &&
                candidate.pattern === rule.pattern &&
                candidate.flags === rule.flags &&
                candidate.replacement === rule.replacement
        );
        if (!exactMatch) return;
        matches[index] = exactMatch;
        usedIds.add(exactMatch.id);
    });

    const unmatchedEditedIndexes = edited
        .map((rule, index) => ({ rule, index }))
        .filter(({ rule, index }) => !rule?.id && !matches[index])
        .map(({ index }) => index);
    const unmatchedExisting = existing.filter((rule) => !usedIds.has(rule.id));
    if (unmatchedEditedIndexes.length === 1 && unmatchedExisting.length === 1) {
        matches[unmatchedEditedIndexes[0]] = unmatchedExisting[0];
    } else if (unmatchedEditedIndexes.length > 0 && unmatchedExisting.length > 0) {
        return { valid: false, matches: [], error: 'ambiguous-regex-edit' };
    }

    return { valid: true, matches };
}

function hasDuplicateCharacters(value) {
    return new Set(value).size !== value.length;
}

function hasUnsafeRegexShape(pattern) {
    // Reject the most obvious nested-quantifier shapes. The rule still runs
    // inside the page, so a generated pattern must not be able to monopolize
    // the main thread on long dynamic strings.
    return /\((?:[^()\\]|\\.)*(?:[+*]|\{\d+,\})(?:[^()\\]|\\.)*\)(?:[+*]|\{\d+,\})/.test(pattern);
}

function countCapturingGroups(pattern) {
    let count = 0;
    let escaped = false;
    let inCharacterClass = false;

    for (let index = 0; index < pattern.length; index += 1) {
        const character = pattern[index];
        if (escaped) {
            escaped = false;
            continue;
        }
        if (character === '\\') {
            escaped = true;
            continue;
        }
        if (character === '[') {
            inCharacterClass = true;
            continue;
        }
        if (character === ']' && inCharacterClass) {
            inCharacterClass = false;
            continue;
        }
        if (!inCharacterClass && character === '(' && pattern[index + 1] !== '?') count += 1;
    }

    return count;
}

function replacementGroupReferences(replacement) {
    const references = [];
    const pattern = /\$(\d{1,2})/g;
    let match;
    while ((match = pattern.exec(replacement)) !== null) {
        references.push(Number(match[1]));
    }
    return references;
}

function normalizeRuleId(value, fallback = '') {
    const normalized = String(value || '')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 80);
    return normalized || fallback;
}

function testRuleAgainstSource(regex, sourceText) {
    regex.lastIndex = 0;
    const matched = regex.test(String(sourceText || ''));
    regex.lastIndex = 0;
    return matched;
}

/**
 * Validate and normalize one structured regex rule.
 * @param {object} rule
 * @param {{sourceTexts?: string[], requireSourceMatch?: boolean, requireAnchors?: boolean, requireDynamicCapture?: boolean}} [options]
 * @returns {{valid: boolean, rule?: object, reason?: string}}
 */
export function validateRegexRuleDefinition(rule, options = {}) {
    const sourceTexts = Array.isArray(options.sourceTexts) ? options.sourceTexts.map(String) : [];
    const requireSourceMatch = options.requireSourceMatch !== false;
    const pattern = typeof rule?.pattern === 'string' ? rule.pattern : '';
    const flags = typeof rule?.flags === 'string' ? rule.flags : '';
    const replacement = typeof rule?.replacement === 'string' ? rule.replacement : '';
    const sourceIds = Array.isArray(rule?.sourceIds)
        ? Array.from(new Set(rule.sourceIds.map((id) => String(id).trim()).filter(Boolean))).slice(0, 100)
        : [];

    if (!pattern || pattern.length > MAX_REGEX_PATTERN_LENGTH) return { valid: false, reason: 'invalid-regex-pattern' };
    if (replacement.length > MAX_REGEX_REPLACEMENT_LENGTH) {
        return { valid: false, reason: 'invalid-regex-replacement' };
    }
    if (!ALLOWED_REGEX_FLAGS.test(flags) || hasDuplicateCharacters(flags)) {
        return { valid: false, reason: 'invalid-regex-flags' };
    }
    if (hasUnsafeRegexShape(pattern)) return { valid: false, reason: 'unsafe-regex-pattern' };
    if (options.requireAnchors && (!pattern.startsWith('^') || !pattern.endsWith('$'))) {
        return { valid: false, reason: 'unanchored-single-sample-regex' };
    }

    let regex;
    try {
        regex = new RegExp(pattern, flags);
    } catch {
        return { valid: false, reason: 'invalid-regex-pattern' };
    }

    const groupCount = countCapturingGroups(pattern);
    const groupReferences = replacementGroupReferences(replacement);
    if (groupReferences.some((group) => group < 1 || group > groupCount)) {
        return { valid: false, reason: 'invalid-regex-capture' };
    }
    if (options.requireDynamicCapture && (groupCount < 1 || groupReferences.length < 1)) {
        return { valid: false, reason: 'missing-single-sample-capture' };
    }
    if (requireSourceMatch && sourceTexts.some((sourceText) => !testRuleAgainstSource(regex, sourceText))) {
        return { valid: false, reason: 'regex-source-mismatch' };
    }

    const normalized = {
        id: normalizeRuleId(rule?.id, createRegexRuleId(pattern, flags, replacement)),
        sourceIds,
        pattern,
        flags,
        replacement,
        confidence: Number.isFinite(Number(rule?.confidence)) ? Number(rule.confidence) : 0,
        category: typeof rule?.category === 'string' ? rule.category.slice(0, 80) : '',
        reason: typeof rule?.reason === 'string' ? rule.reason.slice(0, 300) : '',
        origin: rule?.origin === 'manual' || rule?.origin === 'user-edited' ? rule.origin : 'ai',
    };

    return { valid: true, rule: normalized };
}

function escapeRegexLiteral(pattern) {
    const source = String(pattern);
    let result = '';
    let backslashRun = 0;
    for (const character of source) {
        if (character === '\\') {
            result += character;
            backslashRun += 1;
            continue;
        }
        if (character === '/') {
            result += backslashRun % 2 === 0 ? '\\/' : '/';
        } else if (character === '\r') {
            result += '\\r';
        } else if (character === '\n') {
            result += '\\n';
        } else {
            result += character;
        }
        backslashRun = 0;
    }
    return result;
}

function markerForRuleId(ruleId) {
    const safeId = normalizeRuleId(ruleId, 'regex-rule');
    return `qps-rule:${safeId}`;
}

/**
 * Format structured regex rules as the reference project's JavaScript block.
 * @param {Array<object>} rules
 * @param {{includePropertyWrapper?: boolean, includeRuleComments?: boolean}} [options]
 * @returns {string}
 */
export function formatRegexRulesForTranslation(rules, options = {}) {
    const includePropertyWrapper = options.includePropertyWrapper !== false;
    const includeRuleComments = options.includeRuleComments === true;
    const normalizedRules = Array.isArray(rules) ? rules : [];
    if (normalizedRules.length === 0) return includePropertyWrapper ? 'regexRules: []' : '[]';

    const entries = normalizedRules.map((rule, index) => {
        const pattern = escapeRegexLiteral(rule.pattern);
        const flags = String(rule.flags || '');
        const replacement = JSON.stringify(String(rule.replacement || ''));
        const ruleId = rule.id || createRegexRuleId(rule.pattern, flags, rule.replacement, index);
        const marker = includeRuleComments ? ` // ${markerForRuleId(ruleId)}` : '';
        return `    [/${pattern}/${flags}, ${replacement}],${marker}`;
    });
    const body = `[` + `\n${entries.join('\n')}\n]`;
    return includePropertyWrapper ? `regexRules: ${body}` : body;
}

function isWhitespace(character) {
    return Boolean(character && /\s/.test(character));
}

function skipWhitespaceAndComments(source, start) {
    let index = start;
    while (index < source.length) {
        if (isWhitespace(source[index]) || source[index] === ',') {
            index += 1;
            continue;
        }
        if (source.startsWith('//', index)) {
            const end = source.indexOf('\n', index + 2);
            index = end < 0 ? source.length : end + 1;
            continue;
        }
        if (source.startsWith('/*', index)) {
            const end = source.indexOf('*/', index + 2);
            if (end < 0) return { index: source.length, error: 'unterminated-comment' };
            index = end + 2;
            continue;
        }
        break;
    }
    return { index };
}

function parseRegexLiteral(source, start) {
    if (source[start] !== '/') return { error: 'expected-regex' };
    let index = start + 1;
    let escaped = false;
    let inCharacterClass = false;

    while (index < source.length) {
        const character = source[index];
        if (escaped) {
            escaped = false;
            index += 1;
            continue;
        }
        if (character === '\\') {
            escaped = true;
            index += 1;
            continue;
        }
        if (character === '\n' || character === '\r') return { error: 'invalid-regex-pattern' };
        if (character === '[') inCharacterClass = true;
        if (character === ']' && inCharacterClass) inCharacterClass = false;
        if (character === '/' && !inCharacterClass) break;
        index += 1;
    }

    if (index >= source.length) return { error: 'unterminated-regex' };
    const pattern = source.slice(start + 1, index);
    index += 1;
    const flagsStart = index;
    while (index < source.length && /[a-z]/i.test(source[index])) index += 1;
    return { pattern, flags: source.slice(flagsStart, index), index };
}

function parseStringLiteral(source, start) {
    const quote = source[start];
    if (quote !== '"' && quote !== "'") return { error: 'expected-string' };
    let index = start + 1;
    let result = '';
    while (index < source.length) {
        const character = source[index];
        if (character === quote) return { value: result, index: index + 1 };
        if (character !== '\\') {
            if (character === '\n' || character === '\r') return { error: 'unterminated-string' };
            result += character;
            index += 1;
            continue;
        }

        index += 1;
        if (index >= source.length) return { error: 'unterminated-string' };
        const escaped = source[index];
        const escapeMap = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', 0: '\0' };
        if (escapeMap[escaped] !== undefined) {
            result += escapeMap[escaped];
            index += 1;
            continue;
        }
        if (escaped === 'u' && /^[0-9a-f]{4}$/i.test(source.slice(index + 1, index + 5))) {
            result += String.fromCharCode(parseInt(source.slice(index + 1, index + 5), 16));
            index += 5;
            continue;
        }
        if (escaped === 'x' && /^[0-9a-f]{2}$/i.test(source.slice(index + 1, index + 3))) {
            result += String.fromCharCode(parseInt(source.slice(index + 1, index + 3), 16));
            index += 3;
            continue;
        }
        result += escaped;
        index += 1;
    }
    return { error: 'unterminated-string' };
}

function readRuleMarker(source, start) {
    let index = start;
    let marker = null;
    while (index < source.length) {
        if (isWhitespace(source[index]) || source[index] === ',') {
            index += 1;
            continue;
        }
        if (source.startsWith('//', index)) {
            const end = source.indexOf('\n', index + 2);
            const comment = source.slice(index + 2, end < 0 ? source.length : end);
            marker = comment.match(RULE_MARKER_PATTERN)?.[1] || marker;
            index = end < 0 ? source.length : end + 1;
            continue;
        }
        if (source.startsWith('/*', index)) {
            const end = source.indexOf('*/', index + 2);
            if (end < 0) return { error: 'unterminated-comment' };
            const comment = source.slice(index + 2, end);
            marker = comment.match(RULE_MARKER_PATTERN)?.[1] || marker;
            index = end + 2;
            continue;
        }
        break;
    }
    return { index, marker };
}

/**
 * Parse only the generated regexRules grammar. This intentionally never
 * evaluates the edited JavaScript.
 * @param {string} content
 * @returns {{valid: boolean, rules: Array<object>, error?: string}}
 */
export function parseRegexRules(content) {
    if (typeof content !== 'string' || !content.trim()) return { valid: false, rules: [], error: 'empty-regex-output' };
    const source = content.replace(/^\uFEFF/, '').trim();
    let index = 0;
    if (source.startsWith('regexRules')) {
        index = 'regexRules'.length;
        while (isWhitespace(source[index])) index += 1;
        if (source[index] !== ':') return { valid: false, rules: [], error: 'invalid-regex-wrapper' };
        index += 1;
    }
    while (isWhitespace(source[index])) index += 1;
    if (source[index] !== '[') return { valid: false, rules: [], error: 'invalid-regex-wrapper' };
    index += 1;

    const rules = [];
    const ids = new Set();
    while (index < source.length) {
        const skipped = skipWhitespaceAndComments(source, index);
        if (skipped.error) return { valid: false, rules: [], error: skipped.error };
        index = skipped.index;
        if (source[index] === ']') {
            index += 1;
            break;
        }
        if (source[index] !== '[') return { valid: false, rules: [], error: 'invalid-regex-entry' };
        index += 1;

        const regexResult = parseRegexLiteral(source, index);
        if (regexResult.error) return { valid: false, rules: [], error: regexResult.error };
        index = regexResult.index;
        while (isWhitespace(source[index])) index += 1;
        if (source[index] !== ',') return { valid: false, rules: [], error: 'invalid-regex-entry' };
        index += 1;
        while (isWhitespace(source[index])) index += 1;
        const stringResult = parseStringLiteral(source, index);
        if (stringResult.error) return { valid: false, rules: [], error: stringResult.error };
        index = stringResult.index;
        while (isWhitespace(source[index])) index += 1;
        if (source[index] !== ']') return { valid: false, rules: [], error: 'invalid-regex-entry' };
        index += 1;

        const markerResult = readRuleMarker(source, index);
        if (markerResult.error) return { valid: false, rules: [], error: markerResult.error };
        index = markerResult.index;
        if (markerResult.marker && ids.has(markerResult.marker)) {
            return { valid: false, rules: [], error: 'duplicate-regex-rule-id' };
        }
        if (markerResult.marker) ids.add(markerResult.marker);
        const parsedRule = {
            id: markerResult.marker || null,
            sourceIds: [],
            pattern: regexResult.pattern,
            flags: regexResult.flags,
            replacement: stringResult.value,
            origin: markerResult.marker ? 'user-edited' : 'manual',
        };
        const syntaxCheck = validateRegexRuleDefinition(parsedRule, { requireSourceMatch: false });
        if (!syntaxCheck.valid) return { valid: false, rules: [], error: syntaxCheck.reason };
        rules.push(parsedRule);

        if (source[index] === ',') index += 1;
    }

    const trailing = skipWhitespaceAndComments(source, index);
    if (trailing.error || trailing.index !== source.length) {
        return { valid: false, rules: [], error: trailing.error || 'unexpected-regex-content' };
    }
    return { valid: true, rules };
}

export function createRegexRuleId(pattern, flags, replacement, index = 0) {
    const seed = `${pattern}\u0000${flags}\u0000${replacement}\u0000${index}`;
    let hash = 2166136261;
    for (let characterIndex = 0; characterIndex < seed.length; characterIndex += 1) {
        hash ^= seed.charCodeAt(characterIndex);
        hash = Math.imul(hash, 16777619);
    }
    return `regex-${(hash >>> 0).toString(36)}`;
}
