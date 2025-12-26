// src/shared/ui/mainModal/modalHeader.js

/**
 * @module modalHeader
 * @description 负责创建和管理主模态框的头部区域。
 */

import { createIconTitle } from '../components/iconTitle.js';
import { createSVGFromString } from '../../utils/dom/dom.js';
import { t } from '../../i18n/index.js';
import { on } from '../../utils/core/eventBus.js';
import { summaryIcon } from '../../../assets/icons/summaryIcon.js';
import { closeIcon } from '../../../assets/icons/closeIcon.js';
import { loadSettings } from '../../../features/settings/logic.js';
import { simpleTemplate } from '../../utils/dom/templating.js';

let titleContainer, scanCountDisplay, closeBtn, unsubscribeLanguageChanged, unsubscribeSettingsSaved;
let currentScanState = { count: 0, type: null };

/**
 * @private
 * @description 更新扫描计数器的显示文本和可见性。
 */
function updateScanCountDisplay() {
    const { showScanCount } = loadSettings();
    if (!scanCountDisplay) return;

    if (showScanCount && currentScanState.count > 0 && currentScanState.type) {
        const key = currentScanState.type === 'session' ? 'results.scanCountSession' : 'results.scanCountStatic';
        const template = t(key);
        scanCountDisplay.textContent = simpleTemplate(template, { count: currentScanState.count });
        scanCountDisplay.classList.add('is-visible');
    } else {
        scanCountDisplay.classList.remove('is-visible');
        // 等待动画结束后再清空文本，以确保淡出效果可见
        setTimeout(() => {
            if (currentScanState.count === 0) {
                scanCountDisplay.textContent = '';
            }
        }, 300); // 300ms 匹配CSS中的过渡时间
    }
}

/**
 * @private
 * @description 更新模态框头部的所有文本内容，包括标题和扫描计数。
 */
function rerenderHeaderTexts() {
    if (titleContainer) {
        // 仅更新标题文本，不重新创建整个元素
        const titleElement = titleContainer.querySelector('.icon-title-text');
        if (titleElement) {
            titleElement.textContent = t('results.title');
        }
    }
    // 重新渲染扫描计数以应用新的语言
    updateScanCountDisplay();
}

/**
 * @description 填充模态框头部元素，包括标题和关闭按钮。
 * @param {HTMLElement} modalHeader - 模态框头部的容器元素。
 * @param {Function} closeCallback - 点击关闭按钮时调用的回调函数。
 */
export function populateModalHeader(modalHeader, closeCallback) {
    // 左侧标题容器
    titleContainer = document.createElement('div');
    titleContainer.id = 'main-modal-title-container';
    const newTitleElement = createIconTitle(summaryIcon, t('results.title'));
    titleContainer.appendChild(newTitleElement);

    // 右侧控件容器
    const rightControlsContainer = document.createElement('div');
    rightControlsContainer.className = 'header-right-controls';

    // 扫描计数器
    scanCountDisplay = document.createElement('span');
    scanCountDisplay.id = 'scan-count-display';
    // 将计数器直接附加到标题元素后面
    newTitleElement.appendChild(scanCountDisplay);

    // 关闭按钮
    closeBtn = document.createElement('span');
    closeBtn.className = 'tc-close-button text-extractor-modal-close';
    closeBtn.appendChild(createSVGFromString(closeIcon));

    // 将关闭按钮添加到右侧容器
    rightControlsContainer.appendChild(closeBtn);

    // 将左右容器添加到头部
    modalHeader.appendChild(titleContainer);
    modalHeader.appendChild(rightControlsContainer);

    // 绑定事件
    closeBtn.addEventListener('click', closeCallback);

    // 监听事件
    unsubscribeLanguageChanged = on('languageChanged', rerenderHeaderTexts);
    unsubscribeSettingsSaved = on('settingsSaved', updateScanCountDisplay);
}

/**
 * @description 销毁模态框头部，清理事件监听器和引用。
 * @param {Function} closeCallback - 创建时传入的同一个回调函数，用于移除监听器。
 */
export function destroyModalHeader(closeCallback) {
    if (closeBtn) {
        closeBtn.removeEventListener('click', closeCallback);
        closeBtn = null;
    }
    if (unsubscribeLanguageChanged) {
        unsubscribeLanguageChanged();
        unsubscribeLanguageChanged = null;
    }
    if (unsubscribeSettingsSaved) {
        unsubscribeSettingsSaved();
        unsubscribeSettingsSaved = null;
    }
    titleContainer = null;
    scanCountDisplay = null;
}

/**
 * @description 更新扫描计数的外部接口。
 * @param {number} count - 新的扫描计数。
 * @param {('session'|'static'|null)} type - 扫描类型。
 */
export function updateScanCount(count, type) {
    currentScanState = { count, type };
    updateScanCountDisplay();
}
