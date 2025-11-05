// src/shared/ui/components/topCenterCounter.js
import { uiContainer } from '../uiContainer.js';
import { t } from '../../i18n/index.js';
import { animateCount, easeOutQuad } from '../animations.js';
import { on } from '../../utils/eventBus.js';

let counterElement = null;
let countSpan = null;
let textNode = null;
let currentCount = 0;
let currentLabelKey = '';

/**
 * 更新计数器的文本标签以匹配当前语言
 */
function updateCounterText() {
    if (textNode && currentLabelKey) {
        textNode.textContent = t(currentLabelKey);
    }
}

/**
 * 创建计数器的DOM元素（如果尚不存在）
 * @param {string} labelKey - 用于标签的i18n键
 */
function createCounterElement(labelKey) {
    if (counterElement) return;

    counterElement = document.createElement('div');
    counterElement.className = 'tc-top-center-counter';

    currentLabelKey = labelKey;
    textNode = document.createTextNode(t(labelKey));
    countSpan = document.createElement('span');
    countSpan.textContent = '0';

    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);
    uiContainer.appendChild(counterElement);

    on('languageChanged', updateCounterText);
}

/**
 * 显示并初始化顶部中央计数器
 * @param {string} labelKey - 用于标签的i18n键
 */
export function showTopCenterCounter(labelKey) {
    createCounterElement(labelKey);

    // 如果标签键发生变化，则更新它
    if (currentLabelKey !== labelKey) {
        currentLabelKey = labelKey;
        updateCounterText();
    }

    currentCount = 0;
    if (countSpan) {
        countSpan.textContent = '0';
    }

    requestAnimationFrame(() => {
        counterElement.classList.add('is-visible');
    });
}

/**
 * 隐藏并移除顶部中央计数器
 */
export function hideTopCenterCounter() {
    if (!counterElement) return;

    counterElement.classList.remove('is-visible');

    // After the transition, remove the element from the DOM
    const transitionDuration = 400; // Should match the CSS transition duration
    setTimeout(() => {
        if (counterElement) {
            counterElement.remove();
            counterElement = null;
        }
    }, transitionDuration);
}

/**
 * 更新顶部中央计数器的数值
 * @param {number} newCount - 新的计数值
 */
export function updateTopCenterCounter(newCount) {
    if (!counterElement || !countSpan) return;

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
