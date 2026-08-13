import { scannerConfig } from '../../shared/config/scannerConfig.js';
import {
    AI_ACTIONS,
    AI_CANDIDATE_STATUS,
    AI_PROCESSING_MODES,
    AI_TRANSLATION_TYPES,
    mergeAiSettings,
} from '../../shared/services/ai/contracts.js';
import { extractAiCandidates } from '../../shared/services/ai/candidateExtractor.js';
import { isSubmittableAiCandidate } from '../../shared/services/ai/candidateText.js';
import { isUnchangedTranslation } from '../../shared/services/ai/responseValidator.js';
import {
    isTranslationBridgeActive,
    isTranslationBridgeIdle,
    waitForTranslationBridgeIdle,
} from '../../shared/services/translationBridge.js';
import { selectTopLevelMutationRoots } from '../../shared/utils/dom/mutationRoots.js';
import { loadSettings } from '../../shared/services/settings.js';

// 让采集反馈保持及时，同时不改变较长的请求批处理防抖时间。
export const AI_COLLECTION_FLUSH_DELAY_MS = 200;
export const AI_OBSERVER_OPTIONS = Object.freeze({
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['placeholder', 'alt', 'title', 'aria-label'],
});

export function createAiCollectionController({ state, persistState, emitState, submitPending, hasRequest }) {
    const runtime = {
        observer: null,
        rootFlushTimer: null,
        autoSubmitTimer: null,
        pendingRoots: new Set(),
    };

    function scheduleAutoSubmit(delayMs) {
        if (!state.isActive || state.isPaused || hasRequest()) return;
        if (runtime.autoSubmitTimer !== null) clearTimeout(runtime.autoSubmitTimer);
        const runGeneration = state.generation;
        runtime.autoSubmitTimer = setTimeout(() => {
            runtime.autoSubmitTimer = null;
            if (state.isActive && !state.isPaused && runGeneration === state.generation) {
                void submitPending();
            }
        }, delayMs);
    }

    function hydrateCachedDecision(candidate, cacheEntry) {
        const cachedDecision = cacheEntry?.decision;
        // 正则规则明确限定在当前会话内，不能从按源文本保存的翻译缓存中恢复。
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
        state.decisions.set(candidate.id, decision);
        candidate.status = decision.status;
        return true;
    }

    function addCandidateBatch(newCandidates) {
        const result = { added: 0 };
        newCandidates.forEach((candidate) => {
            if (
                !isSubmittableAiCandidate(candidate) ||
                state.candidateFingerprints.has(candidate.fingerprint) ||
                state.userRemovedFingerprints.has(candidate.fingerprint)
            ) {
                return;
            }
            hydrateCachedDecision(candidate, state.cache.get(candidate.fingerprint));
            state.candidates.set(candidate.id, candidate);
            state.candidateFingerprints.add(candidate.fingerprint);
            result.added += 1;
        });

        if (result.added > 0) {
            void persistState().catch(() => {
                state.lastError = { code: 'storage' };
                emitState();
            });
            emitState();
            const aiSettings = mergeAiSettings(loadSettings().ai);
            if (
                state.isActive &&
                aiSettings.processingMode === AI_PROCESSING_MODES.AUTO &&
                !state.budgetBlockedReason
            ) {
                scheduleAutoSubmit(aiSettings.batch.debounceMs);
            }
        }
        return result.added;
    }

    function collectFromRoot(root) {
        const settings = loadSettings();
        const extracted = extractAiCandidates(root, {
            filterRules: settings.filterRules,
            targetLanguage: state.currentTargetLanguage,
            siteKey: state.currentSiteKey,
            scannerConfig,
        });
        return addCandidateBatch(extracted);
    }

    async function flushPendingRoots(runGeneration = state.generation) {
        if (
            !state.isActive ||
            state.isPaused ||
            runGeneration !== state.generation ||
            runtime.pendingRoots.size === 0
        ) {
            return;
        }
        if (isTranslationBridgeActive() && !isTranslationBridgeIdle()) {
            await waitForTranslationBridgeIdle();
        }
        if (!state.isActive || state.isPaused || runGeneration !== state.generation) return;

        const roots = Array.from(runtime.pendingRoots);
        runtime.pendingRoots = new Set();
        const topLevelRoots = selectTopLevelMutationRoots(roots);
        topLevelRoots.forEach(collectFromRoot);
    }

    function scheduleRootFlush() {
        if (state.isPaused) return;
        if (runtime.rootFlushTimer !== null) return;
        const runGeneration = state.generation;
        runtime.rootFlushTimer = setTimeout(() => {
            runtime.rootFlushTimer = null;
            void flushPendingRoots(runGeneration);
        }, AI_COLLECTION_FLUSH_DELAY_MS);
    }

    function handleMutations(mutations) {
        if (!state.isActive || state.isPaused) return;
        mutations.forEach((mutation) => {
            if (mutation.type === 'characterData' || mutation.type === 'attributes') {
                runtime.pendingRoots.add(mutation.target);
                return;
            }
            mutation.addedNodes.forEach((node) => runtime.pendingRoots.add(node));
        });
        if (runtime.pendingRoots.size > 0) scheduleRootFlush();
    }

    function start() {
        collectFromRoot(document);
        runtime.observer = new MutationObserver(handleMutations);
        runtime.observer.observe(document.body, AI_OBSERVER_OPTIONS);
    }

    function stop() {
        if (runtime.observer) {
            runtime.observer.disconnect();
            runtime.observer = null;
        }
        if (runtime.rootFlushTimer !== null) {
            clearTimeout(runtime.rootFlushTimer);
            runtime.rootFlushTimer = null;
        }
        if (runtime.autoSubmitTimer !== null) {
            clearTimeout(runtime.autoSubmitTimer);
            runtime.autoSubmitTimer = null;
        }
        runtime.pendingRoots.clear();
    }

    function pause() {
        if (runtime.observer) runtime.observer.disconnect();
        if (runtime.rootFlushTimer !== null) {
            clearTimeout(runtime.rootFlushTimer);
            runtime.rootFlushTimer = null;
        }
        if (runtime.autoSubmitTimer !== null) {
            clearTimeout(runtime.autoSubmitTimer);
            runtime.autoSubmitTimer = null;
        }
        runtime.pendingRoots.clear();
    }

    function resume() {
        if (runtime.observer && document.body) runtime.observer.observe(document.body, AI_OBSERVER_OPTIONS);
        const aiSettings = mergeAiSettings(loadSettings().ai);
        if (
            aiSettings.processingMode === AI_PROCESSING_MODES.AUTO &&
            Array.from(state.candidates.values()).some(
                (candidate) => candidate.status === AI_CANDIDATE_STATUS.PENDING
            ) &&
            !state.budgetBlockedReason
        ) {
            scheduleAutoSubmit(aiSettings.batch.debounceMs);
        }
    }

    return {
        collectFromRoot,
        pause,
        resume,
        start,
        stop,
    };
}
