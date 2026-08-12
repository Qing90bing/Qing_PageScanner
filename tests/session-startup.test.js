import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareSessionStart } from '../src/features/session-scan/startup.js';

function createDeferred() {
    let resolve;
    let reject;
    const promise = new Promise((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });
    return { promise, resolve, reject };
}

test('cancelled session startup does not extract text after the translation bridge becomes idle', async () => {
    const idle = createDeferred();
    let isCurrent = true;
    let extractionCount = 0;

    const preparation = prepareSessionStart({
        waitForTranslationIdle: () => idle.promise,
        extractInitialTexts: () => {
            extractionCount += 1;
            return ['stale'];
        },
        readSettings: async () => ({ outputFormat: 'array' }),
        checkWorkerAllowed: async () => true,
        isCurrent: () => isCurrent,
    });

    isCurrent = false;
    idle.resolve();

    assert.equal(await preparation, null);
    assert.equal(extractionCount, 0);
});

test('cancelled session startup discards initialization that finishes after cancellation', async () => {
    const extraction = createDeferred();
    const extractionStarted = createDeferred();
    let isCurrent = true;

    const preparation = prepareSessionStart({
        waitForTranslationIdle: async () => {},
        extractInitialTexts: () => {
            extractionStarted.resolve();
            return extraction.promise;
        },
        readSettings: async () => ({ outputFormat: 'array' }),
        checkWorkerAllowed: async () => true,
        isCurrent: () => isCurrent,
    });

    await extractionStarted.promise;
    isCurrent = false;
    extraction.resolve(['stale']);

    assert.equal(await preparation, null);
});

test('current session startup returns all initialized dependencies', async () => {
    const settings = { outputFormat: 'object' };

    const result = await prepareSessionStart({
        waitForTranslationIdle: async () => {},
        extractInitialTexts: async () => ['ready'],
        readSettings: async () => settings,
        checkWorkerAllowed: async () => false,
        isCurrent: () => true,
    });

    assert.deepEqual(result, {
        initialTexts: ['ready'],
        settings,
        workerAllowed: false,
    });
});
