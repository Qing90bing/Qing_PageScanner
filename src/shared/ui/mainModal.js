// src/shared/ui/mainModal.js

/**
 * @module mainModal
 * @description 负责创建和管理主界面的模态框（文本提取结果窗口）。
 *              该模块作为总协调器，整合来自 ./mainModal/ 子模块的功能。
 */

import { extractAndProcessText } from '../utils/textProcessor.js';
import { formatTextsForTranslation } from '../utils/formatting.js';
import { showNotification } from './components/notification.js';
import { loadSettings } from '../../features/settings/logic.js';
import { log } from '../utils/logger.js';
import { t } from '../i18n/index.js';
import { simpleTemplate } from '../utils/templating.js';
import * as state from './mainModal/modalState.js';
import { isSessionRecording } from '../../features/session-scan/logic.js';

// 重新导出常量以保持API兼容性
export { SHOW_PLACEHOLDER, SHOW_LOADING } from './mainModal/modalState.js';
import { createModalLayout } from './mainModal/modalLayout.js';
import { populateModalHeader } from './mainModal/modalHeader.js';
import { populateModalContent, showLoading, hideLoading } from './mainModal/modalContent.js';
import { populateModalFooter, updateStatistics } from './mainModal/modalFooter.js';
import { initializeLineNumbers, updateLineNumbers, updateActiveLine } from './mainModal/lineNumberLogic.js';

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
 * @public
 * @description 创建并初始化主模态框。只在第一次调用时创建 DOM。
 * @param {object} callbacks - 包含回调函数的对象。
 * @param {Function} callbacks.clearSessionCallback - 用于清空会话扫描数据的回调。
 */
export function createMainModal({ clearSessionCallback }) {
    if (state.modalOverlay) return; // 防止重复创建

    // 1. 创建基础布局
    const { modalHeader, modalContent, modalFooter } = createModalLayout();

    // 2. 填充各个部分，并传入回调函数
    populateModalHeader(modalHeader, closeModal);
    populateModalContent(modalContent);
    populateModalFooter(modalFooter, updateModalContent, clearSessionCallback);

    // 3. 初始化行号功能
    initializeLineNumbers();

    // 4. 绑定文本区域事件
    const handleTextareaUpdate = () => {
        updateLineNumbers();
        updateStatistics();
    };

    state.outputTextarea.addEventListener('input', handleTextareaUpdate);
    state.outputTextarea.addEventListener('click', updateActiveLine);
    state.outputTextarea.addEventListener('keyup', updateActiveLine);
    state.outputTextarea.addEventListener('scroll', () => {
        state.lineNumbersDiv.scrollTop = state.outputTextarea.scrollTop;
    });

    // 5. 根据设置更新UI元素的可见性
    updateModalAddonsVisibility();
}

/**
 * @public
 * @description 显示主模态框并开始提取文本。
 */
export function openModal() {
    if (!state.modalOverlay) {
        console.error(t('modalInitError'));
        return;
    }
    log('正在打开主模态框...');

    updateModalContent(state.SHOW_LOADING, true, 'quick-scan');

    setTimeout(() => {
        const extractedTexts = extractAndProcessText();
        const formattedText = formatTextsForTranslation(extractedTexts);

        updateModalContent(formattedText, false, 'quick-scan');

        const copyBtn = state.modalOverlay.querySelector('.text-extractor-copy-btn');
        if (copyBtn) {
            copyBtn.disabled = !formattedText;
        }

        const notificationText = simpleTemplate(t('quickScanFinished'), { count: extractedTexts.length });
        showNotification(notificationText, { type: 'success' });
    }, 50);
}

/**
 * @public
 * @description 关闭主模态框并清理事件监听器。
 */
export function closeModal() {
    if (state.modalOverlay && state.modalOverlay.classList.contains('is-visible')) {
        log('正在关闭主模态框...');
        state.modalOverlay.classList.remove('is-visible');
        state.modalOverlay.removeEventListener('keydown', handleKeyDown);
    }
}

/**
 * @public
 * @description 更新模态框中的文本内容，并可选择是否打开它。
 * @param {string} content - 要显示在文本区域的新内容。
 * @param {boolean} [shouldOpen=false] - 是否在更新后打开模态框。
 * @param {string} [mode='quick-scan'] - 模态框的模式 ('quick-scan' 或 'session-scan')。
 */
export function updateModalContent(content, shouldOpen = false, mode = 'quick-scan') {
    if (!state.modalOverlay) {
        console.error("模态框尚未初始化。");
        return;
    }

    state.setCurrentMode(mode);

    const copyBtn = state.modalOverlay.querySelector('.text-extractor-copy-btn');
    const clearBtn = state.modalOverlay.querySelector('.text-extractor-clear-btn');
    const textareaContainer = state.outputTextarea.parentElement;

    const setButtonsDisabled = (disabled) => {
        if (copyBtn) copyBtn.disabled = disabled;
        if (clearBtn) {
            // 如果会话正在录制，则强制禁用清空按钮
            clearBtn.disabled = isSessionRecording() || disabled;
        }
    };

    if (content === state.SHOW_LOADING) {
        state.placeholder.classList.remove('is-visible');
        textareaContainer.classList.add('is-visible');
        state.outputTextarea.value = '';
        showLoading();
        setButtonsDisabled(true);
    } else if (content === state.SHOW_PLACEHOLDER) {
        hideLoading();
        textareaContainer.classList.remove('is-visible');
        state.placeholder.classList.add('is-visible');
        setButtonsDisabled(true);
    } else {
        hideLoading();
        state.placeholder.classList.remove('is-visible');
        textareaContainer.classList.add('is-visible');

        const isData = content && content.trim().length > 0;
        state.outputTextarea.value = content;
        setButtonsDisabled(!isData);
        state.outputTextarea.readOnly = !isData;

        // 手动触发一次更新，以确保统计和行号正确显示
        state.outputTextarea.dispatchEvent(new Event('input'));

        setTimeout(updateActiveLine, 0);
    }

    updateModalAddonsVisibility();

    if (shouldOpen) {
        state.modalOverlay.classList.add('is-visible');
        state.modalOverlay.addEventListener('keydown', handleKeyDown);
        state.modalOverlay.focus();
    }
}

/**
 * @public
 * @description 根据当前设置更新附加组件（行号、统计）的可见性。
 */
export function updateModalAddonsVisibility() {
    if (!state.modalOverlay) return;

    const settings = loadSettings();

    if (state.lineNumbersDiv) {
        state.lineNumbersDiv.classList.toggle('is-visible', settings.showLineNumbers);
    }

    if (state.statsContainer) {
        const hasContent = state.outputTextarea && state.outputTextarea.parentElement.classList.contains('is-visible');
        state.statsContainer.classList.toggle('is-visible', settings.showStatistics && hasContent);
    }
}
