// src/ui/components/fab.js

/**
 * @module fab
 * @description 负责创建和管理悬浮操作按钮（Floating Action Button）。
 */

import { translateIcon } from '../../assets/icon.js';

/**
 * @description 创建并初始化悬浮操作按钮。
 * @param {function} onClick - 当按钮被点击时要执行的回调函数。
 * @returns {HTMLElement} - 创建的 FAB 元素。
 */
export function createFab(onClick) {
  // 1. 创建按钮的 DOM 元素
  const fab = document.createElement('div');
  fab.className = 'text-extractor-fab';
  fab.innerHTML = translateIcon; // 从 icon.js 导入 SVG 图标

  // 2. 绑定点击事件
  fab.addEventListener('click', onClick);

  // 3. 将按钮添加到页面中
  document.body.appendChild(fab);

  return fab;
}
