import { loadSettings } from '../../shared/services/settings.js';
import {
    AI_ACTIONS,
    AI_CANDIDATE_STATUS,
    AI_TRANSLATION_TYPES,
    getActiveProvider,
    AI_PROCESSING_MODES,
    mergeAiSettings,
} from '../../shared/services/ai/contracts.js';
import { buildPageContext } from '../../shared/services/ai/pageContextBuilder.js';
import { buildTranslationRequest } from '../../shared/services/ai/promptBuilder.js';
import { createChatCompletionRequest, validateProviderConfiguration } from '../../shared/services/ai/providerClient.js';
import { parseJsonContent, validateTranslationResponse } from '../../shared/services/ai/responseValidator.js';
import { checkBudget, selectBatch } from '../../shared/services/ai/budgetGuard.js';
import { isSubmittableAiCandidate } from '../../shared/services/ai/candidateText.js';
import { addDailyUsage, loadDailyUsage, loadProviderApiKey } from '../../shared/services/ai/storage.js';
import { matchStyleProfile } from '../../shared/services/ai/siteStyleStore.js';
import { fire } from '../../shared/utils/core/eventBus.js';
import { markInFlightAsPending } from './state.js';

export function createAiSubmissionController({ state, sessionStore, emitState }) {
    const runtime = {
        currentRequest: null,
        inFlightCandidateIds: [],
        submissionInProgress: false,
    };

    function hasRequest() {
        return runtime.currentRequest !== null;
    }

    function isProcessing() {
        return hasRequest() || runtime.submissionInProgress;
    }

    function cancel() {
        const request = runtime.currentRequest;
        if (request) request.abort();
        runtime.currentRequest = null;
        return request;
    }

    function resetRequestState() {
        runtime.currentRequest = null;
        runtime.inFlightCandidateIds = [];
    }

    function resetInFlightCandidates() {
        markInFlightAsPending(state, runtime.inFlightCandidateIds);
        runtime.inFlightCandidateIds = [];
    }

    async function performSubmitPending() {
        if (hasRequest() || state.isClearing) return { submitted: false, reason: 'inactive-or-busy' };
        const submissionGeneration = state.generation;

        const settings = loadSettings();
        const aiSettings = mergeAiSettings(settings.ai);
        const provider = getActiveProvider(aiSettings);
        if (!provider) return { submitted: false, reason: 'missing-provider' };

        const pending = Array.from(state.candidates.values()).filter(
            (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
        );
        const batch = selectBatch(pending, aiSettings.batch);
        batch.invalid.forEach((candidate) => {
            state.candidates.delete(candidate.id);
            state.decisions.delete(candidate.id);
            if (candidate.fingerprint) state.candidateFingerprints.delete(candidate.fingerprint);
        });
        batch.oversized.forEach((candidate) => {
            candidate.status = AI_CANDIDATE_STATUS.REVIEW;
            state.decisions.set(candidate.id, {
                id: candidate.id,
                sourceText: candidate.sourceText,
                action: AI_ACTIONS.REVIEW,
                translation: '',
                confidence: 0,
                category: 'local-validation',
                reason: 'source-too-long',
                status: AI_CANDIDATE_STATUS.REVIEW,
            });
        });
        if (batch.invalid.length > 0 || batch.oversized.length > 0) {
            await sessionStore.persist();
            emitState();
        }
        if (state.generation !== submissionGeneration || state.isClearing) {
            return { submitted: false, reason: 'stale' };
        }
        if (batch.candidates.length === 0) return { submitted: false, reason: 'empty' };

        const [apiKey, styleProfile, dailyUsage] = await Promise.all([
            loadProviderApiKey(provider.id),
            matchStyleProfile(window.location, state.currentTargetLanguage),
            loadDailyUsage(),
        ]);
        if (state.generation !== submissionGeneration || state.isClearing) {
            return { submitted: false, reason: 'stale' };
        }
        const pageContext = buildPageContext({ targetLanguage: state.currentTargetLanguage });
        const payload = buildTranslationRequest({
            provider,
            candidates: batch.candidates,
            targetLanguage: state.currentTargetLanguage,
            styleProfile,
            pageContext,
        });
        try {
            validateProviderConfiguration(provider, apiKey);
        } catch (error) {
            state.lastError = error;
            emitState();
            fire('aiRequestFailed', { code: error?.code || 'invalid-provider' });
            return { submitted: false, reason: error?.code || 'invalid-provider' };
        }
        const budget = checkBudget({
            settings: aiSettings.budget,
            sessionUsage: state.sessionUsage,
            dailyUsage,
            requestPayload: payload,
            nextCharacters: batch.characters,
        });
        if (!budget.allowed) {
            state.budgetBlockedReason = budget.reason;
            emitState();
            fire('aiBudgetBlocked', budget.reason);
            return { submitted: false, reason: budget.reason };
        }
        state.budgetBlockedReason = null;

        try {
            await addDailyUsage(budget.estimatedTokens);
        } catch {
            state.lastError = { code: 'storage' };
            emitState();
            return { submitted: false, reason: 'storage' };
        }
        if (state.generation !== submissionGeneration || state.isClearing) {
            return { submitted: false, reason: 'stale' };
        }

        batch.candidates.forEach((candidate) => {
            candidate.status = AI_CANDIDATE_STATUS.IN_FLIGHT;
        });
        const requestCandidateIds = batch.candidates.map((candidate) => candidate.id);
        runtime.inFlightCandidateIds = requestCandidateIds;
        state.sessionUsage.requests += 1;
        state.sessionUsage.characters += batch.characters;
        state.lastError = null;
        emitState();

        const requestGeneration = submissionGeneration;
        const requestRuntime = { handle: null };
        try {
            requestRuntime.handle = createChatCompletionRequest({
                provider,
                apiKey,
                payload,
                timeoutMs: aiSettings.requestTimeoutMs,
            });
            runtime.currentRequest = requestRuntime.handle;
            const response = await requestRuntime.handle.promise;
            if (requestGeneration !== state.generation) {
                return { submitted: false, reason: 'stale' };
            }

            const parsed = parseJsonContent(response.content);
            const validated = validateTranslationResponse(parsed, batch.candidates, aiSettings.confidenceThreshold);
            const regexRuleIdMap = new Map();
            validated.regexRules.forEach((rule) => {
                const ruleRuntime = { id: rule.id, suffix: 0 };
                while (state.regexRules.has(ruleRuntime.id)) {
                    ruleRuntime.suffix += 1;
                    ruleRuntime.id = `${rule.id}-${ruleRuntime.suffix}`;
                }
                regexRuleIdMap.set(rule.id, ruleRuntime.id);
                state.regexRules.set(ruleRuntime.id, { ...rule, id: ruleRuntime.id });
            });
            validated.decisions.forEach((decision) => {
                const candidate = state.candidates.get(decision.id);
                if (!candidate) return;
                const storedDecision =
                    decision.translationType === AI_TRANSLATION_TYPES.REGEX && regexRuleIdMap.has(decision.regexRuleId)
                        ? { ...decision, regexRuleId: regexRuleIdMap.get(decision.regexRuleId) }
                        : decision;
                candidate.status = storedDecision.status;
                state.decisions.set(decision.id, storedDecision);
                if (
                    storedDecision.translationType !== AI_TRANSLATION_TYPES.REGEX &&
                    [AI_ACTIONS.TRANSLATE, AI_ACTIONS.KEEP, AI_ACTIONS.REMOVE].includes(storedDecision.action)
                ) {
                    state.cache.set(candidate.fingerprint, {
                        fingerprint: candidate.fingerprint,
                        siteKey: candidate.siteKey,
                        targetLanguage: candidate.targetLanguage,
                        sourceText: candidate.sourceText,
                        providerId: provider.id,
                        model: provider.model,
                        styleVersion: styleProfile?.version || 0,
                        decision: storedDecision,
                        updatedAt: Date.now(),
                    });
                } else if (storedDecision.translationType === AI_TRANSLATION_TYPES.REGEX) {
                    state.cache.delete(candidate.fingerprint);
                }
            });
            await Promise.all([sessionStore.saveCache(), sessionStore.persist()]);
            return { submitted: true, count: validated.decisions.length };
        } catch (error) {
            if (requestGeneration !== state.generation) {
                return { submitted: false, reason: 'stale' };
            }
            if (error?.code !== 'aborted') {
                state.lastError = error;
                const validationFailure =
                    error instanceof SyntaxError ||
                    error?.message === 'empty-response' ||
                    ['truncated-response', 'invalid-response'].includes(error?.code);
                requestCandidateIds.forEach((id) => {
                    const candidate = state.candidates.get(id);
                    if (!candidate) return;
                    candidate.status = validationFailure ? AI_CANDIDATE_STATUS.REVIEW : AI_CANDIDATE_STATUS.FAILED;
                    state.decisions.set(id, {
                        id,
                        sourceText: candidate.sourceText,
                        action: AI_ACTIONS.REVIEW,
                        translation: '',
                        confidence: 0,
                        category: validationFailure ? 'validation' : 'request-error',
                        reason: validationFailure
                            ? error?.code || error?.message || 'invalid-response'
                            : error?.code || 'request-error',
                        status: candidate.status,
                    });
                });
                await sessionStore.persist();
                fire('aiRequestFailed', { code: error?.code || 'unknown' });
            } else {
                requestCandidateIds.forEach((id) => {
                    const candidate = state.candidates.get(id);
                    if (candidate?.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
                        candidate.status = AI_CANDIDATE_STATUS.PENDING;
                    }
                });
            }
            return { submitted: false, reason: error?.code || 'unknown' };
        } finally {
            if (runtime.currentRequest === requestRuntime.handle) {
                runtime.currentRequest = null;
                runtime.inFlightCandidateIds = [];
            }
            emitState();
        }
    }

    async function submitPending() {
        if (hasRequest() || state.isClearing || runtime.submissionInProgress) {
            return { submitted: false, reason: 'inactive-or-busy' };
        }

        const pending = Array.from(state.candidates.values()).filter(
            (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
        );
        const invalid = pending.filter((candidate) => !isSubmittableAiCandidate(candidate));
        invalid.forEach((candidate) => {
            state.candidates.delete(candidate.id);
            state.decisions.delete(candidate.id);
            if (candidate.fingerprint) state.candidateFingerprints.delete(candidate.fingerprint);
        });
        if (invalid.length > 0) {
            await sessionStore.persist();
            emitState();
        }
        if (!pending.some(isSubmittableAiCandidate)) {
            return { submitted: false, reason: 'empty' };
        }

        runtime.submissionInProgress = true;
        emitState();
        const submissionResult = { value: null };
        try {
            submissionResult.value = await performSubmitPending();
            return submissionResult.value;
        } finally {
            runtime.submissionInProgress = false;
            emitState();
            const latestSettings = mergeAiSettings(loadSettings().ai);
            if (
                submissionResult.value?.submitted &&
                state.isActive &&
                !state.isPaused &&
                !state.isClearing &&
                latestSettings.processingMode === AI_PROCESSING_MODES.AUTO &&
                Array.from(state.candidates.values()).some(
                    (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
                ) &&
                !state.budgetBlockedReason
            ) {
                queueMicrotask(() => void submitPending());
            }
        }
    }

    async function retryReviewItems() {
        state.decisions.forEach((decision, id) => {
            if (decision.status === AI_CANDIDATE_STATUS.REVIEW || decision.status === AI_CANDIDATE_STATUS.FAILED) {
                const candidate = state.candidates.get(id);
                if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
                state.decisions.delete(id);
            }
        });
        state.budgetBlockedReason = null;
        await sessionStore.persist();
        emitState();
        return submitPending();
    }

    return {
        cancel,
        hasRequest,
        isProcessing,
        markInFlightAsPending: resetInFlightCandidates,
        resetRequestState,
        retryReviewItems,
        submitPending,
    };
}
