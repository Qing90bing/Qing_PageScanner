// src/shared/ui/components/tooltip.js

let currentTooltip = null;
let hideTimeout = null;

import { uiContainer } from '../uiContainer.js';
/**
 * 强制从 DOM 中移除所有现存的 tooltip 实例。
 * 这是为了防止在快速的鼠标悬停事件中出现重复的提示框。
 */
function removeAllTooltips() {
    uiContainer.querySelectorAll('.text-extractor-tooltip').forEach(tip => tip.remove());
    currentTooltip = null;
}

/**
 * 显示提示框
 * @param {HTMLElement} targetElement - 触发提示的元素
 * @param {string} text - 提示框中显示的文本
 */
export function showTooltip(targetElement, text) {
    // 1. 始终先清理掉旧的提示和隐藏计时器
    clearTimeout(hideTimeout);
    removeAllTooltips();

    // 2. 创建新的提示元素
    const tooltip = document.createElement('div');
    tooltip.className = 'text-extractor-tooltip';
    tooltip.textContent = text;
    uiContainer.appendChild(tooltip);
    currentTooltip = tooltip; // 将新创建的注册为当前活动的提示

    // 3. 计算并设置位置
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
    const left = targetRect.left - tooltipRect.width - 12; // 12px 间距

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // 4. 延迟一帧后添加入场动画类，确保动画平滑
    requestAnimationFrame(() => {
        // 再次检查，确保在我们准备显示它时，它仍然是那个“当前”的提示框
        if (tooltip === currentTooltip) {
            tooltip.classList.add('is-visible');
        }
    });
}

/**
 * 隐藏提示框
 */
export function hideTooltip() {
    if (!currentTooltip) return;

    const tooltipToHide = currentTooltip;
    currentTooltip = null; // 立刻注销，表示当前已无活动提示

    tooltipToHide.classList.remove('is-visible');

    // 等待动画结束后再从 DOM 中移除元素
    hideTimeout = setTimeout(() => {
        tooltipToHide.remove();
    }, 200); // 必须与 CSS 中的 transition 时间一致
}
