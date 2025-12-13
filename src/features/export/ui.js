// src/features/export/ui.js

/**
 * @module export-ui
 * @description 负责创建和管理导出功能的 UI 组件，包括导出按钮。
 */

import { exportIcon } from '../../assets/icons/exportIcon.js';
import { t } from '../../shared/i18n/index.js';
import { on, fire } from '../../shared/utils/eventBus.js';
import { log } from '../../shared/utils/logger.js';
import { createButton } from '../../shared/ui/components/button.js';

let exportBtn, unsubscribeLanguageChanged;

/**
 * @private
 * @description 更新导出按钮的文本。
 */
function rerenderExportTexts() {
    if (exportBtn) {
        exportBtn.updateText('common.export');
    }
}

/**
 * @description 创建导出按钮。
 * @returns {HTMLElement} 包含导出按钮的容器元素。
 */
export function createExportButton() {
    const container = document.createElement('div');
    container.className = 'tc-export-btn-container';

    exportBtn = createButton({
        className: 'text-extractor-export-btn',
        textKey: 'common.export',
        icon: exportIcon,
        disabled: true,
        onClick: () => {
            log(t('log.exporter.buttonClicked', { format: 'auto' }));
            fire('exportToFile', {}); // 由逻辑模块根据设置决定格式
        }
    });

    container.appendChild(exportBtn);

    unsubscribeLanguageChanged = on('languageChanged', rerenderExportTexts);

    // 添加 destroy 方法
    container.destroy = () => {
        if (exportBtn) {
            exportBtn.destroy();
            exportBtn = null;
        }
        if (unsubscribeLanguageChanged) {
            unsubscribeLanguageChanged();
            unsubscribeLanguageChanged = null;
        }
        log('Export UI cleaned up.');
    };

    return container;
}

/**
 * @description 根据文本区域是否有内容，更新导出按钮的启用/禁用状态。
 * @param {boolean} hasContent - 文本区域是否有内容。
 */
export function updateExportButtonState(hasContent) {
    if (exportBtn) {
        exportBtn.disabled = !hasContent;
    }
}
