// src/features/export/exporter.js

/**
 * @module exporter
 * @description 负责将提取的文本数据格式化并导出为不同文件格式。
 */

import { log } from '../../shared/utils/logger.js';
import { on } from '../../shared/utils/eventBus.js';
// 新增：导入 outputTextarea 以便获取用户编辑后的内容
import { getCurrentMode, outputTextarea } from '../../shared/ui/mainModal/modalState.js';
import { fullQuickScanContent } from '../../shared/ui/mainModal.js';
import { t } from '../../shared/i18n/index.js';
import { requestSummary } from '../session-scan/logic.js';

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
function generateFilename(format) {
    const title = getPageTitle();
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
    return `${title}_${timestamp}.${format}`;
}

/**
 * @private
 * @description 直接获取文本框的原始内容。
 */
function getRawContent(text) {
    return text;
}

/**
 * @private
 * @description 将文本数据格式化为 CSV 格式。
 */
function formatAsCsv(text) {
    const header = `"${t('export.csv.id')}","${t('export.csv.original')}","${t('export.csv.translation')}"\n`;

    try {
        const parsedData = JSON.parse(text);

        if (!Array.isArray(parsedData)) {
            log(t('log.exporter.csvError'), new Error('Parsed JSON is not an array.'));
            return header;
        }

        let csvContent = header;
        parsedData.forEach((row, index) => {
            if (Array.isArray(row) && row.length > 0) {
                // 处理原文
                let originalText = String(row[0] || '');
                originalText = originalText.replace(/"/g, '""'); // CSV 转义双引号

                // 处理译文 (关键修复：读取数组的第二个元素)
                let translationText = '';
                if (row.length > 1) {
                    translationText = String(row[1] || '');
                    translationText = translationText.replace(/"/g, '""'); // CSV 转义双引号
                }

                // 拼接 CSV 行：ID, 原文, 译文
                csvContent += `${index + 1},"${originalText}","${translationText}"\n`;
            }
        });
        
        return csvContent;

    } catch (error) {
        log(t('log.exporter.csvError'), error);
        return header;
    }
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
 * @description 根据所选格式导出文本。
 */
function exportToFile({ format }) {
    const currentMode = getCurrentMode();

    // 定义核心处理函数
    const processAndDownload = (text) => {
        if (!text || text.trim() === '' || text.trim() === '[]') {
            log(t('log.exporter.noContent'));
            return;
        }

        let filename, content, mimeType;

        switch (format) {
            case 'txt':
                filename = generateFilename('txt');
                content = getRawContent(text);
                mimeType = 'text/plain;charset=utf-8;';
                break;
            case 'json':
                filename = generateFilename('json');
                content = getRawContent(text);
                mimeType = 'application/json;charset=utf-8;';
                break;
            case 'csv':
                filename = generateFilename('csv');
                content = formatAsCsv(text);
                mimeType = 'text/csv;charset=utf-8;';
                break;
            default:
                log(t('log.exporter.unknownFormat', { format }));
                return;
        }

        downloadFile(filename, content, mimeType);
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