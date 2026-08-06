import { deleteValue, getValue, setValue } from '../tampermonkey.js';

const SESSION_KEY = 'qing_pagescanner_ai_session_v1';
const CACHE_KEY = 'qing_pagescanner_ai_cache_v1';
const DAILY_USAGE_KEY = 'qing_pagescanner_ai_daily_usage_v1';
const API_KEY_PREFIX = 'qing_pagescanner_ai_provider_key_v1_';
const CACHE_LIMIT = 5000;
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function parseStoredJson(value, fallback) {
    if (!value) return fallback;
    if (typeof value === 'object') return value;
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function safeProviderId(providerId) {
    return String(providerId || '').replace(/[^a-zA-Z0-9_-]/g, '-');
}

export async function loadProviderApiKey(providerId) {
    return String((await getValue(`${API_KEY_PREFIX}${safeProviderId(providerId)}`, '')) || '');
}

export async function saveProviderApiKey(providerId, apiKey) {
    const storageKey = `${API_KEY_PREFIX}${safeProviderId(providerId)}`;
    if (!apiKey) {
        await deleteValue(storageKey);
        return;
    }
    await setValue(storageKey, String(apiKey));
}

export async function deleteProviderApiKey(providerId) {
    await deleteValue(`${API_KEY_PREFIX}${safeProviderId(providerId)}`);
}

export async function loadAiSession() {
    const stored = parseStoredJson(await getValue(SESSION_KEY, null), null);
    return stored?.version === 1 ? stored : null;
}

export async function saveAiSession(session) {
    await setValue(SESSION_KEY, JSON.stringify({ ...session, version: 1, updatedAt: Date.now() }));
}

export async function clearAiSession() {
    await deleteValue(SESSION_KEY);
}

export async function loadAiCache() {
    const stored = parseStoredJson(await getValue(CACHE_KEY, null), { version: 1, entries: [] });
    const cutoff = Date.now() - CACHE_TTL_MS;
    const entries = Array.isArray(stored.entries)
        ? stored.entries.filter((entry) => entry?.fingerprint && entry.updatedAt >= cutoff).slice(-CACHE_LIMIT)
        : [];
    return new Map(entries.map((entry) => [entry.fingerprint, entry]));
}

export async function saveAiCache(cacheMap) {
    const entries = Array.from(cacheMap.values())
        .sort((left, right) => left.updatedAt - right.updatedAt)
        .slice(-CACHE_LIMIT);
    await setValue(CACHE_KEY, JSON.stringify({ version: 1, entries }));
}

export async function clearAiCacheForSite(siteKey, targetLanguage) {
    const cache = await loadAiCache();
    for (const [fingerprint, entry] of cache.entries()) {
        if (entry.siteKey === siteKey && entry.targetLanguage === targetLanguage) {
            cache.delete(fingerprint);
        }
    }
    await saveAiCache(cache);
}

function currentDayKey(now = new Date()) {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export async function loadDailyUsage() {
    const stored = parseStoredJson(await getValue(DAILY_USAGE_KEY, null), null);
    const day = currentDayKey();
    if (!stored || stored.day !== day) return { day, tokens: 0 };
    return { day, tokens: Math.max(0, Number(stored.tokens) || 0) };
}

export async function addDailyUsage(tokens) {
    const usage = await loadDailyUsage();
    usage.tokens += Math.max(0, Math.round(Number(tokens) || 0));
    await setValue(DAILY_USAGE_KEY, JSON.stringify(usage));
    return usage;
}

export async function resetDailyUsage() {
    await deleteValue(DAILY_USAGE_KEY);
}
