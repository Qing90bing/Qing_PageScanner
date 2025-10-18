// src/ui/components/liveCounter.js

let counterElement = null;

/**
 * 创建计数器的DOM元素（如果尚不存在）
 */
function createCounterElement() {
    if (counterElement) return;

    counterElement = document.createElement('div');
    counterElement.className = 'tc-live-counter';
    document.body.appendChild(counterElement);
}

/**
 * 显示并初始化实时计数器
 */
export function showLiveCounter() {
    createCounterElement();
    // 触发进入动画
    requestAnimationFrame(() => {
        counterElement.classList.add('tc-live-counter-visible');
    });
    updateLiveCounter(0); // 初始值为0
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
 * @param {number} count - 当前提取到的文本数量
 */
export function updateLiveCounter(count) {
    if (!counterElement) return;

    // 清空现有内容
    while (counterElement.firstChild) {
        counterElement.removeChild(counterElement.firstChild);
    }

    const textNode = document.createTextNode('已发现：');
    const countSpan = document.createElement('span');
    countSpan.textContent = count;

    counterElement.appendChild(textNode);
    counterElement.appendChild(countSpan);
}
