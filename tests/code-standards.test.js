import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const SOURCE_ROOT = new URL('../src/', import.meta.url);
const ESLINT_CONFIG_PATH = new URL('../eslint.config.js', import.meta.url);
const SETTINGS_UI_PATH = new URL('../src/features/settings/ui.js', import.meta.url);
const SETTINGS_LOGIC_PATH = new URL('../src/features/settings/logic.js', import.meta.url);
const ELEMENT_SCAN_UI_PATH = new URL('../src/features/element-scan/ui.js', import.meta.url);

async function listJavaScriptFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
        if (entry.isDirectory()) {
            files.push(...(await listJavaScriptFiles(entryUrl)));
        } else if (entry.name.endsWith('.js')) {
            files.push(entryUrl);
        }
    }
    return files;
}

test('source HTML sinks use the trusted HTML boundary', async () => {
    const files = await listJavaScriptFiles(SOURCE_ROOT);
    const violations = [];

    for (const file of files) {
        const source = await readFile(file, 'utf8');
        const unsafeAssignment = /\.innerHTML\s*=(?!\s*createTrustedHTML\s*\()/;
        if (unsafeAssignment.test(source)) {
            violations.push(file.pathname);
        }
    }

    assert.deepEqual(violations, []);
});

test('direct Tampermonkey API access stays behind the service boundary', async () => {
    const files = await listJavaScriptFiles(SOURCE_ROOT);
    const violations = [];

    for (const file of files) {
        if (file.pathname.endsWith('/shared/services/tampermonkey.js')) continue;
        const source = await readFile(file, 'utf8');
        const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
        if (
            /\bGM_(?:info|getValue|setValue|deleteValue|xmlhttpRequest|setClipboard|registerMenuCommand|unregisterMenuCommand)\b/.test(
                code
            )
        ) {
            violations.push(file.pathname);
        }
    }

    assert.deepEqual(violations, []);
});

test('reusable shared layers do not import feature internals', async () => {
    const files = await listJavaScriptFiles(SOURCE_ROOT);
    const reusablePrefixes = ['/shared/services/', '/shared/config/', '/shared/utils/', '/shared/ui/components/'];
    const violations = [];

    for (const file of files) {
        if (!reusablePrefixes.some((prefix) => file.pathname.includes(prefix))) continue;
        const source = await readFile(file, 'utf8');
        const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
        if (/from\s+['"][^'"]*features\//.test(code)) {
            violations.push(file.pathname);
        }
    }

    assert.deepEqual(violations, []);
});

test('source linting keeps the recommended ESLint rules active', async () => {
    const { default: config } = await import(ESLINT_CONFIG_PATH.href);
    const sourceConfig = config.find((entry) => entry.files?.includes('src/**/*.js'));

    assert.ok(sourceConfig);
    assert.equal(sourceConfig.rules['no-undef'], 'error');
    assert.equal(sourceConfig.rules['no-empty'], 'error');
    assert.equal(sourceConfig.rules['no-case-declarations'], 'error');
});

test('contextual settings cleanup removes global and component listeners', async () => {
    const source = await readFile(SETTINGS_UI_PATH, 'utf8');

    assert.match(source, /document\.removeEventListener\('keydown', handleKeyDown, true\)/);
    assert.match(source, /saveButton\?\.destroy\(\)/);
    assert.match(source, /closeButton\?\.removeEventListener\('click', closePanel\)/);
});

test('settings save feedback follows synchronous language state propagation', async () => {
    const source = await readFile(SETTINGS_LOGIC_PATH, 'utf8');
    const applySettingsBody = source.match(/export function applySettings\([\s\S]*?\n\}/)?.[0] || '';

    assert.doesNotMatch(applySettingsBody, /setTimeout/);
    assert.match(applySettingsBody, /fire\('settingsSaved'\)[\s\S]*showNotification/);
});

test('element scan toolbar keeps page-derived text out of HTML templates', async () => {
    const source = await readFile(ELEMENT_SCAN_UI_PATH, 'utf8');

    assert.doesNotMatch(source, /\.innerHTML\s*=/);
    assert.match(source, /toolbarTag\.textContent = getElementSelector\(elementPath\[0\]\)/);
});
