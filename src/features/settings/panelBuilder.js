// src/features/settings/panelBuilder.js

import { createCheckbox } from '../../shared/ui/components/checkbox.js';
import { CustomSelect } from '../../shared/ui/components/customSelect.js';
import { createNumericInput } from '../../shared/ui/components/numericInput.js';
import { createSVGFromString } from '../../shared/utils/dom/dom.js';
import { closeIcon } from '../../assets/icons/closeIcon.js';
import { themeIcon } from '../../assets/icons/themeIcon.js';
import languageIcon from '../../assets/icons/languageIcon.js';
import { formatIcon } from '../../assets/icons/formatIcon.js'; // Import
import { relatedSettingsIcon } from '../../assets/icons/relatedSettingsIcon.js';
import { filterIcon } from '../../assets/icons/filterIcon.js';
import { filterDefinitions, relatedSettingsDefinitions, selectSettingsDefinitions, outputSettingsDefinitions } from './config.js';
import { t } from '../../shared/i18n/index.js';
import { createIconTitle } from '../../shared/ui/components/iconTitle.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';
import { githubIcon } from '../../assets/icons/githubIcon.js';
import { translateIcon } from '../../assets/icons/icon.js';
import { createButton } from '../../shared/ui/components/button.js';

// 定义侧边栏标签配置（重新排序：相关设置、过滤规则、格式、语言、主题）
const TABS = [
    { id: 'tab-related', label: 'settings.relatedSettings', icon: relatedSettingsIcon },
    { id: 'tab-filters', label: 'settings.filterRules', icon: filterIcon },
    { id: 'tab-format', label: 'settings.format', icon: formatIcon },
    { id: 'tab-language', label: 'settings.language', icon: languageIcon },
    { id: 'tab-theme', label: 'settings.theme', icon: themeIcon },
    { id: 'tab-about', label: 'settings.about', icon: infoIcon }
];

/**
 * @private
 * @description 创建并构建设置面板的 DOM 结构（双栏布局）。
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
    // 标题将由 ui.js 添加
    const closeBtn = document.createElement('span');
    closeBtn.className = 'tc-close-button settings-panel-close';
    closeBtn.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    // --- Body (Flex Container) ---
    const body = document.createElement('div');
    body.className = 'settings-panel-body';

    // --- Sidebar ---
    const sidebar = document.createElement('div');
    sidebar.className = 'settings-sidebar';

    // 添加滑动高亮块
    const highlight = document.createElement('div');
    highlight.className = 'sidebar-highlight';
    sidebar.appendChild(highlight);

    TABS.forEach((tab, index) => {
        const item = document.createElement('div');
        // 初始时不设 active，由 ui.js 初始化时统一处理高亮位置
        item.className = `settings-sidebar-item ${index === 0 ? 'active' : ''}`;
        item.dataset.target = tab.id;
        item.appendChild(createSVGFromString(tab.icon));
        const span = document.createElement('span');
        span.textContent = t(tab.label);
        item.appendChild(span);
        sidebar.appendChild(item);
    });
    body.appendChild(sidebar);

    // --- Content Area ---
    const contentArea = document.createElement('div');
    contentArea.className = 'settings-content-area';

    // 1. Related Settings Tab Content (First in order now)
    const relatedTab = createTabContent('tab-related', true); // 默认为第一个激活
    const relatedTitleContainer = document.createElement('div');
    relatedTitleContainer.id = 'related-setting-title-container';
    relatedTitleContainer.className = 'setting-title-container';
    relatedTab.appendChild(relatedTitleContainer);
    // 填充相关设置项
    relatedSettingsDefinitions.forEach(setting => {
        relatedTab.appendChild(createRelatedSettingDOM(setting, settings));
    });
    contentArea.appendChild(relatedTab);

    // 2. Filter Rules Tab Content
    const filterTab = createTabContent('tab-filters', false);
    const filterTitleContainer = document.createElement('div');
    filterTitleContainer.id = 'filter-setting-title-container';
    filterTitleContainer.className = 'setting-title-container';
    filterTab.appendChild(filterTitleContainer);
    // 填充过滤规则项
    filterDefinitions.forEach(filter => {
        const checkboxElement = createCheckbox(filter.id, t(filter.label), settings.filterRules[filter.key], filter.tooltip);
        checkboxElement.classList.add('setting-item');
        filterTab.appendChild(checkboxElement);
    });
    contentArea.appendChild(filterTab);

    // 3. Format Tab Content
    const formatTab = createTabContent('tab-format', false);
    const formatDef = selectSettingsDefinitions.find(d => d.key === 'outputFormat');
    if (formatDef) {
        formatTab.appendChild(createSelectSettingDOM(formatDef));
    }
    // 添加输出设置勾选框（首尾符号开关）
    outputSettingsDefinitions.forEach(setting => {
        const checkboxElement = createCheckbox(
            setting.id,
            t(setting.label),
            settings.includeArrayBrackets,
            setting.tooltip
        );
        checkboxElement.classList.add('setting-item');
        formatTab.appendChild(checkboxElement);
    });
    contentArea.appendChild(formatTab);

    // 4. Language Tab Content
    const languageTab = createTabContent('tab-language', false);
    const langDef = selectSettingsDefinitions.find(d => d.key === 'language');
    if (langDef) {
        languageTab.appendChild(createSelectSettingDOM(langDef));
    }
    contentArea.appendChild(languageTab);

    // 5. Theme Tab Content
    const themeTab = createTabContent('tab-theme', false);
    // 查找配置中的 theme 定义
    const themeDef = selectSettingsDefinitions.find(d => d.key === 'theme');
    if (themeDef) {
        themeTab.appendChild(createSelectSettingDOM(themeDef));
    }
    contentArea.appendChild(themeTab);

    // 6. About Tab Content
    const aboutTab = createTabContent('tab-about', false);
    aboutTab.appendChild(createAboutTabContent());
    contentArea.appendChild(aboutTab);

    // --- Footer ---
    const footer = document.createElement('div');
    footer.className = 'settings-panel-footer';
    contentArea.appendChild(footer);

    body.appendChild(contentArea);
    modal.appendChild(body);

    return modal;
}

/**
 * 辅助函数：创建 Tab 内容容器
 */
function createTabContent(id, isActive) {
    const div = document.createElement('div');
    div.id = id;
    div.className = `settings-tab-content ${isActive ? 'active' : ''}`;
    return div;
}

/**
 * 辅助函数：创建下拉选择设置项的 DOM 骨架
 * 注意：实际的 CustomSelect 初始化在 ui.js 中进行，这里只创建容器
 */
function createSelectSettingDOM(definition) {
    const selectItem = document.createElement('div');
    selectItem.className = 'setting-item';

    const titleContainer = document.createElement('div');
    titleContainer.id = `${definition.id}-title-container`;
    titleContainer.className = 'setting-title-container';

    const selectWrapper = document.createElement('div');
    selectWrapper.id = `${definition.id}-wrapper`;

    selectItem.appendChild(titleContainer);
    selectItem.appendChild(selectWrapper);
    return selectItem;
}

/**
 * 辅助函数：创建相关设置项 DOM
 */
function createRelatedSettingDOM(setting, settings) {
    const item = document.createElement('div');
    item.className = 'setting-item';

    if (setting.linkedNumeric) {
        const compositeContainer = document.createElement('div');
        compositeContainer.className = 'composite-setting-container';

        const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
        compositeContainer.appendChild(checkboxElement);

        const numericConfig = setting.linkedNumeric;
        const numericValue = settings[numericConfig.key];
        const numericLabel = t('settings.display.character_limit'); // 使用具体的翻译键

        const numericInputElement = createNumericInput(
            numericConfig.id,
            numericLabel,
            numericValue,
            {
                min: 5,
                disabled: !settings[setting.key],
            }
        );
        numericInputElement.classList.add('linked-numeric-input');
        compositeContainer.appendChild(numericInputElement);

        const checkbox = checkboxElement.querySelector('input[type="checkbox"]');
        const numericInput = numericInputElement.querySelector('input[type="number"]');
        checkbox.addEventListener('change', (event) => {
            numericInput.disabled = !event.target.checked;
        });

        item.appendChild(compositeContainer);
    } else if (setting.type === 'select') {
        const selectContainer = document.createElement('div');
        selectContainer.className = 'setting-item-select';
        const selectTitle = document.createElement('div');
        selectTitle.className = 'setting-label';
        selectTitle.textContent = t(setting.label);
        const selectWrapper = document.createElement('div');
        selectWrapper.id = setting.id;
        // 直接初始化 select，因为 logic 简单
        new CustomSelect(selectWrapper, setting.options.map(opt => ({ ...opt, label: t(opt.label) })), settings[setting.key]);
        selectContainer.appendChild(selectTitle);
        selectContainer.appendChild(selectWrapper);
        item.appendChild(selectContainer);
    } else {
        const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
        item.appendChild(checkboxElement);
    }
    return item;
}


/**
 * 辅助函数：创建关于选项卡的内容
 */
function createAboutTabContent() {
    const container = document.createElement('div');
    container.className = 'about-tab-container';

    // Logo
    const logoContainer = document.createElement('div');
    logoContainer.className = 'about-logo';
    // Use GM_info.script.icon if available
    const iconSrc = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.icon) ? GM_info.script.icon : '';
    if (iconSrc) {
        const img = document.createElement('img');
        img.src = iconSrc;
        img.alt = 'Script Icon';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        logoContainer.appendChild(img);
    } else {
        logoContainer.innerHTML = translateIcon; // Fallback
    }
    container.appendChild(logoContainer);

    // Title
    const title = document.createElement('h2');
    title.className = 'about-title';
    // Use localized script name
    title.textContent = t('script.name');
    container.appendChild(title);

    // Version
    const version = document.createElement('p');
    version.className = 'about-version';
    // 尝试获取版本号
    const verNum = (typeof GM_info !== 'undefined' && GM_info.script) ? GM_info.script.version : '1.0.0';
    version.textContent = `v${verNum}`;
    container.appendChild(version);

    // GitHub Button
    const btnContainer = document.createElement('div');
    btnContainer.className = 'about-actions';

    const githubBtn = createButton({
        id: 'about-github-btn',
        textKey: 'settings.aboutPanel.projectUrl',
        icon: githubIcon,
        onClick: () => {
            // 使用 window.open 打开新标签页
            window.open('https://github.com/Qing90bing/Qing_PageScanner', '_blank');
        }
    });
    btnContainer.appendChild(githubBtn);
    container.appendChild(btnContainer);

    return container;
}


/**
 * @public
 * @description 创建并构建一个上下文相关的、临时的设置面板。
 * (保持原有逻辑，因为这用于元素扫描时的快速设置，不需要改动侧边栏布局)
 */
export function buildContextualPanelDOM({ titleKey, icon, definitions, settings }) {
    const modal = document.createElement('div');
    modal.className = 'settings-panel-modal contextual-settings-modal';

    const header = document.createElement('div');
    header.className = 'settings-panel-header';
    const titleContainer = document.createElement('div');
    titleContainer.id = 'contextual-settings-title-container';

    if (icon) {
        titleContainer.appendChild(createIconTitle(icon, t(titleKey)));
    } else {
        titleContainer.textContent = t(titleKey);
    }

    const closeBtn = document.createElement('span');
    closeBtn.className = 'tc-close-button settings-panel-close';
    closeBtn.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer);
    header.appendChild(closeBtn);

    const content = document.createElement('div');
    content.className = 'settings-panel-content'; // 复用旧样式类，因为这是简单面板

    definitions.forEach(setting => {
        const item = document.createElement('div');
        item.className = 'setting-item';

        if (setting.type === 'checkbox') {
            const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
            item.appendChild(checkboxElement);
        }

        content.appendChild(item);
    });

    const footer = document.createElement('div');
    footer.className = 'settings-panel-footer';

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
}
