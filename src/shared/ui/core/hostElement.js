/**
 * @module HostElement
 * @description 负责创建和管理 UI 宿主元素 (Container)，处理 DOM 挂载、样式及 Top Layer 防遮挡逻辑。
 */

/**
 * @function updateScrollbarWidth
 * @description 计算浏览器滚动条的宽度，并将其作为一个CSS自定义属性 `--scrollbar-width` 应用到UI容器上。
 * @param {HTMLElement} container - UI容器元素。
 */
export function updateScrollbarWidth(container) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    container.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

/**
 * @function createHostElement
 * @description 创建基础的 UI 容器元素。
 * @returns {HTMLElement}
 */
export function createHostElement() {
    const container = document.createElement('div');
    container.id = 'text-extractor-container';

    // --- Popover API 检测 ---
    const supportsPopover = Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');
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

    return container;
}

/**
 * @function attachToBody
 * @description 将容器挂载到 document.body。
 * @param {HTMLElement} container
 */
export function attachToBody(container) {
    if (document.body && !container.isConnected) {
        document.body.appendChild(container);
        if (container.popover === 'manual') {
            try {
                container.showPopover();
            } catch {
                // 浏览器可能支持属性但拒绝当前时机的 Top Layer 操作。
            }
        }
    }
}

/**
 * @class TopLayerManager
 * @description 管理“强制置顶”逻辑，防止被其他 Dialog/Popover 遮挡。
 */
export class TopLayerManager {
    constructor(container) {
        this.container = container;
        this.supportsPopover = container.popover === 'manual';
        this.promoteTimeout = null;
    }

    /**
     * @description 当检测到冲突时，重新提升容器层级。
     */
    rePromote() {
        if (!this.supportsPopover) return;
        if (this.promoteTimeout) clearTimeout(this.promoteTimeout);

        this.promoteTimeout = setTimeout(() => {
            this.promoteTimeout = null;
            if (!this.container.isConnected) return;

            // 1. 尝试隐藏 Popover (清理 Top Layer 状态)
            try {
                this.container.hidePopover();
            } catch {
                // 隐藏失败时继续执行回流和后续提升尝试。
            }

            // 2. 强制浏览器回流 (Reflow)
            void this.container.offsetHeight;

            // 3. 异步重新显示
            requestAnimationFrame(() => {
                if (!this.container.isConnected) return;
                try {
                    // 再次显示 (推入 Top Layer 栈顶)
                    // 保持宿主节点连接，避免网站交互导致后代 CSS 动画重新播放。
                    this.container.showPopover();
                } catch {
                    // 页面状态变化时重新显示可能失败，下一次观察到变化时再尝试。
                }
            });
        }, 100);
    }
}
