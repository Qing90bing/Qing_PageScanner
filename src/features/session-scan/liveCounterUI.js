// src/features/session-scan/liveCounterUI.js
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { t } from '../../shared/i18n/index.js';
import { animateCount, easeOutQuad } from '../../shared/ui/animations.js';
import { on } from '../../shared/utils/eventBus.js';

let counterElement = null;
let countSpan = null; // 用于存放数字的 span 元素
let textNode = null; // 用于存放文本节点
let currentCount = 0; // 用于跟踪当前显示的计数值

/**
 * 更新计数器的文本标签以匹配当前语言
 */
function updateCounterText() {
    if (textNode) {
        textNode.textContent = t('common.discovered');
    }
}


/**
 * 创建计数器的DOM元素（如果尚不存在）
 */
function createCounterElement() {
    if (counterElement) return;

    counterElement = document.createElement('div');
    counterElement.className = 'tc-live-counter';

    textNode = document.createTextNode(t('common.discovered'));
    countSpan = document.createElement('span');
    countSpan.textContent = '0';

    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);
    uiContainer.appendChild(counterElement);

    // 监听语言变化事件以更新文本
    on('languageChanged', updateCounterText);
}

/**
 * 显示并初始化实时计数器
 */
export function showLiveCounter() {
    createCounterElement();

    // 重置状态：立即将计数设置为0，不使用动画
    currentCount = 0;
    if (countSpan) {
        countSpan.textContent = '0';
    }

    // 触发进入动画
    requestAnimationFrame(() => {
        counterElement.classList.add('tc-live-counter-visible');
    });
}

/**
 * 隐藏并移除实时计数器
 */
export function hideLiveCounter() {
    if (!counterElement) return;

    // 触发退出动画
    counterElement.classList.remove('tc-live-counter-visible');
}

/**
 * 更新实时计数器的数值
 * @param {number} newCount - 新的计数值
 */
export function updateLiveCounter(newCount) {
    if (!counterElement || !countSpan) return;

    const start = currentCount;
    const end = newCount;
    currentCount = newCount; // 立即更新当前计数值

    // 如果起始值和结束值相同，则无需动画
    if (start === end) {
        countSpan.textContent = end;
        return;
    }

    // 动画持续时间可以根据数值差异动态调整，以获得更好的效果
    const duration = 500 + Math.min(Math.abs(end - start) * 10, 1000);

    animateCount(countSpan, start, end, duration, easeOutQuad);
}