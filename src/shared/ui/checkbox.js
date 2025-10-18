// src/shared/ui/checkbox.js

/**
 * @public
 * @param {string} id - 复选框 input 元素的 id。
 * @param {string} labelText - 复选框的显示标签文本。
 * @param {boolean} isChecked - 复选框的初始选中状态。
 * @returns {HTMLLabelElement} - 代表一个完整复选框组件的 DOM 元素。
 * @description 创建一个带有自定义标签和样式的复选框组件。
 */
export function createCheckbox(id, labelText, isChecked) {
  const label = document.createElement('label');
  label.className = 'checkbox-group';
  label.htmlFor = id;
  label.appendChild(document.createTextNode(labelText));

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = id;
  if (isChecked) {
    input.checked = true;
  }

  const checkmark = document.createElement('span');
  checkmark.className = 'checkmark';

  label.appendChild(input);
  label.appendChild(checkmark);

  return label;
}
