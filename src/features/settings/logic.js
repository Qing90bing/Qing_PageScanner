import { updateLoggerState } from '../../shared/utils/core/logger.js';
import { t } from '../../shared/i18n/index.js';
import { applyTheme } from '../../shared/ui/theme.js';
import { switchLanguage } from '../../shared/i18n/management/languageManager.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { updateModalAddonsVisibility } from '../../shared/ui/mainModal/index.js';
import { fire } from '../../shared/utils/core/eventBus.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { loadSettings, saveSettings } from '../../shared/services/settings.js';

/**
 * @module settingsEffects
 * @description 应用设置变更后的运行时副作用。
 * 设置的默认值、读取和持久化由 `shared/services/settings.js` 负责；
 * 本模块只负责把设置变更同步到主题、语言和界面状态。
 */
export { loadSettings, saveSettings };

/**
 * @public
 * @param {object} newSettings - 新的设置对象。
 * @param {object} oldSettings - 旧的设置对象。
 * @description 应用所有与设置相关的副作用，例如主题更改、语言切换等。
 */
export function applySettings(newSettings, oldSettings) {
    updateLoggerState(newSettings.enableDebugLogging);
    applyTheme(newSettings.theme);

    const languageChanged = oldSettings.language !== newSettings.language;
    if (languageChanged) {
        switchLanguage(newSettings.language);
    }

    const fabContainer = uiContainer.querySelector('.text-extractor-fab-container');
    if (fabContainer) {
        fabContainer.classList.toggle('fab-container-visible', newSettings.showFab);
    }
    updateModalAddonsVisibility();

    // switchLanguage 会同步触发 languageChanged，订阅者完成更新后再通知保存结果。
    fire('settingsSaved');
    showNotification(t('notifications.settingsSaved'), { type: 'success' });
}
