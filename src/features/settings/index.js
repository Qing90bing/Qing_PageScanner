// src/features/settings/index.js

import { loadSettings, saveSettings, applySettings } from './logic.js';
import { initSettingsPanel, openContextualSettingsPanel, openSettingsPanel } from './ui.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';

const SCAN_PERSISTENCE_CONTEXTS = Object.freeze({
    'element-scan': Object.freeze({
        definitionId: 'persist-data-checkbox',
        settingKey: 'elementScan_persistData',
        titleKey: 'settings.contextual.elementScanTitle',
        tooltipTextKey: 'tooltip.persistData.text.elementScan',
    }),
    'session-scan': Object.freeze({
        definitionId: 'persist-data-checkbox-session',
        settingKey: 'sessionScan_persistData',
        titleKey: 'settings.contextual.sessionScanTitle',
        tooltipTextKey: 'tooltip.persistData.text.sessionScan',
    }),
});

/**
 * @private
 * @description 处理打开设置面板的逻辑。
 */
function handleOpenSettings() {
    const currentSettings = loadSettings();
    openSettingsPanel(currentSettings, (newSettings) => {
        const oldSettings = loadSettings();
        const savedSettings = saveSettings(newSettings);
        applySettings(savedSettings, oldSettings);
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

/**
 * @public
 * @description 打开扫描功能共用的持久化设置面板，并由设置功能统一保存和应用副作用。
 * @param {'element-scan' | 'session-scan'} scanMode - 要配置的扫描模式。
 */
export function openScanPersistenceSettings(scanMode) {
    const context = SCAN_PERSISTENCE_CONTEXTS[scanMode];
    if (!context) {
        throw new TypeError(`Unsupported scan persistence mode: ${scanMode}`);
    }

    const currentSettings = loadSettings();
    const definitions = [
        {
            id: context.definitionId,
            key: context.settingKey,
            type: 'checkbox',
            label: 'settings.contextual.persistData',
            tooltip: {
                titleIcon: infoIcon,
                title: 'tooltip.persistData.title',
                text: context.tooltipTextKey,
            },
        },
    ];

    openContextualSettingsPanel({
        titleKey: context.titleKey,
        icon: settingsIcon,
        definitions,
        settings: currentSettings,
        onSave: (newSettings) => {
            const savedSettings = saveSettings({ ...currentSettings, ...newSettings });
            if (savedSettings) {
                applySettings(savedSettings, currentSettings);
            }
        },
    });
}
