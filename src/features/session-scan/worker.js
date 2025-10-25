// src/features/session-scan/worker.js

/**
 * @description 将一个字符串数组转换成特定的二维数组格式的字符串，例如 `[["text1", ""], ["text2", ""]]`。
 * @param {string[]} texts - 需要被格式化的文本字符串数组。
 * @returns {string} 一个格式化后的字符串。
 */
const formatTextsForTranslation = (texts) => {
    const result = texts.map(text =>
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}", ""]`
    );
    return `[\n${result.join(',\n')}\n]`;
};

self.onmessage = (event) => {
    const sessionTextsSet = event.data;
    // 在 Worker 线程中将 Set 转换为 Array，以避免阻塞主线程
    const sessionTextsArray = Array.from(sessionTextsSet);
    const formattedText = formatTextsForTranslation(sessionTextsArray);
    self.postMessage(formattedText);
};
