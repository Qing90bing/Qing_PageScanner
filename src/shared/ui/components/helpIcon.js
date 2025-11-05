// src/shared/ui/components/helpIcon.js

import { questionMarkIcon } from '../../../assets/icons/questionMarkIcon.js';
import { infoTooltip } from './infoTooltip.js';
import { t } from '../../i18n/index.js';
import { createTrustedHTML } from '../../utils/trustedTypes.js';
import { log } from '../../utils/logger.js';

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
 * @returns {HTMLButtonElement} - 返回一个配置好的 `button` 元素。
 */
export function createHelpIcon(contentKey) {
    const helpButton = document.createElement('button');
    helpButton.className = 'tc-help-icon-button';
    // 使用 Trusted Types 来安全地将 SVG 字符串设置为按钮的 innerHTML。
    helpButton.innerHTML = createTrustedHTML(questionMarkIcon);

    // 为按钮添加点击事件监听器，以显示信息提示框。
    helpButton.addEventListener('click', (event) => {
        // 阻止事件冒泡，以避免意外触发父元素的点击事件（例如，关闭模态框）。
        event.stopPropagation();

        log(`点击了帮助图标，显示内容键: ${contentKey}`);

        // 从i18n资源中获取标题和正文文本。
        const helpContent = t(contentKey);
        const helpTitle = t(`${contentKey}Title`);

        // 调用 infoTooltip 单例来显示帮助信息。
        infoTooltip.show({
            title: helpTitle,
            text: helpContent,
            titleIcon: questionMarkIcon // 将同一个图标用于标题
        });
    });

    return helpButton;
}
