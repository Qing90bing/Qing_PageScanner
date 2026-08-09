import test from 'node:test';
import assert from 'node:assert/strict';
import { AI_CANDIDATE_STATUS } from '../src/shared/services/ai/contracts.js';
import { applyAiSummaryEditsToState, removeAiSummaryCandidate } from '../src/features/ai-scan/summaryState.js';

function createState() {
    const candidate = {
        id: 'candidate-old',
        sourceText: '旧文本',
        fingerprint: 'fingerprint-old',
        status: AI_CANDIDATE_STATUS.PENDING,
    };
    return {
        candidates: new Map([[candidate.id, candidate]]),
        candidateFingerprints: new Set([candidate.fingerprint]),
        decisions: new Map(),
        regexRules: new Map(),
        cache: new Map([[candidate.fingerprint, { fingerprint: candidate.fingerprint }]]),
        userRemovedFingerprints: new Set(),
        siteKey: 'https://example.com',
        targetLanguage: 'zh-CN',
    };
}

test('AI summary state edits reconcile removed and manually added candidates', () => {
    const state = createState();
    const result = applyAiSummaryEditsToState(state, { remainingSourceTexts: ['新文本'] });

    assert.equal(result.changed, true);
    assert.equal(state.candidates.has('candidate-old'), false);
    assert.equal(state.candidates.size, 1);
    assert.equal(Array.from(state.candidates.values())[0].sourceText, '新文本');
    assert.equal(state.cache.size, 0);
});

test('AI summary candidate removal records the fingerprint as intentionally removed', () => {
    const state = createState();
    const result = removeAiSummaryCandidate(state, 'candidate-old');

    assert.deepEqual(result, { changed: true, cacheChanged: true });
    assert.equal(state.userRemovedFingerprints.has('fingerprint-old'), true);
    assert.equal(state.candidateFingerprints.has('fingerprint-old'), false);
});
