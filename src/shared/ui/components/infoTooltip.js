// src/shared/ui/components/Tooltip.js
import { createSVGFromString } from '../../utils/dom.js';
import { closeIcon } from '../../../assets/icons/closeIcon.js';
import { uiContainer } from '../uiContainer.js';
import { fire } from '../../utils/eventBus.js';
import { createTrustedHTML } from '../../utils/trustedTypes.js';

/**
 * @class Tooltip
 * @description 一个可复用的提示信息组件，用于显示详细信息窗口。
 */
class Tooltip {
    constructor() {
        this.tooltipElement = null;
        this.handleEscKey = this.handleEscKey.bind(this);
    }


    /**
     * @private
     * @description 根据配置创建提示窗口的 DOM 结构。
     * @param {object} config - 提示窗口的配置对象。
     */
    _createDOM(config) {
        const overlay = document.createElement('div');
        overlay.className = 'info-tooltip-overlay';
        overlay.tabIndex = -1; // 使其可获得焦点

        const tooltip = document.createElement('div');
        tooltip.className = 'info-tooltip-modal';
        if (config.width) tooltip.style.width = config.width;
        if (config.height) tooltip.style.height = config.height;

        // --- Header ---
        const header = document.createElement('div');
        header.className = 'info-tooltip-header';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'info-tooltip-title-container';

        if (config.titleIcon) {
            const iconElement = createSVGFromString(config.titleIcon);
            iconElement.classList.add('info-tooltip-title-icon');
            titleContainer.appendChild(iconElement);
        }

        const titleElement = document.createElement('h3');
        titleElement.className = 'info-tooltip-title';
        titleElement.textContent = config.title;
        titleContainer.appendChild(titleElement);

        const closeButton = document.createElement('span');
        closeButton.className = 'info-tooltip-close';
        closeButton.appendChild(createSVGFromString(closeIcon));
        closeButton.addEventListener('click', () => this.hide());

        header.appendChild(titleContainer);
        header.appendChild(closeButton);

        // --- Content ---
        const content = document.createElement('div');
        content.className = 'info-tooltip-content';

        const textElement = document.createElement('p');
        textElement.innerHTML = createTrustedHTML(config.text || ''); // 使用 TrustedHTML 安全地设置内容
        content.appendChild(textElement);

        tooltip.appendChild(header);
        tooltip.appendChild(content);
        overlay.appendChild(tooltip);

        this.tooltipElement = overlay;

        uiContainer.appendChild(this.tooltipElement);
    }

    /**
     * @public
     * @description 显示并填充提示窗口。
     * @param {object} config - 提示窗口的配置对象。
     */
    show(config) {
        if (!this.tooltipElement) {
            this._createDOM(config);
        }

        fire('infoTooltipWillShow'); // 通知父组件 tooltip 即将显示

        // 短暂延迟以确保 DOM 更新完毕，从而使 CSS 过渡动画能够生效
        setTimeout(() => {
            if (this.tooltipElement) {
                const onTransitionEnd = () => {
                    this.tooltipElement.focus(); // 将焦点设置到覆盖层
                    this.tooltipElement.addEventListener('keydown', this.handleEscKey);
                    this.tooltipElement.removeEventListener('transitionend', onTransitionEnd);
                };
                this.tooltipElement.addEventListener('transitionend', onTransitionEnd);
                this.tooltipElement.classList.add('is-visible');
            }
        }, 10);
    }

    /**
     * @public
     * @description 关闭并销毁提示窗口。
     */
    hide() {
        if (this.tooltipElement && this.tooltipElement.classList.contains('is-visible')) {
            this.tooltipElement.classList.remove('is-visible');
            this.tooltipElement.removeEventListener('keydown', this.handleEscKey);

            const onTransitionEnd = () => {
                if (this.tooltipElement && this.tooltipElement.parentNode) {
                    this.tooltipElement.removeEventListener('transitionend', onTransitionEnd);
                    this.tooltipElement.parentNode.removeChild(this.tooltipElement);
                    this.tooltipElement = null;
                    fire('infoTooltipDidHide'); // 通知父组件 tooltip 已完全隐藏
                }
            };

            this.tooltipElement.addEventListener('transitionend', onTransitionEnd);
        }
    }

    /**
     * @private
     * @description 处理在提示窗口激活时按键按下的事件。
     * @param {KeyboardEvent} event - 键盘事件对象。
     */
    handleEscKey(event) {
        if (event.key === 'Escape') {
            event.stopImmediatePropagation(); // 彻底阻止事件传播，避免影响上层UI
            this.hide();
        }
    }
}

export const infoTooltip = new Tooltip();
