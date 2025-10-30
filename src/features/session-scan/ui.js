// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER, SHOW_LOADING } from '../../shared/ui/mainModal.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import * as sessionExtractor from './logic.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { showLiveCounter, hideLiveCounter, updateLiveCounter } from './liveCounterUI.js';
import { t } from '../../shared/i18n/index.js';
import { setFabIcon } from '../../shared/ui/components/fab.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { on } from '../../shared/utils/eventBus.js';
import { log } from '../../shared/utils/logger.js';

let currentSessionCount = 0;

// 监听会话清空事件，以重置本地计数器
on('sessionCleared', () => {
    currentSessionCount = 0;
});

/**
 * 处理“查看总结”按钮的点击事件。
 * 现在通过异步请求从 Worker 获取数据。
 */
export function handleSummaryClick() {
    log(t('tooltip.summary'));
    // 检查是否正在录制，如果是，则可能需要提示用户先停止
    if (sessionExtractor.isSessionRecording()) {
         // 可选：提示用户会话仍在进行中
        showNotification(t('scan.sessionInProgress'), { type: 'info' });
    }

    // 强制更新标题栏以显示正确的会话计数
    updateScanCount(currentSessionCount, 'session');

    // 显示加载状态
    updateModalContent(SHOW_LOADING, true, 'session-scan');

    // 使用 setTimeout 将繁重任务推迟到下一个事件循环，
    // 以确保加载动画有时间渲染。
    setTimeout(() => {
        sessionExtractor.requestSummary((formattedText) => {
            // 检查返回的是否为空数组字符串或无内容
            if (!formattedText || formattedText.trim() === '[]') {
                updateModalContent(SHOW_PLACEHOLDER, true, 'session-scan');
            } else {
                updateModalContent(formattedText, false, 'session-scan');
            }
        });
    }, 50); // 50ms 延迟足以让UI更新
}

/**
 * 处理“动态扫描”按钮的点击事件。
 * @param {HTMLElement} dynamicFab - 动态扫描按钮的DOM元素。
 */
export function handleDynamicExtractClick(dynamicFab) {
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
        dynamicFab.title = t('scan.startSession');
        hideLiveCounter();
    } else {
        log(t('scan.startSession'));
        setFabIcon(dynamicFab, stopIcon);
        dynamicFab.classList.add('is-recording');
        dynamicFab.title = t('scan.stopSession');

        showNotification(t('scan.sessionStarted'), { type: 'info' });
        showLiveCounter();

        // 稍微延迟以确保UI更新完成
        setTimeout(() => {
            sessionExtractor.start((count) => {
                updateLiveCounter(count);
                currentSessionCount = count;
            });
        }, 50);
    }
}
