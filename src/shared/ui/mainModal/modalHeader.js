// src/shared/ui/mainModal/modalHeader.js

/**
 * @module modalHeader
 * @description 负责创建和管理主模态框的头部区域。
 */

import { createIconTitle } from '../iconTitle.js';
import { createSVGFromString } from '../../utils/dom.js';
import { t } from '../../i18n/index.js';
import { on } from '../../utils/eventBus.js';
import { summaryIcon } from '../../../assets/icons/summaryIcon.js';
import { closeIcon } from '../../../assets/icons/closeIcon.js';


let titleContainer;

/**
 * @private
 * @description 更新模态框头部的文本内容。
 */
function rerenderHeaderTexts() {
    if (!titleContainer) return;

    // 清空旧的标题并重新创建
    titleContainer.replaceChildren();

    const newTitleElement = createIconTitle(summaryIcon, t('results.title'));
    titleContainer.appendChild(newTitleElement);
}

/**
 * @description 填充模态框头部元素，包括标题和关闭按钮。
 * @param {HTMLElement} modalHeader - 模态框头部的容器元素。
 * @param {Function} closeCallback - 点击关闭按钮时调用的回调函数。
 */
export function populateModalHeader(modalHeader, closeCallback) {
  titleContainer = document.createElement('div');
  titleContainer.id = 'main-modal-title-container';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'tc-close-button text-extractor-modal-close';
  closeBtn.appendChild(createSVGFromString(closeIcon));

  rerenderHeaderTexts();

  modalHeader.appendChild(titleContainer);
  modalHeader.appendChild(closeBtn);

  // 绑定事件
  closeBtn.addEventListener('click', closeCallback);

  // 监听语言变化事件
  on('languageChanged', rerenderHeaderTexts);
}
