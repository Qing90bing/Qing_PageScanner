import { deleteValue, getValue, setValue } from '../tampermonkey.js';
import { hashText } from './contracts.js';

const STYLE_KEY = 'qing_pagescanner_ai_site_styles_v1';
const MAX_PROFILES = 200;

function parseProfiles(value) {
    if (!value) return [];
    try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        return parsed?.version === 1 && Array.isArray(parsed.profiles) ? parsed.profiles : [];
    } catch {
        return [];
    }
}

function normalizePathPrefix(value) {
    const trimmed = String(value || '/').trim();
    if (!trimmed || trimmed === '/') return '/';
    return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

function normalizeOrigin(value) {
    try {
        const parsed = new URL(String(value || '').trim());
        return ['http:', 'https:'].includes(parsed.protocol) ? parsed.origin : '';
    } catch {
        return '';
    }
}

export function normalizeStyleProfile(profile) {
    const origin = normalizeOrigin(profile.origin);
    const pathPrefix = normalizePathPrefix(profile.pathPrefix);
    const targetLanguage = profile.targetLanguage === 'zh-TW' ? 'zh-TW' : 'zh-CN';
    return {
        id: profile.id || `style-${hashText(`${origin}|${pathPrefix}|${targetLanguage}`)}`,
        origin,
        pathPrefix,
        targetLanguage,
        tone: String(profile.tone || '')
            .trim()
            .slice(0, 300),
        glossary: String(profile.glossary || '')
            .trim()
            .slice(0, 1200),
        punctuation: String(profile.punctuation || '')
            .trim()
            .slice(0, 300),
        instructions: String(profile.instructions || '')
            .trim()
            .slice(0, 1200),
        version: Math.max(1, Number(profile.version) || 1),
        updatedAt: Number(profile.updatedAt) || Date.now(),
        lastUsedAt: Number(profile.lastUsedAt) || Date.now(),
    };
}

export async function loadStyleProfiles() {
    const profiles = parseProfiles(await getValue(STYLE_KEY, null));
    return profiles.map(normalizeStyleProfile).sort((left, right) => right.lastUsedAt - left.lastUsedAt);
}

export async function saveStyleProfiles(profiles) {
    const normalized = profiles.map(normalizeStyleProfile).slice(0, MAX_PROFILES);
    await setValue(STYLE_KEY, JSON.stringify({ version: 1, profiles: normalized }));
    return normalized;
}

export async function upsertStyleProfile(profile) {
    const profiles = await loadStyleProfiles();
    const normalized = normalizeStyleProfile(profile);
    if (!normalized.origin) throw new Error('invalid-style-origin');
    const existingIndex = profiles.findIndex((item) => item.id === normalized.id);
    if (existingIndex >= 0) {
        normalized.version = profiles[existingIndex].version + 1;
        profiles.splice(existingIndex, 1, normalized);
    } else {
        profiles.unshift(normalized);
    }
    await saveStyleProfiles(profiles);
    return normalized;
}

export async function deleteStyleProfile(profileId) {
    const profiles = await loadStyleProfiles();
    await saveStyleProfiles(profiles.filter((profile) => profile.id !== profileId));
}

export async function clearStyleProfiles() {
    await deleteValue(STYLE_KEY);
}

export async function matchStyleProfile(locationLike, targetLanguage) {
    const profiles = await loadStyleProfiles();
    const origin = String(locationLike?.origin || '');
    const pathname = normalizePathPrefix(locationLike?.pathname || '/');
    const matched =
        profiles
            .filter(
                (profile) =>
                    profile.origin === origin &&
                    profile.targetLanguage === targetLanguage &&
                    pathname.startsWith(profile.pathPrefix)
            )
            .sort((left, right) => right.pathPrefix.length - left.pathPrefix.length)[0] || null;

    if (matched) {
        const now = Date.now();
        if (now - matched.lastUsedAt > 60000) {
            matched.lastUsedAt = now;
            await saveStyleProfiles(profiles.map((profile) => (profile.id === matched.id ? matched : profile)));
        }
    }
    return matched;
}
