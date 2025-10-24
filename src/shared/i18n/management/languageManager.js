// src/shared/i18n/languageManager.js

import { supportedLanguages } from './languages.js';
import { setLanguage as setI18nLanguage, t } from '../index.js';
import {
    registerMenuCommand,
    unregisterMenuCommand,
    getValue,
    setValue,
} from '../../services/tampermonkey.js';
import { loadSettings, saveSettings } from '../../../features/settings/logic.js';

/**
 * @description
 * 语言管理中心模块
 * 负责加载、切换、保存语言设置，并统一管理油猴菜单命令，确保菜单不会重复。
 */

const SETTINGS_MENU_ID_KEY = 'settings_menu_command_id';

/**
 * 更新油猴菜单中的“设置”命令。
 * 会先注销旧的命令，再注册新的，防止重复。
 * 此函数是异步的，因为它需要访问油猴的持久化存储。
 * @param {Function} onClick - 点击菜单时执行的回调函数。
 */
export async function updateSettingsMenu(onClick) {
    // 从油猴存储中异步获取旧的菜单ID
    const oldCommandId = await getValue(SETTINGS_MENU_ID_KEY, null);

    // 如果已存在菜单命令，先注销
    if (oldCommandId) {
        unregisterMenuCommand(oldCommandId);
    }

    // 使用当前语言注册新的菜单命令
    const menuText = t('settings.panel.title');
    const newCommandId = registerMenuCommand(menuText, onClick);

    // 将新的菜单ID异步保存到油猴存储中
    await setValue(SETTINGS_MENU_ID_KEY, newCommandId);
}

/**
 * 验证语言代码是否受支持
 * @param {string} langCode - 语言代码
 * @returns {boolean}
 */
function isLanguageSupported(langCode) {
    return supportedLanguages.some(lang => lang.code === langCode);
}

/**
 * 初始化语言设置。
 * 将根据用户保存的设置或浏览器语言来加载合适的翻译。
 * 严格匹配，如果找不到匹配的语言，则默认为英语。
 */
export function initializeLanguage(settings) {
    let langToSet = 'en'; // 默认语言

    const savedLang = settings.language;

    if (savedLang && savedLang !== 'auto') {
        // 如果保存了语言且不是'auto'，进行严格匹配
        if (isLanguageSupported(savedLang)) {
            langToSet = savedLang;
        }
    } else {
        // 如果是 'auto' 或没有设置，则使用浏览器语言进行严格匹配
        const browserLang = navigator.language;
        if (isLanguageSupported(browserLang)) {
            langToSet = browserLang;
        }
    }
    // 对于任何不匹配的情况，langToSet 将保持为 'en'

    setI18nLanguage(langToSet);
}


/**
 * 切换并保存当前语言。
 * @param {string} langCode - 要切换到的语言代码 (例如 'zh-CN')。
 */
export function switchLanguage(langCode) {
    if (isLanguageSupported(langCode)) {
        setI18nLanguage(langCode);
        const settings = loadSettings();
        settings.language = langCode;
        saveSettings(settings);
    }
}
