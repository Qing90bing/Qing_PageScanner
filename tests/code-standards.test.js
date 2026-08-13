import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const SOURCE_ROOT = new URL('../src/', import.meta.url);
const ESLINT_CONFIG_PATH = new URL('../eslint.config.js', import.meta.url);
const SETTINGS_UI_PATH = new URL('../src/features/settings/ui.js', import.meta.url);
const SETTINGS_LOGIC_PATH = new URL('../src/features/settings/logic.js', import.meta.url);
const ELEMENT_SCAN_UI_PATH = new URL('../src/features/element-scan/ui.js', import.meta.url);
const ELEMENT_SCAN_STAGING_PATH = new URL('../src/features/element-scan/stagingController.js', import.meta.url);
const FEATURE_FACADE_PATHS = [
    new URL('../src/features/ai-scan/logic.js', import.meta.url),
    new URL('../src/features/element-scan/logic.js', import.meta.url),
    new URL('../src/features/session-scan/logic.js', import.meta.url),
];
const SHARED_UI_ENTRY_PATHS = [
    new URL('../src/shared/ui/entry.js', import.meta.url),
    new URL('../src/shared/ui/summaryHandler.js', import.meta.url),
];

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

function getStaticImportTargets(file, source, knownFiles) {
    const targets = [];
    const importPattern = /(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/g;
    const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');

    for (const match of code.matchAll(importPattern)) {
        const specifier = match[1];
        if (!specifier.startsWith('.')) continue;

        const target = new URL(specifier, file).href;
        if (knownFiles.has(target)) targets.push(target);
    }

    return targets;
}

async function buildSourceGraph() {
    const files = await listJavaScriptFiles(SOURCE_ROOT);
    const knownFiles = new Set(files.map((file) => file.href));
    const graph = new Map();

    await Promise.all(
        files.map(async (file) => {
            const source = await readFile(file, 'utf8');
            graph.set(file.href, getStaticImportTargets(file, source, knownFiles));
        })
    );

    return graph;
}

function getSourcePath(fileHref) {
    return decodeURIComponent(new URL(fileHref).pathname.slice(SOURCE_ROOT.pathname.length));
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

test('source module graph stays acyclic', async () => {
    const graph = await buildSourceGraph();
    const visiting = new Set();
    const visited = new Set();
    const stack = [];
    const cycles = new Set();

    const recordCycle = (start) => {
        const cycleStart = stack.indexOf(start);
        const paths = stack.slice(cycleStart).map(getSourcePath);
        const rotations = paths.map((_, index) => [...paths.slice(index), ...paths.slice(0, index)].join(' -> '));
        cycles.add(rotations.sort()[0]);
    };

    const visit = (file) => {
        if (visiting.has(file)) {
            recordCycle(file);
            return;
        }
        if (visited.has(file)) return;

        visiting.add(file);
        stack.push(file);
        (graph.get(file) || []).forEach(visit);
        stack.pop();
        visiting.delete(file);
        visited.add(file);
    };

    for (const file of graph.keys()) {
        visit(file);
    }
    assert.deepEqual([...cycles].sort(), []);
});

test('feature modules use another feature public entry instead of its internals', async () => {
    const graph = await buildSourceGraph();
    const violations = [];
    const getFeatureName = (fileHref) => new URL(fileHref).pathname.match(/\/features\/([^/]+)\//)?.[1] || null;

    graph.forEach((targets, source) => {
        const sourceFeature = getFeatureName(source);
        if (!sourceFeature) return;

        targets.forEach((target) => {
            const targetFeature = getFeatureName(target);
            if (!targetFeature || targetFeature === sourceFeature) return;

            const isPublicEntry = new URL(target).pathname.endsWith(`/features/${targetFeature}/index.js`);
            if (!isPublicEntry) {
                violations.push(`${getSourcePath(source)} -> ${getSourcePath(target)}`);
            }
        });
    });

    assert.deepEqual(violations.sort(), []);
});

test('scan facades delegate external runtime lifecycles to controllers', async () => {
    const sources = await Promise.all(FEATURE_FACADE_PATHS.map((path) => readFile(path, 'utf8')));

    sources.forEach((source) => {
        assert.doesNotMatch(source, /new MutationObserver\(/);
        assert.doesNotMatch(source, /new Worker\(/);
        assert.doesNotMatch(source, /set(?:Timeout|Interval)\(/);
    });
});

test('shared UI assembly imports feature public entries', async () => {
    const sources = await Promise.all(SHARED_UI_ENTRY_PATHS.map((path) => readFile(path, 'utf8')));

    sources.forEach((source) => {
        assert.doesNotMatch(source, /features\/(?:ai-scan|element-scan|session-scan)\/(?:logic|ui)\.js/);
        assert.match(source, /features\/(?:ai-scan|element-scan|session-scan)\/index\.js/);
    });
});

test('element scan returns to selection immediately after staging', async () => {
    const source = await readFile(ELEMENT_SCAN_STAGING_PATH, 'utf8');

    assert.match(source, /log\(t\('log\.elementScan\.stagingFinished'\)\);\s*selectionController\.reselect\(\);/);
    assert.doesNotMatch(source, /selectionController\.scheduleReselect\(\)/);
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
