// src/features/element-scan/logic.js

import { updateHighlight, cleanupUI, createAdjustmentToolbar, cleanupToolbar } from './ui.js';
import { extractAndProcessTextFromElement } from '../../shared/utils/textProcessor.js';
import { updateModalContent } from '../../shared/ui/mainModal.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
import { log } from '../../shared/utils/logger.js';

// --- 模块级状态变量 ---

/** @type {boolean} - 标记“选取元素扫描”功能是否处于活动状态。 */
let isActive = false;

/** @type {boolean} - 标记当前是否处于“调整层级”模式。在调整模式下，鼠标悬停扫描会暂停。 */
let isAdjusting = false;

/** @type {HTMLElement | null} - 当前鼠标悬停或选中的目标元素。 */
let currentTarget = null;

/** @type {HTMLElement[]} - 从当前选中元素到 body 的 DOM 元素路径数组，用于层级调整。 */
let elementPath = [];

/** @type {boolean} - 标记关闭结果窗口后是否应恢复元素扫描。 */
let shouldResumeAfterModalClose = false;

export function getShouldResumeAfterModalClose() {
    return shouldResumeAfterModalClose;
}

export function setShouldResumeAfterModalClose(value) {
    shouldResumeAfterModalClose = value;
}

/**
 * @public
 * @function handleElementScanClick
 * @description “选取元素扫描”浮动按钮的点击事件处理函数。
 *              用于启动或停止元素扫描功能。
 * @param {HTMLElement} fabElement - “选取元素扫描”的浮动操作按钮元素。
 */
export function handleElementScanClick(fabElement) {
    if (isActive) {
        stopElementScan(fabElement);
    } else {
        startElementScan(fabElement);
    }
}

/**
 * @private
 * @function startElementScan
 * @description 启动元素扫描功能，初始化状态并添加必要的事件监听器。
 * @param {HTMLElement} fabElement - “选取元素扫描”的浮动操作按钮元素。
 */
function startElementScan(fabElement) {
    log(t('log.elementScan.starting'));
    isActive = true;
    isAdjusting = false;
    fabElement.classList.add('is-recording');

    // 添加全局事件监听器
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true); // 使用捕获阶段确保优先执行
    document.addEventListener('keydown', handleElementScanKeyDown);
    log(t('log.elementScan.listenersAdded'));
}

/**
 * @public
 * @function stopElementScan
 * @description 停止元素扫描功能，清理状态、UI和事件监听器。
 * @param {HTMLElement} [fabElement] - （可选）“选取元素扫描”的浮动操作按钮元素。
 */
export function stopElementScan(fabElement) {
    if (!isActive) return;
    log(t('log.elementScan.stopping'));
    isActive = false;
    isAdjusting = false;

    if (fabElement) {
        fabElement.classList.remove('is-recording');
    }

    // 移除全局事件监听器
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleElementClick, true);
    document.removeEventListener('keydown', handleElementScanKeyDown);
    log(t('log.elementScan.listenersRemoved'));

    // 清理UI元素
    cleanupUI();
    cleanupToolbar();

    // 重置状态变量
    elementPath = [];
    currentTarget = null;
    log(t('log.elementScan.stateReset'));
}

/**
 * @public
 * @function reselectElement
 * @description 从“调整层级”模式返回到“重新选择元素”模式。
 */
export function reselectElement() {
    log(t('log.elementScan.reselecting'));
    isAdjusting = false;
    cleanupUI();
    cleanupToolbar();

    // 重新激活选择元素的事件监听
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true);
}

/**
 * @private
 * @function handleMouseOver
 * @description 处理鼠标悬停事件，用于高亮显示用户可能想要选择的元素。
 * @param {MouseEvent} event - 鼠标事件对象。
 */
function handleMouseOver(event) {
    // 如果功能未激活或正处于调整模式，则不执行任何操作
    if (!isActive || isAdjusting) return;

    // 忽略插件自身的UI元素
    if (event.target.closest('.text-extractor-fab-container') || event.target.closest('#text-extractor-container')) {
        cleanupUI();
        currentTarget = null;
        return;
    }

    currentTarget = event.target;
    log(simpleTemplate(t('log.elementScan.hovering'), { tagName: currentTarget.tagName }));
    updateHighlight(currentTarget);
}

/**
 * @private
 * @function handleMouseOut
 * @description 当鼠标移出当前高亮的元素时，清理高亮效果。
 * @param {MouseEvent} event - 鼠标事件对象。
 */
function handleMouseOut(event) {
    // 确保移出的元素就是当前高亮的元素，避免不必要的清理
    if (event.target === currentTarget) {
        cleanupUI();
    }
}

/**
 * @private
 * @function handleElementScanKeyDown
 * @description 处理全局键盘按下事件，主要用于监听 "Escape" 键以退出扫描模式。
 * @param {KeyboardEvent} event - 键盘事件对象。
 */
function handleElementScanKeyDown(event) {
    if (isActive && event.key === 'Escape') {
        log(t('log.elementScan.escapePressed'));
        const fabElement = document.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
    }
}

/**
 * @private
 * @function handleElementClick
 * @description 处理点击事件。当用户点击一个元素时，锁定该元素并进入“调整层级”模式。
 * @param {MouseEvent} event - 鼠标事件对象。
 */
function handleElementClick(event) {
    // 确保只有在活动且未调整状态下，并且有有效目标时才响应
    if (!isActive || isAdjusting || !currentTarget) return;

    // 阻止事件的默认行为和进一步传播，防止意外触发页面上的链接或按钮
    event.preventDefault();
    event.stopPropagation();
    
    const tagName = currentTarget.tagName.toLowerCase();
    log(simpleTemplate(t('log.elementScan.clickedEnteringAdjust'), { tagName }));
    isAdjusting = true;

    // 暂停鼠标悬停扫描
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);

    // 构建从当前元素到 body 的层级路径
    elementPath = [];
    let el = currentTarget;
    while (el && el.tagName !== 'BODY') {
        elementPath.push(el);
        el = el.parentElement;
    }
    elementPath.push(document.body); // 确保 body 作为最顶层
    log(simpleTemplate(t('log.elementScan.pathBuilt'), { depth: elementPath.length }));

    // 基于构建的路径创建层级调整工具栏
    createAdjustmentToolbar(elementPath);
}

/**
 * @public
 * @function updateSelectionLevel
 * @description 由UI模块调用，用于响应层级调整滑块的变化，更新高亮显示的元素。
 * @param {number} level - 路径数组的索引，代表选择的层级。
 */
export function updateSelectionLevel(level) {
    const targetElement = elementPath[level];
    if (targetElement) {
        currentTarget = targetElement;
        const tagName = targetElement.tagName.toLowerCase();
        log(simpleTemplate(t('log.elementScan.adjustingLevel'), { level, tagName }));
        updateHighlight(targetElement);
    }
}

/**
 * @public
 * @function confirmSelectionAndExtract
 * @description 确认最终选择的元素，并从中提取、处理和显示文本。
 */
export function confirmSelectionAndExtract() {
    if (!currentTarget) {
        log(t('log.elementScan.confirmFailedNoTarget'));
        return;
    }
    const tagName = currentTarget.tagName.toLowerCase();
    log(simpleTemplate(t('log.elementScan.confirmExtracting'), { tagName }));

    const extractedTexts = extractAndProcessTextFromElement(currentTarget);
    const formattedText = formatTextsForTranslation(extractedTexts);
    log(simpleTemplate(t('log.elementScan.extractedCount'), { count: extractedTexts.length }));

    // 标记在模态框关闭后应恢复扫描
    shouldResumeAfterModalClose = true;

    // 暂停扫描UI，但保持 isActive = true 的状态
    isAdjusting = true; // 进入“调整”模式以暂停悬停
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    cleanupUI();
    cleanupToolbar();

    // 在主模态框中显示提取到的文本
    updateModalContent(formattedText, true, 'quick-scan');

    // 显示一个成功的通知
    const notificationText = simpleTemplate(t('scan.quickFinished'), { count: extractedTexts.length });
    showNotification(notificationText, { type: 'success' });
}
