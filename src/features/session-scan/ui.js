// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER, SHOW_LOADING } from '../../shared/ui/mainModal.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import * as sessionExtractor from './logic.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { createTopCenterCounter, updateTopCenterCounter } from '../../shared/ui/components/topCenterCounter.js';
import { t } from '../../shared/i18n/index.js';
import { setFabIcon, getElementScanFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { on } from '../../shared/utils/eventBus.js';
import { log } from '../../shared/utils/logger.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';

let currentSessionCount = 0;
let counterElement = null;

// 监听会话清空事件，以重置本地计数器
on('sessionCleared', () => {
    currentSessionCount = 0;
});

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
             // 此回调现在接收两个参数
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
 * 处理“动态扫描”按钮的点击事件。
 * @param {HTMLElement} dynamicFab - 动态扫描按钮的DOM元素。
 */
export function handleDynamicExtractClick(dynamicFab) {
    const elementScanFab = getElementScanFab();

    if (sessionExtractor.isSessionRecording()) {
        log(t('scan.stopSession'));
        // 异步停止，并在回调中获取最终计数
        sessionExtractor.stop((finalCount) => {
            const notificationText = simpleTemplate(t('scan.finished'), { count: finalCount });
            showNotification(notificationText, { type: 'success' });
            currentSessionCount = finalCount; // 保存最终计数
        });

        setFabIcon(dynamicFab, dynamicIcon);
        dynamicFab.classList.remove('is-recording');
        updateFabTooltip(dynamicFab, 'tooltip.dynamic_scan');

        if (counterElement) {
            counterElement.classList.remove('is-visible');
            setTimeout(() => {
                if (counterElement && typeof counterElement.destroy === 'function') {
                    counterElement.destroy();
                }
                counterElement.remove();
                counterElement = null;
            }, 400);
        }

        // 启用“选取元素扫描”按钮并恢复其工具提示
        if (elementScanFab) {
            elementScanFab.classList.remove('fab-disabled');
            if (elementScanFab.dataset.originalTooltipKey) {
                updateFabTooltip(elementScanFab, elementScanFab.dataset.originalTooltipKey);
            }
        }
    } else {
        log(t('scan.startSession'));
        setFabIcon(dynamicFab, stopIcon);
        dynamicFab.classList.add('is-recording');
        updateFabTooltip(dynamicFab, 'scan.stopSession');

        // 禁用“选取元素扫描”按钮并更新其工具提示
        if (elementScanFab) {
            elementScanFab.dataset.originalTooltipKey = elementScanFab.dataset.tooltipKey;
            updateFabTooltip(elementScanFab, 'tooltip.disabled.scan_in_progress');
            elementScanFab.classList.add('fab-disabled');
        }

        showNotification(t('scan.sessionStarted'), { type: 'info' });

        counterElement = createTopCenterCounter('common.discovered');
        uiContainer.appendChild(counterElement);
        requestAnimationFrame(() => {
            counterElement.classList.add('is-visible');
        });

        // 稍微延迟以确保UI更新完成
        setTimeout(() => {
            sessionExtractor.start((count) => {
                updateTopCenterCounter(counterElement, count);
                currentSessionCount = count;
            });
        }, 50);
    }
}
