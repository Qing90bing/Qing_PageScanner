// src/shared/ui/uiContainer.js

/**
 * 创建一个用于承载所有脚本UI的容器元素，并为其附加一个Shadow DOM。
 * 这样做可以完全隔离UI的样式和行为，防止被所在页面的CSS污染。
 * @returns {ShadowRoot} 返回创建好的Shadow DOM的根节点，所有UI元素都应被添加到此节点下。
 */
function createUIContainer() {
  const container = document.createElement('div');
  container.id = 'text-extractor-container';
  document.body.appendChild(container);

  const shadowRoot = container.attachShadow({ mode: 'open' });

  return shadowRoot;
}

// 创建并导出一个单例，确保整个脚本只使用一个UI容器。
export const uiContainer = createUIContainer();
