import { clearActiveSession, saveActiveSession } from '../../shared/services/sessionPersistence.js';
import { fire } from '../../shared/utils/core/eventBus.js';

export function createStagedTextStore(state) {
    const runtime = {
        autoSaveInterval: null,
    };

    function save() {
        saveActiveSession('element-scan', Array.from(state.stagedTexts));
    }

    function emitCount() {
        fire('stagedCountChanged', state.stagedTexts.size);
        if (state.isActive) save();
    }

    function add(texts) {
        texts.forEach((text) => state.stagedTexts.add(text));
        emitCount();
    }

    function clear() {
        state.stagedTexts.clear();
        emitCount();
    }

    function restore(texts) {
        texts.forEach((text) => state.stagedTexts.add(text));
    }

    function startAutoSave() {
        stopAutoSave();
        runtime.autoSaveInterval = setInterval(() => {
            if (state.isActive) save();
        }, 5000);
    }

    function stopAutoSave() {
        if (runtime.autoSaveInterval === null) return;
        clearInterval(runtime.autoSaveInterval);
        runtime.autoSaveInterval = null;
    }

    function clearPersistedSession() {
        clearActiveSession();
    }

    return {
        add,
        clear,
        clearPersistedSession,
        emitCount,
        getAll: () => Array.from(state.stagedTexts),
        getSet: () => state.stagedTexts,
        restore,
        save,
        startAutoSave,
        stopAutoSave,
    };
}
