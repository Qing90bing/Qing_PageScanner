// src/features/element-scan/tutorial.js

import { uiContainer } from '../../shared/ui/uiContainer.js';
import { infoTooltip } from '../../shared/ui/components/infoTooltip.js';
import { t } from '../../shared/i18n/index.js';
import { createTrustedHTML } from '../../shared/utils/trustedTypes.js';

let tutorialElement = null;

/**
 * @private
 * @function handleTutorialClick
 * @description 当用户点击教程图标时，显示一个包含详细使用说明的信息提示窗口。
 */
function handleTutorialClick() {
    infoTooltip.show({
        title: t('elementScan.tutorial.title'),
        text: createTrustedHTML(t('elementScan.tutorial.content')),
        width: '450px'
    });
}

/**
 * @private
 * @function createTutorialElement
 * @description 创建教程图标的 DOM 元素（如果它尚不存在）。
 *              该元素是一个包含 SVG 问号图标的胶囊状按钮。
 */
function createTutorialElement() {
    if (tutorialElement) return;

    tutorialElement = document.createElement('div');
    tutorialElement.className = 'tc-element-scan-tutorial';
    tutorialElement.innerHTML = createTrustedHTML(`
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    `);

    tutorialElement.addEventListener('click', handleTutorialClick);
    uiContainer.appendChild(tutorialElement);
}

/**
 * @public
 * @function showTutorialIcon
 * @description 显示教程图标，并确保其 DOM 元素已创建。
 *              使用 requestAnimationFrame 确保动画能被正确触发。
 */
export function showTutorialIcon() {
    createTutorialElement();
    requestAnimationFrame(() => {
        tutorialElement.classList.add('is-visible');
    });
}

/**
 * @public
 * @function hideTutorialIcon
 * @description 隐藏教程图标。
 *              如果元素存在，则通过移除 'is-visible' 类来触发淡出动画。
 */
export function hideTutorialIcon() {
    if (!tutorialElement) return;
    tutorialElement.classList.remove('is-visible');
}
