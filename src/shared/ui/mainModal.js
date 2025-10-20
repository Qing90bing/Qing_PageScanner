// src/ui/components/mainModal.js

/**
 * @module mainModal
 * @description 负责创建和管理主界面的模态框（文本提取结果窗口）。
 */

import { setClipboard } from '../services/tampermonkey.js';
import config from '../config.js';
import { extractAndProcessText, formatTextsForTranslation } from '../utils/textProcessor.js';
import { showNotification } from './notification.js';
import { createIconTitle } from './iconTitle.js';
import { createSVGFromString } from '../utils/dom.js';
import { summaryIcon } from '../../assets/icons/summaryIcon.js';
import { copyIcon } from '../../assets/icons/copyIcon.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { translateIcon } from '../../assets/icons/icon.js';
import { loadingSpinner } from '../../assets/icons/loadingSpinner.js';
import { closeIcon } from '../../assets/icons/closeIcon.js';
import { uiContainer } from './uiContainer.js';
import { loadSettings } from '../../features/settings/logic.js';

// --- 模块级变量 ---

let modalOverlay = null; // 模态框遮罩层
let outputTextarea = null; // 文本输出区域
let lineNumbersDiv = null; // 行号显示区域
let statsContainer = null; // 统计信息容器
let placeholder = null; // 提示信息容器
let loadingContainer = null; // 加载动画容器
let canvasContext = null; // 用于文本宽度计算的Canvas上下文
export const SHOW_PLACEHOLDER = '::show_placeholder::'; // 特殊标识符
export const SHOW_LOADING = '::show_loading::'; // 加载状态标识符


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
  modalOverlay.tabIndex = -1; // 允许元素通过编程方式聚焦，以便监听键盘事件

  const modal = document.createElement('div');
  modal.className = 'text-extractor-modal';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'text-extractor-modal-header';

  const titleContainer = document.createElement('div');
  titleContainer.id = 'main-modal-title-container';

  const closeBtn = document.createElement('span');
  closeBtn.className = 'tc-close-button text-extractor-modal-close';
  closeBtn.appendChild(createSVGFromString(closeIcon));

  modalHeader.appendChild(titleContainer);
  modalHeader.appendChild(closeBtn);

  const modalContent = document.createElement('div');
  modalContent.className = 'text-extractor-modal-content';

  placeholder = document.createElement('div');
  placeholder.id = 'modal-placeholder';

  const textareaContainer = document.createElement('div');
  textareaContainer.className = 'tc-textarea-container';

  lineNumbersDiv = document.createElement('div');
  lineNumbersDiv.className = 'tc-line-numbers';

  outputTextarea = document.createElement('textarea');
  outputTextarea.id = 'text-extractor-output';
  outputTextarea.className = 'tc-textarea';

  textareaContainer.appendChild(lineNumbersDiv);
  textareaContainer.appendChild(outputTextarea);

  modalContent.appendChild(placeholder);
  modalContent.appendChild(textareaContainer);

  // 创建加载动画覆盖层
  loadingContainer = document.createElement('div');
  loadingContainer.className = 'gm-loading-overlay';
  const spinner = document.createElement('div');
  spinner.className = 'gm-loading-spinner';
  const spinnerSVG = createSVGFromString(loadingSpinner);
  if (spinnerSVG) spinner.appendChild(spinnerSVG);
  loadingContainer.appendChild(spinner);
  modalContent.appendChild(loadingContainer);


  const modalFooter = document.createElement('div');
  modalFooter.className = 'text-extractor-modal-footer';

  statsContainer = document.createElement('div');
  statsContainer.className = 'tc-stats-container';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'text-extractor-copy-btn tc-button';

  modalFooter.appendChild(statsContainer);
  modalFooter.appendChild(copyBtn);

  modal.appendChild(modalHeader);
  modal.appendChild(modalContent);
  modal.appendChild(modalFooter);
  modalOverlay.appendChild(modal);

  uiContainer.appendChild(modalOverlay);

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

  outputTextarea.addEventListener('input', () => {
    updateLineNumbers();
    updateStatistics();
  });

  outputTextarea.addEventListener('scroll', () => {
    lineNumbersDiv.scrollTop = outputTextarea.scrollTop;
  });

  // 根据设置更新UI元素的可见性
  updateModalAddonsVisibility();

  // 初始化用于文本测量的Canvas
  const canvas = document.createElement('canvas');
  canvasContext = canvas.getContext('2d');
  const textareaStyles = window.getComputedStyle(outputTextarea);
  canvasContext.font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;

  // 监听textarea尺寸变化以更新行号
  const resizeObserver = new ResizeObserver(() => {
    // 同步行号容器的高度
    lineNumbersDiv.style.height = outputTextarea.clientHeight + 'px';
    updateLineNumbers();
  });
  resizeObserver.observe(outputTextarea);
}

/**
 * @private
 * @description 计算单个字符串在给定宽度下会占据多少行（视觉换行）。
 * @param {string} sentence - 要计算的字符串。
 * @param {number} width - 容器的内容宽度。
 * @returns {number} 占据的行数。
 */
function calcStringLines(sentence, width) {
    if (!width || !canvasContext) return 1;

    const words = sentence.split('');
    let lineCount = 0;
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const wordWidth = canvasContext.measureText(words[i]).width;
        const lineWidth = canvasContext.measureText(currentLine).width;

        if (lineWidth + wordWidth > width) {
            lineCount++;
            currentLine = words[i];
        } else {
            currentLine += words[i];
        }
    }
    if (currentLine.trim() !== '' || sentence === '') {
        lineCount++;
    }
    return lineCount;
}

/**
 * @private
 * @description 计算文本区域内所有内容的视觉总行数，并生成行号数组。
 * @returns {Array<string|number>} 行号数组，空行用 '' 表示。
 */
function calcLines() {
    const lines = outputTextarea.value.split('\n');
    const textareaStyles = window.getComputedStyle(outputTextarea);

    const paddingLeft = parseFloat(textareaStyles.paddingLeft);
    const paddingRight = parseFloat(textareaStyles.paddingRight);
    const textareaContentWidth = outputTextarea.clientWidth - paddingLeft - paddingRight;

    const numLines = lines.map(lineString => calcStringLines(lineString, textareaContentWidth));

    let lineNumbers = [];
    let i = 1;
    while (numLines.length > 0) {
        const numLinesOfSentence = numLines.shift();
        lineNumbers.push(i);
        if (numLinesOfSentence > 1) {
            Array(numLinesOfSentence - 1).fill('').forEach(() => lineNumbers.push(''));
        }
        i++;
    }
    return lineNumbers;
}

/**
 * @private
 * @description 更新统计信息。
 */
function updateStatistics() {
    const text = outputTextarea.value;
    const lineCount = text.split('\n').length;
    const charCount = text.length;
    statsContainer.textContent = `行: ${lineCount} | 字符数: ${charCount}`;
}

/**
 * @private
 * @description 更新行号。
 */
function updateLineNumbers() {
    const lines = calcLines();
    const lineElements = lines.map(line => {
        const div = document.createElement('div');
        div.textContent = line === '' ? '\u00A0' : line; // 使用 Unicode 替代 &nbsp;
        return div;
    });
    lineNumbersDiv.replaceChildren(...lineElements);
}

/**
 * @public
 * @description 显示主模态框并开始提取文本。
 */
/**
 * @private
 * @description 显示加载动画并禁用文本区域。
 */
function showLoading() {
  if (loadingContainer) loadingContainer.classList.add('is-visible');
  if (outputTextarea) outputTextarea.disabled = true;
}

/**
 * @private
 * @description 隐藏加载动画并启用文本区域。
 */
function hideLoading() {
  if (loadingContainer) loadingContainer.classList.remove('is-visible');
  if (outputTextarea) outputTextarea.disabled = false;
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

  updateModalContent(SHOW_LOADING, true);

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
    modalOverlay.removeEventListener('keydown', handleKeyDown);
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

    if (content === SHOW_LOADING) {
        placeholder.style.display = 'none';
        outputTextarea.parentElement.style.display = 'flex';
        outputTextarea.value = '';
        showLoading();
        if (copyBtn) copyBtn.disabled = true;
    } else if (content === SHOW_PLACEHOLDER) {
        hideLoading();
        placeholder.style.display = 'flex';
        outputTextarea.parentElement.style.display = 'none';
        if (copyBtn) copyBtn.disabled = true;
    } else {
        hideLoading();
        placeholder.style.display = 'none';
        outputTextarea.parentElement.style.display = 'flex';

        const isData = content.trim().startsWith('[');
        outputTextarea.value = content;
        if (copyBtn) copyBtn.disabled = !isData;
        outputTextarea.readOnly = !isData;

        updateStatistics();
        updateLineNumbers();
    }

    // 更新附加组件的可见性
    updateModalAddonsVisibility();

    if (shouldOpen) {
        modalOverlay.classList.add('is-visible');
        modalOverlay.addEventListener('keydown', handleKeyDown);
        // 聚焦模态框以便接收键盘事件
        modalOverlay.focus();
    }
}

/**
 * @public
 * @description 根据当前设置更新附加组件（行号、统计）的可见性。
 */
export function updateModalAddonsVisibility() {
    if (!modalOverlay) return;

    const settings = loadSettings();

    if (lineNumbersDiv) {
        lineNumbersDiv.classList.toggle('is-visible', settings.showLineNumbers);
    }

    if (statsContainer) {
        const hasContent = outputTextarea && outputTextarea.parentElement.style.display !== 'none';
        statsContainer.classList.toggle('is-visible', settings.showStatistics && hasContent);
    }
}
