/**
 * AI 和普通文本扫描共用的页面筛选规则。
 *
 * 这里仅保存不会随用户设置变化的扫描边界。用户可配置的过滤开关仍然
 * 由 settings service 提供，调用方通过参数传入，不要在本文件读取用户状态。
 */
export const scannerConfig = Object.freeze({
    attributesToExtract: Object.freeze(['placeholder', 'alt', 'title', 'aria-label']),
    ignoredSelectors: Object.freeze([
        'script',
        'style',
        'noscript',
        'code',
        'pre',
        'kbd',
        '.no-translate',
        '.view-line',
    ]),
});
