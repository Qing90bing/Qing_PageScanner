// src/features/session-scan/ui.js

import { updateModalContent, SHOW_PLACEHOLDER } from '../../shared/ui/mainModal.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
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
    const results = sessionExtractor.getSessionTexts();
    if (results.length === 0) {
        updateModalContent(SHOW_PLACEHOLDER, true, 'session-scan');
    } else {
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
