import { getValue, setValue } from './tampermonkey.js';
import { log } from '../utils/core/logger.js';
import { t } from '../i18n/index.js';
import { AI_DEFAULT_SETTINGS, mergeAiSettings } from './ai/contracts.js';

const defaultSettings = {
    language: 'auto',
    outputFormat: 'array',
    includeArrayBrackets: true,
    theme: 'system',
    showFab: true,
    fabPosition: 'bottom-right',
    showScanCount: true,
    showLineNumbers: true,
    showStatistics: true,
    enableWordWrap: false,
    enableTextTruncation: true,
    textTruncationLength: 50000,
    enableDebugLogging: false,
    elementScan_persistData: true,
    sessionScan_persistData: true,
    ai: AI_DEFAULT_SETTINGS,
    filterRules: {
        numbers: true,
        chinese: true,
        containsChinese: false,
        emojiOnly: true,
        symbols: true,
        termFilter: true,
        singleLetter: false,
        repeatingChars: true,
        filePath: true,
        hexColor: true,
        email: true,
        uuid: true,
        gitCommitHash: true,
        websiteUrl: true,
        shorthandNumber: true,
    },
};

export function loadSettings() {
    const savedSettings = getValue('script_settings', null);

    if (!savedSettings) return defaultSettings;

    try {
        const parsedSettings = JSON.parse(savedSettings);
        return {
            ...defaultSettings,
            ...parsedSettings,
            filterRules: {
                ...defaultSettings.filterRules,
                ...(parsedSettings.filterRules || {}),
            },
            ai: mergeAiSettings(parsedSettings.ai),
        };
    } catch (error) {
        log(t('log.settings.parseError'), error);
        return defaultSettings;
    }
}

export function saveSettings(newSettings) {
    if (typeof newSettings !== 'object' || newSettings === null) {
        log(t('log.settings.invalidObject'), newSettings);
        return;
    }

    const oldSettings = loadSettings();
    Object.keys(newSettings).forEach((key) => {
        if (key !== 'filterRules' && oldSettings[key] !== newSettings[key]) {
            log(
                t('log.settings.changed', {
                    key,
                    oldValue: oldSettings[key],
                    newValue: newSettings[key],
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
        ...newSettings,
        filterRules: {
            ...oldSettings.filterRules,
            ...(newSettings.filterRules || {}),
        },
        ai: mergeAiSettings(newSettings.ai || oldSettings.ai),
    };

    setValue('script_settings', JSON.stringify(mergedSettings));
    return mergedSettings;
}
