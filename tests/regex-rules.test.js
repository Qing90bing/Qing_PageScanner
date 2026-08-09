import assert from 'node:assert/strict';
import test from 'node:test';
import { validateTranslationResponse } from '../src/shared/services/ai/responseValidator.js';
import {
    formatRegexRulesForTranslation,
    matchEditedRegexRulesToExisting,
    parseRegexRules,
    validateRegexRuleDefinition,
} from '../src/shared/utils/text/regexRules.js';

function candidate(id, sourceText) {
    return { id, sourceText };
}

test('AI response groups similar candidates into one validated regex rule', () => {
    const candidates = [
        candidate('created-a', 'Created 1 day ago'),
        candidate('created-b', 'Created 12 days ago'),
        candidate('hello', 'Hello'),
    ];
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: 'created-a',
                    action: 'translate',
                    translationType: 'regex',
                    regexRuleId: 'created-days',
                    translation: '',
                    confidence: 0.96,
                },
                {
                    id: 'created-b',
                    action: 'translate',
                    translationType: 'regex',
                    regexRuleId: 'created-days',
                    translation: '',
                    confidence: 0.97,
                },
                {
                    id: 'hello',
                    action: 'translate',
                    translationType: 'text',
                    translation: '你好',
                    confidence: 0.99,
                },
            ],
            regexRules: [
                {
                    id: 'created-days',
                    sourceIds: ['created-a', 'created-b'],
                    pattern: '^Created\\s+(\\d+)\\s+days?\\s+ago$',
                    flags: 'i',
                    replacement: '创建于 $1 天前',
                    confidence: 0.96,
                },
            ],
        },
        candidates,
        0.85
    );

    assert.equal(result.regexRules.length, 1);
    assert.deepEqual(result.regexRules[0].sourceIds, ['created-a', 'created-b']);
    assert.equal(result.decisions[0].translationType, 'regex');
    assert.equal(result.decisions[1].regexRuleId, 'created-days');
    assert.equal(result.decisions[2].translation, '你好');
});

test('regex action shorthand is normalized only when backed by a valid referenced rule', () => {
    const candidates = [
        candidate('audio-a', 'Audio • Input: $3.50 / Output: $21.00'),
        candidate('audio-b', 'Audio • Input: $0.50 / Output: $1.50'),
        candidate('invalid', 'Unrelated text'),
    ];
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: 'audio-a',
                    action: 'regex',
                    regexRuleId: 'audio-price',
                    translation: '',
                    confidence: 0.96,
                },
                {
                    id: 'audio-b',
                    action: 'regex',
                    regexRuleId: 'audio-price',
                    translation: '',
                    confidence: 0.96,
                },
                {
                    id: 'invalid',
                    action: 'regex',
                    translation: '',
                    confidence: 0.96,
                },
            ],
            regexRules: [
                {
                    id: 'audio-price',
                    sourceIds: ['audio-a', 'audio-b'],
                    pattern: '^Audio\\s*•\\s*Input:\\s*(\\$[\\d.]+)\\s*\\/\\s*Output:\\s*(\\$[\\d.]+)$',
                    flags: 'i',
                    replacement: '音频 • 输入：$1 / 输出：$2',
                    confidence: 0.96,
                },
            ],
        },
        candidates,
        0.85
    );

    assert.equal(result.regexRules.length, 1);
    assert.deepEqual(
        result.decisions.slice(0, 2).map(({ action, translationType, status }) => ({
            action,
            translationType,
            status,
        })),
        [
            { action: 'translate', translationType: 'regex', status: 'translated' },
            { action: 'translate', translationType: 'regex', status: 'translated' },
        ]
    );
    assert.equal(result.decisions[2].reason, 'invalid-action');
});

test('invalid regex response groups are sent to review and never returned as rules', () => {
    const candidates = [candidate('a', 'Created 1 day ago'), candidate('b', 'Created 2 days ago')];
    const result = validateTranslationResponse(
        {
            items: [
                { id: 'a', action: 'translate', translationType: 'regex', regexRuleId: 'bad', confidence: 0.99 },
                { id: 'b', action: 'translate', translationType: 'regex', regexRuleId: 'bad', confidence: 0.99 },
            ],
            regexRules: [
                {
                    id: 'bad',
                    sourceIds: ['a', 'a'],
                    pattern: '(',
                    flags: 'i',
                    replacement: '$1',
                    confidence: 0.99,
                },
            ],
        },
        candidates,
        0.85
    );

    assert.equal(result.regexRules.length, 0);
    assert.equal(result.decisions[0].status, 'review');
    assert.equal(result.decisions[1].status, 'review');
});

test('one dynamic sample accepts only anchored rules that preserve captured values', () => {
    const pricing = candidate('pricing', 'Text, image and video • Input: $0.25 / Output: $1.50');
    const item = {
        id: pricing.id,
        action: 'translate',
        translationType: 'regex',
        regexRuleId: 'pricing-rule',
        translation: '',
        confidence: 0.96,
    };
    const rule = {
        id: 'pricing-rule',
        sourceIds: [pricing.id],
        pattern: '^Text, image and video\\s*•\\s*Input:\\s*(\\$[\\d.]+)\\s*\\/\\s*Output:\\s*(\\$[\\d.]+)$',
        flags: 'i',
        replacement: '文本、图像和视频 • 输入：$1 / 输出：$2',
        confidence: 0.96,
    };

    const accepted = validateTranslationResponse({ items: [item], regexRules: [rule] }, [pricing], 0.85);
    assert.equal(accepted.regexRules.length, 1);
    assert.equal(accepted.decisions[0].status, 'translated');

    for (const [change, reason] of [
        [{ pattern: rule.pattern.slice(1) }, 'unanchored-single-sample-regex'],
        [{ replacement: '文本、图像和视频价格' }, 'missing-single-sample-capture'],
    ]) {
        const rejected = validateTranslationResponse(
            { items: [item], regexRules: [{ ...rule, ...change }] },
            [pricing],
            0.85
        );
        assert.equal(rejected.regexRules.length, 0);
        assert.equal(rejected.decisions[0].reason, reason);
    }

    const staticCandidate = candidate('static', 'Save settings');
    const staticRejected = validateTranslationResponse(
        {
            items: [{ ...item, id: 'static', regexRuleId: 'static-rule' }],
            regexRules: [
                {
                    ...rule,
                    id: 'static-rule',
                    sourceIds: ['static'],
                    pattern: '^(Save) settings$',
                    replacement: '$1 设置',
                },
            ],
        },
        [staticCandidate],
        0.85
    );
    assert.equal(staticRejected.decisions[0].reason, 'invalid-single-sample-regex');
});

test('a safe dynamic text translation is locally promoted to a future-proof regex rule', () => {
    const pricing = candidate('pricing', 'Text, image and video • Input: $0.25 / Output: $1.50');
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: pricing.id,
                    action: 'translate',
                    translationType: 'text',
                    translation: '文本、图像和视频 • 输入：$0.25 / 输出：$1.50',
                    confidence: 0.96,
                },
            ],
        },
        [pricing],
        0.85
    );

    assert.equal(result.regexRules.length, 1);
    assert.equal(result.regexRules[0].sourceIds[0], pricing.id);
    assert.equal(result.decisions[0].translationType, 'regex');
    assert.equal(result.decisions[0].translation, '');
    const rule = result.regexRules[0];
    assert.equal(
        'Text, image and video • Input: $0.40 / Output: $2.00'.replace(
            new RegExp(rule.pattern, rule.flags),
            rule.replacement
        ),
        '文本、图像和视频 • 输入：$0.40 / 输出：$2.00'
    );

    const unchangedModel = candidate('model', 'Gemini 3.6 Flash');
    const unchanged = validateTranslationResponse(
        {
            items: [
                {
                    id: unchangedModel.id,
                    action: 'translate',
                    translation: unchangedModel.sourceText,
                    confidence: 0.96,
                },
            ],
        },
        [unchangedModel],
        0.85
    );
    assert.equal(unchanged.regexRules.length, 0);
    assert.equal(unchanged.decisions[0].translationType, 'text');
});

test('locally promoted text translations with the same dynamic shape share one rule', () => {
    const candidates = [
        candidate('audio-a', 'Audio • Input: $3.50 / Output: $21.00'),
        candidate('audio-b', 'Audio • Input: $0.50 / Output: $1.50'),
    ];
    const result = validateTranslationResponse(
        {
            items: [
                {
                    id: 'audio-a',
                    action: 'translate',
                    translation: '音频 • 输入：$3.50 / 输出：$21.00',
                    confidence: 0.97,
                },
                {
                    id: 'audio-b',
                    action: 'translate',
                    translation: '音频 • 输入：$0.50 / 输出：$1.50',
                    confidence: 0.96,
                },
            ],
        },
        candidates,
        0.85
    );

    assert.equal(result.regexRules.length, 1);
    assert.deepEqual(result.regexRules[0].sourceIds, ['audio-a', 'audio-b']);
    assert.equal(result.regexRules[0].confidence, 0.96);
    assert.equal(result.decisions[0].regexRuleId, result.decisions[1].regexRuleId);
});

test('low-confidence and overlapping regex rules are rejected as whole groups', () => {
    const candidates = [candidate('a', 'Item 1'), candidate('b', 'Item 2'), candidate('c', 'Item 3')];
    const response = (rules) => ({
        items: candidates.map((item) => ({
            id: item.id,
            action: 'translate',
            translationType: 'regex',
            regexRuleId: rules.find((rule) => rule.sourceIds.includes(item.id))?.id || 'missing',
            confidence: 0.99,
        })),
        regexRules: rules,
    });

    const lowConfidence = validateTranslationResponse(
        response([
            {
                id: 'low',
                sourceIds: ['a', 'b'],
                pattern: '^Item (\\d+)$',
                flags: 'i',
                replacement: '项目 $1',
                confidence: 0.5,
            },
        ]),
        candidates,
        0.85
    );
    assert.equal(lowConfidence.regexRules.length, 0);
    assert.deepEqual(
        lowConfidence.decisions.map((decision) => decision.status),
        ['review', 'review', 'review']
    );

    const overlapping = validateTranslationResponse(
        response([
            {
                id: 'first',
                sourceIds: ['a', 'b'],
                pattern: '^Item (\\d+)$',
                flags: 'i',
                replacement: '项目 $1',
                confidence: 0.99,
            },
            {
                id: 'second',
                sourceIds: ['b', 'c'],
                pattern: '^Item (\\d+)$',
                flags: 'i',
                replacement: '项目 $1',
                confidence: 0.99,
            },
        ]),
        candidates,
        0.85
    );
    assert.equal(overlapping.regexRules.length, 0);
    assert.deepEqual(
        overlapping.decisions.map((decision) => decision.status),
        ['review', 'review', 'review']
    );
});

test('regex formatter and restricted parser preserve escapes, flags, quotes, newlines, and $1', () => {
    const rule = {
        id: 'rule-escape',
        sourceIds: ['a', 'b'],
        pattern: '^File\\/(.+?)\\s+(\\d+)$',
        flags: 'im',
        replacement: '说"$1"\n第 $2 行',
    };
    const output = formatRegexRulesForTranslation([rule], { includeRuleComments: true });
    const parsed = parseRegexRules(output);

    assert.equal(parsed.valid, true);
    assert.deepEqual(parsed.rules[0], {
        id: 'rule-escape',
        sourceIds: [],
        pattern: rule.pattern,
        flags: rule.flags,
        replacement: rule.replacement,
        origin: 'user-edited',
    });
});

test('regex formatter hides rule ID comments by default and can opt in', () => {
    const rules = [
        {
            id: 'rule-9',
            pattern: '^Price: (\\$[\\d.]+)$',
            flags: 'i',
            replacement: '价格：$1',
        },
        {
            id: 'rule-10',
            pattern: '^Image: (\\$[\\d.]+)$',
            flags: 'i',
            replacement: '图像：$1',
        },
    ];

    const withoutComments = formatRegexRulesForTranslation(rules);
    const withComments = formatRegexRulesForTranslation(rules, { includeRuleComments: true });
    assert.doesNotMatch(withoutComments, /qps-rule:/);
    assert.match(withComments, /qps-rule:rule-9/);
    assert.doesNotMatch(withoutComments, /,,/);
    assert.doesNotMatch(withComments, /,,/);
    assert.equal(parseRegexRules(withoutComments).valid, true);
    assert.equal(parseRegexRules(withComments).valid, true);
});

test('markerless regex edits retain stable rule identity when unambiguous', () => {
    const existing = [
        { id: 'first', pattern: '^First (\\d+)$', flags: 'i', replacement: '第一 $1' },
        { id: 'second', pattern: '^Second (\\d+)$', flags: 'i', replacement: '第二 $1' },
    ];
    const deleted = matchEditedRegexRulesToExisting(
        [{ id: null, pattern: existing[1].pattern, flags: existing[1].flags, replacement: existing[1].replacement }],
        existing
    );
    assert.equal(deleted.valid, true);
    assert.equal(deleted.matches[0].id, 'second');

    const modified = matchEditedRegexRulesToExisting(
        [
            { id: null, pattern: existing[0].pattern, flags: 'im', replacement: existing[0].replacement },
            { id: null, pattern: existing[1].pattern, flags: existing[1].flags, replacement: existing[1].replacement },
        ],
        existing
    );
    assert.equal(modified.valid, true);
    assert.equal(modified.matches[0].id, 'first');

    const ambiguous = matchEditedRegexRulesToExisting(
        existing.map((rule) => ({ ...rule, id: null, replacement: `${rule.replacement}!` })),
        existing
    );
    assert.equal(ambiguous.valid, false);
    assert.equal(ambiguous.error, 'ambiguous-regex-edit');
});

test('regex definition validation rejects invalid flags, capture references, and unsafe shapes', () => {
    const base = {
        id: 'rule',
        sourceIds: ['a', 'b'],
        pattern: '^Item (\\d+)$',
        flags: 'i',
        replacement: '$1',
    };
    assert.equal(validateRegexRuleDefinition(base, { sourceTexts: ['Item 1', 'Item 2'] }).valid, true);
    assert.equal(validateRegexRuleDefinition({ ...base, flags: 'ii' }).valid, false);
    assert.equal(validateRegexRuleDefinition({ ...base, replacement: '$2' }).valid, false);
    assert.equal(validateRegexRuleDefinition({ ...base, pattern: '(a+)+$' }).valid, false);
    assert.equal(
        validateRegexRuleDefinition({ ...base, pattern: '^Other$' }, { sourceTexts: ['Item 1', 'Item 2'] }).valid,
        false
    );
});

test('restricted parser rejects arbitrary JavaScript without changing parsed state', () => {
    const parsed = parseRegexRules('regexRules: [[/ok/i, "yes"], console.log("unsafe")]');
    assert.equal(parsed.valid, false);
    assert.deepEqual(parsed.rules, []);
    assert.equal(parseRegexRules('regexRules: [[/ok/ii, "yes"]]').valid, false);
});
