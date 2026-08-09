import { AI_ACTIONS, AI_CANDIDATE_STATUS, AI_TRANSLATION_TYPES } from '../../shared/services/ai/contracts.js';
import { isSubmittableAiCandidate } from '../../shared/services/ai/candidateText.js';
import { isUnchangedTranslation } from '../../shared/services/ai/responseValidator.js';
import { hasDynamicRegexValue, validateRegexRuleDefinition } from '../../shared/utils/text/regexRules.js';

const DEFAULT_SESSION_USAGE = Object.freeze({ requests: 0, characters: 0 });

export function createEmptyAiSessionState() {
    return {
        candidates: new Map(),
        candidateFingerprints: new Set(),
        decisions: new Map(),
        regexRules: new Map(),
        sessionUsage: { ...DEFAULT_SESSION_USAGE },
    };
}

export function serializeAiSession({
    candidates,
    decisions,
    regexRules,
    siteKey,
    targetLanguage,
    sessionUsage,
    maxItems = 5000,
}) {
    const persistedCandidates = Array.from(candidates.values()).slice(-maxItems);
    const persistedIds = new Set(persistedCandidates.map((candidate) => candidate.id));
    return {
        siteKey,
        targetLanguage,
        candidates: persistedCandidates,
        decisions: Array.from(decisions.values()).filter((decision) => persistedIds.has(decision.id)),
        regexRules: Array.from(regexRules.values()).filter(
            (rule) => rule.sourceIds.length === 0 || rule.sourceIds.every((id) => persistedIds.has(id))
        ),
        sessionUsage,
    };
}

function normalizeCandidate(candidate) {
    if (candidate.status === AI_CANDIDATE_STATUS.KEEP) {
        candidate.status = AI_CANDIDATE_STATUS.REMOVED;
    }
    if (candidate.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
        candidate.status = AI_CANDIDATE_STATUS.PENDING;
    }
    return candidate;
}

function normalizeDecision(decision, candidate) {
    if (decision.action === AI_ACTIONS.KEEP) {
        return { ...decision, action: AI_ACTIONS.REMOVE, status: AI_CANDIDATE_STATUS.REMOVED };
    }
    if (
        decision.action === AI_ACTIONS.TRANSLATE &&
        decision.translationType !== AI_TRANSLATION_TYPES.REGEX &&
        isUnchangedTranslation(candidate.sourceText, decision.translation)
    ) {
        return {
            ...decision,
            action: AI_ACTIONS.REMOVE,
            translation: '',
            translationType: AI_TRANSLATION_TYPES.TEXT,
            reason: 'unchanged-translation',
            status: AI_CANDIDATE_STATUS.REMOVED,
        };
    }
    return decision;
}

function restoreRegexRules(savedRules, candidates) {
    const restoredRules = new Map();
    const restoredRuleIds = new Set();
    const restoredRegexRules = Array.isArray(savedRules) ? savedRules : [];

    restoredRegexRules.forEach((rawRule) => {
        const ruleId = String(rawRule?.id || '').trim();
        if (!ruleId || restoredRuleIds.has(ruleId)) return;

        const sourceIds = Array.isArray(rawRule?.sourceIds)
            ? rawRule.sourceIds.map((id) => String(id || '').trim()).filter(Boolean)
            : [];
        if (new Set(sourceIds).size !== sourceIds.length) return;
        if (sourceIds.some((id) => !candidates.has(id))) return;

        const origin = rawRule?.origin === 'manual' || rawRule?.origin === 'user-edited' ? rawRule.origin : 'ai';
        if (origin === 'ai' && sourceIds.length < 1) return;

        const sourceTexts = sourceIds.map((id) => candidates.get(id).sourceText);
        const singleSample = origin === 'ai' && sourceIds.length === 1;
        if (singleSample && !hasDynamicRegexValue(sourceTexts[0])) return;

        const validated = validateRegexRuleDefinition(
            { ...rawRule, id: ruleId, sourceIds, origin },
            {
                sourceTexts,
                requireSourceMatch: origin === 'ai',
                requireAnchors: singleSample,
                requireDynamicCapture: singleSample,
            }
        );
        if (!validated.valid) return;

        restoredRuleIds.add(ruleId);
        restoredRules.set(ruleId, validated.rule);
    });

    return restoredRules;
}

function reconcileRestoredStatuses(candidates, decisions, regexRules) {
    decisions.forEach((decision, id) => {
        const candidate = candidates.get(id);
        if (!candidate) return;

        if (decision.translationType !== AI_TRANSLATION_TYPES.REGEX) {
            candidate.status = decision.status;
            return;
        }

        if (!regexRules.has(decision.regexRuleId)) {
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
            decisions.delete(id);
            return;
        }

        candidate.status = decision.status;
    });

    regexRules.forEach((rule, ruleId) => {
        const isConsistent =
            rule.sourceIds.length === 0 ||
            rule.sourceIds.every((sourceId) => {
                const decision = decisions.get(sourceId);
                return (
                    decision?.translationType === AI_TRANSLATION_TYPES.REGEX &&
                    decision.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                    decision.regexRuleId === ruleId
                );
            });
        if (isConsistent) return;

        regexRules.delete(ruleId);
        rule.sourceIds.forEach((sourceId) => {
            const decision = decisions.get(sourceId);
            if (decision?.translationType !== AI_TRANSLATION_TYPES.REGEX) return;
            const candidate = candidates.get(sourceId);
            if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
            decisions.delete(sourceId);
        });
    });
}

export function restoreAiSession(saved, { siteKey, targetLanguage } = {}) {
    if (!saved || saved.siteKey !== siteKey || saved.targetLanguage !== targetLanguage) {
        return createEmptyAiSessionState();
    }

    const restoredCandidates = Array.isArray(saved.candidates)
        ? saved.candidates.filter(isSubmittableAiCandidate).map(normalizeCandidate)
        : [];
    const candidates = new Map(restoredCandidates.map((candidate) => [candidate.id, candidate]));
    const candidateFingerprints = new Set(restoredCandidates.map((candidate) => candidate.fingerprint).filter(Boolean));
    const restoredDecisions = Array.isArray(saved.decisions) ? saved.decisions : [];
    const decisions = new Map(
        restoredDecisions
            .filter((decision) => candidates.has(decision.id))
            .map((decision) => [decision.id, normalizeDecision(decision, candidates.get(decision.id))])
    );
    const regexRules = restoreRegexRules(saved.regexRules, candidates);
    reconcileRestoredStatuses(candidates, decisions, regexRules);

    return {
        candidates,
        candidateFingerprints,
        decisions,
        regexRules,
        sessionUsage: {
            requests: Math.max(0, Number(saved.sessionUsage?.requests) || 0),
            characters: Math.max(0, Number(saved.sessionUsage?.characters) || 0),
        },
    };
}
