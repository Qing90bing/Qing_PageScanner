// src/core/ignoredSelectors.js

/**
 * @module core/ignoredSelectors
 * @description 定义一个 CSS 选择器数组，任何匹配这些选择器的元素及其所有后代都将被文本提取过程完全忽略。
 * 这对于排除代码块、导航栏、页脚等不需要翻译的内容非常有用。
 */

const IGNORED_SELECTORS = [
  // --- 语义化标签 ---
  'script',    // 脚本
  'style',     // 样式
  'noscript',  // script 禁用时显示的内容
  'code',      // 代码片段
  'pre',       // 预格式化文本，通常用于展示代码
  'kbd',       // 键盘输入

  // --- 常见的非内容区域 (可以根据需要添加) ---
  '.no-translate', // 一个通用的、用于明确指示不翻译的类名
  // '.navbar',
  // 'header',
  // 'footer',
  // '[role="navigation"]',
];

export default IGNORED_SELECTORS;
