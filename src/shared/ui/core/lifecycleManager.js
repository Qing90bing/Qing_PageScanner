/**
 * @module LifecycleManager
 * @description 通用的生命周期管理器，基于引用计数 (Reference Counting)。
 */

export class LifecycleManager {
    /**
     * @param {Object} options
     * @param {Function} options.onConnect - 当引用计数从 0 变为 1 时调用。
     * @param {Function} options.onDisconnect - 当引用计数从 1 变为 0 时调用。
     */
    constructor({ onConnect, onDisconnect }) {
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
        this.activeRefs = 0;
    }

    acquire() {
        if (this.activeRefs === 0) {
            this.onConnect();
        }
        this.activeRefs++;
        // console.log(`[Lifecycle] Acquired. Refs: ${this.activeRefs}`);
    }

    release() {
        this.activeRefs--;
        if (this.activeRefs <= 0) {
            this.activeRefs = 0;
            this.onDisconnect();
            // console.log(`[Lifecycle] Disconnected. Refs: 0`);
        } else {
            // console.log(`[Lifecycle] Released. Refs: ${this.activeRefs}`);
        }
    }

    get refCount() {
        return this.activeRefs;
    }
}
