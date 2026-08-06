export const SCAN_MODES = Object.freeze({
    IDLE: 'idle',
    DYNAMIC: 'normal-dynamic',
    STATIC: 'static',
    ELEMENT: 'element',
    AI: 'ai',
});

let activeMode = SCAN_MODES.IDLE;
const listeners = new Set();

function notify(previousMode) {
    listeners.forEach((listener) => {
        listener({ activeMode, previousMode });
    });
}

export function getActiveScanMode() {
    return activeMode;
}

export function canAcquireScanMode(mode) {
    return activeMode === SCAN_MODES.IDLE || activeMode === mode;
}

export function acquireScanMode(mode) {
    if (!Object.values(SCAN_MODES).includes(mode) || mode === SCAN_MODES.IDLE) {
        return false;
    }
    if (!canAcquireScanMode(mode)) {
        return false;
    }
    if (activeMode === mode) {
        return true;
    }

    const previousMode = activeMode;
    activeMode = mode;
    notify(previousMode);
    return true;
}

export function releaseScanMode(mode) {
    if (activeMode !== mode) {
        return false;
    }

    const previousMode = activeMode;
    activeMode = SCAN_MODES.IDLE;
    notify(previousMode);
    return true;
}

export function isScanModeActive(mode) {
    return activeMode === mode;
}

export function subscribeScanMode(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function resetScanModeForTests() {
    const previousMode = activeMode;
    activeMode = SCAN_MODES.IDLE;
    if (previousMode !== activeMode) {
        notify(previousMode);
    }
}
