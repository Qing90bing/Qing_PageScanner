// src/features/settings/panelBuilder.js

import { createCheckbox } from '../../shared/ui/checkbox.js';
import { createIconTitle } from '../../shared/ui/iconTitle.js';
import { createSVGFromString } from '../../shared/utils/dom.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { themeIcon } from '../../assets/icons/themeIcon.js';
import { filterIcon } from '../../assets/icons/filterIcon.js';
import { saveIcon } from '../../assets/icons/saveIcon.js';
import { closeIcon } from '../../assets/icons/closeIcon.js';
import { relatedSettingsIcon } from '../../assets/icons/relatedSettingsIcon.js';
import { filterDefinitions, relatedSettingsDefinitions } from './config.js';

/**
 * @private
 * @description 创建并构建设置面板的 DOM 结构。
 * @param {object} settings - 当前的设置对象。
 * @returns {HTMLElement} - 构建好的设置面板模态框元素。
 */
export function buildPanelDOM(settings) {
    const modal = document.createElement('div');
    modal.className = 'settings-panel-modal';

    // --- Header ---
    const header = document.createElement('div');
    header.className = 'settings-panel-header';
    const titleContainer = document.createElement('div');
    titleContainer.id = 'settings-panel-title-container';
    const closeBtn = document.createElement('span');
    closeBtn.className = 'tc-close-button settings-panel-close';
    closeBtn.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer);
    header.appendChild(closeBtn);

    // --- Content ---
    const content = document.createElement('div');
    content.className = 'settings-panel-content';

    // Theme setting
    const themeItem = document.createElement('div');
    themeItem.className = 'setting-item';
    const themeTitleContainer = document.createElement('div');
    themeTitleContainer.id = 'theme-setting-title-container';
    themeTitleContainer.className = 'setting-title-container';
    const selectWrapper = document.createElement('div');
    selectWrapper.id = 'custom-select-wrapper';
    themeItem.appendChild(themeTitleContainer);
    themeItem.appendChild(selectWrapper);

    // Related settings
    const relatedItem = document.createElement('div');
    relatedItem.className = 'setting-item';
    const relatedTitleContainer = document.createElement('div');
    relatedTitleContainer.id = 'related-setting-title-container';
    relatedTitleContainer.className = 'setting-title-container';
    relatedItem.appendChild(relatedTitleContainer);

    relatedSettingsDefinitions.forEach(setting => {
        const checkboxElement = createCheckbox(setting.id, setting.label, settings[setting.key]);
        relatedItem.appendChild(checkboxElement);
    });

    // Filter setting
    const filterItem = document.createElement('div');
    filterItem.className = 'setting-item';
    const filterTitleContainer = document.createElement('div');
    filterTitleContainer.id = 'filter-setting-title-container';
    filterTitleContainer.className = 'setting-title-container';
    filterItem.appendChild(filterTitleContainer);

    // Dynamically create checkboxes and append them
    filterDefinitions.forEach(filter => {
        const checkboxElement = createCheckbox(filter.id, filter.label, settings.filterRules[filter.key]);
        filterItem.appendChild(checkboxElement);
    });

    content.appendChild(themeItem);
    content.appendChild(relatedItem);
    content.appendChild(filterItem);

    // --- Footer ---
    const footer = document.createElement('div');
    footer.className = 'settings-panel-footer';
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-settings-btn';
    saveBtn.className = 'tc-button';
    footer.appendChild(saveBtn);

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
}
