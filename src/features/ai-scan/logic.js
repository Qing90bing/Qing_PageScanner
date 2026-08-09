import { loadSettings } from '../settings/logic.js';
import { appConfig } from '../settings/config.js';
import { acquireScanMode, releaseScanMode, SCAN_MODES } from '../../shared/services/scanModeCoordinator.js';
import {
    AI_ACTIONS,
    AI_CANDIDATE_STATUS,
    AI_PROCESSING_MODES,
    AI_TRANSLATION_TYPES,
    getActiveProvider,
    mergeAiSettings,
} from '../../shared/services/ai/contracts.js';
import { extractAiCandidates } from '../../shared/services/ai/candidateExtractor.js';
import { buildPageContext } from '../../shared/services/ai/pageContextBuilder.js';
import { buildTranslationRequest } from '../../shared/services/ai/promptBuilder.js';
import { createChatCompletionRequest, validateProviderConfiguration } from '../../shared/services/ai/providerClient.js';
import {
    isUnchangedTranslation,
    parseJsonContent,
    validateTranslationResponse,
} from '../../shared/services/ai/responseValidator.js';
import { checkBudget, selectBatch } from '../../shared/services/ai/budgetGuard.js';
import { isSubmittableAiCandidate } from '../../shared/services/ai/candidateText.js';
import {
    addDailyUsage,
    clearAiCacheForSite,
    clearAiSession,
    loadAiCache,
    loadAiSession,
    loadDailyUsage,
    loadProviderApiKey,
    saveAiCache,
    saveAiSession,
} from '../../shared/services/ai/storage.js';
import { matchStyleProfile } from '../../shared/services/ai/siteStyleStore.js';
import {
    createRegexRuleId,
    hasDynamicRegexValue,
    matchEditedRegexRulesToExisting,
    validateRegexRuleDefinition,
} from '../../shared/utils/text/regexRules.js';
import {
    isTranslationBridgeActive,
    isTranslationBridgeIdle,
    registerTranslationBridgeClient,
    unregisterTranslationBridgeClient,
    waitForTranslationBridgeIdle,
} from '../../shared/services/translationBridge.js';
import { fire } from '../../shared/utils/core/eventBus.js';
import { buildAiDisplayData } from './resultView.js';
import { createManualSummaryCandidate, reconcileAiSummarySources } from './summaryEdits.js';

let isActive = false;
let isPaused = false;
let observer = null;
let rootFlushTimer = null;
let autoSubmitTimer = null;
let pendingRoots = new Set();
let candidates = new Map();
let candidateFingerprints = new Set();
let decisions = new Map();
let regexRules = new Map();
let cache = new Map();
let currentRequest = null;
let inFlightCandidateIds = [];
let generation = 0;
let currentSiteKey = '';
let currentTargetLanguage = 'zh-CN';
let sessionUsage = { requests: 0, characters: 0 };
let lastError = null;
let budgetBlockedReason = null;
let persistenceChain = Promise.resolve();
let isClearing = false;
let submissionInProgress = false;
let userRemovedFingerprints = new Set();
const MAX_PERSISTED_SESSION_ITEMS = 5000;
const AI_OBSERVER_OPTIONS = Object.freeze({
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['placeholder', 'alt', 'title', 'aria-label'],
});

function getCounts() {
    const counts = {
        total: candidates.size,
        pending: 0,
        inflight: 0,
        translated: 0,
        keep: 0,
        removed: 0,
        review: 0,
        failed: 0,
        textRules: 0,
        regexRules: regexRules.size,
    };
    candidates.forEach((candidate) => {
        if (Object.prototype.hasOwnProperty.call(counts, candidate.status)) {
            counts[candidate.status] += 1;
        }
    });
    decisions.forEach((decision) => {
        if (decision.status !== AI_CANDIDATE_STATUS.TRANSLATED || decision.action !== AI_ACTIONS.TRANSLATE) return;
        if (decision.translationType === AI_TRANSLATION_TYPES.REGEX) return;
        counts.textRules += 1;
    });
    return counts;
}

function emitState() {
    fire('aiStateChanged', getAiStateSnapshot());
}

function markInFlightAsPending() {
    inFlightCandidateIds.forEach((id) => {
        const candidate = candidates.get(id);
        if (candidate && candidate.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
        }
    });
    inFlightCandidateIds = [];
}

function serializeSession() {
    const persistedCandidates = Array.from(candidates.values()).slice(-MAX_PERSISTED_SESSION_ITEMS);
    const persistedIds = new Set(persistedCandidates.map((candidate) => candidate.id));
    return {
        siteKey: currentSiteKey,
        targetLanguage: currentTargetLanguage,
        candidates: persistedCandidates,
        decisions: Array.from(decisions.values()).filter((decision) => persistedIds.has(decision.id)),
        regexRules: Array.from(regexRules.values()).filter(
            (rule) => rule.sourceIds.length === 0 || rule.sourceIds.every((id) => persistedIds.has(id))
        ),
        sessionUsage,
    };
}

async function persistState() {
    const snapshot = serializeSession();
    persistenceChain = persistenceChain.catch(() => undefined).then(() => saveAiSession(snapshot));
    await persistenceChain;
}

function hydrateCachedDecision(candidate, cacheEntry) {
    const cachedDecision = cacheEntry?.decision;
    // Regex rules are deliberately session-scoped and must never be hydrated
    // from the per-source translation cache.
    if (!cachedDecision || cachedDecision.translationType === AI_TRANSLATION_TYPES.REGEX) return false;

    const decision = {
        ...cachedDecision,
        id: candidate.id,
        sourceText: candidate.sourceText,
    };
    if (decision.action === AI_ACTIONS.KEEP) {
        decision.action = AI_ACTIONS.REMOVE;
        decision.status = AI_CANDIDATE_STATUS.REMOVED;
    }
    if (
        decision.action === AI_ACTIONS.TRANSLATE &&
        decision.translationType !== AI_TRANSLATION_TYPES.REGEX &&
        isUnchangedTranslation(candidate.sourceText, decision.translation)
    ) {
        decision.action = AI_ACTIONS.REMOVE;
        decision.translation = '';
        decision.translationType = AI_TRANSLATION_TYPES.TEXT;
        decision.reason = 'unchanged-translation';
        decision.status = AI_CANDIDATE_STATUS.REMOVED;
    }
    decisions.set(candidate.id, decision);
    candidate.status = decision.status;
    return true;
}

function addCandidateBatch(newCandidates) {
    let added = 0;
    newCandidates.forEach((candidate) => {
        if (
            !isSubmittableAiCandidate(candidate) ||
            candidateFingerprints.has(candidate.fingerprint) ||
            userRemovedFingerprints.has(candidate.fingerprint)
        ) {
            return;
        }
        const cacheEntry = cache.get(candidate.fingerprint);
        hydrateCachedDecision(candidate, cacheEntry);
        candidates.set(candidate.id, candidate);
        candidateFingerprints.add(candidate.fingerprint);
        added += 1;
    });

    if (added > 0) {
        void persistState().catch(() => {
            lastError = { code: 'storage' };
            emitState();
        });
        emitState();
        const aiSettings = mergeAiSettings(loadSettings().ai);
        if (isActive && aiSettings.processingMode === AI_PROCESSING_MODES.AUTO && !budgetBlockedReason) {
            scheduleAutoSubmit(aiSettings.batch.debounceMs);
        }
    }
    return added;
}

function collectFromRoot(root) {
    const settings = loadSettings();
    const extracted = extractAiCandidates(root, {
        filterRules: settings.filterRules,
        targetLanguage: currentTargetLanguage,
        siteKey: currentSiteKey,
        scannerConfig: appConfig.scanner,
    });
    return addCandidateBatch(extracted);
}

async function flushPendingRoots(runGeneration = generation) {
    if (!isActive || isPaused || runGeneration !== generation || pendingRoots.size === 0) return;
    if (isTranslationBridgeActive() && !isTranslationBridgeIdle()) {
        await waitForTranslationBridgeIdle();
    }
    if (!isActive || isPaused || runGeneration !== generation) return;

    const roots = Array.from(pendingRoots);
    pendingRoots = new Set();
    const rootSet = new Set(roots.filter((root) => root?.nodeType === Node.ELEMENT_NODE));
    const topLevelRoots = roots.filter((root) => {
        if (root?.nodeType !== Node.ELEMENT_NODE) return true;
        let parent = root.parentElement;
        while (parent) {
            if (rootSet.has(parent)) return false;
            parent = parent.parentElement;
        }
        return true;
    });
    topLevelRoots.forEach(collectFromRoot);
}

function scheduleRootFlush() {
    if (isPaused) return;
    if (rootFlushTimer !== null) clearTimeout(rootFlushTimer);
    const delay = mergeAiSettings(loadSettings().ai).batch.debounceMs;
    const runGeneration = generation;
    rootFlushTimer = setTimeout(() => {
        rootFlushTimer = null;
        void flushPendingRoots(runGeneration);
    }, delay);
}

function handleMutations(mutations) {
    if (!isActive || isPaused) return;
    mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
            pendingRoots.add(mutation.target);
            return;
        }
        if (mutation.type === 'attributes') {
            pendingRoots.add(mutation.target);
            return;
        }
        mutation.addedNodes.forEach((node) => pendingRoots.add(node));
    });
    if (pendingRoots.size > 0) scheduleRootFlush();
}

function scheduleAutoSubmit(delayMs) {
    if (!isActive || isPaused || currentRequest) return;
    if (autoSubmitTimer !== null) clearTimeout(autoSubmitTimer);
    const runGeneration = generation;
    autoSubmitTimer = setTimeout(() => {
        autoSubmitTimer = null;
        if (isActive && !isPaused && runGeneration === generation) {
            void submitPending();
        }
    }, delayMs);
}

async function restoreSession() {
    const saved = await loadAiSession();
    if (!saved || saved.siteKey !== currentSiteKey || saved.targetLanguage !== currentTargetLanguage) {
        candidates = new Map();
        candidateFingerprints = new Set();
        decisions = new Map();
        regexRules = new Map();
        sessionUsage = { requests: 0, characters: 0 };
        return;
    }

    const restoredCandidates = Array.isArray(saved.candidates) ? saved.candidates.filter(isSubmittableAiCandidate) : [];
    restoredCandidates.forEach((candidate) => {
        if (candidate.status === AI_CANDIDATE_STATUS.KEEP) {
            candidate.status = AI_CANDIDATE_STATUS.REMOVED;
        }
        if (candidate.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
        }
    });
    candidates = new Map(restoredCandidates.map((candidate) => [candidate.id, candidate]));
    candidateFingerprints = new Set(restoredCandidates.map((candidate) => candidate.fingerprint).filter(Boolean));
    const restoredDecisions = Array.isArray(saved.decisions) ? saved.decisions : [];
    decisions = new Map(
        restoredDecisions
            .filter((decision) => candidates.has(decision.id))
            .map((decision) => {
                const candidate = candidates.get(decision.id);
                if (decision.action === AI_ACTIONS.KEEP) {
                    return [
                        decision.id,
                        { ...decision, action: AI_ACTIONS.REMOVE, status: AI_CANDIDATE_STATUS.REMOVED },
                    ];
                }
                if (
                    decision.action === AI_ACTIONS.TRANSLATE &&
                    decision.translationType !== AI_TRANSLATION_TYPES.REGEX &&
                    isUnchangedTranslation(candidate.sourceText, decision.translation)
                ) {
                    return [
                        decision.id,
                        {
                            ...decision,
                            action: AI_ACTIONS.REMOVE,
                            translation: '',
                            translationType: AI_TRANSLATION_TYPES.TEXT,
                            reason: 'unchanged-translation',
                            status: AI_CANDIDATE_STATUS.REMOVED,
                        },
                    ];
                }
                return [decision.id, decision];
            })
    );

    const restoredRules = new Map();
    const restoredRuleIds = new Set();
    const candidateById = new Map(candidates);
    const restoredRegexRules = Array.isArray(saved.regexRules) ? saved.regexRules : [];
    restoredRegexRules.forEach((rawRule) => {
        const ruleId = String(rawRule?.id || '').trim();
        if (!ruleId || restoredRuleIds.has(ruleId)) return;
        const sourceIds = Array.isArray(rawRule?.sourceIds)
            ? rawRule.sourceIds.map((id) => String(id || '').trim()).filter(Boolean)
            : [];
        if (new Set(sourceIds).size !== sourceIds.length) return;
        if (sourceIds.some((id) => !candidateById.has(id))) return;
        const origin = rawRule?.origin === 'manual' || rawRule?.origin === 'user-edited' ? rawRule.origin : 'ai';
        if (origin === 'ai' && sourceIds.length < 1) return;
        const sourceTexts = sourceIds.map((id) => candidateById.get(id).sourceText);
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
    decisions.forEach((decision, id) => {
        if (decision.translationType !== AI_TRANSLATION_TYPES.REGEX) {
            const candidate = candidates.get(id);
            if (candidate) candidate.status = decision.status;
            return;
        }
        if (!restoredRules.has(decision.regexRuleId)) {
            const candidate = candidates.get(id);
            if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
            decisions.delete(id);
            return;
        }
        const candidate = candidates.get(id);
        if (candidate) candidate.status = decision.status;
    });
    restoredRules.forEach((rule, ruleId) => {
        if (
            rule.sourceIds.length > 0 &&
            !rule.sourceIds.every((sourceId) => {
                const decision = decisions.get(sourceId);
                return (
                    decision?.translationType === AI_TRANSLATION_TYPES.REGEX &&
                    decision.status === AI_CANDIDATE_STATUS.TRANSLATED &&
                    decision.regexRuleId === ruleId
                );
            })
        ) {
            restoredRules.delete(ruleId);
            rule.sourceIds.forEach((sourceId) => {
                const decision = decisions.get(sourceId);
                if (decision?.translationType !== AI_TRANSLATION_TYPES.REGEX) return;
                const candidate = candidates.get(sourceId);
                if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
                decisions.delete(sourceId);
            });
        }
    });
    regexRules = restoredRules;
    sessionUsage = {
        requests: Math.max(0, Number(saved.sessionUsage?.requests) || 0),
        characters: Math.max(0, Number(saved.sessionUsage?.characters) || 0),
    };
}

export async function startAiScan() {
    if (isActive) return { started: true };
    const aiSettings = mergeAiSettings(loadSettings().ai);
    if (!aiSettings.enabled) {
        return { started: false, reason: 'disabled' };
    }
    if (!acquireScanMode(SCAN_MODES.AI)) {
        return { started: false, reason: 'mode-conflict' };
    }

    isActive = true;
    isPaused = false;
    generation += 1;
    lastError = null;
    budgetBlockedReason = null;
    userRemovedFingerprints = new Set();
    currentSiteKey = window.location.origin;
    currentTargetLanguage = aiSettings.targetLanguage;

    try {
        registerTranslationBridgeClient();
        cache = await loadAiCache();
        await restoreSession();
        await waitForTranslationBridgeIdle();
        if (!isActive) return { started: false, reason: 'stopped' };

        collectFromRoot(document);
        observer = new MutationObserver(handleMutations);
        observer.observe(document.body, AI_OBSERVER_OPTIONS);
        emitState();
        return { started: true };
    } catch (error) {
        isActive = false;
        isPaused = false;
        unregisterTranslationBridgeClient();
        releaseScanMode(SCAN_MODES.AI);
        lastError = error;
        emitState();
        throw error;
    }
}

export async function stopAiScan() {
    if (!isActive) {
        releaseScanMode(SCAN_MODES.AI);
        return;
    }

    isActive = false;
    isPaused = false;
    generation += 1;
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    if (rootFlushTimer !== null) {
        clearTimeout(rootFlushTimer);
        rootFlushTimer = null;
    }
    if (autoSubmitTimer !== null) {
        clearTimeout(autoSubmitTimer);
        autoSubmitTimer = null;
    }
    pendingRoots.clear();
    if (currentRequest) {
        currentRequest.abort();
        currentRequest = null;
    }
    markInFlightAsPending();
    unregisterTranslationBridgeClient();
    releaseScanMode(SCAN_MODES.AI);
    await persistState();
    emitState();
}

async function performSubmitPending() {
    if (currentRequest || isClearing) return { submitted: false, reason: 'inactive-or-busy' };
    const submissionGeneration = generation;

    const settings = loadSettings();
    const aiSettings = mergeAiSettings(settings.ai);
    const provider = getActiveProvider(aiSettings);
    if (!provider) return { submitted: false, reason: 'missing-provider' };

    const pending = Array.from(candidates.values()).filter(
        (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
    );
    const batch = selectBatch(pending, aiSettings.batch);
    batch.invalid.forEach((candidate) => {
        candidates.delete(candidate.id);
        decisions.delete(candidate.id);
        if (candidate.fingerprint) candidateFingerprints.delete(candidate.fingerprint);
    });
    batch.oversized.forEach((candidate) => {
        candidate.status = AI_CANDIDATE_STATUS.REVIEW;
        decisions.set(candidate.id, {
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
        await persistState();
        emitState();
    }
    if (generation !== submissionGeneration || isClearing) {
        return { submitted: false, reason: 'stale' };
    }
    if (batch.candidates.length === 0) return { submitted: false, reason: 'empty' };

    const [apiKey, styleProfile, dailyUsage] = await Promise.all([
        loadProviderApiKey(provider.id),
        matchStyleProfile(window.location, currentTargetLanguage),
        loadDailyUsage(),
    ]);
    if (generation !== submissionGeneration || isClearing) {
        return { submitted: false, reason: 'stale' };
    }
    const pageContext = buildPageContext({ targetLanguage: currentTargetLanguage });
    const payload = buildTranslationRequest({
        provider,
        candidates: batch.candidates,
        targetLanguage: currentTargetLanguage,
        styleProfile,
        pageContext,
    });
    try {
        validateProviderConfiguration(provider, apiKey);
    } catch (error) {
        lastError = error;
        emitState();
        fire('aiRequestFailed', { code: error?.code || 'invalid-provider' });
        return { submitted: false, reason: error?.code || 'invalid-provider' };
    }
    const budget = checkBudget({
        settings: aiSettings.budget,
        sessionUsage,
        dailyUsage,
        requestPayload: payload,
        nextCharacters: batch.characters,
    });
    if (!budget.allowed) {
        budgetBlockedReason = budget.reason;
        emitState();
        fire('aiBudgetBlocked', budget.reason);
        return { submitted: false, reason: budget.reason };
    }
    budgetBlockedReason = null;

    try {
        await addDailyUsage(budget.estimatedTokens);
    } catch {
        lastError = { code: 'storage' };
        emitState();
        return { submitted: false, reason: 'storage' };
    }
    if (generation !== submissionGeneration || isClearing) {
        return { submitted: false, reason: 'stale' };
    }

    batch.candidates.forEach((candidate) => {
        candidate.status = AI_CANDIDATE_STATUS.IN_FLIGHT;
    });
    const requestCandidateIds = batch.candidates.map((candidate) => candidate.id);
    inFlightCandidateIds = requestCandidateIds;
    sessionUsage.requests += 1;
    sessionUsage.characters += batch.characters;
    lastError = null;
    emitState();

    const requestGeneration = submissionGeneration;
    let requestHandle = null;
    try {
        requestHandle = createChatCompletionRequest({
            provider,
            apiKey,
            payload,
            timeoutMs: aiSettings.requestTimeoutMs,
        });
        currentRequest = requestHandle;
        const response = await requestHandle.promise;
        if (requestGeneration !== generation) {
            return { submitted: false, reason: 'stale' };
        }

        const parsed = parseJsonContent(response.content);
        const validated = validateTranslationResponse(parsed, batch.candidates, aiSettings.confidenceThreshold);
        const regexRuleIdMap = new Map();
        validated.regexRules.forEach((rule) => {
            let ruleId = rule.id;
            let suffix = 0;
            while (regexRules.has(ruleId)) {
                suffix += 1;
                ruleId = `${rule.id}-${suffix}`;
            }
            regexRuleIdMap.set(rule.id, ruleId);
            regexRules.set(ruleId, { ...rule, id: ruleId });
        });
        validated.decisions.forEach((decision) => {
            const candidate = candidates.get(decision.id);
            if (!candidate) return;
            const storedDecision =
                decision.translationType === AI_TRANSLATION_TYPES.REGEX && regexRuleIdMap.has(decision.regexRuleId)
                    ? { ...decision, regexRuleId: regexRuleIdMap.get(decision.regexRuleId) }
                    : decision;
            candidate.status = storedDecision.status;
            decisions.set(decision.id, storedDecision);
            if (
                storedDecision.translationType !== AI_TRANSLATION_TYPES.REGEX &&
                [AI_ACTIONS.TRANSLATE, AI_ACTIONS.KEEP, AI_ACTIONS.REMOVE].includes(storedDecision.action)
            ) {
                cache.set(candidate.fingerprint, {
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
                cache.delete(candidate.fingerprint);
            }
        });
        await Promise.all([saveAiCache(cache), persistState()]);
        return { submitted: true, count: validated.decisions.length };
    } catch (error) {
        if (requestGeneration !== generation) {
            return { submitted: false, reason: 'stale' };
        }
        if (error?.code !== 'aborted') {
            lastError = error;
            const validationFailure =
                error instanceof SyntaxError ||
                error?.message === 'empty-response' ||
                ['truncated-response', 'invalid-response'].includes(error?.code);
            requestCandidateIds.forEach((id) => {
                const candidate = candidates.get(id);
                if (!candidate) return;
                candidate.status = validationFailure ? AI_CANDIDATE_STATUS.REVIEW : AI_CANDIDATE_STATUS.FAILED;
                decisions.set(id, {
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
            await persistState();
            fire('aiRequestFailed', { code: error?.code || 'unknown' });
        } else {
            requestCandidateIds.forEach((id) => {
                const candidate = candidates.get(id);
                if (candidate?.status === AI_CANDIDATE_STATUS.IN_FLIGHT) {
                    candidate.status = AI_CANDIDATE_STATUS.PENDING;
                }
            });
        }
        return { submitted: false, reason: error?.code || 'unknown' };
    } finally {
        if (currentRequest === requestHandle) {
            currentRequest = null;
            inFlightCandidateIds = [];
        }
        emitState();
    }
}

export async function submitPending() {
    if (currentRequest || isClearing || submissionInProgress) {
        return { submitted: false, reason: 'inactive-or-busy' };
    }

    const pending = Array.from(candidates.values()).filter(
        (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
    );
    const invalid = pending.filter((candidate) => !isSubmittableAiCandidate(candidate));
    invalid.forEach((candidate) => {
        candidates.delete(candidate.id);
        decisions.delete(candidate.id);
        if (candidate.fingerprint) candidateFingerprints.delete(candidate.fingerprint);
    });
    if (invalid.length > 0) {
        await persistState();
        emitState();
    }
    if (!pending.some(isSubmittableAiCandidate)) {
        return { submitted: false, reason: 'empty' };
    }

    submissionInProgress = true;
    emitState();
    let result;
    try {
        result = await performSubmitPending();
        return result;
    } finally {
        submissionInProgress = false;
        emitState();
        const latestSettings = mergeAiSettings(loadSettings().ai);
        if (
            result?.submitted &&
            isActive &&
            !isPaused &&
            !isClearing &&
            latestSettings.processingMode === AI_PROCESSING_MODES.AUTO &&
            Array.from(candidates.values()).some((candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING) &&
            !budgetBlockedReason
        ) {
            queueMicrotask(() => void submitPending());
        }
    }
}

export async function retryReviewItems() {
    decisions.forEach((decision, id) => {
        if (decision.status === AI_CANDIDATE_STATUS.REVIEW || decision.status === AI_CANDIDATE_STATUS.FAILED) {
            const candidate = candidates.get(id);
            if (candidate) candidate.status = AI_CANDIDATE_STATUS.PENDING;
            decisions.delete(id);
        }
    });
    budgetBlockedReason = null;
    await persistState();
    emitState();
    return submitPending();
}

function isReviewDecision(decision) {
    return decision?.status === AI_CANDIDATE_STATUS.REVIEW || decision?.status === AI_CANDIDATE_STATUS.FAILED;
}

function persistReviewMutation(cacheChanged = false) {
    const tasks = [persistState()];
    if (cacheChanged) tasks.push(saveAiCache(cache));
    Promise.all(tasks).catch(() => {
        lastError = { code: 'storage' };
        emitState();
    });
    emitState();
}

export function removeAiReviewItem(candidateId) {
    const id = String(candidateId || '').trim();
    const decision = decisions.get(id);
    if (!isReviewDecision(decision) || !candidates.has(id)) return { changed: false };

    const removed = removeAiCandidate(id);
    if (!removed.changed) return { changed: false };
    persistReviewMutation(removed.cacheChanged);
    return { changed: true };
}

export function restoreAiReviewItem(candidateId) {
    const id = String(candidateId || '').trim();
    const candidate = candidates.get(id);
    const decision = decisions.get(id);
    if (!candidate || !isReviewDecision(decision)) return { changed: false };

    candidate.status = AI_CANDIDATE_STATUS.PENDING;
    decisions.delete(id);
    budgetBlockedReason = null;
    persistReviewMutation();
    return { changed: true };
}

export async function clearAiData() {
    if (isClearing) return;
    isClearing = true;
    generation += 1;
    try {
        const requestToCancel = currentRequest;
        if (requestToCancel) {
            requestToCancel.abort();
            await requestToCancel.promise.catch(() => undefined);
        }
        currentRequest = null;
        inFlightCandidateIds = [];
        candidates.clear();
        candidateFingerprints.clear();
        decisions.clear();
        regexRules.clear();
        sessionUsage = { requests: 0, characters: 0 };
        lastError = null;
        budgetBlockedReason = null;
        userRemovedFingerprints.clear();
        await persistenceChain.catch(() => undefined);
        await Promise.all([
            clearAiSession(),
            clearAiCacheForSite(currentSiteKey || window.location.origin, currentTargetLanguage),
        ]);
        emitState();
    } finally {
        isClearing = false;
    }
}

export function getAcceptedTranslationPairs() {
    return Array.from(decisions.values())
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
        Array.from(candidates.values()),
        Array.from(decisions.values()),
        Array.from(regexRules.values())
    );
}

export function getAiRegexRules() {
    return Array.from(regexRules.values()).map((rule) => ({ ...rule, sourceIds: [...rule.sourceIds] }));
}

export function getReviewItems() {
    return Array.from(decisions.values()).filter(
        (decision) => decision.status === AI_CANDIDATE_STATUS.REVIEW || decision.status === AI_CANDIDATE_STATUS.FAILED
    );
}

export function applyAiSummaryEdits({ remainingSourceTexts = null, editedRegexRules = null } = {}) {
    const hasTextEdits = Array.isArray(remainingSourceTexts);
    let changed = false;
    let cacheChanged = false;

    let nextRegexRules = regexRules;
    if (Array.isArray(editedRegexRules)) {
        const existingRules = Array.from(regexRules.values());
        const matchedRules = matchEditedRegexRulesToExisting(editedRegexRules, existingRules);
        if (!matchedRules.valid) return { changed: false, error: matchedRules.error };

        nextRegexRules = new Map();
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
            if (sourceIds.some((id) => !candidates.has(id))) return { changed: false, error: 'unknown-regex-source' };

            const candidateSourceTexts = sourceIds.map((id) => candidates.get(id).sourceText);
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
                const removed = removeAiCandidate(id);
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
            Array.from(candidates.values()),
            regexCandidateIds
        );

        reconciliation.revivedCandidateIds.forEach((id) => {
            const candidate = candidates.get(id);
            if (!candidate) return;
            candidate.status = AI_CANDIDATE_STATUS.PENDING;
            decisions.delete(id);
            if (candidate.fingerprint) userRemovedFingerprints.delete(candidate.fingerprint);
            changed = true;
        });

        reconciliation.addedSourceTexts.forEach((sourceText) => {
            const candidate = createManualSummaryCandidate(sourceText, {
                siteKey: currentSiteKey || window.location.origin,
                targetLanguage: currentTargetLanguage,
            });
            if (!candidate || candidateFingerprints.has(candidate.fingerprint)) return;
            candidates.set(candidate.id, candidate);
            candidateFingerprints.add(candidate.fingerprint);
            userRemovedFingerprints.delete(candidate.fingerprint);
            changed = true;
        });

        reconciliation.removedCandidateIds.forEach((id) => {
            const removed = removeAiCandidate(id);
            cacheChanged = cacheChanged || removed.cacheChanged;
            changed = removed.changed || changed;
        });
    }

    if (changed) {
        const tasks = [persistState()];
        if (cacheChanged) tasks.push(saveAiCache(cache));
        Promise.all(tasks).catch(() => {
            lastError = { code: 'storage' };
            emitState();
        });
        emitState();
    }
    return { changed, error: null };
}

function removeAiCandidate(id) {
    const candidate = candidates.get(id);
    if (!candidate) return { changed: false, cacheChanged: false };
    candidates.delete(id);
    decisions.delete(id);
    let cacheChanged = false;
    if (candidate.fingerprint) {
        candidateFingerprints.delete(candidate.fingerprint);
        userRemovedFingerprints.add(candidate.fingerprint);
        cacheChanged = cache.delete(candidate.fingerprint);
    }
    return { changed: true, cacheChanged };
}

export function applyAiSummaryDeletions(remainingSourceTexts) {
    return applyAiSummaryEdits({ remainingSourceTexts }).changed;
}

export function getAiStateSnapshot() {
    return {
        active: isActive,
        paused: isPaused,
        processing: Boolean(currentRequest) || submissionInProgress,
        counts: getCounts(),
        sessionUsage: { ...sessionUsage },
        lastErrorCode: lastError?.code || null,
        budgetBlockedReason,
    };
}

export function isAiScanActive() {
    return isActive;
}

export function isAiScanPaused() {
    return isPaused;
}

export function pauseAiScan() {
    if (!isActive || isPaused) return false;
    isPaused = true;
    if (observer) observer.disconnect();
    if (rootFlushTimer !== null) {
        clearTimeout(rootFlushTimer);
        rootFlushTimer = null;
    }
    if (autoSubmitTimer !== null) {
        clearTimeout(autoSubmitTimer);
        autoSubmitTimer = null;
    }
    pendingRoots.clear();
    emitState();
    return true;
}

export function resumeAiScan() {
    if (!isActive || !isPaused) return false;
    isPaused = false;
    if (observer && document.body) observer.observe(document.body, AI_OBSERVER_OPTIONS);
    const aiSettings = mergeAiSettings(loadSettings().ai);
    if (
        aiSettings.processingMode === AI_PROCESSING_MODES.AUTO &&
        Array.from(candidates.values()).some((candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING) &&
        !budgetBlockedReason
    ) {
        scheduleAutoSubmit(aiSettings.batch.debounceMs);
    }
    emitState();
    return true;
}

export function hasAiData() {
    return candidates.size > 0 || decisions.size > 0 || regexRules.size > 0;
}
