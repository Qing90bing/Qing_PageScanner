// src/features/element-scan/ui.js

import { uiContainer } from '../../shared/ui/uiContainer.js';
import { updateSelectionLevel, reselectElement, stopElementScan, confirmSelectionAndExtract } from './logic.js';
import { t } from '../../shared/i18n/index.js';
import { createTrustedHTML } from '../../shared/utils/trustedTypes.js';

let highlightOverlay = null;
let tagNameTooltip = null;
let toolbar = null;

function createHighlightElements() {
    if (!highlightOverlay) {
        highlightOverlay = document.createElement('div');
        highlightOverlay.id = 'element-scan-highlight';
        
        // The tooltip is now a child of the highlight overlay
        // to ensure they are positioned together.
        if (!tagNameTooltip) {
            tagNameTooltip = document.createElement('div');
            tagNameTooltip.id = 'element-scan-tag-name';
            highlightOverlay.appendChild(tagNameTooltip);
        }
        
        uiContainer.appendChild(highlightOverlay);
    }
    
    highlightOverlay.style.display = 'block';
}

export function updateHighlight(targetElement) {
    if (!targetElement) return;

    createHighlightElements();

    const rect = targetElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const padding = 6; // Add padding to prevent the border from obscuring content.

    highlightOverlay.style.width = `${rect.width + padding * 2}px`;
    highlightOverlay.style.height = `${rect.height + padding * 2}px`;
    highlightOverlay.style.top = `${rect.top + scrollY - padding}px`;
    highlightOverlay.style.left = `${rect.left + scrollX - padding}px`;

    const tagName = targetElement.tagName.toLowerCase();
    tagNameTooltip.textContent = tagName;
    // The tooltip position is now controlled by CSS relative to the highlight overlay.

    const toolbarTag = uiContainer.querySelector('#element-scan-toolbar-tag');
    if (toolbarTag) {
        toolbarTag.textContent = `<${tagName}>`;
    }
}

export function createAdjustmentToolbar(elementPath) {
    if (toolbar) cleanupToolbar();

    toolbar = document.createElement('div');
    toolbar.id = 'element-scan-toolbar';
    toolbar.innerHTML = createTrustedHTML(`
        <div id="element-scan-toolbar-tag">&lt;${elementPath[0].tagName.toLowerCase()}&gt;</div>
        <input type="range" id="element-scan-level-slider" min="0" max="${elementPath.length - 1}" value="0" />
        <div id="element-scan-toolbar-actions">
            <button id="element-scan-toolbar-reselect">${t('common.reselect')}</button>
            <button id="element-scan-toolbar-cancel">${t('common.cancel')}</button>
            <button id="element-scan-toolbar-confirm">${t('common.confirm')}</button>
        </div>
    `);
    uiContainer.appendChild(toolbar);

    // --- 新的定位逻辑 ---
    const initialRect = elementPath[0].getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 10; // 工具栏与元素/屏幕边缘的间距

    // 优先靠右对齐
    let left = initialRect.right - toolbarRect.width;
    if (left < margin) {
        left = margin; // 防止左侧超出
    }
    if (left + toolbarRect.width > viewportWidth - margin) {
        left = viewportWidth - toolbarRect.width - margin; // 防止右侧超出
    }

    const topAbove = initialRect.top - toolbarRect.height - margin;
    const topBelow = initialRect.bottom + margin;

    let top;
    const canPlaceAbove = topAbove > margin;
    const canPlaceBelow = topBelow + toolbarRect.height < viewportHeight - margin;

    if (canPlaceAbove) {
        top = topAbove;
    } else if (canPlaceBelow) {
        top = topBelow;
    } else {
        // 如果上下都放不下，则居中显示
        top = (viewportHeight - toolbarRect.height) / 2;
        left = (viewportWidth - toolbarRect.width) / 2;
    }

    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;

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
        const fabElement = uiContainer.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
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
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rect = element.getBoundingClientRect();

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // 限制拖动范围
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + rect.width > viewportWidth) newLeft = viewportWidth - rect.width;
        if (newTop + rect.height > viewportHeight) newTop = viewportHeight - rect.height;

        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    element.addEventListener('mousedown', onMouseDown);
}

export function cleanupUI() {
    // Hiding the parent overlay is sufficient, the child tooltip will be hidden with it.
    if (highlightOverlay) highlightOverlay.style.display = 'none';
}

export function cleanupToolbar() {
    if (toolbar) {
        toolbar.remove();
        toolbar = null;
    }
}
