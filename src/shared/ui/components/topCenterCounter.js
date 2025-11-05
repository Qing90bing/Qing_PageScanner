// src/shared/ui/components/topCenterCounter.js
import { uiContainer } from '../uiContainer.js';
import { t } from '../../i18n/index.js';
import { animateCount, easeOutQuad } from '../animations.js';
import { on } from '../../utils/eventBus.js';
import { createHelpIcon } from './helpIcon.js';

let counterElement = null;
let countSpan = null;
let textNode = null;
let helpIcon = null;
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
 * @param {string|null} helpKey - 用于帮助图标内容的i18n键，如果为null则不创建图标
 */
function createCounterElement(labelKey, helpKey) {
    if (counterElement) return;

    counterElement = document.createElement('div');
    counterElement.className = 'tc-top-center-counter';

    currentLabelKey = labelKey;
    textNode = document.createTextNode(t(labelKey));
    countSpan = document.createElement('span');
    countSpan.textContent = '0';

    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);

    if (helpKey) {
        helpIcon = createHelpIcon(helpKey);
        counterElement.appendChild(helpIcon);
    }

    uiContainer.appendChild(counterElement);

    on('languageChanged', updateCounterText);
}

/**
 * 显示并初始化顶部中央计数器
 * @param {Object|string} options - 如果是字符串，则为标签的i18n键。如果是对象，则包含 { labelKey, helpKey }。
 * @param {string} options.labelKey - 用于标签的i18n键。
 * @param {string|null} [options.helpKey=null] - 用于帮助图标内容的i18n键。
 */
export function showTopCenterCounter(options) {
    const { labelKey, helpKey = null } = typeof options === 'string' ? { labelKey: options } : options;

    // 清理旧的帮助图标（如果有）
    if (helpIcon) {
        helpIcon.remove();
        helpIcon = null;
    }

    createCounterElement(labelKey, helpKey);

    // 如果标签键发生变化，则更新它
    if (currentLabelKey !== labelKey) {
        currentLabelKey = labelKey;
        updateCounterText();
    }

    // 如果没有新的helpKey，确保旧的图标被移除
    if (!helpKey && helpIcon) {
        helpIcon.remove();
        helpIcon = null;
    }

    // 如果有新的helpKey，但当前还没有图标，则创建并添加
    if (helpKey && !helpIcon) {
        helpIcon = createHelpIcon(helpKey);
        counterElement.appendChild(helpIcon);
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
