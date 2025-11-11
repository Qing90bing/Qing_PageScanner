// src/shared/ui/components/tooltip.js

let tooltipElement = null; // 单例模式的元素
let hideTimeout = null;

import { uiContainer } from '../uiContainer.js';

const MARGIN = 12; // 安全边距

/**
 * 检查一个矩形是否与一组障碍物矩形发生碰撞
 * @param {object} rect - 要检查的矩形 { top, left, width, height }
 * @param {DOMRect[]} obstacles - 障碍物矩形数组
 * @returns {boolean} - 如果发生碰撞则返回 true
 */
function checkCollision(rect, obstacles) {
    for (const obstacle of obstacles) {
        if (
            rect.left < obstacle.right &&
            rect.left + rect.width > obstacle.left &&
            rect.top < obstacle.bottom &&
            rect.top + rect.height > obstacle.top
        ) {
            return true; // 发生碰撞
        }
    }
    return false; // 无碰撞
}

/**
 * 计算提示框的最佳显示位置
 * @param {DOMRect} targetRect - 目标元素的矩形信息
 * @param {DOMRect} tooltipRect - 提示框的矩形信息
 * @param {DOMRect[]} obstacles - 需要避开的其他元素的矩形数组
 * @returns {{top: number, left: number}} - 计算出的 top 和 left 值
 */
function calculateOptimalPosition(targetRect, tooltipRect, obstacles) {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const { width: ttWidth, height: ttHeight } = tooltipRect;

    // 定义四个候选位置及其矩形信息
    const positions = [
        // 1. 右侧 (Right)
        {
            name: 'right',
            top: targetRect.top + (targetRect.height / 2) - (ttHeight / 2),
            left: targetRect.right + MARGIN,
        },
        // 2. 左侧 (Left)
        {
            name: 'left',
            top: targetRect.top + (targetRect.height / 2) - (ttHeight / 2),
            left: targetRect.left - ttWidth - MARGIN,
        },
        // 3. 下方 (Bottom)
        {
            name: 'bottom',
            top: targetRect.bottom + MARGIN,
            left: targetRect.left + (targetRect.width / 2) - (ttWidth / 2),
        },
        // 4. 上方 (Top)
        {
            name: 'top',
            top: targetRect.top - ttHeight - MARGIN,
            left: targetRect.left + (targetRect.width / 2) - (ttWidth / 2),
        },
    ];

    // 依次检查每个位置是否可用
    for (const pos of positions) {
        const proposedRect = { top: pos.top, left: pos.left, width: ttWidth, height: ttHeight };

        // 检查是否超出视窗范围
        const isInViewport =
            proposedRect.top >= 0 &&
            proposedRect.left >= 0 &&
            proposedRect.top + ttHeight <= viewportHeight &&
            proposedRect.left + ttWidth <= viewportWidth;

        if (isInViewport) {
            // 检查是否与障碍物碰撞
            if (!checkCollision(proposedRect, obstacles)) {
                return { top: pos.top, left: pos.left }; // 找到理想位置
            }
        }
    }

    // 如果所有位置都被遮挡或超出范围，回退到第一个位置（右侧）
    return { top: positions[0].top, left: positions[0].left };
}

/**
 * 显示提示框
 * @param {HTMLElement} targetElement - 触发提示的元素
 * @param {string} text - 提示框中显示的文本
 */
export function showTooltip(targetElement, text) {
    clearTimeout(hideTimeout);

    // 懒加载：如果 tooltip 元素不存在，则创建并添加到 DOM
    if (!tooltipElement) {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'text-extractor-tooltip';
        uiContainer.appendChild(tooltipElement);
    }

    // 更新内容
    tooltipElement.textContent = text;

    // 每次显示时都重新计算位置
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    // 获取所有其他的 FAB 按钮作为障碍物
    const obstacles = Array.from(uiContainer.querySelectorAll('.text-extractor-fab'))
        .filter(el => el !== targetElement) // 排除触发提示框的按钮本身
        .map(el => el.getBoundingClientRect());

    const { top, left } = calculateOptimalPosition(targetRect, tooltipRect, obstacles);

    tooltipElement.style.top = `${top}px`;
    tooltipElement.style.left = `${left}px`;

    // 使用 rAF 确保样式更新后再生效 class，触发过渡动画
    requestAnimationFrame(() => {
        tooltipElement.classList.add('is-visible');
    });
}

/**
 * 隐藏提示框
 */
export function hideTooltip() {
    if (!tooltipElement) return;

    tooltipElement.classList.remove('is-visible');
}
