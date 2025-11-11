// src/ui/components/fab.js

/**
 * @module fab
 * @description 负责创建和管理所有悬浮操作按钮。
 */

import { translateIcon } from '../../../assets/icons/icon.js';
import { dynamicIcon } from '../../../assets/icons/dynamicIcon.js';
import { summaryIcon } from '../../../assets/icons/summaryIcon.js';
import { elementScanIcon } from '../../../assets/icons/elementScanIcon.js';
import { showTooltip, hideTooltip } from './tooltip.js';
import { appConfig } from '../../../features/settings/config.js';
import { on } from '../../utils/eventBus.js';
import { loadSettings } from '../../../features/settings/logic.js';
import { t } from '../../i18n/index.js';
import { createSVGFromString } from '../../utils/dom.js';
import { uiContainer } from '../uiContainer.js';


let summaryFab, dynamicFab, staticFab, elementScanFab;

/**
 * @private
 * @description 创建一个单独的悬浮按钮。
 * @param {string} className - 按钮的 CSS 类名。
 * @param {string} iconSVGString - 按钮内部的 SVG 图标字符串。
 * @param {string} titleKey - 用于翻译的键名，对应工具提示的文本。
 * @param {function} onClick - 点击事件的回调函数。
 * @returns {HTMLElement} - 创建的按钮元素。
 */
function createSingleFab(className, iconSVGString, titleKey, onClick) {
    const fab = document.createElement('div');
    fab.className = `text-extractor-fab ${className}`;

    const svgIcon = createSVGFromString(iconSVGString);
    if (svgIcon) {
        fab.appendChild(svgIcon);
    }
    // 保存翻译键以便后续更新
    fab.dataset.tooltipKey = titleKey;

    fab.addEventListener('click', (event) => {
        // 如果按钮被禁用，则不执行任何操作
        if (fab.classList.contains('fab-disabled')) {
            event.stopPropagation();
            return;
        }
        onClick(event);
    });

    // 使用自定义的 Tooltip
    fab.addEventListener('mouseenter', () => {
        // 从 dataset 动态读取 key，以确保工具提示总是最新的
        showTooltip(fab, t(fab.dataset.tooltipKey));
    });
    fab.addEventListener('mouseleave', () => {
        hideTooltip();
    });

    return fab;
}

/**
 * @description 创建并初始化所有悬浮操作按钮。
 * @param {object} options - 配置对象。
 * @param {object} options.callbacks - 包含所有按钮点击事件回调的对象。
 * @param {function} options.callbacks.onStaticExtract - “静态提取”按钮的点击回调。
 * @param {function} options.callbacks.onDynamicExtract - “动态扫描”按钮的点击回调。
 * @param {function} options.callbacks.onElementScan - “选取元素扫描”按钮的点击回调。
 * @param {function} options.callbacks.onSummary - “查看总结”按钮的点击回调。
 * @param {boolean} options.isVisible - 按钮创建后是否立即可见。
 */
export function createFab({ callbacks, isVisible }) {
    const { onStaticExtract, onDynamicExtract, onSummary, onElementScan } = callbacks;
    // 创建一个容器来包裹所有的 FAB
    const fabContainer = document.createElement('div');
    fabContainer.className = 'text-extractor-fab-container';

    // --- 创建四个按钮 ---

    // 1. 总结按钮 (最上方)
    summaryFab = createSingleFab(
        'fab-summary',
        summaryIcon,
        'tooltip.summary',
        onSummary
    );

    // 2. 动态扫描按钮 (中间)
    dynamicFab = createSingleFab(
        'fab-dynamic',
        dynamicIcon,
        'tooltip.dynamic_scan',
        () => onDynamicExtract(dynamicFab) // 将fab元素本身传回去，方便UI更新
    );

    // 3. 静态扫描按钮 (中间)
    staticFab = createSingleFab(
        'fab-static',
        translateIcon,
        'tooltip.static_scan',
        onStaticExtract
    );

    // 4. 选取元素扫描按钮 (最下方)
    elementScanFab = createSingleFab(
        'fab-element-scan',
        elementScanIcon,
        'tooltip.element_scan',
        () => onElementScan(elementScanFab)
    );

    // --- 添加到页面 ---
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    fabContainer.appendChild(elementScanFab);
    uiContainer.appendChild(fabContainer);

    // 根据初始设置决定是否显示
    if (isVisible) {
        // 触发进入动画
        setTimeout(() => {
            fabContainer.classList.add('fab-container-visible');
        }, appConfig.ui.fabAnimationDelay); // 延迟以确保CSS过渡生效
    }

    // 更新位置
    updateFabPosition(fabContainer);

    on('settingsSaved', () => updateFabPosition(fabContainer));
}

function updateFabPosition(fabContainer) {
    if (!fabContainer) return;
    const settings = loadSettings();
    const position = settings.fabPosition || 'bottom-right';

    // 移除旧的位置类
    fabContainer.classList.remove('fab-position-bottom-right', 'fab-position-top-right', 'fab-position-bottom-left', 'fab-position-top-left');

    // 添加新的位置类
    fabContainer.classList.add(`fab-position-${position}`);
}

/**
 * @public
 * @description 安全地更新 FAB 的图标。
 * @param {HTMLElement} fabElement - 要更新的 FAB 元素。
 * @param {string} iconSVGString - 新的 SVG 图标字符串。
 */
export function setFabIcon(fabElement, iconSVGString) {
    while (fabElement.firstChild) {
        fabElement.removeChild(fabElement.firstChild);
    }
    const newIcon = createSVGFromString(iconSVGString);
    if (newIcon) {
        fabElement.appendChild(newIcon);
    }
}

/**
 * @public
 * @description 获取对“动态扫描”按钮的引用。
 * @returns {HTMLElement | undefined}
 */
export function getDynamicFab() {
    return dynamicFab;
}

/**
 * @public
 * @description 获取对“选取元素扫描”按钮的引用。
 * @returns {HTMLElement | undefined}
 */
export function getElementScanFab() {
    return elementScanFab;
}

/**
 * @public
 * @description 更新指定 FAB 的工具提示文本。
 * @param {HTMLElement} fabElement - 要更新的 FAB 元素。
 * @param {string} newTooltipKey - 新的 i18n 翻译键。
 */
export function updateFabTooltip(fabElement, newTooltipKey) {
    if (fabElement) {
        fabElement.dataset.tooltipKey = newTooltipKey;
    }
}
