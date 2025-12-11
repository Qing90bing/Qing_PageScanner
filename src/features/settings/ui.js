// src/features/settings/ui.js

import { log } from '../../shared/utils/logger.js';
import { createIconTitle } from '../../shared/ui/iconTitle.js';
import { CustomSelect } from '../../shared/ui/components/customSelect.js';
import { systemThemeIcon } from '../../assets/icons/systemThemeIcon.js';
import { lightThemeIcon } from '../../assets/icons/lightThemeIcon.js';
import { darkThemeIcon } from '../../assets/icons/darkThemeIcon.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { buildPanelDOM, buildContextualPanelDOM } from './panelBuilder.js';
import { filterDefinitions, relatedSettingsDefinitions, selectSettingsDefinitions } from './config.js';
import { t } from '../../shared/i18n/index.js';
import { on } from '../../shared/utils/eventBus.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { filterIcon } from '../../assets/icons/filterIcon.js';
import { saveIcon } from '../../assets/icons/saveIcon.js';
import { relatedSettingsIcon } from '../../assets/icons/relatedSettingsIcon.js';
import { updateSettingsMenu } from '../../shared/i18n/management/languageManager.js';
import { createButton } from '../../shared/ui/components/button.js';

// --- 模块级变量 ---

let settingsPanel = null;
let selectComponents = {};
let isTooltipVisible = false;
let saveBtn = null;
let unsubscribeTooltipShow = null;
let unsubscribeTooltipHide = null;

// --- 私有函数 ---

/**
 * @private
 * @description 监听全局键盘事件，当按下 "Escape" 键时关闭设置面板。
 */
const handleKeyDown = (event) => {
  if (isTooltipVisible) return; // 如果提示窗口已打开，则不执行任何操作

  if (event.key === 'Escape') {
    event.stopPropagation();
    hideSettingsPanel();
  }
};

/**
 * @private
 * @description 显示设置面板。
 * @param {object} currentSettings - 当前的设置对象，用于填充UI。
 * @param {function} onSave - 当用户点击保存时调用的回调函数。
 */
function showSettingsPanel(currentSettings, onSave) {
    log(t('log.settings.panel.opening'));
    if (settingsPanel) {
        setTimeout(() => settingsPanel.classList.add('is-visible'), 10);
        return;
    }

    settingsPanel = document.createElement('div');
    settingsPanel.className = 'settings-panel-overlay';
    settingsPanel.tabIndex = -1;

    // 构建双栏布局的 DOM
    const panelModal = buildPanelDOM(currentSettings);
    settingsPanel.appendChild(panelModal);

    uiContainer.appendChild(settingsPanel);

    // --- 填充标题和组件 ---
    const titleContainer = settingsPanel.querySelector('#settings-panel-title-container');
    titleContainer.appendChild(createIconTitle(settingsIcon, t('settings.title')));

    // 动态创建下拉菜单
    selectComponents = {};
    selectSettingsDefinitions.forEach(definition => {
        const titleContainer = settingsPanel.querySelector(`#${definition.id}-title-container`);
        if (titleContainer) {
             titleContainer.appendChild(createIconTitle(definition.icon, t(definition.label)));
        }

        const selectWrapper = settingsPanel.querySelector(`#${definition.id}-wrapper`);
        if (selectWrapper) {
            const options = definition.options.map(opt => ({
                ...opt,
                label: t(opt.label),
                // 为主题选项动态添加图标
                ...(definition.key === 'theme' && {
                    'system': systemThemeIcon,
                    'light': lightThemeIcon,
                    'dark': darkThemeIcon
                }[opt.value]),
            }));
            selectComponents[definition.key] = new CustomSelect(selectWrapper, options, currentSettings[definition.key]);
        }
    });

    const relatedTitleContainer = settingsPanel.querySelector('#related-setting-title-container');
    if (relatedTitleContainer) {
        relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, t('settings.relatedSettings')));
    }

    const filterTitleContainer = settingsPanel.querySelector('#filter-setting-title-container');
    if (filterTitleContainer) {
        filterTitleContainer.appendChild(createIconTitle(filterIcon, t('settings.filterRules')));
    }

    const footer = settingsPanel.querySelector('.settings-panel-footer');
    saveBtn = createButton({
        id: 'save-settings-btn',
        textKey: 'common.save',
        icon: saveIcon,
        onClick: () => handleSave(onSave),
    });
    footer.appendChild(saveBtn);

    // --- 绑定事件 ---
    settingsPanel.querySelector('.settings-panel-close').addEventListener('click', hideSettingsPanel);
    settingsPanel.addEventListener('keydown', handleKeyDown);

    // 获取侧边栏元素和高亮块
    const sidebarItems = settingsPanel.querySelectorAll('.settings-sidebar-item');
    const highlight = settingsPanel.querySelector('.sidebar-highlight');

    /**
     * @private
     * @description 移动滑动高亮块到目标元素位置
     * @param {HTMLElement} targetItem - 目标侧边栏项
     */
    const moveHighlight = (targetItem) => {
        if (!targetItem || !highlight) return;
        
        // 计算目标元素相对于父容器的位置
        const offsetTop = targetItem.offsetTop;
        const offsetHeight = targetItem.offsetHeight;

        // 应用位置和高度变化 (使用 transform 提高性能)
        highlight.style.transform = `translateY(${offsetTop}px)`;
        highlight.style.height = `${offsetHeight}px`;
    };

    // 初始化高亮位置（对应第一个激活项）
    const initialActiveItem = settingsPanel.querySelector('.settings-sidebar-item.active');
    if (initialActiveItem) {
        // 使用 setTimeout 确保 DOM 布局已准备好，避免首次计算高度为 0
        setTimeout(() => moveHighlight(initialActiveItem), 0);
    }

    // 绑定侧边栏切换事件
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.target;
            
            // 更新侧边栏激活状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 移动高亮块
            moveHighlight(item);

            // 切换内容区域显示
            const contents = settingsPanel.querySelectorAll('.settings-tab-content');
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // 监听 tooltip 事件以暂停/恢复 ESC 键的处理
    unsubscribeTooltipShow = on('infoTooltipWillShow', () => { isTooltipVisible = true; });
    unsubscribeTooltipHide = on('infoTooltipDidHide', () => { isTooltipVisible = false; });

    // 修复：确保在CSS过渡动画完成后再设置焦点。
    settingsPanel.addEventListener('transitionend', () => {
        settingsPanel.focus();
    }, { once: true });

    // 触发显示
    setTimeout(() => {
        if (settingsPanel) settingsPanel.classList.add('is-visible');
    }, 10);
}

/**
 * @private
 * @description 隐藏并从 DOM 中彻底移除设置面板。
 */
function hideSettingsPanel() {
    if (settingsPanel && settingsPanel.classList.contains('is-visible')) {
        log(t('log.settings.panel.closing'));
        settingsPanel.removeEventListener('keydown', handleKeyDown);
        settingsPanel.classList.remove('is-visible');

        // 清理事件总线监听器
        if (unsubscribeTooltipShow) unsubscribeTooltipShow();
        if (unsubscribeTooltipHide) unsubscribeTooltipHide();
        unsubscribeTooltipShow = null;
        unsubscribeTooltipHide = null;

        // 销毁按钮和自定义选择组件
        if (saveBtn) {
            saveBtn.destroy();
            saveBtn = null;
        }
        for (const key in selectComponents) {
            if (selectComponents[key].destroy) {
                selectComponents[key].destroy();
            }
        }
        selectComponents = {};

        setTimeout(() => {
            if (settingsPanel) {
                settingsPanel.remove();
                settingsPanel = null;
            }
        }, 300);
    }
}

/**
 * @private
 * @description 处理“保存”按钮的点击事件。
 * @param {function} onSave - 用于处理保存逻辑的回调函数。
 */
function handleSave(onSave) {
    log(t('log.settings.panel.saving'));
    const newSettings = {};

    // 1. 从所有下拉菜单收集值
    for (const key in selectComponents) {
        newSettings[key] = selectComponents[key].getValue();
    }

    // 2. 收集过滤规则
    const newFilterRules = {};
    filterDefinitions.forEach(filter => {
        const checkbox = settingsPanel.querySelector(`#${filter.id}`);
        if (checkbox) newFilterRules[filter.key] = checkbox.checked;
    });
    newSettings.filterRules = newFilterRules;

    // 3. 收集相关设置（包括新的复合设置项）
    relatedSettingsDefinitions.forEach(setting => {
        if (setting.type === 'select') {
            const selectContainer = settingsPanel.querySelector(`#${setting.id} .custom-select-container`);
            if (selectContainer) {
                newSettings[setting.key] = selectContainer.dataset.value;
            }
            return;
        }

        const checkbox = settingsPanel.querySelector(`#${setting.id}`);
        if (!checkbox) return; // 如果找不到复选框，跳过

        // 保存复选框的状态
        newSettings[setting.key] = checkbox.checked;

        // 如果有关联的数字输入框，则保存其值
        if (setting.linkedNumeric) {
            const numericInput = settingsPanel.querySelector(`#${setting.linkedNumeric.id}`);
            if (numericInput) {
                // 将值转换为数字，并确保不小于5
                let value = parseInt(numericInput.value, 10);
                if (isNaN(value) || value < 5) {
                    value = 5; // 如果无效，则重置为最小值
                    numericInput.value = value; // 更新UI上的值
                }
                newSettings[setting.linkedNumeric.key] = value;
            }
        }
    });

    if (onSave) {
        onSave(newSettings);
    }

    hideSettingsPanel();
}

// --- 公开函数 ---

/**
 * @public
 * @description 初始化设置面板功能，并注册油猴菜单命令。
 * @param {function} onOpen - 当用户点击菜单命令时触发的回调，用于打开面板。
 */
export function initSettingsPanel(onOpen) {
    // 关键修复：确保只有在顶层窗口的脚本实例才能注册菜单命令。
    // 这可以防止在有 iframe 的页面上因脚本被多次注入而导致菜单重复。
    if (window.top === window.self) {
        // 使用“立即执行的异步函数表达式”来处理异步操作，避免阻塞主线程
        (async () => {
            await updateSettingsMenu(onOpen);
        })();

        // 监听语言变化事件，以更新菜单文本
        on('languageChanged', async () => {
            await updateSettingsMenu(onOpen);
        });
    }
}

/**
 * @public
 * @description 暴露给外部调用的函数，用于显示设置面板。
 * @param {object} settings - 当前的设置对象。
 * @param {function} onSaveCallback - 保存按钮的回调。
 */
export function openSettingsPanel(settings, onSaveCallback) {
    showSettingsPanel(settings, onSaveCallback);
}

export function openContextualSettingsPanel({ titleKey, icon, definitions, settings, onSave }) {
    let contextualPanel = document.createElement('div');
    contextualPanel.className = 'settings-panel-overlay';
    contextualPanel.tabIndex = -1;

    const panelModal = buildContextualPanelDOM({ titleKey, icon, definitions, settings });
    contextualPanel.appendChild(panelModal);
    uiContainer.appendChild(contextualPanel);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            // 关键修复：阻止事件继续传播。
            // 这样，当这个监听器处理了 ESC 键后，就不会再触发
            // 其他（如下层的“选取元素扫描”）全局监听器了。
            event.stopPropagation();
            closePanel();
        }
    };

    const closePanel = () => {
        if (contextualPanel) {
            document.removeEventListener('keydown', handleKeyDown, true);
            contextualPanel.classList.remove('is-visible');
            setTimeout(() => {
                contextualPanel.remove();
                contextualPanel = null;
            }, 300);
        }
    };

    const handleSave = () => {
        const newSettings = {};
        definitions.forEach(def => {
            if (def.type === 'checkbox') {
                const checkbox = contextualPanel.querySelector(`#${def.id}`);
                if (checkbox) newSettings[def.key] = checkbox.checked;
            }
        });
        if (onSave) {
            onSave(newSettings);
        }
        closePanel();
    };

    const footer = contextualPanel.querySelector('.settings-panel-footer');
    const saveButton = createButton({
        id: 'save-contextual-settings-btn',
        textKey: 'common.save',
        icon: saveIcon,
        onClick: handleSave,
    });
    footer.appendChild(saveButton);

    contextualPanel.querySelector('.settings-panel-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', handleKeyDown, true);

    setTimeout(() => {
        if (contextualPanel) {
            contextualPanel.classList.add('is-visible');
            contextualPanel.focus();
        }
    }, 10);
}
