// src/shared/ui/components/topCenterCounter.js
import { t } from '../../i18n/index.js';
import { animateCount, easeOutQuad } from '../animations.js';
import { on } from '../../utils/eventBus.js';

let currentCount = 0; // 模块级变量，用于动画的起始值

/**
 * 创建并返回一个新的计数器DOM元素，但不附加到DOM中。
 * @param {string} labelKey - 用于标签的i18n键。
 * @returns {HTMLElement} - 创建的计数器元素。
 */
export function createTopCenterCounter(labelKey) {
    const counterElement = document.createElement('div');
    counterElement.className = 'tc-top-center-counter';

    const textNode = document.createTextNode(t(labelKey));
    const countSpan = document.createElement('span');
    countSpan.textContent = '0';

    // 将关键节点附加到元素上，以便以后可以轻松找到它们
    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);
    counterElement._countSpan = countSpan; // 附加引用以便 update 函数可以找到它
    counterElement._textNode = textNode; // 附加引用以便语言更改可以更新它
    counterElement._labelKey = labelKey; // 存储 i18n 键

    const languageChangeHandler = () => {
        textNode.textContent = t(labelKey);
    };

    // on() 函数返回一个取消订阅的函数，我们将其存储起来
    const unsubscribe = on('languageChanged', languageChangeHandler);

    // 附加一个销毁方法，用于在元素被移除时清理事件监听器
    counterElement.destroy = () => {
        unsubscribe();
    };

    return counterElement;
}

/**
 * 更新指定计数器元素的数值。
 * @param {HTMLElement} element - 目标计数器元素。
 * @param {number} newCount - 新的计数值。
 */
export function updateTopCenterCounter(element, newCount) {
    if (!element || !element._countSpan) return;

    const countSpan = element._countSpan;
    const start = currentCount;
    const end = newCount;
    currentCount = newCount;

    if (start === end) {
        countSpan.textContent = end;
        return;
    }

    const duration = 500 + Math.min(Math.abs(end - start) * 10, 1000);
    animateCount(countSpan, start, end, duration, easeOutQuad);
}
