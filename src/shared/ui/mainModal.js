// src/ui/components/mainModal.js

/**
 * @module mainModal
 * @description 负责创建和管理主界面的模态框（文本提取结果窗口）。
 */

import { setClipboard } from '../services/tampermonkey.js';
import config from '../../config.js';
import { extractAndProcessText, formatTextsForTranslation } from '../utils/textProcessor.js';
import { showNotification } from './notification.js';
import { createIconTitle } from './iconTitle.js';
import { createSVGFromString } from '../utils/dom.js';
import { summaryIcon } from '../../assets/summaryIcon.js';
import { copyIcon } from '../../assets/copyIcon.js';
import { infoIcon } from '../../assets/infoIcon.js';
import { dynamicIcon } from '../../assets/dynamicIcon.js';
import { translateIcon } from '../../assets/icon.js';

// --- 模块级变量 ---

let modalOverlay = null; // 模态框遮罩层
let outputTextarea = null; // 文本输出区域
let placeholder = null; // 提示信息容器
export const SHOW_PLACEHOLDER = '::show_placeholder::'; // 特殊标识符


/**
 * @private
 * @description 处理全局键盘事件，按下 Esc 键时关闭模态框。
 * @param {KeyboardEvent} event - 键盘事件。
 */
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

// --- 公开函数 ---

/**
 * @public
 * @description 创建并初始化主模态框。只在第一次调用时创建 DOM。
 */
export function createMainModal() {
  if (modalOverlay) return; // 防止重复创建

  // --- 创建 DOM 结构 ---
  modalOverlay = document.createElement('div');
  modalOverlay.className = 'text-extractor-modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'text-extractor-modal';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'text-extractor-modal-header';

  const titleContainer = document.createElement('div');
  titleContainer.id = 'main-modal-title-container';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'tc-close-button text-extractor-modal-close';
  const closeIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  closeIconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  closeIconSvg.setAttribute('height', '24px');
  closeIconSvg.setAttribute('viewBox', '0 -960 960 960');
  closeIconSvg.setAttribute('width', '24px');
  closeIconSvg.setAttribute('fill', 'currentColor');
  const closeIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  closeIconPath.setAttribute('d', 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z');
  closeIconSvg.appendChild(closeIconPath);
  closeBtn.appendChild(closeIconSvg);

  modalHeader.appendChild(titleContainer);
  modalHeader.appendChild(closeBtn);

  const modalContent = document.createElement('div');
  modalContent.className = 'text-extractor-modal-content';

  placeholder = document.createElement('div');
  placeholder.id = 'modal-placeholder';

  outputTextarea = document.createElement('textarea');
  outputTextarea.id = 'text-extractor-output';
  outputTextarea.className = 'tc-textarea';

  modalContent.appendChild(placeholder);
  modalContent.appendChild(outputTextarea);

  const modalFooter = document.createElement('div');
  modalFooter.className = 'text-extractor-modal-footer';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'text-extractor-copy-btn tc-button';

  modalFooter.appendChild(copyBtn);

  modal.appendChild(modalHeader);
  modal.appendChild(modalContent);
  modal.appendChild(modalFooter);
  modalOverlay.appendChild(modal);

  document.body.appendChild(modalOverlay);

  // --- 配置和内容填充 ---

  if (config.modalContentHeight) {
    modalContent.style.height = config.modalContentHeight;
  }

  const titleElement = createIconTitle(summaryIcon, '提取的文本');
  titleContainer.appendChild(titleElement);

  // 填充占位符内容
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

  // 更新复制按钮内容
  const copyBtnContent = createIconTitle(copyIcon, '复制');
  copyBtn.appendChild(copyBtnContent);

  // 绑定事件
  closeBtn.addEventListener('click', closeModal);
  copyBtn.addEventListener('click', () => {
    const textToCopy = outputTextarea.value;
    setClipboard(textToCopy);
    showNotification('已复制到剪贴板', { type: 'success' });
  });
}

/**
 * @public
 * @description 显示主模态框并开始提取文本。
 */
export function openModal() {
  if (!modalOverlay) {
    console.error("模态框尚未初始化。");
    return;
  }

  updateModalContent('文本提取中...', true);

  setTimeout(() => {
    const extractedTexts = extractAndProcessText();
    const formattedText = formatTextsForTranslation(extractedTexts);
    const copyBtn = modalOverlay.querySelector('.text-extractor-copy-btn');

    updateModalContent(formattedText, false);
    if(copyBtn) {
        copyBtn.disabled = false;
    }

    showNotification(`快捷扫描完成，发现 ${extractedTexts.length} 条文本`, { type: 'success' });
  }, 50);
}

/**
 * @public
 * @description 关闭主模态框并清理事件监听器。
 */
export function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('is-visible');
    document.removeEventListener('keydown', handleKeyDown);
  }
}

/**
 * @public
 * @description 更新模态框中的文本内容，并可选择是否打开它。
 * @param {string} content - 要显示在文本区域的新内容。
 * @param {boolean} [shouldOpen=false] - 是否在更新后打开模态框。
 */
export function updateModalContent(content, shouldOpen = false) {
    if (!modalOverlay) {
        console.error("模态框尚未初始化。");
        return;
    }

    const copyBtn = modalOverlay.querySelector('.text-extractor-copy-btn');

    if (content === SHOW_PLACEHOLDER) {
        placeholder.style.display = 'flex';
        outputTextarea.style.display = 'none';
        if (copyBtn) copyBtn.disabled = true;
    } else {
        placeholder.style.display = 'none';
        outputTextarea.style.display = 'block';

        const isData = content.trim().startsWith('[');
        outputTextarea.value = content;
        if (copyBtn) copyBtn.disabled = !isData;
        outputTextarea.readOnly = !isData;
    }

    if (shouldOpen) {
        modalOverlay.classList.add('is-visible');
        document.addEventListener('keydown', handleKeyDown);
    }
}
