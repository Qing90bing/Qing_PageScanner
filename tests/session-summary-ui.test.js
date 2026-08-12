import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const SESSION_UI_PATH = new URL('../src/features/session-scan/ui.js', import.meta.url);
const MAIN_MODAL_PATH = new URL('../src/shared/ui/mainModal/index.js', import.meta.url);
const MAIN_STYLES_PATH = new URL('../src/assets/styles/main-ui.css', import.meta.url);
const PLACEHOLDER_STYLES_PATH = new URL('../src/assets/styles/placeholder.css', import.meta.url);

test('session summary waits for the real summary callback before rendering its result', async () => {
    const source = await readFile(SESSION_UI_PATH, 'utf8');
    const showSummaryBody = source.match(/export function showSessionSummary\(\) \{([\s\S]*?)\n\}/)?.[1] || '';

    assert.match(showSummaryBody, /updateModalContent\(SHOW_LOADING, true, 'session-scan'\)/);
    assert.match(showSummaryBody, /sessionExtractor\.requestSummary\(\(formattedText, count\) =>/);
    assert.doesNotMatch(showSummaryBody, /setTimeout/);
    assert.match(showSummaryBody, /updateModalContent\(SHOW_PLACEHOLDER, false, 'session-scan'\)/);
    assert.match(showSummaryBody, /updateModalContent\(formattedText, false, 'session-scan'\)/);
});

test('the shared loading state keeps the editable surface hidden until content exists', async () => {
    const source = await readFile(MAIN_MODAL_PATH, 'utf8');
    const loadingBranch = source.match(
        /if \(content === state\.SHOW_LOADING\) \{([\s\S]*?)\n {4}\} else if \(content === state\.SHOW_PLACEHOLDER\)/
    )?.[1];

    assert.ok(loadingBranch);
    assert.match(loadingBranch, /textareaContainer\.classList\.remove\('is-visible'\)/);
    assert.match(loadingBranch, /textareaContainer\.classList\.add\('is-loading'\)/);
    assert.doesNotMatch(loadingBranch, /textareaContainer\.classList\.add\('is-visible'\)/);
});

test('loading mode disables the editor fade so stale content cannot flash', async () => {
    const source = await readFile(MAIN_STYLES_PATH, 'utf8');
    const loadingStyle = source.match(/\.tc-textarea-container\.is-loading\s*\{([\s\S]*?)\n\}/)?.[1] || '';

    assert.match(loadingStyle, /opacity: 0/);
    assert.match(loadingStyle, /visibility: hidden/);
    assert.match(loadingStyle, /transition: none/);
});

test('content surfaces hide stale visibility immediately before switching', async () => {
    const [mainStyles, placeholderStyles] = await Promise.all([
        readFile(MAIN_STYLES_PATH, 'utf8'),
        readFile(PLACEHOLDER_STYLES_PATH, 'utf8'),
    ]);
    const textareaStyle = mainStyles.match(/\.tc-textarea-container\s*\{([\s\S]*?)\n\}/)?.[1] || '';
    const placeholderStyle = placeholderStyles.match(/#modal-placeholder\s*\{([\s\S]*?)\n\}/)?.[1] || '';

    assert.match(textareaStyle, /transition: opacity 0\.2s ease-in-out/);
    assert.doesNotMatch(textareaStyle, /visibility 0\.2s/);
    assert.match(placeholderStyle, /transition: opacity 0\.2s ease-in-out/);
    assert.doesNotMatch(placeholderStyle, /visibility 0\.2s/);
});
