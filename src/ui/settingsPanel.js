// src/ui/settingsPanel.js

/**
 * @module settingsPanel
 * @description 负责创建、显示、隐藏和管理设置面板的用户界面和交互。
 */

import { loadSettings, saveSettings } from '../core/settings';
import { applyTheme } from './theme';
import { createCheckbox } from './components';
import { createIconTitle } from './components/iconTitle.js';
import { settingsIcon } from '../assets/settingsIcon.js';
import { themeIcon } from '../assets/themeIcon.js';
import { filterIcon } from '../assets/filterIcon.js';
import { saveIcon } from '../assets/saveIcon.js';
import { CustomSelect } from './components/customSelect.js';
import { systemThemeIcon } from '../assets/systemThemeIcon.js';
import { lightThemeIcon } from '../assets/lightThemeIcon.js';
import { darkThemeIcon } from '../assets/darkThemeIcon.js';

// --- 模块级变量 ---

/**
 * @private
 * @type {HTMLElement|null}
 * @description 用于存储设置面板 DOM 元素的引用，以便在显示和隐藏时进行操作。
 * 当面板关闭时，此变量会被重置为 null。
 */
let settingsPanel = null;
let themeSelectComponent = null;

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
  { id: 'filter-term', key: 'termFilter', label: '过滤特定术语' },
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
        <div id="settings-panel-title-container"></div>
        <span class="tc-close-button settings-panel-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </span>
      </div>
      <div class="settings-panel-content">
        <div class="setting-item">
          <div id="theme-setting-title-container"></div>
          <div id="custom-select-wrapper"></div>
        </div>
        <div class="setting-item">
          <div id="filter-setting-title-container"></div>
          ${filterCheckboxesHTML}
        </div>
      </div>
      <div class="settings-panel-footer">
        <button id="save-settings-btn" class="tc-button">保存</button>
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
    // 确保即使面板已存在，也能触发动画
    setTimeout(() => settingsPanel.classList.add('is-visible'), 10);
    return;
  }

  // 样式现在通过 build.js 全局注入，此处不再需要 GM_addStyle 调用。

  // 1. 创建面板 DOM 元素
  const currentSettings = loadSettings();
  settingsPanel = document.createElement('div');
  settingsPanel.className = 'settings-panel-overlay';
  settingsPanel.innerHTML = getPanelHTML(currentSettings);
  document.body.appendChild(settingsPanel);

  // --- 新增：触发淡入动画 ---
  // 使用 setTimeout 确保浏览器有时间渲染元素，从而使过渡生效
  setTimeout(() => {
    if (settingsPanel) { // 检查面板是否仍然存在
      settingsPanel.classList.add('is-visible');
    }
  }, 10); // 短暂延迟

  // 创建并插入标题
  const titleContainer = document.getElementById('settings-panel-title-container');
  const titleElement = createIconTitle(settingsIcon, '脚本设置');
  titleContainer.appendChild(titleElement);

  // 创建并插入“界面主题”标题
  const themeTitleContainer = document.getElementById('theme-setting-title-container');
  const themeTitleElement = createIconTitle(themeIcon, '界面主题');
  themeTitleContainer.appendChild(themeTitleElement);
  themeTitleContainer.style.marginBottom = '8px'; // 添加一些间距

  // 创建并插入“内容过滤规则”标题
  const filterTitleContainer = document.getElementById('filter-setting-title-container');
  const filterTitleElement = createIconTitle(filterIcon, '内容过滤规则');
  filterTitleContainer.appendChild(filterTitleElement);
  filterTitleContainer.style.marginBottom = '8px'; // 添加一些间距

  // 实例化自定义下拉菜单
  const selectWrapper = document.getElementById('custom-select-wrapper');
  const themeOptions = [
    { value: 'system', label: '跟随系统', icon: systemThemeIcon },
    { value: 'light', label: '浅色模式', icon: lightThemeIcon },
    { value: 'dark', label: '深色模式', icon: darkThemeIcon }
  ];
  themeSelectComponent = new CustomSelect(selectWrapper, themeOptions, currentSettings.theme);

  // 2. 绑定事件监听器
  const saveBtn = settingsPanel.querySelector('#save-settings-btn');
  saveBtn.innerHTML = ''; // 清空原始内容
  const saveBtnContent = createIconTitle(saveIcon, '保存');
  saveBtn.appendChild(saveBtnContent);

  settingsPanel.querySelector('.settings-panel-close').addEventListener('click', hideSettingsPanel);
  saveBtn.addEventListener('click', handleSave);
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * @private
 * @description 隐藏并从 DOM 中彻底移除设置面板，同时清理事件监听器。
 */
function hideSettingsPanel() {
  if (settingsPanel) {
    // 移除 Esc 键的监听器
    document.removeEventListener('keydown', handleKeyDown);

    // 1. 移除 'is-visible' 类以触发淡出动画
    settingsPanel.classList.remove('is-visible');

    // 2. 在动画结束后（300毫秒）再移除 DOM 元素
    setTimeout(() => {
        if (settingsPanel) {
            settingsPanel.remove();
            settingsPanel = null; // 重置变量
        }
    }, 300); // 这个时间应与 CSS transition 的持续时间匹配
  }
}

/**
 * @private
 * @description 处理“保存”按钮的点击事件。
 * 它会从 UI 元素中收集当前的设置值，保存它们，应用新主题，并关闭面板。
 */
function handleSave() {
  // 1. 从组件和 DOM 元素中获取用户选择的新设置
  const newTheme = themeSelectComponent.getValue();

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
