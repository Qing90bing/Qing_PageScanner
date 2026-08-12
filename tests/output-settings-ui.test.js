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

test('format previews keep a visible fixed left-edge reference', async () => {
    const styles = await readFile(FORMAT_PREVIEW_STYLES_PATH, 'utf8');

    assert.match(
        styles,
        /\.code-text-preview\s*\{[\s\S]*?position: relative;[\s\S]*?width: min\(22ch, 100%\);[\s\S]*?padding-left: 1ch;/
    );
    assert.match(
        styles,
        /\.code-text-preview::before\s*\{[\s\S]*?position: absolute;[\s\S]*?top: 0\.15em;[\s\S]*?bottom: 0\.15em;[\s\S]*?left: 0;[\s\S]*?width: 1px;/
    );
    assert.match(styles, /\.image-card-option\.selected \.code-text-preview::before\s*\{/);
});

test('tab size settings expose zero through three spaces', async () => {
    const config = await readFile(SETTINGS_CONFIG_PATH, 'utf8');

    assert.match(config, /key: 'tabSize'/);
    assert.match(config, /value: '0'/);
    assert.match(config, /value: '1'/);
    assert.match(config, /value: '2'/);
    assert.match(config, /value: '3'/);
});
