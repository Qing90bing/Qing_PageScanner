/**
 * @module EventIsolator
 * @description 负责事件的隔离与拦截（隐形模式），防止网页感知到脚本 UI 的存在。
 */

/**
 * @class EventIsolator
 */
export class EventIsolator {
    constructor(container) {
        this.container = container;
        this.shadowRoot = container.attachShadow({ mode: 'closed' });
        this.handleGlobalCapture = this.handleGlobalCapture.bind(this);
    }

    /**
     * @returns {ShadowRoot}
     */
    getShadowRoot() {
        return this.shadowRoot;
    }

    /**
     * @description 模拟 F12：焦点锁定与事件隐形。
     */
    handleGlobalCapture(e) {
        let shouldBlock = false;

        // 情况 A: 事件目标是脚本 UI (e.target)
        if (e.target === this.container || (e.target instanceof Node && this.container.contains(e.target))) {
            if (['pointerdown', 'pointerup', 'touchstart', 'touchend', 'focusin', 'focusout'].includes(e.type)) {
                shouldBlock = true;
            }
        }

        // 情况 B: 事件关联目标是脚本 UI (e.relatedTarget)
        if (
            e.relatedTarget &&
            (e.relatedTarget === this.container ||
                (e.relatedTarget instanceof Node && this.container.contains(e.relatedTarget)))
        ) {
            shouldBlock = true;
        }

        if (shouldBlock) {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    }

    /**
     * @description 焦点恢复机制
     */
    restoreFocus(originalElement) {
        setTimeout(() => {
            const current = document.activeElement;
            if (
                (current === document.body || current === this.container) &&
                originalElement &&
                originalElement.isConnected
            ) {
                try {
                    originalElement.focus();
                } catch {
                    // 元素可能已被宿主页面移除，焦点恢复失败时无需打断当前事件。
                }
            }
        }, 0);
    }

    /**
     * @description 设置内部 Shadow DOM 的事件拦截
     */
    setupInternalIsolation() {
        const handleInternalBubble = (e) => {
            // 1. 阻止事件冒泡出 Shadow Root
            e.stopPropagation();
            e.stopImmediatePropagation();

            // 2. 焦点锁定逻辑 (仅 mousedown)
            if (e.type === 'mousedown') {
                const target = e.target;
                const tagName = target.tagName;
                const isInput =
                    tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target.isContentEditable;
                const isLabel = tagName === 'LABEL';

                if (!isInput && !isLabel) {
                    const originalFocus = document.activeElement;
                    e.preventDefault();
                    this.restoreFocus(originalFocus);
                }
            }
        };

        const bubbleEvents = [
            'click',
            'dblclick',
            'contextmenu',
            'mouseup',
            'mousedown',
            'keydown',
            'keyup',
            'keypress',
            'pointerdown',
            'pointerup',
            'touchstart',
            'touchend',
            'focusin',
            'focusout',
        ];

        bubbleEvents.forEach((evt) => {
            this.shadowRoot.addEventListener(evt, handleInternalBubble, { capture: false });
        });
    }

    /**
     * @description 挂载全局捕获监听器
     */
    attachGlobalListeners() {
        const captureEvents = [
            'pointerdown',
            'pointerup',
            'touchstart',
            'touchend',
            'focusin',
            'focusout',
            'mouseout',
            'mouseleave',
            'pointerout',
            'pointerleave',
            'blur',
        ];
        captureEvents.forEach((evt) => window.addEventListener(evt, this.handleGlobalCapture, { capture: true }));
    }

    /**
     * @description 移除全局捕获监听器
     */
    detachGlobalListeners() {
        const captureEvents = [
            'pointerdown',
            'pointerup',
            'touchstart',
            'touchend',
            'focusin',
            'focusout',
            'mouseout',
            'mouseleave',
            'pointerout',
            'pointerleave',
            'blur',
        ];
        captureEvents.forEach((evt) => window.removeEventListener(evt, this.handleGlobalCapture, { capture: true }));
    }
}
