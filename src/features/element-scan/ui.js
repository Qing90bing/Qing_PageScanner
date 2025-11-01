// src/features/element-scan/ui.js

import { uiContainer } from '../../shared/ui/uiContainer.js';
import { updateSelectionLevel, reselectElement, handleElementScanClick, confirmSelectionAndExtract } from './logic.js';
import { t } from '../../shared/i18n/index.js';

let highlightOverlay = null;
let tagNameTooltip = null;
let toolbar = null;

function createHighlightElements() {
    if (!highlightOverlay) {
        highlightOverlay = document.createElement('div');
        highlightOverlay.id = 'element-scan-highlight';
        uiContainer.appendChild(highlightOverlay);
    }
    if (!tagNameTooltip) {
        tagNameTooltip = document.createElement('div');
        tagNameTooltip.id = 'element-scan-tag-name';
        uiContainer.appendChild(tagNameTooltip);
    }
    highlightOverlay.style.display = 'block';
    tagNameTooltip.style.display = 'block';
}

export function updateHighlight(targetElement) {
    if (!targetElement) return;

    createHighlightElements();

    const rect = targetElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    highlightOverlay.style.width = `${rect.width}px`;
    highlightOverlay.style.height = `${rect.height}px`;
    highlightOverlay.style.top = `${rect.top + scrollY}px`;
    highlightOverlay.style.left = `${rect.left + scrollX}px`;

    const tagName = targetElement.tagName.toLowerCase();
    tagNameTooltip.textContent = tagName;
    tagNameTooltip.style.top = `${rect.bottom + scrollY + 5}px`;
    tagNameTooltip.style.left = `${rect.left + scrollX}px`;

    const toolbarTag = uiContainer.querySelector('#element-scan-toolbar-tag');
    if (toolbarTag) {
        toolbarTag.textContent = `<${tagName}>`;
    }
}

export function createAdjustmentToolbar(elementPath) {
    if (toolbar) cleanupToolbar();

    toolbar = document.createElement('div');
    toolbar.id = 'element-scan-toolbar';
    toolbar.innerHTML = `
        <div id="element-scan-toolbar-tag">&lt;${elementPath[0].tagName.toLowerCase()}&gt;</div>
        <input type="range" id="element-scan-level-slider" min="0" max="${elementPath.length - 1}" value="0" />
        <div id="element-scan-toolbar-actions">
            <button id="element-scan-toolbar-reselect">${t('common.reselect')}</button>
            <button id="element-scan-toolbar-cancel">${t('common.cancel')}</button>
            <button id="element-scan-toolbar-confirm">${t('common.confirm')}</button>
        </div>
    `;
    uiContainer.appendChild(toolbar);

    const initialRect = elementPath[0].getBoundingClientRect();
    toolbar.style.top = `${initialRect.top - 100}px`; // 留出更多空间
    toolbar.style.left = `${initialRect.left}px`;

    addToolbarEventListeners();
    makeDraggable(toolbar);
}

function addToolbarEventListeners() {
    const slider = uiContainer.querySelector('#element-scan-level-slider');
    const reselectBtn = uiContainer.querySelector('#element-scan-toolbar-reselect');
    const cancelBtn = uiContainer.querySelector('#element-scan-toolbar-cancel');
    const confirmBtn = uiContainer.querySelector('#element-scan-toolbar-confirm');

    slider.addEventListener('input', () => {
        updateSelectionLevel(slider.value);
    });

    reselectBtn.addEventListener('click', reselectElement);

    cancelBtn.addEventListener('click', () => {
        const fabElement = document.querySelector('.fab-element-scan');
        handleElementScanClick(fabElement);
    });

    confirmBtn.addEventListener('click', confirmSelectionAndExtract);
}

function makeDraggable(element) {
    let offsetX, offsetY;

    const onMouseDown = (e) => {
        if (e.target.id !== 'element-scan-toolbar' && e.target.id !== 'element-scan-toolbar-tag') return;
        e.preventDefault();
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    element.addEventListener('mousedown', onMouseDown);
}

export function cleanupUI() {
    if (highlightOverlay) highlightOverlay.style.display = 'none';
    if (tagNameTooltip) tagNameTooltip.style.display = 'none';
}

export function cleanupToolbar() {
    if (toolbar) {
        toolbar.remove();
        toolbar = null;
    }
}
