import { clearActiveSession, saveActiveSession } from '../../shared/services/sessionPersistence.js';

export function createSessionStore(state) {
    const runtime = {
        autoSaveInterval: null,
        texts: new Set(),
    };

    function save() {
        return saveActiveSession('session-scan', Array.from(runtime.texts));
    }

    function addTexts(texts) {
        texts.forEach((text) => runtime.texts.add(text));
    }

    function clearTexts() {
        runtime.texts.clear();
    }

    function startAutoSave() {
        stopAutoSave();
        runtime.autoSaveInterval = setInterval(() => {
            if (state.isRecording) save();
        }, 5000);
    }

    function stopAutoSave() {
        if (runtime.autoSaveInterval === null) return;
        clearInterval(runtime.autoSaveInterval);
        runtime.autoSaveInterval = null;
    }

    return {
        addTexts,
        clearPersistedSession: () => clearActiveSession(),
        clearTexts,
        getTexts: () => runtime.texts,
        save,
        startAutoSave,
        stopAutoSave,
    };
}
