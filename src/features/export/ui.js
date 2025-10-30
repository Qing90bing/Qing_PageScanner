// src/features/export/ui.js

/**
 * @module export-ui
 * @description 负责创建和管理导出功能的 UI 组件，包括导出按钮和菜单。
 */

import exportIcon from '../../assets/icons/exportIcon.js';
import { txtIcon } from '../../assets/icons/txtIcon.js';
import { jsonIcon } from '../../assets/icons/jsonIcon.js';
import { csvIcon } from '../../assets/icons/csvIcon.js';
import { t } from '../../shared/i18n/index.js';
import { createIconTitle } from '../../shared/ui/iconTitle.js';
import { on, fire } from '../../shared/utils/eventBus.js';
import { createDropdown } from '../../shared/ui/components/dropdown.js';
import { log } from '../../shared/utils/logger.js';

let exportBtn, exportMenu, exportTxtBtn, exportJsonBtn, exportCsvBtn;

/**
 * @private
 * @description 更新导出按钮和菜单中所有需要翻译的文本。
 */
function rerenderExportTexts() {
    if (exportBtn) {
        exportBtn.replaceChildren();
        exportBtn.appendChild(createIconTitle(exportIcon, t('common.export')));
    }
    if (exportMenu) {
        exportTxtBtn.replaceChildren(createIconTitle(txtIcon, t('export.exportAsTxt')));
        exportJsonBtn.replaceChildren(createIconTitle(jsonIcon, t('export.exportAsJson')));
        exportCsvBtn.replaceChildren(createIconTitle(csvIcon, t('export.exportAsCsv')));
    }
}

/**
 * @description 创建导出按钮及其相关的下拉菜单。
 * @returns {HTMLElement} 包含导出按钮和菜单的容器元素。
 */
export function createExportButton() {
    const container = document.createElement('div');
    container.className = 'tc-export-btn-container';

    exportBtn = document.createElement('button');
    exportBtn.className = 'text-extractor-export-btn tc-button';

    exportMenu = document.createElement('div');
    exportMenu.className = 'tc-export-menu';

    exportTxtBtn = document.createElement('button');
    exportTxtBtn.className = 'tc-export-txt-btn';
    exportTxtBtn.dataset.format = 'txt';

    exportJsonBtn = document.createElement('button');
    exportJsonBtn.className = 'tc-export-json-btn';
    exportJsonBtn.dataset.format = 'json';

    exportCsvBtn = document.createElement('button');
    exportCsvBtn.className = 'tc-export-csv-btn';
    exportCsvBtn.dataset.format = 'csv';

    exportMenu.appendChild(exportTxtBtn);
    exportMenu.appendChild(exportJsonBtn);
    exportMenu.appendChild(exportCsvBtn);

    container.appendChild(exportBtn);
    container.appendChild(exportMenu);

    rerenderExportTexts();

    const dropdown = createDropdown(exportBtn, exportMenu);

    const handleExport = (event) => {
        const target = event.target.closest('[data-format]');
        if (target) {
            const format = target.dataset.format;
            log(t('log.exporter.buttonClicked', { format }));
            fire('exportToFile', { format });
            dropdown.toggle(); // 导出后关闭菜单
        }
    };

    exportMenu.addEventListener('click', handleExport);

    on('languageChanged', rerenderExportTexts);

    // 默认禁用按钮
    exportBtn.disabled = true;

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
