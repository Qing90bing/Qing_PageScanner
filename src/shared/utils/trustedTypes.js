// src/shared/utils/trustedTypes.js

let workerPolicy;

// 检查 Trusted Types API 是否可用
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  try {
    // 尝试创建（或获取现有的）策略
    workerPolicy = window.trustedTypes.createPolicy('text-extractor-worker', {
      createScriptURL: (url) => url,
    });
  } catch (e) {
    // 如果策略已存在，则静默处理错误
    // 在某些油猴脚本环境中，脚本可能会被多次注入或重置，导致策略重复创建
    if (e.name === 'TypeError' && e.message.includes('Policy already exists')) {
       // 策略已经存在，我们可以安全地忽略这个错误。
       // 但是，我们无法直接获取现有策略的引用，
       // 所以我们将让 createTrustedWorkerUrl 在需要时返回原始URL。
       // 更好的方法是使用一个try-catch来创建，如果失败就让函数返回原始值。
       workerPolicy = null; // 标记为不可用
    } else {
      console.error('Failed to create Trusted Types policy:', e);
      workerPolicy = null;
    }
  }
}

/**
 * 根据 Trusted Types 策略，将一个字符串URL转换为一个 TrustedScriptURL。
 * 如果 Trusted Types 不可用或策略创建失败，则返回原始的URL字符串。
 * @param {string} url - 要处理的 Blob URL。
 * @returns {string|TrustedScriptURL} - 可安全用于 Worker 构造函数的 URL。
 */
export function createTrustedWorkerUrl(url) {
  // 重新检查策略是否存在，因为初始创建可能会失败
  if (workerPolicy) {
    return workerPolicy.createScriptURL(url);
  }

  // 如果策略不存在（因为API不支持，或已存在但无法获取），
  // 我们尝试一种备用方法：直接使用默认策略。
  // 在某些严格的CSP环境中，这可能是必需的。
  if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
      try {
          return window.trustedTypes.defaultPolicy.createScriptURL(url);
      } catch (e) {
          // 如果默认策略也失败了，我们只能返回原始URL，并寄希望于环境不那么严格。
          console.warn('Trusted Types default policy failed, falling back to raw URL.', e);
          return url;
      }
  }

  // 如果以上都不行，返回原始URL
  return url;
}
