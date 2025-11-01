// src/shared/ui/uiContainer.js

/**
 * @function updateScrollbarWidth
 * @description 计算浏览器滚动条的宽度，并将其作为一个CSS自定义属性 `--scrollbar-width` 应用到UI容器上。
 * @param {HTMLElement} container - UI容器元素。
 */
function updateScrollbarWidth(container) {
    // 关键：滚动条宽度 = 整个窗口的宽度 - 客户端区域（即可见区域）的宽度
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // 将计算出的宽度（例如 '17px'）设置为容器的CSS变量
    container.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

/**
 * @function createUIContainer
 * @description 创建一个用于承载所有脚本UI的容器元素，并为其附加一个Shadow DOM。
 * 这样做可以完全隔离UI的样式和行为，防止被所在页面的CSS污染。
 * @returns {ShadowRoot} 返回创建好的Shadow DOM的根节点，所有UI元素都应被添加到此节点下。
 */
function createUIContainer() {
    const container = document.createElement('div');
    container.id = 'text-extractor-container';
    document.body.appendChild(container);

    // --- 滚动条宽度计算 ---
    // 初始计算一次
    updateScrollbarWidth(container);
    // 监听窗口大小变化，以便在滚动条出现/消失时重新计算
    window.addEventListener('resize', () => updateScrollbarWidth(container));

    const shadowRoot = container.attachShadow({ mode: 'open' });

    return shadowRoot;
}

// 创建并导出一个单例，确保整个脚本只使用一个UI容器。
export const uiContainer = createUIContainer();
