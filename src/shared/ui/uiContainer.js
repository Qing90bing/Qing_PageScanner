// src/shared/ui/uiContainer.js

import { createHostElement, attachToBody, updateScrollbarWidth, TopLayerManager } from './core/hostElement.js';
import { EventIsolator } from './core/eventIsolator.js';
import { LifecycleManager } from './core/lifecycleManager.js';

/**
 * @function createUIContainer
 * @description 创建并管理 UI 容器。
 * 重构后，此函数主要负责组装各个核心模块：
 * 1. HostElement: 负责 DOM 节点与样式。
 * 2. EventIsolator: 负责事件隐形与焦点管理。
 * 3. LifecycleManager: 负责资源（监听器、观察者）的申请与释放。
 */
function createUIContainer() {
    // 1. 创建基础 DOM 结构
    const container = createHostElement();
    const topLayerMgr = new TopLayerManager(container);

    // 2. 初始化事件隔离器 (Shadow DOM & Internal Events)
    const isolator = new EventIsolator(container);
    isolator.setupInternalIsolation();

    // 3. 定义 Resize 处理函数
    const resizeHandler = () => updateScrollbarWidth(container);

    // 4. 定义 MutationObserver 逻辑 (整合胶水代码)
    // 观察者负责两件事：
    // A. 确保容器不被移除 (Persistence)
    // B. 检测其他元素的 Top Layer 状态并触发重新提升 (Anti-Occlusion)
    const observerCallback = (mutations) => {
        let needsReattach = false;
        let potentialOcclusion = false;

        for (const mutation of mutations) {
            // A. 检查自身是否被移除
            if (mutation.type === 'childList') {
                for (const node of mutation.removedNodes) {
                    if (node === container) {
                        needsReattach = true;
                    }
                }
                // B. 检查是否有新的 Top Layer 候选者加入
                if (!needsReattach) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1 && node !== container) {
                            if (node.tagName === 'DIALOG' || node.hasAttribute('popover')) {
                                potentialOcclusion = true;
                            }
                        }
                    }
                }
            }
            // C. 检查现有元素的属性变化 (如 dialog.open)
            if (mutation.type === 'attributes' && mutation.target !== container) {
                if (
                    mutation.target.tagName === 'DIALOG' &&
                    mutation.attributeName === 'open' &&
                    mutation.target.hasAttribute('open')
                ) {
                    potentialOcclusion = true;
                }
            }
        }

        if (needsReattach) {
            attachToBody(container);
        } else if (potentialOcclusion) {
            topLayerMgr.rePromote();
        }
    };

    const observer = new MutationObserver(observerCallback);

    // 5. 定义生命周期回调
    const onConnect = () => {
        // A. 确保挂载
        attachToBody(container);

        // B. 启动 Observer
        const startObserver = () => {
            if (document.body) {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['open', 'popover'],
                });
            }
        };

        if (document.body) {
            startObserver();
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                attachToBody(container);
                startObserver();
            });
        }

        // C. 启动隐形模式 (Capture Listeners)
        isolator.attachGlobalListeners();

        // D. 启动 Resize 监听
        updateScrollbarWidth(container);
        window.addEventListener('resize', resizeHandler);

        // console.log('[UIContainer] Connected & listeners active.');
    };

    const onDisconnect = () => {
        observer.disconnect();
        isolator.detachGlobalListeners();
        window.removeEventListener('resize', resizeHandler);
        // console.log('[UIContainer] Disconnected & resources freed.');
    };

    // 6. 初始化生命周期管理器
    const lifecycle = new LifecycleManager({ onConnect, onDisconnect });

    // 默认保持连接 (兼容旧逻辑)，但允许外部通过 acquire/release 管理
    lifecycle.acquire();

    // 7. 导出接口
    // 我们返回 ShadowRoot 作为主入口，并将生命周期控制器挂载在其上
    const shadowRoot = isolator.getShadowRoot();
    shadowRoot.lifecycle = lifecycle;

    return shadowRoot;
}

export const uiContainer = createUIContainer();
export const uiLifecycle = uiContainer.lifecycle;
