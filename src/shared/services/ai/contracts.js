export const AI_ACTIONS = Object.freeze({
    TRANSLATE: 'translate',
    KEEP: 'keep',
    REMOVE: 'remove',
    REVIEW: 'review',
});

export const AI_CANDIDATE_STATUS = Object.freeze({
    PENDING: 'pending',
    IN_FLIGHT: 'inflight',
    TRANSLATED: 'translated',
    KEEP: 'keep',
    REMOVED: 'removed',
    REVIEW: 'review',
    FAILED: 'failed',
});

export const AI_PROCESSING_MODES = Object.freeze({
    AUTO: 'auto',
    MANUAL: 'manual',
});

export const AI_TARGET_LANGUAGES = Object.freeze({
    SIMPLIFIED_CHINESE: 'zh-CN',
    TRADITIONAL_CHINESE: 'zh-TW',
});

export const AI_RESPONSE_MODES = Object.freeze({
    JSON: 'json-mode',
    PROMPT_JSON: 'prompt-json',
});

export const AI_SETTINGS_VERSION = 2;

export const DEFAULT_DEEPSEEK_PROVIDER = Object.freeze({
    id: 'deepseek',
    name: 'DeepSeek',
    apiUrl: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-v4-flash',
    protocol: 'openai-chat-completions',
    responseMode: AI_RESPONSE_MODES.JSON,
});

export const AI_DEFAULT_SETTINGS = Object.freeze({
    version: AI_SETTINGS_VERSION,
    enabled: true,
    processingMode: AI_PROCESSING_MODES.MANUAL,
    targetLanguage: AI_TARGET_LANGUAGES.SIMPLIFIED_CHINESE,
    confidenceThreshold: 0.85,
    activeProviderId: DEFAULT_DEEPSEEK_PROVIDER.id,
    providers: [DEFAULT_DEEPSEEK_PROVIDER],
    requestTimeoutMs: 45000,
    batch: {
        maxItems: 100,
        maxCharacters: 30000,
        debounceMs: 1200,
    },
    budget: {
        maxRequestsPerSession: 20,
        maxCharactersPerSession: 50000,
        maxEstimatedTokensPerDay: 30000,
    },
});

const ALLOWED_TARGETS = new Set(Object.values(AI_TARGET_LANGUAGES));
const ALLOWED_PROCESSING_MODES = new Set(Object.values(AI_PROCESSING_MODES));
const ALLOWED_RESPONSE_MODES = new Set(Object.values(AI_RESPONSE_MODES));

function clampNumber(value, fallback, min, max) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}

export function normalizeProvider(provider, index = 0) {
    const fallback =
        index === 0
            ? DEFAULT_DEEPSEEK_PROVIDER
            : {
                  id: `custom-${index}`,
                  name: `Provider ${index + 1}`,
                  apiUrl: '',
                  model: '',
                  protocol: 'openai-chat-completions',
                  responseMode: AI_RESPONSE_MODES.PROMPT_JSON,
              };

    const id = String(provider?.id || fallback.id).replace(/[^a-zA-Z0-9_-]/g, '-');
    return {
        id: id || fallback.id,
        name: String(provider?.name || fallback.name)
            .trim()
            .slice(0, 80),
        apiUrl: String(provider?.apiUrl ?? fallback.apiUrl)
            .trim()
            .slice(0, 2048),
        model: String(provider?.model ?? fallback.model)
            .trim()
            .slice(0, 120),
        protocol: 'openai-chat-completions',
        responseMode: ALLOWED_RESPONSE_MODES.has(provider?.responseMode)
            ? provider.responseMode
            : fallback.responseMode,
    };
}

export function mergeAiSettings(value = {}) {
    const providers =
        Array.isArray(value.providers) && value.providers.length > 0
            ? value.providers.map(normalizeProvider)
            : [normalizeProvider(DEFAULT_DEEPSEEK_PROVIDER)];
    const providerIds = new Set(providers.map((provider) => provider.id));
    const activeProviderId = providerIds.has(value.activeProviderId) ? value.activeProviderId : providers[0].id;
    const shouldMigrateLegacyBatch =
        Number(value.version || 1) < AI_SETTINGS_VERSION &&
        Number(value.batch?.maxItems) === 20 &&
        Number(value.batch?.maxCharacters) === 6000;
    const batchValue = shouldMigrateLegacyBatch
        ? {
              ...value.batch,
              maxItems: AI_DEFAULT_SETTINGS.batch.maxItems,
              maxCharacters: AI_DEFAULT_SETTINGS.batch.maxCharacters,
          }
        : value.batch;

    return {
        version: AI_SETTINGS_VERSION,
        enabled: value.enabled !== false,
        processingMode: ALLOWED_PROCESSING_MODES.has(value.processingMode)
            ? value.processingMode
            : AI_DEFAULT_SETTINGS.processingMode,
        targetLanguage: ALLOWED_TARGETS.has(value.targetLanguage)
            ? value.targetLanguage
            : AI_DEFAULT_SETTINGS.targetLanguage,
        confidenceThreshold: clampNumber(value.confidenceThreshold, AI_DEFAULT_SETTINGS.confidenceThreshold, 0.5, 1),
        activeProviderId,
        providers,
        requestTimeoutMs: clampNumber(value.requestTimeoutMs, AI_DEFAULT_SETTINGS.requestTimeoutMs, 5000, 120000),
        batch: {
            maxItems: Math.round(clampNumber(batchValue?.maxItems, AI_DEFAULT_SETTINGS.batch.maxItems, 1, 200)),
            maxCharacters: Math.round(
                clampNumber(batchValue?.maxCharacters, AI_DEFAULT_SETTINGS.batch.maxCharacters, 500, 60000)
            ),
            debounceMs: Math.round(
                clampNumber(batchValue?.debounceMs, AI_DEFAULT_SETTINGS.batch.debounceMs, 200, 10000)
            ),
        },
        budget: {
            maxRequestsPerSession: Math.round(
                clampNumber(
                    value.budget?.maxRequestsPerSession,
                    AI_DEFAULT_SETTINGS.budget.maxRequestsPerSession,
                    1,
                    500
                )
            ),
            maxCharactersPerSession: Math.round(
                clampNumber(
                    value.budget?.maxCharactersPerSession,
                    AI_DEFAULT_SETTINGS.budget.maxCharactersPerSession,
                    1000,
                    1000000
                )
            ),
            maxEstimatedTokensPerDay: Math.round(
                clampNumber(
                    value.budget?.maxEstimatedTokensPerDay,
                    AI_DEFAULT_SETTINGS.budget.maxEstimatedTokensPerDay,
                    1000,
                    10000000
                )
            ),
        },
    };
}

export function getActiveProvider(aiSettings) {
    return (
        aiSettings.providers.find((provider) => provider.id === aiSettings.activeProviderId) ||
        aiSettings.providers[0] ||
        null
    );
}

export function hashText(value) {
    let hash = 2166136261;
    const input = String(value);
    for (let index = 0; index < input.length; index += 1) {
        hash ^= input.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
}

export function createCandidateFingerprint(siteKey, targetLanguage, sourceText) {
    const normalizedText = String(sourceText).normalize('NFC').replace(/\s+/g, ' ').trim();
    return hashText(`${siteKey}\u0000${targetLanguage}\u0000${normalizedText}`);
}
/**
 * @typedef {object} AiProvider
 * @property {string} id
 * @property {string} name
 * @property {string} apiUrl
 * @property {string} model
 * @property {'openai-chat-completions'} protocol
 * @property {'json-mode'|'prompt-json'} responseMode
 */

/**
 * @typedef {object} AiDecision
 * @property {string} id
 * @property {'translate'|'keep'|'remove'|'review'} action
 * @property {string} translation
 * @property {number} confidence
 * @property {string} category
 * @property {string} reason
 */

/**
 * @typedef {object} AiSettings
 * @property {number} version
 * @property {boolean} enabled
 * @property {'auto'|'manual'} processingMode
 * @property {'zh-CN'|'zh-TW'} targetLanguage
 * @property {number} confidenceThreshold
 * @property {string} activeProviderId
 * @property {AiProvider[]} providers
 */
