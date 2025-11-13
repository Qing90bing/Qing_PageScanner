// src/shared/ui/components/dropdown.js

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
            document.addEventListener('click', handleDocumentClick, { signal: docClickListenerController.signal, capture: true });
        }
    };

    const handleDocumentClick = (event) => {
        const path = event.composedPath();
        const isClickInside = path.includes(triggerElement) || path.includes(menuContent);
        const isClickOnNotification = path.some(element =>
            element.classList && element.classList.contains('tc-notification-container')
        );

        if (isClickInside || isClickOnNotification) {
            return;
        }
        toggle();
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
