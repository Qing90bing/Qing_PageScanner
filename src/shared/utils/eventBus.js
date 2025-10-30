// src/shared/utils/eventBus.js
import { log } from './logger.js';
import { t } from '../i18n/index.js';

/**
 * @module eventBus
 * @description 一个简单的发布/订阅事件总线，用于模块间的解耦通信。
 */

const events = {};

/**
 * 订阅一个事件。
 * @param {string} eventName - 事件名称。
 * @param {Function} callback - 事件触发时执行的回调函数。
 * @returns {Function} - 一个可以调用来取消订阅的函数。
 */
export function on(eventName, callback) {
    if (!events[eventName]) {
        events[eventName] = [];
    }
    events[eventName].push(callback);

    // 返回一个取消订阅的函数
    return () => {
        events[eventName] = events[eventName].filter(cb => cb !== callback);
    };
}

/**
 * 发布一个事件。
 * @param {string} eventName - 事件名称。
 * @param {*} data - 传递给回调函数的数据。
 */
export function fire(eventName, data) {
    if (events[eventName]) {
        events[eventName].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                log(t('log.eventBus.callbackError', { eventName }), error);
            }
        });
    }
}
