import { createSVGFromString } from '../../utils/dom/dom.js';

/**
 * 创建带图标和文本的信息提示组件。
 *
 * @param {string} iconSVG - 提示图标的 SVG 字符串。
 * @param {string} text - 提示文本。
 * @returns {HTMLDivElement} 信息提示元素。
 */
export function createInfoNotice(iconSVG, text) {
    const container = document.createElement('div');
    container.className = 'tc-info-notice';
    container.setAttribute('role', 'note');

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'tc-info-notice-icon';
    iconWrapper.setAttribute('aria-hidden', 'true');

    const iconElement = createSVGFromString(iconSVG);
    if (iconElement) {
        iconWrapper.appendChild(iconElement);
    }

    const textElement = document.createElement('span');
    textElement.className = 'tc-info-notice-text';
    textElement.textContent = text;

    container.appendChild(iconWrapper);
    container.appendChild(textElement);
    return container;
}
