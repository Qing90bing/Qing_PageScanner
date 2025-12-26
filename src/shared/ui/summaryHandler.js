// src/shared/ui/summaryHandler.js

import { updateModalContent, SHOW_PLACEHOLDER } from './mainModal/index.js';
import { updateScanCount } from './mainModal/modalHeader.js';
import { t } from '../i18n/index.js';
import { log } from '../utils/core/logger.js';
import { isElementScanActive, getStagedTexts } from '../../features/element-scan/logic.js';
import { showSessionSummary } from '../../features/session-scan/ui.js';
import { formatTextsForTranslation } from '../utils/text/formatting.js';
import { loadSettings } from '../../features/settings/logic.js';

/**
 * @public
 * @function handleSummaryClick
 * @description “查看摘要”按钮的智能点击处理函数。
 *              能自动判断当前应显示“选取元素扫描”的暂存内容，还是“会话扫描”的摘要。
 */
export function handleSummaryClick() {
    log(t('tooltip.summary'));

    // 检查“选取元素扫描”是否处于活动状态
    if (isElementScanActive()) {
        // 如果是，则显示暂存的文本
        const stagedTexts = getStagedTexts();
        const { outputFormat } = loadSettings();
        const formattedText = formatTextsForTranslation(Array.from(stagedTexts), outputFormat);

        updateScanCount(stagedTexts.size, 'element-scan');

        if (stagedTexts.size === 0) {
            updateModalContent(SHOW_PLACEHOLDER, true, 'element-scan');
        } else {
            updateModalContent(formattedText, true, 'element-scan');
        }
    } else {
        // 否则，调用专门的会话扫描摘要函数
        showSessionSummary();
    }
}
