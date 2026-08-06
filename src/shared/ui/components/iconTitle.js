// src/ui/components/iconTitle.js
import { createSVGFromString } from '../../utils/dom/dom.js';

/**
 * @description 创建一个包含图标和文本的标题元素。
 * @param {string} iconSVG - 图标的 SVG 字符串。
 * @param {string} text - 标题的文本内容。
 * @returns {HTMLDivElement} - 包含图标和文本的 div 元素。
 */
export function createIconTitle(iconSVG, text) {
    const container = document.createElement('div');
    container.className = 'tc-icon-title';

    if (iconSVG) {
        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'tc-icon-title-icon';
        iconWrapper.setAttribute('aria-hidden', 'true');

        const svgElement = createSVGFromString(iconSVG);
        if (svgElement) {
            iconWrapper.appendChild(svgElement);
            container.appendChild(iconWrapper);
        }
    }

    const textNode = document.createElement('span');
    textNode.className = 'icon-title-text';
    textNode.textContent = text;
    container.appendChild(textNode);

    return container;
}
