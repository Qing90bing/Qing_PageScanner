import {
    clearAiData,
    getAiDisplayPairs,
    getAiStateSnapshot,
    getReviewItems,
    hasAiData,
    isAiScanActive,
    retryReviewItems,
    startAiScan,
    stopAiScan,
    submitPending,
} from './logic.js';
import { loadSettings } from '../settings/logic.js';
import { formatTextsForTranslation } from '../../shared/utils/text/formatting.js';
import { on } from '../../shared/utils/core/eventBus.js';
import { t } from '../../shared/i18n/index.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { getAiFab, setFabIcon, updateFabTooltip } from '../../shared/ui/components/fab.js';
import {
    createCounterWithHelp,
    hideCounterWithHelp,
    showCounterWithHelp,
    updateCounterValue,
} from '../../shared/ui/components/counterWithHelp.js';
import { mergeAiSettings } from '../../shared/services/ai/contracts.js';
import { aiIcon } from '../../assets/icons/aiIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';
import { updateModalContent, SHOW_PLACEHOLDER } from '../../shared/ui/mainModal/index.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { updateAiSummaryPanel } from '../../shared/ui/mainModal/modalContent.js';
import { updateAiFooterState } from '../../shared/ui/mainModal/modalFooter.js';
import * as modalState from '../../shared/ui/mainModal/modalState.js';

let initialized = false;
let aiCounterVisible = false;

function resetAiFab() {
    const aiFab = getAiFab();
    if (!aiFab) return;
    setFabIcon(aiFab, aiIcon);
    aiFab.classList.remove('is-recording');
    updateFabTooltip(aiFab, 'tooltip.ai_scan');
}

function showAiCounter(snapshot = getAiStateSnapshot()) {
    if (!aiCounterVisible) {
        createCounterWithHelp({
            counterKey: 'common.discovered',
            helpKey: 'tutorial.aiScan',
        });
        showCounterWithHelp();
        aiCounterVisible = true;
    }
    updateCounterValue(snapshot.counts.total);
}

function hideAiCounter() {
    if (!aiCounterVisible) return;
    hideCounterWithHelp();
    aiCounterVisible = false;
}

function formatAiResults(pairs = getAiDisplayPairs()) {
    const settings = loadSettings();
    return formatTextsForTranslation(pairs, settings.outputFormat, {
        includeArrayBrackets: settings.includeArrayBrackets,
    });
}

function syncAiSummary(open = false) {
    const snapshot = getAiStateSnapshot();
    const pairs = getAiDisplayPairs();
    updateAiSummaryPanel(snapshot, getReviewItems());
    updateAiFooterState(snapshot);
    updateScanCount(snapshot.counts.total, 'ai');

    if (!open) {
        const visibleAiModal =
            modalState.currentMode === 'ai-scan' && modalState.modalOverlay?.classList.contains('is-visible');
        if (!visibleAiModal) return;
    }

    updateModalContent(pairs.length > 0 ? formatAiResults(pairs) : SHOW_PLACEHOLDER, open, 'ai-scan');
    updateAiSummaryPanel(snapshot, getReviewItems());
    updateAiFooterState(snapshot);
}

async function handleSubmit() {
    try {
        const result = await submitPending();
        if (result.submitted) {
            showNotification(t('notifications.aiBatchCompleted'), { type: 'success' });
        } else if (result.reason === 'empty') {
            showNotification(t('notifications.aiNothingPending'), { type: 'info' });
        } else if (['missing-provider', 'storage'].includes(result.reason)) {
            showNotification(t('notifications.aiRequestFailed'), { type: 'error' });
        }
    } catch {
        showNotification(t('notifications.aiRequestFailed'), { type: 'error' });
    } finally {
        syncAiSummary(false);
    }
}

/** @param {HTMLElement} aiFab */
export async function handleAiScanClick(aiFab) {
    if (isAiScanActive()) {
        await stopAiScan();
        resetAiFab();
        hideAiCounter();
        showNotification(t('notifications.aiScanStopped'), { type: 'success' });
        syncAiSummary(false);
        return;
    }

    try {
        const result = await startAiScan();
        if (!result.started) {
            const messageKey =
                result.reason === 'disabled' ? 'notifications.aiDisabled' : 'notifications.scanModeConflict';
            showNotification(t(messageKey), { type: 'info' });
            return;
        }
        setFabIcon(aiFab, stopIcon);
        aiFab.classList.add('is-recording');
        updateFabTooltip(aiFab, 'tooltip.ai_scan_stop');
        showAiCounter();
        showNotification(t('notifications.aiScanStarted'), { type: 'info' });
        syncAiSummary(false);
    } catch {
        resetAiFab();
        hideAiCounter();
        showNotification(t('notifications.aiScanStartFailed'), { type: 'error' });
    }
}

export function showAiSummary() {
    syncAiSummary(true);
}

export function initializeAiScanUI() {
    if (initialized) return;
    initialized = true;

    on('aiStateChanged', (snapshot) => {
        if (snapshot.active) showAiCounter(snapshot);
        else hideAiCounter();
        syncAiSummary(false);
    });
    on('ai-submit-pending', () => void handleSubmit());
    on('ai-retry-review', async () => {
        await retryReviewItems();
        syncAiSummary(false);
    });
    on('ai-clear', async () => {
        await clearAiData();
        syncAiSummary(false);
    });
    on('settingsSaved', () => {
        const aiSettings = mergeAiSettings(loadSettings().ai);
        if (!aiSettings.enabled && isAiScanActive()) {
            void stopAiScan().then(() => {
                resetAiFab();
                hideAiCounter();
            });
        }
        if (hasAiData()) syncAiSummary(false);
    });
    on('languageChanged', () => {
        if (hasAiData()) syncAiSummary(false);
    });
    on('aiBudgetBlocked', () => {
        showNotification(t('notifications.aiBudgetBlocked'), { type: 'warning' });
    });
    on('aiRequestFailed', () => {
        showNotification(t('notifications.aiRequestFailed'), { type: 'error' });
    });
}

export { hasAiData, isAiScanActive };
