// src/ui/settingsPanel.js

/**
 * @module settingsPanel
 * @description 负责创建、显示、隐藏和管理设置面板的用户界面和交互。
 */

import { loadSettings, saveSettings } from '../core/settings';
import { applyTheme } from './theme';
import { createCheckbox } from './components';

// --- 模块级变量 ---

/**
 * @private
 * @type {HTMLElement|null}
 * @description 用于存储设置面板 DOM 元素的引用，以便在显示和隐藏时进行操作。
 * 当面板关闭时，此变量会被重置为 null。
 */
let settingsPanel = null;

/**
 * @private
 * @readonly
 * @type {Array<Object>}
 * @description 定义了内容过滤规则的元数据，用于动态生成UI和处理保存逻辑。
 * 每个对象包含:
 * - id: DOM元素的ID
 * - key: 对应 settings.filterRules 中的键名
 * - label: 显示在UI上的标签文本
 */
const filterDefinitions = [
  { id: 'filter-numbers', key: 'numbers', label: '过滤纯数字/货币' },
  { id: 'filter-chinese', key: 'chinese', label: '过滤纯中文' },
  { id: 'filter-contains-chinese', key: 'containsChinese', label: '过滤包含中文的文本' },
  { id: 'filter-emoji-only', key: 'emojiOnly', label: '过滤纯表情符号' },
  { id: 'filter-symbols', key: 'symbols', label: '过滤纯符号' },
];

// --- 私有函数 ---

/**
 * @private
 * @param {object} settings - 当前的设置对象。
 * @returns {string} - 设置面板的 innerHTML 字符串。
 * @description 根据传入的设置对象，动态生成设置面板的 HTML 结构。
 */
function getPanelHTML(settings) {
  // 使用 filterDefinitions 和 createCheckbox 函数动态生成所有过滤规则的 HTML
  const filterCheckboxesHTML = filterDefinitions
    .map(filter => createCheckbox(filter.id, filter.label, settings.filterRules[filter.key]))
    .join('');

  return `
    <div class="settings-panel-modal">
      <div class="settings-panel-header">
        <h2>脚本设置</h2>
        <span class="settings-panel-close">&times;</span>
      </div>
      <div class="settings-panel-content">
        <div class="setting-item">
          <label for="theme-select">界面主题</label>
          <select id="theme-select">
            <option value="system" ${settings.theme === 'system' ? 'selected' : ''}>跟随系统</option>
            <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>浅色模式</option>
            <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>深色模式</option>
          </select>
        </div>
        <div class="setting-item">
          <label>内容过滤规则</label>
          ${filterCheckboxesHTML}
        </div>
      </div>
      <div class="settings-panel-footer">
        <button id="save-settings-btn">保存并应用</button>
      </div>
    </div>
  `;
}

/**
 * @private
 * @param {KeyboardEvent} event - 键盘事件对象。
 * @description 监听全局键盘事件，当按下 "Escape" 键时关闭设置面板。
 */
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    hideSettingsPanel();
  }
};

/**
 * @private
 * @description 显示设置面板。如果面板已存在，则直接显示；否则，创建新的面板并添加到页面中。
 */
function showSettingsPanel() {
  // 如果面板已存在（例如，被错误地隐藏而未移除），则直接显示并返回
  if (settingsPanel) {
    settingsPanel.style.display = 'flex';
    return;
  }

  // 样式现在通过 build.js 全局注入，此处不再需要 GM_addStyle 调用。

  // 1. 创建面板 DOM 元素
  const currentSettings = loadSettings();
  settingsPanel = document.createElement('div');
  settingsPanel.className = 'settings-panel-overlay';
  settingsPanel.innerHTML = getPanelHTML(currentSettings);
  document.body.appendChild(settingsPanel);

  // 2. 绑定事件监听器
  settingsPanel.querySelector('.settings-panel-close').addEventListener('click', hideSettingsPanel);
  settingsPanel.querySelector('#save-settings-btn').addEventListener('click', handleSave);
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * @private
 * @description 隐藏并从 DOM 中彻底移除设置面板，同时清理事件监听器。
 */
function hideSettingsPanel() {
  if (settingsPanel) {
    // 移除 Esc 键的监听器，避免内存泄漏或不必要的监听
    document.removeEventListener('keydown', handleKeyDown);
    // 从 DOM 中移除面板元素
    settingsPanel.remove();
    // 重置变量，确保下次打开时会重新创建
    settingsPanel = null;
  }
}

/**
 * @private
 * @description 处理“保存并应用”按钮的点击事件。
 * 它会从 UI 元素中收集当前的设置值，保存它们，应用新主题，并关闭面板。
 */
function handleSave() {
  // 1. 从 DOM 元素中获取用户选择的新设置
  const newTheme = document.getElementById('theme-select').value;

  // 使用 filterDefinitions 动态构建 filterRules 对象
  const newFilterRules = {};
  filterDefinitions.forEach(filter => {
    const checkbox = document.getElementById(filter.id);
    if (checkbox) {
      newFilterRules[filter.key] = checkbox.checked;
    }
  });

  const newSettings = {
    theme: newTheme,
    filterRules: newFilterRules,
  };

  // 2. 保存设置并应用主题
  saveSettings(newSettings);
  applyTheme(newSettings.theme);

  // 3. 提示用户并关闭面板
  alert('设置已保存！'); // 简单的用户反馈
  hideSettingsPanel();
}

// --- 公开函数 ---

/**
 * @public
 * @description 初始化设置面板功能。主要任务是在油猴菜单中注册一个“打开设置”的命令。
 */
export function initSettingsPanel() {
  GM_registerMenuCommand('打开设置', showSettingsPanel);
}
