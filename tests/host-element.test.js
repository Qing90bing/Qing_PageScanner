import test from 'node:test';
import assert from 'node:assert/strict';

import { TopLayerManager } from '../src/shared/ui/core/hostElement.js';

test('top-layer promotion keeps the host connected while reopening its popover', async () => {
    const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
    const calls = [];
    const container = {
        popover: 'manual',
        isConnected: true,
        offsetHeight: 0,
        hidePopover() {
            calls.push('hide');
        },
        showPopover() {
            calls.push('show');
        },
        get parentElement() {
            throw new Error('Top-layer promotion must not inspect or move the host node.');
        },
    };

    globalThis.requestAnimationFrame = (callback) => callback();
    try {
        const manager = new TopLayerManager(container);
        manager.rePromote();
        await new Promise((resolve) => setTimeout(resolve, 130));
    } finally {
        globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    }

    assert.deepEqual(calls, ['hide', 'show']);
});
