// src/features/quick-scan/ui.js

import { openModal } from '../../shared/ui/mainModal/index.js';
import { log } from '../../shared/utils/core/logger.js';
import { t } from '../../shared/i18n/index.js';
import { showNotification } from '../../shared/ui/components/notification.js';
import { acquireScanMode, releaseScanMode, SCAN_MODES } from '../../shared/services/scanModeCoordinator.js';

/**
 * 处理“快捷扫描”按钮点击事件的逻辑。
 */
export async function handleQuickScanClick() {
    if (!acquireScanMode(SCAN_MODES.STATIC)) {
        showNotification(t('notifications.scanModeConflict'), { type: 'info' });
        return;
    }
    log(t('scan.quick'));
    try {
        await openModal();
    } finally {
        releaseScanMode(SCAN_MODES.STATIC);
    }
}
