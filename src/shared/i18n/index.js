// src/shared/i18n/index.js
import { locales, resourceLanguages } from 'virtual:locales';
import { fire } from '../utils/eventBus.js';
import { log } from '../utils/logger.js';

// 将所有导入的翻译文件映射到一个对象中，以便通过语言代码进行动态访问。
// 现在使用自动生成的 locales 对象，无需手动导入每个 JSON 文件。
const translationModules = locales;

// 定义支持的语言列表
// 'Auto' 总是作为第一个选项
// 其他语言从构建脚本生成的 resourceLanguages 中获取
export const supportedLanguages = [
    { code: 'auto', name: 'Auto' },
    ...resourceLanguages
];

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
        log(t('log.language.switched', { lang }));
        fire('languageChanged', lang); // 通知UI重新渲染
    } else {
        log(t('log.language.notFound', { lang }), 'warn');
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
 * 翻译函数，支持变量替换。
 * @param {string} key - 翻译文件的键，支持点状路径 (e.g., 'settings.title')
 * @param {Record<string, string | number>} [replacements] - 一个包含占位符和对应值的对象 (e.g., { count: 5 })。
 * @returns {string} - 翻译并替换占位符后的文本，或原始键。
 */
export function t(key, replacements) {
    // 通过点状路径深入对象查找值
    let value = key.split('.').reduce((obj, k) => {
        // 确保在路径的每一步我们都有一个有效的对象
        if (typeof obj === 'object' && obj !== null && k in obj) {
            return obj[k];
        }
        return undefined; // 如果任何一步失败，则提前终止
    }, currentTranslations);

    if (value === undefined) {
        return key; // 如果找不到翻译，返回原始键
    }

    // 优化：使用单次正则扫描进行替换
    // 相比于之前的遍历 keys 并创建多个 RegExp，这种方式只需要扫描一次字符串。
    // 同时也自动处理了 key 周围可能存在的空格，更健壮。
    if (replacements) {
        return value.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
            // 如果 replacements 中有这个 key，就替换，否则保留原样
            return Object.prototype.hasOwnProperty.call(replacements, key) 
                ? replacements[key] 
                : match;
        });
    }

    return value;
}

/**
 * 获取一个键对应的整个翻译对象，而不是单个字符串。
 * @param {string} key - 翻译文件的键，支持点状路径 (e.g., 'settings.title')
 * @returns {object | undefined} - 返回找到的对象，如果找不到则返回 undefined。
 */
export function getTranslationObject(key) {
    return key.split('.').reduce((obj, k) => {
        if (typeof obj === 'object' && obj !== null && k in obj) {
            return obj[k];
        }
        return undefined;
    }, currentTranslations);
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
