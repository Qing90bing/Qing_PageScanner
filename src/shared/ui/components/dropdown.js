// src/shared/ui/components/dropdown.js
import { listenClickOutside } from '../../utils/dom/clickOutside.js';

/**
 * @module dropdown
 * @description 创建一个可复用的下拉菜单组件。
 */

/**
 * 创建并管理一个下拉菜单。
 * @param {HTMLElement} triggerElement - 点击时会触发菜单显示/隐藏的按钮。
 * @param {HTMLElement} menuContent - 将作为菜单内容显示的元素。
 * @returns {{ menuElement: HTMLElement, toggle: Function }} - 返回菜单元素和切换其可见性的函数。
 */
export function createDropdown(triggerElement, menuContent) {
    menuContent.classList.add('tc-dropdown-menu');
    const controller = new AbortController();
    const { signal } = controller;

    let docClickListenerController = null;

    const toggle = () => {
        const isVisible = menuContent.classList.contains('visible');

        if (isVisible) {
            menuContent.classList.add('is-hiding');
            menuContent.addEventListener('animationend', () => {
                menuContent.classList.remove('visible', 'is-hiding');
            }, { once: true });

            if (docClickListenerController) {
                docClickListenerController.abort();
                docClickListenerController = null;
            }
        } else {
            menuContent.classList.add('visible');
            docClickListenerController = new AbortController();

            // 使用通用的 listenClickOutside 工具，并注入业务特定的忽略逻辑
            listenClickOutside(menuContent, () => toggle(), {
                signal: docClickListenerController.signal,
                shouldIgnore: (element) => {
                    // 业务逻辑：如果点击了触发器本身，或者点击了通知容器，则忽略
                    // 注意：triggerElement 的检查其实也可以放在这里，或者依靠 listenClickOutside 的 element 参数
                    // 但由于 dropdown 的 trigger 和 menu 是分离的，普通的 includes(menu) 无法覆盖 trigger。

                    // 1. 检查是否点击了触发器 (Trigger)
                    // 使用 composedPath 的逻辑已经在 listenClickOutside 外部封装了，
                    // 这里我们只需要检查 element 本身。
                    // 但是，listenClickOutside 内部遍历的是 path 上的节点。
                    // 为了精确匹配，我们可以直接检查 element 是否包含特定类名或 ID。

                    if (triggerElement.contains(element)) return true;

                    // 2. 业务逻辑：忽略通知容器的点击
                    if (element.classList && element.classList.contains('tc-notification-container')) {
                        return true;
                    }

                    return false;
                }
            });
        }
    };

    const triggerClickHandler = (e) => {
        e.stopPropagation();
        toggle();
    };
    triggerElement.addEventListener('click', triggerClickHandler, { signal });

    const destroy = () => {
        controller.abort();
        if (docClickListenerController) {
            docClickListenerController.abort();
        }
    };

    return {
        menuElement: menuContent,
        toggle: toggle,
        destroy: destroy
    };
}
