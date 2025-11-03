// src/features/element-scan/worker.js

/**
 * @module ElementScanWorker
 * @description 这个 Web Worker 负责在后台执行“选取元素扫描”的文本处理，
 *              包括文本过滤、去重和格式化，从而避免阻塞主线程。
 */

// --- 依赖导入 ---
// esbuild 会在构建时将这些模块内联进来
// @ts-ignore
import { shouldFilter } from '../../shared/utils/filterLogic.js';
// @ts-ignore
import { formatTextsForTranslation } from '../../shared/utils/formatting.js';

/**
 * @description 监听来自主线程的消息。
 * @param {MessageEvent} event - 消息事件对象。
 *        - `event.data.type` 必须是 'scan-element'。
 *        - `event.data.payload` 应包含 `texts` (字符串数组) 和 `filterRules` (过滤规则对象)。
 */
self.onmessage = (event) => {
    const { type, payload } = event.data;

    const enableDebugLogging = payload.enableDebugLogging || false;
    const translations = payload.translations || {};

    const t = (key, replacements) => {
        let value = translations[key] || key;
        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                const regex = new RegExp(`{{${placeholder}}}`, 'g');
                value = value.replace(regex, replacements[placeholder]);
            });
        }
        return value;
    };

    /**
     * @description Worker 内部的条件日志记录器。
     * @param {...*} args - 要打印的参数。
     */
    const log = (...args) => {
        if (enableDebugLogging) {
            console.log(t('workerLogPrefix'), ...args);
        }
    };

    if (type === 'scan-element') {
        const { texts, filterRules } = payload;
        const uniqueTexts = new Set();

        if (Array.isArray(texts)) {
            texts.forEach(rawText => {
                // 1. 基本验证
                if (!rawText || typeof rawText !== 'string') return;

                // 2. 规范化文本 (NFC, 统一换行符, trim)
                const normalizedText = rawText.normalize('NFC');
                const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, '\n').trim();
                if (textForFiltering === '') return;

                // 3. 应用过滤规则
                const filterResult = shouldFilter(textForFiltering, filterRules);
                if (filterResult) {
                    log(t('textFiltered', { text: textForFiltering, reason: filterResult }));
                    return;
                }

                // 4. 添加到结果集 (存储带统一换行符的版本)
                uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
            });
        }

        const textsArray = Array.from(uniqueTexts);
        const formattedText = formatTextsForTranslation(textsArray);

        log(t('scanComplete', { count: textsArray.length }));
        // 5. 将处理完成的结果发送回主线程
        self.postMessage({
            type: 'scanCompleted',
            payload: {
                formattedText,
                count: textsArray.length
            }
        });
    }
};
