// src/shared/ui/mainModal/lineNumberLogic.js

/**
 * @module lineNumberLogic
 * @description 封装主模态框文本区域的行号计算和更新逻辑。
 */

import * as state from './modalState.js';

/**
 * @description 根据光标位置更新活动行号的样式 (已简化)。
 * 在虚拟滚动视图中，这个功能的作用有限，但我们保留基础逻辑。
 */
export function updateActiveLine() {
    // 这个功能在虚拟滚动环境下需要更复杂的实现，暂时留空或简化
}

/**
 * @description 根据给定的总行数更新行号的显示。
 * @param {number} lineCount - 要显示的总行数。
 */
export function updateLineNumbers(lineCount = 0) {
    if (!state.lineNumbersDiv) return;

    // 为了性能，我们不直接渲染所有行号，
    // 而是依赖于与虚拟滚动容器同步滚动。
    // 这里我们只设置一个占位符高度，让滚动条正确显示。
    // 实际的行号将由虚拟滚动逻辑（如果需要的话）或CSS计数器处理。
    // 为简单起见，我们暂时只渲染前1000行以提供视觉反馈。

    const fragment = document.createDocumentFragment();
    const numToRender = Math.min(lineCount, 1000); // 限制渲染的DOM元素数量

    for (let i = 1; i <= numToRender; i++) {
        const div = document.createElement('div');
        div.textContent = i;
        fragment.appendChild(div);
    }
    state.lineNumbersDiv.replaceChildren(fragment);

    // 更新 sizer div 的高度以匹配总行数
    const sizer = state.lineNumbersDiv.querySelector('.ts-line-number-sizer');
    if (sizer) {
        sizer.style.height = `${lineCount * 20}px`; // 假设行高为20px
    }
}

/**
 * @description 初始化行号功能。
 */
export function initializeLineNumbers() {
    if (!state.lineNumbersDiv) return;

    // 添加一个 sizer div 来模拟总高度，以实现同步滚动
    const sizer = document.createElement('div');
    sizer.className = 'ts-line-number-sizer';
    sizer.style.position = 'relative';
    sizer.style.width = '1px';
    state.lineNumbersDiv.appendChild(sizer);

    // 移除旧的依赖于 textarea 的 resize observer
}
