/**
 * @module clickOutside
 * @description 通用的“点击外部”检测工具，支持 Shadow DOM 穿透和自定义忽略逻辑。
 */

/**
 * 监听指定元素外部的点击事件。
 * 
 * @param {HTMLElement} element - 需要监听“外部点击”的目标元素（即点击该元素内部不会触发回调）。
 * @param {Function} onClickOutside - 当检测到点击发生在元素外部时调用的回调函数。
 * @param {Object} [options] - 配置选项。
 * @param {AbortSignal} [options.signal] - 可选的 AbortSignal，用于取消监听。
 * @param {Function} [options.shouldIgnore] - 可选的判断函数，接收点击的目标元素，返回 true 则忽略该点击（不触发回调）。
 * @returns {void}
 */
export function listenClickOutside(element, onClickOutside, { signal, shouldIgnore } = {}) {
    // 处理文档级别的点击事件
    // 使用 capture: true 确保能够在事件到达目标之前捕获，防止被 stopPropagation 阻止
    // 但在这个场景下，通常冒泡阶段或者 document 上的捕获阶段都可以。
    // 为了与旧逻辑保持一致并确保稳定性，我们使用 capture: true。

    const handleDocumentClick = (event) => {
        // 如果信号已中止，不论如何都不处理（虽然 addEventListener 会自动处理，但为了保险）
        if (signal?.aborted) return;

        // 1. 获取点击路径 (处理 Shadow DOM 穿透)
        // event.composedPath() 是现代浏览器标准，它能返回从目标到 window 的完整路径，包含 Shadow Roots。
        const path = event.composedPath();

        // 2. 检查点击是否在元素内部
        if (path.includes(element)) {
            return;
        }

        // 3. 检查 Shadow DOM 特殊情况 (如果组件自身在 Shadow DOM 中)
        const root = element.getRootNode();
        if (root instanceof ShadowRoot) {
            // 如果事件来源于 document (Shadow Host 外部的点击)，
            // 但点击的正是 Shadow Host 本身（即组件容器），则也视为内部点击。
            // event.target 在跨越 Shadow boundary 时会重定向为 Host。
            if (event.currentTarget === document && event.target === root.host) {
                return;
            }
        }

        // 4. 执行自定义忽略逻辑 (业务注入点)
        if (shouldIgnore) {
            // 我们检查路径上的每一个元素，看是否满足忽略条件
            // 例如：点击了某个特定的 class 元素
            const shouldIgnoreClick = path.some(node => {
                // node 可能是 document 或 window，需要判断是否为 Element
                return node instanceof Element && shouldIgnore(node);
            });

            if (shouldIgnoreClick) {
                return;
            }
        }

        // 5. 触发回调
        onClickOutside(event);
    };

    const listenerOptions = { capture: true };
    if (signal) {
        listenerOptions.signal = signal;
    }

    document.addEventListener('click', handleDocumentClick, listenerOptions);

    // 如果组件在 Shadow DOM 中，还需要监听 Shadow Root 上的点击
    // 因为 Shadow DOM 内部的点击事件冒泡到 Shadow Root 后，可能不会继续冒泡到 document (取决于 composed: true/false)
    // 或者我们希望更精确地在 Shadow Root 层级捕获。
    const root = element.getRootNode();
    if (root instanceof ShadowRoot) {
        root.addEventListener('click', handleDocumentClick, listenerOptions);
    }
}
