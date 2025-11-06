// src/features/element-scan/ui.js

import { uiContainer } from '../../shared/ui/uiContainer.js';
import { updateSelectionLevel, reselectElement, stopElementScan, confirmSelectionAndExtract, stageCurrentElement } from './logic.js';
import { t } from '../../shared/i18n/index.js';
import { createTrustedHTML } from '../../shared/utils/trustedTypes.js';
import { log } from '../../shared/utils/logger.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { on } from '../../shared/utils/eventBus.js';
import { createCounterWithHelp, showCounterWithHelp, hideCounterWithHelp, updateCounterValue } from '../../shared/ui/components/counterWithHelp.js';

// --- 模块级变量 ---
let unsubscribeStagedCountChanged = null;

// --- 模块级变量，用于缓存UI元素的引用 ---

/** @type {HTMLElement | null} - 扫描容器，包含高亮边框和标签，负责定位和动画。 */
let scanContainer = null;

/** @type {HTMLElement | null} - 高亮边框元素。 */
let highlightBorder = null;

/** @type {HTMLElement | null} - 显示元素标签名的工具提示。 */
let tagNameTooltip = null;

/** @type {HTMLElement | null} - 层级调整工具栏。 */
let toolbar = null;

/**
 * @private
 * @function getElementSelector
 * @description 生成一个简洁的字符串来描述元素及其直接父元素。
 * @param {HTMLElement} element - 目标元素。
 * @returns {string} - 格式为 `父标签 > 子标签` 或 `子标签` 的字符串。
 */
function getElementSelector(element) {
    if (!element) return '';

    const currentTag = element.tagName.toLowerCase();
    const parent = element.parentElement;

    // 如果没有父元素，或者父元素是 body，则只显示当前元素的标签
    if (!parent || parent.tagName.toLowerCase() === 'body') {
        return currentTag;
    }

    const parentTag = parent.tagName.toLowerCase();
    return `${parentTag} ${currentTag}`;
}

/**
 * @private
 * @function createHighlightElements
 * @description 创建并初始化用于元素扫描的UI组件（扫描容器、高亮边框、标签工具提示）。
 *              这些元素只在首次需要时创建一次，之后会重用。
 */
function createHighlightElements() {
    // 元素只在首次需要时创建一次
    if (!scanContainer) {
        log(t('log.elementScanUI.creatingHighlights'));
        // 创建一个统一的容器，它将负责定位和动画。
        // 内部的边框和标签元素则只负责外观，并且它们的相对位置是固定的。
        scanContainer = document.createElement('div');
        scanContainer.id = 'element-scan-container';
        // 设置绝对定位和初始位置，以便 transform 生效
        scanContainer.style.position = 'absolute';
        scanContainer.style.top = '0';
        scanContainer.style.left = '0';
        scanContainer.style.willChange = 'transform'; // 性能优化提示

        highlightBorder = document.createElement('div');
        highlightBorder.id = 'element-scan-highlight-border';
        scanContainer.appendChild(highlightBorder);

        tagNameTooltip = document.createElement('div');
        tagNameTooltip.id = 'element-scan-tag-name';
        scanContainer.appendChild(tagNameTooltip);
        
        uiContainer.appendChild(scanContainer);
    }
    
    // 每次调用都应该确保元素是可见的，以处理 cleanupUI 后再次显示的情况
    // 使用 requestAnimationFrame 确保在下一帧应用 'is-visible' 类，从而触发 CSS 过渡动画
    requestAnimationFrame(() => {
        scanContainer.classList.add('is-visible');
    });
}

/**
 * @public
 * @function updateHighlight
 * @description 根据目标元素的位置和尺寸，更新高亮边框和标签的位置。
 * @param {HTMLElement} targetElement - 需要高亮显示的目标元素。
 */
export function updateHighlight(targetElement) {
    if (!targetElement) return;

    // 确保高亮UI元素已创建
    createHighlightElements();

    const rect = targetElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const padding = 6; // 为内容添加内边距，使边框看起来更舒适
    const elementSelector = getElementSelector(targetElement);

    const coordinates = {
        top: rect.top.toFixed(2),
        left: rect.left.toFixed(2),
        width: rect.width.toFixed(2),
        height: rect.height.toFixed(2)
    };
    log(simpleTemplate(t('log.elementScanUI.updatingHighlight'), { tagName: elementSelector }), coordinates);

    // 所有的定位和尺寸变化都只应用于容器，内部元素相对静态，以实现同步动画
    const newWidth = rect.width + padding * 2;
    const newHeight = rect.height + padding * 2;
    const newX = rect.left + scrollX - padding;
    const newY = rect.top + scrollY - padding;

    scanContainer.style.width = `${newWidth}px`;
    scanContainer.style.height = `${newHeight}px`;
    scanContainer.style.transform = `translate(${newX}px, ${newY}px)`;
    
    tagNameTooltip.textContent = elementSelector;

    // 如果工具栏已存在，同时更新工具栏上显示的标签名
    const toolbarTag = uiContainer.querySelector('#element-scan-toolbar-tag');
    if (toolbarTag) {
        toolbarTag.textContent = getElementSelector(targetElement);
    }
}

/**
 * @public
 * @function createAdjustmentToolbar
 * @description 创建并显示层级调整工具栏。
 * @param {HTMLElement[]} elementPath - 从选中元素到 body 的 DOM 路径数组。
 */
export function createAdjustmentToolbar(elementPath) {
    if (toolbar) cleanupToolbar(); // 如果已存在旧的工具栏，先清理掉

    log(t('log.elementScanUI.creatingToolbar'));
    toolbar = document.createElement('div');
    toolbar.id = 'element-scan-toolbar';
    toolbar.innerHTML = createTrustedHTML(`
        <div id="element-scan-toolbar-tag" title="${t('tooltip.dragHint')}">${getElementSelector(elementPath[0])}</div>
        <input type="range" id="element-scan-level-slider" min="0" max="${elementPath.length - 1}" value="0" />
        <div id="element-scan-toolbar-actions">
            <button id="element-scan-toolbar-reselect">${t('common.reselect')}</button>
            <button id="element-scan-toolbar-stage">${t('common.stage')}</button>
            <button id="element-scan-toolbar-cancel">${t('common.cancel')}</button>
            <button id="element-scan-toolbar-confirm">${t('common.confirm')}</button>
        </div>
    `);
    uiContainer.appendChild(toolbar);

    // --- 智能定位逻辑 ---
    // 自动计算工具栏的最佳初始位置，避免遮挡目标元素或超出屏幕边界。
    const initialRect = elementPath[0].getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 10; // 工具栏与元素/屏幕边缘的最小间距

    let top, left;

    // 水平方向的默认对齐方式：与目标元素右对齐，并确保不超出视口边界
    const alignRight = () => {
        let l = initialRect.right - toolbarRect.width;
        if (l < margin) l = margin;
        if (l + toolbarRect.width > viewportWidth - margin) {
            l = viewportWidth - toolbarRect.width - margin;
        }
        return l;
    };
    
    // 优先尝试将工具栏放在目标元素的上方或下方
    const topAbove = initialRect.top - toolbarRect.height - margin;
    const topBelow = initialRect.bottom + margin;

    const canPlaceAbove = topAbove > margin;
    const canPlaceBelow = topBelow + toolbarRect.height < viewportHeight - margin;

    if (canPlaceAbove) {
        top = topAbove;
        left = alignRight();
    } else if (canPlaceBelow) {
        top = topBelow;
        left = alignRight();
    } else {
        // 如果上下空间都不足，则将工具栏在视口中完全居中
        top = (viewportHeight - toolbarRect.height) / 2;
        left = (viewportWidth - toolbarRect.width) / 2;
    }
    
    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;
    log(t('log.elementScanUI.toolbarPositioned'));

    addToolbarEventListeners();
    makeDraggable(toolbar);

    requestAnimationFrame(() => {
        toolbar.classList.add('is-visible');
    });
}

/**
 * @private
 * @function addToolbarEventListeners
 * @description为工具栏内的交互元素（滑块、按钮）添加事件监听器。
 */
function addToolbarEventListeners() {
    const slider = uiContainer.querySelector('#element-scan-level-slider');
    const reselectBtn = uiContainer.querySelector('#element-scan-toolbar-reselect');
    const stageBtn = uiContainer.querySelector('#element-scan-toolbar-stage');
    const cancelBtn = uiContainer.querySelector('#element-scan-toolbar-cancel');
    const confirmBtn = uiContainer.querySelector('#element-scan-toolbar-confirm');

    slider.addEventListener('input', () => {
        log(simpleTemplate(t('log.elementScanUI.sliderChanged'), { level: slider.value }));
        updateSelectionLevel(slider.value);
    });

    reselectBtn.addEventListener('click', () => {
        log(t('log.elementScanUI.reselectClicked'));
        reselectElement();
    });

    stageBtn.addEventListener('click', () => {
        log(t('log.elementScanUI.stageClicked'));
        stageCurrentElement();
    });

    cancelBtn.addEventListener('click', () => {
        log(t('log.elementScanUI.cancelClicked'));
        const fabElement = uiContainer.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
    });

    confirmBtn.addEventListener('click', () => {
        log(t('log.elementScanUI.confirmClicked'));
        confirmSelectionAndExtract();
    });
}

/**
 * @private
 * @function makeDraggable
 * @description 使指定的HTML元素可以被拖动。
 * @param {HTMLElement} element - 需要变为可拖动的元素。
 */
function makeDraggable(element) {
    let offsetX, offsetY;

    const onMouseDown = (e) => {
        // 只在点击工具栏本身或标签时触发拖动，避免在点击按钮或滑块时也触发
        if (e.target.id !== 'element-scan-toolbar' && e.target.id !== 'element-scan-toolbar-tag') return;
        e.preventDefault();
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        log(t('log.elementScanUI.dragStarted'));
    };

    const onMouseMove = (e) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rect = element.getBoundingClientRect();

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // 限制拖动范围，确保工具栏不会被拖出视口
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + rect.width > viewportWidth) newLeft = viewportWidth - rect.width;
        if (newTop + rect.height > viewportHeight) newTop = viewportHeight - rect.height;

        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        log(t('log.elementScanUI.dragEnded'));
    };

    element.addEventListener('mousedown', onMouseDown);
}

/**
 * @public
 * @function cleanupUI
 * @description 清理元素扫描的高亮UI（边框和标签），通过移除 'is-visible' 类触发淡出动画。
 */
export function cleanupUI() {
    if (scanContainer) {
        log(t('log.elementScanUI.cleaningHighlights'));
        scanContainer.classList.remove('is-visible');
    }
}

/**
 * @public
 * @function cleanupToolbar
 * @description 清理层级调整工具栏。首先触发淡出动画，动画结束后再从DOM中移除。
 */
export function cleanupToolbar() {
    if (toolbar) {
        log(t('log.elementScanUI.cleaningToolbar'));
        const toolbarToRemove = toolbar;
        toolbar = null; // 立即清除引用，防止重复操作
        toolbarToRemove.classList.remove('is-visible');
        // 等待CSS过渡动画（300ms）结束后再彻底移除DOM节点
        setTimeout(() => {
            toolbarToRemove.remove();
        }, 300);
    }
}

/**
 * @public
 * @function showTopCenterUI
 * @description 显示顶部中央的“计数器与帮助”组合UI。
 */
export function showTopCenterUI() {
    createCounterWithHelp('scan.stagedCount', 'tutorial.elementScan');
    showCounterWithHelp();

    // 订阅计数变化事件
    if (!unsubscribeStagedCountChanged) {
        unsubscribeStagedCountChanged = on('stagedCountChanged', (newCount) => {
            updateCounterValue(newCount);
        });
    }
}

/**
 * @public
 * @function hideTopCenterUI
 * @description 隐藏并销毁顶部中央的UI，并取消事件订阅。
 */
export function hideTopCenterUI() {
    hideCounterWithHelp();

    // 取消事件订阅
    if (typeof unsubscribeStagedCountChanged === 'function') {
        unsubscribeStagedCountChanged();
        unsubscribeStagedCountChanged = null;
    }
}
