import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('userscript metadata grants cross-origin requests and build output contains no test API keys', async () => {
    const [header, bundle] = await Promise.all([
        readFile(new URL('../src/header.txt', import.meta.url), 'utf8'),
        readFile(new URL('../dist/main.user.js', import.meta.url), 'utf8'),
    ]);
    assert.match(header, /@grant\s+GM_xmlhttpRequest/);
    assert.match(header, /@connect\s+\*/);
    assert.doesNotMatch(bundle, /sk-test-secret|Bearer test-key|test-api-key/i);
});
