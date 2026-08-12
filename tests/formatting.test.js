import test from 'node:test';
import assert from 'node:assert/strict';
import { getOutputTabIndent, normalizeOutputTabSize } from '../src/shared/config/outputConfig.js';
import { formatTextsForTranslation } from '../src/shared/utils/text/formatting.js';

const pairs = [{ sourceText: 'Hello', translation: '' }];

test('output formatting uses two spaces by default and accepts zero to three spaces', () => {
    assert.equal(formatTextsForTranslation(pairs, 'array'), '[\n  ["Hello", ""]\n]');
    assert.equal(
        formatTextsForTranslation(pairs, 'array', { includeArrayBrackets: false, tabSize: 3 }),
        '   ["Hello", ""]'
    );
    assert.equal(formatTextsForTranslation(pairs, 'object', { tabSize: 1 }), '{\n "Hello": ""\n}');
    assert.equal(formatTextsForTranslation(pairs, 'array', { tabSize: 3 }), '[\n   ["Hello", ""]\n]');
    assert.equal(formatTextsForTranslation(pairs, 'object', { tabSize: 0 }), '{\n"Hello": ""\n}');
});

test('output tab size normalization keeps the setting within its supported range', () => {
    assert.equal(normalizeOutputTabSize(undefined), 2);
    assert.equal(normalizeOutputTabSize('invalid'), 2);
    assert.equal(normalizeOutputTabSize(null), 2);
    assert.equal(normalizeOutputTabSize(0), 0);
    assert.equal(normalizeOutputTabSize(4), 3);
    assert.equal(getOutputTabIndent(0), '');
    assert.equal(getOutputTabIndent(3), '   ');
});
