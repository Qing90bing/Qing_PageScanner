import { xmlHttpRequest } from '../tampermonkey.js';
import { AI_ACTIONS, AI_CANDIDATE_STATUS } from './contracts.js';
import { buildProviderProcessingTestRequest, PROVIDER_TEST_CANDIDATE } from './promptBuilder.js';
import { parseJsonContent, validateTranslationResponse } from './responseValidator.js';

export class AiProviderError extends Error {
    constructor(code, message, status = 0) {
        super(message);
        this.name = 'AiProviderError';
        this.code = code;
        this.status = status;
    }
}

export function validateProviderUrl(apiUrl) {
    let parsed;
    try {
        parsed = new URL(apiUrl);
    } catch {
        throw new AiProviderError('invalid-url', 'Invalid API URL');
    }

    const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
    if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && isLocalhost)) {
        throw new AiProviderError('unsafe-url', 'Only HTTPS or localhost HTTP endpoints are allowed');
    }
    if (parsed.username || parsed.password || parsed.search || parsed.hash) {
        throw new AiProviderError(
            'invalid-url',
            'Credentials, query strings, and fragments are not allowed in the API URL'
        );
    }
    if (!/\/chat\/completions\/?$/i.test(parsed.pathname)) {
        throw new AiProviderError('invalid-endpoint', 'The API URL must be a full chat/completions endpoint');
    }
    return parsed.toString();
}

export function validateProviderConfiguration(provider, apiKey) {
    if (!provider?.model) {
        throw new AiProviderError('missing-model', 'A model is required');
    }
    if (!apiKey || !String(apiKey).trim()) {
        throw new AiProviderError('missing-api-key', 'An API key is required');
    }
    if (String(apiKey).trim().length > 4096) {
        throw new AiProviderError('invalid-api-key', 'The API key is too long');
    }
    return validateProviderUrl(provider.apiUrl);
}

function parseResponseBody(responseText) {
    try {
        return JSON.parse(responseText);
    } catch {
        throw new AiProviderError('invalid-json', 'The provider returned invalid JSON');
    }
}

export function createChatCompletionRequest({
    provider,
    apiKey,
    payload,
    timeoutMs = 45000,
    transport = xmlHttpRequest,
}) {
    const url = validateProviderConfiguration(provider, apiKey);
    let requestHandle = null;
    let settled = false;

    const promise = new Promise((resolve, reject) => {
        const finish = (callback) => (value) => {
            if (settled) return;
            settled = true;
            callback(value);
        };
        const resolveOnce = finish(resolve);
        const rejectOnce = finish(reject);

        requestHandle = transport({
            method: 'POST',
            url,
            redirect: 'error',
            timeout: timeoutMs,
            headers: {
                Authorization: `Bearer ${String(apiKey).trim()}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload),
            responseType: 'text',
            onload: (response) => {
                if (response.status < 200 || response.status >= 300) {
                    const statusCode = Number(response.status) || 0;
                    const code =
                        statusCode === 401 || statusCode === 403
                            ? 'authentication'
                            : statusCode === 429
                              ? 'rate-limit'
                              : statusCode >= 500
                                ? 'provider-unavailable'
                                : 'http-error';
                    rejectOnce(
                        new AiProviderError(code, `Provider request failed with HTTP ${statusCode}`, statusCode)
                    );
                    return;
                }

                if (String(response.responseText || '').length > 2_000_000) {
                    rejectOnce(new AiProviderError('response-too-large', 'The provider response is too large'));
                    return;
                }

                try {
                    const body = parseResponseBody(response.responseText);
                    if (body?.choices?.[0]?.finish_reason === 'length') {
                        rejectOnce(new AiProviderError('truncated-response', 'The provider response was truncated'));
                        return;
                    }
                    const content = body?.choices?.[0]?.message?.content;
                    if (typeof content !== 'string') {
                        rejectOnce(
                            new AiProviderError(
                                'invalid-response',
                                'The provider response is missing choices[0].message.content'
                            )
                        );
                        return;
                    }
                    resolveOnce({ body, content, usage: body.usage || null });
                } catch (error) {
                    rejectOnce(error);
                }
            },
            ontimeout: () => rejectOnce(new AiProviderError('timeout', 'The provider request timed out')),
            onerror: () => rejectOnce(new AiProviderError('network', 'The provider request failed')),
            onabort: () => rejectOnce(new AiProviderError('aborted', 'The provider request was aborted')),
        });
    });

    return {
        promise,
        abort() {
            if (!settled && requestHandle && typeof requestHandle.abort === 'function') {
                requestHandle.abort();
            }
        },
    };
}

export async function testProviderProcessing({
    provider,
    apiKey,
    timeoutMs,
    transport,
    targetLanguage = 'zh-CN',
    confidenceThreshold = 0.85,
}) {
    const startedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const request = createChatCompletionRequest({
        provider,
        apiKey,
        payload: buildProviderProcessingTestRequest(provider, targetLanguage),
        timeoutMs,
        transport,
    });
    const response = await request.promise;
    let decision;
    try {
        const payload = parseJsonContent(response.content);
        [decision] = validateTranslationResponse(payload, [PROVIDER_TEST_CANDIDATE], confidenceThreshold);
    } catch (error) {
        throw new AiProviderError('processing-test-failed', error?.message || 'The processing test failed');
    }
    if (
        decision?.action !== AI_ACTIONS.TRANSLATE ||
        decision?.status !== AI_CANDIDATE_STATUS.TRANSLATED ||
        !decision.translation
    ) {
        throw new AiProviderError(
            'processing-test-failed',
            `The provider did not return a valid translation (${decision?.reason || 'invalid-result'})`
        );
    }
    const finishedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();
    return { latencyMs: Math.round(finishedAt - startedAt), translation: decision.translation };
}

export const testProviderConnection = testProviderProcessing;
