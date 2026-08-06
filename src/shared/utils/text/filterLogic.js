// src/shared/utils/filterLogic.js

/**
 * @module filterLogic
 * @description 提供了统一的、可复用的文本过滤逻辑。
 * 这是项目中所有文本过滤规则的唯一真实来源。
 */

import { t } from '../../i18n/index.js';
import IGNORED_TERMS_SET from './ignoredTerms.js';

const FILTER_LABEL_KEYS = Object.freeze({
    numbers: 'settings.filters.numbers',
    chinese: 'settings.filters.chinese',
    containsChinese: 'settings.filters.contains_chinese',
    emojiOnly: 'settings.filters.emoji_only',
    symbols: 'settings.filters.symbols',
    termFilter: 'settings.filters.term',
    singleLetter: 'settings.filters.single_letter',
    repeatingChars: 'settings.filters.repeating_chars',
    filePath: 'settings.filters.file_paths',
    hexColor: 'settings.filters.hex_color_codes',
    email: 'settings.filters.email_addresses',
    uuid: 'settings.filters.uuids',
    gitCommitHash: 'settings.filters.git_commit_hashes',
    websiteUrl: 'settings.filters.website_urls',
    shorthandNumber: 'settings.filters.shorthand_numbers',
});

// --- 规则检查函数映射 ---

const ruleChecks = new Map([
    [
        'numbers',
        {
            regex: /^[$\€\£\¥\d,.\s]+$/,
            label: FILTER_LABEL_KEYS.numbers,
        },
    ],
    [
        'chinese',
        {
            regex: /^[\u4e00-\u9fa5\s]+$/u,
            label: FILTER_LABEL_KEYS.chinese,
        },
    ],
    [
        'containsChinese',
        {
            regex: /[\u4e00-\u9fa5]/u,
            label: FILTER_LABEL_KEYS.containsChinese,
        },
    ],
    [
        'emojiOnly',
        {
            regex: /^[\p{Emoji}\s]+$/u,
            label: FILTER_LABEL_KEYS.emojiOnly,
        },
    ],
    [
        'symbols',
        {
            // 这个逻辑比较特殊，是“不包含字母或数字”，所以我们用一个函数来处理
            test: (text) => !/[\p{L}\p{N}]/u.test(text),
            label: FILTER_LABEL_KEYS.symbols,
        },
    ],
    [
        'termFilter',
        {
            // 将 .includes() 修改为 .has()
            test: (text) => IGNORED_TERMS_SET.has(text),
            label: FILTER_LABEL_KEYS.termFilter,
        },
    ],
    [
        'singleLetter',
        {
            regex: /^[a-zA-Z]$/,
            label: FILTER_LABEL_KEYS.singleLetter,
        },
    ],
    [
        'repeatingChars',
        {
            regex: /^\s*(.)\1+\s*$/,
            label: FILTER_LABEL_KEYS.repeatingChars,
        },
    ],
    [
        'filePath',
        {
            regex: /^(?:[a-zA-Z]:\\|\\\\|~|\.\.?\/)[\w\-\.\/ \\]*[\w\-\.]+\.[\w]{2,4}$/,
            label: FILTER_LABEL_KEYS.filePath,
        },
    ],
    [
        'hexColor',
        {
            regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
            label: FILTER_LABEL_KEYS.hexColor,
        },
    ],
    [
        'email',
        {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            label: FILTER_LABEL_KEYS.email,
        },
    ],
    [
        'uuid',
        {
            regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
            label: FILTER_LABEL_KEYS.uuid,
        },
    ],
    [
        'gitCommitHash',
        {
            regex: /^[0-9a-f]{7,40}$/i,
            label: FILTER_LABEL_KEYS.gitCommitHash,
        },
    ],
    [
        'websiteUrl',
        {
            // 匹配常见的网址格式，包括协议、www前缀和裸域名，要求严格匹配整个字符串以避免误伤。
            regex: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/,
            label: FILTER_LABEL_KEYS.websiteUrl,
        },
    ],
    [
        'shorthandNumber',
        {
            // 匹配带k/m/b后缀的数字，支持整数、浮点数、大小写以及可选的空格。
            regex: /^\d+(\.\d+)?\s?[kmb]$/i,
            label: FILTER_LABEL_KEYS.shorthandNumber,
        },
    ],
]);

/**
 * @public
 * @description 根据提供的一组规则，判断一个文本字符串是否应该被过滤。
 * @description 根据提供的一组规则，判断一个文本字符串是否应该被过滤。
 * @param {string} text - 需要检查的文本（注意：此函数期望传入的是已经 trim() 过的文本）。
 * @param {object} filterRules - 从设置中加载的过滤规则配置对象。
 * @returns {string|null} - 如果文本应该被过滤，则返回翻译后的过滤原因字符串；否则返回 null。
 */
export function shouldFilter(text, filterRules) {
    for (const [key, rule] of ruleChecks.entries()) {
        if (filterRules[key]) {
            const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
            if (isFiltered) {
                return t(rule.label);
            }
        }
    }

    return null;
}
