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

    fab.addEventListener('click', onClick);

    // 使用自定义的 Tooltip
    fab.addEventListener('mouseenter', () => {
        showTooltip(fab, t(titleKey));
    });
    fab.addEventListener('mouseleave', () => {
        hideTooltip();
    });

    return fab;
}

/**
 * @private
 * @description 更新所有悬浮按钮的工具提示文本。
 */
function updateFabTooltips() {
    if (summaryFab) {
        summaryFab.addEventListener('mouseenter', () => showTooltip(summaryFab, t(summaryFab.dataset.tooltipKey)));
    }
    if (dynamicFab) {
        dynamicFab.addEventListener('mouseenter', () => showTooltip(dynamicFab, t(dynamicFab.dataset.tooltipKey)));
    }
    if (staticFab) {
        staticFab.addEventListener('mouseenter', () => showTooltip(staticFab, t(staticFab.dataset.tooltipKey)));
    }
    if (elementScanFab) {
        elementScanFab.addEventListener('mouseenter', () => showTooltip(elementScanFab, t(elementScanFab.dataset.tooltipKey)));
    }
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

    // --- 创建三个按钮 ---

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

    // 监听语言变化事件以更新工具提示
    on('languageChanged', updateFabTooltips);
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
