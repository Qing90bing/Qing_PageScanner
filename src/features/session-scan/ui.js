// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER, SHOW_LOADING } from '../../shared/ui/mainModal.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import * as sessionExtractor from './logic.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { createTopCenterCounter, updateTopCenterCounter } from '../../shared/ui/components/topCenterCounter.js';
import { createHelpIcon } from '../../shared/ui/components/helpIcon.js';
import { t } from '../../shared/i18n/index.js';
import { setFabIcon, getElementScanFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { on } from '../../shared/utils/eventBus.js';
import { log } from '../../shared/utils/logger.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';

let currentSessionCount = 0;
let topCenterContainer = null;
let counterElement = null;
let helpIcon = null;

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
    if (topCenterContainer) return;

    topCenterContainer = document.createElement('div');
    // 使用通用的、统一的类名
    topCenterContainer.className = 'top-center-ui-container';

    counterElement = createTopCenterCounter('common.discovered');
    helpIcon = createHelpIcon('tutorial.sessionScan');

    topCenterContainer.appendChild(counterElement);
    topCenterContainer.appendChild(helpIcon);
    uiContainer.appendChild(topCenterContainer);

    updateTopCenterCounter(counterElement, 0);

    requestAnimationFrame(() => {
        counterElement.classList.add('is-visible');
        helpIcon.classList.add('is-visible');
    });
}

/**
 * @private
 * @function hideTopCenterUI
 * @description 隐藏并销毁顶部中央UI，确保动画和资源清理正确执行。
 */
function hideTopCenterUI() {
    if (!topCenterContainer) return;

    const containerToRemove = topCenterContainer;
    const counterToRemove = counterElement;
    const iconToRemove = helpIcon;

    topCenterContainer = null;
    counterElement = null;
    helpIcon = null;

    if (counterToRemove) counterToRemove.classList.remove('is-visible');
    if (iconToRemove) iconToRemove.classList.remove('is-visible');

    setTimeout(() => {
        if (counterToRemove && typeof counterToRemove.destroy === 'function') {
            counterToRemove.destroy();
        }
        if (iconToRemove && typeof iconToRemove.destroy === 'function') {
            iconToRemove.destroy();
        }
        containerToRemove.remove();
    }, 400);
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
            if (!formattedText || formattedText.trim() === '[]') {
                updateModalContent(SHOW_PLACEHOLDER, true, 'session-scan');
            } else {
                updateModalContent(formattedText, true, 'session-scan');
            }
        });
    }, 50);
}

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
                if (counterElement) {
                    updateTopCenterCounter(counterElement, count);
                }
                currentSessionCount = count;
            });
        }, 50);
    }
}
