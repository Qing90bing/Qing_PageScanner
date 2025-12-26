// src/features/quick-scan/ui.js

import { openModal } from '../../shared/ui/mainModal/index.js';
import { log } from '../../shared/utils/core/logger.js';
import { t } from '../../shared/i18n/index.js';

/**
 * 处理“快捷扫描”按钮点击事件的逻辑。
 */
export function handleQuickScanClick() {
  log(t('scan.quick'));
  openModal();
}
