import {
    clearStyleProfiles,
    deleteStyleProfile,
    loadStyleProfiles,
    upsertStyleProfile,
} from '../../../shared/services/ai/siteStyleStore.js';
import { createButton } from '../../../shared/ui/components/button.js';
import { showConfirmationModal } from '../../../shared/ui/components/confirmationModal.js';
import { createDisclosure } from '../../../shared/ui/components/disclosure.js';
import { createTextField } from '../../../shared/ui/components/formField.js';
import { createIconTitle } from '../../../shared/ui/components/iconTitle.js';
import { showNotification } from '../../../shared/ui/components/notification.js';
import languageIcon from '../../../assets/icons/languageIcon.js';
import { clearIcon } from '../../../assets/icons/clearIcon.js';
import { deleteIcon } from '../../../assets/icons/deleteIcon.js';
import { infoIcon } from '../../../assets/icons/infoIcon.js';
import { resetIcon } from '../../../assets/icons/resetIcon.js';
import { saveIcon } from '../../../assets/icons/saveIcon.js';
import { settingsIcon } from '../../../assets/icons/settingsIcon.js';
import { themeIcon } from '../../../assets/icons/themeIcon.js';
import { warningIcon } from '../../../assets/icons/warningIcon.js';
import { t } from '../../../shared/i18n/index.js';
import { createSection, createSelectField } from './helpers.js';

/**
 * Mount the saved site-style library and editor used by the AI settings tab.
 * @param {object} options
 * @param {object} options.settings
 * @param {object} options.target
 * @param {(field: object) => object} options.registerSelect
 * @param {(button: object) => object} options.registerButton
 * @param {AbortSignal} options.signal
 * @param {() => boolean} options.isDestroyed
 * @returns {{element: HTMLElement, destroy: () => void}}
 */
export function mountSiteStylesSection({ settings, target, registerSelect, registerButton, signal, isDestroyed }) {
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
            row.addEventListener('click', () => editStyle(profile), { signal });
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

    const saveStyleBtn = registerButton(
        createButton({
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
        })
    );
    const resetStyleBtn = registerButton(
        createButton({
            textKey: 'settings.ai.useCurrentSite',
            icon: resetIcon,
            onClick: resetStyleForm,
        })
    );
    const deleteStyleBtn = registerButton(
        createButton({
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
        })
    );
    const clearStylesBtn = registerButton(
        createButton({
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
        })
    );

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

    void loadStyleProfiles().then((profiles) => {
        if (isDestroyed()) return;
        styleProfiles = profiles;
        renderStyles();
    });

    return {
        element: styles.section,
        destroy() {
            advancedStyleSettings.destroy();
        },
    };
}
