// src/shared/utils/trustedTypes.js

let workerPolicy;
let htmlPolicy;

// 检查 Trusted Types API 是否可用
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  // --- 用于 Worker 的策略 ---
  try {
    workerPolicy = window.trustedTypes.createPolicy('text-extractor-worker', {
      createScriptURL: (url) => url,
    });
  } catch (e) {
    if (!(e.name === 'TypeError' && e.message.includes('Policy already exists'))) {
      console.error('Failed to create Trusted Types worker policy:', e);
    }
    // 如果策略已存在或创建失败，workerPolicy 将保持 undefined
  }

  // --- 用于 innerHTML 的策略 ---
  try {
    htmlPolicy = window.trustedTypes.createPolicy('text-extractor-html', {
      createHTML: (htmlString) => htmlString, // 在这里可以根据需要添加净化逻辑
    });
  } catch (e) {
    if (!(e.name === 'TypeError' && e.message.includes('Policy already exists'))) {
      console.error('Failed to create Trusted Types HTML policy:', e);
    }
     // 如果策略已存在或创建失败，htmlPolicy 将保持 undefined
  }
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
          console.warn('Trusted Types default policy failed for worker URL, falling back to raw URL.', e);
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
          console.warn('Trusted Types default policy failed for HTML, falling back to raw string.', e);
      }
  }
  return htmlString;
}
