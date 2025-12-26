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

let clearBtn, copyBtn, exportBtnContainer, unsubscribeLanguageChanged;

function rerenderFooterTexts() {
    if (copyBtn) {
        copyBtn.updateText('common.copy');
    }
    if (clearBtn) {
        clearBtn.updateText('common.clear');
    }
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

        const confirmed = await showConfirmationModal(
            t('confirmation.clear'),
            warningIcon
        );

        if (confirmed) {
            const currentMode = state.currentMode;
            log(t('log.ui.modal.clearingContent', { mode: currentMode }));

            if (currentMode === 'session-scan') {
                fire('clearSessionScan');
            } else if (currentMode === 'element-scan') {
                fire('clearElementScan');
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
    footerButtonContainer.appendChild(exportBtnContainer);
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
    if (unsubscribeLanguageChanged) {
        unsubscribeLanguageChanged();
        unsubscribeLanguageChanged = null; // 移除引用
    }
    copyBtn = null;
    clearBtn = null;
    log(t('log.ui.modal.footerCleanedUp'));
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
