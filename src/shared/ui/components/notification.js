// src/shared/ui/components/notification.js

import { createSVGFromString } from '../../utils/dom.js';
import { appConfig } from '../../../features/settings/config.js';
import { infoIcon } from '../../../assets/icons/infoIcon.js';
import { successIcon } from '../../../assets/icons/successIcon.js';
import { closeIcon } from '../../../assets/icons/closeIcon.js';
import { uiContainer } from '../uiContainer.js';

// 存储通知的容器
let notificationContainer = null;

/**
 * 创建并管理通知容器
 * @returns {HTMLElement} 通知容器元素
 */
function getNotificationContainer() {
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'tc-notification-container';
        uiContainer.appendChild(notificationContainer);
    }
    return notificationContainer;
}

/**
 * 安全地关闭并移除一个通知元素
 * @param {HTMLElement} notification - 需要关闭的通知元素
 */
function closeNotification(notification) {
    // 检查元素是否已在关闭过程中，防止重复执行
    if (!notification || notification.classList.contains('tc-notification-fade-out')) {
        return;
    }

    notification.classList.add('tc-notification-fade-out');
    notification.addEventListener('animationend', () => {
        notification.remove();
        // 检查容器是否为空，如果是，则也移除容器以进行垃圾回收
        if (notificationContainer && notificationContainer.childElementCount === 0) {
            notificationContainer.remove();
            notificationContainer = null;
        }
    }, { once: true }); // 使用 once 确保事件监听器在执行后自动移除
}

/**
 * 创建单个通知的HTML结构
 * @param {string} message - 要显示的消息
 * @param {string} type - 通知类型 ('info', 'success')
 * @returns {HTMLElement} 通知元素
 */
function createNotificationElement(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `tc-notification tc-notification-${type}`;

    const iconDiv = document.createElement('div');
    iconDiv.className = 'tc-notification-icon';
    const iconSVGString = type === 'success' ? successIcon : infoIcon;
    const iconElement = createSVGFromString(iconSVGString);
    if (iconElement) {
        iconDiv.appendChild(iconElement);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'tc-notification-content';
    contentDiv.textContent = message;

    const closeDiv = document.createElement('div');
    closeDiv.className = 'tc-notification-close';
    const closeIconElement = createSVGFromString(closeIcon);
    if (closeIconElement) {
        closeDiv.appendChild(closeIconElement);
    }

    notification.appendChild(iconDiv);
    notification.appendChild(contentDiv);
    notification.appendChild(closeDiv);

    // 关闭按钮事件直接调用关闭函数
    closeDiv.addEventListener('click', () => {
        closeNotification(notification);
    });

    return notification;
}

/**
 * 显示一个通知
 * @param {string} message - 要显示的消息
 * @param {object} options - 配置项
 * @param {string} [options.type='info'] - 通知类型 ('info', 'success')
 * @param {number} [options.duration=appConfig.ui.notificationDuration] - 显示时长 (毫秒)
 */
export function showNotification(message, { type = 'info', duration = appConfig.ui.notificationDuration } = {}) {
    const container = getNotificationContainer();
    const notification = createNotificationElement(message, type);

    container.appendChild(notification);

    // 自动关闭计时器
    const timer = setTimeout(() => {
        // 直接调用关闭函数，而不是模拟点击
        closeNotification(notification);
    }, duration);

    // 如果用户手动关闭，则清除计时器
    const closeButton = notification.querySelector('.tc-notification-close');
    if (closeButton) {
        // 我们需要确保手动点击时，自动关闭的计时器被取消
        closeButton.addEventListener('click', () => {
            clearTimeout(timer);
        });
    }
}
