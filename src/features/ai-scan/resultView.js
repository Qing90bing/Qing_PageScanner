import { AI_ACTIONS, AI_CANDIDATE_STATUS } from '../../shared/services/ai/contracts.js';
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
 * @returns {Array<{sourceText: string, translation: string}>}
 */
export function buildAiDisplayPairs(candidateItems, decisionItems) {
    const decisionById = new Map(decisionItems.map((decision) => [decision.id, decision]));

    return candidateItems
        .filter(
            (candidate) =>
                hasMeaningfulAiSourceText(candidate.sourceText) && !HIDDEN_OUTPUT_STATUSES.has(candidate.status)
        )
        .map((candidate) => {
            const decision = decisionById.get(candidate.id);
            const hasValidatedTranslation =
                candidate.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                decision?.action === AI_ACTIONS.TRANSLATE &&
                typeof decision.translation === 'string';

            return {
                sourceText: candidate.sourceText,
                translation: hasValidatedTranslation ? decision.translation : '',
            };
        });
}
