/**
 * Bridge for coordinating with Qing_Web-Translate-Script when both
 * userscripts are active on the same page.
 *
 * DOM state and events are used instead of window properties because
 * userscripts may run in isolated JavaScript worlds.
 */

export const TRANSLATION_STATE_ATTRIBUTE = 'data-qing-web-translate-state';
export const TRANSLATION_STATE_EVENT = 'qing-web-translate:state';
export const TRANSLATION_IDLE_STATE = 'idle';
export const TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS = 10000;
export const TRANSLATION_BRIDGE_MAX_WAIT_MS = 60000;

// 只有动态扫描运行时才发布桥接状态，避免普通翻译用户被动参与协议。
export const TRANSLATION_CLIENT_ATTRIBUTE = 'data-qing-page-scanner-client';
export const TRANSLATION_CLIENT_EVENT = 'qing-page-scanner:client-ready';
export const TRANSLATION_CLIENT_VALUE = 'active';

export function getTranslationBridgeState() {
    return document.documentElement?.getAttribute(TRANSLATION_STATE_ATTRIBUTE) ?? null;
}

export function isTranslationBridgeActive() {
    return getTranslationBridgeState() !== null;
}

export function isTranslationBridgeIdle() {
    const state = getTranslationBridgeState();
    return state === null || state === TRANSLATION_IDLE_STATE;
}

export function registerTranslationBridgeClient() {
    const root = document.documentElement;
    if (!root) return false;

    root.setAttribute(TRANSLATION_CLIENT_ATTRIBUTE, TRANSLATION_CLIENT_VALUE);
    document.dispatchEvent(new CustomEvent(TRANSLATION_CLIENT_EVENT));
    return true;
}

export function unregisterTranslationBridgeClient() {
    const root = document.documentElement;
    if (!root) return;

    root.removeAttribute(TRANSLATION_CLIENT_ATTRIBUTE);
    root.removeAttribute(TRANSLATION_STATE_ATTRIBUTE);
}

export function onTranslationBridgeStateChange(callback) {
    const handler = () => callback(getTranslationBridgeState());
    document.addEventListener(TRANSLATION_STATE_EVENT, handler);

    return () => {
        document.removeEventListener(TRANSLATION_STATE_EVENT, handler);
    };
}

/**
 * 等待初始翻译批次进入 idle。超时仅用于兼容失效或过旧的翻译脚本；
 * 正常的动态同步由事件驱动。
 */
export function waitForTranslationBridgeIdle(timeoutMs = TRANSLATION_BRIDGE_WAIT_TIMEOUT_MS) {
    if (isTranslationBridgeIdle()) {
        return Promise.resolve({ timedOut: false });
    }

    return new Promise((resolve) => {
        let timeoutId = null;

        const cleanup = () => {
            document.removeEventListener(TRANSLATION_STATE_EVENT, handleStateChange);
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };

        const finish = (timedOut) => {
            cleanup();
            resolve({ timedOut });
        };

        const handleStateChange = () => {
            if (isTranslationBridgeIdle()) {
                finish(false);
            }
        };

        document.addEventListener(TRANSLATION_STATE_EVENT, handleStateChange);

        // Cover the small race where the state changed between the initial
        // check and addEventListener().
        if (isTranslationBridgeIdle()) {
            finish(false);
            return;
        }

        timeoutId = setTimeout(() => finish(true), timeoutMs);
    });
}
