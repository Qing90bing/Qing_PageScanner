// src/main.js

import { initUI } from './shared/ui/entry.js';
import { initTheme } from './shared/ui/theme.js';
import { initialize as initializeSettings } from './features/settings/index.js';
import { uiContainer } from './shared/ui/uiContainer.js';
import { log, updateLoggerState } from './shared/utils/logger.js';
import { loadSettings } from './features/settings/logic.js';
import { initializeExporter } from './features/export/exporter.js';
import { t } from './shared/i18n/index.js';
import { initializeLanguage } from './shared/i18n/management/languageManager.js';
import { getValue, setValue } from './shared/services/tampermonkey.js';
import { getSessionScanData, isSessionRecording } from './features/session-scan/logic.js';
import { handleDynamicExtractClick } from './features/session-scan/ui.js';
import { getStagedTexts, isElementScanActive, handleElementScanClick } from './features/element-scan/logic.js';
import { showNotification } from './shared/ui/components/notification.js';
import { getElementScanFab } from './shared/ui/components/fab.js';
export { initUI };

// --- Data Persistence ---

window.addEventListener('beforeunload', () => {
    const settings = loadSettings();
    let dataToPersist = null;
    let scanType = null;

    if (isSessionRecording() && settings.dynamicScanSettings.persistDataAcrossPages) {
        dataToPersist = getSessionScanData();
        scanType = 'dynamic';
    } else if (isElementScanActive() && settings.elementScanSettings.persistDataAcrossPages) {
        dataToPersist = getStagedTexts();
        scanType = 'element';
    }

    if (dataToPersist && dataToPersist.length > 0) {
        setValue('persistedScanData', JSON.stringify(dataToPersist));
        setValue('persistedScanType', scanType);
    } else {
        setValue('persistedScanData', null);
        setValue('persistedScanType', null);
    }
});


/**
 * 应用程序的主入口点。
 */
// 导出 main 函数以供测试和全局访问
export async function initialize() {
  // 将顶层窗口检查移入函数内部
  if (window.top !== window.self) {
    log(t('log.main.inIframe'));
    return;
  }

  // 1. 尝试恢复持久化数据
  const persistedDataJSON = await getValue('persistedScanData', null);
  const persistedScanType = await getValue('persistedScanType', null);
  let restoredData = [];

  if (persistedDataJSON) {
      try {
          restoredData = JSON.parse(persistedDataJSON);
      } catch (e) {
          restoredData = [];
      }
  }

  // 2. 加载设置
  const settings = loadSettings();

  // 3. 初始化国际化（i18n）
  initializeLanguage(settings);

  // 4. 如果有恢复的数据，则启动相应扫描
  if (restoredData.length > 0 && persistedScanType) {
      const shouldRestoreDynamic = persistedScanType === 'dynamic' && settings.dynamicScanSettings.persistDataAcrossPages;
      const shouldRestoreElement = persistedScanType === 'element' && settings.elementScanSettings.persistDataAcrossPages;

      if (shouldRestoreDynamic || shouldRestoreElement) {
          showNotification(t('notifications.restoringSession'), { type: 'info' });
          setValue('persistedScanData', null);
          setValue('persistedScanType', null);

          if (shouldRestoreDynamic) {
              handleDynamicExtractClick(restoredData);
          } else if (shouldRestoreElement) {
              handleElementScanClick(restoredData);
          }
      }
  }

  // 3. 根据设置初始化日志记录器
  updateLoggerState(settings.enableDebugLogging);

  log(t('log.main.initializing'));
  log(t('log.main.initialSettingsLoaded'), settings);

  // --- 将所有样式注入到Shadow DOM中 ---
  // 这是由 build.js 在构建时定义的全局变量
  const styleElement = document.createElement('style');
  // eslint-disable-next-line no-undef
  styleElement.textContent = __INJECTED_CSS__;
  uiContainer.appendChild(styleElement);

  // 初始化主题
  initTheme();

  // 初始化设置功能
  initializeSettings();

  // 初始化所有核心UI组件和交互
  initUI();

  // 初始化导出器
  initializeExporter();
}

// --- 初始化脚本 ---
// 确保 DOM 加载完成后再执行脚本
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    // DOMContentLoaded 已经触发
    initialize();
}
