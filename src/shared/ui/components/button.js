// src/shared/ui/components/button.js

import { createIconTitle } from '../iconTitle.js';
import { t } from '../../i18n/index.js';

/**
 * 创建一个标准化的、可复用的按钮组件。
 *
 * @param {object} options - 按钮的配置选项。
 * @param {string} [options.id] - 按钮的 DOM ID。
 * @param {string} [options.className] - 要添加到按钮的额外 CSS 类名。
 * @param {string} options.textKey - 用于国际化的文本键（例如 'common.save'）。
 * @param {string} [options.icon] - 按钮上显示的 SVG 图标字符串。
 * @param {function} [options.onClick] - 点击按钮时触发的回调函数。
 * @param {boolean} [options.disabled=false] - 按钮是否应初始为禁用状态。
 * @returns {HTMLButtonElement} - 创建好的按钮元素。
 */
export function createButton({ id, className, textKey, icon, onClick, disabled = false }) {
    const button = document.createElement('button');
    button.className = 'tc-button'; // 核心样式类

    if (id) {
        button.id = id;
    }

    if (className) {
        button.classList.add(className);
    }

    button.appendChild(createIconTitle(icon, t(textKey)));
    button.disabled = disabled;

    if (onClick && typeof onClick === 'function') {
        button.addEventListener('click', onClick);
    }

    // 添加一个方法来动态更新文本，以支持语言切换
    button.updateText = (newTextKey) => {
        button.replaceChildren();
        button.appendChild(createIconTitle(icon, t(newTextKey)));
    };

    return button;
}
