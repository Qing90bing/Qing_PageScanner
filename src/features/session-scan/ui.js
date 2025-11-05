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
/**
 * @public
 * @function handleDynamicExtractClick
 * @description 处理“动态扫描”按钮的点击事件，负责启动或停止会话扫描。
 *              这是一个状态切换函数，它会管理UI的各种变化，
 *              包括FAB按钮的图标和工具提示、顶部中央计数器的显示/隐藏，
 *              以及在扫描期间禁用其他功能按钮。
 * @param {HTMLElement} dynamicFab - “动态扫描”按钮的DOM元素。
 */
export function handleDynamicExtractClick(dynamicFab) {
    const elementScanFab = getElementScanFab();

    if (sessionExtractor.isSessionRecording()) {
        // --- 停止会话扫描的逻辑 ---
        log(t('scan.stopSession'));

        // 1. 异步停止核心逻辑，并在回调中处理最终结果
        sessionExtractor.stop((finalCount) => {
            const notificationText = simpleTemplate(t('scan.finished'), { count: finalCount });
            showNotification(notificationText, { type: 'success' });
            currentSessionCount = finalCount;
        });

        // 2. 恢复FAB按钮的UI状态
        setFabIcon(dynamicFab, dynamicIcon);
        dynamicFab.classList.remove('is-recording');
        updateFabTooltip(dynamicFab, 'tooltip.dynamic_scan');

        // 3. 隐藏并销毁计数器
        if (counterElement) {
            const counterToRemove = counterElement;
            counterToRemove.classList.remove('is-visible');
            setTimeout(() => {
                if (typeof counterToRemove.destroy === 'function') {
                    counterToRemove.destroy(); // 清理事件监听器
                }
                counterToRemove.remove();
            }, 400);
            counterElement = null; // 立即清理引用
        }

        // 4. 重新启用“选取元素扫描”按钮
        if (elementScanFab) {
            elementScanFab.classList.remove('fab-disabled');
            if (elementScanFab.dataset.originalTooltipKey) {
                updateFabTooltip(elementScanFab, elementScanFab.dataset.originalTooltipKey);
            }
        }
    } else {
        // --- 启动会话扫描的逻辑 ---
        log(t('scan.startSession'));

        // 1. 切换FAB按钮为“停止”状态
        setFabIcon(dynamicFab, stopIcon);
        dynamicFab.classList.add('is-recording');
        updateFabTooltip(dynamicFab, 'scan.stopSession');

        // 2. 禁用“选取元素扫描”按钮，防止在会话扫描期间进行其他操作
        if (elementScanFab) {
            elementScanFab.dataset.originalTooltipKey = elementScanFab.dataset.tooltipKey;
            updateFabTooltip(elementScanFab, 'tooltip.disabled.scan_in_progress');
            elementScanFab.classList.add('fab-disabled');
        }

        // 3. 显示通知和顶部中央计数器
        showNotification(t('scan.sessionStarted'), { type: 'info' });
        counterElement = createTopCenterCounter('common.discovered');
        uiContainer.appendChild(counterElement);
        requestAnimationFrame(() => {
            counterElement.classList.add('is-visible');
        });

        // 4. 延迟后启动核心扫描逻辑，并将计数更新回调传递给它
        setTimeout(() => {
            sessionExtractor.start((count) => {
                updateTopCenterCounter(counterElement, count);
                currentSessionCount = count;
            });
        }, 50);
    }
}
