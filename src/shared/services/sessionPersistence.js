// src/shared/services/sessionPersistence.js

import { getValue, setValue } from './tampermonkey.js';
import { fire } from '../utils/eventBus.js';
import { log } from '../utils/logger.js';
import { t } from '../i18n/index.js';
import { getSessionTexts } from '../../features/session-scan/logic.js';

// 用于存储会话的唯一键
const SESSION_KEY = 'qing_pagescanner_session';
// 会话恢复的有效时间（例如：15秒），防止加载过慢或意外关闭后依然恢复
const RESUME_TIMEOUT_MS = 15000;

/**
 * @public
 * @description 在页面即将卸载时，保存当前激活的扫描会话。
 * @param {'session-scan' | 'element-scan'} mode - 当前的扫描模式。
 * @param {Array<string>} [data=null] - 需要一同保存的数据 (例如，元素扫描中已暂存的文本)。
 */
export async function saveActiveSession(mode, data = null) {
    let sessionData = data;
    if (mode === 'session-scan') {
        // 对于动态扫描，我们从 logic 模块获取主线程的数据镜像
        const textsMirror = getSessionTexts();
        sessionData = Array.from(textsMirror);
    }

    const sessionState = {
        mode,
        data: sessionData,
        timestamp: Date.now(),
    };
    await setValue(SESSION_KEY, JSON.stringify(sessionState));
}

/**
 * @public
 * @description 手动停止扫描时，清除已保存的会话状态。
 * 这可以防止用户手动停止后，下次刷新依然自动恢复。
 */
export async function clearActiveSession() {
    await setValue(SESSION_KEY, null);
}

/**
 * @public
 * @description 在脚本启动时调用，检查并恢复上一页的会话。
 */
export async function loadAndResumeSession() {
    const savedSessionJSON = await getValue(SESSION_KEY, null);
    if (!savedSessionJSON) {
        return; // 没有保存的会话
    }

    // 关键：立即清除会话，防止刷新页面时重复恢复
    await setValue(SESSION_KEY, null);

    try {
        const state = JSON.parse(savedSessionJSON);

        // 检查时间戳，如果页面跳转（或加载）时间过长，则放弃恢复
        if (Date.now() - state.timestamp > RESUME_TIMEOUT_MS) {
            log('Stale session found, ignoring.');
            return;
        }

        // 触发一个全局事件，通知相关模块恢复状态
        // 我们在这里不直接调用 startSessionScan 或 startElementScan，以保持解耦
        fire('resumeScanSession', state);
    } catch (e) {
        log('Failed to parse saved session, clearing.', e);
        await clearActiveSession();
    }
}
