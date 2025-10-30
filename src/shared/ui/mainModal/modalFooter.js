// src/shared/ui/mainModal/modalFooter.js

/**
 * @module modalFooter
 * @description 负责创建和管理主模态框的页脚区域。
 */

import { setClipboard } from '../../services/tampermonkey.js';
import { showNotification } from '../components/notification.js';
import { createIconTitle } from '../iconTitle.js';
import { copyIcon } from '../../../assets/icons/copyIcon.js';
import clearIcon from '../../../assets/icons/clearIcon.js';
import { log } from '../../utils/logger.js';
import { t } from '../../i18n/index.js';
import { on } from '../../utils/eventBus.js';
import { showConfirmationModal } from '../components/confirmationModal.js';
import warningIcon from '../../../assets/icons/warningIcon.js';
import { createExportButton } from '../../../features/export/ui.js';
import * as state from './modalState.js';
import { SHOW_PLACEHOLDER } from './modalState.js';
import { updateScanCount } from './modalHeader.js';


let clearBtn, copyBtn;


/**
 * @private
 * @description 更新页脚中所有需要翻译的文本。
 */
function rerenderFooterTexts() {
    if (copyBtn) {
        copyBtn.replaceChildren();
        copyBtn.appendChild(createIconTitle(copyIcon, t('common.copy')));
    }
    if (clearBtn) {
        clearBtn.replaceChildren();
        clearBtn.appendChild(createIconTitle(clearIcon, t('common.clear')));
    }
    // 更新统计信息（如果可见）
    updateStatistics();
}

/**
 * @description 填充模态框页脚元素。
 * @param {HTMLElement} modalFooter - 模态框页脚的容器元素。
 * @param {Function} updateContentCallback - 需要更新内容时调用的回调函数。
 * @param {Function} clearSessionCallback - 清空会话扫描数据的回调函数。
 */
export function populateModalFooter(modalFooter, updateContentCallback, clearSessionCallback) {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'tc-stats-container';
    state.setStatsContainer(statsContainer);

    const footerButtonContainer = document.createElement('div');
    footerButtonContainer.className = 'tc-footer-buttons';

    clearBtn = document.createElement('button');
    clearBtn.className = 'text-extractor-clear-btn tc-button';
    clearBtn.disabled = true;

    copyBtn = document.createElement('button');
    copyBtn.className = 'text-extractor-copy-btn tc-button';
    copyBtn.disabled = true;

    const exportBtnContainer = createExportButton();
    footerButtonContainer.appendChild(exportBtnContainer);
    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);

    modalFooter.appendChild(statsContainer);
    modalFooter.appendChild(footerButtonContainer);

    rerenderFooterTexts();


    // --- 事件绑定 ---
    copyBtn.addEventListener('click', () => {
        const textToCopy = state.outputTextarea.value;
        if (textToCopy && !copyBtn.disabled) {
            log(t('log.ui.copyButton.copied', { count: textToCopy.length }));
            setClipboard(textToCopy);
            showNotification(t('notifications.copiedToClipboard'), { type: 'success' });
        } else {
            log(t('log.ui.copyButton.nothingToCopy'));
            showNotification(t('notifications.nothingToCopy'), { type: 'info' });
        }
    });

    clearBtn.addEventListener('click', async () => {
        if (clearBtn.disabled) return;
        log(t('log.ui.modal.clearContent'));

        const confirmed = await showConfirmationModal(
            t('confirmation.clear'),
            warningIcon
        );

        if (confirmed) {
            if (state.currentMode === 'session-scan' && clearSessionCallback) {
                log(t('log.ui.confirmationModal.sessionScan.confirmed'));
                clearSessionCallback();
                updateContentCallback(SHOW_PLACEHOLDER, true, 'session-scan');
            } else {
                log(t('log.ui.confirmationModal.quickScan.confirmed'));
                updateContentCallback(SHOW_PLACEHOLDER, false, 'quick-scan');
                // 强制更新静态扫描的计数器
                updateScanCount(0, 'quick-scan');
            }
            showNotification(t('notifications.contentCleared'), { type: 'success' });
        } else {
            log(t('log.ui.confirmationModal.cancelled'));
        }
    });
    // 监听语言变化事件
    on('languageChanged', rerenderFooterTexts);
}

/**
 * @description 异步更新统计信息。
 */
export function updateStatistics() {
    if (!state.statsContainer || !state.outputTextarea) return;

    // 将字符串计算延迟到下一个事件循环
    setTimeout(() => {
        const text = state.outputTextarea.value;
        const lineCount = text.split('\n').length;
        const charCount = text.length;
        state.statsContainer.textContent = `${t('results.stats.lines')}: ${lineCount} | ${t('results.stats.chars')}: ${charCount}`;
    }, 0);
}
