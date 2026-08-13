import { AI_ACTIONS, AI_CANDIDATE_STATUS, AI_TRANSLATION_TYPES } from '../../shared/services/ai/contracts.js';
import { createEmptyAiSessionState } from './session.js';

export function createAiScanState() {
    return {
        ...createEmptyAiSessionState(),
        isActive: false,
        isPaused: false,
        cache: new Map(),
        generation: 0,
        currentSiteKey: '',
        currentTargetLanguage: 'zh-CN',
        lastError: null,
        budgetBlockedReason: null,
        isClearing: false,
        userRemovedFingerprints: new Set(),
    };
}

export function getAiCounts(state) {
    const counts = {
        total: state.candidates.size,
        pending: 0,
        inflight: 0,
        translated: 0,
        keep: 0,
        removed: 0,
        review: 0,
        failed: 0,
        textRules: 0,
        regexRules: state.regexRules.size,
    };

    state.candidates.forEach((candidate) => {
        if (Object.prototype.hasOwnProperty.call(counts, candidate.status)) {
            counts[candidate.status] += 1;
        }
    });

    state.decisions.forEach((decision) => {
        if (decision.status !== AI_CANDIDATE_STATUS.TRANSLATED || decision.action !== AI_ACTIONS.TRANSLATE) return;
        if (decision.translationType === AI_TRANSLATION_TYPES.REGEX) return;
        counts.textRules += 1;
    });

    return counts;
}

export function getAiStateSnapshot(state, isProcessing) {
    return {
        active: state.isActive,
        paused: state.isPaused,
        processing: Boolean(isProcessing),
        counts: getAiCounts(state),
        sessionUsage: { ...state.sessionUsage },
        lastErrorCode: state.lastError?.code || null,
        budgetBlockedReason: state.budgetBlockedReason,
    };
}

export function markInFlightAsPending(state, candidateIds) {
    candidateIds.forEach((id) => {
        const candidate = state.candidates.get(id);
        if (candidate && candidate.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
        }
    });
}

export function resetAiDataState(state) {
    state.candidates.clear();
    state.candidateFingerprints.clear();
    state.decisions.clear();
    state.regexRules.clear();
    state.sessionUsage = { requests: 0, characters: 0 };
    state.lastError = null;
    state.budgetBlockedReason = null;
    state.userRemovedFingerprints.clear();
}

export function getAiSummaryState(state, defaultSiteKey = '') {
    return {
        candidates: state.candidates,
        candidateFingerprints: state.candidateFingerprints,
        decisions: state.decisions,
        regexRules: state.regexRules,
        cache: state.cache,
        userRemovedFingerprints: state.userRemovedFingerprints,
        siteKey: state.currentSiteKey || defaultSiteKey,
        targetLanguage: state.currentTargetLanguage,
    };
}
