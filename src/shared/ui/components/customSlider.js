// src/shared/ui/components/customSlider.js
import { t } from '../../i18n/index.js';

/**
 * CustomSlider 类用于创建一个可自定义的滑块组件。
 * @class
 */
export class CustomSlider {
    /**
     * 创建一个 CustomSlider 实例。
     * @param {object} options - 滑块的配置选项。
     * @param {number} options.min - 滑块的最小值。
     * @param {number} options.max - 滑块的最大值。
     * @param {number} options.value - 滑块的初始值。
     * @param {function(number): void} options.onChange - 当滑块值改变时调用的回调函数。
     */
    constructor({ min, max, value, onChange }) {
        this.min = min;
        this.max = max;
        this.value = value;
        this.onChange = onChange;
        this.element = this.createSliderElement();
        this.thumb = this.element.querySelector('.custom-slider-thumb');
        this.track = this.element.querySelector('.custom-slider-track');
        this.ticksContainer = this.element.querySelector('.custom-slider-ticks');

        this.updateTicks();
        this.updateThumbPosition();

        this.addEventListeners();
    }

    /**
     * 创建滑块的 DOM 结构。
     * @returns {HTMLElement} 滑块的根元素。
     * @private
     */
    createSliderElement() {
        const container = document.createElement('div');
        container.className = 'custom-slider-container';

        const infoText = document.createElement('div');
        infoText.className = 'custom-slider-info-text';
        infoText.textContent = t('slider.adjustFrameSize');
        container.appendChild(infoText);

        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'custom-slider-wrapper';

        const track = document.createElement('div');
        track.className = 'custom-slider-track';

        const ticks = document.createElement('div');
        ticks.className = 'custom-slider-ticks';

        const thumb = document.createElement('div');
        thumb.className = 'custom-slider-thumb';

        track.appendChild(ticks);
        track.appendChild(thumb); // 将 thumb 移入 track
        sliderWrapper.appendChild(track);
        container.appendChild(sliderWrapper);

        return container;
    }

    /**
     * 更新轨道上的刻度点。
     * @private
     */
    updateTicks() {
        this.ticksContainer.innerHTML = '';
        const numTicks = this.max - this.min + 1;
        if (numTicks > 1) {
            for (let i = 0; i <= this.max; i++) {
                const tick = document.createElement('div');
                tick.className = 'custom-slider-tick';
                this.ticksContainer.appendChild(tick);
            }
        }
    }

    /**
     * 根据当前值更新滑块按钮的位置。
     * @private
     */
    updateThumbPosition() {
        const trackWidth = this.track.offsetWidth;
        const thumbWidth = this.thumb.offsetWidth;

        // 关键修复：计算位置时使用轨道的总宽度，以确保与刻度对齐
        const percentage = this.max > this.min ? (this.value - this.min) / (this.max - this.min) : 0;
        const targetCenter = percentage * trackWidth;
        let newLeft = targetCenter - (thumbWidth / 2);

        // 确保滑块不会超出轨道的边界
        newLeft = Math.max(0, newLeft);
        newLeft = Math.min(trackWidth - thumbWidth, newLeft);

        this.thumb.style.left = `${newLeft}px`;
    }

    /**
     * 添加所有必要的事件监听器。
     * @private
     */
    addEventListeners() {
        this.thumb.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.track.addEventListener('click', this.handleTrackClick.bind(this));
    }

    /**
     * 处理轨道点击事件，将滑块移动到点击位置。
     * @param {MouseEvent} e - 鼠标事件对象。
     * @private
     */
    handleTrackClick(e) {
        if (e.target === this.thumb) return;

        const rect = this.track.getBoundingClientRect();
        let clickX = e.clientX - rect.left;

        // 关键修复：基于轨道总宽度计算百分比
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const newValue = Math.round(this.min + percentage * (this.max - this.min));
        this.setValue(newValue);
    }

    /**
     * 处理鼠标在滑块按钮上按下的事件。
     * @param {MouseEvent} e - 鼠标事件对象。
     * @private
     */
    handleMouseDown(e) {
        e.preventDefault();
        this.thumb.classList.add('is-dragging');

        // 绑定到 document 是为了确保即使鼠标移出滑块范围也能继续拖动
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * 处理鼠标移动事件，更新滑块位置和值。
     * @param {MouseEvent} e - 鼠标事件对象。
     * @private
     */
    handleMouseMove(e) {
        const rect = this.track.getBoundingClientRect();
        let newX = e.clientX - rect.left;

        // 关键修复：基于轨道总宽度计算百分比
        const percentage = Math.max(0, Math.min(1, newX / rect.width));
        const newValue = Math.round(this.min + percentage * (this.max - this.min));

        if (newValue !== this.value) {
            this.setValue(newValue);
        }
    }

    /**
     * 处理鼠标释放事件，结束拖动。
     * @private
     */
    handleMouseUp() {
        this.thumb.classList.remove('is-dragging');
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        // 吸附到最近的刻度
        this.updateThumbPosition();
    }

    /**
     * 设置滑块的新值，并触发 onChange 回调。
     * @param {number} newValue - 新的滑块值。
     */
    setValue(newValue) {
        const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
        if (this.value !== clampedValue) {
            this.value = clampedValue;
            this.updateThumbPosition();
            if (this.onChange) {
                this.onChange(this.value);
            }
        }
    }

    /**
     * 返回滑块的根 DOM 元素。
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }

    /**
     * 销毁组件，移除事件监听器。
     */
    destroy() {
        this.thumb.removeEventListener('mousedown', this.handleMouseDown);
        this.track.removeEventListener('click', this.handleTrackClick);
        // 如果有其他需要清理的，也在这里进行
    }
}
