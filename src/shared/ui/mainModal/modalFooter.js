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
import { showConfirmationModal } from '../components/confirmationModal.js';
import warningIcon from '../../../assets/icons/warningIcon.js';
import * as state from './modalState.js';
import { SHOW_PLACEHOLDER } from './modalState.js';

/**
 * @description 填充模态框页脚元素。
 * @param {HTMLElement} modalFooter - 模态框页脚的容器元素。
 * @param {Function} updateContentCallback - 需要更新内容时调用的回调函数。
 */
export function populateModalFooter(modalFooter, updateContentCallback) {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'tc-stats-container';
    state.setStatsContainer(statsContainer);

    const footerButtonContainer = document.createElement('div');
    footerButtonContainer.className = 'tc-footer-buttons';

    const clearBtn = document.createElement('button');
    clearBtn.className = 'text-extractor-clear-btn tc-button';
    clearBtn.disabled = true;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'text-extractor-copy-btn tc-button';
    copyBtn.disabled = true;

    const copyBtnContent = createIconTitle(copyIcon, t('copy'));
    copyBtn.appendChild(copyBtnContent);
    const clearBtnContent = createIconTitle(clearIcon, t('clear'));
    clearBtn.appendChild(clearBtnContent);

    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);

    modalFooter.appendChild(statsContainer);
    modalFooter.appendChild(footerButtonContainer);

    // --- 事件绑定 ---
    copyBtn.addEventListener('click', () => {
        const textToCopy = state.outputTextarea.value;
        if (textToCopy && !copyBtn.disabled) {
            log(`复制按钮被点击，复制了 ${textToCopy.length} 个字符。`);
            setClipboard(textToCopy);
            showNotification(t('copiedToClipboard'), { type: 'success' });
        } else {
            log('复制按钮被点击，但没有内容可复制或按钮被禁用。');
            showNotification(t('nothingToCopy'), { type: 'info' });
        }
    });

    clearBtn.addEventListener('click', async () => {
        if (clearBtn.disabled) return;

        const confirmed = await showConfirmationModal(
            t('clearConfirmation'),
            warningIcon
        );

        if (confirmed) {
            log('用户确认清空文本。');
            updateContentCallback(SHOW_PLACEHOLDER);
            showNotification(t('contentCleared'), { type: 'success' });
        } else {
            log('用户取消了清空操作。');
        }
    });
}

/**
 * @description 更新统计信息。
 */
export function updateStatistics() {
    if (!state.statsContainer || !state.outputTextarea) return;
    const text = state.outputTextarea.value;
    const lineCount = text.split('\n').length;
    const charCount = text.length;
    state.statsContainer.textContent = `${t('stats_lines')}: ${lineCount} | ${t('stats_chars')}: ${charCount}`;
}
