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
    titleContainer.appendChild(createIconTitle(settingsIcon, t('settings.title')));

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
    relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, t('settings.relatedSettings')));

    const filterTitleContainer = settingsPanel.querySelector('#filter-setting-title-container');
    filterTitleContainer.appendChild(createIconTitle(filterIcon, t('settings.filterRules')));

    const saveBtn = settingsPanel.querySelector('#save-settings-btn');
    saveBtn.appendChild(createIconTitle(saveIcon, t('common.save')));

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

    // 1. 从所有下拉菜单收集值
    for (const key in selectComponents) {
        newSettings[key] = selectComponents[key].getValue();
    }

    // 2. 收集过滤规则
    const newFilterRules = {};
    filterDefinitions.forEach(filter => {
        const checkbox = settingsPanel.querySelector(`#${filter.id}`);
        if (checkbox) newFilterRules[filter.key] = checkbox.checked;
    });
    newSettings.filterRules = newFilterRules;

    // 3. 收集相关设置（包括新的复合设置项）
    relatedSettingsDefinitions.forEach(setting => {
        const checkbox = settingsPanel.querySelector(`#${setting.id}`);
        if (!checkbox) return; // 如果找不到复选框，跳过

        // 保存复选框的状态
        newSettings[setting.key] = checkbox.checked;

        // 如果有关联的数字输入框，则保存其值
        if (setting.linkedNumeric) {
            const numericInput = settingsPanel.querySelector(`#${setting.linkedNumeric.id}`);
            if (numericInput) {
                // 将值转换为数字，并确保不小于5
                let value = parseInt(numericInput.value, 10);
                if (isNaN(value) || value < 5) {
                    value = 5; // 如果无效，则重置为最小值
                    numericInput.value = value; // 更新UI上的值
                }
                newSettings[setting.linkedNumeric.key] = value;
            }
        }
    });

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

    showNotification(t('notifications.settingsSaved'), { type: 'success' });
    hideSettingsPanel();
}

// --- 公开函数 ---

/**
 * @public
 * @description 初始化设置面板功能。
 */
export function initSettingsPanel() {
    // 关键修复：确保只有在顶层窗口的脚本实例才能注册菜单命令。
    // 这可以防止在有 iframe 的页面上因脚本被多次注入而导致菜单重复。
    if (window.top === window.self) {
        // 使用“立即执行的异步函数表达式”来处理异步操作，避免阻塞主线程
        (async () => {
            await updateSettingsMenu(showSettingsPanel);
        })();

        // 监听语言变化事件，以更新菜单文本
        on('languageChanged', async () => {
            await updateSettingsMenu(showSettingsPanel);
        });
    }
}
