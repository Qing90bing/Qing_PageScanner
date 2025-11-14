import { buildScanModePanelDOM } from './panelBuilder.js';
import { t } from '../../shared/i18n/index.js';

/**
 * @module features/scan-settings/ui
 * @description Manages the UI for the contextual scan settings panel.
 */

let overlay = null;

/**
 * Opens the settings panel for a specific scan mode.
 * @param {string} scanType - The type of scan ('dynamic' or 'element').
 * @param {object} currentSettings - The complete settings object.
 * @param {function(object):void} onSave - Callback function to execute when settings are saved.
 */
export function openScanModeSettings(scanType, currentSettings, onSave) {
    if (overlay) {
        return; // Panel is already open
    }

    // Create Overlay
    overlay = document.createElement('div');
    overlay.className = 'settings-panel-overlay';

    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'settings-panel-modal';
    overlay.appendChild(modal);

    // Build and append panel content
    const scanSettings = scanType === 'dynamic'
        ? currentSettings.dynamicScanSettings
        : currentSettings.elementScanSettings;

    const panelDOM = buildScanModePanelDOM(scanType, scanSettings);
    modal.appendChild(panelDOM);

    // Create and append footer with Save button
    const footer = document.createElement('div');
    footer.className = 'settings-panel-footer';
    const saveButton = document.createElement('button');
    saveButton.className = 'save-button';
    saveButton.textContent = t('common.save');
    footer.appendChild(saveButton);
    modal.appendChild(footer);


    // Append to the shadow DOM
    const shadowRoot = document.querySelector('.text-extractor-container')?.shadowRoot;
    if (shadowRoot) {
        shadowRoot.appendChild(overlay);
    } else {
        document.body.appendChild(overlay); // Fallback
    }


    const removePanel = () => {
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
    };

    // Event Listeners
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            removePanel();
        }
    });

    saveButton.addEventListener('click', () => {
        const checkbox = panelDOM.querySelector('#persist-data-checkbox');
        const isChecked = checkbox.checked;

        const newSettings = { ...currentSettings };
        if (scanType === 'dynamic') {
            newSettings.dynamicScanSettings.persistDataAcrossPages = isChecked;
        } else {
            newSettings.elementScanSettings.persistDataAcrossPages = isChecked;
        }

        onSave(newSettings);
        removePanel();
    });

    // ESC key to close
    const keydownHandler = (e) => {
        if (e.key === 'Escape') {
            removePanel();
            document.removeEventListener('keydown', keydownHandler);
        }
    };
    document.addEventListener('keydown', keydownHandler);
}
