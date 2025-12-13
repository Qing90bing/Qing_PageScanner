// src/features/element-scan/logic.js

import { updateHighlight, cleanupUI, createAdjustmentToolbar, cleanupToolbar, showTopCenterUI, hideTopCenterUI } from './ui.js';
import { extractRawTextFromElement } from '../../shared/utils/textProcessor.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';
import { updateModalContent } from '../../shared/ui/mainModal.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { getDynamicFab, getElementScanFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { log } from '../../shared/utils/logger.js';
import { loadSettings } from '../settings/logic.js';
import { isWorkerAllowed } from '../../shared/utils/csp-checker.js';
import { filterAndNormalizeTexts } from '../../shared/utils/textProcessor.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { on, fire } from '../../shared/utils/eventBus.js';
import { saveActiveSession, clearActiveSession, enablePersistence } from '../../shared/services/sessionPersistence.js';

// --- 模块级状态变量 ---

let isActive = false;
let isPaused = false;
let isAdjusting = false;
let currentTarget = null;
let elementPath = [];
let stagedTexts = new Set();
let shouldResumeAfterModalClose = false;
let fallbackNotificationShown = false; // 用于跟踪兼容模式通知是否已显示
let isHighlightUpdateQueued = false; // 用于 requestAnimationFrame 节流

// 自动保存（心跳）定时器
let autoSaveInterval = null;
const AUTO_SAVE_INTERVAL_MS = 5000; // 5秒

// 用于跟踪滚动监听
let scrollableParents = [];
let scrollUpdateQueued = false;


// --- 事件监听 ---
on('clearElementScan', () => {
    stagedTexts.clear();
    updateStagedCount();
});

// 新增：监听会话恢复事件
on('resumeScanSession', async (state) => {
    if (state.mode === 'element-scan') {
        log('Resuming element-scan from previous page...');
        const elementScanFab = getElementScanFab();
        const settings = await loadSettings();

        // 确保按钮存在且当前未在扫描
        if (elementScanFab && !isElementScanActive()) {
            // 根据设置决定是否恢复暂存的数据
            if (settings.elementScan_persistData && state.data && Array.isArray(state.data)) {
                stagedTexts = new Set(state.data);
                log(`Restored ${stagedTexts.size} staged items.`);
            } else {
                stagedTexts.clear();
                log('Skipping data restoration based on settings.');
            }

            // 自动启动扫描
            startElementScan(elementScanFab, { silent: true });

            // 手动更新计数器UI
            updateStagedCount();

            // 立即保存状态以刷新时间戳
            saveSessionState();

            // 显示一个通知
            if (settings.elementScan_persistData) {
                showNotification(t('notifications.elementScanResumed'), { type: 'info' });
            } else {
                showNotification(t('notifications.elementScanStarted'), { type: 'info' });
            }
        }
    }
});

// 当模态框关闭后，如果需要，则恢复元素扫描模式
on('modalClosed', () => {
    if (isElementScanActive() && getShouldResumeAfterModalClose()) {
        setShouldResumeAfterModalClose(false); // 重置标志
        reselectElement();
    }
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

function startElementScan(fabElement, options = {}) {
    log(t('log.elementScan.starting'));

    // 在启动流程开始时启用持久化
    enablePersistence();

    if (!options.silent) {
        showNotification(t('notifications.elementScanStarted'), { type: 'info' });
    }
    isActive = true;
    isAdjusting = false;
    fallbackNotificationShown = false; // 重置通知状态
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

    // 添加主文档监听器
    addListenersToDocument(document);

    // 添加 Iframe 监听器
    addListenersToIframes();

    window.addEventListener('beforeunload', handleElementScanUnload);

    // 启动自动保存心跳
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    autoSaveInterval = setInterval(() => {
        if (isElementScanActive()) {
            saveSessionState();
        }
    }, AUTO_SAVE_INTERVAL_MS);

    log(t('log.elementScan.listenersAdded'));
}

/**
 * 为指定文档对象添加必要的事件监听器。
 * @param {Document} doc - 目标文档对象
 */
function addListenersToDocument(doc) {
    try {
        doc.addEventListener('mouseover', handleMouseOver);
        doc.addEventListener('mouseout', handleMouseOut);
        doc.addEventListener('click', handleElementClick, true);
        doc.addEventListener('keydown', handleElementScanKeyDown);
        doc.addEventListener('contextmenu', handleContextMenu, true);
    } catch (e) {
        log(t('log.elementScan.addListenersFailed', { error: e.message }), 'warn');
    }
}

/**
 * 移除指定文档对象的事件监听器。
 * @param {Document} doc - 目标文档对象
 */
function removeListenersFromDocument(doc) {
    try {
        doc.removeEventListener('mouseover', handleMouseOver);
        doc.removeEventListener('mouseout', handleMouseOut);
        doc.removeEventListener('click', handleElementClick, true);
        doc.removeEventListener('keydown', handleElementScanKeyDown);
        doc.removeEventListener('contextmenu', handleContextMenu, true);
    } catch (e) {
        // 忽略移除时的错误（例如 iframe 已经卸载）
    }
}

/**
 * 查找并为所有同源 Iframe 添加监听器。
 */
function addListenersToIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            const iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
            if (iframeDoc) {
                // 将 iframe 元素自身附加到文档对象上，以便在事件处理中反查偏移量
                iframeDoc._frameElement = iframe;
                addListenersToDocument(iframeDoc);
            }
        } catch (e) {
            // 忽略跨域 iframe
        }
    });
}

/**
 * 移除所有 Iframe 的监听器。
 */
function removeListenersFromIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            const iframeDoc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
            if (iframeDoc) {
                removeListenersFromDocument(iframeDoc);
                delete iframeDoc._frameElement;
            }
        } catch (e) {
            // 忽略跨域
        }
    });
}

/**
 * 保存当前会话状态的辅助函数。
 * 这确保了在页面刷新、跳转或意外关闭时，数据和时间戳都是最新的。
 */
function saveSessionState() {
    saveActiveSession('element-scan', Array.from(stagedTexts));
}

function handleElementScanUnload() {
    if (isElementScanActive()) {
        saveSessionState();
    }
}

export function stopElementScan(fabElement) {
    if (!isActive) return;
    log(t('log.elementScan.stopping'));
    isActive = false;
    isAdjusting = false;
    isPaused = false;

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

    removeListenersFromDocument(document);
    removeListenersFromIframes();
    window.removeEventListener('beforeunload', handleElementScanUnload);

    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }

    clearActiveSession();
    log(t('log.elementScan.listenersRemoved'));

    cleanupUI();
    cleanupToolbar();
    hideTopCenterUI();
    removeScrollListeners();

    elementPath = [];
    currentTarget = null;
    stagedTexts.clear();
    fallbackNotificationShown = false; // 清理通知状态
    updateStagedCount();
    log(t('log.elementScan.stateReset'));
}

export function pauseElementScan() {
    if (!isActive || isPaused) return;
    isPaused = true;
    showNotification(t('notifications.elementScanPaused'), { type: 'info' });
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();
    
    removeListenersFromDocument(document);
    removeListenersFromIframes();
}

export function resumeElementScan() {
    if (!isActive || !isPaused) return;
    isPaused = false;
    showNotification(t('notifications.elementScanContinued'), { type: 'success' });
    reselectElement();
}

export function reselectElement() {
    if (isPaused) return;
    log(t('log.elementScan.reselecting'));
    isAdjusting = false;
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();

    addListenersToDocument(document);
    addListenersToIframes();
}

/**
 * @description 使用 Web Worker 过滤文本数组。
 * @param {string[]} texts - 要过滤的原始文本数组。
 * @param {object} settings - 当前的设置，包含过滤规则等。
 * @returns {Promise<string[]>} - 一个解析为过滤后文本数组的 Promise。
 */
function filterTextsWithWorker(texts, settings) {
    return new Promise(async (resolve) => { // No longer rejects, always resolves
        const handleFallback = () => {
            log(t('log.elementScan.worker.fallback'), 'info');
            if (!fallbackNotificationShown) {
                showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
                fallbackNotificationShown = true;
            }
            
            // 定义一个日志记录函数以传递给核心处理器
            const logFiltered = (text, reason) => {
                log(t('log.textProcessor.filtered', { text, reason }));
            };

            const filteredTexts = filterAndNormalizeTexts(
                texts,
                settings.filterRules,
                settings.enableDebugLogging,
                logFiltered
            );
            resolve(filteredTexts);
        };

        const workerAllowed = await isWorkerAllowed();
        if (!workerAllowed) {
            log(t('log.elementScan.worker.cspBlocked'), 'warn');
            handleFallback();
            return;
        }

        try {
            log(t('log.elementScan.worker.attemping'), 'info');
            const worker = new Worker(trustedWorkerUrl);

            worker.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'textsFiltered') {
                    resolve(payload.texts);
                    worker.terminate();
                }
            };

            worker.onerror = (error) => {
                // error 对象本身可能信息量不大，特别是在CSP场景下
                log(t('log.elementScan.worker.initFailed'), 'warn');
                // 添加更具体的日志，解释这可能是CSP问题
                log(t('log.elementScan.worker.cspHint'), 'debug');
                worker.terminate();
                handleFallback();
            };

            try {
                worker.postMessage({
                    type: 'filter-texts',
                    payload: {
                        texts,
                        filterRules: settings.filterRules,
                        enableDebugLogging: settings.enableDebugLogging,
                        translations: { // 确保 worker 有翻译文本
                            workerLogPrefix: t('log.elementScan.worker.logPrefix'),
                            textFiltered: t('log.textProcessor.filtered'),
                            filterReasons: getTranslationObject('filterReasons'),
                        }
                    }
                });
            } catch (postError) {
                log(t('log.elementScan.worker.postMessageFailed', { error: postError.message }), 'error');
                worker.terminate();
                handleFallback();
            }
        } catch (initError) {
            log(t('log.elementScan.worker.initSyncError', { error: initError.message }), 'error');
            handleFallback();
        }
    });
}


export async function stageCurrentElement() {
    if (!currentTarget) return;

    log(t('log.elementScan.stagingStarted', { tagName: currentTarget.tagName }));

    const rawTexts = extractRawTextFromElement(currentTarget);
    const settings = await loadSettings();

    try {
        const filteredTexts = await filterTextsWithWorker(rawTexts, settings);
        const newlyStagedCount = filteredTexts.length;

        if (newlyStagedCount > 0) {
            filteredTexts.forEach(text => stagedTexts.add(text));
            log(t('log.elementScan.staged', { count: newlyStagedCount, total: stagedTexts.size }));
            updateStagedCount();
        } else {
            log(t('log.elementScan.stagedNothingNew'));
        }
    } catch (error) {
        log(t('log.elementScan.processingError', { error: error.message }), 'error');
        showNotification(t('notifications.scanFailed'), { type: 'error' });
    }

    log(t('log.elementScan.stagingFinished'));
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
    // 每次计数变化（数据变化）时，触发保存
    if (isActive) {
        saveSessionState();
    }
}

/**
 * @private
 * @function scheduledHighlightUpdate
 * @description 在 animation frame 中更新高亮。
 *              这是被 requestAnimationFrame 调用的函数，确保UI更新平滑进行。
 */
function scheduledHighlightUpdate() {
    if (currentTarget) {
        // 计算 iframe 偏移量
        let offset = { x: 0, y: 0 };
        const doc = currentTarget.ownerDocument;
        if (doc && doc !== document && doc._frameElement) {
            const rect = doc._frameElement.getBoundingClientRect();
            offset.x = rect.left;
            offset.y = rect.top;
        }
        updateHighlight(currentTarget, offset);
    }
    isHighlightUpdateQueued = false;
}


function handleMouseOver(event) {
    if (!isActive || isAdjusting || isPaused) return;

    const target = event.target;
    
    // 忽略 FAB 容器内的元素 (需考虑 Shadow DOM 或不同 document 的情况)
    // 简单检查类名或 ID，不使用 closest 跨越 document 边界（除非 polyfilled）
    // 在 iframe 内部，这些 UI 元素通常不存在，所以这个检查主要针对主文档
    if (target.ownerDocument === document) {
         if (target.closest('.text-extractor-fab-container') || target.closest('#text-extractor-container')) {
            if (currentTarget) { 
                cleanupUI();
                currentTarget = null;
            }
            return;
        }
    }

    // 只有当目标元素改变时才记录日志和请求更新
    if (target !== currentTarget) {
        currentTarget = target;
        log(simpleTemplate(t('log.elementScan.hovering'), { tagName: currentTarget.tagName }));

        if (!isHighlightUpdateQueued) {
            isHighlightUpdateQueued = true;
            requestAnimationFrame(scheduledHighlightUpdate);
        }
    }
}

function handleMouseOut(event) {
    if (event.target === currentTarget) {
        cleanupUI();
    }
}

function handleElementScanKeyDown(event) {
    if (!isActive || event.key !== 'Escape') {
        return;
    }

    // 检查是否有任何设置面板（主面板或上下文面板）处于打开状态。
    // 如果有，则不执行任何操作，让面板自己的 ESC 逻辑处理事件。
    const isSettingsPanelOpen = uiContainer.querySelector('.settings-panel-overlay.is-visible');
    const isHelpTooltipOpen = uiContainer.querySelector('.info-tooltip-overlay.is-visible');
    if (isSettingsPanelOpen || isHelpTooltipOpen) {
        log(t('log.elementScan.escapeIgnoredForModal'));
        return;
    }

    // 如果调整工具栏是可见的 (isAdjusting is true),
    // 按 ESC 应该返回到元素选择模式，而不是完全停止。
    if (isAdjusting) {
        log(t('log.elementScan.escapePressedInAdjust'));
        reselectElement();
    } else {
        // 只有在既没有打开设置面板，也没有显示调整工具栏时，
        // 按 ESC 才应停止整个元素扫描功能。
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
    // 关键修复：检查 event.detail。
    // 真实的用户鼠标点击，event.detail >= 1。
    // 由键盘（如空格键）触发的 click 事件，event.detail === 0。
    // 这可以防止空格键快捷方式错误地触发展示工具栏的逻辑。
    if (event.detail === 0) {
        return; // 忽略由键盘触发的 click 事件
    }

    if (!isActive || isAdjusting || !currentTarget || isPaused) return;
    event.preventDefault();
    event.stopPropagation();
    
    const tagName = currentTarget.tagName.toLowerCase();
    log(simpleTemplate(t('log.elementScan.clickedEnteringAdjust'), { tagName }));
    isAdjusting = true;

    removeListenersFromDocument(document);
    removeListenersFromIframes();

    elementPath = [];
    let el = currentTarget;
    // 修改：支持 iframe 内部元素的路径构建。
    // 如果元素在 iframe 中，我们需要一直向上遍历到 iframe 的 body，
    // 然后可能还需要继续向上遍历主文档（可选，视需求而定）。
    // 目前的逻辑是：工具栏只调整当前文档内的层级。
    // 如果选中的是 iframe 内的元素，调整范围就是 iframe 内。
    
    const ownerDoc = currentTarget.ownerDocument;
    const body = ownerDoc.body;

    while (el && el !== body) {
        elementPath.push(el);
        el = el.parentElement;
    }
    elementPath.push(body);
    log(simpleTemplate(t('log.elementScan.pathBuilt'), { depth: elementPath.length }));

    // 计算工具栏需要的初始偏移量
    let offset = { x: 0, y: 0 };
    if (ownerDoc !== document && ownerDoc._frameElement) {
        const rect = ownerDoc._frameElement.getBoundingClientRect();
        offset.x = rect.left;
        offset.y = rect.top;
    }

    createAdjustmentToolbar(elementPath, offset);
    addScrollListeners();
}

export function updateSelectionLevel(level) {
    const targetElement = elementPath[level];
    if (targetElement) {
        currentTarget = targetElement;
        const tagName = targetElement.tagName.toLowerCase();
        log(simpleTemplate(t('log.elementScan.adjustingLevel'), { level, tagName }));
        
        let offset = { x: 0, y: 0 };
        const doc = targetElement.ownerDocument;
        if (doc !== document && doc._frameElement) {
            const rect = doc._frameElement.getBoundingClientRect();
            offset.x = rect.left;
            offset.y = rect.top;
        }

        updateHighlight(targetElement, offset);
    }
}

export async function confirmSelectionAndExtract() {
    if (!currentTarget) {
        log(t('log.elementScan.confirmFailedNoTarget'));
        return;
    }

    log(t('log.elementScan.confirmStarted'));

    // 1. 对最后选定的元素，提取并通过 Worker 过滤文本
    const rawTexts = extractRawTextFromElement(currentTarget);
    const settings = await loadSettings();

    try {
        const filteredTexts = await filterTextsWithWorker(rawTexts, settings);
        filteredTexts.forEach(text => stagedTexts.add(text));
        updateStagedCount(); // 更新最终计数值
    } catch (error) {
        log(t('log.elementScan.processingError', { error: error.message }), 'error');
        showNotification(t('notifications.scanFailed'), { type: 'error' });
        const fabElement = uiContainer.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
        return;
    }

    const totalToProcess = stagedTexts.size;
    log(simpleTemplate(t('log.elementScan.confirmingStaged'), { count: totalToProcess }));

    // 2. 清理UI并为显示模态框做准备
    isAdjusting = true;
    removeListenersFromDocument(document);
    removeListenersFromIframes();
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();

    setShouldResumeAfterModalClose(true);

    // 3. 处理并显示结果
    try {
        const allTexts = Array.from(stagedTexts);
        log(simpleTemplate(t('log.elementScan.extractedCount'), { count: allTexts.length }));

        // 由于所有文本在暂存时已经过过滤，现在只需格式化即可
        const { outputFormat } = settings; // Get format setting
        const formattedText = formatTextsForTranslation(allTexts, outputFormat);
        const count = allTexts.length;

        updateModalContent(formattedText, true, 'element-scan');
        updateScanCount(count, 'element');

        const notificationText = simpleTemplate(t('scan.elementFinished'), { count });
        showNotification(notificationText, { type: 'success' });
        log(t('log.elementScan.confirmFinished'));

    } catch (error) {
        log(t('log.elementScan.confirmFailed', { error: error.message }), 'error');
        showNotification(t('notifications.scanFailed'), { type: 'error' });
        // 即使出错，也要确保停止扫描以清理状态
        const fabElement = uiContainer.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
    }
}
