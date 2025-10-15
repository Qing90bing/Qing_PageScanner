// src/ui/index.js

/**
 * @module ui/index
 * @description UI 模块的入口文件。
 * 负责协调和初始化所有用户界面组件。
 */

import { createFab } from './components/fab.js';
import { createMainModal, openModal } from './components/mainModal.js';

/**
 * @description 初始化脚本的整个用户界面。
 * 此函数会创建所有必要的 UI 元素并将它们的功能连接起来。
 */
export function initUI() {
  // 1. 创建主模态框（此时还不可见）
  // 将其创建放在最前面，以确保 FAB 点击时它已准备就绪
  createMainModal();

  // 2. 创建悬浮操作按钮 (FAB)
  // 当 FAB 被点击时，调用 mainModal.js 中导出的 openModal 函数
  createFab(openModal);
}
