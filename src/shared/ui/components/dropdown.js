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

    const toggle = () => {
        const isVisible = menuContent.classList.contains('visible');

        if (isVisible) {
            menuContent.classList.add('is-hiding');
            menuContent.addEventListener('animationend', () => {
                menuContent.classList.remove('visible', 'is-hiding');
            }, { once: true });
            document.removeEventListener('click', handleDocumentClick, true);
        } else {
            menuContent.classList.add('visible');
            document.addEventListener('click', handleDocumentClick, true);
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

    triggerElement.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle();
    });

    return {
        menuElement: menuContent,
        toggle: toggle
    };
}
