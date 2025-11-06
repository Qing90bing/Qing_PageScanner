// src/shared/ui/components/counterWithHelp.js

import { t } from '../../i18n/index.js';
import { createHelpIcon } from './helpIcon.js';
import { updateTopCenterCounter, createTopCenterCounter } from './topCenterCounter.js';
import { uiContainer } from '../uiContainer.js';

let container = null;
let counterElement = null;
let helpIcon = null;

/**
 * @public
 * @function createCounterWithHelp
 * @description 创建并初始化包含计数器、分隔符和帮助图标的组合UI组件。
 * @param {string} counterKey - 用于计数器标签的i18n key。
 * @param {string} helpKey - 用于帮助图标工具提示的i18n key。
 * @returns {HTMLElement} - 返回创建的容器元素。
 */
export function createCounterWithHelp(counterKey, helpKey) {
    if (container) {
        // 如果已存在，确保更新内容
        updateCounterValue(0);
        return container;
    }

    // 1. 创建主容器，这个容器负责定位和动画
    container = document.createElement('div');
    container.className = 'counter-with-help-container';

    // 2. 创建内部包裹容器，负责“胶囊”外观
    const wrapper = document.createElement('div');
    wrapper.className = 'counter-with-help-wrapper';

    // 3. 创建和配置子元素
    counterElement = createTopCenterCounter(counterKey);
    helpIcon = createHelpIcon(helpKey);

    const separator = document.createElement('div');
    separator.className = 'counter-with-help-separator';

    // 4. 将子元素组装到包裹容器中
    wrapper.appendChild(counterElement);
    wrapper.appendChild(separator);
    wrapper.appendChild(helpIcon);

    // 5. 将包裹容器添加到主容器，并将主容器添加到UI容器
    container.appendChild(wrapper);
    uiContainer.appendChild(container);

    updateCounterValue(0);
    return container;
}

/**
 * @public
 * @function showCounterWithHelp
 * @description 显示组合组件，并触发统一的入场动画。
 */
export function showCounterWithHelp() {
    if (!container) return;
    // 动画现在只应用于主容器
    requestAnimationFrame(() => {
        container.classList.add('is-visible');
    });
}

/**
 * @public
 * @function hideCounterWithHelp
 * @description 隐藏组合组件，并触发统一的退场动画。
 */
export function hideCounterWithHelp() {
    if (!container) return;

    const containerToRemove = container;
    const counterToRemove = counterElement;
    const iconToRemove = helpIcon;

    container = null;
    counterElement = null;
    helpIcon = null;

    containerToRemove.classList.remove('is-visible');

    // 在动画结束后清理资源
    setTimeout(() => {
        if (counterToRemove && typeof counterToRemove.destroy === 'function') {
            counterToRemove.destroy();
        }
        if (iconToRemove && typeof iconToRemove.destroy === 'function') {
            iconToRemove.destroy();
        }
        if(containerToRemove) {
            containerToRemove.remove();
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
