// src/shared/utils/trustedTypes.js
import { log } from '../core/logger.js';
import { t } from '../../i18n/index.js';

let workerPolicy;
let htmlPolicy;

// 缓存策略的全局变量名
const GLOBAL_WORKER_POLICY_KEY = '__qing_scanner_worker_policy__';
const GLOBAL_HTML_POLICY_KEY = '__qing_scanner_html_policy__';

// 策略候选名称列表 (Master Key Ring)
// 按优先级排序，依次尝试
const POLICY_CANDIDATES = [
  'qing-page-scanner', // 默认首选
  'AGPolicy',          // Google 系常用
  'opal',              // Google 系常用
  'google#html',       // Google 系常用
  'default',           // 标准默认
  'sanitizer',         // 常见库使用的名称
  'dompurify',         // DOMPurify 默认名称
  'allow-duplicates'   // 某些特殊的全部允许配置
];

/**
 * 尝试使用候选列表创建最佳的可用策略
 * @param {string} typePrefix - 用于日志的标识前缀
 * @param {object} policyOptions - 策略配置对象
 * @param {string} globalCacheKey - 全局缓存键名
 * @returns {TrustedTypePolicy|null} 成功创建的策略对象，或 null
 */
function createBestEffortPolicy(typePrefix, policyOptions, globalCacheKey) {
  // 1. 检查全局缓存
  if (window[globalCacheKey]) {
    return window[globalCacheKey];
  }

  // 2. 轮询候选列表
  for (const name of POLICY_CANDIDATES) {
    try {
      // 尝试创建策略
      const policy = window.trustedTypes.createPolicy(name, policyOptions);

      // 如果成功，缓存并返回
      window[globalCacheKey] = policy;
      log(t('log.trustedTypes.policyCreated', { name, type: typePrefix }));
      return policy;
    } catch (e) {
      // 只有当错误是因为 CSP 拒绝时才继续尝试
      // "Policy already exists" 也是一种拒绝（名字被占用了且不给重复），也需要换下一个名字
      // 即：只要报错，就换下一个
      continue;
    }
  }

  // 3. 所有尝试都失败
  log(t('log.trustedTypes.allPoliciesFailed', { type: typePrefix }), null, true);
  return null;
}

// 检查 Trusted Types API 是否可用
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // --- 用于 Worker 的策略 ---
  workerPolicy = createBestEffortPolicy('worker', {
    createScriptURL: (url) => url,
  }, GLOBAL_WORKER_POLICY_KEY);

  // --- 用于 innerHTML 的策略 ---
  htmlPolicy = createBestEffortPolicy('html', {
    createHTML: (htmlString) => htmlString,
  }, GLOBAL_HTML_POLICY_KEY);
}

/**
 * 根据 Trusted Types 策略，将一个字符串URL转换为一个 TrustedScriptURL。
 * 如果 Trusted Types 不可用或策略创建失败，则返回原始的URL字符串。
 * @param {string} url - 要处理的 Blob URL。
 * @returns {string|TrustedScriptURL} - 可安全用于 Worker 构造函数的 URL。
 */
export function createTrustedWorkerUrl(url) {
  if (workerPolicy) {
    return workerPolicy.createScriptURL(url);
  }
  // 作为备用，尝试使用可能存在的默认策略
  if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
    try {
      return window.trustedTypes.defaultPolicy.createScriptURL(url);
    } catch (e) {
      log(t('log.trustedTypes.defaultWorkerPolicyWarning'), e, true);
    }
  }
  return url;
}

/**
 * 根据 Trusted Types 策略，将一个字符串转换为一个 TrustedHTML 对象。
 * 这对于需要使用 innerHTML 的场景是必需的，以符合严格的 CSP（内容安全策略）。
 * 如果 Trusted Types 不可用或策略创建失败，则返回原始的 HTML 字符串。
 * @param {string} htmlString - 要处理的 HTML 字符串。
 * @returns {string|TrustedHTML} - 可安全用于 innerHTML 的值。
 */
export function createTrustedHTML(htmlString) {
  if (htmlPolicy) {
    return htmlPolicy.createHTML(htmlString);
  }
  // 作为备用，尝试使用可能存在的默认策略
  if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
    try {
      return window.trustedTypes.defaultPolicy.createHTML(htmlString);
    } catch (e) {
      log(t('log.trustedTypes.defaultHtmlPolicyWarning'), e, true);
    }
  }
  return htmlString;
}
