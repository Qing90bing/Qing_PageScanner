import { isSubmittableAiCandidate } from './candidateText.js';
import { AI_RESPONSE_TOKEN_LIMIT, estimateBatchResponseTokens } from './budgetGuard.js';

const TARGET_LABELS = {
    'zh-CN': 'Simplified Chinese',
    'zh-TW': 'Traditional Chinese',
};

function limitText(value, maxLength) {
    return String(value || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, maxLength);
}

function sanitizeContext(context = {}) {
    return {
        tagName: limitText(context.tagName, 24),
        role: limitText(context.role, 40),
        blockType: limitText(context.blockType, 40),
        domPath: limitText(context.domPath, 160),
        label: limitText(context.label, 120),
        pageTitle: limitText(context.pageTitle, 200),
        nearestHeading: limitText(context.nearestHeading, 240),
        headingChain: limitText(context.headingChain, 240),
        breadcrumb: limitText(context.breadcrumb, 240),
        precedingText: limitText(context.precedingText, 150),
        followingText: limitText(context.followingText, 150),
        nearbyText: limitText(context.nearbyText, 360),
        listIndex: Math.min(9999, Math.max(0, Number(context.listIndex) || 0)),
        placeholders: Array.isArray(context.placeholders)
            ? context.placeholders.map((item) => limitText(item, 120)).slice(0, 20)
            : [],
    };
}

function sanitizePageContext(page = {}) {
    return {
        url: limitText(page.url, 512),
        siteName: limitText(page.siteName, 120),
        title: limitText(page.title, 200),
        langHint: limitText(page.langHint, 32),
        description: limitText(page.description, 240),
        type: limitText(page.type, 32),
        navigation: Array.isArray(page.navigation)
            ? page.navigation
                  .map((item) => limitText(item, 24))
                  .filter(Boolean)
                  .slice(0, 12)
            : [],
        targetLanguage: limitText(page.targetLanguage, 16),
    };
}

export function buildTranslationRequest({ provider, candidates, targetLanguage, styleProfile, pageContext }) {
    const validCandidates = candidates.filter(isSubmittableAiCandidate);
    if (validCandidates.length === 0 || validCandidates.length !== candidates.length) {
        throw new TypeError('empty-candidate-batch');
    }
    const targetLabel = TARGET_LABELS[targetLanguage] || TARGET_LABELS['zh-CN'];
    const style = styleProfile
        ? {
              tone: limitText(styleProfile.tone, 300),
              glossary: limitText(styleProfile.glossary, 1200),
              punctuation: limitText(styleProfile.punctuation, 300),
              instructions: limitText(styleProfile.instructions, 1200),
          }
        : null;

    const systemContent = [
        'You are a web UI text classifier and translator.',
        `The source language may be any language. Translate only into ${targetLabel}.`,
        'A page profile may be included with the site name, URL, title, language hint, and navigation terms. Use it to understand the site domain and vocabulary.',
        'Treat the page language hint as a weak signal: if the source text language differs from the hint, follow the actual text.',
        'Classify every item as translate, keep, remove, or review.',
        'translate: user-facing natural language that should enter a translation library.',
        'keep: already suitable for the target language or intentionally language-neutral.',
        'remove: code, URL, identifier, tracking value, decorative text, or content not useful to a translation library.',
        'review: uncertain meaning or insufficient context.',
        'Preserve every placeholder exactly. Do not add, remove, rename, or translate placeholders.',
        'Return one result for every input id. Never return HTML or Markdown.',
        'Return JSON with shape {"items":[{"id":"...","action":"translate|keep|remove|review","translation":"...","confidence":0.0,"category":"...","reason":"..."}]}.',
    ].join('\n');

    const userContent = JSON.stringify({
        targetLanguage,
        sourceLanguageHint: 'auto',
        ...(pageContext ? { page: sanitizePageContext(pageContext) } : {}),
        style,
        items: validCandidates.map((candidate) => ({
            id: candidate.id,
            sourceText: candidate.sourceText,
            context: sanitizeContext(candidate.context),
        })),
    });
    const maxOutputTokens = Math.min(
        AI_RESPONSE_TOKEN_LIMIT,
        Math.max(1024, estimateBatchResponseTokens(validCandidates) + 512)
    );

    const request = {
        model: provider.model,
        messages: [
            { role: 'system', content: systemContent },
            { role: 'user', content: userContent },
        ],
        temperature: 0.1,
        max_tokens: maxOutputTokens,
        stream: false,
    };

    if (provider.responseMode === 'json-mode') {
        request.response_format = { type: 'json_object' };
    }

    if (/^deepseek-/i.test(provider.model)) {
        request.thinking = { type: 'disabled' };
    }

    return request;
}

export const PROVIDER_TEST_CANDIDATE = Object.freeze({
    id: 'provider-test',
    sourceText: 'Save settings',
    context: Object.freeze({
        tagName: 'button',
        role: 'button',
        blockType: 'interactive',
        pageTitle: '',
        nearestHeading: '',
        breadcrumb: '',
        nearbyText: '',
        placeholders: [],
    }),
});

export function buildProviderProcessingTestRequest(provider, targetLanguage = 'zh-CN') {
    const request = buildTranslationRequest({
        provider,
        candidates: [PROVIDER_TEST_CANDIDATE],
        targetLanguage,
        styleProfile: null,
    });
    request.max_tokens = 1024;
    return request;
}

export function buildConnectionTestRequest(provider, targetLanguage = 'zh-CN') {
    return buildProviderProcessingTestRequest(provider, targetLanguage);
}
