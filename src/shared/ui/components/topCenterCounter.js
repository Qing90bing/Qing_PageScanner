// src/shared/ui/components/topCenterCounter.js
import { t } from '../../i18n/index.js';
import { animateCount, easeOutQuad } from '../../utils/dom/animations.js';
import { on } from '../../utils/core/eventBus.js';

/**
 * @file 提供了创建和管理顶部中央计数器UI组件的功能。
 * @description
 * 该模块遵循工厂模式，导出一个 `createTopCenterCounter` 函数。
 * 此函数创建了一个独立的、自包含的计数器DOM元素，但不负责将其附加到页面中。
 * 这种解耦的设计允许调用方完全控制组件的生命周期（何时何地附加、动画和销毁），
 * 从而实现了高度的可复用性和灵活性。
 */


/**
 * @public
 * @function createTopCenterCounter
 * @description 创建并返回一个新的计数器DOM元素。
 * 该元素是完全独立的，包含了所有必要的子元素和逻辑，但并未附加到DOM中。
 * @param {string} labelKey - 用于计数器文本标签的i18n键。
 * @returns {HTMLElement} - 返回一个配置好的 `div` 元素。
 * 该元素附加了一个 `.destroy()` 方法，用于在元素被移除时清理其内部的事件监听器，防止内存泄漏。
 */
export function createTopCenterCounter(labelKey) {
    const counterElement = document.createElement('div');
    counterElement.className = 'tc-top-center-counter';

    const textNode = document.createTextNode(t(labelKey));
    const countSpan = document.createElement('span');
    countSpan.textContent = '0'; // 初始值为0

    // 将关键的子节点直接附加到元素实例上，以便 `updateTopCenterCounter` 函数可以轻松访问它们。
    // 这是一种避免使用全局变量或闭包来维护状态的简洁方法。
    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);
    counterElement._countSpan = countSpan;

    // 定义并订阅语言变更事件，以便在用户切换语言时自动更新文本标签。
    const languageChangeHandler = () => {
        textNode.textContent = t(labelKey);
    };
    // eventBus.on() 返回一个取消订阅的函数。
    const unsubscribe = on('languageChanged', languageChangeHandler);

    /**
     * @memberof HTMLElement
     * @function destroy
     * @description 清理与此计数器实例相关的资源，主要是语言变更的事件监听器。
     * 调用方有责任在从DOM中移除此元素之前调用此方法。
     */
    counterElement.destroy = () => {
        unsubscribe(); // 调用此函数来移除事件监听器。
    };

    return counterElement;
}

/**
 * @public
 * @function updateTopCenterCounter
 * @description 使用平滑的动画更新指定计数器元素的数值。
 * @param {HTMLElement} element - 由 `createTopCenterCounter` 创建的目标计数器元素。
 * @param {number} newCount - 要显示的新计数值。
 */
export function updateTopCenterCounter(element, newCount) {
    // 确保传入的元素是有效的，并且包含我们需要的 `_countSpan` 子元素引用。
    if (!element || !element._countSpan) return;

    const countSpan = element._countSpan;
    // 关键修复：直接从DOM读取当前显示的数值作为动画的起始点。
    // 这消除了对模块级`currentCount`变量的依赖，使组件变为无状态。
    const start = parseInt(countSpan.textContent, 10) || 0;
    const end = newCount;

    // 如果数值没有变化，则直接设置文本并返回，以避免不必要的动画。
    if (start === end) {
        countSpan.textContent = String(end);
        return;
    }

    // 动画的持续时间根据数值变化的幅度动态调整，以获得更自然的效果。
    const duration = 500 + Math.min(Math.abs(end - start) * 10, 1000);
    animateCount(countSpan, start, end, duration, easeOutQuad);
}
