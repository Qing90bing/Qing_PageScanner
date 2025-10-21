// src/shared/ui/mainModal/modalContent.js

/**
 * @module modalContent
 * @description 负责创建和管理主模态框的内容区域。
 */

import { createSVGFromString } from '../../utils/dom.js';
import * as state from './modalState.js';
import { infoIcon } from '../../../assets/icons/infoIcon.js';
import { dynamicIcon } from '../../../assets/icons/dynamicIcon.js';
import { translateIcon } from '../../../assets/icons/icon.js';
import { loadingSpinner } from '../../../assets/icons/loadingSpinner.js';
import config from '../../config.js';

/**
 * @description 创建占位符元素。
 * @returns {HTMLElement} 占位符容器元素。
 */
function createPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.id = 'modal-placeholder';

    const placeholderIconDiv = document.createElement('div');
    placeholderIconDiv.className = 'placeholder-icon';
    const infoIconSVG = createSVGFromString(infoIcon);
    if (infoIconSVG) placeholderIconDiv.appendChild(infoIconSVG);

    const p1 = document.createElement('p');
    p1.textContent = '当前没有总结文本';

    const p2 = document.createElement('p');
    p2.className = 'placeholder-actions';
    p2.append('点击 ');
    const span2 = document.createElement('span');
    span2.className = 'placeholder-action-icon';
    const dynamicIconSVG = createSVGFromString(dynamicIcon);
    if (dynamicIconSVG) span2.appendChild(dynamicIconSVG);
    p2.appendChild(span2);
    const strong2 = document.createElement('strong');
    strong2.textContent = '[动态扫描]';
    p2.appendChild(strong2);
    p2.append(' 按钮开始一个新的扫描会话');

    const p3 = document.createElement('p');
    p3.className = 'placeholder-actions';
    p3.append('点击 ');
    const span3 = document.createElement('span');
    span3.className = 'placeholder-action-icon';
    const translateIconSVG = createSVGFromString(translateIcon);
    if (translateIconSVG) span3.appendChild(translateIconSVG);
    p3.appendChild(span3);
    const strong3 = document.createElement('strong');
    strong3.textContent = '[静态扫描]';
    p3.appendChild(strong3);
    p3.append(' 按钮可进行一次性的快捷提取');

    placeholder.appendChild(placeholderIconDiv);
    placeholder.appendChild(p1);
    placeholder.appendChild(p2);
    placeholder.appendChild(p3);

    return placeholder;
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
    if (config.modalContentHeight) {
        modalContent.style.height = config.modalContentHeight;
    }

    const placeholder = createPlaceholder();
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
