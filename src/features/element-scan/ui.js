// src/features/element-scan/ui.js

import { uiContainer } from '../../shared/ui/uiContainer.js';
import { updateSelectionLevel, reselectElement, stopElementScan, confirmSelectionAndExtract, stageCurrentElement, pauseElementScan, resumeElementScan } from './logic.js';
import { t } from '../../shared/i18n/index.js';
import { createTrustedHTML } from '../../shared/utils/trustedTypes.js';
import { log } from '../../shared/utils/logger.js';
import { createButton } from '../../shared/ui/components/button.js';
import { reselectIcon } from '../../assets/icons/reselectIcon.js';
import { stashIcon } from '../../assets/icons/stashIcon.js';
import { closeIcon } from '../../assets/icons/closeIcon.js';
import { confirmIcon } from '../../assets/icons/confirmIcon.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { on } from '../../shared/utils/eventBus.js';
import { createCounterWithHelp, showCounterWithHelp, hideCounterWithHelp, updateCounterValue } from '../../shared/ui/components/counterWithHelp.js';
import { CustomSlider } from '../../shared/ui/components/customSlider.js';
import { openContextualSettingsPanel } from '../settings/ui.js';
import { loadSettings, saveSettings, applySettings } from '../settings/logic.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';

// --- 模块级变量 ---
let unsubscribeStagedCountChanged = null;
let sliderInstance = null;

// --- 模块级变量，用于缓存UI元素的引用 ---

/** @type {HTMLElement | null} - 扫描容器，包含高亮边框和标签，负责定位和动画。 */
let scanContainer = null;

/** @type {HTMLElement | null} - 高亮边框元素。 */
let highlightBorder = null;

/** @type {HTMLElement | null} - 显示元素标签名的工具提示。 */
let tagNameTooltip = null;

/** @type {HTMLElement | null} - 层级调整工具栏。 */
let toolbar = null;
let reselectBtn = null;
let stageBtn = null;
let confirmBtn = null;

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
 * @param {object} [offset={x:0, y:0}] - 可选的坐标偏移量，用于校正 iframe 内元素的相对位置。
 */
export function updateHighlight(targetElement, offset = { x: 0, y: 0 }) {
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
    // 注意：如果是 iframe 内的元素，rect 是相对于 iframe 视口的。
    // 我们需要加上 iframe 在主页面中的偏移量 (offset.x, offset.y)。
    const newWidth = rect.width + padding * 2;
    const newHeight = rect.height + padding * 2;
    // 修正：uiContainer 是 position: fixed (相对视口定位)，因此不应加上 window.scrollX/Y。
    // 加上 scroll 会导致滚动时高亮框相对视口移动（即看起来固定在文档某处），而元素在视口中移动，产生分离。
    // 使用 rect (视口坐标) + offset (iframe 相对视口) 即可。
    const newX = rect.left + offset.x - padding;
    const newY = rect.top + offset.y - padding;

    scanContainer.style.width = `${newWidth}px`;
    scanContainer.style.height = `${newHeight}px`;
    scanContainer.style.transform = `translate(${newX}px, ${newY}px)`;
    
    tagNameTooltip.textContent = elementSelector;

    // 如果工具栏已存在，同时更新工具栏上显示的标签名
    updateToolbarTagAnimated(getElementSelector(targetElement));
}

/**
 * @private
 * @function updateToolbarTagAnimated
 * @description 使用淡入淡出动画效果更新工具栏中的元素标签。
 * @param {string} newText - 要显示的新文本内容。
 */
function updateToolbarTagAnimated(newText) {
    const toolbarTag = uiContainer.querySelector('#element-scan-toolbar-tag');
    if (!toolbarTag) return;

    // 如果文本内容没有变化，则不执行任何操作
    if (toolbarTag.textContent === newText) {
        return;
    }

    // 1. 开始淡出
    toolbarTag.style.opacity = '0';

    // 2. 等待淡出动画完成 (100ms)
    setTimeout(() => {
        // 3. 更新文本内容
        toolbarTag.textContent = newText;
        // 4. 开始淡入
        toolbarTag.style.opacity = '1';
    }, 100);
}

/**
 * @public
 * @function createAdjustmentToolbar
 * @description 创建并显示层级调整工具栏。
 * @param {HTMLElement[]} elementPath - 从选中元素到 body 的 DOM 路径数组。
 * @param {object} [offset={x:0, y:0}] - 坐标偏移量，用于校正 iframe 内元素的相对位置。
 */
export function createAdjustmentToolbar(elementPath, offset = { x: 0, y: 0 }) {
    if (toolbar) cleanupToolbar(); // 如果已存在旧的工具栏，先清理掉

    log(t('log.elementScanUI.creatingToolbar'));
    toolbar = document.createElement('div');
    toolbar.id = 'element-scan-toolbar';
    toolbar.style.pointerEvents = 'auto'; // 确保工具栏本身可交互，覆盖 uiContainer 的 pointer-events: none

    // 创建静态部分（移除滑块的硬编码HTML）
    const staticContent = `
        <div id="element-scan-toolbar-title">${t('common.processingElement')}</div>
        <div id="element-scan-toolbar-tag" title="${t('tooltip.dragHint')}">${getElementSelector(elementPath[0])}</div>
        <div id="element-scan-slider-container"></div>
        <div id="element-scan-toolbar-actions"></div>
    `;
    toolbar.innerHTML = createTrustedHTML(staticContent);

    // 实例化并添加新的自定义滑块
    const sliderContainer = toolbar.querySelector('#element-scan-slider-container');
    sliderInstance = new CustomSlider({
        min: 0,
        max: elementPath.length - 1,
        value: 0,
        onChange: (newValue) => {
            log(simpleTemplate(t('log.elementScanUI.sliderChanged'), { level: newValue }));
            updateSelectionLevel(newValue);
        }
    });
    sliderContainer.appendChild(sliderInstance.getElement());

    uiContainer.appendChild(toolbar);

    // 动态创建并添加按钮
    const actionsContainer = toolbar.querySelector('#element-scan-toolbar-actions');

    reselectBtn = createButton({
        id: 'element-scan-toolbar-reselect',
        textKey: 'common.reselect',
        icon: reselectIcon,
        onClick: () => {
            log(t('log.elementScanUI.reselectClicked'));
            reselectElement();
        }
    });

    stageBtn = createButton({
        id: 'element-scan-toolbar-stage',
        textKey: 'common.stage',
        icon: stashIcon,
        onClick: () => {
            log(t('log.elementScanUI.stageClicked'));
            stageCurrentElement();
        }
    });

    confirmBtn = createButton({
        id: 'element-scan-toolbar-confirm',
        textKey: 'common.confirm',
        icon: confirmIcon,
        onClick: () => {
            log(t('log.elementScanUI.confirmClicked'));
            confirmSelectionAndExtract();
        }
    });

    actionsContainer.appendChild(reselectBtn);
    actionsContainer.appendChild(stageBtn);
    actionsContainer.appendChild(confirmBtn);

    // --- 智能定位逻辑 ---
    // 自动计算工具栏的最佳初始位置，避免遮挡目标元素或超出屏幕边界。
    const initialRect = elementPath[0].getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 检查顶部计数器UI是否存在且可见，如果是，则为其高度保留空间
    const topCounter = uiContainer.querySelector('.counter-with-help-container.is-visible');
    const topOffset = topCounter ? topCounter.getBoundingClientRect().height + 5 : 0;
    const margin = 10 + topOffset; // 工具栏与元素/屏幕边缘的最小间距

    let top, left;

    // 校正后的元素坐标（相对于主窗口可视区域）
    const absRect = {
        top: initialRect.top + offset.y,
        bottom: initialRect.bottom + offset.y,
        left: initialRect.left + offset.x,
        right: initialRect.right + offset.x
    };

    // 水平方向的默认对齐方式：与目标元素右对齐，并确保不超出视口边界
    const alignRight = () => {
        let l = absRect.right - toolbarRect.width;
        if (l < margin) l = margin;
        if (l + toolbarRect.width > viewportWidth - margin) {
            l = viewportWidth - toolbarRect.width - margin;
        }
        return l;
    };
    
    // 优先尝试将工具栏放在目标元素的上方或下方
    const topAbove = absRect.top - toolbarRect.height - 10;
    const topBelow = absRect.bottom + 10;

    const canPlaceAbove = topAbove > margin;
    const canPlaceBelow = topBelow + toolbarRect.height < viewportHeight - 10;

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

    makeDraggable(toolbar);

    requestAnimationFrame(() => {
        toolbar.classList.add('is-visible');
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
        // 仅允许左键拖动 (button 0)
        if (e.button !== 0) return;

        // 检查点击的是否是交互式元素（按钮、滑块本身或滑块的拖动点）
        // .closest() 方法会从当前元素开始向上遍历DOM树
        const isInteractive = e.target.closest('button, .custom-slider-thumb, .custom-slider-track');

        // 如果点击的不是交互式元素，则启动拖动
        if (!isInteractive) {
            e.preventDefault();
            const rect = element.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            log(t('log.elementScanUI.dragStarted'));
        }
    };

    const onMouseMove = (e) => {
        // 如果左键没有被按下（例如被右键菜单中断后），则停止拖动
        // e.buttons 是一个掩码，1 表示左键
        if ((e.buttons & 1) === 0) {
            onMouseUp();
            return;
        }

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

    // 添加 contextmenu 监听器，确保右键菜单打开时取消拖动状态
    const onContextMenu = () => {
        // 如果正在拖动中被右键打断，则清理拖动状态
        onMouseUp();
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('contextmenu', onContextMenu);
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
        if (sliderInstance) {
            sliderInstance.destroy();
            sliderInstance = null;
        }

        // 销毁按钮以移除事件监听器
        if (reselectBtn) {
            reselectBtn.destroy();
            reselectBtn = null;
        }
        if (stageBtn) {
            stageBtn.destroy();
            stageBtn = null;
        }
        if (confirmBtn) {
            confirmBtn.destroy();
            confirmBtn = null;
        }

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
    createCounterWithHelp({
        counterKey: 'scan.stagedCount',
        helpKey: 'tutorial.elementScan',
        onPause: pauseElementScan,
        onResume: resumeElementScan,
        scanType: 'ElementScan',
        onSettingsClick: () => {
            const currentSettings = loadSettings();
            const definitions = [
                {
                    id: 'persist-data-checkbox',
                    key: 'elementScan_persistData',
                    type: 'checkbox',
                    label: 'settings.contextual.persistData',
                    tooltip: {
                        titleIcon: infoIcon,
                        title: 'tooltip.persistData.title',
                        text: 'tooltip.persistData.text.elementScan'
                    }
                }
            ];
            openContextualSettingsPanel({
                titleKey: 'settings.contextual.elementScanTitle',
                icon: settingsIcon,
                definitions: definitions,
                settings: currentSettings,
                onSave: (newSettings) => {
                    const updatedSettings = { ...currentSettings, ...newSettings };
                    saveSettings(updatedSettings);
                    applySettings(updatedSettings, currentSettings);
                }
            });
        }
    });
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
