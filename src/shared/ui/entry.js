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

/**
 * @description 初始化脚本的整个用户界面。
 * 此函数会创建所有必要的 UI 元素并将它们的功能连接起来。
 */
export function initUI() {
  // 1. 创建主模态框（此时还不可见）
  createMainModal();

  // 2. 创建悬浮操作按钮 (FAB)，并传入各个功能模块的回调函数
  createFab({
    onStaticExtract: handleQuickScanClick,
    onDynamicExtract: handleDynamicExtractClick,
    onSummary: handleSummaryClick,
  });
}
