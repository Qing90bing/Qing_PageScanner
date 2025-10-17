// src/config.js

/**
 * @module config
 * @description 该文件包含了用户脚本的静态配置文件。
 * 用户或开发者可以通过修改此文件来调整脚本的默认行为。
 */

/**
 * @typedef {Object} ScriptConfig
 * @property {string[]} selectors - 一个CSS选择器数组，用于指定文本提取的目标元素范围。
 * 脚本将只在匹配这些选择器的元素内部进行文本提取。
 */

/**
 * @type {ScriptConfig}
 */
const config = {
  /**
   * 定义了文本提取的目标CSS选择器。
   * 默认情况下，脚本会尝试从以下标签和类名中提取文本。
   * 你可以根据需要添加、修改或删除这些选择器，以适应特定的网站或需求。
   * @example
   * // 只提取文章段落和标题
   * selectors: ['article p', 'h1', 'h2']
   * // 针对特定网站的定制
   * selectors: ['.main-content', '.comment-text']
   */
  selectors: [
    // --- 基础文本元素 ---
    'p', // 段落
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // 标题
    'li', // 列表项
    'td', // 表格单元格
    'th', // 表头
    'pre', // 预格式化文本
    'span', // 常用于包裹零散文本
    'a',  // 链接文本
    'button', // 按钮文本

    // --- 容器与特定区域 ---
    'article', // 文章内容
    'main',    // 主要内容区域
    'div',     // 通用容器

    // --- 新增：覆盖所有元素以检查属性 ---
    // 通过这个宽泛的选择器，我们可以检查所有元素的
    // title, alt, placeholder, aria-label 等属性。
    // processor.js 中的逻辑会确保只提取有内容的属性。
    'body *',
  ],

  /**
   * @property {string} modalContentHeight - 主模态框内容区域的默认高度。
   * 可以使用任何有效的CSS高度值（例如 '400px', '80vh'）。
   */
  modalContentHeight: '400px',
};

export default config;
