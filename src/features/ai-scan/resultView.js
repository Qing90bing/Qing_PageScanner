import { AI_ACTIONS, AI_CANDIDATE_STATUS, AI_TRANSLATION_TYPES } from '../../shared/services/ai/contracts.js';
import { hasMeaningfulAiSourceText } from '../../shared/services/ai/candidateText.js';

export const HIDDEN_OUTPUT_STATUSES = new Set([AI_CANDIDATE_STATUS.KEEP, AI_CANDIDATE_STATUS.REMOVED]);

export function isHiddenOutputStatus(status) {
    return HIDDEN_OUTPUT_STATUSES.has(status);
}

/**
 * Build the editable summary view from the complete local candidate state.
 * Pending, in-flight, review, and failed items remain visible with an empty
 * translation. Removed items are excluded, and legacy kept items are treated
 * as removed. Only validated translated decisions populate the second value.
 * @param {Array<object>} candidateItems
 * @param {Array<object>} decisionItems
 * @param {Array<object>} [regexRules]
 * @returns {{textPairs: Array<{sourceText: string, translation: string}>, regexRules: Array<object>}}
 */
export function buildAiDisplayData(candidateItems, decisionItems, regexRules = []) {
    const decisionById = new Map(decisionItems.map((decision) => [decision.id, decision]));
    const visibleRegexRules = Array.isArray(regexRules)
        ? regexRules.filter((rule) => typeof rule?.id === 'string' && rule.id.trim() && Array.isArray(rule.sourceIds))
        : [];
    const regexCandidateIds = new Set(visibleRegexRules.flatMap((rule) => rule.sourceIds));

    const textPairs = candidateItems
        .filter(
            (candidate) =>
                hasMeaningfulAiSourceText(candidate.sourceText) &&
                !HIDDEN_OUTPUT_STATUSES.has(candidate.status) &&
                !regexCandidateIds.has(candidate.id)
        )
        .map((candidate) => {
            const decision = decisionById.get(candidate.id);
            const hasValidatedTranslation =
                candidate.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                decision?.action === AI_ACTIONS.TRANSLATE &&
                decision?.translationType !== AI_TRANSLATION_TYPES.REGEX &&
                typeof decision.translation === 'string';

            return {
                sourceText: candidate.sourceText,
                translation: hasValidatedTranslation ? decision.translation : '',
            };
        });

    return { textPairs, regexRules: visibleRegexRules };
}

/**
 * Build the editable pure-text part of the AI summary.
 * @param {Array<object>} candidateItems
 * @param {Array<object>} decisionItems
 * @returns {Array<{sourceText: string, translation: string}>}
 */
export function buildAiDisplayPairs(candidateItems, decisionItems) {
    return buildAiDisplayData(candidateItems, decisionItems).textPairs;
}
