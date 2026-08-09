import test from 'node:test';
import assert from 'node:assert/strict';
import { AI_ACTIONS, AI_CANDIDATE_STATUS, AI_TRANSLATION_TYPES } from '../src/shared/services/ai/contracts.js';
import { restoreAiSession, serializeAiSession } from '../src/features/ai-scan/session.js';

function candidate(id, sourceText, status = AI_CANDIDATE_STATUS.PENDING) {
    return {
        id,
        sourceText,
        status,
        fingerprint: `fingerprint-${id}`,
        siteKey: 'https://example.com',
        targetLanguage: 'zh-CN',
    };
}

test('AI session serialization keeps only decisions and rules for persisted candidates', () => {
    const first = candidate('first', 'First');
    const second = candidate('second', 'Second');
    const snapshot = serializeAiSession({
        candidates: new Map([
            [first.id, first],
            [second.id, second],
        ]),
        decisions: new Map([
            ['first', { id: 'first' }],
            ['second', { id: 'second' }],
        ]),
        regexRules: new Map([
            ['rule-first', { id: 'rule-first', sourceIds: ['first'] }],
            ['rule-second', { id: 'rule-second', sourceIds: ['second'] }],
        ]),
        siteKey: 'https://example.com',
        targetLanguage: 'zh-CN',
        sessionUsage: { requests: 2, characters: 20 },
        maxItems: 1,
    });

    assert.deepEqual(
        snapshot.candidates.map(({ id }) => id),
        ['second']
    );
    assert.deepEqual(
        snapshot.decisions.map(({ id }) => id),
        ['second']
    );
    assert.deepEqual(
        snapshot.regexRules.map(({ id }) => id),
        ['rule-second']
    );
});

test('AI session restore normalizes legacy states and rejects a mismatched session', () => {
    const restored = restoreAiSession(
        {
            siteKey: 'https://example.com',
            targetLanguage: 'zh-CN',
            candidates: [
                candidate('inflight', 'Loading', AI_CANDIDATE_STATUS.IN_FLIGHT),
                candidate('legacy-keep', 'Legacy', AI_CANDIDATE_STATUS.KEEP),
            ],
            decisions: [
                {
                    id: 'inflight',
                    action: AI_ACTIONS.TRANSLATE,
                    translation: 'Loading',
                    translationType: AI_TRANSLATION_TYPES.TEXT,
                    status: AI_CANDIDATE_STATUS.TRANSLATED,
                },
                {
                    id: 'legacy-keep',
                    action: AI_ACTIONS.KEEP,
                    translation: '',
                    translationType: AI_TRANSLATION_TYPES.TEXT,
                    status: AI_CANDIDATE_STATUS.KEEP,
                },
            ],
        },
        { siteKey: 'https://example.com', targetLanguage: 'zh-CN' }
    );

    assert.equal(restored.candidates.get('inflight').status, AI_CANDIDATE_STATUS.REMOVED);
    assert.equal(restored.decisions.get('inflight').action, AI_ACTIONS.REMOVE);
    assert.equal(restored.candidates.get('legacy-keep').status, AI_CANDIDATE_STATUS.REMOVED);
    assert.equal(restored.decisions.get('legacy-keep').action, AI_ACTIONS.REMOVE);

    const empty = restoreAiSession(
        { siteKey: 'https://other.example', targetLanguage: 'zh-CN', candidates: [candidate('stale', 'Stale')] },
        { siteKey: 'https://example.com', targetLanguage: 'zh-CN' }
    );
    assert.equal(empty.candidates.size, 0);
    assert.equal(empty.sessionUsage.requests, 0);
});
