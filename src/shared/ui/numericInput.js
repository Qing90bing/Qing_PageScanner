// src/shared/ui/numericInput.js

/**
 * @public
 * @param {string} id - 数字输入框 input 元素的 id。
 * @param {string} labelText - 输入框的显示标签文本。
 * @param {number} value - 输入框的初始值。
 * @param {object} [options={}] - 一个包含额外选项的对象。
 * @param {number} [options.min] - 输入框允许的最小值。
 * @param {number} [options.max] - 输入框允许的最大值。
 * @param {boolean} [options.disabled=false] - 输入框是否初始为禁用状态。
 * @returns {HTMLDivElement} - 代表一个完整数字输入框组件的 DOM 元素。
 * @description 创建一个带有自定义标签、值和属性的数字输入框组件。
 */
export function createNumericInput(id, labelText, value, options = {}) {
    const { min, max, disabled = false } = options;

    const container = document.createElement('div');
    container.className = 'numeric-input-group';

    const label = document.createElement('label');
    label.className = 'numeric-input-label';
    label.htmlFor = id;
    if (labelText) {
        label.textContent = labelText;
    }

    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.value = value;
    input.className = 'numeric-input';

    if (typeof min !== 'undefined') {
        input.min = min;
    }
    if (typeof max !== 'undefined') {
        input.max = max;
    }
    if (disabled) {
        input.disabled = true;
    }

    container.appendChild(label);
    container.appendChild(input);

    return container;
}
