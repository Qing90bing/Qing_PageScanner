// src/shared/i18n/index.js
import en from './en.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import { fire } from '../utils/eventBus.js';
import { log } from '../utils/logger.js';
import { supportedLanguages } from './languages.js';

// 将所有导入的翻译文件映射到一个对象中，以便通过语言代码进行动态访问。
const translationModules = {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
};

// 从 supportedLanguages 动态构建 translations 对象
const translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
        acc[lang.code] = translationModules[lang.code];
    }
    return acc;
}, {});


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
    // 从集中化的语言配置中动态生成列表
    // 直接使用原生名称作为标签，这是语言选择器的最佳实践
    return supportedLanguages.map(lang => ({
        value: lang.code,
        label: lang.name,
    }));
}

/**
 * 初始化i18n，决定初始语言
 * @param {string | null | undefined} savedLang - 用户保存的语言设置
 */
export function initI18n(savedLang) {
    let langToSet = savedLang;

    if (!langToSet || langToSet === 'auto') {
        const browserLang = navigator.language;
        // 沿用旧的逻辑以保证对中文区域的正确判断
        if (browserLang.startsWith('zh-CN')) {
            langToSet = 'zh-CN';
        } else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK') || browserLang.startsWith('zh')) {
            langToSet = 'zh-TW';
        } else {
            langToSet = 'en'; // 默认回退
        }

        // 确保我们选择的语言是受支持的
        if (!supportedLanguages.some(l => l.code === langToSet)) {
            langToSet = 'en';
        }

        log(`未找到已保存的语言设置，根据浏览器语言 (${browserLang}) 自动选择: ${langToSet}`);
    } else {
        log(`加载已保存的语言设置: ${savedLang}`);
    }
    setLanguage(langToSet);
}
