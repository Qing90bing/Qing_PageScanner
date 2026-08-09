import {
    AI_DEFAULT_SETTINGS,
    AI_PROCESSING_MODES,
    AI_RESPONSE_MODES,
    AI_TARGET_LANGUAGES,
    mergeAiSettings,
    normalizeProvider,
} from '../../shared/services/ai/contracts.js';
import {
    deleteProviderApiKey,
    loadProviderApiKey,
    resetDailyUsage,
    saveProviderApiKey,
} from '../../shared/services/ai/storage.js';
import { testProviderProcessing } from '../../shared/services/ai/providerClient.js';
import {
    clearStyleProfiles,
    deleteStyleProfile,
    loadStyleProfiles,
    upsertStyleProfile,
} from '../../shared/services/ai/siteStyleStore.js';
import { createButton } from '../../shared/ui/components/button.js';
import { showConfirmationModal } from '../../shared/ui/components/confirmationModal.js';
import { createDisclosure } from '../../shared/ui/components/disclosure.js';
import { createCustomSelectField, createTextField } from '../../shared/ui/components/formField.js';
import { createIconTitle } from '../../shared/ui/components/iconTitle.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { createNumericInput } from '../../shared/ui/components/numericInput.js';
import { createToggleSwitch } from '../../shared/ui/components/toggleSwitch.js';
import { addIcon } from '../../assets/icons/addIcon.js';
import { aiIcon } from '../../assets/icons/aiIcon.js';
import { budgetIcon } from '../../assets/icons/budgetIcon.js';
import { clearIcon } from '../../assets/icons/clearIcon.js';
import { deleteIcon } from '../../assets/icons/deleteIcon.js';
import { jsonIcon } from '../../assets/icons/jsonIcon.js';
import languageIcon from '../../assets/icons/languageIcon.js';
import { pauseIcon } from '../../assets/icons/pauseIcon.js';
import { resetIcon } from '../../assets/icons/resetIcon.js';
import { saveIcon } from '../../assets/icons/saveIcon.js';
import { settingsIcon } from '../../assets/icons/settingsIcon.js';
import { speedIcon } from '../../assets/icons/speedIcon.js';
import { themeIcon } from '../../assets/icons/themeIcon.js';
import { warningIcon } from '../../assets/icons/warningIcon.js';
import { infoIcon } from '../../assets/icons/infoIcon.js';
import { t } from '../../shared/i18n/index.js';
import { loadSettings, saveSettings } from './logic.js';

function localizedOptions(options) {
    return options.map(({ labelKey, ...option }) => ({ ...option, label: t(labelKey) }));
}

function createSelectField(id, labelKey, options, value) {
    return createCustomSelectField(id, t(labelKey), localizedOptions(options), value);
}

function createNumberField(id, labelKey, value, options) {
    const element = createNumericInput(id, t(labelKey), value, options);
    element.classList.add('ai-number-field');
    return { element, input: element.querySelector('input[type="number"]') };
}

function createSection(titleKey, icon) {
    const section = document.createElement('section');
    section.className = 'ai-settings-section';

    const header = document.createElement('header');
    header.className = 'ai-section-header setting-title-container';
    header.appendChild(createIconTitle(icon, t(titleKey)));

    const body = document.createElement('div');
    body.className = 'ai-section-body';
    section.append(header, body);
    return { section, body };
}

function numberValue(input, fallback) {
    const value = Number(input.value);
    return Number.isFinite(value) ? value : fallback;
}

/**
 * Mount AI settings inside the existing settings modal. API keys remain in
 * independent Tampermonkey storage and are never included in normal settings.
 * @param {HTMLElement} container
 * @param {object} currentAiSettings
 * @returns {{getSettings: () => Promise<object>, destroy: () => void}}
 */
export function mountAiSettingsPanel(container, currentAiSettings) {
    const settings = mergeAiSettings(currentAiSettings);
    let providers = settings.providers.map((provider) => ({ ...provider }));
    let activeProviderId = settings.activeProviderId;
    const providerKeys = new Map();
    const deletedProviderIds = new Set();
    const buttons = [];
    const selects = [];
    const lifecycle = new AbortController();
    const { signal } = lifecycle;
    let isDestroyed = false;

    const registerSelect = (field) => {
        selects.push(field.select);
        return field;
    };

    const aiEnabled = createToggleSwitch(
        'ai-feature-enabled',
        t('settings.ai.enabled'),
        t('settings.ai.enabledDescription'),
        settings.enabled
    );
    const aiBetaBadge = document.createElement('span');
    aiBetaBadge.className = 'ai-beta-badge';
    aiBetaBadge.textContent = t('settings.ai.betaBadge');
    aiEnabled.element.querySelector('.tc-toggle-title')?.append(aiBetaBadge);
    const aiBetaNotice = createIconTitle(warningIcon, t('settings.ai.betaNotice'));
    aiBetaNotice.classList.add('settings-info-notice', 'ai-beta-notice');
    aiBetaNotice.setAttribute('role', 'note');
    aiBetaNotice.firstElementChild?.classList.add('settings-info-notice-icon');
    const aiControls = document.createElement('div');
    aiControls.className = 'ai-settings-controls';

    function syncAiControlsAvailability() {
        const disabled = !aiEnabled.input.checked;
        aiControls.classList.toggle('is-disabled', disabled);
        aiControls.setAttribute('aria-disabled', String(disabled));
        aiControls.inert = disabled;
    }
    aiEnabled.input.addEventListener('change', syncAiControlsAvailability, { signal });

    const general = createSection('settings.ai.general', aiIcon);
    const generalGrid = document.createElement('div');
    generalGrid.className = 'ai-form-grid ai-general-grid';
    const mode = registerSelect(
        createSelectField(
            'ai-processing-mode',
            'settings.ai.processingMode',
            [
                { value: AI_PROCESSING_MODES.MANUAL, labelKey: 'settings.ai.manual', icon: pauseIcon },
                { value: AI_PROCESSING_MODES.AUTO, labelKey: 'settings.ai.automatic', icon: aiIcon },
            ],
            settings.processingMode
        )
    );
    const target = registerSelect(
        createSelectField(
            'ai-target-language',
            'settings.ai.targetLanguage',
            [
                {
                    value: AI_TARGET_LANGUAGES.SIMPLIFIED_CHINESE,
                    labelKey: 'settings.ai.simplifiedChinese',
                    icon: languageIcon,
                },
                {
                    value: AI_TARGET_LANGUAGES.TRADITIONAL_CHINESE,
                    labelKey: 'settings.ai.traditionalChinese',
                    icon: languageIcon,
                },
            ],
            settings.targetLanguage
        )
    );
    const confidence = createNumberField(
        'ai-confidence-threshold',
        'settings.ai.confidenceThreshold',
        settings.confidenceThreshold,
        { min: 0.5, max: 1, step: 0.01 }
    );
    const regexRuleComments = createToggleSwitch(
        'ai-regex-rule-comments',
        t('settings.ai.regexRuleComments'),
        t('settings.ai.regexRuleCommentsDescription'),
        settings.includeRegexRuleComments
    );
    generalGrid.append(mode.element, target.element, confidence.element);
    general.body.append(generalGrid, regexRuleComments.element);

    const provider = createSection('settings.ai.provider', settingsIcon);
    const providerToolbar = document.createElement('div');
    providerToolbar.className = 'ai-provider-toolbar';
    const providerPicker = registerSelect(
        createCustomSelectField(
            'ai-active-provider',
            t('settings.ai.currentProvider'),
            providers.map((item) => ({ value: item.id, label: item.name, icon: settingsIcon })),
            activeProviderId
        )
    );
    providerPicker.element.classList.add('ai-provider-picker');
    const providerToolbarActions = document.createElement('div');
    providerToolbarActions.className = 'ai-compact-actions';
    providerToolbar.append(providerPicker.element, providerToolbarActions);

    const providerName = createTextField('ai-provider-name', t('settings.ai.providerName'));
    const providerUrl = createTextField('ai-provider-url', t('settings.ai.apiUrl'), '', { type: 'url' });
    const providerModel = createTextField('ai-provider-model', t('settings.ai.model'));
    const responseMode = registerSelect(
        createSelectField(
            'ai-response-mode',
            'settings.ai.responseMode',
            [
                { value: AI_RESPONSE_MODES.JSON, labelKey: 'settings.ai.jsonMode', icon: jsonIcon },
                { value: AI_RESPONSE_MODES.PROMPT_JSON, labelKey: 'settings.ai.promptJson', icon: jsonIcon },
            ],
            AI_RESPONSE_MODES.JSON
        )
    );
    const apiKey = createTextField('ai-provider-key', t('settings.ai.apiKey'), '', {
        type: 'password',
        autocomplete: 'off',
    });
    providerUrl.element.classList.add('ai-field-wide');

    const providerForm = document.createElement('div');
    providerForm.className = 'ai-form-grid ai-provider-form';
    providerForm.append(providerName.element, providerModel.element, providerUrl.element, responseMode.element);

    const providerFooter = document.createElement('div');
    providerFooter.className = 'ai-action-footer ai-provider-footer';
    providerFooter.hidden = true;
    const providerStatus = document.createElement('div');
    providerStatus.className = 'ai-provider-status';
    providerStatus.setAttribute('aria-live', 'polite');
    const providerTestDescription = createIconTitle(infoIcon, t('settings.ai.testDescription'));
    providerTestDescription.classList.add('settings-info-notice', 'ai-provider-test-description');
    providerTestDescription.setAttribute('role', 'note');
    providerTestDescription.firstElementChild?.classList.add('settings-info-notice-icon');

    function setProviderStatus(message = '', state = '') {
        providerStatus.textContent = message;
        providerStatus.dataset.state = state;
        providerFooter.hidden = !message;
    }

    function activeProvider() {
        return providers.find((item) => item.id === activeProviderId) || providers[0];
    }

    function syncProviderFromForm() {
        const index = providers.findIndex((item) => item.id === activeProviderId);
        if (index < 0) return;
        providers[index] = normalizeProvider(
            {
                ...providers[index],
                name: providerName.input.value,
                apiUrl: providerUrl.input.value,
                model: providerModel.input.value,
                responseMode: responseMode.select.getValue(),
            },
            index
        );
        providerKeys.set(activeProviderId, apiKey.input.value);
    }

    async function persistProviderKeys() {
        await Promise.all(Array.from(providerKeys, ([id, key]) => saveProviderApiKey(id, key || '')));
        await Promise.all(Array.from(deletedProviderIds, (id) => deleteProviderApiKey(id)));
        deletedProviderIds.clear();
    }

    async function persistProviderConfiguration() {
        syncProviderFromForm();
        await persistProviderKeys();
        const storedSettings = loadSettings();
        saveSettings({
            ai: mergeAiSettings({
                ...storedSettings.ai,
                activeProviderId,
                providers,
            }),
        });
        showNotification(t('notifications.aiProviderSaved'), { type: 'success' });
    }

    async function renderProviderForm() {
        const active = activeProvider();
        if (!active) return;
        activeProviderId = active.id;
        providerPicker.select.updateOptions(
            providers.map((item) => ({ value: item.id, label: item.name, icon: settingsIcon }))
        );
        providerPicker.select.setValue(activeProviderId);
        providerName.input.value = active.name;
        providerUrl.input.value = active.apiUrl;
        providerModel.input.value = active.model;
        responseMode.select.setValue(active.responseMode);
        setProviderStatus();
        deleteProviderBtn.disabled = providers.length <= 1;

        const cachedKey = providerKeys.get(active.id);
        apiKey.input.value = cachedKey || '';
        if (!providerKeys.has(active.id)) {
            const untouchedValue = apiKey.input.value;
            const storedKey = await loadProviderApiKey(active.id);
            if (isDestroyed) return;
            providerKeys.set(active.id, storedKey);
            if (activeProviderId === active.id && apiKey.input.value === untouchedValue) {
                apiKey.input.value = storedKey || '';
            }
        }
    }

    providerPicker.select.container.addEventListener(
        'custom-select-change',
        (event) => {
            syncProviderFromForm();
            activeProviderId = event.detail.value;
            void renderProviderForm();
        },
        { signal }
    );

    const addProviderBtn = createButton({
        textKey: 'settings.ai.addProvider',
        icon: addIcon,
        onClick: () => {
            syncProviderFromForm();
            const id = `custom-${Date.now()}-${providers.length}`;
            providers.push(normalizeProvider({ id, name: t('settings.ai.newProvider') }, providers.length));
            activeProviderId = id;
            void renderProviderForm();
        },
    });
    const deleteProviderBtn = createButton({
        textKey: 'common.delete',
        icon: deleteIcon,
        onClick: async () => {
            if (providers.length <= 1) return;
            const confirmed = await showConfirmationModal(t('confirmation.deleteProvider'), warningIcon);
            if (!confirmed) return;
            deletedProviderIds.add(activeProviderId);
            providerKeys.delete(activeProviderId);
            providers = providers.filter((item) => item.id !== activeProviderId);
            activeProviderId = providers[0].id;
            await renderProviderForm();
        },
    });
    const testProviderBtn = createButton({
        textKey: 'settings.ai.testConnection',
        icon: speedIcon,
        onClick: async () => {
            syncProviderFromForm();
            setProviderStatus(t('settings.ai.testing'), 'pending');
            testProviderBtn.disabled = true;
            try {
                const result = await testProviderProcessing({
                    provider: activeProvider(),
                    apiKey: apiKey.input.value,
                    timeoutMs: numberValue(timeout.input, settings.requestTimeoutMs / 1000) * 1000,
                    targetLanguage: target.select.getValue(),
                    confidenceThreshold: numberValue(confidence.input, settings.confidenceThreshold),
                });
                setProviderStatus(
                    `${t('settings.ai.processingOk')}: ${result.translation} · ${result.latencyMs} ms`,
                    'success'
                );
            } catch (error) {
                setProviderStatus(
                    `${t('settings.ai.connectionFailed')}: ${error?.code || error?.message || 'unknown'}`,
                    'error'
                );
            } finally {
                testProviderBtn.disabled = false;
            }
        },
    });
    const saveProviderBtn = createButton({
        textKey: 'settings.ai.saveProvider',
        icon: saveIcon,
        onClick: async () => {
            saveProviderBtn.disabled = true;
            try {
                await persistProviderConfiguration();
            } catch (error) {
                setProviderStatus(
                    `${t('settings.ai.connectionFailed')}: ${error?.code || error?.message || 'storage'}`,
                    'error'
                );
            } finally {
                saveProviderBtn.disabled = false;
            }
        },
    });
    buttons.push(addProviderBtn, deleteProviderBtn, testProviderBtn, saveProviderBtn);
    providerToolbarActions.append(addProviderBtn, deleteProviderBtn);
    const providerKeyRow = document.createElement('div');
    providerKeyRow.className = 'ai-provider-key-row';
    providerKeyRow.append(apiKey.element, testProviderBtn, saveProviderBtn);
    providerFooter.append(providerStatus);
    provider.body.append(providerToolbar, providerForm, providerKeyRow, providerTestDescription, providerFooter);

    const budget = createSection('settings.ai.costControl', budgetIcon);
    const budgetGrid = document.createElement('div');
    budgetGrid.className = 'ai-form-grid ai-budget-grid';
    const maxBatchItems = createNumberField(
        'ai-max-batch-items',
        'settings.ai.maxBatchItems',
        settings.batch.maxItems,
        { min: 1, max: 500 }
    );
    const maxBatchCharacters = createNumberField(
        'ai-max-batch-characters',
        'settings.ai.maxBatchCharacters',
        settings.batch.maxCharacters,
        { min: 500, max: 200000 }
    );
    const maxOutputTokens = createNumberField(
        'ai-max-output-tokens',
        'settings.ai.maxOutputTokens',
        settings.batch.maxEstimatedOutputTokens,
        { min: 4096, max: 131072 }
    );
    const maxRequests = createNumberField(
        'ai-max-page-requests',
        'settings.ai.maxRequests',
        settings.budget.maxRequestsPerSession,
        { min: 1, max: 500 }
    );
    const maxCharacters = createNumberField(
        'ai-max-page-characters',
        'settings.ai.maxPageCharacters',
        settings.budget.maxCharactersPerSession,
        { min: 1000, max: 1000000 }
    );
    const dailyTokens = createNumberField(
        'ai-daily-token-limit',
        'settings.ai.dailyTokens',
        settings.budget.maxEstimatedTokensPerDay,
        { min: 1000, max: 10000000 }
    );
    const timeout = createNumberField('ai-request-timeout', 'settings.ai.timeout', settings.requestTimeoutMs / 1000, {
        min: 5,
        max: 120,
    });
    budgetGrid.append(
        maxBatchItems.element,
        maxBatchCharacters.element,
        maxOutputTokens.element,
        maxRequests.element,
        maxCharacters.element,
        dailyTokens.element,
        timeout.element
    );
    const resetUsageBtn = createButton({
        textKey: 'settings.ai.resetDailyUsage',
        icon: resetIcon,
        onClick: async () => {
            await resetDailyUsage();
            showNotification(t('notifications.aiDailyUsageReset'), { type: 'success' });
        },
    });
    const restoreDefaultsBtn = createButton({
        textKey: 'settings.ai.restoreDefaults',
        icon: resetIcon,
        onClick: () => {
            maxBatchItems.input.value = AI_DEFAULT_SETTINGS.batch.maxItems;
            maxBatchCharacters.input.value = AI_DEFAULT_SETTINGS.batch.maxCharacters;
            maxOutputTokens.input.value = AI_DEFAULT_SETTINGS.batch.maxEstimatedOutputTokens;
            maxRequests.input.value = AI_DEFAULT_SETTINGS.budget.maxRequestsPerSession;
            maxCharacters.input.value = AI_DEFAULT_SETTINGS.budget.maxCharactersPerSession;
            dailyTokens.input.value = AI_DEFAULT_SETTINGS.budget.maxEstimatedTokensPerDay;
            timeout.input.value = AI_DEFAULT_SETTINGS.requestTimeoutMs / 1000;
            showNotification(t('notifications.aiDefaultsRestored'), { type: 'success' });
        },
    });
    buttons.push(resetUsageBtn, restoreDefaultsBtn);
    const budgetFooter = document.createElement('div');
    budgetFooter.className = 'ai-action-footer ai-action-footer-end';
    budgetFooter.appendChild(resetUsageBtn);
    budgetFooter.appendChild(restoreDefaultsBtn);
    budget.body.append(budgetGrid, budgetFooter);

    const styles = createSection('settings.ai.siteStyles', themeIcon);
    const stylesDescription = createIconTitle(infoIcon, t('settings.ai.siteStylesDescription'));
    stylesDescription.classList.add('settings-info-notice', 'ai-style-description');
    stylesDescription.setAttribute('role', 'note');
    stylesDescription.firstElementChild?.classList.add('settings-info-notice-icon');
    const styleToolbar = document.createElement('div');
    styleToolbar.className = 'ai-style-toolbar';
    const styleSearch = createTextField('ai-style-search', t('settings.ai.searchStyles'), '', { type: 'search' });
    const styleSort = registerSelect(
        createSelectField(
            'ai-style-sort',
            'settings.ai.sortStyles',
            [
                { value: 'recent', labelKey: 'settings.ai.sortRecent' },
                { value: 'origin', labelKey: 'settings.ai.sortOrigin' },
            ],
            'recent'
        )
    );
    styleToolbar.append(styleSearch.element, styleSort.element);

    const styleWorkspace = document.createElement('div');
    styleWorkspace.className = 'ai-style-workspace';
    const styleLibrary = document.createElement('div');
    styleLibrary.className = 'ai-style-library';
    const styleLibraryTitle = document.createElement('div');
    styleLibraryTitle.className = 'ai-subsection-title';
    styleLibraryTitle.appendChild(createIconTitle(themeIcon, t('settings.ai.styleLibrary')));
    const styleList = document.createElement('div');
    styleList.className = 'ai-style-list';

    const styleEditor = document.createElement('div');
    styleEditor.className = 'ai-style-editor';
    const styleEditorTitle = document.createElement('div');
    styleEditorTitle.className = 'ai-subsection-title';
    styleEditorTitle.appendChild(createIconTitle(settingsIcon, t('settings.ai.styleEditor')));
    const origin = createTextField('ai-style-origin', t('settings.ai.styleOrigin'), window.location.origin);
    const pathPrefix = createTextField('ai-style-path', t('settings.ai.stylePath'), '/');
    const styleTarget = registerSelect(
        createSelectField(
            'ai-style-target',
            'settings.ai.targetLanguage',
            [
                { value: 'zh-CN', labelKey: 'settings.ai.simplifiedChinese', icon: languageIcon },
                { value: 'zh-TW', labelKey: 'settings.ai.traditionalChinese', icon: languageIcon },
            ],
            settings.targetLanguage
        )
    );
    const tone = createTextField('ai-style-tone', t('settings.ai.styleTone'), t('settings.ai.defaultStyleTone'));
    const glossary = createTextField('ai-style-glossary', t('settings.ai.styleGlossary'), '', { rows: 4 });
    const punctuation = createTextField(
        'ai-style-punctuation',
        t('settings.ai.stylePunctuation'),
        t('settings.ai.defaultStylePunctuation')
    );
    const instructions = createTextField('ai-style-instructions', t('settings.ai.styleInstructions'), '', {
        rows: 4,
    });
    tone.element.classList.add('ai-field-wide');
    glossary.element.classList.add('ai-field-wide');
    instructions.element.classList.add('ai-field-wide');

    const styleForm = document.createElement('div');
    styleForm.className = 'ai-form-grid ai-style-form';
    styleForm.append(tone.element, glossary.element, instructions.element);

    const advancedStyleSettings = createDisclosure({
        id: 'ai-style-advanced',
        title: t('settings.ai.advancedStyleSettings'),
        icon: settingsIcon,
    });
    advancedStyleSettings.element.classList.add('ai-style-advanced');
    const advancedStyleForm = document.createElement('div');
    advancedStyleForm.className = 'ai-form-grid ai-style-advanced-form';
    advancedStyleForm.append(origin.element, pathPrefix.element, styleTarget.element, punctuation.element);
    advancedStyleSettings.content.appendChild(advancedStyleForm);

    let styleProfiles = [];
    let editingStyleId = null;

    function updateStyleActionState() {
        deleteStyleBtn.disabled = !editingStyleId;
        clearStylesBtn.disabled = styleProfiles.length === 0;
    }

    function resetStyleForm() {
        editingStyleId = null;
        origin.input.value = window.location.origin;
        pathPrefix.input.value = '/';
        styleTarget.select.setValue(target.select.getValue());
        tone.input.value = t('settings.ai.defaultStyleTone');
        glossary.input.value = '';
        punctuation.input.value = t('settings.ai.defaultStylePunctuation');
        instructions.input.value = '';
        advancedStyleSettings.setExpanded(false);
        updateStyleActionState();
        renderStyles();
    }

    function editStyle(profile) {
        editingStyleId = profile.id;
        origin.input.value = profile.origin;
        pathPrefix.input.value = profile.pathPrefix;
        styleTarget.select.setValue(profile.targetLanguage);
        tone.input.value = profile.tone;
        glossary.input.value = profile.glossary;
        punctuation.input.value = profile.punctuation;
        instructions.input.value = profile.instructions;
        advancedStyleSettings.setExpanded(
            profile.origin !== window.location.origin ||
                profile.pathPrefix !== '/' ||
                profile.targetLanguage !== target.select.getValue() ||
                profile.punctuation !== t('settings.ai.defaultStylePunctuation')
        );
        updateStyleActionState();
        renderStyles();
    }

    function renderStyles() {
        const query = styleSearch.input.value.trim().toLocaleLowerCase();
        const visible = styleProfiles.filter(
            (profile) =>
                !query ||
                [profile.origin, profile.pathPrefix, profile.tone, profile.glossary].some((value) =>
                    String(value).toLocaleLowerCase().includes(query)
                )
        );
        visible.sort(
            styleSort.select.getValue() === 'origin'
                ? (left, right) => left.origin.localeCompare(right.origin)
                : (left, right) => right.updatedAt - left.updatedAt
        );
        styleList.replaceChildren();
        visible.forEach((profile) => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'ai-style-row';
            row.classList.toggle('is-active', profile.id === editingStyleId);
            row.setAttribute('aria-pressed', String(profile.id === editingStyleId));
            row.appendChild(createIconTitle(themeIcon, `${profile.origin}${profile.pathPrefix}`));
            const language = document.createElement('span');
            language.className = 'ai-style-row-meta';
            language.textContent = profile.targetLanguage;
            row.appendChild(language);
            row.addEventListener('click', () => editStyle(profile));
            styleList.appendChild(row);
        });
        if (visible.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'ai-style-empty';
            empty.textContent = t('settings.ai.noStyles');
            styleList.appendChild(empty);
        }
        updateStyleActionState();
    }

    styleSearch.input.addEventListener('input', renderStyles, { signal });
    styleSort.select.container.addEventListener('custom-select-change', renderStyles, { signal });

    const saveStyleBtn = createButton({
        textKey: 'settings.ai.saveStyle',
        icon: saveIcon,
        onClick: async () => {
            if (!origin.input.value.trim()) {
                showNotification(t('notifications.aiStyleOriginRequired'), { type: 'error' });
                return;
            }
            try {
                await upsertStyleProfile({
                    id: editingStyleId,
                    origin: origin.input.value,
                    pathPrefix: pathPrefix.input.value,
                    targetLanguage: styleTarget.select.getValue(),
                    tone: tone.input.value,
                    glossary: glossary.input.value,
                    punctuation: punctuation.input.value,
                    instructions: instructions.input.value,
                });
            } catch {
                showNotification(t('notifications.aiStyleOriginRequired'), { type: 'error' });
                return;
            }
            styleProfiles = await loadStyleProfiles();
            resetStyleForm();
            showNotification(t('notifications.aiStyleSaved'), { type: 'success' });
        },
    });
    const resetStyleBtn = createButton({
        textKey: 'settings.ai.useCurrentSite',
        icon: resetIcon,
        onClick: resetStyleForm,
    });
    const deleteStyleBtn = createButton({
        textKey: 'common.delete',
        icon: deleteIcon,
        disabled: true,
        onClick: async () => {
            if (!editingStyleId) return;
            const confirmed = await showConfirmationModal(t('confirmation.deleteStyle'), warningIcon);
            if (!confirmed) return;
            await deleteStyleProfile(editingStyleId);
            styleProfiles = await loadStyleProfiles();
            resetStyleForm();
        },
    });
    const clearStylesBtn = createButton({
        textKey: 'settings.ai.clearStyles',
        icon: clearIcon,
        disabled: true,
        onClick: async () => {
            const confirmed = await showConfirmationModal(t('confirmation.clearStyles'), warningIcon);
            if (!confirmed) return;
            await clearStyleProfiles();
            styleProfiles = [];
            resetStyleForm();
        },
    });
    buttons.push(saveStyleBtn, resetStyleBtn, deleteStyleBtn, clearStylesBtn);

    const styleLibraryFooter = document.createElement('div');
    styleLibraryFooter.className = 'ai-style-library-footer';
    styleLibraryFooter.appendChild(clearStylesBtn);
    styleLibrary.append(styleLibraryTitle, styleList, styleLibraryFooter);

    const styleActions = document.createElement('div');
    styleActions.className = 'ai-action-footer ai-style-actions';
    styleActions.append(resetStyleBtn, deleteStyleBtn, saveStyleBtn);
    styleEditor.append(styleEditorTitle, styleForm, advancedStyleSettings.element, styleActions);
    styleWorkspace.append(styleLibrary, styleEditor);
    styles.body.append(stylesDescription, styleToolbar, styleWorkspace);

    aiControls.append(general.section, provider.section, budget.section, styles.section);
    container.append(aiEnabled.element, aiBetaNotice, aiControls);
    syncAiControlsAvailability();
    void renderProviderForm();
    void loadStyleProfiles().then((profiles) => {
        if (isDestroyed) return;
        styleProfiles = profiles;
        renderStyles();
    });

    return {
        async getSettings() {
            syncProviderFromForm();
            await persistProviderKeys();
            return mergeAiSettings({
                enabled: aiEnabled.input.checked,
                processingMode: mode.select.getValue(),
                targetLanguage: target.select.getValue(),
                confidenceThreshold: numberValue(confidence.input, settings.confidenceThreshold),
                includeRegexRuleComments: regexRuleComments.input.checked,
                activeProviderId,
                providers,
                requestTimeoutMs: numberValue(timeout.input, settings.requestTimeoutMs / 1000) * 1000,
                batch: {
                    maxItems: numberValue(maxBatchItems.input, settings.batch.maxItems),
                    maxCharacters: numberValue(maxBatchCharacters.input, settings.batch.maxCharacters),
                    maxEstimatedOutputTokens: numberValue(
                        maxOutputTokens.input,
                        settings.batch.maxEstimatedOutputTokens
                    ),
                    debounceMs: settings.batch.debounceMs,
                },
                budget: {
                    maxRequestsPerSession: numberValue(maxRequests.input, settings.budget.maxRequestsPerSession),
                    maxCharactersPerSession: numberValue(maxCharacters.input, settings.budget.maxCharactersPerSession),
                    maxEstimatedTokensPerDay: numberValue(dailyTokens.input, settings.budget.maxEstimatedTokensPerDay),
                },
            });
        },
        destroy() {
            isDestroyed = true;
            lifecycle.abort();
            selects.forEach((select) => select.destroy());
            buttons.forEach((button) => button.destroy?.());
            advancedStyleSettings.destroy();
        },
    };
}
