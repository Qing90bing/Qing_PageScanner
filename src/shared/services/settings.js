import { getValue, setValue } from './tampermonkey.js';
import { log } from '../utils/core/logger.js';
import { t } from '../i18n/index.js';
import { mergeAiSettings } from './ai/contracts.js';
import { normalizeOutputTabSize } from '../config/outputConfig.js';
import { createDefaultSettings } from './settingsDefaults.js';

export function loadSettings() {
    const savedSettings = getValue('script_settings', null);

    if (!savedSettings) return createDefaultSettings();

    try {
        const parsedSettings = JSON.parse(savedSettings);
        const baseSettings = createDefaultSettings();
        return {
            ...baseSettings,
            ...parsedSettings,
            tabSize: normalizeOutputTabSize(parsedSettings.tabSize),
            filterRules: {
                ...baseSettings.filterRules,
                ...(parsedSettings.filterRules || {}),
            },
            ai: mergeAiSettings(parsedSettings.ai || baseSettings.ai),
        };
    } catch (error) {
        log(t('log.settings.parseError'), error);
        return createDefaultSettings();
    }
}

export function saveSettings(newSettings) {
    if (typeof newSettings !== 'object' || newSettings === null) {
        log(t('log.settings.invalidObject'), newSettings);
        return;
    }

    const oldSettings = loadSettings();
    const settingsToSave = { ...newSettings };
    if (Object.prototype.hasOwnProperty.call(settingsToSave, 'tabSize')) {
        settingsToSave.tabSize = normalizeOutputTabSize(settingsToSave.tabSize);
    }

    Object.keys(settingsToSave).forEach((key) => {
        if (key !== 'filterRules' && oldSettings[key] !== settingsToSave[key]) {
            log(
                t('log.settings.changed', {
                    key,
                    oldValue: oldSettings[key],
                    newValue: settingsToSave[key],
                })
            );
        }
    });

    const oldRules = oldSettings.filterRules || {};
    const newRules = newSettings.filterRules || {};
    const allRuleKeys = new Set([...Object.keys(oldRules), ...Object.keys(newRules)]);
    allRuleKeys.forEach((key) => {
        const oldValue = !!oldRules[key];
        const newValue = !!newRules[key];
        if (oldValue !== newValue) {
            const statusKey = newValue
                ? 'log.settings.filterRuleChanged.enabled'
                : 'log.settings.filterRuleChanged.disabled';
            log(t(statusKey, { key }));
        }
    });

    const mergedSettings = {
        ...oldSettings,
        ...settingsToSave,
        filterRules: {
            ...oldSettings.filterRules,
            ...(settingsToSave.filterRules || {}),
        },
        ai: mergeAiSettings(settingsToSave.ai || oldSettings.ai),
    };

    setValue('script_settings', JSON.stringify(mergedSettings));
    return mergedSettings;
}
