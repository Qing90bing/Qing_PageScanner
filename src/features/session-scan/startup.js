/**
 * 加载动态扫描启动所需的依赖，并在异步边界两侧检查本次启动是否仍然有效。
 * @param {object} dependencies
 * @param {() => Promise<void>} dependencies.waitForTranslationIdle
 * @param {() => Promise<string[]> | string[]} dependencies.extractInitialTexts
 * @param {() => Promise<object> | object} dependencies.readSettings
 * @param {() => Promise<boolean> | boolean} dependencies.checkWorkerAllowed
 * @param {() => boolean} dependencies.isCurrent
 * @returns {Promise<{initialTexts: string[], settings: object, workerAllowed: boolean} | null>}
 */
export async function prepareSessionStart({
    waitForTranslationIdle,
    extractInitialTexts,
    readSettings,
    checkWorkerAllowed,
    isCurrent,
}) {
    const initialTextsPromise = waitForTranslationIdle().then(() => {
        if (!isCurrent()) return null;
        return extractInitialTexts();
    });

    const [initialTexts, settings, workerAllowed] = await Promise.all([
        initialTextsPromise,
        readSettings(),
        checkWorkerAllowed(),
    ]);

    if (!isCurrent() || initialTexts === null) return null;

    return { initialTexts, settings, workerAllowed };
}
