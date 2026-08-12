import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import postcss from 'postcss';

const AI_PANEL_PATH = new URL('../src/features/settings/aiPanel.js', import.meta.url);
const AI_PANEL_HELPERS_PATH = new URL('../src/features/settings/aiPanel/helpers.js', import.meta.url);
const AI_STYLE_SECTION_PATH = new URL('../src/features/settings/aiPanel/siteStylesSection.js', import.meta.url);
const AI_SCAN_UI_PATH = new URL('../src/features/ai-scan/ui.js', import.meta.url);
const FAB_PATH = new URL('../src/shared/ui/components/fab.js', import.meta.url);
const FAB_STYLES_PATH = new URL('../src/assets/styles/fab.css', import.meta.url);
const MAIN_STYLES_PATH = new URL('../src/assets/styles/main-ui.css', import.meta.url);
const AI_STYLES_PATH = new URL('../src/assets/styles/ai-scan.css', import.meta.url);
const FORMS_STYLES_PATH = new URL('../src/assets/styles/forms.css', import.meta.url);
const ICON_TITLE_PATH = new URL('../src/shared/ui/components/iconTitle.js', import.meta.url);
const BUTTON_PATH = new URL('../src/shared/ui/components/button.js', import.meta.url);
const TOGGLE_PATH = new URL('../src/shared/ui/components/toggleSwitch.js', import.meta.url);
const SETTINGS_PANEL_BUILDER_PATH = new URL('../src/features/settings/panelBuilder.js', import.meta.url);
const AI_ICON_PATH = new URL('../src/assets/icons/aiIcon.js', import.meta.url);
const SETTINGS_STYLES_PATH = new URL('../src/assets/styles/settings-panel.css', import.meta.url);
const CUSTOM_SELECT_STYLES_PATH = new URL('../src/assets/styles/custom-select.css', import.meta.url);
const AI_SCAN_LOGIC_PATH = new URL('../src/features/ai-scan/logic.js', import.meta.url);
const MODAL_CONTENT_PATH = new URL('../src/shared/ui/mainModal/modalContent.js', import.meta.url);
const MAIN_MODAL_PATH = new URL('../src/shared/ui/mainModal/index.js', import.meta.url);
const MODAL_FOOTER_PATH = new URL('../src/shared/ui/mainModal/modalFooter.js', import.meta.url);
const LOCALE_PATHS = {
    en: new URL('../src/shared/i18n/en.json', import.meta.url),
    'zh-CN': new URL('../src/shared/i18n/zh-CN.json', import.meta.url),
    'zh-TW': new URL('../src/shared/i18n/zh-TW.json', import.meta.url),
};

function getCssDeclarations(css, selector, mediaQuery = null) {
    const root = postcss.parse(css);
    const declarations = {};

    root.walkRules((rule) => {
        if (rule.selector !== selector) return;

        const isMatchingScope =
            mediaQuery === null
                ? rule.parent.type === 'root'
                : rule.parent.type === 'atrule' && rule.parent.name === 'media' && rule.parent.params === mediaQuery;
        if (!isMatchingScope) return;

        for (const node of rule.nodes) {
            if (node.type === 'decl') declarations[node.prop] = node.value;
        }
    });

    return declarations;
}

test('AI summary statuses use concise consistent labels in every locale', async () => {
    const locales = Object.fromEntries(
        await Promise.all(
            Object.entries(LOCALE_PATHS).map(async ([locale, path]) => [
                locale,
                JSON.parse(await readFile(path, 'utf8')),
            ])
        )
    );

    assert.deepEqual(
        Object.fromEntries(
            Object.entries(locales).map(([locale, messages]) => [
                locale,
                [
                    messages.results.aiRunning,
                    messages.results.aiPaused,
                    messages.results.aiStopped,
                    messages.results.aiProcessing,
                    messages.results.aiRequestError,
                ],
            ])
        ),
        {
            en: ['Working', 'Paused', 'Stopped', 'Processing…', 'Request failed'],
            'zh-CN': ['工作中', '已暂停', '已停止', '处理中…', '请求失败'],
            'zh-TW': ['工作中', '已暫停', '已停止', '處理中…', '請求失敗'],
        }
    );
});

test('AI settings reuse shared controls instead of native select duplicates', async () => {
    const source = (
        await Promise.all([
            readFile(AI_PANEL_PATH, 'utf8'),
            readFile(AI_PANEL_HELPERS_PATH, 'utf8'),
            readFile(AI_STYLE_SECTION_PATH, 'utf8'),
        ])
    ).join('\n');

    assert.match(source, /createCustomSelectField/);
    assert.match(source, /createNumericInput/);
    assert.match(source, /createTextField/);
    assert.match(source, /createToggleSwitch/);
    assert.match(source, /createDisclosure/);
    assert.doesNotMatch(source, /createElement\(['"]select['"]\)/);
    assert.doesNotMatch(source, /createElement\(['"]details['"]\)/);
});

test('AI settings actions use distinct semantic icons', async () => {
    const source = (await Promise.all([readFile(AI_PANEL_PATH, 'utf8'), readFile(AI_STYLE_SECTION_PATH, 'utf8')])).join(
        '\n'
    );

    for (const icon of ['addIcon', 'deleteIcon', 'resetIcon', 'saveIcon', 'speedIcon', 'clearIcon']) {
        assert.match(source, new RegExp(`icon: ${icon}`));
    }
    assert.doesNotMatch(source, /textKey: 'common\.delete',[\s\S]{0,100}icon: clearIcon/);
    assert.doesNotMatch(source, /ai-button-(?:secondary|danger)/);
});

test('AI cost controls expose a restore-defaults action wired to shared defaults', async () => {
    const source = await readFile(AI_PANEL_PATH, 'utf8');

    assert.match(source, /textKey: 'settings\.ai\.restoreDefaults'/);
    assert.match(source, /AI_DEFAULT_SETTINGS\.batch\.maxItems/);
    assert.match(source, /AI_DEFAULT_SETTINGS\.budget\.maxEstimatedTokensPerDay/);
    assert.match(source, /AI_DEFAULT_SETTINGS\.requestTimeoutMs \/ 1000/);
});

test('summary modal dimensions match the settings panel at every viewport size', async () => {
    const [mainStyles, settingsStyles] = await Promise.all([
        readFile(MAIN_STYLES_PATH, 'utf8'),
        readFile(SETTINGS_STYLES_PATH, 'utf8'),
    ]);

    for (const mediaQuery of [null, '(max-width: 900px)', '(max-width: 700px)']) {
        const mainDimensions = getCssDeclarations(mainStyles, '.text-extractor-modal', mediaQuery);
        const settingsDimensions = getCssDeclarations(settingsStyles, '.settings-panel-modal', mediaQuery);

        for (const property of ['width', 'max-width', 'height', 'max-height']) {
            assert.equal(
                mainDimensions[property],
                settingsDimensions[property],
                `${mediaQuery || 'base'} ${property} should match between summary and settings panels`
            );
        }
    }
});

test('the shared settings modal uses the compact workspace size', async () => {
    const styles = await readFile(SETTINGS_STYLES_PATH, 'utf8');

    assert.match(styles, /max-width: 1040px/);
    assert.match(styles, /#tab-ai\.settings-tab-content/);
});

test('shared text buttons use one icon and label geometry', async () => {
    const [iconTitle, button, forms] = await Promise.all([
        readFile(ICON_TITLE_PATH, 'utf8'),
        readFile(BUTTON_PATH, 'utf8'),
        readFile(FORMS_STYLES_PATH, 'utf8'),
    ]);

    assert.match(iconTitle, /tc-icon-title/);
    assert.match(iconTitle, /tc-icon-title-icon/);
    assert.match(forms, /\.tc-button > \.tc-icon-title/);
    assert.match(forms, /line-height: 20px/);
    assert.match(button, /let iconWrapper = iconOnly \? button : button\.querySelector\('\.tc-icon-title-icon'\)/);
    assert.match(button, /iconWrapper\.appendChild\(newIconElement\)/);
    assert.doesNotMatch(button, /button\.appendChild\(newIconElement\)/);
});

test('all settings booleans reuse the shared switch component', async () => {
    const [toggle, panelBuilder, forms, settingsStyles] = await Promise.all([
        readFile(TOGGLE_PATH, 'utf8'),
        readFile(SETTINGS_PANEL_BUILDER_PATH, 'utf8'),
        readFile(FORMS_STYLES_PATH, 'utf8'),
        readFile(SETTINGS_STYLES_PATH, 'utf8'),
    ]);

    assert.match(toggle, /setAttribute\('role', 'switch'\)/);
    assert.match(toggle, /tooltipConfig\?\.text/);
    assert.match(panelBuilder, /createToggleSwitch/);
    assert.doesNotMatch(panelBuilder, /createCheckbox/);
    assert.match(forms, /\.tc-toggle-setting\s*\{[\s\S]*gap: 16px[\s\S]*min-height: 52px[\s\S]*padding: 10px 14px/);
    assert.match(forms, /\.tc-toggle-control\s*\{[\s\S]*width: 48px[\s\S]*height: 26px/);
    assert.doesNotMatch(toggle, /tc-toggle-setting-compact/);
    assert.doesNotMatch(forms, /tc-toggle-setting-compact/);
    assert.match(settingsStyles, /\.setting-item > \.tc-toggle-setting/);
    assert.match(settingsStyles, /--settings-item-gap: 12px/);
    assert.match(settingsStyles, /\.settings-tab-content > \.setting-item:last-child/);
    assert.match(settingsStyles, /\.output-indent-setting\s*\{[\s\S]*margin: 0 0 var\(--settings-item-gap, 12px\)/);
    assert.doesNotMatch(settingsStyles, /checkbox-group|checkmark/);
});

test('AI scan reuses the shared top counter and the AI feature switch controls its FAB', async () => {
    const [aiUi, fab] = await Promise.all([readFile(AI_SCAN_UI_PATH, 'utf8'), readFile(FAB_PATH, 'utf8')]);

    assert.match(aiUi, /createCounterWithHelp/);
    assert.match(aiUi, /showCounterWithHelp/);
    assert.match(aiUi, /hideCounterWithHelp/);
    assert.match(aiUi, /onPause: \(\) => \{[\s\S]*pauseAiScan\(\)/);
    assert.match(aiUi, /onResume: \(\) => \{[\s\S]*resumeAiScan\(\)/);
    assert.match(aiUi, /scanType: 'AiScan'/);
    assert.match(fab, /fab-feature-hidden/);
    assert.match(fab, /ai\?\.enabled !== false/);
});

test('AI pause blocks collection but manual submission remains available', async () => {
    const [logic, footer] = await Promise.all([
        readFile(AI_SCAN_LOGIC_PATH, 'utf8'),
        readFile(MODAL_FOOTER_PATH, 'utf8'),
    ]);

    assert.match(logic, /export function pauseAiScan\(\)[\s\S]*observer\.disconnect\(\)/);
    assert.match(logic, /export function resumeAiScan\(\)[\s\S]*observer\.observe\(document\.body/);
    assert.match(
        logic,
        /export async function submitPending\(\) \{\s*if \(currentRequest \|\| isClearing \|\| submissionInProgress\)/
    );
    assert.doesNotMatch(logic, /export async function submitPending\(\) \{\s*if \(isPaused\)/);
    assert.doesNotMatch(logic, /async function performSubmitPending\(\) \{\s*if \(!isActive \|\| currentRequest/);
    assert.match(logic, /function handleMutations\(mutations\) \{\s*if \(!isActive \|\| isPaused\) return/);
    assert.match(footer, /aiSubmitBtn\.disabled = snapshot\.processing \|\|/);
    assert.match(footer, /aiRetryBtn\.disabled = snapshot\.processing \|\|/);
});

test('AI collection feedback flushes quickly without changing request batching', async () => {
    const logic = await readFile(AI_SCAN_LOGIC_PATH, 'utf8');
    const rootFlush = logic.match(/function scheduleRootFlush\(\) \{([\s\S]*?)\n\}/)?.[1] || '';

    assert.match(logic, /const AI_COLLECTION_FLUSH_DELAY_MS = 200/);
    assert.match(rootFlush, /if \(rootFlushTimer !== null\) return/);
    assert.doesNotMatch(rootFlush, /clearTimeout\(rootFlushTimer\)/);
    assert.match(logic, /scheduleAutoSubmit\(delayMs\)/);
    assert.match(logic, /scheduleAutoSubmit\(aiSettings\.batch\.debounceMs\)/);
});

test('AI review items expose remove and return-to-editor actions', async () => {
    const [logic, content, aiUi, styles] = await Promise.all([
        readFile(AI_SCAN_LOGIC_PATH, 'utf8'),
        readFile(MODAL_CONTENT_PATH, 'utf8'),
        readFile(AI_SCAN_UI_PATH, 'utf8'),
        readFile(AI_STYLES_PATH, 'utf8'),
    ]);

    assert.match(logic, /export function removeAiReviewItem\(candidateId\)/);
    assert.match(logic, /export function restoreAiReviewItem\(candidateId\)/);
    assert.match(content, /returnButton\.dataset\.reviewAction = 'return-to-editor'/);
    assert.match(content, /fire\('ai-review-return-to-editor', item\.id\)/);
    assert.match(content, /fire\('ai-review-remove', item\.id\)/);
    assert.match(aiUi, /on\('ai-review-remove'/);
    assert.match(aiUi, /on\('ai-review-return-to-editor'/);
    assert.match(aiUi, /modalState\.setAiOutputType\('text'\)/);
    assert.match(styles, /grid-template-columns: minmax\(0, 2fr\) minmax\(120px, 1fr\) auto/);
    assert.match(styles, /\.ai-review-actions/);
});

test('FAB bottom positioning follows the visible stack height', async () => {
    const [positionStyles, mainStyles] = await Promise.all([
        readFile(FAB_STYLES_PATH, 'utf8'),
        readFile(MAIN_STYLES_PATH, 'utf8'),
    ]);

    assert.match(positionStyles, /calc\(100vh - 100% - 30px\)/);
    assert.doesNotMatch(positionStyles, /100vh - 328px/);
    assert.match(mainStyles, /\.text-extractor-fab\.fab-feature-hidden[\s\S]*height: 0/);
    assert.match(mainStyles, /margin-top 0\.3s/);
    assert.doesNotMatch(mainStyles, /\.fab-feature-hidden\s*\{\s*display: none/);
});

test('FAB icon centering uses flexbox without nested transforms', async () => {
    const styles = await readFile(MAIN_STYLES_PATH, 'utf8');

    const fabBlock = styles.match(/\.text-extractor-fab\s*\{([^}]*)\}/)?.[1] || '';
    const iconBlock = styles.match(/\.text-extractor-fab svg\s*\{([^}]*)\}/)?.[1] || '';
    assert.match(fabBlock, /display:\s*flex/);
    assert.match(fabBlock, /align-items:\s*center/);
    assert.match(fabBlock, /justify-content:\s*center/);
    assert.doesNotMatch(iconBlock, /position|top:|left:|transform/);
});

test('AI disabled state keeps its switch active and dims the remaining settings group', async () => {
    const [panel, styles] = await Promise.all([readFile(AI_PANEL_PATH, 'utf8'), readFile(AI_STYLES_PATH, 'utf8')]);

    assert.match(panel, /aiControls\.inert = disabled/);
    assert.match(panel, /aiEnabled\.input\.addEventListener\('change'/);
    assert.match(styles, /\.ai-settings-controls\.is-disabled/);
    assert.match(styles, /pointer-events: none/);
});

test('modal title icons inherit color and share the close control center line', async () => {
    const [icon, styles] = await Promise.all([readFile(AI_ICON_PATH, 'utf8'), readFile(MAIN_STYLES_PATH, 'utf8')]);

    assert.match(icon, /fill="currentColor"/);
    assert.match(styles, /#main-modal-title-container[\s\S]*min-height: 32px/);
    assert.match(styles, /\.header-right-controls[\s\S]*min-height: 32px/);
});

test('shared custom selects reserve one aligned row for icon, label, and arrow', async () => {
    const styles = await readFile(CUSTOM_SELECT_STYLES_PATH, 'utf8');

    assert.match(styles, /\.selected-option-content\s*\{[\s\S]*display: flex/);
    assert.match(styles, /\.selected-option-content\s*\{[\s\S]*align-items: center/);
    assert.match(styles, /\.custom-select-arrow\s*\{[\s\S]*flex: 0 0 20px/);
    assert.match(styles, /\.selected-option-content > \.tc-icon-title\s*\{[\s\S]*width: 100%/);
});

test('advanced site matching uses the same reusable editor-card surface', async () => {
    const [panel, styles] = await Promise.all([
        readFile(AI_STYLE_SECTION_PATH, 'utf8'),
        readFile(AI_STYLES_PATH, 'utf8'),
    ]);

    assert.match(panel, /advancedStyleSettings\.element\.classList\.add\('ai-style-advanced'\)/);
    assert.match(styles, /\.ai-style-advanced\s*\{[\s\S]*border-radius: 12px/);
    assert.match(styles, /\.ai-style-advanced \.tc-disclosure-content\s*\{[\s\S]*padding: 18px/);
});

test('site translation preferences use one consistent vertical flow', async () => {
    const styles = await readFile(AI_STYLES_PATH, 'utf8');

    assert.match(styles, /\.ai-style-toolbar\s*\{[\s\S]*?flex-direction: column;[\s\S]*?\}/);
    assert.match(styles, /\.ai-style-workspace\s*\{[\s\S]*?flex-direction: column;[\s\S]*?\}/);
    assert.match(styles, /\.ai-style-library,[\s\S]*?\.ai-style-editor\s*\{[\s\S]*?width: 100%;/);
});

test('AI summary renders local candidate pairs before provider submission', async () => {
    const [logic, ui] = await Promise.all([readFile(AI_SCAN_LOGIC_PATH, 'utf8'), readFile(AI_SCAN_UI_PATH, 'utf8')]);

    assert.match(logic, /export function getAiDisplayPairs/);
    assert.match(ui, /const data = getAiDisplayData\(\)/);
    assert.doesNotMatch(ui, /const pairs = getAcceptedTranslationPairs\(\)/);
    assert.match(ui, /finally\s*\{\s*syncAiSummary\(false, \{ resetDrafts: true \}\)/);
});

test('an empty AI result remains editable and refreshes stale line metadata', async () => {
    const source = await readFile(MAIN_MODAL_PATH, 'utf8');
    const emptyOutputBranch = source.match(
        /else if \(content === state\.SHOW_PLACEHOLDER\) \{([\s\S]*?)\n {4}\} else \{/
    )?.[1];

    assert.ok(emptyOutputBranch);
    assert.match(emptyOutputBranch, /if \(isAiMode\) \{[\s\S]*state\.outputTextarea\.readOnly = false/);
    assert.match(emptyOutputBranch, /updateLineNumbers\(\)/);
    assert.match(emptyOutputBranch, /updateStatistics\(\)/);
    assert.match(emptyOutputBranch, /updateActiveLine\(\)/);
    assert.match(emptyOutputBranch, /else \{\s*state\.outputTextarea\.readOnly = true/);
});

test('an AI draft remains editable after the user clears all summary text', async () => {
    const source = await readFile(MAIN_MODAL_PATH, 'utf8');
    const renderedContentBranch = source.match(
        /const isData = content && content\.trim\(\)\.length > 0;([\s\S]*?)requestAnimationFrame/
    )?.[1];

    assert.ok(renderedContentBranch);
    assert.match(renderedContentBranch, /state\.outputTextarea\.readOnly = mode !== 'ai-scan' && !isData/);
    assert.doesNotMatch(renderedContentBranch, /state\.outputTextarea\.readOnly = !isData/);
});

test('AI summary output tabs publish their selection through the shared event bus', async () => {
    const source = await readFile(MODAL_CONTENT_PATH, 'utf8');

    assert.match(source, /import \{ fire, on \} from '\.\.\/\.\.\/utils\/core\/eventBus\.js';/);
    assert.match(source, /button\.addEventListener\('click', \(\) => fire\('ai-output-type-change', type\)\)/);
});

test('main modal removes the same textarea handlers that it installs', async () => {
    const source = await readFile(MAIN_MODAL_PATH, 'utf8');

    assert.match(source, /const handleTextareaScroll = \(\) =>/);
    assert.match(source, /const handleTextareaKeyDown = \(event\) =>/);
    assert.match(source, /addEventListener\('keydown', handleTextareaKeyDown\)/);
    assert.match(source, /removeEventListener\('keydown', handleTextareaKeyDown\)/);
    assert.match(source, /addEventListener\('scroll', handleTextareaScroll\)/);
    assert.match(source, /removeEventListener\('scroll', handleTextareaScroll\)/);
    assert.doesNotMatch(source, /removeEventListener\('scroll', \(\) =>/);
});
