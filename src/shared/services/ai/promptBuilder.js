import { isSubmittableAiCandidate } from './candidateText.js';
import { AI_RESPONSE_TOKEN_LIMIT, estimateBatchResponseTokens } from './budgetGuard.js';
import { createDynamicRegexShape, isSingleSampleRegexCandidate } from '../../utils/text/regexRules.js';

const TARGET_LABELS = {
    'zh-CN': 'Simplified Chinese',
    'zh-TW': 'Traditional Chinese',
};

const REGEX_HINT_LIMIT = 24;

function buildRegexCandidateGroups(candidates) {
    const groupsByShape = new Map();
    candidates.forEach((candidate, index) => {
        const shape = createDynamicRegexShape(candidate.sourceText);
        if (!shape) return;
        const group = groupsByShape.get(shape) || { shape, sourceIds: [], firstIndex: index };
        group.sourceIds.push(candidate.id);
        groupsByShape.set(shape, group);
    });

    return Array.from(groupsByShape.values())
        .filter(
            (group) =>
                group.sourceIds.length >= 2 || isSingleSampleRegexCandidate(candidates[group.firstIndex]?.sourceText)
        )
        .sort((left, right) => right.sourceIds.length - left.sourceIds.length || left.firstIndex - right.firstIndex)
        .slice(0, REGEX_HINT_LIMIT)
        .map((group, index) => ({
            id: `regex-candidate-${index + 1}`,
            sourceIds: group.sourceIds,
            sharedShape: group.shape,
        }));
}

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
        'Classify every item as translate, remove, or review.',
        'translate: user-facing UI copy that should be translated into the target language and enter the translation library.',
        'remove: anything that should not enter the translation library, including copy already in the target language, proper nouns or brands that stay untranslated, and dynamic or user-specific data such as project, plan, or product names.',
        'review: uncertain meaning or insufficient context.',
        'URLs, codes, identifiers, numbers, emails, and similar noise are usually already removed by local filters before submission.',
        'Preserve every placeholder exactly. Do not add, remove, rename, or translate placeholders.',
        'Return one item result for every input id. Never return HTML or Markdown outside JSON strings.',
        'For normal translatable items, use translationType "text" and put the translated text in translation.',
        'Before classifying individual items, inspect regexCandidateGroups and the full item list for repeated source structures. The groups are non-authoritative hints: use a group only when its items can safely share one translated replacement.',
        'Within this batch, prefer a regex rule when at least two source items share a translatable fixed sentence shell and differ only in reusable values such as prices, counts, dates, durations, or versions. Different dynamic values are not a reason to remove the items.',
        'A one-item regexCandidateGroup may also become one regex rule when the source contains an explicit value that is likely to change later, such as a price, count, date, duration, resolution, or version inside an otherwise stable translatable sentence. This is allowed to future-proof a site change without waiting for a second sample.',
        'A single-sample rule must be anchored with ^ and $, capture every changing value, reuse those captures in replacement, and keep all fixed source wording literal and specific. Never create a single-sample regex for ordinary static copy or an untranslated model/product name.',
        'Do not create a regex merely to preserve an untranslated proper name. If the fixed shell does not need translation or a shared replacement would mistranslate any source, keep the normal classification.',
        'For a regex rule, capture dynamic values with numbered capture groups, preserve those values with $1, $2, and so on, and keep the rule specific to the provided examples. Prefer an anchored pattern for a complete UI string.',
        'Example: sources "Audio • Input: $3.50 / Output: $21.00" and "Audio • Input: $0.50 / Output: $1.50" should share a specific anchored regex that captures the two prices and translates the fixed Audio/Input/Output shell.',
        'Every regex source id must appear in exactly one regex rule. A repeated-template rule has at least two distinct source ids; a strict future-proof single-sample rule has exactly one. Items assigned to a regex rule use translationType "regex", an empty translation, and the matching regexRuleId.',
        'The action field always describes the classification and must be exactly "translate", "remove", or "review". Never put "text" or "regex" in action.',
        'A valid regex item looks exactly like {"id":"candidate-a","action":"translate","translationType":"regex","regexRuleId":"rule-a","translation":"","confidence":0.96}.',
        'Return JSON with shape {"items":[{"id":"...","action":"translate|remove|review","translationType":"text|regex","regexRuleId":"...","translation":"...","confidence":0.0,"category":"...","reason":"..."}],"regexRules":[{"id":"...","sourceIds":["..."],"pattern":"...","flags":"i","replacement":"...","confidence":0.0,"category":"...","reason":"..."}]}.',
    ].join('\n');

    const regexCandidateGroups = buildRegexCandidateGroups(validCandidates);
    const userContent = JSON.stringify({
        targetLanguage,
        sourceLanguageHint: 'auto',
        ...(pageContext ? { page: sanitizePageContext(pageContext) } : {}),
        style,
        regexCandidateGroups,
        items: validCandidates.map((candidate) => ({
            id: candidate.id,
            sourceText: candidate.sourceText,
            context: sanitizeContext(candidate.context),
        })),
    });
    const regexRuleReserve = Math.min(8192, Math.max(512, Math.ceil(validCandidates.length / 2) * 96));
    const maxOutputTokens = Math.min(
        AI_RESPONSE_TOKEN_LIMIT,
        Math.max(1024, estimateBatchResponseTokens(validCandidates) + 512 + regexRuleReserve)
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
