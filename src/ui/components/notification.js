// src/ui/components/notification.js
import { createSVGFromString } from '../utils.js';

// 存储通知的容器
let notificationContainer = null;

// SVG 图标字符串常量
const successIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
const infoIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
const closeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;


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
    const iconSVGString = type === 'success' ? successIconSVG : infoIconSVG;
    const iconElement = createSVGFromString(iconSVGString);
    if (iconElement) {
        iconDiv.appendChild(iconElement);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'tc-notification-content';
    contentDiv.textContent = message;

    const closeDiv = document.createElement('div');
    closeDiv.className = 'tc-notification-close';
    const closeIconElement = createSVGFromString(closeIconSVG);
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
 * 显示一个通知
 * @param {string} message - 要显示的消息
 * @param {object} options - 配置项
 * @param {string} [options.type='info'] - 通知类型 ('info', 'success')
 * @param {number} [options.duration=3000] - 显示时长 (毫秒)
 */
export function showNotification(message, { type = 'info', duration = 3000 } = {}) {
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
