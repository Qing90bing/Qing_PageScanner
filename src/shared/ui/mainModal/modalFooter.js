// src/shared/ui/mainModal/modalFooter.js

import { setClipboard } from '../../services/tampermonkey.js';
import { showNotification } from '../components/notification.js';
import { copyIcon } from '../../../assets/icons/copyIcon.js';
import { clearIcon } from '../../../assets/icons/clearIcon.js';
import { log } from '../../utils/core/logger.js';
import { t } from '../../i18n/index.js';
import { on, fire } from '../../utils/core/eventBus.js';
import { showConfirmationModal } from '../components/confirmationModal.js';
import { warningIcon } from '../../../assets/icons/warningIcon.js';
import { createExportButton } from '../../../features/export/ui.js';
import * as state from './modalState.js';
import { SHOW_PLACEHOLDER } from './modalState.js';
import { updateScanCount } from './modalHeader.js';
import { createButton } from '../components/button.js';
import { aiIcon } from '../../../assets/icons/aiIcon.js';

let clearBtn, copyBtn, exportBtnContainer, aiSubmitBtn, aiRetryBtn, unsubscribeLanguageChanged;
let currentFooterMode = 'quick-scan';

function rerenderFooterTexts() {
    if (copyBtn) {
        copyBtn.updateText('common.copy');
    }
    if (clearBtn) {
        clearBtn.updateText('common.clear');
    }
    if (aiSubmitBtn) aiSubmitBtn.updateText('ai.actions.submitPending');
    if (aiRetryBtn) aiRetryBtn.updateText('ai.actions.retryReview');
    updateStatistics();
}

export function populateModalFooter(modalFooter, updateContentCallback) {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'tc-stats-container';
    state.setStatsContainer(statsContainer);

    const footerButtonContainer = document.createElement('div');
    footerButtonContainer.className = 'tc-footer-buttons';

    const handleCopyClick = () => {
        const textToCopy = state.outputTextarea.value;
        if (textToCopy && !copyBtn.disabled) {
            log(t('log.ui.copyButton.copied', { count: textToCopy.length }));
            setClipboard(textToCopy);
            showNotification(t('notifications.copiedToClipboard'), { type: 'success' });
        } else {
            log(t('log.ui.copyButton.nothingToCopy'));
            showNotification(t('notifications.nothingToCopy'), { type: 'info' });
        }
    };

    const handleClearClick = async () => {
        if (clearBtn.disabled) return;
        log(t('log.ui.modal.clearContent'));

        const confirmed = await showConfirmationModal(t('confirmation.clear'), warningIcon);

        if (confirmed) {
            const currentMode = state.currentMode;
            log(t('log.ui.modal.clearingContent', { mode: currentMode }));

            if (currentMode === 'session-scan') {
                fire('clearSessionScan');
            } else if (currentMode === 'element-scan') {
                fire('clearElementScan');
            } else if (currentMode === 'ai-scan') {
                fire('ai-clear');
            }
            // 重置扫描计数显示
            updateScanCount(0, null);
            updateContentCallback(SHOW_PLACEHOLDER, true, currentMode);
            showNotification(t('notifications.contentCleared'), { type: 'success' });
        } else {
            log(t('log.ui.confirmationModal.cancelled'));
        }
    };

    copyBtn = createButton({
        className: 'text-extractor-copy-btn',
        textKey: 'common.copy',
        icon: copyIcon,
        onClick: handleCopyClick,
        disabled: true,
    });

    clearBtn = createButton({
        className: 'text-extractor-clear-btn',
        textKey: 'common.clear',
        icon: clearIcon,
        onClick: handleClearClick,
        disabled: true,
    });

    exportBtnContainer = createExportButton();
    aiSubmitBtn = createButton({
        className: 'ai-submit-btn',
        textKey: 'ai.actions.submitPending',
        icon: aiIcon,
        onClick: () => fire('ai-submit-pending'),
        disabled: true,
    });
    aiRetryBtn = createButton({
        className: 'ai-retry-btn',
        textKey: 'ai.actions.retryReview',
        icon: aiIcon,
        onClick: () => fire('ai-retry-review'),
        disabled: true,
    });
    footerButtonContainer.appendChild(exportBtnContainer);
    footerButtonContainer.appendChild(aiRetryBtn);
    footerButtonContainer.appendChild(aiSubmitBtn);
    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);

    modalFooter.appendChild(statsContainer);
    modalFooter.appendChild(footerButtonContainer);

    unsubscribeLanguageChanged = on('languageChanged', rerenderFooterTexts);
}

export function destroyModalFooter() {
    if (copyBtn) {
        copyBtn.destroy();
        copyBtn = null;
    }
    if (clearBtn) {
        clearBtn.destroy();
        clearBtn = null;
    }
    if (exportBtnContainer) {
        exportBtnContainer.destroy();
        exportBtnContainer = null;
    }
    if (aiSubmitBtn) {
        aiSubmitBtn.destroy();
        aiSubmitBtn = null;
    }
    if (aiRetryBtn) {
        aiRetryBtn.destroy();
        aiRetryBtn = null;
    }
    if (unsubscribeLanguageChanged) {
        unsubscribeLanguageChanged();
        unsubscribeLanguageChanged = null; // 移除引用
    }
    copyBtn = null;
    clearBtn = null;
    log(t('log.ui.modal.footerCleanedUp'));
}

/** @param {'quick-scan'|'session-scan'|'element-scan'|'ai-scan'} mode */
export function setModalFooterMode(mode) {
    currentFooterMode = mode;
    aiSubmitBtn?.classList.toggle('is-visible', mode === 'ai-scan');
    aiRetryBtn?.classList.toggle('is-visible', mode === 'ai-scan');
}

/** @param {object} snapshot */
export function updateAiFooterState(snapshot) {
    if (!snapshot) return;
    if (clearBtn && currentFooterMode === 'ai-scan') {
        clearBtn.disabled = (snapshot.counts?.total || 0) === 0;
    }
    if (aiSubmitBtn) {
        aiSubmitBtn.disabled =
            !snapshot.active || snapshot.paused || snapshot.processing || (snapshot.counts?.pending || 0) === 0;
    }
    if (aiRetryBtn) {
        const retryCount = (snapshot.counts?.review || 0) + (snapshot.counts?.failed || 0);
        aiRetryBtn.disabled = !snapshot.active || snapshot.paused || snapshot.processing || retryCount === 0;
    }
    if (currentFooterMode !== 'ai-scan') return;
}

export function updateStatistics() {
    if (!state.statsContainer || !state.outputTextarea) return;

    requestAnimationFrame(() => {
        const text = state.outputTextarea.value;
        const lineCount = text.split('\n').length;
        const charCount = text.length;
        state.statsContainer.textContent = `${t('results.stats.lines')}: ${lineCount} | ${t('results.stats.chars')}: ${charCount}`;
    });
}
