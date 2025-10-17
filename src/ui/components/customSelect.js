// src/ui/components/customSelect.js

/**
 * @module customSelect
 * @description 创建一个功能丰富、样式现代的自定义下拉选择组件。
 */

import { createIconTitle } from './iconTitle.js';

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

        this.render();
        this.bindEvents();
    }

    /**
     * @private
     * @description 渲染组件的 HTML 结构。
     */
    render() {
        this.container = document.createElement('div');
        this.container.className = 'custom-select-container';

        const initialOption = this.options.find(opt => opt.value === this.currentValue);

        this.container.innerHTML = `
            <div class="custom-select-trigger">
                <div class="selected-option-content"></div>
                <div class="custom-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </div>
            </div>
            <div class="custom-select-options"></div>
        `;

        this.parentElement.appendChild(this.container);
        this.trigger = this.container.querySelector('.custom-select-trigger');
        this.optionsContainer = this.container.querySelector('.custom-select-options');
        this.selectedContent = this.container.querySelector('.selected-option-content');

        this.populateOptions();
        this.updateSelectedContent(initialOption);
    }

    /**
     * @private
     * @description 填充选项列表。
     */
    populateOptions() {
        this.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'custom-select-option';
            optionEl.dataset.value = option.value;

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
     * @description 更新触发器区域显示的内容。
     * @param {Object} option - 被选中的选项对象。
     */
    updateSelectedContent(option) {
        const content = createIconTitle(option.icon, option.label);
        this.selectedContent.innerHTML = '';
        this.selectedContent.appendChild(content);
    }

    /**
     * @private
     * @description 绑定所有必要的事件监听器。
     */
    bindEvents() {
        this.trigger.addEventListener('click', () => this.toggle());

        this.optionsContainer.addEventListener('click', (e) => {
            const optionEl = e.target.closest('.custom-select-option');
            if (optionEl) {
                this.select(optionEl.dataset.value);
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });
    }

    /**
     * @public
     * @description 切换下拉菜单的打开/关闭状态。
     */
    toggle() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('open', this.isOpen);
    }

    /**
     * @public
     * @description 关闭下拉菜单。
     */
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.container.classList.remove('open');
        }
    }

    /**
     * @public
     * @description 选择一个选项。
     * @param {string} value - 要选择的选项的 value。
     */
    select(value) {
        if (value === this.currentValue) {
            this.close();
            return;
        }

        this.currentValue = value;
        const selectedOption = this.options.find(opt => opt.value === value);
        this.updateSelectedContent(selectedOption);

        // 更新选项列表中的 'selected' 类
        this.optionsContainer.querySelector('.custom-select-option.selected')?.classList.remove('selected');
        this.optionsContainer.querySelector(`[data-value="${value}"]`).classList.add('selected');

        this.close();
    }

    /**
     * @public
     * @returns {string} - 返回当前选中的值。
     */
    getValue() {
        return this.currentValue;
    }
}