import { AI_CANDIDATE_STATUS } from '../../shared/services/ai/contracts.js';
import {
    createRegexRuleId,
    matchEditedRegexRulesToExisting,
    validateRegexRuleDefinition,
} from '../../shared/utils/text/regexRules.js';
import { createManualSummaryCandidate, reconcileAiSummarySources } from './summaryEdits.js';

export function removeAiSummaryCandidate(state, id) {
    const candidate = state.candidates.get(id);
    if (!candidate) return { changed: false, cacheChanged: false };

    state.candidates.delete(id);
    state.decisions.delete(id);
    let cacheChanged = false;
    if (candidate.fingerprint) {
        state.candidateFingerprints.delete(candidate.fingerprint);
        state.userRemovedFingerprints.add(candidate.fingerprint);
        cacheChanged = state.cache.delete(candidate.fingerprint);
    }
    return { changed: true, cacheChanged };
}

export function applyAiSummaryEditsToState(state, { remainingSourceTexts = null, editedRegexRules = null } = {}) {
    const hasTextEdits = Array.isArray(remainingSourceTexts);
    let changed = false;
    let cacheChanged = false;
    let regexRules = state.regexRules;

    if (Array.isArray(editedRegexRules)) {
        const existingRules = Array.from(regexRules.values());
        const matchedRules = matchEditedRegexRulesToExisting(editedRegexRules, existingRules);
        if (!matchedRules.valid) return { changed: false, error: matchedRules.error };

        const nextRegexRules = new Map();
        const assignedSourceIds = new Set();
        for (let index = 0; index < editedRegexRules.length; index += 1) {
            const editedRule = editedRegexRules[index];
            const requestedId = String(editedRule?.id || '').trim();
            const existingRule = matchedRules.matches[index];
            const ruleId =
                requestedId ||
                existingRule?.id ||
                createRegexRuleId(
                    editedRule?.pattern || '',
                    editedRule?.flags || '',
                    editedRule?.replacement || '',
                    index
                );
            let uniqueRuleId = ruleId;
            let suffix = 0;
            while (
                !requestedId &&
                !existingRule &&
                (regexRules.has(uniqueRuleId) || nextRegexRules.has(uniqueRuleId))
            ) {
                suffix += 1;
                uniqueRuleId = `${ruleId}-${suffix}`;
            }
            if (nextRegexRules.has(uniqueRuleId)) return { changed: false, error: 'duplicate-regex-rule-id' };

            const sourceIds = existingRule
                ? [...existingRule.sourceIds]
                : Array.isArray(editedRule?.sourceIds)
                  ? editedRule.sourceIds.map((id) => String(id || '').trim()).filter(Boolean)
                  : [];
            if (sourceIds.some((id) => assignedSourceIds.has(id))) {
                return { changed: false, error: 'overlapping-regex-rules' };
            }
            if (sourceIds.some((id) => !state.candidates.has(id))) {
                return { changed: false, error: 'unknown-regex-source' };
            }

            const candidateSourceTexts = sourceIds.map((id) => state.candidates.get(id).sourceText);
            const validated = validateRegexRuleDefinition(
                {
                    ...(existingRule || {}),
                    ...editedRule,
                    id: uniqueRuleId,
                    sourceIds,
                    confidence:
                        existingRule?.confidence ??
                        (Number.isFinite(Number(editedRule?.confidence)) ? Number(editedRule.confidence) : 1),
                    origin: existingRule ? 'user-edited' : editedRule?.origin || 'manual',
                },
                { sourceTexts: candidateSourceTexts, requireSourceMatch: false }
            );
            if (!validated.valid) return { changed: false, error: validated.reason };
            sourceIds.forEach((id) => assignedSourceIds.add(id));
            nextRegexRules.set(uniqueRuleId, validated.rule);
        }

        regexRules.forEach((rule, ruleId) => {
            if (nextRegexRules.has(ruleId)) return;
            rule.sourceIds.forEach((id) => {
                const removed = removeAiSummaryCandidate(state, id);
                cacheChanged = cacheChanged || removed.cacheChanged;
            });
            changed = true;
        });
        if (nextRegexRules.size !== regexRules.size) changed = true;
        else {
            nextRegexRules.forEach((rule, ruleId) => {
                const previous = regexRules.get(ruleId);
                if (
                    !previous ||
                    previous.pattern !== rule.pattern ||
                    previous.flags !== rule.flags ||
                    previous.replacement !== rule.replacement
                ) {
                    changed = true;
                }
            });
        }
        regexRules = nextRegexRules;
    }

    const regexCandidateIds = new Set(
        Array.from(regexRules.values()).flatMap((rule) => (Array.isArray(rule.sourceIds) ? rule.sourceIds : []))
    );

    if (hasTextEdits) {
        const reconciliation = reconcileAiSummarySources(
            remainingSourceTexts,
            Array.from(state.candidates.values()),
            regexCandidateIds
        );

        reconciliation.revivedCandidateIds.forEach((id) => {
            const candidate = state.candidates.get(id);
            if (!candidate) return;
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
            state.decisions.delete(id);
            if (candidate.fingerprint) state.userRemovedFingerprints.delete(candidate.fingerprint);
            changed = true;
        });

        reconciliation.addedSourceTexts.forEach((sourceText) => {
            const candidate = createManualSummaryCandidate(sourceText, {
                siteKey: state.siteKey,
                targetLanguage: state.targetLanguage,
            });
            if (!candidate || state.candidateFingerprints.has(candidate.fingerprint)) return;
            state.candidates.set(candidate.id, candidate);
            state.candidateFingerprints.add(candidate.fingerprint);
            state.userRemovedFingerprints.delete(candidate.fingerprint);
            changed = true;
        });

        reconciliation.removedCandidateIds.forEach((id) => {
            const removed = removeAiSummaryCandidate(state, id);
            cacheChanged = cacheChanged || removed.cacheChanged;
            changed = removed.changed || changed;
        });
    }

    state.regexRules = regexRules;
    return { changed, cacheChanged, error: null };
}
