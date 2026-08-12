// src/shared/utils/core/logger.js

/**
 * @module logger
 * @description 提供一个基于用户设置的条件化日志记录器。
 */

const DEFAULT_LOG_PREFIX = '[Qing PageScanner]';
const loggerState = {
    isDebugEnabled: false,
    prefix: DEFAULT_LOG_PREFIX,
};

/**
 * @public
 * @description 更新日志记录器的调试状态。
 * @param {boolean} isEnabled - 是否应启用日志记录。
 */
export function updateLoggerState(isEnabled) {
    loggerState.isDebugEnabled = Boolean(isEnabled);
}

/**
 * @public
 * @description 更新日志前缀。由国际化层在语言切换后主动注入，避免核心日志工具反向依赖国际化模块。
 * @param {string} prefix - 已翻译的日志前缀。
 */
export function updateLoggerPrefix(prefix) {
    const normalizedPrefix = String(prefix || '').trim();
    loggerState.prefix = normalizedPrefix || DEFAULT_LOG_PREFIX;
}

/**
 * @public
 * @description 如果调试模式已启用，则向控制台打印一条消息。
 * @param {...*} args - 要传递给 console.log 的参数。
 */
export function log(...args) {
    if (loggerState.isDebugEnabled) {
        console.log(loggerState.prefix, ...args);
    }
}
