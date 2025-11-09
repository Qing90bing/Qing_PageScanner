// src/features/export/exporter.js

/**
 * @module exporter
 * @description 负责将提取的文本数据格式化并导出为不同文件格式。
 */

import { log } from '../../shared/utils/logger.js';
import { on } from '../../shared/utils/eventBus.js';
import { getCurrentMode } from '../../shared/ui/mainModal/modalState.js';
import { fullQuickScanContent } from '../../shared/ui/mainModal.js';
import { t } from '../../shared/i18n/index.js';
import { requestSummary } from '../session-scan/logic.js';

/**
 * @private
 * @description 获取当前网页标题，并清理文件名中不允许的字符。
 * @returns {string} 清理后的网页标题。
 */
function getPageTitle() {
    return document.title.replace(/[\\/:*?"<>|]/g, '_');
}

/**
 * @private
 * @description 生成带时间戳的标准化文件名。
 * @param {string} format - 文件格式扩展名 (e.g., 'txt', 'json', 'csv')。
 * @returns {string} 完整的文件名。
 */
function generateFilename(format) {
    const title = getPageTitle();
    const timestamp = new Date().toLocaleString('sv').replace(/ /g, '_').replace(/:/g, '-');
    return `${title}_${timestamp}.${format}`;
}

/**
 * @private
 * @description 直接获取文本框的原始内容。
 * @param {string} text - 从文本区提取的原始文本。
 * @returns {string} 原始文本内容。
 */
function getRawContent(text) {
    return text;
}

/**
 * @private
 * @description 将文本数据格式化为 CSV 格式。
 * @param {string} text - 从文本区提取的原始文本。
 * @returns {string} CSV 格式的字符串。
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
            // 确保 row 是一个数组并且至少有一个元素
            if (Array.isArray(row) && row.length > 0) {
                const originalText = String(row[0]); // 确保是字符串
                // 为了 CSV 格式的正确性，转义文本中的双引号
                const escapedLine = `"${originalText.replace(/"/g, '""')}"`;
                csvContent += `${index + 1},${escapedLine},""\n`;
            }
        });
        
        return csvContent;

    } catch (error) {
        log(t('log.exporter.csvError'), error);
        // 在 JSON 解析失败时，返回只包含表头的 CSV 以保持健壮性
        return header;
    }
}

/**
 * @private
 * @description 触发浏览器下载文件。
 * @param {string} filename - 要保存的文件名。
 * @param {string} content - 文件内容。
 * @param {string} mimeType - 文件的 MIME 类型。
 */
function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
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
 * @param {object} detail - 包含导出格式的对象。
 * @param {string} detail.format - 目标文件格式 ('txt', 'json', 'csv')。
 */
function exportToFile({ format }) {
    const currentMode = getCurrentMode();

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
