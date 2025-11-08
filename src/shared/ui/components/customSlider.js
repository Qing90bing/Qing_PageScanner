// src/shared/ui/components/customSlider.js
import { t } from '../../i18n/index.js';
import { createTrustedHTML } from '../../utils/trustedTypes.js';

export class CustomSlider {
    constructor({ min, max, value, onChange }) {
        this.min = min;
        this.max = max;
        this.value = value;
        this.onChange = onChange;
        this.isInitialized = false;
        this.observer = null;

        this.element = this.createSliderElement();
        this.thumb = this.element.querySelector('.custom-slider-thumb');
        this.track = this.element.querySelector('.custom-slider-track');
        this.ticksContainer = this.element.querySelector('.custom-slider-ticks');

        this.resizeHandler = this.updateThumbPosition.bind(this);
        this.initOnVisible();
    }

    initOnVisible() {
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!this.isInitialized) {
                        this.performInitialMeasurement();
                        this.isInitialized = true;
                    }
                    // Stop observing once it's visible and initialized.
                    observer.unobserve(this.element);
                }
            });
        }, { threshold: 0.1 }); // Trigger when at least 10% is visible

        this.observer.observe(this.element);
    }

    performInitialMeasurement() {
        this.updateTicks();
        this.getStyleValues();
        this.updateThumbPosition();
        this.addEventListeners();
    }

    getStyleValues() {
        const ticksStyle = window.getComputedStyle(this.ticksContainer);
        const firstTick = this.ticksContainer.querySelector('.custom-slider-tick');

        this.padding = parseFloat(ticksStyle.paddingLeft) || 0;
        this.tickWidth = firstTick ? (parseFloat(window.getComputedStyle(firstTick).width) || 0) : 0;
    }

    createSliderElement() {
        const container = document.createElement('div');
        container.className = 'custom-slider-container';

        const infoText = document.createElement('div');
        infoText.className = 'custom-slider-info-text';
        infoText.textContent = t('slider.adjustFrameSize');
        container.appendChild(infoText);

        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'custom-slider-wrapper';

        const minLabel = document.createElement('div');
        minLabel.className = 'custom-slider-label custom-slider-label-min';
        minLabel.textContent = t('slider.minLabel');

        const maxLabel = document.createElement('div');
        maxLabel.className = 'custom-slider-label custom-slider-label-max';
        maxLabel.textContent = t('slider.maxLabel');

        const track = document.createElement('div');
        track.className = 'custom-slider-track';

        const ticks = document.createElement('div');
        ticks.className = 'custom-slider-ticks';

        const thumb = document.createElement('div');
        thumb.className = 'custom-slider-thumb';

        track.appendChild(ticks);
        track.appendChild(thumb);

        sliderWrapper.appendChild(minLabel);
        sliderWrapper.appendChild(track);
        sliderWrapper.appendChild(maxLabel);

        container.appendChild(sliderWrapper);
        return container;
    }

    updateTicks() {
        const numTicks = this.max - this.min + 1;
        if (numTicks > 1) {
            const ticksHtml = Array.from({ length: numTicks }, () => `<div class="custom-slider-tick"></div>`).join('');
            this.ticksContainer.innerHTML = createTrustedHTML(ticksHtml);
        } else {
            this.ticksContainer.innerHTML = createTrustedHTML('');
        }
    }

    updateThumbPosition() {
        if (!this.isInitialized) return;
        requestAnimationFrame(() => {
            if (!this.track || !this.thumb) return;
            const trackWidth = this.track.offsetWidth;
            const thumbWidth = this.thumb.offsetWidth;
            const travelRange = trackWidth - 2 * this.padding - this.tickWidth;
            const travelStart = this.padding + this.tickWidth / 2;
            const percentage = this.max > this.min ? (this.value - this.min) / (this.max - this.min) : 0;
            const thumbCenterTarget = travelStart + percentage * travelRange;
            let newLeft = thumbCenterTarget - thumbWidth / 2;
            this.thumb.style.left = `${newLeft}px`;
        });
    }

    addEventListeners() {
        this.boundHandleMouseDown = this.handleMouseDown.bind(this);
        this.boundHandleTrackClick = this.handleTrackClick.bind(this);
        this.thumb.addEventListener('mousedown', this.boundHandleMouseDown);
        this.track.addEventListener('click', this.boundHandleTrackClick);
        window.addEventListener('resize', this.resizeHandler);
    }

    handleTrackClick(e) {
        if (e.target === this.thumb || !this.isInitialized) return;
        const rect = this.track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const travelRange = rect.width - 2 * this.padding - this.tickWidth;
        const travelStart = this.padding + this.tickWidth / 2;
        const percentage = (clickX - travelStart) / travelRange;
        const clampedPercentage = Math.max(0, Math.min(1, percentage));
        const newValue = Math.round(this.min + clampedPercentage * (this.max - this.min));
        this.setValue(newValue);
    }

    handleMouseDown(e) {
        if (!this.isInitialized) return;
        e.preventDefault();
        this.thumb.classList.add('is-dragging');
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleMouseUp = this.handleMouseUp.bind(this);
        document.addEventListener('mousemove', this.boundHandleMouseMove);
        document.addEventListener('mouseup', this.boundHandleMouseUp);
    }

    handleMouseMove(e) {
        if (!this.isInitialized) return;
        const rect = this.track.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const travelRange = rect.width - 2 * this.padding - this.tickWidth;
        const travelStart = this.padding + this.tickWidth / 2;
        const percentage = (newX - travelStart) / travelRange;
        const clampedPercentage = Math.max(0, Math.min(1, percentage));
        const newValue = Math.round(this.min + clampedPercentage * (this.max - this.min));
        if (newValue !== this.value) {
            this.setValue(newValue);
        }
    }

    handleMouseUp() {
        if (!this.isInitialized) return;
        this.thumb.classList.remove('is-dragging');
        document.removeEventListener('mousemove', this.boundHandleMouseMove);
        document.removeEventListener('mouseup', this.boundHandleMouseUp);
        this.updateThumbPosition();
    }

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

    getElement() {
        return this.element;
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.thumb && this.boundHandleMouseDown) {
            this.thumb.removeEventListener('mousedown', this.boundHandleMouseDown);
        }
        if (this.track && this.boundHandleTrackClick) {
            this.track.removeEventListener('click', this.boundHandleTrackClick);
        }
        window.removeEventListener('resize', this.resizeHandler);
        this.track = null;
        this.thumb = null;
    }
}
