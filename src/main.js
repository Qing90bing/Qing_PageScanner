import { addStyle } from './shared/services/tampermonkey';
import { initUI } from './shared/ui/entry.js';
import { initTheme } from './shared/ui/theme.js';
import { initialize as initializeSettings } from './features/settings/index.js';
import './features/quick-scan/index.js'; // 导入以备将来初始化
import './features/session-scan/index.js'; // 导入以备将来初始化

// --- 全局CSS注入 ---
// 这是由 build.js 在构建时定义的全局变量
// eslint-disable-next-line no-undef
addStyle(__INJECTED_CSS__);

/**
 * 应用程序的主入口点。
 */
function main() {
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
