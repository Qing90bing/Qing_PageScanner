// src/ui/settingsPanel.js

/**
 * @module settingsPanel
 * @description 负责创建、显示、隐藏和管理设置面板的用户界面和交互。
 */

import { registerMenuCommand } from '../../shared/services/tampermonkey.js';
import { loadSettings, saveSettings } from './logic.js';
import { applyTheme } from '../../shared/ui/theme.js';
import { showNotification } from '../../shared/ui/notification.js';
import { createCheckbox } from '../../shared/ui/checkbox.js';
import { createIconTitle } from '../../shared/ui/iconTitle.js';
import { createSVGFromString } from '../../shared/utils/dom.js';
import { settingsIcon } from '../../assets/settingsIcon.js';
import { themeIcon } from '../../assets/themeIcon.js';
import { filterIcon } from '../../assets/filterIcon.js';
import { saveIcon } from '../../assets/saveIcon.js';
import { closeIcon } from '../../assets/closeIcon.js';
import { CustomSelect } from '../../shared/ui/components/customSelect.js';
import { systemThemeIcon } from '../../assets/systemThemeIcon.js';
import { lightThemeIcon } from '../../assets/lightThemeIcon.js';
import { darkThemeIcon } from '../../assets/darkThemeIcon.js';
import { relatedSettingsIcon } from '../../assets/relatedSettingsIcon.js';

// --- 模块级变量 ---

let settingsPanel = null;
let themeSelectComponent = null;

const filterDefinitions = [
  { id: 'filter-numbers', key: 'numbers', label: '过滤纯数字/货币' },
  { id: 'filter-chinese', key: 'chinese', label: '过滤纯中文' },
  { id: 'filter-contains-chinese', key: 'containsChinese', label: '过滤包含中文的文本' },
  { id: 'filter-emoji-only', key: 'emojiOnly', label: '过滤纯表情符号' },
  { id: 'filter-symbols', key: 'symbols', label: '过滤纯符号' },
  { id: 'filter-term', key: 'termFilter', label: '过滤特定术语' },
  { id: 'filter-single-letter', key: 'singleLetter', label: '过滤纯单个英文字母' },
];

const relatedSettingsDefinitions = [
    { id: 'show-fab', key: 'showFab', label: '显示悬浮按钮' },
];

// --- 私有函数 ---

/**
 * @private
 * @description 监听全局键盘事件，当按下 "Escape" 键时关闭设置面板。
 */
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    hideSettingsPanel();
  }
};

/**
 * @private
 * @description 创建并构建设置面板的 DOM 结构。
 * @param {object} settings - 当前的设置对象。
 * @returns {HTMLElement} - 构建好的设置面板模态框元素。
 */
function buildPanelDOM(settings) {
    const modal = document.createElement('div');
    modal.className = 'settings-panel-modal';

    // --- Header ---
    const header = document.createElement('div');
    header.className = 'settings-panel-header';
    const titleContainer = document.createElement('div');
    titleContainer.id = 'settings-panel-title-container';
    const closeBtn = document.createElement('span');
    closeBtn.className = 'tc-close-button settings-panel-close';
    closeBtn.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer);
    header.appendChild(closeBtn);

    // --- Content ---
    const content = document.createElement('div');
    content.className = 'settings-panel-content';

    // Theme setting
    const themeItem = document.createElement('div');
    themeItem.className = 'setting-item';
    const themeTitleContainer = document.createElement('div');
    themeTitleContainer.id = 'theme-setting-title-container';
    themeTitleContainer.className = 'setting-title-container';
    const selectWrapper = document.createElement('div');
    selectWrapper.id = 'custom-select-wrapper';
    themeItem.appendChild(themeTitleContainer);
    themeItem.appendChild(selectWrapper);

    // Related settings
    const relatedItem = document.createElement('div');
    relatedItem.className = 'setting-item';
    const relatedTitleContainer = document.createElement('div');
    relatedTitleContainer.id = 'related-setting-title-container';
    relatedTitleContainer.className = 'setting-title-container';
    relatedItem.appendChild(relatedTitleContainer);

    relatedSettingsDefinitions.forEach(setting => {
        const checkboxElement = createCheckbox(setting.id, setting.label, settings[setting.key]);
        relatedItem.appendChild(checkboxElement);
    });

    // Filter setting
    const filterItem = document.createElement('div');
    filterItem.className = 'setting-item';
    const filterTitleContainer = document.createElement('div');
    filterTitleContainer.id = 'filter-setting-title-container';
    filterTitleContainer.className = 'setting-title-container';
    filterItem.appendChild(filterTitleContainer);

    // Dynamically create checkboxes and append them
    filterDefinitions.forEach(filter => {
        const checkboxElement = createCheckbox(filter.id, filter.label, settings.filterRules[filter.key]);
        filterItem.appendChild(checkboxElement);
    });

    content.appendChild(themeItem);
    content.appendChild(relatedItem);
    content.appendChild(filterItem);

    // --- Footer ---
    const footer = document.createElement('div');
    footer.className = 'settings-panel-footer';
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-settings-btn';
    saveBtn.className = 'tc-button';
    footer.appendChild(saveBtn);

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
}


/**
 * @private
 * @description 显示设置面板。
 */
function showSettingsPanel() {
  if (settingsPanel) {
    setTimeout(() => settingsPanel.classList.add('is-visible'), 10);
    return;
  }

  const currentSettings = loadSettings();
  settingsPanel = document.createElement('div');
  settingsPanel.className = 'settings-panel-overlay';

  const panelModal = buildPanelDOM(currentSettings);
  settingsPanel.appendChild(panelModal);

  document.body.appendChild(settingsPanel);

  setTimeout(() => {
    if (settingsPanel) {
      settingsPanel.classList.add('is-visible');
    }
  }, 10);

  // --- Populate Titles and Components ---
  const titleContainer = document.getElementById('settings-panel-title-container');
  titleContainer.appendChild(createIconTitle(settingsIcon, '脚本设置'));

  const themeTitleContainer = document.getElementById('theme-setting-title-container');
  themeTitleContainer.appendChild(createIconTitle(themeIcon, '界面主题'));

  const relatedTitleContainer = document.getElementById('related-setting-title-container');
  relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, '相关设置'));

  const filterTitleContainer = document.getElementById('filter-setting-title-container');
  filterTitleContainer.appendChild(createIconTitle(filterIcon, '内容过滤规则'));

  const selectWrapper = document.getElementById('custom-select-wrapper');
  const themeOptions = [
    { value: 'system', label: '跟随系统', icon: systemThemeIcon },
    { value: 'light', label: '浅色模式', icon: lightThemeIcon },
    { value: 'dark', label: '深色模式', icon: darkThemeIcon }
  ];
  themeSelectComponent = new CustomSelect(selectWrapper, themeOptions, currentSettings.theme);

  const saveBtn = settingsPanel.querySelector('#save-settings-btn');
  saveBtn.appendChild(createIconTitle(saveIcon, '保存'));

  // --- Bind Events ---
  settingsPanel.querySelector('.settings-panel-close').addEventListener('click', hideSettingsPanel);
  saveBtn.addEventListener('click', handleSave);
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * @private
 * @description 隐藏并从 DOM 中彻底移除设置面板。
 */
function hideSettingsPanel() {
  if (settingsPanel) {
    document.removeEventListener('keydown', handleKeyDown);
    settingsPanel.classList.remove('is-visible');
    setTimeout(() => {
        if (settingsPanel) {
            settingsPanel.remove();
            settingsPanel = null;
        }
    }, 300);
  }
}

/**
 * @private
 * @description 处理“保存”按钮的点击事件。
 */
function handleSave() {
  const newTheme = themeSelectComponent.getValue();
  const newFilterRules = {};
  const newRelatedSettings = {};

  filterDefinitions.forEach(filter => {
    const checkbox = document.getElementById(filter.id);
    if (checkbox) {
      newFilterRules[filter.key] = checkbox.checked;
    }
  });

  relatedSettingsDefinitions.forEach(setting => {
    const checkbox = document.getElementById(setting.id);
    if (checkbox) {
        newRelatedSettings[setting.key] = checkbox.checked;
    }
  });

  const newSettings = {
    theme: newTheme,
    ...newRelatedSettings,
    filterRules: newFilterRules,
  };

  saveSettings(newSettings);
  applyTheme(newSettings.theme);

  // --- 即时应用悬浮按钮可见性 ---
  const fabContainer = document.querySelector('.text-extractor-fab-container');
  if (fabContainer) {
      fabContainer.classList.toggle('fab-container-visible', newSettings.showFab);
  }

  showNotification('设置已保存！', { type: 'success' });
  hideSettingsPanel();
}

// --- 公开函数 ---

/**
 * @public
 * @description 初始化设置面板功能。
 */
export function initSettingsPanel() {
  registerMenuCommand('打开设置', showSettingsPanel);
}
