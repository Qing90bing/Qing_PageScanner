// src/shared/services/sessionPersistence.js

import { getValue, setValue, deleteValue } from './tampermonkey.js';
import { fire } from '../utils/eventBus.js';
import { log } from '../utils/logger.js';
import { t } from '../i18n/index.js';
import { getSessionTexts } from '../../features/session-scan/logic.js';

// 用于存储会话的唯一键
const SESSION_KEY = 'qing_pagescanner_session';
// 会话恢复的有效时间（例如：5分钟），防止加载过慢或意外关闭后依然恢复
// 增加到 5 分钟以解决跨站跳转或网络加载慢导致的数据丢失问题
const RESUME_TIMEOUT_MS = 300000;

// 模块级锁，防止在用户手动停止后，由于异步或延迟操作导致的“僵尸”保存
let isPersistenceEnabled = false;

/**
 * @public
 * @description 显式启用会话持久化。在启动新会话时必须调用此函数。
 */
export function enablePersistence() {
    isPersistenceEnabled = true;
}

/**
 * @public
 * @description 在页面即将卸载时，保存当前激活的扫描会话。
 * @param {'session-scan' | 'element-scan'} mode - 当前的扫描模式。
 * @param {Array<string>} [data=null] - 需要一同保存的数据 (例如，元素扫描中已暂存的文本)。
 */
export async function saveActiveSession(mode, data = null) {
    // 关键锁：如果持久化已被禁用（例如用户已点击停止），则拦截任何保存尝试
    if (!isPersistenceEnabled) {
        log('Save blocked because persistence is disabled.');
        return;
    }

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
    // 立即禁用持久化，阻止任何后续的保存操作
    isPersistenceEnabled = false;
    await deleteValue(SESSION_KEY);
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
    await deleteValue(SESSION_KEY);

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
