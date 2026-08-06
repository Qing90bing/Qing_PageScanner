import { CustomSelect } from './customSelect.js';

function createFieldShell(id, labelText, control) {
    const container = document.createElement('div');
    container.className = 'tc-field-group';

    const label = document.createElement('label');
    label.className = 'tc-field-label';
    label.htmlFor = id;
    label.textContent = labelText;

    container.append(label, control);
    return container;
}

/**
 * Create a reusable labelled text field using the shared form styles.
 * @param {string} id
 * @param {string} labelText
 * @param {string} value
 * @param {object} [options]
 * @param {string} [options.type]
 * @param {number} [options.rows]
 * @param {string} [options.autocomplete]
 * @param {boolean} [options.spellcheck]
 * @returns {{element: HTMLDivElement, input: HTMLInputElement|HTMLTextAreaElement}}
 */
export function createTextField(id, labelText, value = '', options = {}) {
    const { type = 'text', rows, autocomplete, spellcheck = false } = options;
    const input = rows ? document.createElement('textarea') : document.createElement('input');
    input.id = id;
    input.className = 'tc-text-input';
    input.value = value ?? '';
    input.spellcheck = spellcheck;

    if (rows) {
        input.rows = rows;
        input.classList.add('tc-text-input-multiline');
    } else {
        input.type = type;
    }
    if (autocomplete) {
        input.autocomplete = autocomplete;
    }

    return { element: createFieldShell(id, labelText, input), input };
}

/**
 * Create a labelled field around the project's CustomSelect component.
 * @param {string} id
 * @param {string} labelText
 * @param {Array<{value: string, label: string, icon?: string}>} options
 * @param {string} value
 * @returns {{element: HTMLDivElement, select: CustomSelect}}
 */
export function createCustomSelectField(id, labelText, options, value) {
    const mount = document.createElement('div');
    mount.className = 'tc-custom-select-mount';
    const select = new CustomSelect(mount, options, value);
    select.trigger.id = id;

    return { element: createFieldShell(id, labelText, mount), select };
}
