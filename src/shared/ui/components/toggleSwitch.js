/**
 * Creates an accessible, reusable settings switch.
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @param {boolean} checked
 * @returns {{element: HTMLElement, input: HTMLInputElement}}
 */
export function createToggleSwitch(id, title, description, checked = false) {
    const input = document.createElement('input');
    input.id = id;
    input.className = 'tc-toggle-input';
    input.type = 'checkbox';
    input.setAttribute('role', 'switch');
    input.setAttribute('aria-describedby', `${id}-description`);
    input.checked = Boolean(checked);

    const titleElement = document.createElement('span');
    titleElement.className = 'tc-toggle-title';
    titleElement.textContent = title;
    const descriptionElement = document.createElement('span');
    descriptionElement.id = `${id}-description`;
    descriptionElement.className = 'tc-toggle-description';
    descriptionElement.textContent = description;
    const copy = document.createElement('span');
    copy.className = 'tc-toggle-copy';
    copy.append(titleElement, descriptionElement);
    const control = document.createElement('span');
    control.className = 'tc-toggle-control';
    control.setAttribute('aria-hidden', 'true');
    const element = document.createElement('label');
    element.className = 'tc-toggle-setting';
    element.append(copy, input, control);

    return { element, input };
}
