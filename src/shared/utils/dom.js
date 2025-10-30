// src/ui/utils.js
import { log } from './logger.js';
import { t } from '../i18n/index.js';

/**
 * @module utils
 * @description UI相关的辅助函数。
 */

let trustedTypePolicy = null;
let policyCreated = false;

/**
 * @private
 * @description 创建一个一次性的 Trusted Type 策略来处理 SVG 字符串。
 * @returns {object|null} Trusted Type Policy 对象或 null。
 */
function createTrustedTypePolicy() {
    if (policyCreated) {
        return trustedTypePolicy;
    }

    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        try {
            trustedTypePolicy = window.trustedTypes.createPolicy('script-svg-policy', {
                createHTML: (input) => {
                    // 在这里可以添加对 input 的额外净化或验证逻辑
                    // 但由于我们只处理内部的、已知的SVG字符串，所以直接返回
                    return input;
                }
            });
        } catch (e) {
            // 如果策略已存在，则尝试获取它
            if (e.message.includes('already exists')) {
                trustedTypePolicy = window.trustedTypes.policies.get('script-svg-policy');
            } else {
                log(t('log.dom.ttpCreationError'), e);
            }
        }
    }
    policyCreated = true;
    return trustedTypePolicy;
}


/**
 * @public
 * @description 安全地从 SVG 字符串创建 SVG DOM 元素，兼容 Trusted Types CSP。
 * @param {string} svgString - SVG 图标的字符串。
 * @returns {SVGSVGElement | null} 创建的 SVG 元素，如果解析失败则返回 null。
 */
export function createSVGFromString(svgString) {
    if (!svgString || typeof svgString !== 'string') return null;

    const policy = createTrustedTypePolicy();
    let sanitizedSVG = svgString.trim();

    // 如果存在 Trusted Type 策略，则使用它
    if (policy) {
        sanitizedSVG = policy.createHTML(sanitizedSVG);
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedSVG, 'image/svg+xml');
    const svgNode = doc.documentElement;

    if (!svgNode || svgNode.nodeName.toLowerCase() !== 'svg' || svgNode.querySelector('parsererror')) {
        log(t('log.dom.svgParseError'), svgString);
        return null;
    }

    return document.importNode(svgNode, true);
}
