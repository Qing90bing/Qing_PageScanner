// src/shared/i18n/management/languageManager.js

import { setLanguage as setI18nLanguage, t, supportedLanguages } from '../index.js';
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
    // 'auto' is now in supportedLanguages
    return supportedLanguages.some(lang => lang.code === langCode);
}

/**
 * 初始化语言设置。
 * 将根据用户保存的设置或浏览器语言来加载合适的翻译。
 * 严格匹配，如果找不到匹配的语言，则默认为英语。
 */
export function initializeLanguage(settings) {
    let langToSet = 'en'; // 默认语言

    // 确定用户意图使用的语言
    let targetLang = 'auto'; // 默认为自动检测

    if (settings && settings.language) {
        targetLang = settings.language;
    }

    // 如果是自动检测
    if (targetLang === 'auto') {
        const browserLang = navigator.language;
        // 尝试完全匹配 (e.g., 'zh-CN')
        if (isLanguageSupported(browserLang) && browserLang !== 'auto') {
            langToSet = browserLang;
        } else {
            // 尝试模糊匹配 (e.g., 'zh-Hans-CN' -> 'zh-CN')
            // 这里我们需要更智能的匹配逻辑，或者简单地尝试匹配前缀
            // 目前项目中只有 'zh-CN', 'zh-TW', 'en'
            // 常见的浏览器语言代码: 'zh-CN', 'zh', 'en-US', 'en'

            if (browserLang.startsWith('zh')) {
                // 偏好简体中文，除非明确是繁体
                if (browserLang.toLowerCase().includes('tw') || browserLang.toLowerCase().includes('hk') || browserLang.toLowerCase().includes('hant')) {
                    langToSet = 'zh-TW';
                } else {
                    langToSet = 'zh-CN';
                }
            } else if (browserLang.startsWith('en')) {
                langToSet = 'en';
            }
        }
    } else {
        // 用户手动选择了特定语言
        if (isLanguageSupported(targetLang)) {
            langToSet = targetLang;
        }
    }

    setI18nLanguage(langToSet);
}


/**
 * 切换并保存当前语言。
 * @param {string} langCode - 要切换到的语言代码 (例如 'zh-CN' 或 'auto')。
 */
export function switchLanguage(langCode) {
    // 即使切换到 'auto'，我们也需要计算出当前实际应该显示什么语言
    // 但在 UI 设置中，我们只需要保存 'auto' 即可
    // 这里我们复用 initializeLanguage 的逻辑，但需要一种方式来只更新内存中的语言而不依赖 settings 对象的当前状态

    // 为了简单起见，我们先更新设置，然后重新初始化
    if (isLanguageSupported(langCode)) {
        const settings = loadSettings();
        settings.language = langCode;
        saveSettings(settings);

        // 重新调用初始化逻辑来应用正确的语言显示
        initializeLanguage(settings);
    }
}
