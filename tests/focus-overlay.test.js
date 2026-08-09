import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';

const focusSurfaceStyles = [
    ['info tooltip', new URL('../src/assets/styles/info-tooltip.css', import.meta.url), '.info-tooltip-overlay'],
    ['main modal', new URL('../src/assets/styles/main-ui.css', import.meta.url), '.text-extractor-modal-overlay'],
    ['settings panel', new URL('../src/assets/styles/settings-panel.css', import.meta.url), '.settings-panel-overlay'],
];

test('full-screen focus surfaces do not paint a viewport outline', async () => {
    for (const [name, path, selector] of focusSurfaceStyles) {
        const css = await readFile(path, 'utf8');
        const stylesheet = postcss.parse(css);
        const rule = stylesheet.nodes.find((node) => node.type === 'rule' && node.selector === selector);
        const outline = rule?.nodes.find((node) => node.type === 'decl' && node.prop === 'outline');

        assert.ok(rule, `${name} focus surface rule should exist`);
        assert.equal(outline?.value, 'none', `${name} focus surface should suppress the viewport outline`);
    }
});
