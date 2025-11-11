// src/shared/utils/csp-checker.js

/**
 * @file CSP Checker
 * @description 检查当前环境是否允许从Blob URL创建Web Worker。
 * 这对于在严格内容安全策略（CSP）的网站上优雅地降级至备用方案至关重要。
 */

import { createTrustedWorkerUrl } from './trustedTypes.js';

/**
 * @description 缓存CSP检测结果的变量
 * @type {boolean | null}
 */
let isAllowed = null;

/**
 * 检查CSP是否允许创建Web Worker。
 * 该函数会尝试创建一个微小的测试Worker来检测CSP限制。
 * 结果会被缓存，因此后续调用不会重复进行检测。
 * @returns {Promise<boolean>} 如果允许创建Worker，则解析为true；否则解析为false。
 */
export async function isWorkerAllowed() {
    if (isAllowed !== null) {
        return isAllowed;
    }

    // 在不支持Worker的环境中，直接返回false
    if (typeof Worker === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined') {
        isAllowed = false;
        return isAllowed;
    }

    // 创建一个空的Worker脚本的Blob
    // 注释是必需的，否则Blob内容为空字符串，某些浏览器会拒绝
    const testWorkerBlob = new Blob(['/* test */'], { type: 'application/javascript' });

    let objectURL;
    let worker;

    try {
        // Step 1: 创建对象URL并立即存储
        objectURL = URL.createObjectURL(testWorkerBlob);

        // Step 2: 使用Trusted Types创建可信URL，此步骤可能因CSP失败
        const workerURL = createTrustedWorkerUrl(objectURL);

        // 尝试创建一个测试Worker
        worker = new Worker(workerURL);

        // 如果成功创建，则认为CSP允许
        isAllowed = true;

        // 清理测试Worker
        worker.terminate();

    } catch (e) {
        // 捕获到错误（通常是SecurityError），意味着CSP阻止了Worker的创建
        isAllowed = false;

        // 记录错误以用于调试
        console.error('[CSP Checker] Worker creation failed:', e);

    } finally {
        // 无论成功与否，只要objectURL被创建，就必须释放它
        if (objectURL) {
            URL.revokeObjectURL(objectURL);
        }
    }

    return isAllowed;
}
