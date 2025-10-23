// src/shared/ui/mainModal/modalContent.js

/**
 * @module modalContent
 * @description 负责创建和管理主模态框的内容区域。
 */

import { createSVGFromString } from '../../utils/dom.js';
import * as state from './modalState.js';
import { t } from '../../i18n/index.js';
import { on } from '../../utils/eventBus.js';
import { infoIcon } from '../../../assets/icons/infoIcon.js';
import { dynamicIcon } from '../../../assets/icons/dynamicIcon.js';
import { translateIcon } from '../../../assets/icons/icon.js';
import { loadingSpinner } from '../../../assets/icons/loadingSpinner.js';
import { appConfig } from '../../../features/settings/config.js';


let placeholder;

/**
 * @private
 * @description 更新占位符中的所有文本。
 */
function rerenderPlaceholder() {
    if (!placeholder) return;

    // 清空现有内容
    placeholder.replaceChildren();

    const placeholderIconDiv = document.createElement('div');
    placeholderIconDiv.className = 'placeholder-icon';
    const infoIconSVG = createSVGFromString(infoIcon);
    if (infoIconSVG) placeholderIconDiv.appendChild(infoIconSVG);

    const p1 = document.createElement('p');
    p1.textContent = t('noSummaryText');

    const p2 = document.createElement('p');
    p2.className = 'placeholder-actions';
    p2.append(t('placeholder_click'));
    const span2 = document.createElement('span');
    span2.className = 'placeholder-action-icon';
    const dynamicIconSVG = createSVGFromString(dynamicIcon);
    if (dynamicIconSVG) span2.appendChild(dynamicIconSVG);
    p2.appendChild(span2);
    const strong2 = document.createElement('strong');
    strong2.textContent = t('placeholder_dynamicScan');
    p2.appendChild(strong2);
    p2.append(t('placeholder_startNewScanSession'));

    const p3 = document.createElement('p');
    p3.className = 'placeholder-actions';
    p3.append(t('placeholder_click'));
    const span3 = document.createElement('span');
    span3.className = 'placeholder-action-icon';
    const translateIconSVG = createSVGFromString(translateIcon);
    if (translateIconSVG) span3.appendChild(translateIconSVG);
    p3.appendChild(span3);
    const strong3 = document.createElement('strong');
    strong3.textContent = t('placeholder_staticScan');
    p3.appendChild(strong3);
    p3.append(t('placeholder_performOneTimeScan'));

    placeholder.appendChild(placeholderIconDiv);
    placeholder.appendChild(p1);
    placeholder.appendChild(p2);
    placeholder.appendChild(p3);
}

/**
 * @description 创建加载动画元素。
 * @returns {HTMLElement} 加载动画容器元素。
 */
function createLoadingSpinner() {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'gm-loading-overlay';
    const spinner = document.createElement('div');
    spinner.className = 'gm-loading-spinner';
    const spinnerSVG = createSVGFromString(loadingSpinner);
    if (spinnerSVG) spinner.appendChild(spinnerSVG);
    loadingContainer.appendChild(spinner);
    return loadingContainer;
}

/**
 * @description 填充模态框内容区域。
 * @param {HTMLElement} modalContent - 模态框内容区的容器元素。
 */
export function populateModalContent(modalContent) {
    if (appConfig.ui.modalContentHeight) {
        modalContent.style.height = appConfig.ui.modalContentHeight;
    }

    placeholder = document.createElement('div');
    placeholder.id = 'modal-placeholder';
    rerenderPlaceholder();
    state.setPlaceholder(placeholder);


    const textareaContainer = document.createElement('div');
    textareaContainer.className = 'tc-textarea-container';

    const lineNumbersDiv = document.createElement('div');
    lineNumbersDiv.className = 'tc-line-numbers';
    state.setLineNumbersDiv(lineNumbersDiv);

    const outputTextarea = document.createElement('textarea');
    outputTextarea.id = 'text-extractor-output';
    outputTextarea.className = 'tc-textarea';
    state.setOutputTextarea(outputTextarea);

    textareaContainer.appendChild(lineNumbersDiv);
    textareaContainer.appendChild(outputTextarea);

    const loadingContainer = createLoadingSpinner();
    state.setLoadingContainer(loadingContainer);

    modalContent.appendChild(placeholder);
    modalContent.appendChild(textareaContainer);
    modalContent.appendChild(loadingContainer);

    on('languageChanged', rerenderPlaceholder);
}

/**
 * @description 显示加载动画并禁用文本区域。
 */
export function showLoading() {
    if (state.loadingContainer) state.loadingContainer.classList.add('is-visible');
    if (state.outputTextarea) state.outputTextarea.disabled = true;
}

/**
 * @description 隐藏加载动画并启用文本区域。
 */
export function hideLoading() {
    if (state.loadingContainer) state.loadingContainer.classList.remove('is-visible');
    if (state.outputTextarea) state.outputTextarea.disabled = false;
}
