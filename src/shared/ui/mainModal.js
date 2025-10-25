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
import { updateExportButtonState } from '../../features/export/ui.js';
import { performQuickScan } from '../../features/quick-scan/logic.js';
import { VirtualScroller } from './virtualScroller.js';

// 用于存储快速扫描的完整、未经截断的内容
export let fullQuickScanContent = '';

let scroller = null; // 用于存储 VirtualScroller 实例

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

    // 4. 初始化虚拟滚动
    scroller = new VirtualScroller(state.outputTextarea, []);

    // 绑定虚拟滚动容器的滚动事件，以同步行号
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
        console.error(t('notifications.modalInitError'));
        return;
    }
    log('正在打开主模态框并启动快速扫描 Worker...');

    // 1. 立即显示加载状态并打开模态框
    updateModalContent(state.SHOW_LOADING, true, 'quick-scan');

    // 2. 调用新的异步扫描逻辑
    performQuickScan(({ formattedText, count }) => {
        // Worker 完成任务后，此回调将被执行

        // 3. 存储完整的、未经截断的结果以供导出
        fullQuickScanContent = formattedText;

        // 4. 更新UI（现在可能会显示截断的文本）
        updateModalContent(formattedText, false, 'quick-scan');

        // 5. 显示完成通知
        const notificationText = simpleTemplate(t('scan.quickFinished'), { count });
        showNotification(notificationText, { type: 'success' });
    });
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
        updateExportButtonState(!disabled);
    };

    if (content === state.SHOW_LOADING) {
        if (scroller) scroller.setData([]); // 清空虚拟滚动
        state.placeholder.classList.remove('is-visible');
        textareaContainer.classList.add('is-visible');
        showLoading();
        setButtonsDisabled(true);
    } else if (content === state.SHOW_PLACEHOLDER) {
        if (scroller) scroller.setData([]); // 清空虚拟滚动
        hideLoading();
        textareaContainer.classList.remove('is-visible');
        state.placeholder.classList.add('is-visible');
        setButtonsDisabled(true);
    } else {
        hideLoading();
        state.placeholder.classList.remove('is-visible');
        textareaContainer.classList.add('is-visible');

        let lines = [];
        try {
            // 假设内容是 `[["line1", ""], ["line2", ""]]` 格式的 JSON 字符串
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                lines = parsed.map(item => (Array.isArray(item) ? item[0] : String(item)));
            }
        } catch (e) {
            // 如果解析失败，则按行分割普通文本
            lines = content.split('\n');
        }

        scroller.setData(lines);

        const isData = lines.length > 0;
        setButtonsDisabled(!isData);

        // 更新统计和行号
        updateStatistics(lines.length, content.length);
        updateLineNumbers(lines.length);
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
