// src/features/element-scan/logic.js

import { updateHighlight, cleanupUI, createAdjustmentToolbar, cleanupToolbar, showTopCenterUI, hideTopCenterUI, playScanConfirmationAnimation, playScanPulseAnimation, playScanErrorAnimation } from './ui.js';
import { extractRawTextFromElement } from '../../shared/utils/text/textProcessor.js';
import { formatTextsForTranslation } from '../../shared/utils/text/formatting.js';
import { updateModalContent } from '../../shared/ui/mainModal/index.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { getDynamicFab, getElementScanFab, updateFabTooltip } from '../../shared/ui/components/fab.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t, getTranslationObject } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/dom/templating.js';
import { log } from '../../shared/utils/core/logger.js';
import { loadSettings } from '../settings/logic.js';
import { isWorkerAllowed } from '../../shared/utils/core/csp-checker.js';
import { filterAndNormalizeTexts } from '../../shared/utils/text/textProcessor.js';
import { trustedWorkerUrl } from '../../shared/workers/worker-url.js';
import { updateScanCount } from '../../shared/ui/mainModal/modalHeader.js';
import { on, fire } from '../../shared/utils/core/eventBus.js';
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

// 优化：持久化 Worker 实例和 Iframe 观察者
let workerInstance = null;
let iframeObserver = null;
// 修复：防止暂存动画定时器与手动操作冲突
let reselectTimer = null;


// --- 事件监听 ---
on('clearElementScan', () => {
    stagedTexts.clear();
    updateStagedCount();
});

// 新增：监听会话恢复事件
on('resumeScanSession', async (state) => {
    if (state.mode === 'element-scan') {
        const elementScanFab = getElementScanFab();
        const settings = await loadSettings();

        // 确保按钮存在且当前未在扫描
        if (elementScanFab && !isElementScanActive()) {
            // Check if there's saved state to restore
            if (state && state.mode === 'element-scan' && state.data && Array.isArray(state.data)) {
                log(t('log.elementScan.resuming'));

                // 只有当设置为 true 时才恢复数据
                if (settings.elementScan_persistData) { // Assuming settings.elementScan_persistData is the equivalent of shouldPersistElementScanData()
                    state.data.forEach(item => stagedTexts.add(item));
                    log(t('log.elementScan.restored', { count: stagedTexts.size }));
                    // 恢复 UI 状态 (如果需要)
                    // ...
                } else {
                    stagedTexts.clear(); // Clear if persistence is off but data was present
                    log(t('log.elementScan.skipRestore'));
                }
            } else {
                log(t('log.elementScan.startingNewSession')); // Log for starting a new session if no data to restore
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

    // 添加 Iframe 监听器 (初始扫描)
    addListenersToIframes();

    // 启动动态 Iframe 监听
    setupIframeObserver();

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
        attachIframeListeners(iframe);
    });
}

/**
 * 辅助函数：为单个 Iframe 绑定监听器
 * 包括处理尚未加载完成的情况
 * @param {HTMLIFrameElement} iframe
 */
function attachIframeListeners(iframe) {
    try {
        const attach = (win) => {
            try {
                const doc = win.document;
                if (doc) {
                    doc._frameElement = iframe;
                    addListenersToDocument(doc);
                }
            } catch (e) {
                // ignore cross-origin access errors
            }
        };

        if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.readyState === 'complete') {
            attach(iframe.contentWindow);
        } else {
            // 如果 iframe 还没加载完，监听 load 事件
            iframe.addEventListener('load', () => {
                if (iframe.contentWindow) {
                    attach(iframe.contentWindow);
                }
            }, { once: true });
        }
    } catch (e) {
        // 忽略跨域 iframe
    }
}

/**
 * 设置 MutationObserver 以监听动态添加的 Iframe
 */
function setupIframeObserver() {
    if (iframeObserver) return;

    iframeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    // 直接检查 iframe 标签
                    if (node.tagName === 'IFRAME') {
                        attachIframeListeners(node);
                    }
                    // 检查容器内部是否包含 iframe
                    else if (node.nodeType === Node.ELEMENT_NODE && node.querySelectorAll) {
                        const nestedIframes = node.querySelectorAll('iframe');
                        nestedIframes.forEach(attachIframeListeners);
                    }
                });
            }
        });
    });

    iframeObserver.observe(document.body, { childList: true, subtree: true });
    log(t('log.elementScan.iframeObserverStarted'));
}

/**
 * 移除所有 Iframe 的监听器。
 */
function removeListenersFromIframes() {
    // 停止观察
    if (iframeObserver) {
        iframeObserver.disconnect();
        iframeObserver = null;
    }

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

    // 清理定时器
    if (reselectTimer) {
        clearTimeout(reselectTimer);
        reselectTimer = null;
    }

    // 清理 Worker
    terminateWorker();

    elementPath = [];
    currentTarget = null;
    stagedTexts.clear();
    fallbackNotificationShown = false; // 清理通知状态
    updateStagedCount();
    log(t('log.elementScan.stateReset'));
}

function terminateWorker() {
    if (workerInstance) {
        workerInstance.terminate();
        workerInstance = null;
        log(t('log.elementScan.worker.terminated'));
    }
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

    // 清除可能存在的延时重置，防止竞态条件
    if (reselectTimer) {
        clearTimeout(reselectTimer);
        reselectTimer = null;
    }

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
    return new Promise(async (resolve) => {
        const handleFallback = () => {
            log(t('log.elementScan.worker.fallback'), 'info');
            if (!fallbackNotificationShown) {
                showNotification(t('notifications.cspWorkerWarning'), { type: 'info', duration: 5000 });
                fallbackNotificationShown = true;
            }

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
            // 如果实例不存在（或者之前被意外销毁），则创建新实例
            if (!workerInstance) {
                log(t('log.elementScan.worker.initializing'), 'info');
                workerInstance = new Worker(trustedWorkerUrl);

                // 设置通用的错误处理，防止未捕获的异常
                workerInstance.onerror = (error) => {
                    log(t('log.elementScan.worker.error'), 'error');
                    // 注意：这里不 terminate，除非是严重错误。让单次请求的 handler 去处理回调逻辑。
                    // 但为了稳健，如果 Worker 挂了，我们可能需要重置 workerInstance
                };
            }

            // 为本次请求设置 specific handler
            // 注意：由于 JS 单线程且此处操作通常是串行的（用户点击 -> 处理 -> 结束），
            // 直接复用 onmessage 是安全的。如果支持并发，需要用 MessageId 映射。
            workerInstance.onmessage = (event) => {
                const { type, payload } = event.data;
                if (type === 'textsFiltered') {
                    resolve(payload.texts);
                    // 不再 terminate worker
                }
            };

            // 覆盖 onerror 以便捕获本次特定的错误并 fallback
            workerInstance.onerror = (error) => {
                log(t('log.elementScan.worker.runtimeError'), 'warn');
                workerInstance.terminate();
                workerInstance = null; // 销毁并重置，下次会重建
                handleFallback();
            };

            workerInstance.postMessage({
                type: 'filter-texts',
                payload: {
                    texts,
                    filterRules: settings.filterRules,
                    enableDebugLogging: settings.enableDebugLogging,
                    translations: {
                        workerLogPrefix: t('log.elementScan.worker.logPrefix'),
                        textFiltered: t('log.textProcessor.filtered'),
                        filterReasons: getTranslationObject('filterReasons'),
                    }
                }
            });

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

            // 播放脉冲动画作为成功反馈
            playScanPulseAnimation();

            // 延迟一点再恢复选择模式，让动画播放完（提升可视性）
            // 保存 timer ID 以便在手动操作时取消
            if (reselectTimer) clearTimeout(reselectTimer);
            reselectTimer = setTimeout(() => {
                reselectElement();
                reselectTimer = null;
            }, 500);
        } else {
            log(t('log.elementScan.stagedNothingNew'));
            // 播放错误/虽然空动画
            playScanErrorAnimation();

            // 同样延迟一点再恢复，让用户看清错误反馈
            if (reselectTimer) clearTimeout(reselectTimer);
            reselectTimer = setTimeout(() => {
                reselectElement();
                reselectTimer = null;
            }, 500); // 错误动画也是 400ms 左右，给 600ms 足够了
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

    // 1. 设置调整模式，防止鼠标悬停干扰动画
    isAdjusting = true; // 关键锁定

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

    // --- 播放确认动画，等待动画这一视觉反馈完成后，再打开模态框 ---
    // 这样做可以给用户一个清晰的“操作已完成，正在跳转”的心理预期
    playScanConfirmationAnimation(() => {
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
            const { outputFormat, includeArrayBrackets } = settings;
            const formattedText = formatTextsForTranslation(allTexts, outputFormat, { includeArrayBrackets });
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
    });
}
