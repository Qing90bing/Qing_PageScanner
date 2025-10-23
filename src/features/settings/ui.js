// src/features/settings/ui.js

import { loadSettings, saveSettings } from './logic.js';
import { applyTheme } from '../../shared/ui/theme.js';
import { log, updateLoggerState } from '../../shared/utils/logger.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { createIconTitle } from '../../shared/ui/iconTitle.js';
import { CustomSelect } from '../../shared/ui/components/customSelect.js';
import { systemThemeIcon } from '../../assets/icons/systemThemeIcon.js';
import { lightThemeIcon } from '../../assets/icons/lightThemeIcon.js';
import { darkThemeIcon } from '../../assets/icons/darkThemeIcon.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { buildPanelDOM } from './panelBuilder.js';
import { filterDefinitions, relatedSettingsDefinitions, selectSettingsDefinitions } from './config.js';
import { t } from '../../shared/i18n/index.js';
import { on } from '../../shared/utils/eventBus.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { filterIcon } from '../../assets/icons/filterIcon.js';
import { saveIcon } from '../../assets/icons/saveIcon.js';
import { relatedSettingsIcon } from '../../assets/icons/relatedSettingsIcon.js';
import { updateModalAddonsVisibility } from '../../shared/ui/mainModal.js';
import { switchLanguage, updateSettingsMenu } from '../../shared/i18n/management/languageManager.js';

// --- 模块级变量 ---

let settingsPanel = null;
let selectComponents = {};

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
    settingsPanel.tabIndex = -1;

    const panelModal = buildPanelDOM(currentSettings);
    settingsPanel.appendChild(panelModal);

    uiContainer.appendChild(settingsPanel);

    setTimeout(() => {
        if (settingsPanel) settingsPanel.classList.add('is-visible');
    }, 10);

    // --- 填充标题和组件 ---
    const titleContainer = settingsPanel.querySelector('#settings-panel-title-container');
    titleContainer.appendChild(createIconTitle(settingsIcon, t('settings')));

    // 动态创建下拉菜单
    selectComponents = {};
    selectSettingsDefinitions.forEach(definition => {
        const titleContainer = settingsPanel.querySelector(`#${definition.id}-title-container`);
        titleContainer.appendChild(createIconTitle(definition.icon, t(definition.label)));

        const selectWrapper = settingsPanel.querySelector(`#${definition.id}-wrapper`);
        const options = definition.options.map(opt => ({
            ...opt,
            label: t(opt.label),
            // 为主题选项动态添加图标
            ...(definition.key === 'theme' && {
                'system': systemThemeIcon,
                'light': lightThemeIcon,
                'dark': darkThemeIcon
            }[opt.value]),
        }));
        selectComponents[definition.key] = new CustomSelect(selectWrapper, options, currentSettings[definition.key]);
    });

    const relatedTitleContainer = settingsPanel.querySelector('#related-setting-title-container');
    relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, t('relatedSettings')));

    const filterTitleContainer = settingsPanel.querySelector('#filter-setting-title-container');
    filterTitleContainer.appendChild(createIconTitle(filterIcon, t('filterRules')));

    const saveBtn = settingsPanel.querySelector('#save-settings-btn');
    saveBtn.appendChild(createIconTitle(saveIcon, t('save')));

    // --- 绑定事件 ---
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
                selectComponents = {};
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
    const newSettings = {};

    // 从所有下拉菜单收集值
    for (const key in selectComponents) {
        newSettings[key] = selectComponents[key].getValue();
    }

    const newFilterRules = {};
    filterDefinitions.forEach(filter => {
        const checkbox = settingsPanel.querySelector(`#${filter.id}`);
        if (checkbox) newFilterRules[filter.key] = checkbox.checked;
    });

    const newRelatedSettings = {};
    relatedSettingsDefinitions.forEach(setting => {
        const checkbox = settingsPanel.querySelector(`#${setting.id}`);
        if (checkbox) newRelatedSettings[setting.key] = checkbox.checked;
    });

    Object.assign(newSettings, newRelatedSettings, { filterRules: newFilterRules });

    const oldSettings = loadSettings();
    const languageChanged = oldSettings.language !== newSettings.language;

    updateLoggerState(newSettings.enableDebugLogging);
    saveSettings(newSettings);

    // 应用设置
    applyTheme(newSettings.theme);

    if (languageChanged) {
        switchLanguage(newSettings.language);
    }

    const fabContainer = uiContainer.querySelector('.text-extractor-fab-container');
    if (fabContainer) {
        fabContainer.classList.toggle('fab-container-visible', newSettings.showFab);
    }
    updateModalAddonsVisibility();

    showNotification(t('settingsSaved'), { type: 'success' });
    hideSettingsPanel();
}

// --- 公开函数 ---

/**
 * @public
 * @description 初始化设置面板功能。
 */
export function initSettingsPanel() {
    updateSettingsMenu(showSettingsPanel);
    // 监听语言变化事件，以更新菜单文本
    on('languageChanged', () => {
        updateSettingsMenu(showSettingsPanel);
    });
}
