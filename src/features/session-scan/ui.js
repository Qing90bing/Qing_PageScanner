// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER, SHOW_LOADING } from '../../shared/ui/mainModal.js';
import * as sessionExtractor from './logic.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { showLiveCounter, hideLiveCounter, updateLiveCounter } from './liveCounterUI.js';
import { t } from '../../shared/i18n/index.js';
import { setFabIcon } from '../../shared/ui/components/fab.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';

/**
 * 处理“查看总结”按钮的点击事件。
 * 现在通过异步请求从 Worker 获取数据。
 */
export function handleSummaryClick() {
    // 检查是否正在录制，如果是，则可能需要提示用户先停止
    if (sessionExtractor.isSessionRecording()) {
         // 可选：提示用户会话仍在进行中
        showNotification(t('scan.sessionInProgress'), { type: 'info' });
    }

    // 显示加载状态
    updateModalContent(SHOW_LOADING, true, 'session-scan');

    // 异步请求总结
    sessionExtractor.requestSummary((formattedText) => {
        // 检查返回的是否为空数组字符串或无内容
        if (!formattedText || formattedText.trim() === '[]') {
            updateModalContent(SHOW_PLACEHOLDER, true, 'session-scan');
        } else {
            updateModalContent(formattedText, false, 'session-scan');
        }
    });
}

/**
 * 处理“动态扫描”按钮的点击事件。
 * @param {HTMLElement} dynamicFab - 动态扫描按钮的DOM元素。
 */
export function handleDynamicExtractClick(dynamicFab) {
    if (sessionExtractor.isSessionRecording()) {
        sessionExtractor.stop();
        setFabIcon(dynamicFab, dynamicIcon);
        dynamicFab.classList.remove('is-recording');
        dynamicFab.title = t('scan.startSession');

        hideLiveCounter();
        // 因为计数是实时的，所以不再需要显示最终计数
        showNotification(t('scan.finished'), { type: 'success' });
    } else {
        setFabIcon(dynamicFab, stopIcon);
        dynamicFab.classList.add('is-recording');
        dynamicFab.title = t('scan.stopSession');

        showNotification(t('scan.sessionStarted'), { type: 'info' });
        showLiveCounter();

        // 稍微延迟以确保UI更新完成
        setTimeout(() => {
            sessionExtractor.start(updateLiveCounter);
        }, 50);
    }
}
