// src/shared/ui/mainModal/modalHeader.js

/**
 * @module modalHeader
 * @description 负责创建和管理主模态框的头部区域。
 */

import { createIconTitle } from '../iconTitle.js';
import { createSVGFromString } from '../../utils/dom.js';
import { t } from '../../i18n/index.js';
import { summaryIcon } from '../../../assets/icons/summaryIcon.js';
import { closeIcon } from '../../../assets/icons/closeIcon.js';

/**
 * @description 填充模态框头部元素，包括标题和关闭按钮。
 * @param {HTMLElement} modalHeader - 模态框头部的容器元素。
 * @param {Function} closeCallback - 点击关闭按钮时调用的回调函数。
 */
export function populateModalHeader(modalHeader, closeCallback) {
  const titleContainer = document.createElement('div');
  titleContainer.id = 'main-modal-title-container';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'tc-close-button text-extractor-modal-close';
  closeBtn.appendChild(createSVGFromString(closeIcon));

  const titleElement = createIconTitle(summaryIcon, t('textExtractionResults'));
  titleContainer.appendChild(titleElement);

  modalHeader.appendChild(titleContainer);
  modalHeader.appendChild(closeBtn);

  // 绑定事件
  closeBtn.addEventListener('click', closeCallback);
}
