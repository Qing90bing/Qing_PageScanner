// src/shared/ui/confirmationModal.js
import { createSVGFromString } from '../utils/dom';
import { uiContainer } from './uiContainer.js'; // 直接导入Shadow DOM根

let modalContainer = null;
let resolvePromise = null;

/**
 * 创建并显示一个可复用的确认模态框。
 * @param {string} text - 要在模态框中显示的警告文本。
 * @param {string} iconSVG - 要在模态框中显示的SVG图标字符串。
 * @returns {Promise<boolean>} 当用户点击“确认”时解析为 true，点击“取消”或关闭时解析为 false。
 */
export function showConfirmationModal(text, iconSVG) {
  return new Promise((resolve) => {
    resolvePromise = resolve;

    if (!modalContainer) {
      // 简化后的逻辑：只创建DOM元素，样式由全局CSS处理
      modalContainer = document.createElement('div');
      modalContainer.className = 'confirmation-modal-overlay';

      const modalContent = document.createElement('div');
      modalContent.className = 'confirmation-modal-content';

      const iconContainer = document.createElement('div');
      iconContainer.className = 'confirmation-modal-icon';

      const textContainer = document.createElement('p');
      textContainer.className = 'confirmation-modal-text';

      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'confirmation-modal-buttons';

      const confirmButton = document.createElement('button');
      confirmButton.className = 'confirmation-modal-button confirm';
      confirmButton.textContent = '确认';

      const cancelButton = document.createElement('button');
      cancelButton.className = 'confirmation-modal-button cancel';
      cancelButton.textContent = '取消';

      buttonContainer.append(cancelButton, confirmButton);
      modalContent.append(iconContainer, textContainer, buttonContainer);
      modalContainer.append(modalContent);

      // 直接将模态框注入到UI容器的Shadow DOM中
      uiContainer.append(modalContainer);

      // --- 事件监听器 ---
      confirmButton.addEventListener('click', () => handleConfirmation(true));
      cancelButton.addEventListener('click', () => handleConfirmation(false));
      modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
          handleConfirmation(false);
        }
      });
    }

    // 更新内容
    modalContainer.querySelector('.confirmation-modal-icon').replaceChildren(createSVGFromString(iconSVG));
    modalContainer.querySelector('.confirmation-modal-text').textContent = text;

    // 延迟添加 is-visible 类以触发CSS动画
    setTimeout(() => {
        modalContainer.classList.add('is-visible');
    }, 50);
  });
}

/**
 * 处理用户的确认或取消操作，并清理DOM。
 * @param {boolean} confirmed - 用户是否点击了确认。
 */
function handleConfirmation(confirmed) {
  if (modalContainer) {
    modalContainer.classList.remove('is-visible');
    setTimeout(() => {
        // 清理模态框DOM
        modalContainer.remove();
        modalContainer = null;

        if (resolvePromise) {
            resolvePromise(confirmed);
            resolvePromise = null;
        }
    }, 300); // 动画时长
  }
}
