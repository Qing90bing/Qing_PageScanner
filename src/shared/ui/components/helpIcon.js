// src/shared/ui/components/helpIcon.js

import { questionMarkIcon } from '../../../assets/icons/questionMarkIcon.js';
import { infoTooltip } from './infoTooltip.js';
import { t } from '../../i18n/index.js';
import { createTrustedHTML } from '../../utils/trustedTypes.js';
import { log } from '../../utils/logger.js';
import { questionMarkIcon as titleIcon } from '../../../assets/icons/questionMarkIcon.js';


/**
 * 创建一个可复用的帮助图标组件。
 * 点击该图标会显示一个包含指定内容的帮助提示框。
 *
 * @param {string} contentKey - 用于从i18n资源中获取提示框内容的键。
 * @returns {HTMLElement} - 创建的帮助图标按钮元素。
 */
export function createHelpIcon(contentKey) {
    const helpButton = document.createElement('button');
    helpButton.className = 'tc-help-icon-button';
    helpButton.innerHTML = createTrustedHTML(questionMarkIcon);

    helpButton.addEventListener('click', (event) => {
        event.stopPropagation();
        log(`Help icon clicked, showing content for key: ${contentKey}`);
        const helpContent = t(contentKey);
        infoTooltip.show({
            title: t(`${contentKey}Title`), // Dynamically create title key
            text: helpContent,
            titleIcon: titleIcon
        });
    });

    return helpButton;
}
