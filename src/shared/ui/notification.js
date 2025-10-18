// src/ui/components/notification.js
import { createSVGFromString } from '../../shared/utils/dom.js';
import config from '../../config.js';
import { infoIcon } from '../../assets/infoIcon.js';
import { successIcon } from '../../assets/successIcon.js';
import { closeIcon } from '../../assets/closeIcon.js';

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
        document.body.appendChild(notificationContainer);
    }
    return notificationContainer;
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

    // 关闭按钮事件
    closeDiv.addEventListener('click', () => {
        notification.classList.add('tc-notification-fade-out');
        notification.addEventListener('animationend', () => {
            notification.remove();
            // 检查容器是否为空，如果是，则也移除容器
            if (notificationContainer && notificationContainer.childElementCount === 0) {
                notificationContainer.remove();
                notificationContainer = null;
            }
        });
    });

    return notification;
}

/**
/**
 * 显示一个通知
 * @param {string} message - 要显示的消息
 * @param {object} options - 配置项
 * @param {string} [options.type='info'] - 通知类型 ('info', 'success')
 * @param {number} [options.duration=config.notification.duration] - 显示时长 (毫秒)
 */
export function showNotification(message, { type = 'info', duration = config.notification.duration } = {}) {
    const container = getNotificationContainer();
    const notification = createNotificationElement(message, type);

    container.appendChild(notification);

    // 自动关闭计时器
    const timer = setTimeout(() => {
        const closeButton = notification.querySelector('.tc-notification-close');
        if (closeButton) {
            closeButton.click();
        }
    }, duration);

    // 如果用户手动关闭，则清除计时器
    const closeButton = notification.querySelector('.tc-notification-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            clearTimeout(timer);
        });
    }
}
