// src/shared/utils/filterLogic.js

/**
 * @module filterLogic
 * @description 提供了统一的、可复用的文本过滤逻辑。
 * 这是项目中所有文本过滤规则的唯一真实来源。
 */

import IGNORED_TERMS from './ignoredTerms.js';

// --- 正则表达式定义 ---

const numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;
const pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;
const containsChineseRegex = /[\u4e00-\u9fa5]/u;
const emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
const containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;
const singleLetterRegex = /^[a-zA-Z]$/;

/**
 * @public
 * @description 根据提供的一组规则，判断一个文本字符串是否应该被过滤。
 * @param {string} text - 需要检查的文本（注意：此函数期望传入的是已经 trim() 过的文本）。
 * @param {object} filterRules - 从设置中加载的过滤规则配置对象。
 * @returns {boolean} - 如果文本应该被过滤，则返回 true；否则返回 false。
 */
export function shouldFilter(text, filterRules) {
  if (filterRules.numbers && numberAndCurrencyRegex.test(text)) return true;
  if (filterRules.chinese && pureChineseRegex.test(text)) return true;
  if (filterRules.containsChinese && containsChineseRegex.test(text)) return true;
  if (filterRules.emojiOnly && emojiOnlyRegex.test(text)) return true;
  if (filterRules.symbols && !containsLetterOrNumberRegex.test(text)) return true;
  if (filterRules.termFilter && IGNORED_TERMS.includes(text)) return true;
  if (filterRules.singleLetter && singleLetterRegex.test(text)) return true;

  return false;
}
