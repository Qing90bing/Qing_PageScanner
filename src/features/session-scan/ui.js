// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER, SHOW_LOADING, closeModal } from '../../shared/ui/mainModal/index.js';
import { modalOverlay } from '../../shared/ui/mainModal/modalState.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import * as sessionExtractor from './logic.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { createCounterWithHelp, showCounterWithHelp, hideCounterWithHelp, updateCounterValue } from '../../shared/ui/components/counterWithHelp.js';
import { t } from '../../shared/i18n/index.js';
import { setFabIcon, getElementScanFab, updateFabTooltip, getDynamicFab } from '../../shared/ui/components/fab.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';
import { simpleTemplate } from '../../shared/utils/dom/templating.js';
import { on } from '../../shared/utils/core/eventBus.js';
import { log } from '../../shared/utils/core/logger.js';
import { openContextualSettingsPanel } from '../settings/ui.js';
import { loadSettings, saveSettings, applySettings } from '../settings/logic.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';

let currentSessionCount = 0;

// 监听会话清空事件，以重置本地计数器
on('sessionCleared', () => {
    currentSessionCount = 0;
});

/**
 * @private
 * @function showTopCenterUI
 * @description 创建并显示包含计数器和帮助图标的顶部中央UI。
 */
function showTopCenterUI() {
    createCounterWithHelp({
        counterKey: 'common.discovered',
        helpKey: 'tutorial.sessionScan',
        onPause: sessionExtractor.pauseSessionScan,
        onResume: sessionExtractor.resumeSessionScan,
        scanType: 'SessionScan',
        onSettingsClick: () => {
            const currentSettings = loadSettings();
            const definitions = [
                {
                    id: 'persist-data-checkbox-session',
                    key: 'sessionScan_persistData',
                    type: 'checkbox',
                    label: 'settings.contextual.persistData',
                    tooltip: {
                        titleIcon: infoIcon,
                        title: 'tooltip.persistData.title',
                        text: 'tooltip.persistData.text.sessionScan'
                    }
                }
            ];
            openContextualSettingsPanel({
                titleKey: 'settings.contextual.sessionScanTitle',
                icon: settingsIcon,
                definitions: definitions,
                settings: currentSettings,
                onSave: (newSettings) => {
                    const updatedSettings = { ...currentSettings, ...newSettings };
                    saveSettings(updatedSettings);
                    applySettings(updatedSettings, currentSettings);
                }
            });
        }
    });
    showCounterWithHelp();
}

/**
 * @private
 * @function hideTopCenterUI
 * @description 隐藏并销毁顶部中央UI，确保动画和资源清理正确执行。
 */
function hideTopCenterUI() {
    hideCounterWithHelp();
}

/**
 * @public
 * @function showSessionSummary
 * @description 处理“查看总结”的逻辑，专门用于会话扫描。
 */
export function showSessionSummary() {
    log(t('tooltip.summary'));
    if (sessionExtractor.isSessionRecording()) {
        showNotification(t('scan.sessionInProgress'), { type: 'info' });
    }

    updateScanCount(currentSessionCount, 'session');
    updateModalContent(SHOW_LOADING, true, 'session-scan');

    setTimeout(() => {
        sessionExtractor.requestSummary((formattedText, count) => {
            updateScanCount(count, 'session');
            if (!formattedText || formattedText.trim().slice(1, -1).trim().length === 0) {
                updateModalContent(SHOW_PLACEHOLDER, true, 'session-scan');
            } else {
                updateModalContent(formattedText, true, 'session-scan');
            }
        });
    }, 50);
}

/**
 * @private
 * @function handleEscForSessionScan
 * @description 在会话扫描期间处理 Escape 键事件。
 * @param {KeyboardEvent} event - 键盘事件。
 */
const handleEscForSessionScan = (event) => {
    // 仅在按下 Escape 键时才继续
    if (event.key !== 'Escape') {
        return;
    }

    // 新增：检查是否有任何模态框或提示窗口处于打开状态。
    // 如果有，则不执行任何操作，让它们自己的 ESC 逻辑处理事件。
    const isSettingsPanelOpen = uiContainer.querySelector('.settings-panel-overlay.is-visible');
    const isHelpTooltipOpen = uiContainer.querySelector('.info-tooltip-overlay.is-visible');
    const isMainModalOpen = modalOverlay.classList.contains('is-visible');

    if (isSettingsPanelOpen || isHelpTooltipOpen || isMainModalOpen) {
        return;
    }

    // 只有在没有其他UI层打开且会话正在录制时，才停止会话
    if (sessionExtractor.isSessionRecording()) {
        // 阻止事件传播，以避免与其他 Escape 键监听器冲突
        event.preventDefault();
        event.stopPropagation();

        // 获取动态 FAB 的引用并模拟点击以停止会话
        const dynamicFab = getDynamicFab();
        if (dynamicFab) {
            handleDynamicExtractClick(dynamicFab);
        }
    }
};

/**
 * @public
 * @function handleDynamicExtractClick
 * @description 处理“动态扫描”按钮的点击事件，负责启动或停止会话扫描。
 */
export function handleDynamicExtractClick(dynamicFab) {
    const elementScanFab = getElementScanFab();

    if (sessionExtractor.isSessionRecording()) {
        // --- 停止会话扫描 ---
        log(t('scan.stopSession'));

        sessionExtractor.stop((finalCount) => {
            const notificationText = simpleTemplate(t('scan.finished'), { count: finalCount });
            showNotification(notificationText, { type: 'success' });
            currentSessionCount = finalCount;
        });

        setFabIcon(dynamicFab, dynamicIcon);
        dynamicFab.classList.remove('is-recording');
        updateFabTooltip(dynamicFab, 'tooltip.dynamic_scan');

        hideTopCenterUI();

        if (elementScanFab) {
            elementScanFab.classList.remove('fab-disabled');
            if (elementScanFab.dataset.originalTooltipKey) {
                updateFabTooltip(elementScanFab, elementScanFab.dataset.originalTooltipKey);
            }
        }
        // 在停止时移除键盘事件监听器
        document.removeEventListener('keydown', handleEscForSessionScan, true);
    } else {
        // --- 启动会话扫描 ---
        log(t('scan.startSession'));

        setFabIcon(dynamicFab, stopIcon);
        dynamicFab.classList.add('is-recording');
        updateFabTooltip(dynamicFab, 'scan.stopSession');

        if (elementScanFab) {
            elementScanFab.dataset.originalTooltipKey = elementScanFab.dataset.tooltipKey;
            updateFabTooltip(elementScanFab, 'tooltip.disabled.scan_in_progress');
            elementScanFab.classList.add('fab-disabled');
        }

        showNotification(t('scan.sessionStarted'), { type: 'info' });
        showTopCenterUI();

        setTimeout(() => {
            sessionExtractor.start((count) => {
                updateCounterValue(count);
                currentSessionCount = count;
            });
        }, 50);

        // 在启动时添加键盘事件监听器，使用捕获阶段以确保优先执行
        document.addEventListener('keydown', handleEscForSessionScan, true);
    }
}

// 新增：监听会话恢复事件
on('resumeScanSession', async (state) => {
    if (state.mode === 'session-scan') {
        log(t('log.sessionScan.resuming'));
        const dynamicFab = getDynamicFab();
        const settings = await loadSettings();

        // 确保按钮存在且当前未在扫描
        if (dynamicFab && !sessionExtractor.isSessionRecording()) {
            const resumedData = (settings.sessionScan_persistData && state.data) ? state.data : null;

            // 直接调用 start 函数，并传入恢复的数据
            sessionExtractor.start((count) => {
                updateCounterValue(count);
                currentSessionCount = count;
            }, resumedData);

            // 手动更新UI状态以匹配“正在录制”
            setFabIcon(dynamicFab, stopIcon);
            dynamicFab.classList.add('is-recording');
            updateFabTooltip(dynamicFab, 'scan.stopSession');
            showTopCenterUI();

            // 禁用“元素扫描”按钮
            const elementScanFab = getElementScanFab();
            if (elementScanFab) {
                elementScanFab.dataset.originalTooltipKey = elementScanFab.dataset.tooltipKey;
                updateFabTooltip(elementScanFab, 'tooltip.disabled.scan_in_progress');
                elementScanFab.classList.add('fab-disabled');
            }

            if (settings.sessionScan_persistData) {
                showNotification(t('notifications.sessionScanResumed'), { type: 'info' });
            } else {
                showNotification(t('notifications.sessionScanStarted'), { type: 'info' });
            }
        }
    }
});
