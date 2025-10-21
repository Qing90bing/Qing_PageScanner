// src/shared/ui/mainModal/modalLayout.js

/**
 * @module modalLayout
 * @description 负责创建主模态框的基础DOM结构（骨架）。
 */

import { uiContainer } from '../uiContainer.js';
import * as state from './modalState.js';

/**
 * @description 创建并组装模态框的基础布局元素。
 * @returns {{modal, modalHeader, modalContent, modalFooter}} 包含主要布局元素的DOM引用。
 */
export function createModalLayout() {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'text-extractor-modal-overlay';
  modalOverlay.tabIndex = -1;
  state.setModalOverlay(modalOverlay);

  const modal = document.createElement('div');
  modal.className = 'text-extractor-modal';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'text-extractor-modal-header';

  const modalContent = document.createElement('div');
  modalContent.className = 'text-extractor-modal-content';

  const modalFooter = document.createElement('div');
  modalFooter.className = 'text-extractor-modal-footer';

  modal.appendChild(modalHeader);
  modal.appendChild(modalContent);
  modal.appendChild(modalFooter);
  modalOverlay.appendChild(modal);

  uiContainer.appendChild(modalOverlay);

  return { modal, modalHeader, modalContent, modalFooter };
}
