// src/ui/components/mainModal.js

/**
 * @module mainModal
 * @description 负责创建和管理主界面的模态框（文本提取结果窗口）。
 */

import config from '../../config.js';
import { extractAndProcessText, formatTextsForTranslation } from '../../core/processor.js';
import { showNotification } from '../components.js';
import { createIconTitle } from './iconTitle.js';
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
        <div id="main-modal-title-container"></div>
        <span class="tc-close-button text-extractor-modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </span>
      </div>
      <div class="text-extractor-modal-content">
        <div id="modal-placeholder"></div>
        <textarea id="text-extractor-output" class="tc-textarea"></textarea>
      </div>
      <div class="text-extractor-modal-footer">
        <button class="text-extractor-copy-btn tc-button">一键复制</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // 应用可配置的高度
  const modalContent = modalOverlay.querySelector('.text-extractor-modal-content');
  if (config.modalContentHeight) {
    modalContent.style.height = config.modalContentHeight;
  }

  // 创建并插入标题
  const titleContainer = document.getElementById('main-modal-title-container');
  const titleElement = createIconTitle(summaryIcon, '提取的文本');
  titleContainer.appendChild(titleElement);

  // 获取内部元素的引用
  outputTextarea = document.getElementById('text-extractor-output');
  placeholder = document.getElementById('modal-placeholder');
  const closeBtn = modalOverlay.querySelector('.text-extractor-modal-close');
  const copyBtn = modalOverlay.querySelector('.text-extractor-copy-btn');

  // --- 填充占位符内容 ---
  placeholder.innerHTML = `
    <div class="placeholder-icon">${infoIcon}</div>
    <p>当前没有总结文本</p>
    <p class="placeholder-actions">
      点击 <span class="placeholder-action-icon">${dynamicIcon}</span><strong>[动态扫描]</strong> 按钮开始一个新的扫描会话
    </p>
    <p class="placeholder-actions">
      点击 <span class="placeholder-action-icon">${translateIcon}</span><strong>[静态扫描]</strong> 按钮可进行一次性的快捷提取
    </p>
  `;

  // 更新复制按钮内容
  copyBtn.innerHTML = ''; // 清空原始内容
  const copyBtnContent = createIconTitle(copyIcon, '复制');
  copyBtn.appendChild(copyBtnContent);

  // 绑定关闭和复制事件
  closeBtn.addEventListener('click', closeModal);
  copyBtn.addEventListener('click', () => {
    const textToCopy = outputTextarea.value;
    GM_setClipboard(textToCopy, 'text');
    // 使用新的通知系统
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

  // 先显示“提取中”的提示，并打开模态框
  updateModalContent('文本提取中...', true);

  // 异步提取文本，避免 UI 阻塞
  setTimeout(() => {
    const extractedTexts = extractAndProcessText();
    const formattedText = formatTextsForTranslation(extractedTexts);
    const copyBtn = modalOverlay.querySelector('.text-extractor-copy-btn');

    // 提取完成后，再次调用 updateModalContent 更新最终内容
    updateModalContent(formattedText, false);
    // 关键修复：在更新内容后，无论如何都确保复制按钮是启用的
    copyBtn.disabled = false;

    // 显示成功通知
    showNotification(`快捷扫描完成，发现 ${extractedTexts.length} 条文本`, { type: 'success' });
  }, 50);
}

/**
 * @public
 * @description 关闭主模态框并清理事件监听器。
 */
export function closeModal() {
  if (modalOverlay) {
    // 改为移除 class 来触发 CSS 动画
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
        // 显示占位符，隐藏文本区域
        placeholder.style.display = 'flex';
        outputTextarea.style.display = 'none';
        copyBtn.disabled = true; // 在占位符视图中禁用复制
    } else {
        // 显示文本区域，隐藏占位符
        placeholder.style.display = 'none';
        outputTextarea.style.display = 'block';

        // 检查内容是否为我们的格式化数据
        const isData = content.trim().startsWith('[');

        outputTextarea.value = content;
        copyBtn.disabled = !isData; // 如果不是数据，则禁用复制按钮
        outputTextarea.readOnly = !isData; // 如果是提示信息，则设为只读
    }

    if (shouldOpen) {
        // 改为添加 class 来触发 CSS 动画
        modalOverlay.classList.add('is-visible');
        document.addEventListener('keydown', handleKeyDown);
    }
}
