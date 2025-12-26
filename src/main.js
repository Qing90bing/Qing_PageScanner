// src/main.js

import { initUI } from './shared/ui/entry.js';
import { initTheme } from './shared/ui/theme.js';
import { initialize as initializeSettings } from './features/settings/index.js';
import { uiContainer } from './shared/ui/uiContainer.js';
import { log, updateLoggerState } from './shared/utils/core/logger.js';
import { loadSettings } from './features/settings/logic.js';
import { initializeExporter } from './features/export/exporter.js';
import { t } from './shared/i18n/index.js';
import { initializeLanguage } from './shared/i18n/management/languageManager.js';
import { loadAndResumeSession } from './shared/services/sessionPersistence.js';
export { initUI };

/**
 * 应用程序的主入口点。
 */
// 导出 main 函数以供测试和全局访问
export async function initialize() {
  // 将顶层窗口检查移入函数内部
  if (window.top !== window.self) {
    log(t('log.main.inIframe'));
    return;
  }

  // 1. 加载设置
  const settings = loadSettings();

  // 2. 初始化国际化（i18n）
  initializeLanguage(settings);

  // 3. 根据设置初始化日志记录器
  updateLoggerState(settings.enableDebugLogging);

  log(t('log.main.initializing'));
  log(t('log.main.initialSettingsLoaded'), settings);

  // --- 将所有样式注入到Shadow DOM中 ---
  // 这是由 build.js 在构建时定义的全局变量
  const styleElement = document.createElement('style');
  // eslint-disable-next-line no-undef
  styleElement.textContent = __INJECTED_CSS__;
  uiContainer.appendChild(styleElement);

  // 初始化主题
  initTheme();

  // 初始化设置功能
  initializeSettings();

  // 初始化所有核心UI组件和交互
  initUI();

  // 初始化导出器
  initializeExporter();

  // 在所有UI都初始化完毕后，检查并恢复会话
  try {
    await loadAndResumeSession();
  } catch (e) {
    log(t('log.main.resumeFailed'), e);
  }
}

// --- 初始化脚本 ---
// 确保 DOM 加载完成后再执行脚本
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // DOMContentLoaded 已经触发
  initialize();
}
