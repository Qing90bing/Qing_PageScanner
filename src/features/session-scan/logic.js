import { extractAndProcessText } from '../../shared/utils/text/textProcessor.js';
import { loadSettings } from '../../shared/services/settings.js';
import { log } from '../../shared/utils/core/logger.js';
import { isWorkerAllowed } from '../../shared/utils/core/csp-checker.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { fire, on } from '../../shared/utils/core/eventBus.js';
import { enablePersistence } from '../../shared/services/sessionPersistence.js';
import {
    registerTranslationBridgeClient,
    unregisterTranslationBridgeClient,
    waitForTranslationBridgeIdle,
} from '../../shared/services/translationBridge.js';
import { prepareSessionStart } from './startup.js';
import { createSessionScanState } from './state.js';
import { createSessionStore } from './sessionStore.js';
import { createSessionDynamicObserver } from './dynamicObserver.js';
import { createSessionWorkerController } from './workerController.js';

const state = createSessionScanState();
const sessionStore = createSessionStore(state);
const workerController = createSessionWorkerController({ state, sessionStore });
const dynamicObserver = createSessionDynamicObserver({
    isRecording: () => state.isRecording,
    processTexts: workerController.processTexts,
});

function clearSessionData() {
    const wasFallback = workerController.isFallback();
    state.currentCount = 0;
    sessionStore.clearTexts();
    dynamicObserver.clearPendingRoots();
    sessionStore.save();
    workerController.clear();
    if (wasFallback) fire('sessionCleared');
}

function handleClearSessionScan() {
    clearSessionData();
}

function handleSettingsSaved() {
    if (!state.isRecording) return;
    const settings = loadSettings();
    workerController.updateSettings(settings);
    log(t('log.settings.changed', { key: 'outputFormat', oldValue: '', newValue: settings.outputFormat }));
}

on('clearSessionScan', handleClearSessionScan);
on('settingsSaved', handleSettingsSaved);

function completeStart(preparation, resumedData) {
    const { initialTexts: preparedTexts, settings, workerAllowed } = preparation;
    const initialTexts = [...preparedTexts];
    enablePersistence();

    if (resumedData && Array.isArray(resumedData)) {
        initialTexts.push(...resumedData);
        sessionStore.addTexts(resumedData);
    }

    workerController.start({ initialTexts, settings, workerAllowed });
    dynamicObserver.start();
    window.addEventListener('beforeunload', handleSessionScanUnload);
    sessionStore.startAutoSave();
    sessionStore.save();
    log(t('log.sessionScan.domObserver.started'));
    return true;
}

export async function start(onUpdate, resumedData = null) {
    if (state.isRecording) return;

    const startGeneration = ++state.sessionStartGeneration;
    const isCurrentStart = () => state.isRecording && state.sessionStartGeneration === startGeneration;

    registerTranslationBridgeClient();
    state.isPaused = false;
    workerController.dispose();
    dynamicObserver.stop();
    state.currentCount = 0;
    sessionStore.clearTexts();
    state.onUpdate = onUpdate;
    state.useFallback = false;
    state.isRecording = true;

    try {
        const preparation = await prepareSessionStart({
            waitForTranslationIdle: waitForTranslationBridgeIdle,
            extractInitialTexts: extractAndProcessText,
            readSettings: loadSettings,
            checkWorkerAllowed: isWorkerAllowed,
            isCurrent: isCurrentStart,
        });
        if (!preparation) return false;
        return completeStart(preparation, resumedData);
    } catch (error) {
        if (!isCurrentStart()) return false;

        state.sessionStartGeneration += 1;
        state.isRecording = false;
        state.isPaused = false;
        state.onUpdate = null;
        dynamicObserver.stop();
        workerController.dispose();
        unregisterTranslationBridgeClient();
        throw error;
    }
}

function handleSessionScanUnload() {
    sessionStore.save();
}

export function stop(onStopped) {
    state.sessionStartGeneration += 1;

    if (!state.isRecording) {
        dynamicObserver.stop();
        workerController.stop(onStopped);
        unregisterTranslationBridgeClient();
        return;
    }

    log(t('log.sessionScan.domObserver.stopped'));
    dynamicObserver.stop();
    window.removeEventListener('beforeunload', handleSessionScanUnload);
    sessionStore.stopAutoSave();
    unregisterTranslationBridgeClient();
    sessionStore.clearPersistedSession();
    state.isRecording = false;
    state.isPaused = false;
    sessionStore.clearTexts();
    state.onUpdate = null;
    workerController.stop(onStopped);
}

export function requestSummary(onReady) {
    workerController.requestSummary(onReady);
}

export function isSessionRecording() {
    return state.isRecording;
}

export function pauseSessionScan() {
    if (!state.isRecording || state.isPaused) return;
    state.isPaused = true;
    dynamicObserver.pause();
    showNotification(t('notifications.sessionScanPaused'), { type: 'info' });
}

export function resumeSessionScan() {
    if (!state.isRecording || !state.isPaused) return;
    state.isPaused = false;
    dynamicObserver.resume();
    showNotification(t('notifications.sessionScanContinued'), { type: 'success' });
}
