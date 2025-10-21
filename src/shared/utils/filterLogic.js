// src/shared/utils/filterLogic.js

/**
 * @module filterLogic
 * @description 提供了统一的、可复用的文本过滤逻辑。
 * 这是项目中所有文本过滤规则的唯一真实来源。
 */

import IGNORED_TERMS from './ignoredTerms.js';
import { filterDefinitions } from '../../features/settings/config.js';

// 将配置转换为更易于查找的映射
const filterConfigMap = new Map(filterDefinitions.map(def => [def.key, def.label]));

// --- 规则检查函数映射 ---

const ruleChecks = new Map([
  ['numbers', {
    regex: /^[$\€\£\¥\d,.\s]+$/,
    label: filterConfigMap.get('numbers')
  }],
  ['chinese', {
    regex: /^[\u4e00-\u9fa5\s]+$/u,
    label: filterConfigMap.get('chinese')
  }],
  ['containsChinese', {
    regex: /[\u4e00-\u9fa5]/u,
    label: filterConfigMap.get('containsChinese')
  }],
  ['emojiOnly', {
    regex: /^[\p{Emoji}\s]+$/u,
    label: filterConfigMap.get('emojiOnly')
  }],
  ['symbols', {
    // 这个逻辑比较特殊，是“不包含字母或数字”，所以我们用一个函数来处理
    test: (text) => !/[\p{L}\p{N}]/u.test(text),
    label: filterConfigMap.get('symbols')
  }],
  ['termFilter', {
    test: (text) => IGNORED_TERMS.includes(text),
    label: filterConfigMap.get('termFilter')
  }],
  ['singleLetter', {
    regex: /^[a-zA-Z]$/,
    label: filterConfigMap.get('singleLetter')
  }],
  ['repeatingChars', {
    regex: /^\s*(.)\1+\s*$/,
    label: filterConfigMap.get('repeatingChars')
  }]
]);

/**
 * @public
 * @description 根据提供的一组规则，判断一个文本字符串是否应该被过滤。
 * @param {string} text - 需要检查的文本（注意：此函数期望传入的是已经 trim() 过的文本）。
 * @param {object} filterRules - 从设置中加载的过滤规则配置对象。
 * @returns {string|null} - 如果文本应该被过滤，则返回过滤原因的字符串；否则返回 null。
 */
export function shouldFilter(text, filterRules) {
  for (const [key, rule] of ruleChecks.entries()) {
    // 检查该规则是否在用户设置中被启用
    if (filterRules[key]) {
      const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
      if (isFiltered) {
        return rule.label; // 如果匹配，返回规则的标签作为原因
      }
    }
  }

  return null; // 如果所有启用的规则都没有匹配，则不过滤
}
