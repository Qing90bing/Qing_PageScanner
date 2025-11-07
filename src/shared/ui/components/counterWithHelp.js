// src/shared/ui/components/counterWithHelp.js

import { t } from '../../i18n/index.js';
import { createHelpIcon } from './helpIcon.js';
import { updateTopCenterCounter, createTopCenterCounter } from './topCenterCounter.js';
import { uiContainer } from '../uiContainer.js';

let backgroundContainer = null;
let contentContainer = null;
let counterElement = null;
let helpIcon = null;

/**
 * @public
 * @function createCounterWithHelp
 * @description 创建并初始化包含计数器、分隔符和帮助图标的组合UI组件。
 *              采用双层分离结构（背景层和内容层）以优化动画性能并修复渲染问题。
 * @param {string} counterKey - 用于计数器标签的i18n key。
 * @param {string} helpKey - 用于帮助图标工具提示的i18n key。
 * @returns {HTMLElement} - 返回创建的内容容器元素。
 */
export function createCounterWithHelp(counterKey, helpKey) {
    if (contentContainer) {
        updateCounterValue(0);
        return contentContainer;
    }

    // 1. 创建背景容器，负责模糊背景和动画
    backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'counter-with-help-background';

    // 2. 创建内容容器，负责承载内容并同步动画
    contentContainer = document.createElement('div');
    contentContainer.className = 'counter-with-help-content';

    // 3. 创建和配置子元素
    counterElement = createTopCenterCounter(counterKey);
    helpIcon = createHelpIcon(helpKey);

    const separator = document.createElement('div');
    separator.className = 'counter-with-help-separator';

    // 4. 将子元素组装到内容容器中
    contentContainer.appendChild(counterElement);
    contentContainer.appendChild(separator);
    contentContainer.appendChild(helpIcon);

    // 5. 将两个独立的容器都添加到主UI容器中
    uiContainer.appendChild(backgroundContainer);
    uiContainer.appendChild(contentContainer);

    updateCounterValue(0);
    return contentContainer;
}

/**
 * @public
 * @function showCounterWithHelp
 * @description 同步显示背景和内容容器，并触发统一的入场动画。
 */
export function showCounterWithHelp() {
    if (!backgroundContainer || !contentContainer) return;

    requestAnimationFrame(() => {
        backgroundContainer.classList.add('is-visible');
        contentContainer.classList.add('is-visible');
    });
}

/**
 * @public
 * @function hideCounterWithHelp
 * @description 同步隐藏背景和内容容器，并触发统一的退场动画，之后清理资源。
 */
export function hideCounterWithHelp() {
    if (!backgroundContainer || !contentContainer) return;

    // 引用当前需要被移除的元素
    const bgToRemove = backgroundContainer;
    const contentToRemove = contentContainer;
    const counterToRemove = counterElement;
    const iconToRemove = helpIcon;

    // 立即清除全局引用，防止重复操作
    backgroundContainer = null;
    contentContainer = null;
    counterElement = null;
    helpIcon = null;

    // 触发退场动画
    bgToRemove.classList.remove('is-visible');
    contentToRemove.classList.remove('is-visible');

    // 在动画结束后清理所有相关资源
    setTimeout(() => {
        if (counterToRemove && typeof counterToRemove.destroy === 'function') {
            counterToRemove.destroy();
        }
        if (iconToRemove && typeof iconToRemove.destroy === 'function') {
            iconToRemove.destroy();
        }
        if (bgToRemove) {
            bgToRemove.remove();
        }
        if (contentToRemove) {
            contentToRemove.remove();
        }
    }, 400); // 必须匹配CSS中的动画持续时间
}

/**
 * @public
 * @function updateCounterValue
 * @description 更新计数器显示的数值。
 * @param {number} newCount - 新的计数值。
 */
export function updateCounterValue(newCount) {
    if (!counterElement) return;
    updateTopCenterCounter(counterElement, newCount);
}
