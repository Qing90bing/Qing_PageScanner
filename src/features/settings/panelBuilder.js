// src/features/settings/panelBuilder.js

import { createCheckbox } from '../../shared/ui/checkbox.js';
import { createNumericInput } from '../../shared/ui/numericInput.js';
import { createSVGFromString } from '../../shared/utils/dom.js';
import { closeIcon } from '../../assets/icons/closeIcon.js';
import { filterDefinitions, relatedSettingsDefinitions, selectSettingsDefinitions } from './config.js';
import { t } from '../../shared/i18n/index.js';

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

    // Dynamically create select items (e.g., Theme, Language)
    selectSettingsDefinitions.forEach(definition => {
        const selectItem = document.createElement('div');
        selectItem.className = 'setting-item';

        const titleContainer = document.createElement('div');
        titleContainer.id = `${definition.id}-title-container`;
        titleContainer.className = 'setting-title-container';

        const selectWrapper = document.createElement('div');
        selectWrapper.id = `${definition.id}-wrapper`;

        selectItem.appendChild(titleContainer);
        selectItem.appendChild(selectWrapper);
        content.appendChild(selectItem);
    });

    // Related settings
    const relatedItem = document.createElement('div');
    relatedItem.className = 'setting-item';
    const relatedTitleContainer = document.createElement('div');
    relatedTitleContainer.id = 'related-setting-title-container';
    relatedTitleContainer.className = 'setting-title-container';
    relatedItem.appendChild(relatedTitleContainer);

    relatedSettingsDefinitions.forEach(setting => {
        // 对待复合设置项和标准设置项进行区分处理
        if (setting.linkedNumeric) {
            // --- 创建复合设置项的特殊布局 ---
            const compositeContainer = document.createElement('div');
            compositeContainer.className = 'composite-setting-container';

            // 1. 添加复选框
            const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
            compositeContainer.appendChild(checkboxElement);

            // 2. 添加带标签的数字输入框
            const numericConfig = setting.linkedNumeric;
            const numericValue = settings[numericConfig.key];
            const numericLabel = t('settings.display.character_limit');

            const numericInputElement = createNumericInput(
                numericConfig.id,
                numericLabel, // 传入新的 i18n 标签
                numericValue,
                {
                    min: 5,
                    disabled: !settings[setting.key],
                }
            );
            numericInputElement.classList.add('linked-numeric-input');
            compositeContainer.appendChild(numericInputElement);

            // 3. 添加联动事件
            const checkbox = checkboxElement.querySelector('input[type="checkbox"]');
            const numericInput = numericInputElement.querySelector('input[type="number"]');
            checkbox.addEventListener('change', (event) => {
                numericInput.disabled = !event.target.checked;
            });

            relatedItem.appendChild(compositeContainer);
        } else {
            // --- 对标准复选框使用原始布局 ---
            const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
            relatedItem.appendChild(checkboxElement);
        }
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
        const checkboxElement = createCheckbox(filter.id, t(filter.label), settings.filterRules[filter.key], filter.tooltip);
        filterItem.appendChild(checkboxElement);
    });

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
