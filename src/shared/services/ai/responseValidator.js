import { AI_ACTIONS, AI_CANDIDATE_STATUS } from './contracts.js';

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

function createReview(candidate, reason, item = {}) {
    return {
        id: candidate.id,
        sourceText: candidate.sourceText,
        action: AI_ACTIONS.REVIEW,
        translation: typeof item.translation === 'string' ? item.translation.trim() : '',
        confidence: Number.isFinite(Number(item.confidence)) ? Number(item.confidence) : 0,
        category: typeof item.category === 'string' ? item.category.slice(0, 80) : 'validation',
        reason,
        status: AI_CANDIDATE_STATUS.REVIEW,
    };
}

export function validateTranslationResponse(payload, candidates, confidenceThreshold) {
    const candidateMap = new Map(candidates.map((candidate) => [candidate.id, candidate]));
    const rawItems = Array.isArray(payload?.items) ? payload.items : [];
    const responseById = new Map();
    rawItems.forEach((item) => {
        if (item && typeof item.id === 'string' && candidateMap.has(item.id) && !responseById.has(item.id)) {
            responseById.set(item.id, item);
        }
    });

    return candidates.map((candidate) => {
        const item = responseById.get(candidate.id);
        if (!item) return createReview(candidate, 'missing-result');
        if (!ALLOWED_ACTIONS.has(item.action)) return createReview(candidate, 'invalid-action', item);

        const confidence = Number(item.confidence);
        if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
            return createReview(candidate, 'invalid-confidence', item);
        }
        if (item.action === AI_ACTIONS.REVIEW || confidence < confidenceThreshold) {
            return createReview(candidate, item.reason || 'low-confidence', item);
        }

        const translation = typeof item.translation === 'string' ? item.translation.trim() : '';
        if (item.action === AI_ACTIONS.TRANSLATE) {
            if (!translation) return createReview(candidate, 'empty-translation', item);
            if (!placeholdersMatch(candidate.sourceText, translation)) {
                return createReview(candidate, 'placeholder-mismatch', item);
            }
        }

        const statusMap = {
            [AI_ACTIONS.TRANSLATE]: AI_CANDIDATE_STATUS.TRANSLATED,
            [AI_ACTIONS.KEEP]: AI_CANDIDATE_STATUS.KEEP,
            [AI_ACTIONS.REMOVE]: AI_CANDIDATE_STATUS.REMOVED,
        };

        return {
            id: candidate.id,
            sourceText: candidate.sourceText,
            action: item.action,
            translation: item.action === AI_ACTIONS.TRANSLATE ? translation : '',
            confidence,
            category: typeof item.category === 'string' ? item.category.slice(0, 80) : '',
            reason: typeof item.reason === 'string' ? item.reason.slice(0, 300) : '',
            status: statusMap[item.action],
        };
    });
}
