// src/features/settings/config.js

export const filterDefinitions = [
  { id: 'filter-numbers', key: 'numbers', label: '过滤纯数字/货币' },
  { id: 'filter-chinese', key: 'chinese', label: '过滤纯中文' },
  { id: 'filter-contains-chinese', key: 'containsChinese', label: '过滤包含中文的文本' },
  { id: 'filter-emoji-only', key: 'emojiOnly', label: '过滤纯表情符号' },
  { id: 'filter-symbols', key: 'symbols', label: '过滤纯符号' },
  { id: 'filter-term', key: 'termFilter', label: '过滤特定术语' },
  { id: 'filter-single-letter', key: 'singleLetter', label: '过滤纯单个英文字母' },
  { id: 'filter-repeating-chars', key: 'repeatingChars', label: '过滤单一重复字符' },
];

export const relatedSettingsDefinitions = [
    { id: 'show-fab', key: 'showFab', label: '显示悬浮按钮' },
    { id: 'show-line-numbers', key: 'showLineNumbers', label: '显示行号' },
    { id: 'show-statistics', key: 'showStatistics', label: '显示统计信息' },
    { id: 'enable-debug-logging', key: 'enableDebugLogging', label: '启用调试日志' },
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
            '.no-translate',
        ],
    },
};
