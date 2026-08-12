import {
    clearAiData,
    applyAiSummaryEdits,
    getAiDisplayData,
    getAiStateSnapshot,
    getReviewItems,
    hasAiData,
    isAiScanActive,
    pauseAiScan,
    removeAiReviewItem,
    restoreAiReviewItem,
    resumeAiScan,
    retryReviewItems,
    startAiScan,
    stopAiScan,
    submitPending,
} from './logic.js';
import { loadSettings } from '../../shared/services/settings.js';
import { formatTextsForTranslation } from '../../shared/utils/text/formatting.js';
import { parseSummarySourceTexts } from '../../shared/utils/text/summaryParser.js';
import { formatRegexRulesForTranslation, parseRegexRules } from '../../shared/utils/text/regexRules.js';
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
import { updateAiOutputTabs, updateAiSummaryPanel } from '../../shared/ui/mainModal/modalContent.js';
import { updateAiFooterState } from '../../shared/ui/mainModal/modalFooter.js';
import * as modalState from '../../shared/ui/mainModal/modalState.js';

let initialized = false;
let aiCounterVisible = false;
let textareaEditSyncElement = null;
const aiDrafts = { text: '', regex: '' };
const aiDraftDirty = { text: false, regex: false };
let aiSummaryEditError = '';
let lastAiOutputFormat = null;
let renderingAiSummary = false;
let applyingAiSummaryEdit = false;

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
            onPause: () => {
                if (pauseAiScan()) {
                    showNotification(t('notifications.aiScanPaused'), { type: 'info' });
                }
            },
            onResume: () => {
                if (resumeAiScan()) {
                    showNotification(t('notifications.aiScanContinued'), { type: 'success' });
                }
            },
            scanType: 'AiScan',
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

function resetAiDrafts() {
    aiDrafts.text = '';
    aiDrafts.regex = '';
    aiDraftDirty.text = false;
    aiDraftDirty.regex = false;
    aiSummaryEditError = '';
}

function formatAiTextResults(pairs = getAiDisplayData().textPairs) {
    const settings = loadSettings();
    return formatTextsForTranslation(pairs, settings.outputFormat, {
        includeArrayBrackets: settings.includeArrayBrackets,
        tabSize: settings.tabSize,
    });
}

function formatAiRegexResults(rules = getAiDisplayData().regexRules) {
    const settings = loadSettings();
    return formatRegexRulesForTranslation(rules, {
        includeRuleComments: settings.ai?.includeRegexRuleComments === true,
    });
}

function getAiOutputContent(data, type) {
    if (aiDraftDirty[type]) return aiDrafts[type];
    if (type === 'regex') return data.regexRules.length > 0 ? formatAiRegexResults(data.regexRules) : SHOW_PLACEHOLDER;
    return data.textPairs.length > 0 ? formatAiTextResults(data.textPairs) : SHOW_PLACEHOLDER;
}

function syncAiSummary(open = false, options = {}) {
    if (options.resetDrafts) resetAiDrafts();
    ensureTextareaEditSync();
    const snapshot = getAiStateSnapshot();
    const data = getAiDisplayData();
    const settings = loadSettings();
    if (lastAiOutputFormat !== settings.outputFormat) {
        if (lastAiOutputFormat !== null) {
            aiDrafts.text = '';
            aiDraftDirty.text = false;
        }
        lastAiOutputFormat = settings.outputFormat;
    }
    const outputType = modalState.getAiOutputType();
    updateAiOutputTabs(outputType);
    updateAiSummaryPanel(snapshot, getReviewItems(), aiSummaryEditError);
    updateAiFooterState(snapshot);
    updateScanCount(snapshot.counts.total, 'ai');

    if (!open) {
        const visibleAiModal =
            modalState.currentMode === 'ai-scan' && modalState.modalOverlay?.classList.contains('is-visible');
        if (!visibleAiModal) return;
    }

    renderingAiSummary = true;
    updateModalContent(getAiOutputContent(data, outputType), open, 'ai-scan');
    renderingAiSummary = false;
    updateAiOutputTabs(outputType);
    updateAiSummaryPanel(snapshot, getReviewItems(), aiSummaryEditError);
    updateAiFooterState(snapshot);
}

function switchAiOutputType(type) {
    if (type !== 'text' && type !== 'regex') return;
    modalState.setAiOutputType(type);
    syncAiSummary(false);
}

function syncAiSummaryEdits() {
    if (modalState.currentMode !== 'ai-scan' || renderingAiSummary) return;
    const settings = loadSettings();
    const content = modalState.outputTextarea?.value || '';
    const outputType = modalState.getAiOutputType();
    aiDrafts[outputType] = content;
    aiDraftDirty[outputType] = true;
    if (outputType === 'regex') {
        const parsed = parseRegexRules(content);
        if (!parsed.valid) {
            aiSummaryEditError = parsed.error || 'invalid-regex-output';
            updateAiSummaryPanel(getAiStateSnapshot(), getReviewItems(), aiSummaryEditError);
            return;
        }
        let result;
        applyingAiSummaryEdit = true;
        try {
            result = applyAiSummaryEdits({ editedRegexRules: parsed.rules });
        } finally {
            applyingAiSummaryEdit = false;
        }
        if (result.error) {
            aiSummaryEditError = result.error;
            updateAiSummaryPanel(getAiStateSnapshot(), getReviewItems(), aiSummaryEditError);
            return;
        }
        aiSummaryEditError = '';
        if (result.changed) syncAiSummary(false);
        return;
    }

    const remaining = parseSummarySourceTexts(content, settings.outputFormat || 'array');
    let result;
    applyingAiSummaryEdit = true;
    try {
        result = applyAiSummaryEdits({ remainingSourceTexts: remaining });
    } finally {
        applyingAiSummaryEdit = false;
    }
    if (result.changed) {
        aiSummaryEditError = '';
        syncAiSummary(false);
    }
}

function ensureTextareaEditSync() {
    if (textareaEditSyncElement === modalState.outputTextarea || !modalState.outputTextarea) return;
    modalState.outputTextarea.addEventListener('input', syncAiSummaryEdits);
    textareaEditSyncElement = modalState.outputTextarea;
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
        syncAiSummary(false, { resetDrafts: true });
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
        if (!applyingAiSummaryEdit && (aiDraftDirty.text || aiDraftDirty.regex)) resetAiDrafts();
        if (snapshot.active) showAiCounter(snapshot);
        else hideAiCounter();
        syncAiSummary(false);
    });
    on('ai-output-type-change', switchAiOutputType);
    on('ai-submit-pending', () => void handleSubmit());
    on('ai-retry-review', async () => {
        await retryReviewItems();
        syncAiSummary(false);
    });
    on('ai-review-remove', (candidateId) => {
        const result = removeAiReviewItem(candidateId);
        if (result.changed) syncAiSummary(false, { resetDrafts: true });
    });
    on('ai-review-return-to-editor', (candidateId) => {
        const result = restoreAiReviewItem(candidateId);
        if (!result.changed) return;
        modalState.setAiOutputType('text');
        syncAiSummary(false, { resetDrafts: true });
    });
    on('ai-clear', async () => {
        await clearAiData();
        syncAiSummary(false, { resetDrafts: true });
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
        if (hasAiData()) syncAiSummary(false, { resetDrafts: true });
    });
    on('aiBudgetBlocked', () => {
        showNotification(t('notifications.aiBudgetBlocked'), { type: 'warning' });
    });
    on('aiRequestFailed', () => {
        showNotification(t('notifications.aiRequestFailed'), { type: 'error' });
    });
}

export { hasAiData, isAiScanActive };
