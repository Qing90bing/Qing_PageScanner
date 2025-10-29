// src/shared/ui/checkbox.js
import { createSVGFromString } from '../utils/dom.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';
import { infoTooltip } from './components/infoTooltip.js';
import { t } from '../i18n/index.js';

/**
 * @public
 * @param {string} id - 复选框 input 元素的 id。
 * @param {string} labelText - 复选框的显示标签文本。
 * @param {boolean} isChecked - 复选框的初始选中状态。
 * @param {object} [tooltipConfig] - (可选) 提示工具的配置对象。
 * @returns {HTMLLabelElement} - 代表一个完整复选框组件的 DOM 元素。
 * @description 创建一个带有自定义标签和样式的复选框组件，并可选择性地附加一个信息提示图标。
 */
export function createCheckbox(id, labelText, isChecked, tooltipConfig) {
  const label = document.createElement('label');
  label.className = 'checkbox-group';
  label.htmlFor = id;
  label.appendChild(document.createTextNode(labelText));

  // 如果提供了 tooltip 配置，则创建并附加提示图标
  if (tooltipConfig && tooltipConfig.text) {
    const infoIconElement = document.createElement('span');
    infoIconElement.className = 'info-icon';
    infoIconElement.appendChild(createSVGFromString(infoIcon));
    infoIconElement.addEventListener('click', (e) => {
      e.preventDefault(); // 防止点击图标时触发 checkBox 的选中状态
      e.stopPropagation(); // 停止事件冒泡

      // 在显示 tooltip 前翻译文本
      const translatedConfig = {
        ...tooltipConfig,
        title: t(tooltipConfig.title),
        text: t(tooltipConfig.text),
      };
      infoTooltip.show(translatedConfig);
    });
    label.appendChild(infoIconElement);
  }

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
