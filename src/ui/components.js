// src/ui/components.js

/**
 * @module ui/components
 * @description 存放可复用的UI组件生成函数，以减少代码重复并提高UI一致性。
 */

/**
 * @public
 * @param {string} id - 复选框 input 元素的 id。
 * @param {string} label - 复选框的显示标签文本。
 * @param {boolean} isChecked - 复选框的初始选中状态。
 * @returns {string} - 代表一个完整复选框组件的 HTML 字符串。
 * @description 创建一个带有自定义标签和样式的复选框 HTML 结构。
 * 这个结构兼容 settingsPanel.js 中使用的样式。
 */
export function createCheckbox(id, label, isChecked) {
  return `
    <label class="checkbox-group" for="${id}">${label}
      <input type="checkbox" id="${id}" ${isChecked ? 'checked' : ''}>
      <span class="checkmark"></span>
    </label>
  `;
}
