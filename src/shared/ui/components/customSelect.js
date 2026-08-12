// src/ui/components/customSelect.js

/**
 * @module customSelect
 * @description 创建一个功能丰富、样式现代的自定义下拉选择组件。
 */

import { createIconTitle } from './iconTitle.js';
import { getCustomSelectOptionsMaxHeight } from './customSelectAnimation.js';
import { listenClickOutside } from '../../utils/dom/clickOutside.js';
import { createSVGFromString } from '../../utils/dom/dom.js';
import { arrowDownIcon } from '../../../assets/icons/arrowDownIcon.js';

export class CustomSelect {
    /**
     * @param {HTMLElement} parentElement - 组件将被附加到的父容器。
     * @param {Array<Object>} options - 选项数组，每个对象包含 { value, label, icon }。
     * @param {string} initialValue - 初始选中的值。
     */
    constructor(parentElement, options, initialValue) {
        this.parentElement = parentElement;
        this.options = options;
        this.currentValue = initialValue;
        this.isOpen = false;
        this.abortController = null;

        this.render();
        this.bindEvents();
    }

    /**
     * @private
     * @description 渲染组件的 DOM 结构。
     */
    render() {
        this.container = document.createElement('div');
        this.container.className = 'custom-select-container';
        this.container.dataset.value = this.currentValue;

        // 1. 创建触发器
        this.trigger = document.createElement('div');
        this.trigger.className = 'custom-select-trigger';
        this.trigger.tabIndex = 0;
        this.trigger.setAttribute('role', 'combobox');
        this.trigger.setAttribute('aria-haspopup', 'listbox');
        this.trigger.setAttribute('aria-expanded', 'false');

        this.selectedContent = document.createElement('div');
        this.selectedContent.className = 'selected-option-content';

        const arrowDiv = document.createElement('div');
        arrowDiv.className = 'custom-select-arrow';
        const arrowSVG = createSVGFromString(arrowDownIcon);
        if (arrowSVG) {
            arrowDiv.appendChild(arrowSVG);
        }

        this.trigger.appendChild(this.selectedContent);
        this.trigger.appendChild(arrowDiv);

        // 2. 创建选项容器
        this.optionsContainer = document.createElement('div');
        this.optionsContainer.className = 'custom-select-options';
        this.optionsContainer.setAttribute('role', 'listbox');

        // 3. 组装并附加到父元素
        this.container.appendChild(this.trigger);
        this.container.appendChild(this.optionsContainer);
        this.parentElement.appendChild(this.container);

        // 4. 填充内容
        let initialOption = this.options.find((opt) => opt.value === this.currentValue);
        // 如果初始值在选项中不存在，则默认选择第一个选项
        if (!initialOption && this.options.length > 0) {
            console.warn(`CustomSelect: 初始值 "${this.currentValue}" 在选项中未找到。将默认选择第一个选项。`);
            initialOption = this.options[0];
            this.currentValue = initialOption.value;
        }

        this.populateOptions();
        this.syncOptionsHeight();
        this.updateSelectedContent(initialOption);
    }

    /**
     * @private
     * @description 填充选项列表。
     */
    populateOptions() {
        this.options.forEach((option) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.dataset.value = option.value;
            optionEl.setAttribute('role', 'option');

            if (option.value === this.currentValue) {
                optionEl.classList.add('selected');
            }

            const optionContent = createIconTitle(option.icon, option.label);
            optionEl.appendChild(optionContent);

            this.optionsContainer.appendChild(optionEl);
        });
    }

    /**
     * @private
     * Keep the opening animation duration independent from the number of options.
     */
    syncOptionsHeight() {
        const contentHeight = this.optionsContainer?.scrollHeight;
        if (!contentHeight) return;

        const maxHeight = getCustomSelectOptionsMaxHeight(contentHeight);
        this.optionsContainer.style.setProperty('--custom-select-options-height', `${maxHeight}px`);
    }

    /**
     * @private
     * @description 更新触发器区域显示的内容。
     * @param {Object} option - 被选中的选项对象。
     */
    updateSelectedContent(option) {
        // 清空现有内容
        while (this.selectedContent.firstChild) {
            this.selectedContent.removeChild(this.selectedContent.firstChild);
        }

        const content = createIconTitle(option.icon, option.label);
        this.selectedContent.appendChild(content);
    }

    /**
     * @private
     * @description 绑定所有必要的事件监听器。
     */
    bindEvents() {
        this.handleTriggerClick = this.toggle.bind(this);
        this.handleTriggerKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.toggle();
            } else if (event.key === 'Escape') {
                this.close();
            }
        };
        this.handleOptionClick = (e) => {
            const optionEl = e.target.closest('.custom-select-option');
            if (optionEl) {
                this.select(optionEl.dataset.value);
            }
        };

        this.trigger.addEventListener('click', this.handleTriggerClick);
        this.trigger.addEventListener('keydown', this.handleTriggerKeyDown);
        this.optionsContainer.addEventListener('click', this.handleOptionClick);
    }

    /**
     * @private
     * @description 处理点击组件外部的事件（通用处理）。
     */

    /**
     * @public
     * @description 切换下拉菜单的打开/关闭状态。
     */
    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.syncOptionsHeight();
        }
        this.container.classList.toggle('open', this.isOpen);
        this.trigger.setAttribute('aria-expanded', String(this.isOpen));

        if (this.isOpen) {
            this.abortController = new AbortController();

            // 使用通用的 listenClickOutside 工具
            // 它是 Shadow DOM 安全的，并且自动处理了事件监听器的生命周期
            listenClickOutside(this.container, () => this.close(), {
                signal: this.abortController.signal,
            });
        } else {
            this.close(); // 确保清理
        }
    }

    /**
     * @public
     * @description 关闭下拉菜单。
     */
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.container.classList.remove('open');
            this.trigger.setAttribute('aria-expanded', 'false');

            if (this.abortController) {
                this.abortController.abort();
                this.abortController = null;
            }
        }
    }

    /**
     * @private
     * @description 移除所有外部点击监听器。
     */

    /**
     * @public
     * @description 选择一个选项。
     * @param {string} value - 要选择的选项的 value。
     */
    select(value, { emit = true } = {}) {
        if (value === this.currentValue) {
            this.close();
            return;
        }

        const selectedOption = this.options.find((opt) => opt.value === value);
        if (!selectedOption) {
            return;
        }

        this.currentValue = value;
        this.container.dataset.value = value;
        this.updateSelectedContent(selectedOption);

        // 更新选项列表中的 'selected' 类
        this.optionsContainer.querySelector('.custom-select-option.selected')?.classList.remove('selected');
        const newSelectedOptionEl = Array.from(this.optionsContainer.children).find(
            (option) => option.dataset.value === value
        );
        if (newSelectedOptionEl) {
            newSelectedOptionEl.classList.add('selected');
        }

        this.close();
        if (emit) {
            this.container.dispatchEvent(
                new CustomEvent('custom-select-change', {
                    detail: { value },
                })
            );
        }
    }

    /**
     * @public
     * @param {string} value
     * @param {object} [options]
     */
    setValue(value, options = { emit: false }) {
        this.select(value, options);
    }

    /**
     * @public
     * @returns {string} - 返回当前选中的值。
     */
    getValue() {
        return this.currentValue;
    }

    /**
     * @public
     * @description 更新下拉菜单的选项列表。
     * @param {Array<Object>} newOptions - 新的选项数组。
     */
    updateOptions(newOptions) {
        this.options = newOptions;

        if (!this.options.some((option) => option.value === this.currentValue)) {
            this.currentValue = this.options[0]?.value || '';
            this.container.dataset.value = this.currentValue;
        }

        // 清空旧的选项
        while (this.optionsContainer.firstChild) {
            this.optionsContainer.removeChild(this.optionsContainer.firstChild);
        }

        // 填充新选项并更新显示
        this.populateOptions();
        this.syncOptionsHeight();
        const currentSelectedOption = this.options.find((opt) => opt.value === this.currentValue);
        if (currentSelectedOption) {
            this.updateSelectedContent(currentSelectedOption);
        }
    }

    /**
     * @public
     * @description 销毁组件，移除所有事件监听器。
     */
    destroy() {
        this.close(); // 确保移除监听器

        if (this.trigger && this.handleTriggerClick) {
            this.trigger.removeEventListener('click', this.handleTriggerClick);
        }
        if (this.trigger && this.handleTriggerKeyDown) {
            this.trigger.removeEventListener('keydown', this.handleTriggerKeyDown);
        }
        if (this.optionsContainer && this.handleOptionClick) {
            this.optionsContainer.removeEventListener('click', this.handleOptionClick);
        }
    }
}
