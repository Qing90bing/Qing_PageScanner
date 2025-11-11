// src/shared/ui/components/counterWithHelp.js

import { t } from '../../i18n/index.js';
import { createHelpIcon } from './helpIcon.js';
import { createButton } from './button.js';
import { updateTopCenterCounter, createTopCenterCounter } from './topCenterCounter.js';
import { uiContainer } from '../uiContainer.js';
import { pauseIcon } from '../../../assets/icons/pauseIcon.js';
import { resumeIcon } from '../../../assets/icons/resumeIcon.js';

let counterWithHelpContainer = null;
let counterElement = null;
let helpIcon = null;
let pauseResumeButton = null;

/**
 * @public
 * @function createCounterWithHelp
 * @description 创建并初始化包含计数器、分隔符和帮助图标的组合UI组件。
 * @param {object} config - 组件的配置对象。
 * @param {string} config.counterKey - 用于计数器标签的i18n key。
 * @param {string} config.helpKey - 用于帮助图标工具提示的i18n key。
 * @param {function} [config.onPause] - “暂停”按钮点击事件的回调。
 * @param {function} [config.onResume] - “恢复”按钮点击事件的回调。
 * @param {string} [config.scanType] - 当前扫描的类型，用于工具提示。
 * @returns {HTMLElement} - 返回创建的容器元素。
 */
export function createCounterWithHelp({ counterKey, helpKey, onPause, onResume, scanType }) {
    if (counterWithHelpContainer) {
        updateCounterValue(0);
        return counterWithHelpContainer;
    }

    let isPaused = false;

    counterWithHelpContainer = document.createElement('div');
    counterWithHelpContainer.className = 'counter-with-help-container';

    counterElement = createTopCenterCounter(counterKey);
    helpIcon = createHelpIcon(helpKey);

    counterWithHelpContainer.appendChild(counterElement);

    if (onPause && onResume && scanType) {
        const separator = document.createElement('div');
        separator.className = 'counter-with-help-separator';
        counterWithHelpContainer.appendChild(separator);

        pauseResumeButton = createButton({
            icon: pauseIcon,
            iconOnly: true,
            tooltipKey: `tooltip.pause${scanType}`,
            onClick: () => {
                isPaused = !isPaused;
                if (isPaused) {
                    onPause();
                    pauseResumeButton.updateIcon(resumeIcon);
                    pauseResumeButton.updateText(`tooltip.resume${scanType}`);
                } else {
                    onResume();
                    pauseResumeButton.updateIcon(pauseIcon);
                    pauseResumeButton.updateText(`tooltip.pause${scanType}`);
                }
            }
        });

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'counter-actions-container';
        actionsContainer.appendChild(pauseResumeButton);
        actionsContainer.appendChild(helpIcon);

        counterWithHelpContainer.appendChild(actionsContainer);
    } else {
        const separator = document.createElement('div');
        separator.className = 'counter-with-help-separator';
        counterWithHelpContainer.appendChild(separator);
        counterWithHelpContainer.appendChild(helpIcon);
    }

    uiContainer.appendChild(counterWithHelpContainer);

    updateCounterValue(0);
    return counterWithHelpContainer;
}

/**
 * @public
 * @function showCounterWithHelp
 * @description 显示计数器并触发统一的入场动画。
 */
export function showCounterWithHelp() {
    if (!counterWithHelpContainer) return;

    requestAnimationFrame(() => {
        counterWithHelpContainer.classList.add('is-visible');
    });
}

/**
 * @public
 * @function hideCounterWithHelp
 * @description 隐藏计数器并触发统一的退场动画，之后清理资源。
 */
export function hideCounterWithHelp() {
    if (!counterWithHelpContainer) return;

    // 引用当前需要被移除的元素
    const containerToRemove = counterWithHelpContainer;
    const counterToRemove = counterElement;
    const iconToRemove = helpIcon;
    const buttonToRemove = pauseResumeButton; // 引用按钮

    // 立即清除全局引用，防止重复操作
    counterWithHelpContainer = null;
    counterElement = null;
    helpIcon = null;
    pauseResumeButton = null;

    // 触发退场动画
    containerToRemove.classList.remove('is-visible');

    // 在动画结束后清理所有相关资源
    setTimeout(() => {
        if (counterToRemove && typeof counterToRemove.destroy === 'function') {
            counterToRemove.destroy();
        }
        if (iconToRemove && typeof iconToRemove.destroy === 'function') {
            iconToRemove.destroy();
        }
        if (buttonToRemove && typeof buttonToRemove.destroy === 'function') {
            buttonToRemove.destroy();
        }
        if (containerToRemove) {
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
