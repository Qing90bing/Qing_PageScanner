// src/features/settings/index.js

import { loadSettings, saveSettings, applySettings } from './logic.js';
import { initSettingsPanel, openSettingsPanel } from './ui.js';

/**
 * @private
 * @description 处理打开设置面板的逻辑。
 */
function handleOpenSettings() {
    const currentSettings = loadSettings();
    openSettingsPanel(currentSettings, (newSettings) => {
        const oldSettings = loadSettings();
        saveSettings(newSettings);
        applySettings(newSettings, oldSettings);
    });
}

/**
 * @public
 * @description 初始化设置功能。
 * 这是设置功能的唯一入口点。
 */
export function initialize() {
    initSettingsPanel(handleOpenSettings);
}
