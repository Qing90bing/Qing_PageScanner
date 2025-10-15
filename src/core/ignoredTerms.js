// src/core/ignoredTerms.js

/**
 * @module core/ignoredTerms
 * @description 该文件专门用于存放需要过滤的特定术语列表。
 * 将列表分离到独立文件中，便于未来管理和扩展（例如，从远程URL加载）。
 */

/**
 * 需要过滤的特定术语列表（区分大小写）。
 * @example
 * IGNORED_TERMS: ['IGNORE', 'TERM']
 * @type {string[]}
 */
const IGNORED_TERMS = [
  'Github',
  'Microsoft',
  'Tampermonkey',
  'JavaScript',
];

export default IGNORED_TERMS;
