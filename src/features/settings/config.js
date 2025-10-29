// src/features/settings/config.js
import { themeIcon } from '../../assets/icons/themeIcon.js';
import languageIcon from '../../assets/icons/languageIcon.js';
import { getAvailableLanguages } from '../../shared/i18n/index.js';

export const selectSettingsDefinitions = [
    {
        id: 'theme-select',
        key: 'theme',
        label: 'settings.theme',
        icon: themeIcon,
        options: [
            { value: 'light', label: 'settings.themes.light' },
            { value: 'dark', label: 'settings.themes.dark' },
            { value: 'system', label: 'settings.themes.system' },
        ],
    },
    {
        id: 'language-select',
        key: 'language',
        label: 'settings.language',
        icon: languageIcon,
    // 直接从 i18n 模块获取语言列表，其标签已经是原生名称，无需再翻译。
    options: getAvailableLanguages(),
    },
];

export const filterDefinitions = [
  { id: 'filter-numbers', key: 'numbers', label: 'settings.filters.numbers' },
  { id: 'filter-chinese', key: 'chinese', label: 'settings.filters.chinese' },
  { id: 'filter-contains-chinese', key: 'containsChinese', label: 'settings.filters.contains_chinese' },
  { id: 'filter-emoji-only', key: 'emojiOnly', label: 'settings.filters.emoji_only' },
  { id: 'filter-symbols', key: 'symbols', label: 'settings.filters.symbols' },
  { id: 'filter-term', key: 'termFilter', label: 'settings.filters.term' },
  { id: 'filter-single-letter', key: 'singleLetter', label: 'settings.filters.single_letter' },
  { id: 'filter-repeating-chars', key: 'repeatingChars', label: 'settings.filters.repeating_chars' },
  { id: 'filter-file-paths', key: 'filePath', label: 'settings.filters.file_paths' },
  { id: 'filter-hex-colors', key: 'hexColor', label: 'settings.filters.hex_color_codes' },
  { id: 'filter-emails', key: 'email', label: 'settings.filters.email_addresses' },
  { id: 'filter-uuids', key: 'uuid', label: 'settings.filters.uuids' },
  { id: 'filter-git-hashes', key: 'gitCommitHash', label: 'settings.filters.git_commit_hashes' },
];

export const relatedSettingsDefinitions = [
    { id: 'show-fab', key: 'showFab', label: 'settings.display.show_fab' },
    { id: 'show-scan-count', key: 'showScanCount', label: 'settings.display.show_scan_count' },
    { id: 'show-line-numbers', key: 'showLineNumbers', label: 'settings.display.show_line_numbers' },
    { id: 'show-statistics', key: 'showStatistics', label: 'settings.display.show_statistics' },
    { id: 'enable-word-wrap', key: 'enableWordWrap', label: 'settings.display.enable_word_wrap' },
    { id: 'enable-text-truncation', key: 'enableTextTruncation', label: 'settings.display.text_truncation_limit',
        linkedNumeric: {
            id: 'text-truncation-length',
            key: 'textTruncationLength',
        },
    },
    { id: 'enable-debug-logging', key: 'enableDebugLogging', label: 'settings.advanced.enable_debug_logging' },
];

/**
 * @description 应用级别的配置，用于存储非用户直接修改的、但可由开发者调整的参数。
 */
export const appConfig = {
    // UI相关的常量
    ui: {
        // 悬浮按钮进入动画的延迟时间（毫秒）
        fabAnimationDelay: 50,
        // 所有UI元素的工具提示文本
        tooltips: {
            summary: '查看总结文本',
            dynamicScan: '动态扫描',
            staticScan: '静态扫描',
        },
        // 动态扫描实时计数器的前缀文本
        liveCounterPrefix: '已发现：',
        // 主模态框内容区域的默认高度
        modalContentHeight: '400px',
        // 通知系统的默认显示时长（毫秒）
        notificationDuration: 3000,
    },
    // 文本扫描与提取相关的常量
    scanner: {
        // 定义了文本提取的目标CSS选择器
        targetSelectors: [
            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'li', 'td', 'th', 'pre', 'span', 'a', 'button',
            'article', 'main', 'div', 'body *',
        ],
        // 定义了在扫描DOM元素时，需要提取其文本内容的属性列表
        attributesToExtract: ['placeholder', 'alt', 'title', 'aria-label'],
        // 定义一个CSS选择器数组，任何匹配这些选择器的元素及其所有后代都将被文本提取过程完全忽略。
        ignoredSelectors: [
            // --- 语义化标签 ---
            'script', 'style', 'noscript', 'code', 'pre', 'kbd',
            // --- 常见的非内容区域 ---
            '.no-translate','.view-line',
        ],
    },
};
