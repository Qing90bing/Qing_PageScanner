// src/ui/components/fab.js

/**
 * @module fab
 * @description 负责创建和管理所有悬浮操作按钮。
 */

import { translateIcon } from '../../../assets/icon.js';
import { dynamicIcon } from '../../../assets/dynamicIcon.js';
import { stopIcon } from '../../../assets/stopIcon.js';
import { summaryIcon } from '../../../assets/summaryIcon.js';

import { createSVGFromString } from '../../utils/dom.js';

/**
 * @private
 * @description 创建一个单独的悬浮按钮。
 * @param {string} className - 按钮的 CSS 类名。
 * @param {string} iconSVGString - 按钮内部的 SVG 图标字符串。
 * @param {string} title - 鼠标悬停时显示的提示文本。
 * @param {function} onClick - 点击事件的回调函数。
 * @returns {HTMLElement} - 创建的按钮元素。
 */
function createSingleFab(className, iconSVGString, title, onClick) {
    const fab = document.createElement('div');
    fab.className = `text-extractor-fab ${className}`;

    const svgIcon = createSVGFromString(iconSVGString);
    if (svgIcon) {
        fab.appendChild(svgIcon);
    }

    fab.title = title;
    fab.addEventListener('click', onClick);
    return fab;
}

/**
 * @description 创建并初始化所有悬浮操作按钮。
 * @param {object} options - 配置对象。
 * @param {object} options.callbacks - 包含所有按钮点击事件回调的对象。
 * @param {function} options.callbacks.onStaticExtract - “静态提取”按钮的点击回调。
 * @param {function} options.callbacks.onDynamicExtract - “动态扫描”按钮的点击回调。
 * @param {function} options.callbacks.onSummary - “查看总结”按钮的点击回调。
 * @param {boolean} options.isVisible - 按钮创建后是否立即可见。
 */
export function createFab({ callbacks, isVisible }) {
    const { onStaticExtract, onDynamicExtract, onSummary } = callbacks;
    // 创建一个容器来包裹所有的 FAB
    const fabContainer = document.createElement('div');
    fabContainer.className = 'text-extractor-fab-container';

    // --- 创建三个按钮 ---

    // 1. 总结按钮 (最上方)
    const summaryFab = createSingleFab(
        'fab-summary',
        summaryIcon,
        '查看会话总结',
        onSummary
    );

    // 2. 动态扫描按钮 (中间)
    const dynamicFab = createSingleFab(
        'fab-dynamic',
        dynamicIcon,
        '开始动态扫描会话',
        () => onDynamicExtract(dynamicFab) // 将fab元素本身传回去，方便UI更新
    );

    // 3. 静态扫描按钮 (最下方)
    const staticFab = createSingleFab(
        'fab-static',
        translateIcon,
        '快捷提取当前页面所有文本',
        onStaticExtract
    );

    // --- 添加到页面 ---
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    document.body.appendChild(fabContainer);

    // 根据初始设置决定是否显示
    if (isVisible) {
        // 触发进入动画
        setTimeout(() => {
            fabContainer.classList.add('fab-container-visible');
        }, 50); // 延迟以确保CSS过渡生效
    }
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
