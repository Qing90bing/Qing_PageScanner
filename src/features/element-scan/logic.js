// src/features/element-scan/logic.js

import { updateHighlight, cleanupUI, createAdjustmentToolbar, cleanupToolbar, showTopCenterUI, hideTopCenterUI } from './ui.js';
import { extractAndProcessTextFromElement } from '../../shared/utils/textProcessor.js';
import { updateModalContent } from '../../shared/ui/mainModal.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { getDynamicFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { log } from '../../shared/utils/logger.js';
import { loadSettings } from '../settings/logic.js';
import { isWorkerAllowed } from '../../shared/utils/csp-checker.js';
import { performScanInMainThread } from './fallback.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { on, fire } from '../../shared/utils/eventBus.js';

// --- 模块级状态变量 ---

let isActive = false;
let isAdjusting = false;
let currentTarget = null;
let elementPath = [];
let stagedTexts = new Set();
let shouldResumeAfterModalClose = false;

// 用于跟踪滚动监听
let scrollableParents = [];
let scrollUpdateQueued = false;


// --- 事件监听 ---
on('clearElementScan', () => {
    stagedTexts.clear();
    updateStagedCount();
});

/**
 * 滚动事件处理函数。
 * 使用 requestAnimationFrame 优化性能，避免在高频滚动时重复渲染。
 */
function handleScroll() {
    if (!scrollUpdateQueued) {
        scrollUpdateQueued = true;
        requestAnimationFrame(() => {
            if (currentTarget && isAdjusting) {
                updateHighlight(currentTarget);
            }
            scrollUpdateQueued = false;
        });
    }
}

/**
 * 为当前选中元素的所有可滚动父级元素和 window 添加滚动监听。
 */
function addScrollListeners() {
    let parent = currentTarget.parentElement;
    while (parent) {
        if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) {
            scrollableParents.push(parent);
            parent.addEventListener('scroll', handleScroll, { passive: true });
        }
        parent = parent.parentElement;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    log(simpleTemplate(t('log.elementScan.scrollListenersAdded'), { count: scrollableParents.length }));
}

/**
 * 移除所有添加的滚动监听器。
 */
function removeScrollListeners() {
    scrollableParents.forEach(parent => {
        parent.removeEventListener('scroll', handleScroll);
    });
    window.removeEventListener('scroll', handleScroll);
    scrollableParents = []; // 清空数组
    log(t('log.elementScan.scrollListenersRemoved'));
}


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
    showTopCenterUI();

    // 禁用“动态扫描”按钮并更新其工具提示
    const dynamicFab = getDynamicFab();
    if (dynamicFab) {
        dynamicFab.dataset.originalTooltipKey = dynamicFab.dataset.tooltipKey;
        updateFabTooltip(dynamicFab, 'tooltip.disabled.scan_in_progress');
        dynamicFab.classList.add('fab-disabled');
    } else {
        log(t('log.elementScan.dynamicFabNotFound'), 'warn');
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
    } else {
        log(t('log.elementScan.dynamicFabNotFound'), 'warn');
    }

    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleElementClick, true);
    document.removeEventListener('keydown', handleElementScanKeyDown);
    document.removeEventListener('contextmenu', handleContextMenu, true);
    log(t('log.elementScan.listenersRemoved'));

    cleanupUI();
    cleanupToolbar();
    hideTopCenterUI();
    removeScrollListeners();

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
    removeScrollListeners();

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

/**
 * @private
 * @function updateStagedCount
 * @description 更新暂存元素的计数值，并通过事件总线通知UI层。
 *              这种方式将业务逻辑（`logic.js`）与UI实现（`ui.js`）解耦。
 *              逻辑层只负责“通知”数量变化了，而UI层负责决定“如何”展示这个变化。
 */
function updateStagedCount() {
    // 通过全局事件总线发出事件，将新的计数值作为载荷传递出去。
    fire('stagedCountChanged', stagedTexts.size);
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
    addScrollListeners();
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

async function processTextsWithWorker(texts, { filterRules, enableDebugLogging }, workerAllowed) {
    const runFallback = () => {
        log(t('log.elementScan.switchToFallback'));
        showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
        try {
            const result = performScanInMainThread(texts, filterRules, enableDebugLogging);
            updateScanCount(result.count, 'element');
            return Promise.resolve(result);
        } catch (fallbackError) {
            log(t('log.elementScan.fallbackFailed', { error: fallbackError.message }), 'error');
            return Promise.reject(fallbackError);
        }
    };

    if (!workerAllowed) {
        log(t('log.elementScan.worker.cspBlocked'), 'warn');
        return runFallback();
    }

    return new Promise((resolve, reject) => {
        try {
            log(t('log.elementScan.worker.starting'));
            const worker = new Worker(trustedWorkerUrl);

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
                // Since runFallback now returns a promise, we need to handle it
                runFallback().then(resolve).catch(reject);
            };

            log(t('log.elementScan.worker.sendingData', { count: texts.length }));
            const filterReasonTranslations = Object.keys(filterRules).reduce((acc, key) => {
                acc[key] = t(`settings.filters.${key}`);
                return acc;
            }, {});

            worker.postMessage({
                type: 'process-single',
                payload: {
                    texts,
                    filterRules,
                    enableDebugLogging,
                    translations: {
                        workerLogPrefix: t('log.elementScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        scanComplete: t('log.elementScan.worker.completed'),
                        filterReasons: getTranslationObject('filterReasons'),
                    },
                },
            });

        } catch (e) {
            log(t('log.elementScan.worker.initSyncError', { error: e.message }), 'error');
            runFallback().then(resolve).catch(reject);
        }
    });
}

export async function confirmSelectionAndExtract() {
    if (!currentTarget) {
        log(t('log.elementScan.confirmFailedNoTarget'));
        return;
    }

    // 在暂存最后选定的元素的同时，并行加载设置和检查CSP
    const [newTexts, settings, workerAllowed] = await Promise.all([
        extractAndProcessTextFromElement(currentTarget),
        loadSettings(),
        isWorkerAllowed()
    ]);

    newTexts.forEach(text => stagedTexts.add(text));
    updateStagedCount();

    const totalToProcess = stagedTexts.size;
    log(simpleTemplate(t('log.elementScan.confirmingStaged'), { count: totalToProcess }));

    isAdjusting = true;
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();

    setShouldResumeAfterModalClose(true);

    try {
        const allTexts = Array.from(stagedTexts);
        log(simpleTemplate(t('log.elementScan.extractedCount'), { count: allTexts.length }));

        const { formattedText, count } = await processTextsWithWorker(allTexts, settings, workerAllowed);
        updateModalContent(formattedText, true, 'element-scan');
        const notificationText = simpleTemplate(t('scan.elementFinished'), { count });
        showNotification(notificationText, { type: 'success' });

    } catch (error) {
        log(t('log.elementScan.processingError', { error: error.message }), 'error');
        showNotification(t('notifications.scanFailed'), { type: 'error' });
        stopElementScan();
    }
}
