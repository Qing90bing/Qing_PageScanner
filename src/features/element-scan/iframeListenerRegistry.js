/**
 * 跟踪同源 iframe 的待加载监听器、已监听文档及其 frame 映射。
 * 文档映射在临时解绑期间保留，供元素调整工具栏继续计算页面偏移。
 * @param {object} options
 * @param {() => boolean} options.canAttach
 * @param {(document: Document) => void} options.onAttach
 * @param {(document: Document) => void} options.onDetach
 */
export function createIframeListenerRegistry({ canAttach, onAttach, onDetach }) {
    const pendingLoadHandlers = new Map();
    const attachedDocuments = new Set();
    let frameByDocument = new WeakMap();
    let documentByFrame = new WeakMap();

    function readDocument(iframe) {
        return iframe.contentDocument || iframe.contentWindow?.document || null;
    }

    function attachDocument(iframe, document) {
        if (!canAttach() || !document) return false;

        const previousDocument = documentByFrame.get(iframe);
        if (previousDocument && previousDocument !== document) {
            detachDocument(previousDocument);
            frameByDocument.delete(previousDocument);
        }

        frameByDocument.set(document, iframe);
        documentByFrame.set(iframe, document);
        if (attachedDocuments.has(document)) return true;

        onAttach(document);
        attachedDocuments.add(document);
        return true;
    }

    function detachDocument(document) {
        if (!document || !attachedDocuments.has(document)) return false;

        try {
            onDetach(document);
        } finally {
            attachedDocuments.delete(document);
        }
        return true;
    }

    function removePendingLoadHandler(iframe) {
        const handleLoad = pendingLoadHandlers.get(iframe);
        if (!handleLoad) return false;

        try {
            iframe.removeEventListener('load', handleLoad);
        } catch (_error) {
            // iframe 可能已卸载，注册表仍需忘记这个回调。
        }
        pendingLoadHandlers.delete(iframe);
        return true;
    }

    function watch(iframe) {
        if (!iframe || !canAttach() || pendingLoadHandlers.has(iframe)) return false;

        try {
            const document = readDocument(iframe);
            if (document?.readyState === 'complete') {
                return attachDocument(iframe, document);
            }

            const handleLoad = () => {
                pendingLoadHandlers.delete(iframe);
                if (!canAttach()) return;

                try {
                    attachDocument(iframe, readDocument(iframe));
                } catch (_error) {
                    // 跨域或已卸载的 iframe 无法访问，保持未绑定状态即可。
                }
            };

            pendingLoadHandlers.set(iframe, handleLoad);
            iframe.addEventListener('load', handleLoad, { once: true });
            return true;
        } catch (_error) {
            pendingLoadHandlers.delete(iframe);
            return false;
        }
    }

    function unwatch(iframe) {
        if (!iframe) return false;

        const removedPendingHandler = removePendingLoadHandler(iframe);
        const document = documentByFrame.get(iframe);
        const detachedDocument = detachDocument(document);
        if (document) {
            documentByFrame.delete(iframe);
            frameByDocument.delete(document);
        }

        return removedPendingHandler || detachedDocument || Boolean(document);
    }

    function detachAll() {
        Array.from(pendingLoadHandlers.keys()).forEach(removePendingLoadHandler);

        Array.from(attachedDocuments).forEach(detachDocument);
    }

    function reset() {
        detachAll();
        frameByDocument = new WeakMap();
        documentByFrame = new WeakMap();
    }

    function getFrameElement(document) {
        return frameByDocument.get(document) || null;
    }

    return Object.freeze({ watch, unwatch, detachAll, reset, getFrameElement });
}
