import { arrowDownIcon } from '../../../assets/icons/arrowDownIcon.js';
import { createSVGFromString } from '../../utils/dom/dom.js';
import { createIconTitle } from './iconTitle.js';

/**
 * Creates an accessible disclosure section using the shared form geometry.
 * @param {object} options
 * @param {string} options.id
 * @param {string} options.title
 * @param {string} [options.icon]
 * @param {boolean} [options.expanded]
 * @returns {{element: HTMLDivElement, content: HTMLDivElement, setExpanded: (expanded: boolean) => void, destroy: () => void}}
 */
export function createDisclosure({ id, title, icon = '', expanded = false }) {
    const controller = new AbortController();
    const element = document.createElement('div');
    element.className = 'tc-disclosure';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'tc-disclosure-trigger';
    trigger.setAttribute('aria-controls', `${id}-content`);
    trigger.appendChild(createIconTitle(icon, title));

    const arrow = document.createElement('span');
    arrow.className = 'tc-disclosure-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    const arrowSvg = createSVGFromString(arrowDownIcon);
    if (arrowSvg) arrow.appendChild(arrowSvg);
    trigger.appendChild(arrow);

    const content = document.createElement('div');
    content.id = `${id}-content`;
    content.className = 'tc-disclosure-content';

    const setExpanded = (nextExpanded) => {
        const isExpanded = Boolean(nextExpanded);
        trigger.setAttribute('aria-expanded', String(isExpanded));
        content.hidden = !isExpanded;
    };

    trigger.addEventListener('click', () => setExpanded(trigger.getAttribute('aria-expanded') !== 'true'), {
        signal: controller.signal,
    });
    element.append(trigger, content);
    setExpanded(expanded);

    return {
        element,
        content,
        setExpanded,
        destroy: () => controller.abort(),
    };
}
