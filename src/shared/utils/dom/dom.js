// src/shared/utils/dom/dom.js
import { log } from '../core/logger.js';
import { t } from '../../i18n/index.js';
import { createTrustedHTML } from './trustedTypes.js';

/**
 * @module utils
 * @description DOM相关的辅助函数。
 */

// 复用 DOMParser，避免每次创建图标时重复实例化解析器。
const parser = new DOMParser();

/**
 * @public
 * @description 安全地从 SVG 字符串创建 SVG DOM 元素，兼容 Trusted Types CSP。
 * @param {string} svgString - SVG 图标的字符串。
 * @returns {SVGSVGElement | null} 创建的 SVG 元素，如果解析失败则返回 null。
 */
export function createSVGFromString(svgString) {
    if (!svgString || typeof svgString !== 'string') return null;

    const sanitizedSVG = createTrustedHTML(svgString.trim());

    // 使用外部缓存的 parser 实例
    const doc = parser.parseFromString(sanitizedSVG, 'image/svg+xml');
    const svgNode = doc.documentElement;

    if (!svgNode || svgNode.nodeName.toLowerCase() !== 'svg' || svgNode.querySelector('parsererror')) {
        log(t('log.dom.svgParseError'), svgString);
        return null;
    }

    return document.importNode(svgNode, true);
}
