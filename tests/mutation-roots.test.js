import test from 'node:test';
import assert from 'node:assert/strict';
import { selectTopLevelMutationRoots } from '../src/shared/utils/dom/mutationRoots.js';

function createElement(parentElement = null) {
    return { nodeType: 1, parentElement };
}

test('nested mutation roots collapse to their highest selected ancestor', () => {
    const parent = createElement();
    const child = createElement(parent);
    const grandchild = createElement(child);
    const sibling = createElement();

    assert.deepEqual(selectTopLevelMutationRoots([child, sibling, grandchild, parent]), [sibling, parent]);
});

test('non-element mutation roots remain available to callers', () => {
    const parent = createElement();
    const textNode = { nodeType: 3, parentElement: parent };

    assert.deepEqual(selectTopLevelMutationRoots(new Set([parent, textNode])), [parent, textNode]);
});
