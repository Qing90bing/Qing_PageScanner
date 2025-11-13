// src/shared/ui/components/button.js

import { createIconTitle } from '../iconTitle.js';
import { t } from '../../i18n/index.js';
import { showTooltip, hideTooltip } from './tooltip.js';
import { createSVGFromString } from '../../utils/dom.js';
import { createTrustedHTML } from '../../utils/trustedTypes.js';

/**
 * 创建一个标准化的、可复用的按钮组件。
 *
 * @param {object} options - 按钮的配置选项。
 * @param {string} [options.id] - 按钮的 DOM ID。
 * @param {string} [options.className] - 要添加到按钮的额外 CSS 类名。
 * @param {string} [options.textKey] - 用于国际化的文本键（例如 'common.save'）。
 * @param {string} [options.tooltipKey] - 用于纯图标按钮的工具提示的i18n key。
 * @param {string} [options.icon] - 按钮上显示的 SVG 图标字符串。
 * @param {function} [options.onClick] - 点击按钮时触发的回调函数。
 * @param {boolean} [options.disabled=false] - 按钮是否应初始为禁用状态。
 * @param {boolean} [options.iconOnly=false] - 是否为纯图标按钮。
 * @returns {HTMLButtonElement} - 创建好的按钮元素。
 */
export function createButton({ id, className, textKey, tooltipKey, icon, onClick, disabled = false, iconOnly = false }) {
    const button = document.createElement('button');
    const eventListeners = [];

    // 辅助函数，用于添加事件监听器并追踪它们
    const addTrackedEventListener = (element, type, listener) => {
        element.addEventListener(type, listener);
        eventListeners.push({ element, type, listener });
    };

    if (id) {
        button.id = id;
    }

    if (iconOnly) {
        button.className = 'tc-icon-button';
        if (className) {
            button.classList.add(className);
        }
        button.innerHTML = createTrustedHTML(icon);
        let currentTooltipKey = tooltipKey;

        addTrackedEventListener(button, 'mouseover', () => showTooltip(button, t(currentTooltipKey)));
        addTrackedEventListener(button, 'mouseout', hideTooltip);

        button.updateText = (newTooltipKey) => {
            currentTooltipKey = newTooltipKey;
        };
    } else {
        button.className = 'tc-button';
        if (className) {
            button.classList.add(className);
        }
        button.appendChild(createIconTitle(icon, t(textKey)));

        button.updateText = (newTextKey) => {
            const textElement = button.querySelector('.tc-icon-title-text');
            if (textElement) {
                textElement.textContent = t(newTextKey);
            }
        };
    }

    button.disabled = disabled;

    if (onClick && typeof onClick === 'function') {
        addTrackedEventListener(button, 'click', onClick);
    }

    button.updateIcon = (newIcon) => {
        const oldIconElement = button.querySelector('svg');
        if (!oldIconElement) {
            // 如果没有旧图标，直接设置新图标
            button.innerHTML = createTrustedHTML(newIcon);
            return;
        }

        const newIconElement = createSVGFromString(newIcon);

        // 确保按钮是一个有效的定位上下文，以便图标可以相对于它进行绝对定位
        const originalPosition = button.style.position;
        if (originalPosition !== 'relative' && originalPosition !== 'absolute' && originalPosition !== 'fixed') {
            button.style.position = 'relative';
        }

        // 定义统一的图标样式，用于绝对定位居中和过渡动画
        const iconStyle = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 0.1s ease-in-out;
        `;

        // 应用样式到两个图标
        oldIconElement.style.cssText += iconStyle;
        newIconElement.style.cssText += iconStyle;

        // 设置新图标的初始状态为透明
        newIconElement.style.opacity = '0';

        // 将新图标添加到按钮中，与旧图标并存
        button.appendChild(newIconElement);

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            // 开始淡入淡出动画
            oldIconElement.style.opacity = '0';
            newIconElement.style.opacity = '1';
        });

        // 动画结束后，执行清理工作
        setTimeout(() => {
            // 移除已经透明的旧图标
            if (oldIconElement && oldIconElement.parentNode) {
                oldIconElement.remove();
            }
            // 清理新图标的内联样式，使其恢复由CSS类控制
            newIconElement.style.position = '';
            newIconElement.style.top = '';
            newIconElement.style.left = '';
            newIconElement.style.transform = '';
            newIconElement.style.transition = '';

            // 恢复按钮原始的 position 样式
            button.style.position = originalPosition;
        }, 100); // 动画时长为 0.1秒 (100毫秒)
    };

    // 添加 destroy 方法来移除所有事件监听器
    button.destroy = () => {
        eventListeners.forEach(({ element, type, listener }) => {
            element.removeEventListener(type, listener);
        });
        // 清空数组以释放引用
        eventListeners.length = 0;
    };

    return button;
}
