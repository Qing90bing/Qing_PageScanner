import { shouldFilter } from '../../utils/text/filterLogic.js';
import { createCandidateFingerprint } from './contracts.js';
import { extractPlaceholders } from './responseValidator.js';
import { normalizeAiSourceText } from './candidateText.js';

const CONTEXT_BLOCK_SELECTOR = 'article, main, nav, header, footer, aside, form, dialog, section';
const BREADCRUMB_SELECTOR = '[aria-label*="breadcrumb" i], nav.breadcrumb, .breadcrumb';
const MAX_LOCAL_TEXT_LENGTH = 100000;

function normalizeText(value) {
    return normalizeAiSourceText(value);
}

function limitText(value, maxLength) {
    return normalizeText(value).replace(/\s+/g, ' ').slice(0, maxLength);
}

function isIgnoredElement(element, ignoredSelector) {
    if (!element || typeof element.closest !== 'function') return true;
    if (element.closest(ignoredSelector)) return true;
    if (element.closest('[hidden], [inert], [aria-hidden="true"]')) return true;
    const inlineStyle = element.getAttribute('style') || '';
    return /display\s*:\s*none|visibility\s*:\s*hidden/i.test(inlineStyle);
}

function findNearestHeading(element) {
    const block = element.closest(CONTEXT_BLOCK_SELECTOR) || element.parentElement;
    const heading = block?.querySelector('h1, h2, h3, h4, h5, h6');
    return limitText(heading?.textContent, 240);
}

function buildContext(element, sourceText) {
    const block = element.closest(CONTEXT_BLOCK_SELECTOR);
    const breadcrumb = document.querySelector(BREADCRUMB_SELECTOR);
    return {
        tagName: element.tagName?.toLowerCase() || '',
        role: element.getAttribute?.('role') || '',
        blockType: block?.tagName?.toLowerCase() || '',
        pageTitle: limitText(document.title, 200),
        nearestHeading: findNearestHeading(element),
        breadcrumb: limitText(breadcrumb?.textContent, 240),
        nearbyText: limitText(element.parentElement?.textContent, 360),
        placeholders: extractPlaceholders(sourceText),
    };
}

function createCandidate(element, sourceText, targetLanguage, siteKey) {
    const fingerprint = createCandidateFingerprint(siteKey, targetLanguage, sourceText);
    return {
        id: `ai-${fingerprint}-${sourceText.length}`,
        sourceText,
        siteKey,
        targetLanguage,
        fingerprint,
        context: buildContext(element, sourceText),
        status: 'pending',
    };
}

export function extractAiCandidates(
    root,
    { filterRules, targetLanguage, scannerConfig, siteKey = window.location.origin }
) {
    const candidates = new Map();
    const isDocumentRoot = root?.nodeType === Node.DOCUMENT_NODE;
    const attributesToExtract = Array.isArray(scannerConfig?.attributesToExtract)
        ? scannerConfig.attributesToExtract
        : [];
    const ignoredSelectors = Array.isArray(scannerConfig?.ignoredSelectors) ? scannerConfig.ignoredSelectors : [];
    const ignoredSelector = [...ignoredSelectors, '#text-extractor-container'].join(', ');

    const addCandidate = (element, rawText) => {
        const sourceText = normalizeText(rawText).slice(0, MAX_LOCAL_TEXT_LENGTH);
        if (!sourceText || shouldFilter(sourceText, filterRules)) return;
        const candidate = createCandidate(element, sourceText, targetLanguage, siteKey);
        if (!candidates.has(candidate.fingerprint)) {
            candidates.set(candidate.fingerprint, candidate);
        }
    };

    const processElementAttributes = (element) => {
        attributesToExtract.forEach((attribute) => {
            const value = element.getAttribute?.(attribute);
            if (value) addCandidate(element, value);
        });
    };

    const rootNode = isDocumentRoot ? root.body : root;
    if (!rootNode) return [];

    if (isDocumentRoot && document.title) {
        addCandidate(document.documentElement, document.title);
    }

    if (rootNode.nodeType === Node.TEXT_NODE) {
        const parent = rootNode.parentElement;
        if (parent && !isIgnoredElement(parent, ignoredSelector)) addCandidate(parent, rootNode.nodeValue);
        return Array.from(candidates.values());
    }

    if (rootNode.nodeType !== Node.ELEMENT_NODE || isIgnoredElement(rootNode, ignoredSelector)) {
        return [];
    }

    processElementAttributes(rootNode);
    rootNode.querySelectorAll?.('*').forEach((element) => {
        if (!isIgnoredElement(element, ignoredSelector)) processElementAttributes(element);
    });

    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return node.parentElement && !isIgnoredElement(node.parentElement, ignoredSelector)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT;
        },
    });
    while (walker.nextNode()) {
        addCandidate(walker.currentNode.parentElement, walker.currentNode.nodeValue);
    }

    return Array.from(candidates.values());
}
