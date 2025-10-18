// src/ui/components/iconTitle.js
import { createSVGFromString } from '../../shared/utils/dom.js';

/**
 * @description 创建一个包含图标和文本的标题元素。
 * @param {string} iconSVG - 图标的 SVG 字符串。
 * @param {string} text - 标题的文本内容。
 * @returns {HTMLDivElement} - 包含图标和文本的 div 元素。
 */
export function createIconTitle(iconSVG, text) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '8px'; // 图标和文字的间距

    const iconWrapper = document.createElement('span');
    iconWrapper.style.display = 'flex';
    iconWrapper.style.alignItems = 'center';

    const svgElement = createSVGFromString(iconSVG);
    if (svgElement) {
        iconWrapper.appendChild(svgElement);
    }

    const textNode = document.createElement('span');
    textNode.textContent = text;

    container.appendChild(iconWrapper);
    container.appendChild(textNode);

    return container;
}
