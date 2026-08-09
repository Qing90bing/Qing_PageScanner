// src/shared/ui/components/button.js

import { createIconTitle } from './iconTitle.js';
import { t } from '../../i18n/index.js';
import { showTooltip, hideTooltip } from './tooltip.js';
import { createSVGFromString } from '../../utils/dom/dom.js';
import { createTrustedHTML } from '../../utils/dom/trustedTypes.js';

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
export function createButton({
    id,
    className,
    textKey,
    tooltipKey,
    icon,
    onClick,
    disabled = false,
    iconOnly = false,
}) {
    const button = document.createElement('button');
    const controller = new AbortController();
    const { signal } = controller;
    let iconAnimationTimer = null;

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
            // 修复：类名必须匹配 iconTitle.js 中定义的类名 'icon-title-text'
            const textElement = button.querySelector('.icon-title-text');
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
        const newIconElement = createSVGFromString(newIcon);
        if (!newIconElement) return;
        const oldIconElements = Array.from(button.querySelectorAll('svg'));
        let iconWrapper = iconOnly ? button : button.querySelector('.tc-icon-title-icon');
        if (!iconWrapper) {
            iconWrapper = document.createElement('span');
            iconWrapper.className = 'tc-icon-title-icon';
            iconWrapper.setAttribute('aria-hidden', 'true');
            const title = button.querySelector('.tc-icon-title');
            if (title) title.prepend(iconWrapper);
            else button.appendChild(iconWrapper);
        }
        if (iconAnimationTimer) clearTimeout(iconAnimationTimer);
        iconWrapper.classList.add('is-changing');
        newIconElement.classList.add('is-icon-entering');
        newIconElement.style.opacity = '0';
        iconWrapper.appendChild(newIconElement);

        void newIconElement.offsetHeight;

        requestAnimationFrame(() => {
            oldIconElements.forEach((icon) => {
                icon.classList.add('is-icon-leaving');
                icon.style.opacity = '0';
            });
            newIconElement.style.opacity = '1';
        });

        iconAnimationTimer = setTimeout(() => {
            oldIconElements.forEach((icon) => icon.remove());
            newIconElement.classList.remove('is-icon-entering');
            newIconElement.style.removeProperty('opacity');
            iconWrapper.classList.remove('is-changing');
            iconAnimationTimer = null;
        }, 200);
    };

    // 添加 destroy 方法来移除所有事件监听器
    button.destroy = () => {
        if (iconAnimationTimer) clearTimeout(iconAnimationTimer);
        controller.abort();
    };

    // 确保按钮可交互，覆盖 uiContainer 的 pointer-events: none
    button.style.pointerEvents = 'auto';

    return button;
}
