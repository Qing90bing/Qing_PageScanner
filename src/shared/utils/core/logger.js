// src/shared/utils/logger.js

/**
 * @module logger
 * @description 提供一个基于用户设置的条件化日志记录器。
 */

import { t } from '../../i18n/index.js';

// 模块级变量，用于缓存调试模式的状态
let isDebugEnabled = false;

/**
 * @public
 * @description 更新日志记录器的调试状态。
 * @param {boolean} isEnabled - 是否应启用日志记录。
 */
export function updateLoggerState(isEnabled) {
  isDebugEnabled = isEnabled;
}

/**
 * @public
 * @description 如果调试模式已启用，则向控制台打印一条消息。
 * @param {...*} args - 要传递给 console.log 的参数。
 */
export function log(...args) {
  if (isDebugEnabled) {
    console.log(t('log.prefix'), ...args);
  }
}
