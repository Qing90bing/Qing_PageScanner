// src/ui/index.js

/**
 * @module ui/index
 * @description UI 模块的入口文件。
 * 负责协调和初始化所有用户界面组件。
 */

import { createFab } from './components/fab.js';
import { createMainModal } from './mainModal.js';
import { handleQuickScanClick } from '../../features/quick-scan/ui.js';
import { handleDynamicExtractClick, handleSummaryClick } from '../../features/session-scan/ui.js';
import { loadSettings } from '../../features/settings/logic.js';
import { clearSessionTexts } from '../../features/session-scan/logic.js';

/**
 * @description 初始化脚本的整个用户界面。
 * 此函数会创建所有必要的 UI 元素并将它们的功能连接起来。
 */
export function initUI() {
  const settings = loadSettings();

  // 1. 创建主模态框（此时还不可见），并传入清空会话的回调
  createMainModal({
    clearSessionCallback: clearSessionTexts
  });

  // 2. 根据设置创建悬浮操作按钮 (FAB)
  createFab({
    callbacks: {
        onStaticExtract: handleQuickScanClick,
        onDynamicExtract: handleDynamicExtractClick,
        onSummary: handleSummaryClick,
    },
    isVisible: settings.showFab,
  });
}
