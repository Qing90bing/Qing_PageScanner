// src/shared/ui/mainModal/modalFooter.js

import { setClipboard } from '../../services/tampermonkey.js';
import { showNotification } from '../components/notification.js';
import { createIconTitle } from '../iconTitle.js';
import { copyIcon } from '../../../assets/icons/copyIcon.js';
import clearIcon from '../../../assets/icons/clearIcon.js';
import { log } from '../../utils/logger.js';
import { t } from '../../i18n/index.js';
import { on, fire } from '../../utils/eventBus.js';
import { showConfirmationModal } from '../components/confirmationModal.js';
import warningIcon from '../../../assets/icons/warningIcon.js';
import { createExportButton } from '../../../features/export/ui.js';
import * as state from './modalState.js';
import { SHOW_PLACEHOLDER } from './modalState.js';
import { createButton } from '../components/button.js';

let clearBtn, copyBtn;

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
            log(`Clearing content for mode: ${currentMode}`);

            if (currentMode === 'session-scan') {
                fire('clearSessionScan');
            } else if (currentMode === 'element-scan') {
                fire('clearElementScan');
            }

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

    const exportBtnContainer = createExportButton();
    footerButtonContainer.appendChild(exportBtnContainer);
    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);

    modalFooter.appendChild(statsContainer);
    modalFooter.appendChild(footerButtonContainer);

    on('languageChanged', rerenderFooterTexts);
}

export function updateStatistics() {
    if (!state.statsContainer || !state.outputTextarea) return;

    setTimeout(() => {
        const text = state.outputTextarea.value;
        const lineCount = text.split('\n').length;
        const charCount = text.length;
        state.statsContainer.textContent = `${t('results.stats.lines')}: ${lineCount} | ${t('results.stats.chars')}: ${charCount}`;
    }, 0);
}
