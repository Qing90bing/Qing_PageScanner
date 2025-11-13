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
    const controller = new AbortController();
    const { signal } = controller;

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

        button.addEventListener('mouseover', () => showTooltip(button, t(currentTooltipKey)), { signal });
        button.addEventListener('mouseout', hideTooltip, { signal });

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
        button.addEventListener('click', onClick, { signal });
    }

    button.updateIcon = (newIcon) => {
        const oldIconElements = button.querySelectorAll('svg');

        // 1. 创建新图标并添加到按钮中，初始状态为透明
        const newIconElement = createSVGFromString(newIcon);
        newIconElement.style.opacity = '0';
        button.appendChild(newIconElement);

        // 2. 强制浏览器重绘
        void newIconElement.offsetHeight;

        // 3. 在下一帧让所有旧图标淡出，新图标淡入
        requestAnimationFrame(() => {
            oldIconElements.forEach(icon => {
                icon.style.opacity = '0';
            });
            newIconElement.style.opacity = '1';
        });

        // 4. 在动画结束后移除所有旧图标
        setTimeout(() => {
            oldIconElements.forEach(icon => icon.remove());
        }, 300); // 必须匹配 CSS transition 的持续时间
    };

    // 添加 destroy 方法来移除所有事件监听器
    button.destroy = () => controller.abort();

    return button;
}
