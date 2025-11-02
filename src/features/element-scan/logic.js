// src/features/element-scan/logic.js

import { updateHighlight, cleanupUI, createAdjustmentToolbar, cleanupToolbar } from './ui.js';
import { extractAndProcessTextFromElement } from '../../shared/utils/textProcessor.js';
import { updateModalContent } from '../../shared/ui/mainModal.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { t } from '../../shared/i18n/index.js';
import { simpleTemplate } from '../../shared/utils/templating.js';
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';

let isActive = false;
let isAdjusting = false;
let currentTarget = null;
let elementPath = [];

export function handleElementScanClick(fabElement) {
    if (isActive) {
        stopElementScan(fabElement);
    } else {
        startElementScan(fabElement);
    }
}

function startElementScan(fabElement) {
    isActive = true;
    isAdjusting = false;
    fabElement.classList.add('is-recording');
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true);
    document.addEventListener('keydown', handleElementScanKeyDown);
}

export function stopElementScan(fabElement) {
    isActive = false;
    isAdjusting = false;
    if (fabElement) {
        fabElement.classList.remove('is-recording');
    }
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleElementClick, true);
    document.removeEventListener('keydown', handleElementScanKeyDown);
    cleanupUI();
    cleanupToolbar();
    elementPath = [];
    currentTarget = null;
}

export function reselectElement() {
    isAdjusting = false;
    cleanupUI(); // 清理高亮边框
    cleanupToolbar();
    // 重新激活悬停监听
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true);
}

function handleMouseOver(event) {
    if (!isActive || isAdjusting) return;
    if (event.target.closest('.text-extractor-fab-container') || event.target.closest('#text-extractor-container')) {
        cleanupUI();
        currentTarget = null;
        return;
    }
    currentTarget = event.target;
    updateHighlight(currentTarget);
}

function handleMouseOut(event) {
    if (event.target === currentTarget) {
        cleanupUI();
    }
}

function handleElementScanKeyDown(event) {
    if (isActive && event.key === 'Escape') {
        const fabElement = document.querySelector('.fab-element-scan');
        stopElementScan(fabElement);
    }
}

function handleElementClick(event) {
    if (!isActive || isAdjusting || !currentTarget) return;
    event.preventDefault();
    event.stopPropagation();

    isAdjusting = true;
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);

    elementPath = [];
    let el = currentTarget;
    while (el && el.tagName !== 'BODY') {
        elementPath.push(el);
        el = el.parentElement;
    }
    elementPath.push(document.body);
    createAdjustmentToolbar(elementPath);
}

export function updateSelectionLevel(level) {
    const targetElement = elementPath[level];
    if (targetElement) {
        currentTarget = targetElement;
        updateHighlight(targetElement);
    }
}

export function confirmSelectionAndExtract() {
    if (!currentTarget) return;

    const extractedTexts = extractAndProcessTextFromElement(currentTarget);
    const formattedText = formatTextsForTranslation(extractedTexts);

    // 提前开始清理UI，以避免在模态框弹出时出现覆盖
    reselectElement();

    updateModalContent(formattedText, true, 'quick-scan');

    const notificationText = simpleTemplate(t('scan.quickFinished'), { count: extractedTexts.length });
    showNotification(notificationText, { type: 'success' });
}
