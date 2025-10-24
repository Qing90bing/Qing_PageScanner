import { initUI } from './shared/ui/entry.js';
import { initTheme } from './shared/ui/theme.js';
import { initialize as initializeSettings } from './features/settings/index.js';
import { uiContainer } from './shared/ui/uiContainer.js';
import { log, updateLoggerState } from './shared/utils/logger.js';
import { loadSettings } from './features/settings/logic.js';
import { initializeLanguage } from './shared/i18n/management/languageManager.js';
import './features/quick-scan/index.js'; // 导入以备将来初始化
import './features/session-scan/index.js'; // 导入以备将来初始化

/**
 * 应用程序的主入口点。
 */
function main() {
  // 1. 加载设置
  const settings = loadSettings();

  // 2. 初始化国际化（i18n）
  initializeLanguage(settings);

  // 3. 根据设置初始化日志记录器
  updateLoggerState(settings.enableDebugLogging);

  log('脚本开始初始化...');
  log('初始设置已加载:', settings);

  // --- 将所有样式注入到Shadow DOM中 ---
  // 这是由 build.js 在构建时定义的全局变量
  const styleElement = document.createElement('style');
  // eslint-disable-next-line no-undef
  styleElement.textContent = __INJECTED_CSS__;
  uiContainer.appendChild(styleElement);
    'use strict';
    
    // 初始化主题
    initTheme();

    // 初始化设置功能
    initializeSettings();

    // 初始化所有核心UI组件和交互
    initUI();
}

// --- 初始化脚本 ---
// 确保脚本只在顶层窗口运行，以避免在 iframe 中重复执行。
if (window.top === window.self) {
    // 确保 DOM 加载完成后再执行脚本
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        // DOMContentLoaded 已经触发
        main();
    }
}
