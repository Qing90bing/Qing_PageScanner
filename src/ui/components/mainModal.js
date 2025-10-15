// src/ui/components/mainModal.js

/**
 * @module mainModal
 * @description 负责创建和管理主界面的模态框（文本提取结果窗口）。
 */

import { extractAndProcessText, formatTextsForTranslation } from '../../core/processor.js';

// --- 模块级变量 ---

let modalOverlay = null; // 模态框遮罩层
let outputTextarea = null; // 文本输出区域

// --- 私有函数 ---

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

/**
 * @private
 * @description 显示一个“已复制”的提示消息。
 */
function showToast() {
  const toast = document.createElement('div');
  toast.className = 'text-extractor-toast';
  toast.textContent = '已复制!';
  document.body.appendChild(toast);

  // 动画效果
  setTimeout(() => { toast.style.opacity = '1'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.remove(); }, 500);
  }, 2000);
}

// --- 公开函数 ---

/**
 * @public
 * @description 创建并初始化主模态框。只在第一次调用时创建 DOM。
 */
export function createMainModal() {
  if (modalOverlay) return; // 防止重复创建

  modalOverlay = document.createElement('div');
  modalOverlay.className = 'text-extractor-modal-overlay';
  modalOverlay.innerHTML = `
    <div class="text-extractor-modal">
      <div class="text-extractor-modal-header">
        <span>提取的文本</span>
        <span class="text-extractor-modal-close">&times;</span>
      </div>
      <div class="text-extractor-modal-content">
        <textarea id="text-extractor-output"></textarea>
      </div>
      <div class="text-extractor-modal-footer">
        <button class="text-extractor-copy-btn">一键复制</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // 获取内部元素的引用
  outputTextarea = document.getElementById('text-extractor-output');
  const closeBtn = modalOverlay.querySelector('.text-extractor-modal-close');
  const copyBtn = modalOverlay.querySelector('.text-extractor-copy-btn');

  // 绑定关闭和复制事件
  closeBtn.addEventListener('click', closeModal);
  copyBtn.addEventListener('click', () => {
    const textToCopy = outputTextarea.value;
    GM_setClipboard(textToCopy, 'text');
    showToast();
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

  outputTextarea.value = '文本提取中...';
  modalOverlay.style.display = 'flex';
  document.addEventListener('keydown', handleKeyDown);

  // 异步提取文本，避免 UI 阻塞
  setTimeout(() => {
    const extractedTexts = extractAndProcessText();
    const formattedText = formatTextsForTranslation(extractedTexts);
    outputTextarea.value = formattedText;
  }, 50);
}

/**
 * @public
 * @description 关闭主模态框并清理事件监听器。
 */
export function closeModal() {
  if (modalOverlay) {
    modalOverlay.style.display = 'none';
    document.removeEventListener('keydown', handleKeyDown);
  }
}
