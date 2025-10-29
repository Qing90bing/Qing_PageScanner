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
  }],
  ['filePath', {
    regex: /^(?:[a-zA-Z]:\\|\\\\|~|\.\.?\/)[\w\-\.\/ \\]*[\w\-\.]+\.[\w]{2,4}$/,
    label: filterConfigMap.get('filePath')
  }],
  ['hexColor', {
    regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
    label: filterConfigMap.get('hexColor')
  }],
  ['email', {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    label: filterConfigMap.get('email')
  }],
  ['uuid', {
    regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    label: filterConfigMap.get('uuid')
  }],
  ['gitCommitHash', {
    regex: /^[0-9a-f]{7,40}$/i,
    label: filterConfigMap.get('gitCommitHash')
  }],
  ['websiteUrl', {
    // 匹配常见的网址格式，包括协议、www前缀和裸域名，要求严格匹配整个字符串以避免误伤。
    regex: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/,
    label: filterConfigMap.get('websiteUrl')
  }],
  ['shorthandNumber', {
    // 匹配带k/m/b后缀的数字，支持整数、浮点数、大小写以及可选的空格。
    regex: /^\d+(\.\d+)?\s?[kmb]$/i,
    label: filterConfigMap.get('shorthandNumber')
  }]
]);

/**
 * @public
 * @description 根据提供的一组规则，判断一个文本字符串是否应该被过滤。
 * @description 根据提供的一组规则，判断一个文本字符串是否应该被过滤。
 * @param {string} text - 需要检查的文本（注意：此函数期望传入的是已经 trim() 过的文本）。
 * @param {object} filterRules - 从设置中加载的过滤规则配置对象。
 * @returns {{ reason: string }|null} - 如果文本应该被过滤，则返回一个包含过滤原因的对象；否则返回 null。
 */
export function shouldFilter(text, filterRules) {
  for (const [key, rule] of ruleChecks.entries()) {
    if (filterRules[key]) {
      const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
      if (isFiltered) {
        return { reason: rule.label };
      }
    }
  }

  return null;
}
