/**
 * 动画地更新一个数字元素
 * @param {HTMLElement} element - 需要更新其 textContent 的DOM元素
 * @param {number} start - 动画的起始数字
 * @param {number} end - 动画的结束数字
 * @param {number} duration - 动画的持续时间（毫秒）
 * @param {(t: number) => number} easing - 缓动函数（例如 (t) => t）
 */
export function animateCount(element, start, end, duration, easing) {
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easing(progress);

        const currentCount = Math.round(start + (end - start) * easedProgress);
        element.textContent = currentCount;

        if (progress < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

/**
 * Ease-out 缓动函数
 * @param {number} t - 进度 (0-1)
 * @returns {number}
 */
export const easeOutQuad = (t) => t * (2 - t);
