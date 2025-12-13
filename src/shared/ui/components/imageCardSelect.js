// src/shared/ui/components/imageCardSelect.js

import { createSVGFromString } from '../../utils/dom.js';
import { createTrustedHTML } from '../../utils/trustedTypes.js';

/**
 * @class ImageCardSelect
 * @description 创建一个基于卡片的选择组件，包含 CSS 绘制的示意图预览和单选按钮。
 */
export class ImageCardSelect {
    /**
     * @param {HTMLElement} parentElement - 组件将被附加到的父容器。
     * @param {Array<Object>} options - 选项数组，每个对象包含 { value, label, icon, previewType }。
     * @param {string} initialValue - 初始选中的值。
     */
    constructor(parentElement, options, initialValue) {
        this.parentElement = parentElement;
        this.options = options;
        this.currentValue = initialValue;
        this.render();
        this.bindEvents();
    }

    /**
     * @private
     * @description 渲染组件的 DOM 结构。
     */
    render() {
        this.container = document.createElement('div');
        this.container.className = 'image-card-select-container';

        this.options.forEach(option => {
            const card = document.createElement('div');
            card.className = 'image-card-option';
            card.dataset.value = option.value;
            if (option.value === this.currentValue) {
                card.classList.add('selected');
            }

            // 1. 预览区域 (使用 CSS 绘制示意图)
            const preview = document.createElement('div');
            preview.className = 'image-card-preview';
            
            if (option.previewType === 'code-array') {
                preview.appendChild(this.createCodePreview('array'));
            } else if (option.previewType === 'code-object') {
                preview.appendChild(this.createCodePreview('object'));
            } else if (option.previewType === 'code-csv') {
                preview.appendChild(this.createCodePreview('csv'));
            } else {
                // Default Theme Schematic
                preview.appendChild(this.createThemeSchematic());
            }

            card.appendChild(preview);

            // 2. 标签区域 (Radio + Text + Icon)
            const labelContainer = document.createElement('div');
            labelContainer.className = 'image-card-label';

            const radioCircle = document.createElement('div');
            radioCircle.className = 'image-card-radio';
            const radioDot = document.createElement('div');
            radioDot.className = 'radio-dot';
            radioCircle.appendChild(radioDot);

            const labelText = document.createElement('span');
            labelText.textContent = option.label;

            labelContainer.appendChild(radioCircle);
            labelContainer.appendChild(labelText);

            // 如果定义了图标，则添加到标签区域
            if (option.icon) {
                const labelIcon = document.createElement('div');
                labelIcon.className = 'image-card-label-icon';
                labelIcon.appendChild(createSVGFromString(option.icon));
                labelContainer.appendChild(labelIcon);
            }

            card.appendChild(labelContainer);
            this.container.appendChild(card);
        });

        this.parentElement.appendChild(this.container);
    }

    /**
     * @private
     * @description 创建默认的主题示意图。
     */
    createThemeSchematic() {
        const container = document.createElement('div');
        container.className = 'schematic-container';

        const schematicCard = document.createElement('div');
        schematicCard.className = 'schematic-card';

        const iconBox = document.createElement('div');
        iconBox.className = 'schematic-icon-box';

        const linesContainer = document.createElement('div');
        linesContainer.className = 'schematic-lines';

        const line1 = document.createElement('div');
        line1.className = 'schematic-line primary';

        const line2 = document.createElement('div');
        line2.className = 'schematic-line secondary';

        linesContainer.appendChild(line1);
        linesContainer.appendChild(line2);

        schematicCard.appendChild(iconBox);
        schematicCard.appendChild(linesContainer);
        container.appendChild(schematicCard);

        return container;
    }

    /**
     * @private
     * @description 创建代码格式预览示意图 (文本模式)。
     * @param {string} type - 'array', 'object', or 'csv'
     */
    createCodePreview(type) {
        const container = document.createElement('div');
        container.className = `code-preview ${type}`;

        const codeBlock = document.createElement('div');
        codeBlock.className = 'code-text-preview';

        if (type === 'array') {
            // Updated to be more detailed as requested
            codeBlock.innerHTML = createTrustedHTML(`
                <span class="punct">[</span><br>
                &nbsp;&nbsp;<span class="punct">[</span><span class="str">"Hello"</span><span class="punct">,</span> <span class="str">""</span><span class="punct">],</span><br>
                &nbsp;&nbsp;<span class="punct">[</span><span class="str">"World"</span><span class="punct">,</span> <span class="str">""</span><span class="punct">]</span><br>
                <span class="punct">]</span>
            `);
        } else if (type === 'object') {
            // { "Hello": "", "World": "" }
            codeBlock.innerHTML = createTrustedHTML(`
                <span class="punct">{</span><br>
                &nbsp;&nbsp;<span class="str">"Hello"</span><span class="punct">:</span> <span class="str">""</span><span class="punct">,</span><br>
                &nbsp;&nbsp;<span class="str">"World"</span><span class="punct">:</span> <span class="str">""</span><br>
                <span class="punct">}</span>
            `);
        } else if (type === 'csv') {
            // "Hello",""
            codeBlock.innerHTML = createTrustedHTML(`
                <span class="str">"Hello"</span><span class="punct">,</span><span class="str">""</span><br>
                <span class="str">"World"</span><span class="punct">,</span><span class="str">""</span>
            `);
        }

        container.appendChild(codeBlock);
        return container;
    }

    /**
     * @private
     * @description 绑定事件监听器。
     */
    bindEvents() {
        this.handleCardClick = (e) => {
            const card = e.target.closest('.image-card-option');
            if (card) {
                this.select(card.dataset.value);
            }
        };
        this.container.addEventListener('click', this.handleCardClick);
    }

    /**
     * @public
     * @description 选择一个选项。
     * @param {string} value - 要选择的选项值。
     */
    select(value) {
        if (this.currentValue === value) return;

        this.currentValue = value;

        // 更新 UI
        const cards = this.container.querySelectorAll('.image-card-option');
        cards.forEach(card => {
            if (card.dataset.value === value) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
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
     * @description 销毁组件。
     */
    destroy() {
        if (this.container && this.handleCardClick) {
            this.container.removeEventListener('click', this.handleCardClick);
            this.container.remove();
        }
    }
}
