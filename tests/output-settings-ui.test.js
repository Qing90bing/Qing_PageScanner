import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const FORMAT_PREVIEW_STYLES_PATH = new URL('../src/assets/styles/format-preview.css', import.meta.url);
const SETTINGS_CONFIG_PATH = new URL('../src/features/settings/config.js', import.meta.url);

test('wrapper symbols do not hide output indentation and tab size changes animate', async () => {
    const styles = await readFile(FORMAT_PREVIEW_STYLES_PATH, 'utf8');

    assert.ok(styles.includes('.code-preview.hide-brackets .wrapper-bracket {\n    opacity: 0;'));
    assert.doesNotMatch(styles, /hide-brackets [^{]+wrapper-indent/);
    assert.ok(styles.includes('transition: width 0.22s ease;'));
});

test('tab size settings expose zero through three spaces', async () => {
    const config = await readFile(SETTINGS_CONFIG_PATH, 'utf8');

    assert.match(config, /key: 'tabSize'/);
    assert.match(config, /value: '0'/);
    assert.match(config, /value: '1'/);
    assert.match(config, /value: '2'/);
    assert.match(config, /value: '3'/);
});
