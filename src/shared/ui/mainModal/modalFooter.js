// src/shared/ui/mainModal/modalFooter.js

/**
 * @module modalFooter
 * @description 负责创建和管理主模态框的页脚区域。
 */

import { setClipboard } from '../../services/tampermonkey.js';
import { showNotification } from '../notification.js';
import { createIconTitle } from '../iconTitle.js';
import { copyIcon } from '../../../assets/icons/copyIcon.js';
import clearIcon from '../../../assets/icons/clearIcon.js';
import { log } from '../../utils/logger.js';
import { showConfirmationModal } from '../confirmationModal.js';
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

    const copyBtnContent = createIconTitle(copyIcon, '复制');
    copyBtn.appendChild(copyBtnContent);
    const clearBtnContent = createIconTitle(clearIcon, '清空');
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
            showNotification('已复制到剪贴板', { type: 'success' });
        } else {
            log('复制按钮被点击，但没有内容可复制或按钮被禁用。');
            showNotification('没有内容可复制', { type: 'info' });
        }
    });

    clearBtn.addEventListener('click', async () => {
        if (clearBtn.disabled) return;

        const confirmed = await showConfirmationModal(
            '你确认要清空吗？此操作不可撤销。',
            warningIcon
        );

        if (confirmed) {
            log('用户确认清空文本。');
            updateContentCallback(SHOW_PLACEHOLDER);
            showNotification('内容已清空', { type: 'success' });
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
    state.statsContainer.textContent = `行: ${lineCount} | 字符数: ${charCount}`;
}
