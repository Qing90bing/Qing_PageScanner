import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAiDisplayPairs, isHiddenOutputStatus } from '../src/features/ai-scan/resultView.js';

test('pending and review candidates stay visible while removed and legacy keep items are excluded', () => {
    const candidates = [
        { id: 'pending', sourceText: 'Open settings', status: 'pending' },
        { id: 'done', sourceText: 'Save', status: 'translated' },
        { id: 'legacyKeep', sourceText: '中文', status: 'keep' },
        { id: 'removed', sourceText: 'GitHub', status: 'removed' },
        { id: 'review', sourceText: 'Grounding', status: 'review' },
    ];
    const decisions = [
        { id: 'done', action: 'translate', translation: '保存' },
        { id: 'legacyKeep', action: 'keep', translation: '' },
        { id: 'removed', action: 'remove', translation: '' },
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

test('only hidden output statuses are exempt from user deletion sync', () => {
    assert.equal(isHiddenOutputStatus('removed'), true);
    assert.equal(isHiddenOutputStatus('keep'), true);
    assert.equal(isHiddenOutputStatus('translated'), false);
    assert.equal(isHiddenOutputStatus('pending'), false);
    assert.equal(isHiddenOutputStatus('review'), false);
    assert.equal(isHiddenOutputStatus('failed'), false);
});
