// src/features/quick-scan/worker.js

/**
 * @module QuickScanWorker
 * @description 这个 Web Worker 负责在后台执行一次性的静态页面扫描，
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
 *        - `event.data.type` 必须是 'scan'。
 *        - `event.data.payload` 应包含 `texts` (字符串数组) 和 `filterRules` (过滤规则对象)。
 */
self.onmessage = (event) => {
    const { type, payload } = event.data;

    // 从主线程接收调试日志的开关状态
    const enableDebugLogging = payload.enableDebugLogging || false;

    /**
     * @description Worker 内部的条件日志记录器。
     * @param {...*} args - 要打印的参数。
     */
    const log = (...args) => {
        if (enableDebugLogging) {
            console.log('[静态扫描 Worker]', ...args);
        }
    };

    if (type === 'scan') {
        log(`[静态扫描 Worker] 收到 ${payload.texts.length} 条文本，开始处理...`);
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
                    log(`文本已过滤: "${textForFiltering}" (原因: ${filterResult.reason})`);
                    return;
                }

                // 4. 添加到结果集 (存储带统一换行符的版本)
                uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, '\n'));
            });
        }

        const textsArray = Array.from(uniqueTexts);
        const formattedText = formatTextsForTranslation(textsArray);

        log(`[静态扫描 Worker] 处理完成，共 ${textsArray.length} 条有效文本。正在发回主线程...`);
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
