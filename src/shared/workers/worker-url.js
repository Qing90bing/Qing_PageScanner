// src/shared/workers/worker-url.js

import { createTrustedWorkerUrl } from '../utils/dom/trustedTypes.js';

/**
 * @description 预先计算 Worker 的 Trusted URL。
 * 这一步涉及到在一个可能很大的字符串上调用 encodeURIComponent，这是一个耗时的操作。
 * 通过将此操作放在一个独立的模块中，我们确保它在整个应用程序的生命周期中只执行一次，
 * 且结果被缓存和复用。
 */
const workerBlob = new Blob([__PROCESSING_WORKER_STRING__], { type: 'application/javascript' });
const workerUrl = URL.createObjectURL(workerBlob);
export const trustedWorkerUrl = createTrustedWorkerUrl(workerUrl);
