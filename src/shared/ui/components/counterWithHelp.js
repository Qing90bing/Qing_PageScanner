// src/shared/ui/components/counterWithHelp.js

import { t } from '../../i18n/index.js';
import { createHelpIcon } from './helpIcon.js';
import { createButton } from './button.js';
import { updateTopCenterCounter, createTopCenterCounter } from './topCenterCounter.js';
import { uiContainer } from '../uiContainer.js';
import { pauseIcon } from '../../../assets/icons/pauseIcon.js';
import { resumeIcon } from '../../../assets/icons/resumeIcon.js';

let backgroundContainer = null;
let contentContainer = null;
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
 * @returns {HTMLElement} - 返回创建的内容容器元素。
 */
export function createCounterWithHelp({ counterKey, helpKey, onPause, onResume, scanType }) {
    if (contentContainer) {
        updateCounterValue(0);
        return contentContainer;
    }

    let isPaused = false;

    backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'counter-with-help-background';

    contentContainer = document.createElement('div');
    contentContainer.className = 'counter-with-help-content';

    counterElement = createTopCenterCounter(counterKey);
    helpIcon = createHelpIcon(helpKey);

    contentContainer.appendChild(counterElement);

    if (onPause && onResume && scanType) {
        const separator = document.createElement('div');
        separator.className = 'counter-with-help-separator';
        contentContainer.appendChild(separator);

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

        contentContainer.appendChild(actionsContainer);
    } else {
        const separator = document.createElement('div');
        separator.className = 'counter-with-help-separator';
        contentContainer.appendChild(separator);
        contentContainer.appendChild(helpIcon);
    }

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

        // 动态调整背景宽度以匹配内容
        setTimeout(() => {
            if (backgroundContainer && contentContainer) {
                const contentWidth = contentContainer.offsetWidth;
                backgroundContainer.style.width = `${contentWidth}px`;
            }
        }, 50); // 延迟以确保内容已渲染并获得正确宽度
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
    pauseResumeButton = null;

    // 触发退场动画
    bgToRemove.style.width = ''; // 重置宽度
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
        if (pauseResumeButton && typeof pauseResumeButton.destroy === 'function') {
            pauseResumeButton.destroy();
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
