import {
    cleanupToolbar,
    cleanupUI,
    createAdjustmentToolbar,
    hideTopCenterUI,
    showTopCenterUI,
    updateHighlight,
} from './ui.js';
import { uiContainer } from '../../shared/ui/uiContainer.js';
import { t } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/dom/templating.js';
import { log } from '../../shared/utils/core/logger.js';
import { createIframeListenerRegistry } from './iframeListenerRegistry.js';

export function createElementSelectionController({ state, onStop, onStage, onConfirm }) {
    const runtime = {
        iframeObserver: null,
        scrollableParents: [],
        scrollUpdateQueued: false,
        highlightUpdateQueued: false,
    };

    function handleScroll() {
        if (runtime.scrollUpdateQueued) return;
        runtime.scrollUpdateQueued = true;
        requestAnimationFrame(() => {
            if (state.currentTarget && state.isAdjusting) updateHighlight(state.currentTarget);
            runtime.scrollUpdateQueued = false;
        });
    }

    function addScrollListeners() {
        if (!state.currentTarget) return;
        const cursor = { parent: state.currentTarget.parentElement };
        while (cursor.parent) {
            if (
                cursor.parent.scrollHeight > cursor.parent.clientHeight ||
                cursor.parent.scrollWidth > cursor.parent.clientWidth
            ) {
                runtime.scrollableParents.push(cursor.parent);
                cursor.parent.addEventListener('scroll', handleScroll, { passive: true });
            }
            cursor.parent = cursor.parent.parentElement;
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        log(simpleTemplate(t('log.elementScan.scrollListenersAdded'), { count: runtime.scrollableParents.length }));
    }

    function removeScrollListeners() {
        runtime.scrollableParents.forEach((parent) => parent.removeEventListener('scroll', handleScroll));
        window.removeEventListener('scroll', handleScroll);
        runtime.scrollableParents = [];
        log(t('log.elementScan.scrollListenersRemoved'));
    }

    function getDocumentOffset(doc) {
        if (!doc || doc === document) return { x: 0, y: 0 };
        const frameElement = iframeListenerRegistry.getFrameElement(doc);
        if (!frameElement) return { x: 0, y: 0 };
        const rect = frameElement.getBoundingClientRect();
        return { x: rect.left, y: rect.top };
    }

    function scheduledHighlightUpdate() {
        if (state.currentTarget) {
            updateHighlight(state.currentTarget, getDocumentOffset(state.currentTarget.ownerDocument));
        }
        runtime.highlightUpdateQueued = false;
    }

    function handleMouseOver(event) {
        if (!state.isActive || state.isAdjusting || state.isPaused) return;
        const target = event.target;
        if (target.ownerDocument === document) {
            if (target.closest('.text-extractor-fab-container') || target.closest('#text-extractor-container')) {
                if (state.currentTarget) {
                    cleanupUI();
                    state.currentTarget = null;
                }
                return;
            }
        }

        if (target !== state.currentTarget) {
            state.currentTarget = target;
            log(simpleTemplate(t('log.elementScan.hovering'), { tagName: state.currentTarget.tagName }));
            if (!runtime.highlightUpdateQueued) {
                runtime.highlightUpdateQueued = true;
                requestAnimationFrame(scheduledHighlightUpdate);
            }
        }
    }

    function handleMouseOut(event) {
        if (event.target === state.currentTarget) cleanupUI();
    }

    function handleElementScanKeyDown(event) {
        if (!state.isActive || event.key !== 'Escape') return;
        const isSettingsPanelOpen = uiContainer.querySelector('.settings-panel-overlay.is-visible');
        const isHelpTooltipOpen = uiContainer.querySelector('.info-tooltip-overlay.is-visible');
        if (isSettingsPanelOpen || isHelpTooltipOpen) {
            log(t('log.elementScan.escapeIgnoredForModal'));
            return;
        }
        if (state.isAdjusting) {
            log(t('log.elementScan.escapePressedInAdjust'));
            reselect();
            return;
        }
        log(t('log.elementScan.escapePressed'));
        onStop();
    }

    function handleContextMenu(event) {
        if (!state.isActive || state.isAdjusting) return;
        event.preventDefault();
        log(t('log.elementScan.rightClickExit'));
        onStop();
    }

    function handleElementClick(event) {
        if (event.detail === 0) return;
        if (!state.isActive || state.isAdjusting || !state.currentTarget || state.isPaused) return;
        event.preventDefault();
        event.stopPropagation();

        const tagName = state.currentTarget.tagName.toLowerCase();
        log(simpleTemplate(t('log.elementScan.clickedEnteringAdjust'), { tagName }));
        state.isAdjusting = true;
        removeListenersFromDocument(document);
        removeListenersFromIframes();

        const path = [];
        const cursor = { element: state.currentTarget };
        const ownerDoc = state.currentTarget.ownerDocument;
        const body = ownerDoc.body;
        while (cursor.element && cursor.element !== body) {
            path.push(cursor.element);
            cursor.element = cursor.element.parentElement;
        }
        path.push(body);
        state.elementPath = path;
        log(simpleTemplate(t('log.elementScan.pathBuilt'), { depth: state.elementPath.length }));

        createAdjustmentToolbar(state.elementPath, getDocumentOffset(ownerDoc), {
            onSelectionLevelChange: updateSelectionLevel,
            onReselect: reselect,
            onStage,
            onConfirm,
        });
        addScrollListeners();
    }

    function addListenersToDocument(doc) {
        try {
            doc.addEventListener('mouseover', handleMouseOver);
            doc.addEventListener('mouseout', handleMouseOut);
            doc.addEventListener('click', handleElementClick, true);
            doc.addEventListener('keydown', handleElementScanKeyDown);
            doc.addEventListener('contextmenu', handleContextMenu, true);
        } catch (error) {
            log(t('log.elementScan.addListenersFailed', { error: error.message }), 'warn');
        }
    }

    function removeListenersFromDocument(doc) {
        try {
            doc.removeEventListener('mouseover', handleMouseOver);
            doc.removeEventListener('mouseout', handleMouseOut);
            doc.removeEventListener('click', handleElementClick, true);
            doc.removeEventListener('keydown', handleElementScanKeyDown);
            doc.removeEventListener('contextmenu', handleContextMenu, true);
        } catch {
            // 文档可能已经卸载。
        }
    }

    function collectIframeElements(nodes, target) {
        nodes.forEach((node) => {
            if (node.tagName === 'IFRAME') {
                target.add(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.querySelectorAll) {
                node.querySelectorAll('iframe').forEach((iframe) => target.add(iframe));
            }
        });
    }

    function attachIframeListeners(iframe) {
        iframeListenerRegistry.watch(iframe);
    }

    function addListenersToIframes() {
        document.querySelectorAll('iframe').forEach(attachIframeListeners);
    }

    function setupIframeObserver() {
        if (runtime.iframeObserver) return;
        runtime.iframeObserver = new MutationObserver((mutations) => {
            const removedIframes = new Set();
            const addedIframes = new Set();
            mutations.forEach((mutation) => {
                collectIframeElements(mutation.removedNodes, removedIframes);
                collectIframeElements(mutation.addedNodes, addedIframes);
            });
            removedIframes.forEach((iframe) => iframeListenerRegistry.unwatch(iframe));
            addedIframes.forEach(attachIframeListeners);
        });
        runtime.iframeObserver.observe(document.body, { childList: true, subtree: true });
        log(t('log.elementScan.iframeObserverStarted'));
    }

    function removeListenersFromIframes({ reset = false } = {}) {
        if (runtime.iframeObserver) {
            runtime.iframeObserver.disconnect();
            runtime.iframeObserver = null;
        }
        if (reset) iframeListenerRegistry.reset();
        else iframeListenerRegistry.detachAll();
    }

    const iframeListenerRegistry = createIframeListenerRegistry({
        canAttach: () => state.isActive && !state.isPaused,
        onAttach: addListenersToDocument,
        onDetach: removeListenersFromDocument,
    });

    function reselect() {
        if (state.isPaused) return;
        log(t('log.elementScan.reselecting'));
        state.isAdjusting = false;
        cleanupUI();
        cleanupToolbar();
        removeScrollListeners();
        addListenersToDocument(document);
        addListenersToIframes();
        setupIframeObserver();
    }

    function updateSelectionLevel(level) {
        const targetElement = state.elementPath[level];
        if (!targetElement) return;
        state.currentTarget = targetElement;
        const tagName = targetElement.tagName.toLowerCase();
        log(simpleTemplate(t('log.elementScan.adjustingLevel'), { level, tagName }));
        updateHighlight(targetElement, getDocumentOffset(targetElement.ownerDocument));
    }

    function start() {
        addListenersToDocument(document);
        addListenersToIframes();
        setupIframeObserver();
    }

    function stop() {
        removeListenersFromDocument(document);
        removeListenersFromIframes({ reset: true });
        cleanupUI();
        cleanupToolbar();
        hideTopCenterUI();
        removeScrollListeners();
        state.currentTarget = null;
        state.elementPath = [];
        state.isAdjusting = false;
    }

    function pause() {
        cleanupUI();
        cleanupToolbar();
        removeScrollListeners();
        removeListenersFromDocument(document);
        removeListenersFromIframes();
    }

    function resume() {
        reselect();
    }

    function prepareForModal() {
        removeListenersFromDocument(document);
        removeListenersFromIframes();
        cleanupUI();
        cleanupToolbar();
        removeScrollListeners();
    }

    return {
        getCurrentTarget: () => state.currentTarget,
        getDocumentOffset,
        getShouldResumeAfterModalClose: () => state.shouldResumeAfterModalClose,
        pause,
        prepareForModal,
        reselect,
        resume,
        setAdjusting: (value) => {
            state.isAdjusting = value;
        },
        setShouldResumeAfterModalClose: (value) => {
            state.shouldResumeAfterModalClose = value;
        },
        showTopCenterControls: (actions) => showTopCenterUI(actions),
        start,
        stop,
        updateSelectionLevel,
    };
}
