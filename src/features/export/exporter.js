// src/features/export/exporter.js

/**
 * @module exporter
 * @description 负责将提取的文本数据格式化并导出为不同文件格式。
 */

import { log } from '../../shared/utils/logger.js';
import { on } from '../../shared/utils/eventBus.js';
import { getCurrentMode, outputTextarea } from '../../shared/ui/mainModal/modalState.js';
import { fullQuickScanContent } from '../../shared/ui/mainModal.js';
import { t } from '../../shared/i18n/index.js';
import { requestSummary } from '../session-scan/logic.js';
import { loadSettings } from '../../features/settings/logic.js';

/**
 * @private
 * @description 获取当前网页标题，并清理文件名中不允许的字符。
 */
function getPageTitle() {
    return document.title.replace(/[\\/:*?"<>|]/g, '_').trim() || 'Exported_Text';
}

/**
 * @private
 * @description 生成带时间戳的标准化文件名。
 */
function generateFilename(extension) {
    const title = getPageTitle();
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
    return `${title}_${timestamp}.${extension}`;
}

/**
 * @private
 * @description 触发浏览器下载文件。
 */
function downloadFile(filename, content, mimeType) {
    // 添加 BOM 解决 Excel 中文乱码
    const blobContent = filename.endsWith('.csv') ? ['\uFEFF', content] : [content];
    const blob = new Blob(blobContent, { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    log(t('log.exporter.fileExported', { filename }));
}

/**
 * @description 根据设置中的输出格式导出文本。
 */
function exportToFile() {
    const currentMode = getCurrentMode();
    const settings = loadSettings();
    const outputFormat = settings.outputFormat || 'array';

    // 定义核心处理函数
    const processAndDownload = (text) => {
        if (!text || text.trim() === '' || text.trim() === '[]' || text.trim() === '{}') {
            log(t('log.exporter.noContent'));
            return;
        }

        let filename, mimeType;

        switch (outputFormat) {
            case 'array':
                filename = generateFilename('txt');
                mimeType = 'text/plain;charset=utf-8;';
                break;
            case 'object':
                filename = generateFilename('json');
                mimeType = 'application/json;charset=utf-8;';
                break;
            case 'csv':
                filename = generateFilename('csv');
                mimeType = 'text/csv;charset=utf-8;';
                break;
            default:
                filename = generateFilename('txt');
                mimeType = 'text/plain;charset=utf-8;';
        }

        // 此时 text 已经是符合 outputFormat 的格式字符串（因为 Worker 已经处理过了）
        downloadFile(filename, text, mimeType);
    };

    // --- 优先使用用户编辑过的内容 ---
    
    // 1. 获取当前 UI 文本框里的内容
    const currentUiContent = outputTextarea ? outputTextarea.value : null;
    
    // 2. 检查是否有截断警告
    const truncationWarning = t('scan.truncationWarning');
    const isTruncated = currentUiContent && currentUiContent.includes(truncationWarning);

    // 3. 如果 UI 里有内容，且没有被截断，直接导出 UI 里的内容
    if (currentUiContent && !isTruncated && currentUiContent.trim() !== '') {
        log('Exporting user-edited content from UI.');
        processAndDownload(currentUiContent);
        return;
    }

    // 4. 回退到使用内存中的原始数据
    log('Exporting original raw data (UI content invalid or truncated).');
    
    if (currentMode === 'session-scan') {
        log(t('log.main.requestingSessionScanData'));
        requestSummary(processAndDownload);
    } else {
        log(t('log.main.exportingQuickScanData'));
        processAndDownload(fullQuickScanContent);
    }
}

/**
 * @description 初始化导出器模块，监听导出事件。
 */
export function initializeExporter() {
    on('exportToFile', exportToFile);
}
