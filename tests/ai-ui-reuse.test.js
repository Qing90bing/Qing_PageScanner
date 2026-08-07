import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const AI_PANEL_PATH = new URL('../src/features/settings/aiPanel.js', import.meta.url);
const AI_SCAN_UI_PATH = new URL('../src/features/ai-scan/ui.js', import.meta.url);
const FAB_PATH = new URL('../src/shared/ui/components/fab.js', import.meta.url);
const FAB_STYLES_PATH = new URL('../src/assets/styles/fab.css', import.meta.url);
const MAIN_STYLES_PATH = new URL('../src/assets/styles/main-ui.css', import.meta.url);
const AI_STYLES_PATH = new URL('../src/assets/styles/ai-scan.css', import.meta.url);
const FORMS_STYLES_PATH = new URL('../src/assets/styles/forms.css', import.meta.url);
const ICON_TITLE_PATH = new URL('../src/shared/ui/components/iconTitle.js', import.meta.url);
const BUTTON_PATH = new URL('../src/shared/ui/components/button.js', import.meta.url);
const AI_ICON_PATH = new URL('../src/assets/icons/aiIcon.js', import.meta.url);
const SETTINGS_STYLES_PATH = new URL('../src/assets/styles/settings-panel.css', import.meta.url);
const CUSTOM_SELECT_STYLES_PATH = new URL('../src/assets/styles/custom-select.css', import.meta.url);
const AI_SCAN_LOGIC_PATH = new URL('../src/features/ai-scan/logic.js', import.meta.url);

test('AI settings reuse shared controls instead of native select duplicates', async () => {
    const source = await readFile(AI_PANEL_PATH, 'utf8');

    assert.match(source, /createCustomSelectField/);
    assert.match(source, /createNumericInput/);
    assert.match(source, /createTextField/);
    assert.match(source, /createToggleSwitch/);
    assert.match(source, /createDisclosure/);
    assert.doesNotMatch(source, /createElement\(['"]select['"]\)/);
    assert.doesNotMatch(source, /createElement\(['"]details['"]\)/);
});

test('AI settings actions use distinct semantic icons', async () => {
    const source = await readFile(AI_PANEL_PATH, 'utf8');

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

test('summary modal height matches the settings panel height', async () => {
    const [mainStyles, settingsStyles] = await Promise.all([
        readFile(MAIN_STYLES_PATH, 'utf8'),
        readFile(SETTINGS_STYLES_PATH, 'utf8'),
    ]);

    assert.match(mainStyles, /\.text-extractor-modal\s*\{[\s\S]*height: min\(760px, calc\(100vh - 56px\)\)/);
    assert.match(mainStyles, /\.text-extractor-modal\s*\{[\s\S]*max-height: 90vh/);
    assert.match(settingsStyles, /\.settings-panel-modal\s*\{[\s\S]*height: min\(760px, calc\(100vh - 56px\)\)/);
    assert.match(settingsStyles, /\.settings-panel-modal\s*\{[\s\S]*max-height: 90vh/);
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
    assert.match(button, /iconWrapper\.appendChild\(newIconElement\)/);
    assert.doesNotMatch(button, /button\.appendChild\(newIconElement\)/);
});

test('AI scan reuses the shared top counter and the AI feature switch controls its FAB', async () => {
    const [aiUi, fab] = await Promise.all([readFile(AI_SCAN_UI_PATH, 'utf8'), readFile(FAB_PATH, 'utf8')]);

    assert.match(aiUi, /createCounterWithHelp/);
    assert.match(aiUi, /showCounterWithHelp/);
    assert.match(aiUi, /hideCounterWithHelp/);
    assert.match(fab, /fab-feature-hidden/);
    assert.match(fab, /ai\?\.enabled !== false/);
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
    const [panel, styles] = await Promise.all([readFile(AI_PANEL_PATH, 'utf8'), readFile(AI_STYLES_PATH, 'utf8')]);

    assert.match(panel, /advancedStyleSettings\.element\.classList\.add\('ai-style-advanced'\)/);
    assert.match(styles, /\.ai-style-advanced\s*\{[\s\S]*border-radius: 12px/);
    assert.match(styles, /\.ai-style-advanced \.tc-disclosure-content\s*\{[\s\S]*padding: 18px/);
});

test('AI summary renders local candidate pairs before provider submission', async () => {
    const [logic, ui] = await Promise.all([readFile(AI_SCAN_LOGIC_PATH, 'utf8'), readFile(AI_SCAN_UI_PATH, 'utf8')]);

    assert.match(logic, /export function getAiDisplayPairs/);
    assert.match(ui, /const pairs = getAiDisplayPairs\(\)/);
    assert.doesNotMatch(ui, /const pairs = getAcceptedTranslationPairs\(\)/);
    assert.match(ui, /finally\s*\{\s*syncAiSummary\(false\)/);
});
