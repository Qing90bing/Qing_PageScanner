import { initUI } from './ui/index.js';
import { initTheme } from './ui/theme.js';
import { initSettingsPanel } from './ui/settingsPanel.js';

(function () {
    'use strict';
    
    // 初始化主题
    initTheme();

    // 初始化用户界面及所有功能
    initUI();

    // 初始化设置面板
    initSettingsPanel();
})();
