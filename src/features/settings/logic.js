import { getValue, setValue } from '../../shared/services/tampermonkey.js';
import { log } from '../../shared/utils/logger.js';
// src/core/settings.js

/**
 * @module core/settings
 * @description 负责管理脚本的用户设置，包括加载、保存和提供默认值。
 * 使用 Tampermonkey 的 GM_getValue 和 GM_setValue API 进行持久化存储。
 */

// --- 常量 ---
/**
 * @private
 * @readonly
 * @type {object}
 * @description 默认设置对象。
 * 当用户第一次运行脚本或存储中没有有效设置时，将使用此对象。
 * 这也确保了在未来版本中添加新设置项时，老用户能平滑过渡。
 */
const defaultSettings = {
  // 语言设置, 'auto' 表示自动检测
  language: 'auto',
  // 主题设置, 可选值: 'light', 'dark', 'system'
  theme: 'system',
  // 是否显示悬浮按钮
  showFab: true,
  // 是否在标题栏显示扫描计数
  showScanCount: true,
  // 是否显示行号
  showLineNumbers: true,
  // 是否显示统计信息
  showStatistics: true,
  // 是否启用文本自动换行
  enableWordWrap: false,
  // 是否启用文本截断
  enableTextTruncation: true,
  // 文本截断长度
  textTruncationLength: 50000,
  // 是否启用调试日志
  enableDebugLogging: false,
  // 过滤规则设置
  filterRules: {
    // 是否过滤纯数字和货币符号组成的字符串
    numbers: true,
    // 是否过滤纯中文字符串
    chinese: true,
    // 是否过滤包含中文字符的字符串
    containsChinese: false,
    // 是否过滤纯表情符号字符串
    emojiOnly: true,
    // 是否过滤纯符号字符串
    symbols: true,
    // 是否过滤特定术语列表中的字符串
    termFilter: true,
    // 是否过滤纯单个英文字母
    singleLetter: false,
    // 是否过滤单一重复字符
    repeatingChars: true,
  },
};

// --- 公开函数 ---

/**
 * @public
 * @returns {object} 返回一个包含所有设置的配置对象。
 * @description 从 Tampermonkey 存储中加载用户设置。
 * 如果找不到已保存的设置，则返回默认设置。
 * 它还会将已保存的设置与默认设置合并，以处理未来可能新增的设置项。
 */
export function loadSettings() {
  // 从存储中读取名为 'script_settings' 的值，如果不存在则返回 null
  const savedSettings = getValue('script_settings', null);

  if (savedSettings) {
    try {
      // 使用默认设置作为基础，然后用保存的设置覆盖它
      // 这样即使用户的存储中缺少新的设置项，也能获得默认值
      const loadedSettings = {
        ...defaultSettings,
        ...JSON.parse(savedSettings),
      };
      return loadedSettings;
    } catch (error) {
      console.error("解析已保存的设置时出错:", error);
      // 如果解析失败，返回默认设置以保证脚本能继续运行
      return defaultSettings;
    }
  }

  // 如果没有保存过设置，直接返回默认设置
  return defaultSettings;
}

/**
 * @public
 * @param {object} settings - 需要保存到存储中的设置对象。
 * @description 将用户的设置对象转换为 JSON 字符串，并保存到 Tampermonkey 存储中。
 */
export function saveSettings(newSettings) {
  if (typeof newSettings !== 'object' || newSettings === null) {
    console.error("尝试保存的设置不是一个有效的对象:", newSettings);
    return;
  }

  const oldSettings = loadSettings();

  // 比较顶层设置
  Object.keys(newSettings).forEach(key => {
    if (key !== 'filterRules') {
      if (oldSettings[key] !== newSettings[key]) {
        log(`设置 '${key}' 已从 '${oldSettings[key]}' 更改为 '${newSettings[key]}'`);
      }
    }
  });

  // 比较 filterRules
  const oldRules = oldSettings.filterRules || {};
  const newRules = newSettings.filterRules || {};
  Object.keys(newRules).forEach(key => {
    if (oldRules[key] !== newRules[key]) {
      const status = newRules[key] ? '启用' : '禁用';
      log(`过滤规则 '${key}' 已被${status}`);
    }
  });


  // 将设置对象序列化为 JSON 字符串并保存
  setValue('script_settings', JSON.stringify(newSettings));
}
