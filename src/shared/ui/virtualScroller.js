// src/shared/ui/virtualScroller.js

/**
 * @module virtualScroller
 * @description 提供一个高性能的虚拟滚动解决方案，用于显示大量数据。
 */

export class VirtualScroller {
    constructor(container, data, options = {}) {
        if (!container || !Array.isArray(data)) {
            throw new Error('Container and data array are required.');
        }

        this.container = container;
        this.data = data;

        // --- 配置 ---
        this.rowHeight = options.rowHeight || 20; // 默认行高
        this.buffer = options.buffer || 10; // 视口上下缓冲的行数

        // --- DOM 结构 ---
        this.sizer = document.createElement('div');
        this.sizer.className = 'ts-virtual-scroll-sizer';

        this.content = document.createElement('div');
        this.content.className = 'ts-virtual-scroll-content';

        this.container.innerHTML = ''; // 清空容器
        this.container.appendChild(this.sizer);
        this.container.appendChild(this.content);

        // --- 状态 ---
        this.renderedItems = {}; // 存储已渲染的 DOM 节点
        this.viewportHeight = 0;
        this.totalHeight = 0;
        this.scrollTop = 0;

        // --- 初始化 ---
        this.container.addEventListener('scroll', this.onScroll.bind(this));
        this.resize();
    }

    onScroll() {
        this.scrollTop = this.container.scrollTop;
        this.render();
    }

    resize() {
        this.viewportHeight = this.container.clientHeight;
        this.totalHeight = this.data.length * this.rowHeight;
        this.sizer.style.height = `${this.totalHeight}px`;
        this.render();
    }

    setData(newData) {
        this.data = newData;
        this.resize();
    }

    render() {
        const startIndex = Math.max(0, Math.floor(this.scrollTop / this.rowHeight) - this.buffer);
        const endIndex = Math.min(this.data.length - 1, Math.ceil((this.scrollTop + this.viewportHeight) / this.rowHeight) + this.buffer);

        const newRenderedItems = {};

        // --- 创建/更新可见行 ---
        for (let i = startIndex; i <= endIndex; i++) {
            const item = this.renderedItems[i];
            if (item) {
                // 复用已存在的节点
                newRenderedItems[i] = item;
            } else {
                // 创建新节点
                const row = document.createElement('div');
                row.className = 'ts-virtual-scroll-row';
                row.style.height = `${this.rowHeight}px`;
                row.style.top = `${i * this.rowHeight}px`;
                row.textContent = this.data[i];
                this.content.appendChild(row);
                newRenderedItems[i] = { element: row };
            }
        }

        // --- 移除不再可见的行 ---
        for (const i in this.renderedItems) {
            if (!newRenderedItems[i]) {
                this.content.removeChild(this.renderedItems[i].element);
            }
        }

        this.renderedItems = newRenderedItems;
    }

    destroy() {
        this.container.removeEventListener('scroll', this.onScroll.bind(this));
        this.container.innerHTML = '';
    }
}
