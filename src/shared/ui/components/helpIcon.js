// src/shared/ui/components/helpIcon.js

import { questionMarkIcon } from '../../../assets/icons/questionMarkIcon.js';
import { infoTooltip } from './infoTooltip.js';
import { t } from '../../i18n/index.js';
import { createTrustedHTML } from '../../utils/dom/trustedTypes.js';
import { log } from '../../utils/core/logger.js';
import { simpleTemplate } from '../../utils/dom/templating.js';
import { showTooltip, hideTooltip } from './tooltip.js';

/**
 * @file 提供了创建帮助图标UI组件的功能。
 * @description
 * 该模块遵循与 `topCenterCounter` 相似的工厂模式。
 * 它导出一个 `createHelpIcon` 函数，该函数创建并返回一个独立的帮助图标按钮。
 * 组件的内部逻辑（如点击事件）被完全封装，使其易于在应用程序的任何地方重用。
 */

/**
 * @public
 * @function createHelpIcon
 * @description 创建并返回一个可复用的帮助图标按钮。
 * 点击该按钮将触发一个信息提示框（infoTooltip），显示相应的帮助内容。
 * @param {string} contentKey - 一个i18n键。该函数会用这个键来查找帮助文本，
 * 并通过在其后附加 "Title" (例如 `contentKeyTitle`) 来查找标题文本。
 * @returns {HTMLButtonElement} - 返回一个配置好的 `button` 元素，并附带一个 `destroy` 方法用于清理。
 */
export function createHelpIcon(contentKey) {
    const helpButton = document.createElement('button');
    helpButton.className = 'tc-icon-button';
    helpButton.innerHTML = createTrustedHTML(questionMarkIcon);
    const controller = new AbortController();
    const { signal } = controller;

    const handleClick = (event) => {
        event.stopPropagation();
        log(simpleTemplate(t('log.ui.helpIcon.clicked'), { contentKey }));
        const helpContent = t(contentKey);
        const helpTitle = t(`${contentKey}Title`);
        infoTooltip.show({
            title: helpTitle,
            text: helpContent,
            titleIcon: questionMarkIcon
        });
    };

    helpButton.addEventListener('click', handleClick, { signal });

    const handleMouseEnter = () => showTooltip(helpButton, t('tooltip.tooltipHelp'));
    const handleMouseLeave = () => hideTooltip();

    helpButton.addEventListener('mouseenter', handleMouseEnter, { signal });
    helpButton.addEventListener('mouseleave', handleMouseLeave, { signal });

    /**
     * @memberof helpButton
     * @function destroy
     * @description 移除事件监听器，用于组件销毁时的资源清理。
     */
    helpButton.destroy = () => controller.abort();

    return helpButton;
}
