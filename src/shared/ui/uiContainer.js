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

    // --- 终极模拟 F12：焦点锁定与事件隐形 (Focus Locking & Event Stealth) ---
    // 目标：让网页“感觉”不到焦点离开了原来的元素，就像点击了 F12 工具栏一样。

    // 1. 焦点恢复机制
    // 当检测到点击发生在脚本 UI 且不是输入框时，我们不仅阻止默认行为，
    // 还要主动检查焦点是否意外丢失，并强制恢复。
    const restoreFocus = (originalElement) => {
        // 使用 setTimeout 让浏览器先完成当前的焦点切换流程
        setTimeout(() => {
            const current = document.activeElement;
            // 如果焦点跑到了 body 或跑到了我们的容器上（Shadow Host），且原元素还在 document 里
            if ((current === document.body || current === container) && 
                originalElement && originalElement.isConnected) {
                
                // 强制将焦点还给原来的元素 (例如下拉菜单的 Trigger)
                try {
                    originalElement.focus();
                } catch (err) {
                    // 忽略 focus 可能的错误
                }
            }
        }, 0);
    };

    // 2. 全局捕获拦截 (Capture Phase) - 隐形悬浮
    // 拦截 mouseout/mouseleave 等事件，防止网页因为鼠标移入脚本UI而认为“鼠标离开了菜单”。
    const handleGlobalCapture = (e) => {
        let shouldBlock = false;

        // 情况 A: 事件目标是脚本 UI (e.target)
        // 针对 pointerdown, focusin 等，如果目标是脚本，说明用户在与脚本交互，
        // 我们要阻止网页知道这件事。
        // Fix: 检查 e.target 是否为 Node，防止 window blur 事件导致 TypeError
        if (e.target === container || (e.target instanceof Node && container.contains(e.target))) {
            // 注意：不要拦截 mousedown/click，否则 input 无法输入。
            // 这些事件会在 Internal Bubble 阶段处理。
            if (['pointerdown', 'pointerup', 'touchstart', 'touchend', 'focusin', 'focusout'].includes(e.type)) {
                shouldBlock = true;
            }
        }
        
        // 情况 B: 事件关联目标是脚本 UI (e.relatedTarget)
        // 针对 mouseout, mouseleave, blur, focusout 等离开型事件。
        // 如果用户从网页元素“离开”并“进入”了脚本 UI (relatedTarget)，
        // 我们要阻止这个“离开”事件通知网页，让网页以为鼠标/焦点还在原地。
        // 注意：e.relatedTarget 如果是 Shadow Host，说明进入了 Shadow DOM。
        // Fix: 检查 e.relatedTarget 是否为 Node
        if (e.relatedTarget && (e.relatedTarget === container || (e.relatedTarget instanceof Node && container.contains(e.relatedTarget)))) {
            // 拦截所有离开型事件，如果它们是因为进入我们的 UI 而触发的。
            shouldBlock = true;
        }

        if (shouldBlock) {
            // 直接扼杀事件
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    };

    const captureEvents = [
        // 交互开始 (仅拦截 Pointer/Touch/Focus，不拦截 Mouse/Click)
        'pointerdown', 'pointerup', 'touchstart', 'touchend',
        'focusin', 'focusout', 
        // 离开事件 (关键：防止菜单因鼠标移出而关闭)
        'mouseout', 'mouseleave', 'pointerout', 'pointerleave', 'blur'
    ];

    captureEvents.forEach(evt => window.addEventListener(evt, handleGlobalCapture, { capture: true }));

    // 使用 closed 模式以提供更强的 DOM 隔离
    // 这使得外部网页代码无法通过 element.shadowRoot 获取我们的内部结构。
    const shadowRoot = container.attachShadow({ mode: 'closed' });

    // --- 内部事件隔离 (Internal Event Isolation) ---
    // 关键修正：我们将监听器直接附加到 shadowRoot 上，而不是外部的 container。
    // 在 closed 模式下，只有在这里我们才能访问到真实的 target（如内部的 input 或 button）。
    // 这允许我们正确地判断是否需要阻止默认行为（焦点锁定），同时阻止事件冒泡出 Shadow DOM。
    
    const handleInternalBubble = (e) => {
        // 1. 阻止事件冒泡出 Shadow Root
        // 这意味着宿主元素 (container) 甚至不会收到这些事件的冒泡，
        // 自然也就不会冒泡到 document/window。
        e.stopPropagation();
        
        // 阻止当前层级的其他监听器（防御性编程）
        e.stopImmediatePropagation();

        // 2. 焦点锁定逻辑 (Focus Locking)
        // 仅在 mousedown 时执行，防止浏览器将焦点从网页元素移走。
        if (e.type === 'mousedown') {
            // 在 ShadowRoot 监听器中，e.target 指向 Shadow DOM 内部的真实目标
            const target = e.target;
            const tagName = target.tagName;
            
            // 正确识别内部的 Input 元素
            const isInput = tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target.isContentEditable;
            const isLabel = tagName === 'LABEL';

            if (!isInput && !isLabel) {
                // A. 记录当前焦点 (应该是网页上的某个元素，如菜单 Trigger)
                const originalFocus = document.activeElement;
                
                // B. 阻止默认行为 (Prevent Default Focus Shift)
                e.preventDefault();
                
                // C. 双重保险：强制恢复焦点
                restoreFocus(originalFocus);
            }
        }
    };

    const bubbleEvents = [
        'click', 'dblclick', 'contextmenu', 'mouseup', 'mousedown',
        'keydown', 'keyup', 'keypress',
        // 我们也拦截 pointer/focus 事件的冒泡，以防网页监听 bubble 阶段
        'pointerdown', 'pointerup', 'touchstart', 'touchend', 'focusin', 'focusout'
    ];

    bubbleEvents.forEach(evt => {
        // 在 Shadow Root 上监听
        shadowRoot.addEventListener(evt, handleInternalBubble, { capture: false });
    });
    
    // 我们必须手动保存 shadowRoot 引用，因为 closed 模式下 container.shadowRoot 为 null
    // 幸运的是，我们的架构已经直接返回并导出了 shadowRoot 实例。
    return shadowRoot;
}

export const uiContainer = createUIContainer();
