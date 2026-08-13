import test from 'node:test';
import assert from 'node:assert/strict';

const memory = new Map();
globalThis.GM_getValue = (key, fallback) => memory.get(key) ?? fallback;
globalThis.GM_setValue = (key, value) => memory.set(key, value);
globalThis.GM_deleteValue = (key) => memory.delete(key);

const storage = await import('../src/shared/services/ai/storage.js');
const styles = await import('../src/shared/services/ai/siteStyleStore.js');
const settingsDefaults = await import('../src/shared/services/settingsDefaults.js');

test.beforeEach(() => memory.clear());

test('settings loads a fresh default object for each caller', () => {
    const first = settingsDefaults.createDefaultSettings();
    first.language = 'zh-TW';
    first.filterRules.chinese = false;
    first.ai.batch.maxItems = 1;

    const second = settingsDefaults.createDefaultSettings();
    assert.equal(second.language, 'auto');
    assert.equal(second.filterRules.chinese, true);
    assert.notEqual(second.ai.batch.maxItems, 1);
});

test('API keys use independent versioned storage and are never part of exported settings', async () => {
    await storage.saveProviderApiKey('provider-a', 'sk-test-secret');
    assert.equal(await storage.loadProviderApiKey('provider-a'), 'sk-test-secret');
    assert.equal(await storage.loadProviderApiKey('provider-b'), '');
    const serializedStorage = Array.from(memory.keys()).join('\n');
    assert.doesNotMatch(serializedStorage, /sk-test-secret/);
});

test('site style manager handles multiple sites and chooses the longest matching path prefix', async () => {
    await styles.upsertStyleProfile({
        origin: 'https://example.com',
        pathPrefix: '/',
        targetLanguage: 'zh-CN',
        tone: '通用',
    });
    await styles.upsertStyleProfile({
        origin: 'https://example.com',
        pathPrefix: '/docs',
        targetLanguage: 'zh-CN',
        tone: '技术',
    });
    await styles.upsertStyleProfile({
        origin: 'https://other.example',
        pathPrefix: '/',
        targetLanguage: 'zh-TW',
        tone: '正式',
    });

    const matched = await styles.matchStyleProfile(
        { origin: 'https://example.com', pathname: '/docs/guide/start' },
        'zh-CN'
    );
    assert.equal(matched.tone, '技术');
    assert.equal((await styles.loadStyleProfiles()).length, 3);

    await styles.deleteStyleProfile(matched.id);
    assert.equal((await styles.loadStyleProfiles()).length, 2);
    await styles.clearStyleProfiles();
    assert.equal((await styles.loadStyleProfiles()).length, 0);
});
