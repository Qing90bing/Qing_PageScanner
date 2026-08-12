import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const SETTINGS_STYLES_PATH = new URL('../src/assets/styles/settings-panel.css', import.meta.url);

test('theme card controls share one aligned label row', async () => {
    const styles = await readFile(SETTINGS_STYLES_PATH, 'utf8');

    assert.ok(styles.includes('box-sizing: border-box;\n    width: 20px;\n    height: 20px;\n    margin: 0;'));
    assert.ok(styles.includes('overflow-wrap: anywhere;\n    line-height: 20px;'));
    assert.ok(
        styles.includes(
            'justify-content: center;\n    width: 20px;\n    height: 20px;\n    flex: 0 0 20px;\n    color: var(--main-text-secondary);\n    margin: 0;'
        )
    );
    assert.ok(styles.includes('.image-card-label-icon svg {\n    display: block;'));
});

test('theme card previews keep the schematic visually prominent', async () => {
    const styles = await readFile(SETTINGS_STYLES_PATH, 'utf8');

    assert.ok(styles.includes('width: min(140px, calc(100% - 24px));\n    height: 84px;'));
    assert.ok(styles.includes('width: 32px;\n    height: 32px;\n    border-radius: 8px;'));
    assert.ok(styles.includes('.schematic-line {\n    height: 7px;'));
});

test('format and theme cards share one surface color and radius token', async () => {
    const styles = await readFile(SETTINGS_STYLES_PATH, 'utf8');

    assert.match(styles, /--settings-card-background: var\(--main-bg\)/);
    assert.match(styles, /--settings-card-selected-background: color-mix\(/);
    assert.match(styles, /--settings-card-label-selected-background: color-mix\(/);
    assert.match(styles, /--settings-card-radius: 12px/);
    assert.match(
        styles,
        /\.image-card-option\s*\{[\s\S]*border-radius: var\(--settings-card-radius, 12px\)[\s\S]*background-color: var\(--settings-card-background, var\(--main-bg\)\)/
    );
    assert.match(
        styles,
        /\.image-card-label\s*\{[\s\S]*background-color: var\(--settings-card-background, var\(--main-bg\)\)/
    );
    assert.match(
        styles,
        /\.image-card-option\.selected \.image-card-label\s*\{[\s\S]*background-color: var\(--settings-card-label-selected-background, var\(--main-bg\)\)/
    );
});
