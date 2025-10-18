// src/shared/services/tampermonkey.js

/**
 * 油猴API的二次封装，用于解耦和提高可测试性。
 * 所有对 GM_* 函数的调用都应通过此模块进行。
 */

/**
 * 注册一个菜单命令。
 * @param {string} caption - 菜单项的标题。
 * @param {Function} commandFunc - 点击菜单项时执行的函数。
 * @returns {number} 返回已注册命令的ID，可用于注销。
 */
export const registerMenuCommand = (caption, commandFunc) => {
  return GM_registerMenuCommand(caption, commandFunc);
};

/**
 * 将文本复制到剪贴板。
 * @param {string} text - 要复制的文本。
 */
export const setClipboard = (text) => {
  GM_setClipboard(text, 'text');
};

/**
 * 从油猴存储中获取一个值。
 * @param {string} key - 值的键名。
 * @param {any} defaultValue - 如果未找到值，则返回的默认值。
 * @returns {Promise<any>} 返回一个Promise，解析为存储的值。
 */
export const getValue = (key, defaultValue) => {
  return GM_getValue(key, defaultValue);
};

/**
 * 将一个值保存到油猴存储中。
 * @param {string} key - 值的键名。
 * @param {any} value - 要存储的值。
 * @returns {Promise<void>} 返回一个Promise，在值保存后解析。
 */
export const setValue = (key, value) => {
  return GM_setValue(key, value);
};

/**
 * 向文档中注入CSS样式。
 * @param {string} css - 要注入的CSS字符串。
 */
export const addStyle = (css) => {
  GM_addStyle(css);
};
