// src/ui/theme.js
import { loadSettings } from '../core/settings';

/**
 * 初始化并应用主题
 */
export function initTheme() {
  const { theme } = loadSettings();
  applyTheme(theme);
}

/**
 * 应用指定的主题
 * @param {string} theme - 'light', 'dark', 或 'system'
 */
export function applyTheme(theme) {
  let finalTheme = theme;
  if (theme === 'system') {
    // 检测系统设置
    finalTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // 在 body 元素上设置 data-theme 属性
  document.body.setAttribute('data-theme', finalTheme);
}

// 监听系统颜色方案变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const { theme } = loadSettings();
  if (theme === 'system') {
    applyTheme('system');
  }
});
