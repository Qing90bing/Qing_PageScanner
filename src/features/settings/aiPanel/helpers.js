import { createCustomSelectField } from '../../../shared/ui/components/formField.js';
import { createIconTitle } from '../../../shared/ui/components/iconTitle.js';
import { createNumericInput } from '../../../shared/ui/components/numericInput.js';
import { t } from '../../../shared/i18n/index.js';

export function localizedOptions(options) {
    return options.map(({ labelKey, ...option }) => ({ ...option, label: t(labelKey) }));
}

export function createSelectField(id, labelKey, options, value) {
    return createCustomSelectField(id, t(labelKey), localizedOptions(options), value);
}

export function createNumberField(id, labelKey, value, options) {
    const element = createNumericInput(id, t(labelKey), value, options);
    element.classList.add('ai-number-field');
    return { element, input: element.querySelector('input[type="number"]') };
}

export function createSection(titleKey, icon) {
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

export function numberValue(input, fallback) {
    const value = Number(input.value);
    return Number.isFinite(value) ? value : fallback;
}
