import { shouldFilter } from '../../utils/text/filterLogic.js';
import { createCandidateFingerprint } from './contracts.js';
import { extractPlaceholders } from './responseValidator.js';
import { normalizeAiSourceText } from './candidateText.js';

const CONTEXT_BLOCK_SELECTOR = 'article, main, nav, header, footer, aside, form, dialog, section';
const BREADCRUMB_SELECTOR = '[aria-label*="breadcrumb" i], nav.breadcrumb, .breadcrumb';
const MAX_LOCAL_TEXT_LENGTH = 100000;
const NOISE_CLASS_PATTERN = /^(sc-|css-|_|ng-|v-|js-|react-)/i;
const DYNAMIC_CLASS_PATTERN = /[a-f0-9]{8,}/i;

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

function buildDomPath(element, maxLength = 160) {
    const segments = [];
    let node = element;
    while (node && node.nodeType === Node.ELEMENT_NODE && segments.length < 5) {
        const tag = String(node.tagName || '').toLowerCase();
        if (!tag || tag === 'html' || tag === 'body') break;
        const id = typeof node.id === 'string' && node.id.trim() ? `#${node.id.trim()}` : '';
        const classes = Array.from(node.classList || [])
            .filter((name) => !DYNAMIC_CLASS_PATTERN.test(name) && !NOISE_CLASS_PATTERN.test(name))
            .slice(0, 2)
            .join('.');
        const suffix = id || (classes ? `.${classes}` : '');
        segments.unshift(suffix ? `${tag}${suffix}` : tag);
        node = node.parentElement;
    }
    return String(segments.join(' > ')).slice(0, maxLength);
}

function findLabelText(element) {
    if (!element || typeof element.closest !== 'function') return '';
    if (element.labels?.length) {
        return limitText(element.labels[0].textContent, 120);
    }
    const labelledBy = element.getAttribute?.('aria-labelledby');
    if (labelledBy) {
        const root = element.getRootNode?.() || element.ownerDocument;
        const label = labelledBy
            .split(/\s+/)
            .map((id) => {
                if (typeof root.getElementById === 'function') return root.getElementById(id);
                const safeId = String(id).replace(/["\\]/g, '\\$&');
                return root.querySelector?.(`[id="${safeId}"]`);
            })
            .find(Boolean);
        if (label) return limitText(label.textContent, 120);
    }
    return '';
}

function nearbySiblingText(element, side, maxSiblings = 2) {
    if (!element?.parentElement) return '';
    let sibling = side === 'before' ? element.previousElementSibling : element.nextElementSibling;
    for (let index = 0; index < maxSiblings && sibling; index += 1) {
        const text = limitText(sibling.textContent, 150);
        if (text) return text;
        sibling = side === 'before' ? sibling.previousElementSibling : sibling.nextElementSibling;
    }
    return '';
}

function buildHeadingChain(element) {
    const chain = [];
    let node = element?.parentElement;
    while (node && node !== document.body && node !== document.documentElement) {
        const tag = String(node.tagName || '').toLowerCase();
        if (/^h[1-6]$/.test(tag)) {
            const text = limitText(node.textContent, 120);
            if (text && !chain.includes(text)) chain.unshift(text);
        }
        node = node.parentElement;
    }
    return limitText(chain.join(' / '), 240);
}

function elementListIndex(element) {
    if (!element?.parentElement) return 0;
    const tag = String(element.tagName || '').toLowerCase();
    const parentTag = String(element.parentElement.tagName || '').toLowerCase();
    if (tag === 'li' && (parentTag === 'ul' || parentTag === 'ol' || parentTag === 'menu')) {
        return Array.from(element.parentElement.children).indexOf(element) + 1;
    }
    if (tag === 'td' || tag === 'th') {
        return Array.from(element.parentElement.children).indexOf(element) + 1;
    }
    return 0;
}

function buildContext(element, sourceText) {
    const block = element.closest(CONTEXT_BLOCK_SELECTOR);
    const breadcrumb = document.querySelector(BREADCRUMB_SELECTOR);
    return {
        tagName: element.tagName?.toLowerCase() || '',
        role: element.getAttribute?.('role') || '',
        blockType: block?.tagName?.toLowerCase() || '',
        domPath: buildDomPath(element),
        label: findLabelText(element),
        pageTitle: limitText(document.title, 200),
        nearestHeading: findNearestHeading(element),
        headingChain: buildHeadingChain(element),
        breadcrumb: limitText(breadcrumb?.textContent, 240),
        precedingText: nearbySiblingText(element, 'before'),
        followingText: nearbySiblingText(element, 'after'),
        nearbyText: limitText(element.parentElement?.textContent, 360),
        listIndex: elementListIndex(element),
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

function processElementAttributes(element, attributesToExtract, addCandidate) {
    attributesToExtract.forEach((attribute) => {
        const value = element.getAttribute?.(attribute);
        if (value) addCandidate(element, value);
    });
}

function extractSubtree(rootNode, { attributesToExtract, ignoredSelector, addCandidate }) {
    if (rootNode.nodeType === Node.TEXT_NODE) {
        const parent = rootNode.parentElement;
        if (parent && !isIgnoredElement(parent, ignoredSelector)) addCandidate(parent, rootNode.nodeValue);
        return;
    }

    const isDocument = rootNode.nodeType === Node.DOCUMENT_NODE;
    const elementRoot = isDocument ? rootNode.body : rootNode;
    if (!elementRoot || elementRoot.nodeType === Node.TEXT_NODE) return;
    const isElementRoot = elementRoot.nodeType === Node.ELEMENT_NODE;
    const isFragmentRoot = elementRoot.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
    if (!isElementRoot && !isFragmentRoot) return;
    if (isElementRoot && isIgnoredElement(elementRoot, ignoredSelector)) {
        return;
    }

    processElementAttributes(elementRoot, attributesToExtract, addCandidate);

    elementRoot.querySelectorAll?.('*').forEach((element) => {
        if (isIgnoredElement(element, ignoredSelector)) return;

        processElementAttributes(element, attributesToExtract, addCandidate);

        if (element.tagName === 'IFRAME') {
            try {
                const iframeDoc = element.contentDocument || (element.contentWindow && element.contentWindow.document);
                if (iframeDoc) extractSubtree(iframeDoc, { attributesToExtract, ignoredSelector, addCandidate });
            } catch {
                // Cross-origin iframes are inaccessible; skip silently.
            }
        }

        const shadowRoot = element.shadowRoot || element._shadowRoot;
        if (shadowRoot) extractSubtree(shadowRoot, { attributesToExtract, ignoredSelector, addCandidate });
    });

    if (elementRoot.tagName === 'IFRAME') {
        try {
            const iframeDoc =
                elementRoot.contentDocument || (elementRoot.contentWindow && elementRoot.contentWindow.document);
            if (iframeDoc) extractSubtree(iframeDoc, { attributesToExtract, ignoredSelector, addCandidate });
        } catch {
            // Cross-origin iframes are inaccessible; skip silently.
        }
    }

    const rootShadow = elementRoot.shadowRoot || elementRoot._shadowRoot;
    if (rootShadow) extractSubtree(rootShadow, { attributesToExtract, ignoredSelector, addCandidate });

    const walker = (elementRoot.ownerDocument || document).createTreeWalker(elementRoot, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return node.parentElement && !isIgnoredElement(node.parentElement, ignoredSelector)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT;
        },
    });
    while (walker.nextNode()) {
        addCandidate(walker.currentNode.parentElement, walker.currentNode.nodeValue);
    }
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

    extractSubtree(rootNode, { attributesToExtract, ignoredSelector, addCandidate });

    return Array.from(candidates.values());
}
