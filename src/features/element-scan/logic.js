import { getElementScanFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { uiLifecycle } from '../../shared/ui/uiContainer.js';
import { t } from '../../shared/i18n/index.js';
import { log } from '../../shared/utils/core/logger.js';
import { loadSettings } from '../../shared/services/settings.js';
import { enablePersistence } from '../../shared/services/sessionPersistence.js';
import { acquireScanMode, releaseScanMode, SCAN_MODES } from '../../shared/services/scanModeCoordinator.js';
import { on } from '../../shared/utils/core/eventBus.js';
import { createElementScanState } from './state.js';
import { createStagedTextStore } from './stagedTextStore.js';
import { createElementSelectionController } from './selectionController.js';
import { createElementStagingController } from './stagingController.js';

const state = createElementScanState();
const textStore = createStagedTextStore(state);
const runtime = {
    stagingController: null,
};

const selectionController = createElementSelectionController({
    state,
    onConfirm: () => runtime.stagingController?.confirmSelectionAndExtract(),
    onStage: () => runtime.stagingController?.stageCurrentElement(),
    onStop: () => stopElementScan(getElementScanFab()),
});
runtime.stagingController = createElementStagingController({
    onStop: () => stopElementScan(getElementScanFab()),
    selectionController,
    state,
    textStore,
});

function saveSessionOnUnload() {
    if (state.isActive) textStore.save();
}

async function handleResumeScanSession(session) {
    if (session.mode !== 'element-scan') return;

    const elementScanFab = getElementScanFab();
    const settings = await loadSettings();
    if (!elementScanFab || isElementScanActive()) return;

    if (session.data && Array.isArray(session.data)) {
        log(t('log.elementScan.resuming'));
        if (settings.elementScan_persistData) {
            textStore.restore(session.data);
            log(t('log.elementScan.restored', { count: textStore.getSet().size }));
        } else {
            textStore.clear();
            log(t('log.elementScan.skipRestore'));
        }
    } else {
        log(t('log.elementScan.startingNewSession'));
    }

    const started = startElementScan(elementScanFab, { silent: true });
    if (!started) return;
    textStore.emitCount();

    textStore.save();
    showNotification(
        settings.elementScan_persistData
            ? t('notifications.elementScanResumed')
            : t('notifications.elementScanStarted'),
        { type: 'info' }
    );
}

function handleModalClosed() {
    if (!isElementScanActive() || !selectionController.getShouldResumeAfterModalClose()) return;
    selectionController.setShouldResumeAfterModalClose(false);
    selectionController.reselect();
}

function handleClearElementScan() {
    textStore.clear();
}

on('clearElementScan', handleClearElementScan);
on('resumeScanSession', handleResumeScanSession);
on('modalClosed', handleModalClosed);

export function isElementScanActive() {
    return state.isActive;
}

export function getStagedTexts() {
    return textStore.getSet();
}

export function getShouldResumeAfterModalClose() {
    return selectionController.getShouldResumeAfterModalClose();
}

export function setShouldResumeAfterModalClose(value) {
    selectionController.setShouldResumeAfterModalClose(value);
}

export function handleElementScanClick(fabElement) {
    if (state.isActive) stopElementScan(fabElement);
    else startElementScan(fabElement);
}

function startElementScan(fabElement, options = {}) {
    if (!acquireScanMode(SCAN_MODES.ELEMENT)) {
        if (!options.silent) {
            showNotification(t('notifications.scanModeConflict'), { type: 'info' });
        }
        return false;
    }

    log(t('log.elementScan.starting'));
    uiLifecycle.acquire();
    enablePersistence();
    if (!options.silent) {
        showNotification(t('notifications.elementScanStarted'), { type: 'info' });
    }

    state.isActive = true;
    state.isPaused = false;
    state.isAdjusting = false;
    runtime.stagingController.resetWorker();
    selectionController.showTopCenterControls({
        onPause: pauseElementScan,
        onResume: resumeElementScan,
    });
    selectionController.start();
    fabElement.classList.add('is-recording');
    updateFabTooltip(fabElement, 'scan.stopSession');
    window.addEventListener('beforeunload', saveSessionOnUnload);
    textStore.startAutoSave();

    log(t('log.elementScan.listenersAdded'));
    return true;
}

export function stopElementScan(fabElement) {
    if (!state.isActive) {
        releaseScanMode(SCAN_MODES.ELEMENT);
        return;
    }

    log(t('log.elementScan.stopping'));
    state.isActive = false;
    state.isPaused = false;
    state.isAdjusting = false;
    state.shouldResumeAfterModalClose = false;

    if (fabElement) {
        fabElement.classList.remove('is-recording');
        updateFabTooltip(fabElement, 'tooltip.element_scan');
    }

    selectionController.stop();
    window.removeEventListener('beforeunload', saveSessionOnUnload);
    textStore.stopAutoSave();
    textStore.clearPersistedSession();
    runtime.stagingController.resetWorker();
    textStore.clear();
    log(t('log.elementScan.listenersRemoved'));
    log(t('log.elementScan.stateReset'));

    uiLifecycle.release();
    releaseScanMode(SCAN_MODES.ELEMENT);
}

export function pauseElementScan() {
    if (!state.isActive || state.isPaused) return;
    state.isPaused = true;
    showNotification(t('notifications.elementScanPaused'), { type: 'info' });
    selectionController.pause();
}

export function resumeElementScan() {
    if (!state.isActive || !state.isPaused) return;
    state.isPaused = false;
    showNotification(t('notifications.elementScanContinued'), { type: 'success' });
    selectionController.resume();
}

export function reselectElement() {
    selectionController.reselect();
}

export function stageCurrentElement() {
    return runtime.stagingController.stageCurrentElement();
}

export function updateSelectionLevel(level) {
    selectionController.updateSelectionLevel(level);
}

export function confirmSelectionAndExtract() {
    return runtime.stagingController.confirmSelectionAndExtract();
}
