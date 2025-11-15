import { getValue, setValue } from '../../shared/services/tampermonkey.js';
import { log, updateLoggerState } from '../../shared/utils/logger.js';
import { t } from '../../shared/i18n/index.js';
import { applyTheme } from '../../shared/ui/theme.js';
import { switchLanguage } from '../../shared/i18n/management/languageManager.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { updateModalAddonsVisibility } from '../../shared/ui/mainModal.js';
import { fire } from '../../shared/utils/eventBus.js';
import { showNotification } from '../../shared/ui/components/notification.js';
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
  // 悬浮按钮位置
  fabPosition: 'bottom-right',
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
  // -- 以下为特定扫描模式的设置 --
  // 在元素扫描中跨页时是否保留已暂存的数据
  elementScan_persistData: true,
  // 在动态扫描中跨页时是否保留已扫描的数据
  sessionScan_persistData: true,
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
    // 是否过滤文件路径
    filePath: true,
    // 是否过滤十六进制颜色代码
    hexColor: true,
    // 是否过滤邮件地址
    email: true,
    // 是否过滤 UUID
    uuid: true,
    // 是否过滤 Git Commit Hash
    gitCommitHash: true,
    // 是否过滤网址
    websiteUrl: true,
    // 是否过滤带单位的简写数字
    shorthandNumber: true,
  },
};

// --- 公开函数 ---

/**
 * @public
 * @param {object} newSettings - 新的设置对象。
 * @param {object} oldSettings - 旧的设置对象。
 * @description 应用所有与设置相关的副作用，例如主题更改、语言切换等。
 */
export function applySettings(newSettings, oldSettings) {
    updateLoggerState(newSettings.enableDebugLogging);
    applyTheme(newSettings.theme);

    const languageChanged = oldSettings.language !== newSettings.language;
    if (languageChanged) {
        switchLanguage(newSettings.language);
    }

    const fabContainer = uiContainer.querySelector('.text-extractor-fab-container');
    if (fabContainer) {
        fabContainer.classList.toggle('fab-container-visible', newSettings.showFab);
    }
    updateModalAddonsVisibility();
    fire('settingsSaved');
    showNotification(t('notifications.settingsSaved'), { type: 'success' });
}

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
      const parsedSettings = JSON.parse(savedSettings);
      // 创建一个新的合并后设置对象
      const mergedSettings = {
        ...defaultSettings, // 级别1：应用默认设置
        ...parsedSettings,   // 级别2：用已保存的设置覆盖
        filterRules: {
          ...defaultSettings.filterRules, // 级别3：应用默认的过滤规则
          ...(parsedSettings.filterRules || {}), // 级别4：用已保存的过滤规则覆盖
        },
      };
      return mergedSettings;
    } catch (error) {
      log(t('log.settings.parseError'), error);
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
    log(t('log.settings.invalidObject'), newSettings);
    return;
  }

  const oldSettings = loadSettings();

  // 比较顶层设置
  Object.keys(newSettings).forEach(key => {
    if (key !== 'filterRules' && oldSettings[key] !== newSettings[key]) {
      log(t('log.settings.changed', {
        key,
        oldValue: oldSettings[key],
        newValue: newSettings[key],
      }));
    }
  });

  // 比较 filterRules
  const oldRules = oldSettings.filterRules || {};
  const newRules = newSettings.filterRules || {};
  const allRuleKeys = new Set([...Object.keys(oldRules), ...Object.keys(newRules)]);

  allRuleKeys.forEach(key => {
    const oldValue = !!oldRules[key];
    const newValue = !!newRules[key];
    if (oldValue !== newValue) {
      const statusKey = newValue
        ? 'log.settings.filterRuleChanged.enabled'
        : 'log.settings.filterRuleChanged.disabled';
      log(t(statusKey, { key }));
    }
  });

  // 将设置对象序列化为 JSON 字符串并保存
  setValue('script_settings', JSON.stringify(newSettings));
}
