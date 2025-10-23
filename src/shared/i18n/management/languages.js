// src/shared/i18n/languages.js

/**
 * @description 集中管理所有支持的语言列表。
 * 要添加一种新语言，只需在此数组中添加一个新对象，
 * 并确保在同一目录下有一个对应的 `[lang-code].json` 翻译文件。
 *
 * @type {{code: string, name: string}[]}
 *
 * 结构说明:
 * - code: 语言的ISO代码 (例如, 'en', 'zh-CN')。这必须与JSON文件名匹配。
 * - name: 语言的原生名称 (例如, 'English', '简体中文')。这将显示在设置菜单中。
 */
export const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
];
