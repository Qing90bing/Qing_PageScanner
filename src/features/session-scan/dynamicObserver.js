import { scannerConfig } from '../../shared/config/scannerConfig.js';
import { selectTopLevelMutationRoots } from '../../shared/utils/dom/mutationRoots.js';
import {
    isTranslationBridgeActive,
    isTranslationBridgeIdle,
    onTranslationBridgeStateChange,
    TRANSLATION_IDLE_STATE,
    TRANSLATION_BRIDGE_MAX_WAIT_MS,
    TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS,
} from '../../shared/services/translationBridge.js';

export function createSessionDynamicObserver({ isRecording, processTexts }) {
    const runtime = {
        observer: null,
        pendingRoots: new Set(),
        flushTimeout: null,
        unsubscribeBridge: null,
        waitStartedAt: null,
    };

    function clearPendingRoots() {
        runtime.pendingRoots.clear();
        runtime.waitStartedAt = null;
        if (runtime.flushTimeout !== null) {
            clearTimeout(runtime.flushTimeout);
            runtime.flushTimeout = null;
        }
    }

    function flushPendingRoots() {
        if (!isRecording() || runtime.pendingRoots.size === 0) return;

        const pendingRoots = Array.from(runtime.pendingRoots);
        const roots = selectTopLevelMutationRoots(pendingRoots);
        clearPendingRoots();
        const textsBatch = [];
        const ignoredSelectorString = scannerConfig.ignoredSelectors.join(', ');

        roots.forEach((root) => {
            if (!root.isConnected || root.closest(ignoredSelectorString)) return;
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
                if (walker.currentNode.nodeValue) textsBatch.push(walker.currentNode.nodeValue);
            }
        });
        processTexts(textsBatch);
    }

    function scheduleFlushFallback() {
        if (runtime.flushTimeout !== null) return;
        if (runtime.waitStartedAt === null) runtime.waitStartedAt = performance.now();

        runtime.flushTimeout = setTimeout(() => {
            runtime.flushTimeout = null;
            const bridgeStillBusy = isTranslationBridgeActive() && !isTranslationBridgeIdle();
            const waitedTooLong =
                runtime.waitStartedAt !== null &&
                performance.now() - runtime.waitStartedAt >= TRANSLATION_BRIDGE_MAX_WAIT_MS;

            if (!bridgeStillBusy || waitedTooLong) flushPendingRoots();
            else scheduleFlushFallback();
        }, TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS);
    }

    function handleTranslationBridgeStateChange(bridgeState) {
        if (bridgeState === TRANSLATION_IDLE_STATE) flushPendingRoots();
    }

    function handleMutations(mutations) {
        if (!isRecording()) return;
        const ignoredSelectorString = scannerConfig.ignoredSelectors.join(', ');
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== Node.ELEMENT_NODE || node.closest(ignoredSelectorString)) return;
                runtime.pendingRoots.add(node);
            });
        });
        if (runtime.pendingRoots.size === 0) return;
        if (isTranslationBridgeActive()) scheduleFlushFallback();
        else flushPendingRoots();
    }

    function subscribeBridge() {
        if (runtime.unsubscribeBridge === null) {
            runtime.unsubscribeBridge = onTranslationBridgeStateChange(handleTranslationBridgeStateChange);
        }
    }

    function unsubscribeBridge() {
        if (runtime.unsubscribeBridge === null) return;
        runtime.unsubscribeBridge();
        runtime.unsubscribeBridge = null;
    }

    function start() {
        subscribeBridge();
        runtime.observer = new MutationObserver(handleMutations);
        runtime.observer.observe(document.body, { childList: true, subtree: true });
    }

    function stop() {
        if (runtime.observer) {
            runtime.observer.disconnect();
            runtime.observer = null;
        }
        clearPendingRoots();
        unsubscribeBridge();
    }

    function pause() {
        clearPendingRoots();
        if (runtime.observer) runtime.observer.disconnect();
        unsubscribeBridge();
    }

    function resume() {
        if (runtime.observer && document.body) {
            subscribeBridge();
            runtime.observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    return {
        clearPendingRoots,
        dispose: stop,
        pause,
        resume,
        start,
        stop,
    };
}
