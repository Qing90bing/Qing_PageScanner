// src/features/settings/ui.js

import { registerMenuCommand } from '../../shared/services/tampermonkey.js';
import { loadSettings, saveSettings } from './logic.js';
import { applyTheme } from '../../shared/ui/theme.js';
import { log, updateLoggerState } from '../../shared/utils/logger.js';
import { showNotification } from '../../shared/ui/notification.js';
import { createIconTitle } from '../../shared/ui/iconTitle.js';
import { CustomSelect } from '../../shared/ui/components/customSelect.js';
import { systemThemeIcon } from '../../assets/icons/systemThemeIcon.js';
import { lightThemeIcon } from '../../assets/icons/lightThemeIcon.js';
import { darkThemeIcon } from '../../assets/icons/darkThemeIcon.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { buildPanelDOM } from './panelBuilder.js';
import { filterDefinitions, relatedSettingsDefinitions } from './config.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { themeIcon } from '../../assets/icons/themeIcon.js';
import { filterIcon } from '../../assets/icons/filterIcon.js';
import { saveIcon } from '../../assets/icons/saveIcon.js';
import { relatedSettingsIcon } from '../../assets/icons/relatedSettingsIcon.js';
import { updateModalAddonsVisibility } from '../../shared/ui/mainModal.js';

// --- 模块级变量 ---

let settingsPanel = null;
let themeSelectComponent = null;

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
 * @description 显示设置面板。
 */
function showSettingsPanel() {
  log('正在打开设置面板...');
  if (settingsPanel) {
    setTimeout(() => settingsPanel.classList.add('is-visible'), 10);
    return;
  }

  const currentSettings = loadSettings();
  settingsPanel = document.createElement('div');
  settingsPanel.className = 'settings-panel-overlay';
  settingsPanel.tabIndex = -1; // 允许元素通过编程方式聚焦

  const panelModal = buildPanelDOM(currentSettings);
  settingsPanel.appendChild(panelModal);

  uiContainer.appendChild(settingsPanel);

  setTimeout(() => {
    if (settingsPanel) {
      settingsPanel.classList.add('is-visible');
    }
  }, 10);

  // --- Populate Titles and Components ---
  const titleContainer = settingsPanel.querySelector('#settings-panel-title-container');
  titleContainer.appendChild(createIconTitle(settingsIcon, '脚本设置'));

  const themeTitleContainer = settingsPanel.querySelector('#theme-setting-title-container');
  themeTitleContainer.appendChild(createIconTitle(themeIcon, '界面主题'));

  const relatedTitleContainer = settingsPanel.querySelector('#related-setting-title-container');
  relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, '相关设置'));

  const filterTitleContainer = settingsPanel.querySelector('#filter-setting-title-container');
  filterTitleContainer.appendChild(createIconTitle(filterIcon, '内容过滤规则'));

  const selectWrapper = settingsPanel.querySelector('#custom-select-wrapper');
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
  settingsPanel.addEventListener('keydown', handleKeyDown);
  settingsPanel.focus();
}

/**
 * @private
 * @description 隐藏并从 DOM 中彻底移除设置面板。
 */
function hideSettingsPanel() {
  if (settingsPanel && settingsPanel.classList.contains('is-visible')) {
    log('正在关闭设置面板...');
    settingsPanel.removeEventListener('keydown', handleKeyDown);
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
  log('正在保存设置...');
  const newTheme = themeSelectComponent.getValue();
  const newFilterRules = {};
  const newRelatedSettings = {};

  filterDefinitions.forEach(filter => {
    const checkbox = settingsPanel.querySelector(`#${filter.id}`);
    if (checkbox) {
      newFilterRules[filter.key] = checkbox.checked;
    }
  });

  relatedSettingsDefinitions.forEach(setting => {
    const checkbox = settingsPanel.querySelector(`#${setting.id}`);
    if (checkbox) {
        newRelatedSettings[setting.key] = checkbox.checked;
    }
  });

  const newSettings = {
    theme: newTheme,
    ...newRelatedSettings,
    filterRules: newFilterRules,
  };

  log('即将保存设置，调试日志状态将更新为:', newSettings.enableDebugLogging);
  updateLoggerState(newSettings.enableDebugLogging); // 立即更新日志记录器状态
  saveSettings(newSettings);
  applyTheme(newSettings.theme);

  // --- 即时应用悬浮按钮可见性 ---
  const fabContainer = uiContainer.querySelector('.text-extractor-fab-container');
  if (fabContainer) {
      fabContainer.classList.toggle('fab-container-visible', newSettings.showFab);
  }

  // 即时更新模态框附加组件的可见性
  updateModalAddonsVisibility();

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
