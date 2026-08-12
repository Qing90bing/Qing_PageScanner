import test from 'node:test';
import assert from 'node:assert/strict';
import { createIframeListenerRegistry } from '../src/features/element-scan/iframeListenerRegistry.js';

class FakeIframe {
    constructor(document) {
        this.contentDocument = document;
        this.contentWindow = { document };
        this.listeners = new Map();
        this.removedListeners = [];
    }

    addEventListener(type, listener, options) {
        this.listeners.set(type, { listener, options });
    }

    removeEventListener(type, listener) {
        this.removedListeners.push({ type, listener });
        if (this.listeners.get(type)?.listener === listener) {
            this.listeners.delete(type);
        }
    }

    dispatchLoad() {
        const registration = this.listeners.get('load');
        if (!registration) return;
        if (registration.options?.once) this.listeners.delete('load');
        registration.listener();
    }
}

test('detaching iframe listeners removes the exact pending load handler', () => {
    const iframe = new FakeIframe({ readyState: 'loading' });
    const attached = [];
    const registry = createIframeListenerRegistry({
        canAttach: () => true,
        onAttach: (document) => attached.push(document),
        onDetach: () => {},
    });

    registry.watch(iframe);
    const pendingHandler = iframe.listeners.get('load').listener;
    registry.detachAll();

    assert.deepEqual(iframe.removedListeners, [{ type: 'load', listener: pendingHandler }]);
    iframe.dispatchLoad();
    assert.deepEqual(attached, []);
});

test('iframe documents can be detached and reattached without losing their frame mapping', () => {
    const document = { readyState: 'complete' };
    const iframe = new FakeIframe(document);
    const attached = [];
    const detached = [];
    const registry = createIframeListenerRegistry({
        canAttach: () => true,
        onAttach: (target) => attached.push(target),
        onDetach: (target) => detached.push(target),
    });

    registry.watch(iframe);
    registry.watch(iframe);
    assert.deepEqual(attached, [document]);
    assert.equal(registry.getFrameElement(document), iframe);

    registry.detachAll();
    assert.deepEqual(detached, [document]);
    assert.equal(registry.getFrameElement(document), iframe);

    registry.watch(iframe);
    assert.deepEqual(attached, [document, document]);

    registry.reset();
    assert.deepEqual(detached, [document, document]);
    assert.equal(registry.getFrameElement(document), null);
});

test('a queued iframe load cannot attach after the scan becomes inactive', () => {
    const iframe = new FakeIframe({ readyState: 'loading' });
    const attached = [];
    let active = true;
    const registry = createIframeListenerRegistry({
        canAttach: () => active,
        onAttach: (document) => attached.push(document),
        onDetach: () => {},
    });

    registry.watch(iframe);
    active = false;
    iframe.contentDocument.readyState = 'complete';
    iframe.dispatchLoad();

    assert.deepEqual(attached, []);
});

test('removing an iframe detaches its document and forgets the frame mapping', () => {
    const document = { readyState: 'complete' };
    const iframe = new FakeIframe(document);
    const detached = [];
    const registry = createIframeListenerRegistry({
        canAttach: () => true,
        onAttach: () => {},
        onDetach: (target) => detached.push(target),
    });

    registry.watch(iframe);

    assert.equal(registry.unwatch(iframe), true);
    assert.deepEqual(detached, [document]);
    assert.equal(registry.getFrameElement(document), null);
    assert.equal(registry.unwatch(iframe), false);
});
