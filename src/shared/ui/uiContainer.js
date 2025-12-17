// src/shared/ui/uiContainer.js

/**
 * @function updateScrollbarWidth
 * @description 计算浏览器滚动条的宽度，并将其作为一个CSS自定义属性 `--scrollbar-width` 应用到UI容器上。
 * @param {HTMLElement} container - UI容器元素。
 */
function updateScrollbarWidth(container) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    container.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

/**
 * @function createUIContainer
 * @description 创建一个用于承载所有脚本UI的容器元素，并为其附加一个Shadow DOM。
 * 包含“强制置顶”逻辑，以应对网页使用 Top Layer (dialog/popover) 导致的遮挡问题。
 * @returns {ShadowRoot} 返回创建好的Shadow DOM的根节点。
 */
function createUIContainer() {
    const container = document.createElement('div');
    container.id = 'text-extractor-container';

    // --- Popover API 检测 ---
    const supportsPopover = HTMLElement.prototype.hasOwnProperty('popover');
    if (supportsPopover) {
        container.popover = 'manual';
    }

    // --- 基础样式 ---
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '0';
    container.style.zIndex = '2147483647';
    container.style.pointerEvents = 'none';

    // --- Popover 样式覆盖 ---
    container.style.backgroundColor = 'transparent';
    container.style.border = 'none';
    container.style.margin = '0';
    container.style.padding = '0';
    container.style.overflow = 'visible';

    // --- 强制置顶逻辑 (Re-promote) ---
    // 当检测到其他元素进入 Top Layer 时，通过“移除-再追加”的方式刷新我们的顺序。
    let promoteTimeout = null;
    const rePromoteToTop = () => {
        if (promoteTimeout) clearTimeout(promoteTimeout);

        promoteTimeout = setTimeout(() => {
            if (!container.isConnected || !supportsPopover) return;

            // 1. 尝试隐藏 Popover (清理 Top Layer 状态)
            try {
                container.hidePopover();
            } catch (e) {
                // 如果已经是 hidden 状态，忽略
            }

            // 2. 强制浏览器回流 (Reflow)，确保状态更新
            void container.offsetHeight;

            // 3. 异步重新显示
            // 使用 requestAnimationFrame 确保在下一帧执行，避免浏览器合并操作
            requestAnimationFrame(() => {
                try {
                    // 物理移动 DOM 节点 (确保在 DOM 顺序中也是最后的，虽然对 Top Layer 不是必须的，但有备无患)
                    if (container.parentElement === document.body) {
                        document.body.removeChild(container);
                    } else if (container.parentElement) {
                        container.remove();
                    }
                    document.body.appendChild(container);

                    // 再次显示 (推入 Top Layer 栈顶)
                    container.showPopover();
                } catch (e) {
                    // 忽略错误
                }
            });
        }, 100); // 增加延迟到 100ms，以确保在复杂的弹窗动画后执行
    };

    // --- 挂载逻辑 ---
    // 始终挂载到 document.body 以确保最大的兼容性和层级控制
    const attachToBody = () => {
        if (document.body && !container.isConnected) {
            document.body.appendChild(container);
            if (supportsPopover) {
                try { container.showPopover(); } catch (e) {}
            }
        }
    };

    // 1. 初始挂载
    if (document.body) {
        attachToBody();
    } else {
        document.addEventListener('DOMContentLoaded', attachToBody);
    }

    // 2. 深度观察者 (Persistent Watcher)
    const observer = new MutationObserver((mutations) => {
        let needsReattach = false;
        let potentialOcclusion = false;

        for (const mutation of mutations) {
            // 检查自身是否被移除
            if (mutation.type === 'childList') {
                for (const node of mutation.removedNodes) {
                    if (node === container) {
                        needsReattach = true;
                    }
                }

                // 检查是否有新的 Top Layer 候选者加入
                if (!needsReattach) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1 && node !== container) {
                            const tagName = node.tagName;
                            if (tagName === 'DIALOG' || node.hasAttribute('popover')) {
                                potentialOcclusion = true;
                            }
                        }
                    }
                }
            }

            // 检查现有元素的属性变化
            if (mutation.type === 'attributes' && mutation.target !== container) {
                const tagName = mutation.target.tagName;
                if (tagName === 'DIALOG' && mutation.attributeName === 'open' && mutation.target.hasAttribute('open')) {
                    potentialOcclusion = true;
                }
            }
        }

        if (needsReattach) {
            attachToBody();
        } else if (potentialOcclusion && supportsPopover) {
            rePromoteToTop();
        }
    });

    if (document.body) {
         observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['open', 'popover']
        });
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['open', 'popover']
            });
        });
    }

    // --- 滚动条宽度计算 ---
    updateScrollbarWidth(container);
    window.addEventListener('resize', () => updateScrollbarWidth(container));

    const shadowRoot = container.attachShadow({ mode: 'open' });
    return shadowRoot;
}

export const uiContainer = createUIContainer();
