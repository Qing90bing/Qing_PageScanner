import { AI_ACTIONS, AI_CANDIDATE_STATUS, AI_TRANSLATION_TYPES } from './contracts.js';
import {
    createRegexRuleId,
    createSingleSampleRegexRule,
    hasDynamicRegexValue,
    validateRegexRuleDefinition,
} from '../../utils/text/regexRules.js';

const ALLOWED_ACTIONS = new Set(Object.values(AI_ACTIONS));
const PLACEHOLDER_PATTERN =
    /\{\{[^{}]+\}\}|\$\{[^{}]+\}|\{(?:\d+|[a-zA-Z_][\w.-]*)\}|%(?:\d+\$)?[sdif]|%[a-zA-Z_][\w-]*%|:[a-zA-Z_][\w-]*|https?:\/\/[^\s)\]}>'"]+/gi;

export function extractPlaceholders(text) {
    return Array.from(new Set(String(text || '').match(PLACEHOLDER_PATTERN) || [])).sort();
}

export function parseJsonContent(content) {
    if (typeof content !== 'string' || content.trim() === '') {
        throw new Error('empty-response');
    }
    const trimmed = content.trim();
    const withoutFence = trimmed.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    return JSON.parse(withoutFence);
}

function placeholdersMatch(sourceText, translation) {
    return JSON.stringify(extractPlaceholders(sourceText)) === JSON.stringify(extractPlaceholders(translation));
}

function normalizeComparableText(value) {
    return String(value || '')
        .normalize('NFC')
        .replace(/\s+/g, ' ')
        .trim();
}

export function isUnchangedTranslation(sourceText, translation) {
    return normalizeComparableText(sourceText) === normalizeComparableText(translation);
}

function normalizeResponseId(value) {
    return String(value || '')
        .trim()
        .slice(0, 120);
}

function normalizeRegexReference(value) {
    return normalizeResponseId(value)
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 80);
}

function normalizedConfidence(value) {
    const confidence = Number(value);
    return Number.isFinite(confidence) && confidence >= 0 && confidence <= 1 ? confidence : null;
}

function createReview(candidate, reason, item = {}, translationType = AI_TRANSLATION_TYPES.TEXT, regexRuleId = '') {
    return {
        id: candidate.id,
        sourceText: candidate.sourceText,
        action: AI_ACTIONS.REVIEW,
        translation:
            translationType === AI_TRANSLATION_TYPES.TEXT && typeof item.translation === 'string'
                ? item.translation.trim()
                : '',
        translationType,
        ...(regexRuleId ? { regexRuleId } : {}),
        confidence: normalizedConfidence(item.confidence) ?? 0,
        category: typeof item.category === 'string' ? item.category.slice(0, 80) : 'validation',
        reason,
        status: AI_CANDIDATE_STATUS.REVIEW,
    };
}

function normalizeAction(item) {
    // Legacy keep responses are treated as remove so they never enter the
    // translation library.
    if (item?.action === AI_ACTIONS.KEEP) return AI_ACTIONS.REMOVE;
    // Some JSON-mode models use `action: "regex"` as shorthand even though
    // the requested protocol separates action from translationType. Only
    // normalize it when the item also references a regex rule; the rule still
    // has to pass every group, source-match, confidence, and safety check.
    if (
        item?.action === AI_TRANSLATION_TYPES.REGEX &&
        item?.translationType !== AI_TRANSLATION_TYPES.TEXT &&
        normalizeRegexReference(item?.regexRuleId)
    ) {
        return AI_ACTIONS.TRANSLATE;
    }
    return item?.action;
}

function normalizeTranslationType(item) {
    if (item?.translationType === AI_TRANSLATION_TYPES.REGEX) return AI_TRANSLATION_TYPES.REGEX;
    if (
        item?.action === AI_TRANSLATION_TYPES.REGEX &&
        item?.translationType !== AI_TRANSLATION_TYPES.TEXT &&
        normalizeRegexReference(item?.regexRuleId)
    ) {
        return AI_TRANSLATION_TYPES.REGEX;
    }
    return AI_TRANSLATION_TYPES.TEXT;
}

function isConfidentTranslation(item, confidenceThreshold) {
    const confidence = normalizedConfidence(item?.confidence);
    return confidence !== null && confidence >= confidenceThreshold;
}

function isRegexItemForRule(item, ruleId, confidenceThreshold) {
    return (
        normalizeAction(item) === AI_ACTIONS.TRANSLATE &&
        normalizeTranslationType(item) === AI_TRANSLATION_TYPES.REGEX &&
        normalizeRegexReference(item?.regexRuleId) === ruleId &&
        isConfidentTranslation(item, confidenceThreshold)
    );
}

function validateRegexResponseRule(rawRule, candidates, responseById, confidenceThreshold, assignedSourceIds) {
    const ruleId = normalizeRegexReference(rawRule?.id);
    const rawSourceIds = Array.isArray(rawRule?.sourceIds) ? rawRule.sourceIds.map(normalizeResponseId) : [];
    const sourceIds = rawSourceIds.filter(Boolean);
    const invalidSourceIds =
        rawSourceIds.some((id) => !id) || rawSourceIds.length !== new Set(rawSourceIds).size || sourceIds.length < 1;
    if (!ruleId || invalidSourceIds) return { valid: false, ruleId, sourceIds, reason: 'invalid-regex-sources' };
    if (sourceIds.some((id) => !responseById.has(id))) {
        return { valid: false, ruleId, sourceIds, reason: 'unknown-regex-source' };
    }
    if (sourceIds.some((id) => assignedSourceIds.has(id))) {
        return { valid: false, ruleId, sourceIds, reason: 'overlapping-regex-rules' };
    }

    const ruleConfidence = normalizedConfidence(rawRule?.confidence);
    if (ruleConfidence === null || ruleConfidence < confidenceThreshold) {
        return { valid: false, ruleId, sourceIds, reason: 'low-confidence-regex-rule' };
    }
    if (sourceIds.some((id) => !isRegexItemForRule(responseById.get(id), ruleId, confidenceThreshold))) {
        return { valid: false, ruleId, sourceIds, reason: 'regex-item-mismatch' };
    }

    const candidatesById = new Map(candidates.map((candidate) => [candidate.id, candidate]));
    const sourceTexts = sourceIds.map((id) => candidatesById.get(id)?.sourceText || '');
    const singleSample = sourceIds.length === 1;
    if (singleSample && !hasDynamicRegexValue(sourceTexts[0])) {
        return { valid: false, ruleId, sourceIds, reason: 'invalid-single-sample-regex' };
    }
    const validated = validateRegexRuleDefinition(
        { ...rawRule, id: ruleId, sourceIds, confidence: ruleConfidence },
        {
            sourceTexts,
            requireSourceMatch: true,
            requireAnchors: singleSample,
            requireDynamicCapture: singleSample,
        }
    );
    if (!validated.valid) return { valid: false, ruleId, sourceIds, reason: validated.reason };

    sourceIds.forEach((id) => assignedSourceIds.add(id));
    return { valid: true, ruleId, sourceIds, rule: validated.rule };
}

/**
 * Validate the provider response and return both item decisions and grouped
 * regex rules. The response remains JSON-only; RegExp objects are created
 * only by the local validator and output formatter.
 * @param {object} payload
 * @param {Array<object>} candidates
 * @param {number} confidenceThreshold
 * @returns {{decisions: Array<object>, regexRules: Array<object>}}
 */
export function validateTranslationResponse(payload, candidates, confidenceThreshold) {
    const candidateMap = new Map(candidates.map((candidate) => [candidate.id, candidate]));
    const rawItems = Array.isArray(payload?.items) ? payload.items : [];
    const responseById = new Map();
    rawItems.forEach((item) => {
        if (item && typeof item.id === 'string' && candidateMap.has(item.id) && !responseById.has(item.id)) {
            responseById.set(item.id, item);
        }
    });

    const assignedSourceIds = new Set();
    const validRegexRules = new Map();
    const invalidRegexReasons = new Map();
    const invalidRegexSourceReasons = new Map();
    const rawRules = Array.isArray(payload?.regexRules) ? payload.regexRules : [];
    const seenRuleIds = new Set();

    rawRules.forEach((rawRule) => {
        const ruleId = normalizeRegexReference(rawRule?.id);
        const sourceIds = Array.isArray(rawRule?.sourceIds)
            ? rawRule.sourceIds.map(normalizeResponseId).filter(Boolean)
            : [];
        if (seenRuleIds.has(ruleId)) {
            invalidRegexReasons.set(ruleId, 'duplicate-regex-rule-id');
            sourceIds.forEach((id) => {
                invalidRegexReasons.set(id, 'duplicate-regex-rule-id');
                invalidRegexSourceReasons.set(id, 'duplicate-regex-rule-id');
            });
            return;
        }
        seenRuleIds.add(ruleId);
        const result = validateRegexResponseRule(
            rawRule,
            candidates,
            responseById,
            confidenceThreshold,
            assignedSourceIds
        );
        if (result.valid) {
            validRegexRules.set(result.ruleId, result.rule);
        } else {
            invalidRegexReasons.set(result.ruleId, result.reason);
            result.sourceIds.forEach((id) => {
                invalidRegexReasons.set(id, result.reason);
                invalidRegexSourceReasons.set(id, result.reason);
            });
        }
    });

    const decisions = candidates.map((candidate) => {
        const item = responseById.get(candidate.id);
        if (!item) return createReview(candidate, 'missing-result', item);

        const action = normalizeAction(item);
        const confidence = normalizedConfidence(item.confidence);
        const translationType = normalizeTranslationType(item);
        const regexRuleId = normalizeRegexReference(item.regexRuleId);

        if (!ALLOWED_ACTIONS.has(action)) return createReview(candidate, 'invalid-action', item, translationType);
        if (confidence === null)
            return createReview(candidate, 'invalid-confidence', item, translationType, regexRuleId);
        if (action === AI_ACTIONS.REVIEW || confidence < confidenceThreshold) {
            return createReview(candidate, item.reason || 'low-confidence', item, translationType, regexRuleId);
        }

        if (invalidRegexSourceReasons.has(candidate.id)) {
            return createReview(
                candidate,
                invalidRegexSourceReasons.get(candidate.id),
                item,
                translationType,
                regexRuleId
            );
        }

        if (action === AI_ACTIONS.TRANSLATE && translationType === AI_TRANSLATION_TYPES.REGEX) {
            if (!regexRuleId || !validRegexRules.has(regexRuleId) || invalidRegexReasons.has(candidate.id)) {
                return createReview(
                    candidate,
                    invalidRegexReasons.get(candidate.id) || 'invalid-regex-rule',
                    item,
                    translationType,
                    regexRuleId
                );
            }
            return {
                id: candidate.id,
                sourceText: candidate.sourceText,
                action,
                translation: '',
                translationType,
                regexRuleId,
                confidence,
                category: typeof item.category === 'string' ? item.category.slice(0, 80) : '',
                reason: typeof item.reason === 'string' ? item.reason.slice(0, 300) : '',
                status: AI_CANDIDATE_STATUS.TRANSLATED,
            };
        }

        if (action === AI_ACTIONS.TRANSLATE) {
            const translation = typeof item.translation === 'string' ? item.translation.trim() : '';
            if (!translation) return createReview(candidate, 'empty-translation', item);
            if (isUnchangedTranslation(candidate.sourceText, translation)) {
                return {
                    id: candidate.id,
                    sourceText: candidate.sourceText,
                    action: AI_ACTIONS.REMOVE,
                    translation: '',
                    translationType: AI_TRANSLATION_TYPES.TEXT,
                    confidence,
                    category: typeof item.category === 'string' ? item.category.slice(0, 80) : '',
                    reason:
                        typeof item.reason === 'string' && item.reason
                            ? item.reason.slice(0, 300)
                            : 'unchanged-translation',
                    status: AI_CANDIDATE_STATUS.REMOVED,
                };
            }
            if (!placeholdersMatch(candidate.sourceText, translation)) {
                return createReview(candidate, 'placeholder-mismatch', item);
            }
            return {
                id: candidate.id,
                sourceText: candidate.sourceText,
                action,
                translation,
                translationType: AI_TRANSLATION_TYPES.TEXT,
                confidence,
                category: typeof item.category === 'string' ? item.category.slice(0, 80) : '',
                reason: typeof item.reason === 'string' ? item.reason.slice(0, 300) : '',
                status: AI_CANDIDATE_STATUS.TRANSLATED,
            };
        }

        const status = action === AI_ACTIONS.REMOVE ? AI_CANDIDATE_STATUS.REMOVED : AI_CANDIDATE_STATUS.REVIEW;
        return {
            id: candidate.id,
            sourceText: candidate.sourceText,
            action,
            translation: '',
            translationType: AI_TRANSLATION_TYPES.TEXT,
            confidence,
            category: typeof item.category === 'string' ? item.category.slice(0, 80) : '',
            reason: typeof item.reason === 'string' ? item.reason.slice(0, 300) : '',
            status,
        };
    });

    const decisionById = new Map(decisions.map((decision) => [decision.id, decision]));
    const invalidValidatedRuleIds = new Set(
        Array.from(validRegexRules.entries())
            .filter(
                ([, rule]) =>
                    !rule.sourceIds.every((sourceId) => {
                        const decision = decisionById.get(sourceId);
                        return (
                            decision?.translationType === AI_TRANSLATION_TYPES.REGEX &&
                            decision.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                            decision.regexRuleId === rule.id
                        );
                    })
            )
            .map(([id]) => id)
    );
    const finalDecisions = decisions.map((decision) => {
        if (!invalidValidatedRuleIds.has(decision.regexRuleId)) return decision;
        const candidate = candidateMap.get(decision.id);
        return createReview(
            candidate,
            'invalid-regex-group',
            responseById.get(decision.id),
            AI_TRANSLATION_TYPES.REGEX,
            decision.regexRuleId
        );
    });
    const finalDecisionById = new Map(finalDecisions.map((decision) => [decision.id, decision]));

    const finalRegexRules = Array.from(validRegexRules.entries())
        .filter(([, rule]) =>
            rule.sourceIds.every((sourceId) => {
                const decision = finalDecisionById.get(sourceId);
                return (
                    decision?.translationType === AI_TRANSLATION_TYPES.REGEX &&
                    decision.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                    decision.regexRuleId === rule.id
                );
            })
        )
        .map(([, rule]) => rule);
    const usedRuleIds = new Set(finalRegexRules.map((rule) => rule.id));
    const promotedRulesByShape = new Map();
    const promotedDecisions = finalDecisions.map((decision) => {
        if (
            decision.action !== AI_ACTIONS.TRANSLATE ||
            decision.translationType !== AI_TRANSLATION_TYPES.TEXT ||
            decision.status !== AI_CANDIDATE_STATUS.TRANSLATED
        ) {
            return decision;
        }
        const candidate = candidateMap.get(decision.id);
        const generatedId = createRegexRuleId(candidate.sourceText, 'i', decision.translation);
        const promotedRule = createSingleSampleRegexRule({
            id: generatedId,
            sourceId: candidate.id,
            sourceText: candidate.sourceText,
            translation: decision.translation,
            confidence: decision.confidence,
        });
        if (!promotedRule) return decision;
        if (
            finalRegexRules.some((rule) => {
                const regex = new RegExp(rule.pattern, rule.flags);
                regex.lastIndex = 0;
                return regex.test(candidate.sourceText);
            })
        ) {
            return decision;
        }
        const shapeKey = `${promotedRule.pattern}\u0000${promotedRule.flags}\u0000${promotedRule.replacement}`;
        const existingPromotedRule = promotedRulesByShape.get(shapeKey);
        if (existingPromotedRule) {
            existingPromotedRule.sourceIds.push(candidate.id);
            existingPromotedRule.confidence = Math.min(existingPromotedRule.confidence, decision.confidence);
            return {
                ...decision,
                translation: '',
                translationType: AI_TRANSLATION_TYPES.REGEX,
                regexRuleId: existingPromotedRule.id,
            };
        }
        let ruleId = generatedId;
        let suffix = 0;
        while (usedRuleIds.has(ruleId)) {
            suffix += 1;
            ruleId = `${generatedId}-${suffix}`;
        }
        usedRuleIds.add(ruleId);
        const storedRule = {
            ...promotedRule,
            id: ruleId,
            category: decision.category || promotedRule.category,
            reason: decision.reason || promotedRule.reason,
        };
        promotedRulesByShape.set(shapeKey, storedRule);
        return {
            ...decision,
            translation: '',
            translationType: AI_TRANSLATION_TYPES.REGEX,
            regexRuleId: ruleId,
        };
    });

    return {
        decisions: promotedDecisions,
        regexRules: [...finalRegexRules, ...promotedRulesByShape.values()],
    };
}
