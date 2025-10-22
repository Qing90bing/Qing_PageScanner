// src/shared/i18n/index.js
import en from './en.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import { fire } from '../utils/eventBus.js';
import { log } from '../utils/logger.js';

/**
 * @type {Object.<string, Object.<string, string>>}
 */
const translations = {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
};

let currentLanguage = 'en';
let currentTranslations = translations.en;

/**
 * 设置当前语言并通知应用更新
 * @param {string} lang - 语言代码 (e.g., 'en', 'zh-CN')
 */
export function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        currentTranslations = translations[lang];
        log(`语言已切换至: ${lang}`);
        fire('languageChanged', lang); // 通知UI重新渲染
    } else {
        log(`语言 '${lang}' 不存在，回退到 'en'。`, 'warn');
        currentLanguage = 'en';
        currentTranslations = translations.en;
    }
}

/**
 * 获取当前设置的语言
 * @returns {string}
 */
export function getLanguage() {
    return currentLanguage;
}

/**
 * 翻译函数
 * @param {string} key - 翻译文件的键
 * @returns {string} - 翻译后的文本或原始键
 */
export function t(key) {
    return currentTranslations[key] || key;
}

/**
 * 获取所有可用语言的列表（用于设置菜单）
 * @returns {{value: string, label: string}[]}
 */
export function getAvailableLanguages() {
    // 注意：这里的标签不会动态更新，因为它们是在语言初始化时生成的。
    // 但这对于在设置菜单中显示语言列表已经足够了。
    return [
        { value: 'en', label: translations.en.language_en },
        { value: 'zh-CN', label: translations['zh-CN'].language_zh_CN },
        { value: 'zh-TW', label: translations['zh-TW'].language_zh_TW },
    ];
}

/**
 * 初始化i18n，决定初始语言
 * @param {string | null | undefined} savedLang - 用户保存的语言设置
 */
export function initI18n(savedLang) {
    let langToSet = savedLang;

    if (!langToSet || langToSet === 'auto') {
        const browserLang = navigator.language;
        if (browserLang.startsWith('zh-CN')) {
            langToSet = 'zh-CN';
        } else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK') || browserLang.startsWith('zh')) {
            langToSet = 'zh-TW';
        } else {
            langToSet = 'en';
        }
        log(`未找到已保存的语言设置，根据浏览器语言 (${browserLang}) 自动选择: ${langToSet}`);
    } else {
        log(`加载已保存的语言设置: ${savedLang}`);
    }
    setLanguage(langToSet);
}
