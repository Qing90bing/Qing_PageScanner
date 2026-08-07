import { normalizeAiSourceText } from './candidateText.js';

const MAX_SITE_NAME = 120;
const MAX_TITLE = 200;
const MAX_DESCRIPTION = 240;
const MAX_LANG_HINT = 32;
const MAX_URL = 512;
const MAX_NAV_ITEMS = 12;
const MAX_NAV_TEXT = 24;

function cleanText(value, maxLength) {
    return normalizeAiSourceText(value).slice(0, maxLength);
}

function metaContent(root, selectors) {
    for (const selector of selectors) {
        const content = root?.querySelector?.(selector)?.getAttribute?.('content');
        if (content && content.trim()) return content;
    }
    return '';
}

function getSiteName(root, locationLike) {
    const fromMeta = metaContent(root, [
        'meta[property="og:site_name"]',
        'meta[name="application-name"]',
        'meta[name="apple-mobile-web-app-title"]',
    ]);
    if (fromMeta) return cleanText(fromMeta, MAX_SITE_NAME);
    return cleanText(locationLike?.hostname || '', MAX_SITE_NAME);
}

function getNavigationTerms(root) {
    const terms = [];
    const seen = new Set();
    const nodes = root?.querySelectorAll?.(
        'nav a, nav button, nav span, [role="navigation"] a, [role="navigation"] button'
    );
    if (!nodes) return terms;
    for (const node of nodes) {
        const text = cleanText(node.textContent, MAX_NAV_TEXT);
        if (!text || seen.has(text)) continue;
        seen.add(text);
        terms.push(text);
        if (terms.length >= MAX_NAV_ITEMS) break;
    }
    return terms;
}

function classifyPageType(locationLike, root) {
    const pathname = String(locationLike?.pathname || '').toLowerCase();
    if (/(^|\/)(settings|preferences|account|profile|billing)(\/|$)/.test(pathname)) return 'settings';
    if (/(^|\/)(docs?|help|support|guide|manual)(\/|$)/.test(pathname)) return 'docs';
    if (/(^|\/)(login|signin|sign-up|register|auth)(\/|$)/.test(pathname)) return 'auth';
    if (/(^|\/)(checkout|cart|purchase|order)(\/|$)/.test(pathname)) return 'commerce';
    const article = root?.querySelector?.('article');
    if (article && cleanText(article.textContent, 100000).length > 800) return 'article';
    if (root?.querySelector?.('form')) return 'form';
    return 'generic';
}

/**
 * Build a compact, page-level profile for the AI request.
 *
 * The language hint comes from <html lang> and is intentionally named
 * `langHint`: it is often missing or wrong on real pages, so the prompt
 * treats it as a weak signal and never overrides source-language detection.
 *
 * @param {object} options
 * @param {string} options.targetLanguage
 * @param {object} [options.locationLike]
 * @param {Document} [options.root]
 */
export function buildPageContext({ targetLanguage, locationLike = window.location, root = document }) {
    const url = `${locationLike?.origin || ''}${locationLike?.pathname || ''}${locationLike?.search || ''}`;
    return {
        url: cleanText(url, MAX_URL),
        siteName: getSiteName(root, locationLike),
        title: cleanText(root?.title || locationLike?.title, MAX_TITLE),
        langHint: cleanText(root?.documentElement?.getAttribute?.('lang') || '', MAX_LANG_HINT),
        description: cleanText(
            metaContent(root, ['meta[name="description"]', 'meta[property="og:description"]']),
            MAX_DESCRIPTION
        ),
        type: classifyPageType(locationLike, root),
        navigation: getNavigationTerms(root),
        targetLanguage,
    };
}
