// src/shared/ui/mainModal/modalContent.js

/**
 * @module modalContent
 * @description 负责创建和管理主模态框的内容区域。
 */

import { createSVGFromString } from '../../utils/dom/dom.js';
import * as state from './modalState.js';
import { t } from '../../i18n/index.js';
import { fire, on } from '../../utils/core/eventBus.js';
import { infoIcon } from '../../../assets/icons/infoIcon.js';
import { dynamicIcon } from '../../../assets/icons/dynamicIcon.js';
import { translateIcon } from '../../../assets/icons/icon.js';
import { loadingSpinner } from '../../../assets/icons/loadingSpinner.js';
import { uiConfig } from '../../config/uiConfig.js';

let placeholder, unsubscribeLanguageChanged;
let currentMode = 'quick-scan';
let lastAiSnapshot = null;
let lastAiReviewItems = [];
let lastAiEditError = '';

function renderAiOutputTabs(activeType = state.getAiOutputType()) {
    if (!state.aiOutputTabs) return;
    state.aiOutputTabs.querySelectorAll('[data-ai-output-type]').forEach((button) => {
        const isActive = button.dataset.aiOutputType === activeType;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
    });
}

function createAiOutputTabs() {
    const tabs = document.createElement('div');
    tabs.className = 'ai-output-tabs';
    tabs.setAttribute('role', 'tablist');
    [
        ['text', 'results.aiOutput.text'],
        ['regex', 'results.aiOutput.regex'],
    ].forEach(([type]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ai-output-tab';
        button.dataset.aiOutputType = type;
        button.setAttribute('role', 'tab');
        button.addEventListener('click', () => fire('ai-output-type-change', type));
        tabs.appendChild(button);
    });
    state.setAiOutputTabs(tabs);
    updateAiOutputTabs();
    return tabs;
}

function renderAiSummaryPanel() {
    const panel = state.aiSummaryPanel;
    if (!panel) return;
    panel.replaceChildren();
    if (!lastAiSnapshot) return;

    const status = document.createElement('div');
    status.className = 'ai-summary-status';
    status.setAttribute('role', 'status');
    const statusDot = document.createElement('span');
    statusDot.className = `ai-status-dot ${
        lastAiSnapshot.paused ? 'is-paused' : lastAiSnapshot.active ? 'is-active' : ''
    }`;
    statusDot.setAttribute('aria-hidden', 'true');
    const statusText = document.createElement('span');
    statusText.className = 'ai-summary-status-text';
    const statusKey = lastAiSnapshot.paused
        ? 'results.aiPaused'
        : lastAiSnapshot.active
          ? 'results.aiRunning'
          : 'results.aiStopped';
    statusText.textContent = t(statusKey);
    status.append(statusDot, statusText);
    panel.appendChild(status);

    const counts = document.createElement('div');
    counts.className = 'ai-summary-counts';
    const countItems = [
        ['pending', 'results.aiCounts.pending'],
        ['translated', 'results.aiCounts.translated'],
        ['textRules', 'results.aiCounts.textRules'],
        ['regexRules', 'results.aiCounts.regexRules'],
        ['removed', 'results.aiCounts.removed'],
        ['review', 'results.aiCounts.review'],
        ['failed', 'results.aiCounts.failed'],
    ];
    countItems.forEach(([key, labelKey]) => {
        const badge = document.createElement('span');
        badge.className = `ai-count-badge ai-count-${key}`;
        const count = lastAiSnapshot.counts?.[key] || 0;
        badge.classList.toggle('is-nonzero', count > 0);
        const label = t(labelKey);
        badge.setAttribute('aria-label', `${label}: ${count}`);

        const labelElement = document.createElement('span');
        labelElement.className = 'ai-count-label';
        labelElement.textContent = label;

        const valueElement = document.createElement('strong');
        valueElement.className = 'ai-count-value';
        valueElement.textContent = String(count);

        badge.append(labelElement, valueElement);
        counts.appendChild(badge);
    });
    panel.appendChild(counts);

    if (lastAiSnapshot.processing || lastAiSnapshot.budgetBlockedReason || lastAiSnapshot.lastErrorCode) {
        const notice = document.createElement('div');
        notice.className = `ai-summary-notice${lastAiSnapshot.processing ? ' is-processing' : ''}`;
        if (lastAiSnapshot.processing) {
            notice.textContent = t('results.aiProcessing');
            notice.title = notice.textContent;
        } else if (lastAiSnapshot.budgetBlockedReason) {
            notice.textContent = `${t('results.aiBudgetBlocked')}: ${lastAiSnapshot.budgetBlockedReason}`;
        } else {
            notice.textContent = `${t('results.aiRequestError')}: ${lastAiSnapshot.lastErrorCode}`;
        }
        panel.appendChild(notice);
    }

    if (lastAiEditError) {
        const notice = document.createElement('div');
        notice.className = 'ai-summary-notice is-error';
        notice.textContent = `${t('results.aiRegexEditError')}: ${lastAiEditError}`;
        panel.appendChild(notice);
    }

    if (lastAiReviewItems.length > 0) {
        const details = document.createElement('details');
        details.className = 'ai-review-list';
        const summary = document.createElement('summary');
        summary.textContent = `${t('results.aiReviewItems')} (${lastAiReviewItems.length})`;
        details.appendChild(summary);
        lastAiReviewItems.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'ai-review-item';
            const source = document.createElement('div');
            source.className = 'ai-review-source';
            source.textContent = item.sourceText;
            const reason = document.createElement('div');
            reason.className = 'ai-review-reason';
            reason.textContent = item.reason || item.category || t('results.aiReviewRequired');
            const actions = document.createElement('div');
            actions.className = 'ai-review-actions';

            const returnButton = document.createElement('button');
            returnButton.type = 'button';
            returnButton.className = 'ai-review-action ai-review-return-action';
            returnButton.dataset.reviewAction = 'return-to-editor';
            returnButton.textContent = t('results.aiReviewReturnToEditor');
            returnButton.setAttribute('aria-label', returnButton.textContent);
            returnButton.disabled = Boolean(lastAiSnapshot.processing);
            returnButton.addEventListener('click', () => fire('ai-review-return-to-editor', item.id));

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'ai-review-action ai-review-remove-action';
            removeButton.dataset.reviewAction = 'remove';
            removeButton.textContent = t('results.aiReviewRemove');
            removeButton.setAttribute('aria-label', removeButton.textContent);
            removeButton.disabled = Boolean(lastAiSnapshot.processing);
            removeButton.addEventListener('click', () => fire('ai-review-remove', item.id));

            actions.append(returnButton, removeButton);
            row.append(source, reason, actions);
            details.appendChild(row);
        });
        panel.appendChild(details);
    }
}

/**
 * @private
 * @description 更新占位符中的所有文本。
 */
function rerenderPlaceholder() {
    if (!placeholder) return;

    // 清空现有内容
    placeholder.replaceChildren();

    const placeholderIconDiv = document.createElement('div');
    placeholderIconDiv.className = 'placeholder-icon';
    const infoIconSVG = createSVGFromString(infoIcon);
    if (infoIconSVG) placeholderIconDiv.appendChild(infoIconSVG);

    const p1 = document.createElement('p');
    p1.textContent = t('results.noSummary');

    const p2 = document.createElement('p');
    p2.className = 'placeholder-actions';
    p2.append(t('placeholders.click'));
    const span2 = document.createElement('span');
    span2.className = 'placeholder-action-icon';
    const dynamicIconSVG = createSVGFromString(dynamicIcon);
    if (dynamicIconSVG) span2.appendChild(dynamicIconSVG);
    p2.appendChild(span2);
    const strong2 = document.createElement('strong');
    strong2.textContent = t('placeholders.dynamicScan');
    p2.appendChild(strong2);
    p2.append(t('placeholders.startNewScanSession'));

    const p3 = document.createElement('p');
    p3.className = 'placeholder-actions';
    p3.append(t('placeholders.click'));
    const span3 = document.createElement('span');
    span3.className = 'placeholder-action-icon';
    const translateIconSVG = createSVGFromString(translateIcon);
    if (translateIconSVG) span3.appendChild(translateIconSVG);
    p3.appendChild(span3);
    const strong3 = document.createElement('strong');
    strong3.textContent = t('placeholders.staticScan');
    p3.appendChild(strong3);
    p3.append(t('placeholders.performOneTimeScan'));

    placeholder.appendChild(placeholderIconDiv);
    placeholder.appendChild(p1);
    placeholder.appendChild(p2);
    placeholder.appendChild(p3);
}

/**
 * @description 创建加载动画元素。
 * @returns {HTMLElement} 加载动画容器元素。
 */
function createLoadingSpinner() {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'gm-loading-overlay';
    const spinner = document.createElement('div');
    spinner.className = 'gm-loading-spinner';
    const spinnerSVG = createSVGFromString(loadingSpinner);
    if (spinnerSVG) spinner.appendChild(spinnerSVG);
    loadingContainer.appendChild(spinner);
    return loadingContainer;
}

/**
 * @description 填充模态框内容区域。
 * @param {HTMLElement} modalContent - 模态框内容区的容器元素。
 */
export function populateModalContent(modalContent) {
    if (uiConfig.modal.contentHeight) {
        modalContent.style.height = uiConfig.modal.contentHeight;
    }

    placeholder = document.createElement('div');
    placeholder.id = 'modal-placeholder';
    rerenderPlaceholder();
    state.setPlaceholder(placeholder);

    const aiSummaryPanel = document.createElement('section');
    aiSummaryPanel.className = 'ai-summary-panel';
    aiSummaryPanel.setAttribute('aria-live', 'polite');
    state.setAiSummaryPanel(aiSummaryPanel);

    const aiOutputTabs = createAiOutputTabs();

    const textareaContainer = document.createElement('div');
    textareaContainer.className = 'tc-textarea-container';

    const lineNumbersDiv = document.createElement('div');
    lineNumbersDiv.className = 'tc-line-numbers';
    state.setLineNumbersDiv(lineNumbersDiv);

    const outputTextarea = document.createElement('textarea');
    outputTextarea.id = 'text-extractor-output';
    outputTextarea.className = 'tc-textarea';
    state.setOutputTextarea(outputTextarea);

    textareaContainer.appendChild(lineNumbersDiv);
    textareaContainer.appendChild(outputTextarea);

    const loadingContainer = createLoadingSpinner();
    state.setLoadingContainer(loadingContainer);

    modalContent.appendChild(placeholder);
    modalContent.appendChild(aiSummaryPanel);
    modalContent.appendChild(aiOutputTabs);
    modalContent.appendChild(textareaContainer);
    modalContent.appendChild(loadingContainer);

    unsubscribeLanguageChanged = on('languageChanged', () => {
        rerenderPlaceholder();
        updateAiOutputTabs();
        renderAiSummaryPanel();
    });
}

/**
 * @description 销毁模态框内容，清理事件监听器和引用。
 */
export function destroyModalContent() {
    if (unsubscribeLanguageChanged) {
        unsubscribeLanguageChanged();
        unsubscribeLanguageChanged = null;
    }
    placeholder = null;
    lastAiSnapshot = null;
    lastAiReviewItems = [];
    lastAiEditError = '';
}

/**
 * @description 显示加载动画并禁用文本区域。
 */
export function showLoading() {
    if (state.loadingContainer) state.loadingContainer.classList.add('is-visible');
    if (state.outputTextarea) state.outputTextarea.disabled = true;
}

/**
 * @description 隐藏加载动画并启用文本区域。
 */
export function hideLoading() {
    if (state.loadingContainer) state.loadingContainer.classList.remove('is-visible');
    if (state.outputTextarea) state.outputTextarea.disabled = false;
}

/** @param {'quick-scan'|'session-scan'|'element-scan'|'ai-scan'} mode */
export function setModalContentMode(mode) {
    currentMode = mode;
    if (state.aiSummaryPanel) {
        state.aiSummaryPanel.classList.toggle('is-visible', currentMode === 'ai-scan');
    }
    if (state.aiOutputTabs) state.aiOutputTabs.classList.toggle('is-visible', currentMode === 'ai-scan');
}

/**
 * @param {object} snapshot
 * @param {Array<object>} reviewItems
 */
export function updateAiSummaryPanel(snapshot, reviewItems = [], editError = '') {
    lastAiSnapshot = snapshot;
    lastAiReviewItems = reviewItems;
    lastAiEditError = editError || '';
    renderAiSummaryPanel();
}

export function updateAiOutputTabs(activeType = state.getAiOutputType()) {
    if (!state.aiOutputTabs) return;
    state.aiOutputTabs.querySelectorAll('[data-ai-output-type]').forEach((button) => {
        const type = button.dataset.aiOutputType;
        button.textContent = t(type === 'regex' ? 'results.aiOutput.regex' : 'results.aiOutput.text');
    });
    renderAiOutputTabs(activeType);
}
