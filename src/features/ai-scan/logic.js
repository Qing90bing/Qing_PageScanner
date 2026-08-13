import { loadSettings } from '../../shared/services/settings.js';
import { acquireScanMode, releaseScanMode, SCAN_MODES } from '../../shared/services/scanModeCoordinator.js';
import {
    AI_ACTIONS,
    AI_CANDIDATE_STATUS,
    AI_TRANSLATION_TYPES,
    mergeAiSettings,
} from '../../shared/services/ai/contracts.js';
import {
    registerTranslationBridgeClient,
    unregisterTranslationBridgeClient,
    waitForTranslationBridgeIdle,
} from '../../shared/services/translationBridge.js';
import { fire } from '../../shared/utils/core/eventBus.js';
import { buildAiDisplayData } from './resultView.js';
import { applyAiSummaryEditsToState, removeAiSummaryCandidate } from './summaryState.js';
import { createAiCollectionController } from './collectionController.js';
import {
    createAiScanState,
    getAiStateSnapshot as buildAiStateSnapshot,
    getAiSummaryState,
    resetAiDataState,
} from './state.js';
import { createAiSessionStore } from './sessionStore.js';
import { createAiSubmissionController } from './submissionController.js';

const state = createAiScanState();
const runtime = {
    submissionController: null,
};

const emitState = () => {
    fire('aiStateChanged', buildAiStateSnapshot(state, runtime.submissionController?.isProcessing()));
};

const sessionStore = createAiSessionStore(state);
runtime.submissionController = createAiSubmissionController({
    state,
    sessionStore,
    emitState,
});
const collectionController = createAiCollectionController({
    state,
    emitState,
    hasRequest: runtime.submissionController.hasRequest,
    persistState: sessionStore.persist,
    submitPending: runtime.submissionController.submitPending,
});

export async function startAiScan() {
    if (state.isActive) return { started: true };
    const aiSettings = mergeAiSettings(loadSettings().ai);
    if (!aiSettings.enabled) {
        return { started: false, reason: 'disabled' };
    }
    if (!acquireScanMode(SCAN_MODES.AI)) {
        return { started: false, reason: 'mode-conflict' };
    }

    state.isActive = true;
    state.isPaused = false;
    state.generation += 1;
    state.lastError = null;
    state.budgetBlockedReason = null;
    state.userRemovedFingerprints = new Set();
    state.currentSiteKey = window.location.origin;
    state.currentTargetLanguage = aiSettings.targetLanguage;

    try {
        registerTranslationBridgeClient();
        await sessionStore.loadCache();
        await sessionStore.restore();
        await waitForTranslationBridgeIdle();
        if (!state.isActive) return { started: false, reason: 'stopped' };

        collectionController.start();
        emitState();
        return { started: true };
    } catch (error) {
        state.isActive = false;
        state.isPaused = false;
        collectionController.stop();
        runtime.submissionController.cancel();
        unregisterTranslationBridgeClient();
        releaseScanMode(SCAN_MODES.AI);
        state.lastError = error;
        emitState();
        throw error;
    }
}

export async function stopAiScan() {
    if (!state.isActive) {
        releaseScanMode(SCAN_MODES.AI);
        return;
    }

    state.isActive = false;
    state.isPaused = false;
    state.generation += 1;
    collectionController.stop();
    runtime.submissionController.cancel();
    runtime.submissionController.markInFlightAsPending();
    unregisterTranslationBridgeClient();
    releaseScanMode(SCAN_MODES.AI);
    await sessionStore.persist();
    emitState();
}

function isReviewDecision(decision) {
    return decision?.status === AI_CANDIDATE_STATUS.REVIEW || decision?.status === AI_CANDIDATE_STATUS.FAILED;
}

function persistReviewMutation(cacheChanged = false) {
    const tasks = [sessionStore.persist()];
    if (cacheChanged) tasks.push(sessionStore.saveCache());
    Promise.all(tasks).catch(() => {
        state.lastError = { code: 'storage' };
        emitState();
    });
    emitState();
}

export function removeAiReviewItem(candidateId) {
    const id = String(candidateId || '').trim();
    const decision = state.decisions.get(id);
    if (!isReviewDecision(decision) || !state.candidates.has(id)) return { changed: false };

    const removed = removeAiSummaryCandidate(getAiSummaryState(state, window.location.origin), id);
    if (!removed.changed) return { changed: false };
    persistReviewMutation(removed.cacheChanged);
    return { changed: true };
}

export function restoreAiReviewItem(candidateId) {
    const id = String(candidateId || '').trim();
    const candidate = state.candidates.get(id);
    const decision = state.decisions.get(id);
    if (!candidate || !isReviewDecision(decision)) return { changed: false };

    candidate.status = AI_CANDIDATE_STATUS.PENDING;
    state.decisions.delete(id);
    state.budgetBlockedReason = null;
    persistReviewMutation();
    return { changed: true };
}

export async function clearAiData() {
    if (state.isClearing) return;
    state.isClearing = true;
    state.generation += 1;
    try {
        const requestToCancel = runtime.submissionController.cancel();
        if (requestToCancel) {
            await requestToCancel.promise.catch(() => undefined);
        }
        runtime.submissionController.resetRequestState();
        resetAiDataState(state);
        await sessionStore.clear();
        emitState();
    } finally {
        state.isClearing = false;
    }
}

export function getAcceptedTranslationPairs() {
    return Array.from(state.decisions.values())
        .filter(
            (decision) =>
                decision.action === AI_ACTIONS.TRANSLATE &&
                decision.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                decision.translationType !== AI_TRANSLATION_TYPES.REGEX
        )
        .map((decision) => ({ sourceText: decision.sourceText, translation: decision.translation }));
}

export function getAiDisplayPairs() {
    return getAiDisplayData().textPairs;
}

export function getAiDisplayData() {
    return buildAiDisplayData(
        Array.from(state.candidates.values()),
        Array.from(state.decisions.values()),
        Array.from(state.regexRules.values())
    );
}

export function getAiRegexRules() {
    return Array.from(state.regexRules.values()).map((rule) => ({ ...rule, sourceIds: [...rule.sourceIds] }));
}

export function getReviewItems() {
    return Array.from(state.decisions.values()).filter(
        (decision) => decision.status === AI_CANDIDATE_STATUS.REVIEW || decision.status === AI_CANDIDATE_STATUS.FAILED
    );
}

export function applyAiSummaryEdits({ remainingSourceTexts = null, editedRegexRules = null } = {}) {
    const summaryState = getAiSummaryState(state, window.location.origin);
    const result = applyAiSummaryEditsToState(summaryState, { remainingSourceTexts, editedRegexRules });
    state.regexRules = summaryState.regexRules;

    if (result.changed) {
        const tasks = [sessionStore.persist()];
        if (result.cacheChanged) tasks.push(sessionStore.saveCache());
        Promise.all(tasks).catch(() => {
            state.lastError = { code: 'storage' };
            emitState();
        });
        emitState();
    }
    return { changed: result.changed, error: result.error };
}

export function applyAiSummaryDeletions(remainingSourceTexts) {
    return applyAiSummaryEdits({ remainingSourceTexts }).changed;
}

export function getAiStateSnapshot() {
    return buildAiStateSnapshot(state, runtime.submissionController.isProcessing());
}

export function isAiScanActive() {
    return state.isActive;
}

export function isAiScanPaused() {
    return state.isPaused;
}

export function pauseAiScan() {
    if (!state.isActive || state.isPaused) return false;
    state.isPaused = true;
    collectionController.pause();
    emitState();
    return true;
}

export function resumeAiScan() {
    if (!state.isActive || !state.isPaused) return false;
    state.isPaused = false;
    collectionController.resume();
    emitState();
    return true;
}

export function hasAiData() {
    return state.candidates.size > 0 || state.decisions.size > 0 || state.regexRules.size > 0;
}

export const submitPending = runtime.submissionController.submitPending;
export const retryReviewItems = runtime.submissionController.retryReviewItems;
