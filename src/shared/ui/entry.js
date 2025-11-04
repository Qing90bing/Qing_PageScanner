// src/ui/index.js

/**
 * @module ui/index
 * @description UI 模块的入口文件。
 * 负责协调和初始化所有用户界面组件。
 */

import { createFab } from './components/fab.js';
import { createMainModal } from './mainModal.js';
import { handleQuickScanClick } from '../../features/quick-scan/ui.js';
import { handleDynamicExtractClick } from '../../features/session-scan/ui.js';
import { handleElementScanClick, reselectElement, getShouldResumeAfterModalClose, setShouldResumeAfterModalClose, isElementScanActive } from '../../features/element-scan/logic.js';
import { loadSettings } from '../../features/settings/logic.js';
import { on } from '../utils/eventBus.js';
import { handleSummaryClick } from './summaryHandler.js'; // New import

/**
 * @description 初始化脚本的整个用户界面。
 * 此函数会创建所有必要的 UI 元素并将它们的功能连接起来。
 */
export function initUI() {
  const settings = loadSettings();

  // 1. 创建主模态框（此时还不可见）
  createMainModal();

  // 2. 根据设置创建悬浮操作按钮 (FAB)
  createFab({
    callbacks: {
        onStaticExtract: handleQuickScanClick,
        onDynamicExtract: handleDynamicExtractClick,
        onSummary: handleSummaryClick, // Updated callback
        onElementScan: handleElementScanClick,
    },
    isVisible: settings.showFab,
  });

  // 添加事件监听器，以在模态框关闭后恢复元素扫描
  on('modalClosed', () => {
    if (isElementScanActive() && getShouldResumeAfterModalClose()) {
        setShouldResumeAfterModalClose(false); // 重置标志
        reselectElement();
    }
  });
}
