import { t } from '../../shared/i18n/index.js';

/**
 * @module features/scan-settings/panelBuilder
 * @description Builds the DOM for the contextual scan settings panel.
 */

/**
 * Creates and returns the DOM element for the scan mode settings panel.
 * @param {string} scanType - The type of scan ('dynamic' or 'element').
 * @param {object} settings - The current settings object for the scan type.
 * @returns {HTMLElement} The fully constructed panel element.
 */
export function buildScanModePanelDOM(scanType, settings) {
    const container = document.createElement('div');
    container.className = 'settings-panel-content';

    // Header
    const header = document.createElement('div');
    header.className = 'settings-panel-header';
    const titleKey = scanType === 'dynamic' ? 'scanSettings.dynamic.title' : 'scanSettings.element.title';
    header.textContent = t(titleKey);
    container.appendChild(header);

    // Content Body
    const body = document.createElement('div');
    body.className = 'settings-panel-body';
    container.appendChild(body);

    // Persistence Setting
    const persistSetting = createCheckboxSetting(
        'persist-data-checkbox',
        t('scanSettings.persistData'),
        settings.persistDataAcrossPages
    );
    body.appendChild(persistSetting);

    return container;
}

/**
 * Helper function to create a checkbox setting row.
 * @param {string} id - The ID for the checkbox input element.
 * @param {string} labelText - The text for the label.
 * @param {boolean} isChecked - The initial checked state of the checkbox.
 * @returns {HTMLElement} The setting row element.
 */
function createCheckboxSetting(id, labelText, isChecked) {
    const settingRow = document.createElement('div');
    settingRow.className = 'setting-row';

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.checked = isChecked;

    settingRow.appendChild(label);
    settingRow.appendChild(checkbox);

    return settingRow;
}
