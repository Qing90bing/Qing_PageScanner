import { initUI } from './shared/ui/entry.js';
import { initTheme } from './shared/ui/theme.js';
import { initialize as initializeSettings } from './features/settings/index.js';
import { uiContainer } from './shared/ui/uiContainer.js';
import './features/quick-scan/index.js'; // 导入以备将来初始化
import './features/session-scan/index.js'; // 导入以备将来初始化

/**
 * 应用程序的主入口点。
 */
function main() {
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

// 启动应用程序
main();
