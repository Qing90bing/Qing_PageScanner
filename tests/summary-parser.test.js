import assert from 'node:assert/strict';
import test from 'node:test';
import { parseSummarySourceTexts } from '../src/shared/utils/text/summaryParser.js';

test('array summary parses source texts with and without outer brackets', () => {
    assert.deepEqual(parseSummarySourceTexts('[\n    ["Hello", "你好"],\n    ["Save", "保存"]\n]', 'array'), [
        'Hello',
        'Save',
    ]);
    assert.deepEqual(parseSummarySourceTexts('["Hello", "你好"],\n["Save", "保存"]', 'array'), ['Hello', 'Save']);
});

test('array summary keeps escaped quotes inside source texts', () => {
    assert.deepEqual(parseSummarySourceTexts('[["He said \\"hi\\"", "他说\\"你好\\""]]', 'array'), ['He said "hi"']);
});

test('object summary parses source texts with and without outer brackets', () => {
    assert.deepEqual(parseSummarySourceTexts('{\n    "Hello": "你好",\n    "Save": "保存"\n}', 'object'), [
        'Hello',
        'Save',
    ]);
    assert.deepEqual(parseSummarySourceTexts('"Hello": "你好",\n"Save": "保存"', 'object'), ['Hello', 'Save']);
});

test('csv summary parses source texts and unescapes doubled quotes', () => {
    assert.deepEqual(parseSummarySourceTexts('"Hello","你好"\n"Save","保存"', 'csv'), ['Hello', 'Save']);
    assert.deepEqual(parseSummarySourceTexts('"He said ""hi""","他说""你好"""', 'csv'), ['He said "hi"']);
});

test('summary parser ignores empty content and malformed lines', () => {
    assert.deepEqual(parseSummarySourceTexts('', 'array'), []);
    assert.deepEqual(parseSummarySourceTexts('   \n ', 'object'), []);
    assert.deepEqual(parseSummarySourceTexts('[\n    ["broken", "x"],\n    broken line\n]', 'array'), ['broken']);
});

test('summary parser defaults to the array format', () => {
    assert.deepEqual(parseSummarySourceTexts('[["Hello", "你好"]]'), ['Hello']);
});
