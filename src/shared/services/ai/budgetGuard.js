import { isSubmittableAiCandidate } from './candidateText.js';

export const AI_RESPONSE_TOKEN_LIMIT = 8192;
export const AI_BATCH_RESPONSE_TOKEN_BUDGET = 7168;

export function estimateTokens(value) {
    return Math.max(1, Math.ceil(String(value || '').length / 3));
}

/**
 * Estimate the JSON response space required for one classification result.
 * The fixed allowance covers ids, action metadata, confidence, and JSON syntax.
 * @param {object} candidate
 * @returns {number}
 */
export function estimateCandidateResponseTokens(candidate) {
    return Math.max(48, String(candidate?.sourceText || '').length + 48);
}

/** @param {Array<object>} candidates */
export function estimateBatchResponseTokens(candidates) {
    return candidates.reduce((total, candidate) => total + estimateCandidateResponseTokens(candidate), 32);
}

export function selectBatch(candidates, limits) {
    const selected = [];
    const oversized = [];
    const invalid = [];
    let characters = 0;
    let estimatedOutputTokens = 32;
    const outputTokenBudget = Math.min(
        AI_RESPONSE_TOKEN_LIMIT,
        Math.max(256, Number(limits.maxEstimatedOutputTokens) || AI_BATCH_RESPONSE_TOKEN_BUDGET)
    );

    for (const candidate of candidates) {
        if (selected.length >= limits.maxItems) break;
        if (!isSubmittableAiCandidate(candidate)) {
            invalid.push(candidate);
            continue;
        }
        const length = candidate.sourceText.length;
        if (length > limits.maxCharacters) {
            oversized.push(candidate);
            continue;
        }
        if (selected.length > 0 && characters + length > limits.maxCharacters) break;
        const candidateOutputTokens = estimateCandidateResponseTokens(candidate);
        if (selected.length > 0 && estimatedOutputTokens + candidateOutputTokens > outputTokenBudget) break;
        selected.push(candidate);
        characters += length;
        estimatedOutputTokens += candidateOutputTokens;
    }

    return { candidates: selected, oversized, invalid, characters, estimatedOutputTokens };
}

export function checkBudget({ settings, sessionUsage, dailyUsage, requestPayload, nextCharacters = 0 }) {
    const estimatedTokens = estimateTokens(JSON.stringify(requestPayload)) * 2;
    if (sessionUsage.requests >= settings.maxRequestsPerSession) {
        return { allowed: false, reason: 'session-requests', estimatedTokens };
    }
    if (sessionUsage.characters + nextCharacters > settings.maxCharactersPerSession) {
        return { allowed: false, reason: 'session-characters', estimatedTokens };
    }
    if (dailyUsage.tokens + estimatedTokens > settings.maxEstimatedTokensPerDay) {
        return { allowed: false, reason: 'daily-tokens', estimatedTokens };
    }
    return { allowed: true, reason: null, estimatedTokens };
}
