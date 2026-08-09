import test from 'node:test';
import assert from 'node:assert/strict';
import {
    AI_DEFAULT_SETTINGS,
    AI_PROCESSING_MODES,
    AI_SETTINGS_VERSION,
    createCandidateFingerprint,
    mergeAiSettings,
} from '../src/shared/services/ai/contracts.js';
import { checkBudget, selectBatch } from '../src/shared/services/ai/budgetGuard.js';
import { buildTranslationRequest } from '../src/shared/services/ai/promptBuilder.js';
import {
    createChatCompletionRequest,
    testProviderProcessing,
    validateProviderUrl,
} from '../src/shared/services/ai/providerClient.js';
import { extractPlaceholders, validateTranslationResponse } from '../src/shared/services/ai/responseValidator.js';
import { formatTextsForTranslation } from '../src/shared/utils/text/formatting.js';

const provider = {
    id: 'test',
    name: 'Test',
    apiUrl: 'https://api.example.com/v1/chat/completions',
    model: 'example-model',
    protocol: 'openai-chat-completions',
    responseMode: 'json-mode',
};

function candidate(id, sourceText) {
    return {
        id,
        sourceText,
        context: {
            tagName: 'button',
            role: 'button',
            pageTitle: 'Example',
            placeholders: [],
        },
    };
}

test('settings allow only Simplified or Traditional Chinese targets and preserve manual/auto modes', () => {
    assert.equal(mergeAiSettings({}).enabled, true);
    assert.equal(mergeAiSettings({ enabled: false }).enabled, false);
    assert.equal(mergeAiSettings({ targetLanguage: 'ru' }).targetLanguage, 'zh-CN');
    assert.equal(mergeAiSettings({ targetLanguage: 'zh-TW' }).targetLanguage, 'zh-TW');
    assert.equal(mergeAiSettings({ processingMode: AI_PROCESSING_MODES.AUTO }).processingMode, 'auto');
    assert.equal(mergeAiSettings({ processingMode: 'invalid' }).processingMode, 'manual');
    assert.equal(mergeAiSettings({}).includeRegexRuleComments, false);
    assert.equal(mergeAiSettings({ includeRegexRuleComments: true }).includeRegexRuleComments, true);
    assert.deepEqual(mergeAiSettings({}).batch, AI_DEFAULT_SETTINGS.batch);
    assert.equal(AI_DEFAULT_SETTINGS.batch.maxItems, 200);
    assert.equal(AI_DEFAULT_SETTINGS.batch.maxCharacters, 60000);
    assert.equal(AI_DEFAULT_SETTINGS.batch.maxEstimatedOutputTokens, 32768);
    const migrated = mergeAiSettings({ version: 1, batch: { maxItems: 20, maxCharacters: 6000 } });
    assert.equal(migrated.version, AI_SETTINGS_VERSION);
    assert.equal(migrated.batch.maxItems, 200);
    assert.equal(migrated.batch.maxCharacters, 60000);
    assert.equal(migrated.batch.maxEstimatedOutputTokens, 32768);
    const migratedDefaults = mergeAiSettings({ version: 2, batch: { maxItems: 100, maxCharacters: 30000 } });
    assert.equal(migratedDefaults.batch.maxItems, 200);
    assert.equal(migratedDefaults.batch.maxCharacters, 60000);
    const migratedOutputBudget = mergeAiSettings({
        version: 3,
        batch: { maxItems: 200, maxCharacters: 60000, maxEstimatedOutputTokens: 15360 },
    });
    assert.equal(migratedOutputBudget.batch.maxEstimatedOutputTokens, 32768);
    const retained = mergeAiSettings({
        version: AI_SETTINGS_VERSION,
        batch: { maxItems: 20, maxCharacters: 6000 },
    });
    assert.equal(retained.batch.maxItems, 20);
    assert.equal(retained.batch.maxCharacters, 6000);
});

test('fingerprints deduplicate repeated mutations but remain target and site specific', () => {
    const first = createCandidateFingerprint('https://example.com', 'zh-CN', ' Hello   world ');
    const repeated = createCandidateFingerprint('https://example.com', 'zh-CN', 'Hello world');
    assert.equal(first, repeated);
    assert.notEqual(first, createCandidateFingerprint('https://example.com', 'zh-TW', 'Hello world'));
    assert.notEqual(first, createCandidateFingerprint('https://other.example', 'zh-CN', 'Hello world'));
});

test('prompt accepts multiple source languages, sends limited semantics, and omits the page URL and HTML', () => {
    const request = buildTranslationRequest({
        provider,
        targetLanguage: 'zh-TW',
        styleProfile: { tone: '正式', glossary: 'Cloud=雲端', punctuation: '全形', instructions: '保持簡潔' },
        candidates: [candidate('ru', 'Привет'), candidate('ja', 'こんにちは'), candidate('en', 'Hello')],
    });
    const serialized = JSON.stringify(request);
    assert.match(serialized, /Traditional Chinese/);
    assert.match(serialized, /Привет/);
    assert.doesNotMatch(serialized, /https:\/\/example\.com/);
    assert.doesNotMatch(serialized, /<html/i);
    assert.deepEqual(request.response_format, { type: 'json_object' });
});

test('prompt includes a compact page profile and structured item context when provided', () => {
    const request = buildTranslationRequest({
        provider,
        targetLanguage: 'zh-CN',
        styleProfile: null,
        pageContext: {
            url: 'https://example.com/settings/profile',
            siteName: 'Example',
            title: 'Profile settings',
            langHint: 'de',
            description: 'Manage your account',
            type: 'settings',
            navigation: ['Home', 'Account'],
            targetLanguage: 'zh-CN',
        },
        candidates: [
            {
                ...candidate('save', 'Save changes'),
                context: {
                    tagName: 'button',
                    role: 'button',
                    domPath: 'main > form > footer > button.btn-primary',
                    label: 'Profile actions',
                    precedingText: 'Account name',
                    followingText: 'Cancel',
                    headingChain: 'Settings / Profile',
                    listIndex: 2,
                    placeholders: [],
                    secretField: 'should-not-leak',
                },
            },
        ],
    });
    const serialized = JSON.stringify(request);
    const user = JSON.parse(request.messages[1].content);
    assert.equal(user.sourceLanguageHint, 'auto');
    assert.equal(user.page.langHint, 'de');
    assert.match(serialized, /https:\/\/example\.com\/settings\/profile/);
    assert.match(serialized, /main > form > footer > button\.btn-primary/);
    assert.match(serialized, /precedingText/);
    assert.match(serialized, /headingChain/);
    assert.equal(user.items[0].context.listIndex, 2);
    assert.ok(!('secretField' in user.items[0].context));
});

test('prompt instructs only translate, remove, and review categories', () => {
    const request = buildTranslationRequest({
        provider,
        targetLanguage: 'zh-CN',
        styleProfile: null,
        candidates: [candidate('en', 'Hello')],
    });
    const system = request.messages[0].content;
    assert.match(system, /Classify every item as translate, remove, or review/);
    assert.doesNotMatch(system, /translate, keep, remove/);
    assert.doesNotMatch(JSON.stringify(request), /translate\|keep\|remove\|review/);
});

test('prompt identifies repeated dynamic-value shapes as regex candidates', () => {
    const request = buildTranslationRequest({
        provider,
        targetLanguage: 'zh-CN',
        styleProfile: null,
        candidates: [
            candidate('audio-a', 'Audio • Input: $3.50 / Output: $21.00'),
            candidate('audio-b', 'Audio • Input: $0.50 / Output: $1.50'),
            candidate('plain', 'Save settings'),
        ],
    });
    const system = request.messages[0].content;
    const user = JSON.parse(request.messages[1].content);

    assert.match(system, /inspect regexCandidateGroups/);
    assert.match(system, /Different dynamic values are not a reason to remove/);
    assert.deepEqual(user.regexCandidateGroups, [
        {
            id: 'regex-candidate-1',
            sourceIds: ['audio-a', 'audio-b'],
            sharedShape: 'audio • input: <value> / output: <value>',
        },
    ]);
});

test('prompt offers a strict single dynamic sentence for future-proof regex translation', () => {
    const request = buildTranslationRequest({
        provider,
        targetLanguage: 'zh-CN',
        styleProfile: null,
        candidates: [candidate('pricing', 'Text, image and video • Input: $0.25 / Output: $1.50')],
    });
    const system = request.messages[0].content;
    const user = JSON.parse(request.messages[1].content);

    assert.match(system, /one-item regexCandidateGroup/);
    assert.match(system, /anchored with \^ and \$/);
    assert.deepEqual(user.regexCandidateGroups, [
        {
            id: 'regex-candidate-1',
            sourceIds: ['pricing'],
            sharedShape: 'text, image and video • input: <value> / output: <value>',
        },
    ]);
});

test('legacy keep responses are normalized to remove and never enter the library', () => {
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: 'brand',
                    action: 'keep',
                    translation: '',
                    confidence: 0.99,
                    category: 'proper-noun',
                    reason: '',
                },
            ],
        },
        [candidate('brand', 'GitHub')],
        0.85
    );
    assert.equal(result.decisions[0].action, 'remove');
    assert.equal(result.decisions[0].status, 'removed');
});

test('unchanged AI translations are removed instead of entering the text library', () => {
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: 'imagen',
                    action: 'translate',
                    translationType: 'text',
                    translation: '  Imagen   4 Ultra  ',
                    confidence: 0.99,
                },
            ],
        },
        [candidate('imagen', 'Imagen 4 Ultra')],
        0.85
    );

    assert.equal(result.decisions[0].action, 'remove');
    assert.equal(result.decisions[0].status, 'removed');
    assert.equal(result.decisions[0].translation, '');
    assert.equal(result.regexRules.length, 0);
});

test('large translation batches reserve more response tokens without exceeding the configured cap', () => {
    const request = buildTranslationRequest({
        provider,
        targetLanguage: 'zh-CN',
        styleProfile: null,
        candidates: Array.from({ length: 100 }, (_, index) => candidate(`item-${index}`, 'x'.repeat(300))),
    });

    assert.equal(request.max_tokens, 40144);
});

test('DeepSeek translation requests disable thinking so JSON output keeps the response budget', () => {
    const request = buildTranslationRequest({
        provider: { ...provider, model: 'deepseek-v4-flash' },
        targetLanguage: 'zh-CN',
        styleProfile: null,
        candidates: [candidate('save', 'Save settings')],
    });

    assert.deepEqual(request.thinking, { type: 'disabled' });
    assert.ok(request.max_tokens >= 1024);
});

test('translation request rejects empty or invisible candidate batches before transport', () => {
    assert.throws(
        () =>
            buildTranslationRequest({
                provider,
                targetLanguage: 'zh-CN',
                styleProfile: null,
                candidates: [candidate('blank', ' \u200B\uFEFF ')],
            }),
        /empty-candidate-batch/
    );
});

test('response validation supports multilingual sources and routes low confidence or bad placeholders to review', () => {
    const candidates = [candidate('ru', 'Привет'), candidate('ja', 'こんにちは {0}'), candidate('en', 'Hello')];
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: 'ru',
                    action: 'translate',
                    translation: '你好',
                    confidence: 0.99,
                    category: 'content',
                    reason: '',
                },
                {
                    id: 'ja',
                    action: 'translate',
                    translation: '你好',
                    confidence: 0.99,
                    category: 'content',
                    reason: '',
                },
                {
                    id: 'en',
                    action: 'translate',
                    translation: '你好',
                    confidence: 0.5,
                    category: 'content',
                    reason: '',
                },
            ],
        },
        candidates,
        0.85
    );
    assert.equal(result.decisions[0].status, 'translated');
    assert.equal(result.decisions[1].reason, 'placeholder-mismatch');
    assert.equal(result.decisions[2].reason, 'low-confidence');
});

test('placeholder protection covers named, positional, percent, route, and URL tokens', () => {
    assert.deepEqual(
        extractPlaceholders('Open {name} with %1$s, %user%, :route and https://example.com/docs?q=1'),
        [':route', '%1$s', '%user%', 'https://example.com/docs?q=1', '{name}'].sort()
    );
});

test('batch and budget guards enforce item, character, request, and daily token limits', () => {
    const selected = selectBatch([candidate('a', '1234'), candidate('b', '5678'), candidate('c', 'x'.repeat(20))], {
        maxItems: 2,
        maxCharacters: 10,
    });
    assert.equal(selected.candidates.length, 2);
    assert.equal(selected.oversized.length, 0);
    assert.equal(selected.invalid.length, 0);

    const oversized = selectBatch([candidate('large', 'x'.repeat(20)), candidate('small', 'ok')], {
        maxItems: 20,
        maxCharacters: 10,
    });
    assert.deepEqual(
        oversized.candidates.map((item) => item.id),
        ['small']
    );
    assert.deepEqual(
        oversized.oversized.map((item) => item.id),
        ['large']
    );

    const guarded = selectBatch(
        [
            candidate('blank', ' \u200B '),
            ...Array.from({ length: 300 }, (_, index) => candidate(`item-${index}`, 'x'.repeat(100))),
        ],
        {
            maxItems: 300,
            maxCharacters: 60000,
            maxEstimatedOutputTokens: 32768,
        }
    );
    assert.deepEqual(
        guarded.invalid.map((item) => item.id),
        ['blank']
    );
    assert.ok(guarded.candidates.length < 300);
    assert.ok(guarded.estimatedOutputTokens <= 32768);

    const settings = { maxRequestsPerSession: 1, maxCharactersPerSession: 50, maxEstimatedTokensPerDay: 1000 };
    assert.equal(
        checkBudget({
            settings,
            sessionUsage: { requests: 1, characters: 0 },
            dailyUsage: { tokens: 0 },
            requestPayload: {},
        }).reason,
        'session-requests'
    );
    assert.equal(
        checkBudget({
            settings,
            sessionUsage: { requests: 0, characters: 49 },
            dailyUsage: { tokens: 0 },
            requestPayload: {},
            nextCharacters: 2,
        }).reason,
        'session-characters'
    );
});

test('all output formats contain real translations and can be switched without new data', () => {
    const pairs = [
        { sourceText: 'Hello', translation: '你好' },
        { sourceText: 'Save', translation: '保存' },
    ];
    assert.deepEqual(JSON.parse(formatTextsForTranslation(pairs, 'array')), [
        ['Hello', '你好'],
        ['Save', '保存'],
    ]);
    assert.deepEqual(JSON.parse(formatTextsForTranslation(pairs, 'object')), { Hello: '你好', Save: '保存' });
    assert.equal(formatTextsForTranslation(pairs, 'csv'), '"Hello","你好"\n"Save","保存"');
});

test('existing static, dynamic, and element scan string output remains backward compatible', () => {
    assert.deepEqual(JSON.parse(formatTextsForTranslation(['Hello'], 'array')), [['Hello', '']]);
    assert.deepEqual(JSON.parse(formatTextsForTranslation(['Hello'], 'object')), { Hello: '' });
    assert.equal(formatTextsForTranslation(['Hello'], 'csv'), '"Hello",""');
});

test('provider URL validation rejects unsafe or incomplete endpoints', () => {
    assert.match(validateProviderUrl(provider.apiUrl), /^https:/);
    assert.throws(() => validateProviderUrl('http://api.example.com/chat/completions'), { code: 'unsafe-url' });
    assert.throws(() => validateProviderUrl('https://api.example.com/v1'), { code: 'invalid-endpoint' });
});

test('provider requests expose cancellation and never retry automatically', async () => {
    let calls = 0;
    const request = createChatCompletionRequest({
        provider,
        apiKey: 'test-key',
        payload: { model: provider.model, messages: [] },
        transport(details) {
            calls += 1;
            return { abort: () => details.onabort() };
        },
    });
    request.abort();
    await assert.rejects(request.promise, { code: 'aborted' });
    assert.equal(calls, 1);
});

test('provider timeouts and authentication errors are normalized without retries', async () => {
    let timeoutCalls = 0;
    const timeoutRequest = createChatCompletionRequest({
        provider,
        apiKey: 'test-key',
        payload: { model: provider.model, messages: [] },
        transport(details) {
            timeoutCalls += 1;
            queueMicrotask(details.ontimeout);
            return { abort() {} };
        },
    });
    await assert.rejects(timeoutRequest.promise, { code: 'timeout' });
    assert.equal(timeoutCalls, 1);

    const authenticationRequest = createChatCompletionRequest({
        provider,
        apiKey: 'test-key',
        payload: { model: provider.model, messages: [] },
        transport(details) {
            queueMicrotask(() => details.onload({ status: 401, responseText: '{}' }));
            return { abort() {} };
        },
    });
    await assert.rejects(authenticationRequest.promise, { code: 'authentication', status: 401 });
});

test('truncated provider responses fail once with a stable code instead of hanging or retrying', async () => {
    let calls = 0;
    const request = createChatCompletionRequest({
        provider,
        apiKey: 'test-key',
        payload: { model: provider.model, messages: [] },
        transport(details) {
            calls += 1;
            queueMicrotask(() =>
                details.onload({
                    status: 200,
                    responseText: JSON.stringify({
                        choices: [{ finish_reason: 'length', message: { content: '{"items":[' } }],
                    }),
                })
            );
            return { abort() {} };
        },
    });

    await assert.rejects(request.promise, { code: 'truncated-response' });
    assert.equal(calls, 1);
});

test('provider processing test validates classification, translation, JSON, and round-trip latency', async () => {
    let payload;
    const result = await testProviderProcessing({
        provider,
        apiKey: 'test-key',
        timeoutMs: 1000,
        transport(details) {
            payload = JSON.parse(details.data);
            queueMicrotask(() =>
                details.onload({
                    status: 200,
                    responseText: JSON.stringify({
                        choices: [
                            {
                                message: {
                                    content: JSON.stringify({
                                        items: [
                                            {
                                                id: 'provider-test',
                                                action: 'translate',
                                                translation: '保存设置',
                                                confidence: 0.99,
                                                category: 'ui',
                                                reason: '',
                                            },
                                        ],
                                    }),
                                },
                            },
                        ],
                    }),
                })
            );
            return { abort() {} };
        },
    });
    assert.equal(payload.messages.length, 2);
    assert.equal(payload.max_tokens, 1024);
    const testInput = JSON.parse(payload.messages[1].content);
    assert.deepEqual(
        testInput.items.map((item) => item.sourceText),
        ['Save settings']
    );
    assert.doesNotMatch(JSON.stringify(payload), /https:\/\/example\.com|<html/i);
    assert.equal(result.translation, '保存设置');
    assert.ok(result.latencyMs >= 0);
});
