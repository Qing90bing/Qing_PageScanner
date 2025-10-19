// src/shared/ui/components/tooltip.js

let tooltipElement = null;
let hideTimeout = null;

/**
 * 显示提示框
 * @param {HTMLElement} targetElement - 触发提示的元素
 * @param {string} text - 提示框中显示的文本
 */
export function showTooltip(targetElement, text) {
    // 如果已存在提示，先清除
    if (tooltipElement) {
        hideTooltip(true);
    }
    clearTimeout(hideTimeout);

    // 创建新的提示元素
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'text-extractor-tooltip';
    tooltipElement.textContent = text;
    document.body.appendChild(tooltipElement);

    // 计算位置
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    // 定位在目标元素左侧，并垂直居中
    const top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
    const left = targetRect.left - tooltipRect.width - 12; // 12px 间距

    tooltipElement.style.top = `${top}px`;
    tooltipElement.style.left = `${left}px`;

    // 延迟一帧后添加入场动画类
    requestAnimationFrame(() => {
        tooltipElement.classList.add('is-visible');
    });
}

/**
 * 隐藏提示框
 * @param {boolean} immediate - 是否立即移除，跳过动画
 */
export function hideTooltip(immediate = false) {
    if (!tooltipElement) return;

    const el = tooltipElement;
    tooltipElement = null; // 立即清除引用

    if (immediate) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    } else {
        el.classList.remove('is-visible');
        // 等待动画结束后再移除DOM元素
        hideTimeout = setTimeout(() => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }, 200); // 对应CSS中的 transition 时间
    }
}
