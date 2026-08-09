import assert from 'node:assert/strict';
import test from 'node:test';
import { createManualSummaryCandidate, reconcileAiSummarySources } from '../src/features/ai-scan/summaryEdits.js';

test('manual summary entries become pending AI candidates instead of disappearing on submit', () => {
    const currentCandidates = [
        { id: 'existing', sourceText: 'Existing entry', status: 'pending' },
        { id: 'removed', sourceText: 'Re-added entry', status: 'removed' },
        { id: 'regex', sourceText: 'Created 2 days ago', status: 'translated' },
    ];

    const changes = reconcileAiSummarySources(
        ['Existing entry', 'Manual pasted entry', 'Re-added entry', 'Created 2 days ago'],
        currentCandidates,
        ['regex']
    );

    assert.deepEqual(changes, {
        addedSourceTexts: ['Manual pasted entry'],
        revivedCandidateIds: ['removed'],
        removedCandidateIds: [],
    });

    const candidate = createManualSummaryCandidate(changes.addedSourceTexts[0], {
        siteKey: 'https://example.com',
        targetLanguage: 'zh-CN',
    });
    assert.equal(candidate.sourceText, 'Manual pasted entry');
    assert.equal(candidate.status, 'pending');
    assert.equal(candidate.origin, 'summary-editor');
    assert.ok(candidate.fingerprint);
});

test('summary reconciliation still removes omitted entries and ignores malformed empty additions', () => {
    const changes = reconcileAiSummarySources(
        ['  Kept entry  ', ' \u200B '],
        [
            { id: 'kept', sourceText: 'Kept entry', status: 'pending' },
            { id: 'deleted', sourceText: 'Deleted entry', status: 'translated' },
            { id: 'hidden', sourceText: 'Hidden entry', status: 'removed' },
        ]
    );

    assert.deepEqual(changes, {
        addedSourceTexts: [],
        revivedCandidateIds: [],
        removedCandidateIds: ['deleted'],
    });
});
