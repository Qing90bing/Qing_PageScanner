import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAiDisplayPairs } from '../src/features/ai-scan/resultView.js';

test('pending AI candidates are visible before submission and translated values appear in place', () => {
    const candidates = [
        { id: 'pending', sourceText: 'Open settings', status: 'pending' },
        { id: 'done', sourceText: 'Save', status: 'translated' },
        { id: 'keep', sourceText: '中文', status: 'keep' },
        { id: 'review', sourceText: 'Grounding', status: 'review' },
    ];
    const decisions = [
        { id: 'done', action: 'translate', translation: '保存' },
        { id: 'keep', action: 'keep', translation: '' },
        { id: 'review', action: 'review', translation: '接地' },
    ];

    assert.deepEqual(buildAiDisplayPairs(candidates, decisions), [
        { sourceText: 'Open settings', translation: '' },
        { sourceText: 'Save', translation: '保存' },
        { sourceText: 'Grounding', translation: '' },
    ]);
});

test('blank persisted candidates never enter the AI summary', () => {
    assert.deepEqual(
        buildAiDisplayPairs(
            [
                { id: 'blank', sourceText: ' \u200B ', status: 'pending' },
                { id: 'valid', sourceText: 'Visible', status: 'pending' },
            ],
            []
        ),
        [{ sourceText: 'Visible', translation: '' }]
    );
});
