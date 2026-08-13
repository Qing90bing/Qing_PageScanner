import {
    clearAiCacheForSite,
    clearAiSession,
    loadAiCache,
    loadAiSession,
    saveAiCache,
    saveAiSession,
} from '../../shared/services/ai/storage.js';
import { restoreAiSession, serializeAiSession } from './session.js';

export function createAiSessionStore(state) {
    const runtime = {
        persistenceChain: Promise.resolve(),
    };

    function serialize() {
        return serializeAiSession({
            candidates: state.candidates,
            decisions: state.decisions,
            regexRules: state.regexRules,
            siteKey: state.currentSiteKey,
            targetLanguage: state.currentTargetLanguage,
            sessionUsage: state.sessionUsage,
        });
    }

    async function persist() {
        const snapshot = serialize();
        runtime.persistenceChain = runtime.persistenceChain.catch(() => undefined).then(() => saveAiSession(snapshot));
        await runtime.persistenceChain;
    }

    async function loadCache() {
        state.cache = await loadAiCache();
        return state.cache;
    }

    async function restore() {
        const restored = restoreAiSession(await loadAiSession(), {
            siteKey: state.currentSiteKey,
            targetLanguage: state.currentTargetLanguage,
        });
        state.candidates = restored.candidates;
        state.candidateFingerprints = restored.candidateFingerprints;
        state.decisions = restored.decisions;
        state.regexRules = restored.regexRules;
        state.sessionUsage = restored.sessionUsage;
    }

    async function clear() {
        await runtime.persistenceChain.catch(() => undefined);
        await Promise.all([
            clearAiSession(),
            clearAiCacheForSite(state.currentSiteKey || window.location.origin, state.currentTargetLanguage),
        ]);
    }

    return {
        clear,
        loadCache,
        persist,
        restore,
        saveCache: () => saveAiCache(state.cache),
    };
}
