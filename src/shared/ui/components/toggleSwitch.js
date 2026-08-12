import { infoIcon } from '../../../assets/icons/infoIcon.js';
import { t } from '../../i18n/index.js';
import { createSVGFromString } from '../../utils/dom/dom.js';
import { infoTooltip } from './infoTooltip.js';

/**
 * Creates an accessible, reusable settings switch.
 * @param {string} id
 * @param {string} title
 * @param {string} [description]
 * @param {boolean} checked
 * @param {object} [tooltipConfig]
 * @returns {{element: HTMLElement, input: HTMLInputElement}}
 */
export function createToggleSwitch(id, title, description = '', checked = false, tooltipConfig = null) {
    const input = document.createElement('input');
    input.id = id;
    input.className = 'tc-toggle-input';
    input.type = 'checkbox';
    input.setAttribute('role', 'switch');
    input.checked = Boolean(checked);

    const titleElement = document.createElement('span');
    titleElement.className = 'tc-toggle-title';
    titleElement.textContent = title;
    const titleRow = document.createElement('span');
    titleRow.className = 'tc-toggle-title-row';
    titleRow.appendChild(titleElement);

    if (tooltipConfig?.text) {
        const infoIconElement = document.createElement('span');
        infoIconElement.className = 'info-icon';
        infoIconElement.setAttribute('role', 'button');
        infoIconElement.setAttribute('tabindex', '0');
        infoIconElement.setAttribute('aria-label', t(tooltipConfig.title));
        infoIconElement.appendChild(createSVGFromString(tooltipConfig.titleIcon || infoIcon));

        const showTooltip = (event) => {
            if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;

            event.preventDefault();
            event.stopPropagation();
            infoTooltip.show({
                ...tooltipConfig,
                title: t(tooltipConfig.title),
                text: t(tooltipConfig.text),
            });
        };

        infoIconElement.addEventListener('click', showTooltip);
        infoIconElement.addEventListener('keydown', showTooltip);
        titleRow.appendChild(infoIconElement);
    }

    const copy = document.createElement('span');
    copy.className = 'tc-toggle-copy';
    copy.appendChild(titleRow);

    if (description) {
        const descriptionElement = document.createElement('span');
        descriptionElement.id = `${id}-description`;
        descriptionElement.className = 'tc-toggle-description';
        descriptionElement.textContent = description;
        input.setAttribute('aria-describedby', `${id}-description`);
        copy.appendChild(descriptionElement);
    }

    const control = document.createElement('span');
    control.className = 'tc-toggle-control';
    control.setAttribute('aria-hidden', 'true');
    const element = document.createElement('label');
    element.className = 'tc-toggle-setting';
    element.htmlFor = id;
    element.append(copy, input, control);

    return { element, input };
}
