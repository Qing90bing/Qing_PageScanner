// src/features/element-scan/logic.js

import { updateHighlight, cleanupUI, createAdjustmentToolbar, cleanupToolbar } from './ui.js';
import { extractAndProcessTextFromElement } from '../../shared/utils/textProcessor.js';
import { updateModalContent } from '../../shared/ui/mainModal.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { getDynamicFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { log } from '../../shared/utils/logger.js';
import { loadSettings } from '../settings/logic.js';
import { createTrustedWorkerUrl } from '../../shared/utils/trustedTypes.js';
import { performScanInMainThread } from './fallback.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { showTopCenterCounter, hideTopCenterCounter, updateTopCenterCounter } from '../../shared/ui/components/topCenterCounter.js';
import { on } from '../../shared/utils/eventBus.js';

// --- 模块级状态变量 ---

let isActive = false;
let isAdjusting = false;
let currentTarget = null;
let elementPath = [];
let stagedTexts = new Set();
let shouldResumeAfterModalClose = false;

// --- 事件监听 ---
on('clearElementScan', () => {
    stagedTexts.clear();
    updateStagedCount();
});


export function isElementScanActive() {
    return isActive;
}

export function getStagedTexts() {
    return stagedTexts;
}

export function getShouldResumeAfterModalClose() {
    return shouldResumeAfterModalClose;
}

export function setShouldResumeAfterModalClose(value) {
    shouldResumeAfterModalClose = value;
}

export function handleElementScanClick(fabElement) {
    if (isActive) {
        stopElementScan(fabElement);
    } else {
        startElementScan(fabElement);
    }
}

function startElementScan(fabElement) {
    log(t('log.elementScan.starting'));
    showNotification(t('notifications.elementScanStarted'), { type: 'info' });
    isActive = true;
    isAdjusting = false;
    fabElement.classList.add('is-recording');
    updateFabTooltip(fabElement, 'scan.stopSession'); // 更新自己的工具提示
    showTopCenterCounter('scan.stagedCount');

    // 禁用“动态扫描”按钮并更新其工具提示
    const dynamicFab = getDynamicFab();
    if (dynamicFab) {
        dynamicFab.dataset.originalTooltipKey = dynamicFab.dataset.tooltipKey;
        updateFabTooltip(dynamicFab, 'tooltip.disabled.scan_in_progress');
        dynamicFab.classList.add('fab-disabled');
    }

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true);
    document.addEventListener('keydown', handleElementScanKeyDown);
    document.addEventListener('contextmenu', handleContextMenu, true);
    log(t('log.elementScan.listenersAdded'));
}

export function stopElementScan(fabElement) {
    if (!isActive) return;
    log(t('log.elementScan.stopping'));
    isActive = false;
    isAdjusting = false;

    if (fabElement) {
        fabElement.classList.remove('is-recording');
        updateFabTooltip(fabElement, 'tooltip.element_scan'); // 恢复自己的工具提示
    }

    // 启用“动态扫描”按钮并恢复其工具提示
    const dynamicFab = getDynamicFab();
    if (dynamicFab) {
        dynamicFab.classList.remove('fab-disabled');
        if (dynamicFab.dataset.originalTooltipKey) {
            updateFabTooltip(dynamicFab, dynamicFab.dataset.originalTooltipKey);
        }
    }

    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleElementClick, true);
    document.removeEventListener('keydown', handleElementScanKeyDown);
    document.removeEventListener('contextmenu', handleContextMenu, true);
    log(t('log.elementScan.listenersRemoved'));

    cleanupUI();
    cleanupToolbar();
    hideTopCenterCounter();

    elementPath = [];
    currentTarget = null;
    stagedTexts.clear();
    updateStagedCount();
    log(t('log.elementScan.stateReset'));
}

export function reselectElement() {
    log(t('log.elementScan.reselecting'));
    isAdjusting = false;
    cleanupUI();
    cleanupToolbar();

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true);
}

export function stageCurrentElement() {
    if (currentTarget) {
        const newTexts = extractAndProcessTextFromElement(currentTarget);
        newTexts.forEach(text => stagedTexts.add(text));
        log(simpleTemplate(t('log.elementScan.staged'), { count: stagedTexts.size }));
        updateStagedCount();
    }
    reselectElement();
}

function updateStagedCount() {
    updateTopCenterCounter(stagedTexts.size);
}

function handleMouseOver(event) {
    if (!isActive || isAdjusting) return;
    if (event.target.closest('.text-extractor-fab-container') || event.target.closest('#text-extractor-container')) {
        cleanupUI();
        currentTarget = null;
        return;
    }
    currentTarget = event.target;
    log(simpleTemplate(t('log.elementScan.hovering'), { tagName: currentTarget.tagName }));
    updateHighlight(currentTarget);
}

function handleMouseOut(event) {
    if (event.target === currentTarget) {
        cleanupUI();
    }
}

function handleElementScanKeyDown(event) {
    if (isActive && event.key === 'Escape') {
        log(t('log.elementScan.escapePressed'));
        const fabElement = uiContainer.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
    }
}

function handleContextMenu(event) {
    if (isActive && !isAdjusting) {
        event.preventDefault();
        log(t('log.elementScan.rightClickExit'));
        const fabElement = uiContainer.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
    }
}

function handleElementClick(event) {
    if (!isActive || isAdjusting || !currentTarget) return;
    event.preventDefault();
    event.stopPropagation();
    
    const tagName = currentTarget.tagName.toLowerCase();
    log(simpleTemplate(t('log.elementScan.clickedEnteringAdjust'), { tagName }));
    isAdjusting = true;

    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);

    elementPath = [];
    let el = currentTarget;
    while (el && el.tagName !== 'BODY') {
        elementPath.push(el);
        el = el.parentElement;
    }
    elementPath.push(document.body);
    log(simpleTemplate(t('log.elementScan.pathBuilt'), { depth: elementPath.length }));

    createAdjustmentToolbar(elementPath);
}

export function updateSelectionLevel(level) {
    const targetElement = elementPath[level];
    if (targetElement) {
        currentTarget = targetElement;
        const tagName = targetElement.tagName.toLowerCase();
        log(simpleTemplate(t('log.elementScan.adjustingLevel'), { level, tagName }));
        updateHighlight(targetElement);
    }
}

function processTextsWithWorker(texts) {
    return new Promise((resolve, reject) => {
        const { filterRules, enableDebugLogging } = loadSettings();
        const runFallback = () => {
            log(t('log.elementScan.switchToFallback'));
            showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
            try {
                const result = performScanInMainThread(texts, filterRules, enableDebugLogging);
                updateScanCount(result.count, 'element');
                resolve(result);
            } catch (fallbackError) {
                log(t('log.elementScan.fallbackFailed', { error: fallbackError.message }), 'error');
                reject(fallbackError);
            }
        };

        try {
            log(t('log.elementScan.worker.starting'));
            const workerScript = __ELEMENT_SCAN_WORKER_STRING__;
            const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
            const trustedUrl = createTrustedWorkerUrl(workerUrl);
            const worker = new Worker(trustedUrl);

            worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'scanCompleted') {
                    log(t('log.elementScan.worker.completed', { count: payload.count }));
                    updateScanCount(payload.count, 'element');
                    resolve(payload);
                    worker.terminate();
                }
            };

            worker.onerror = (error) => {
                log(t('log.elementScan.worker.initFailed'), 'warn');
                log(t('log.elementScan.worker.originalError', { error: error.message }), 'debug');
                worker.terminate();
                runFallback();
            };

            log(t('log.elementScan.worker.sendingData', { count: texts.length }));
            const filterReasonTranslations = Object.keys(filterRules).reduce((acc, key) => {
                acc[key] = t(`settings.filters.${key}`);
                return acc;
            }, {});

            worker.postMessage({
                type: 'scan-element',
                payload: {
                    texts,
                    filterRules,
                    enableDebugLogging,
                    translations: {
                        workerLogPrefix: t('log.elementScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        scanComplete: t('log.elementScan.worker.completed'),
                        filterReasons: filterReasonTranslations,
                    },
                },
            });

        } catch (e) {
            log(t('log.elementScan.worker.initSyncError', { error: e.message }), 'error');
            runFallback();
        }
    });
}

export async function confirmSelectionAndExtract() {
    if (!currentTarget) {
        log(t('log.elementScan.confirmFailedNoTarget'));
        return;
    }

    const newTexts = extractAndProcessTextFromElement(currentTarget);
    newTexts.forEach(text => stagedTexts.add(text));
    updateStagedCount();

    const totalToProcess = stagedTexts.size;
    log(simpleTemplate(t('log.elementScan.confirmingStaged'), { count: totalToProcess }));

    isAdjusting = true;
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    cleanupUI();
    cleanupToolbar();

    setShouldResumeAfterModalClose(true);

    try {
        const allCleanTexts = Array.from(stagedTexts);
        log(simpleTemplate(t('log.elementScan.extractedCount'), { count: allCleanTexts.length }));

        // 注意：这里的文本已经是过滤和去重过的，但Worker仍然可以处理它们
        // Worker内部可能会有进一步的处理或格式化
        const { formattedText, count } = await processTextsWithWorker(allCleanTexts);
        updateModalContent(formattedText, true, 'element-scan');
        const notificationText = simpleTemplate(t('scan.elementFinished'), { count });
        showNotification(notificationText, { type: 'success' });

    } catch (error) {
        log(t('log.elementScan.processingError', { error: error.message }), 'error');
        showNotification(t('notifications.scanFailed'), { type: 'error' });
        stopElementScan();
    }
}
