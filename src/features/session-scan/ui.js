// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER, SHOW_LOADING } from '../../shared/ui/mainModal.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';
import * as sessionExtractor from './logic.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { showLiveCounter, hideLiveCounter, updateLiveCounter } from './liveCounterUI.js';
import { t } from '../../shared/i18n/index.js';
import { setFabIcon } from '../../shared/ui/components/fab.js';
import { dynamicIcon } from '../../assets/icons/dynamicIcon.js';
import { stopIcon } from '../../assets/icons/stopIcon.js';
import { simpleTemplate } from '../../shared/utils/templating.js';

/**
 * 处理“查看总结”按钮的点击事件。
 */
export function handleSummaryClick() {
    // 首先，直接从 Set 获取数据。让 Worker 处理 `Array.from`
    const results = sessionExtractor.getSessionTexts(); // getSessionTexts 内部已经实现了返回Set
    if (results.length === 0) {
        updateModalContent(SHOW_PLACEHOLDER, true, 'session-scan');
        return;
    }

    // 1. 显示加载指示器
    updateModalContent(SHOW_LOADING, true, 'session-scan');

    try {
        // 2. 创建 Worker
        // eslint-disable-next-line no-undef
        const workerScript = __WORKER_STRING__;
        // 将脚本内容编码为 data: URL
        const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;

        // 仍然通过 Trusted Types 策略传递，以防万一
        const trustedUrl = createTrustedWorkerUrl(workerUrl);
        const worker = new Worker(trustedUrl);

        // 3. 设置回调
        worker.onmessage = (event) => {
            const formattedText = event.data;
            updateModalContent(formattedText, false, 'session-scan');
            worker.terminate();
        };

        worker.onerror = (error) => {
            console.error('Worker error:', error);
            showNotification(t('error.workerError'), { type: 'error' });
            updateModalContent(SHOW_PLACEHOLDER, false, 'session-scan');
            worker.terminate();
        };

        // 4. 发送数据给 Worker
        worker.postMessage(results);

    } catch (e) {
        console.error('Failed to initialize web worker:', e);
        showNotification(t('error.workerInitFailed'), { type: 'error' });
        // 如果 Worker 初始化失败，则回退到旧的、可能阻塞UI的方法
        const formattedText = formatTextsForTranslation(results);
        updateModalContent(formattedText, true, 'session-scan');
    }
}

/**
 * 处理“动态扫描”按钮的点击事件。
 * @param {HTMLElement} dynamicFab - 动态扫描按钮的DOM元素。
 */
export function handleDynamicExtractClick(dynamicFab) {
    if (sessionExtractor.isSessionRecording()) {
        const results = sessionExtractor.stop();
        setFabIcon(dynamicFab, dynamicIcon);
        dynamicFab.classList.remove('is-recording');
        dynamicFab.title = t('scan.startSession');

        hideLiveCounter();
        const notificationText = simpleTemplate(t('scan.finished'), { count: results.length });
        showNotification(notificationText, { type: 'success' });
    } else {
        setFabIcon(dynamicFab, stopIcon);
        dynamicFab.classList.add('is-recording');
        dynamicFab.title = t('scan.stopSession');

        showNotification(t('scan.sessionStarted'), { type: 'info' });
        showLiveCounter();

        setTimeout(() => {
            sessionExtractor.start(updateLiveCounter);
        }, 50);
    }
}
