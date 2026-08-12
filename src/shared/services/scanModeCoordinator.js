export const SCAN_MODES = Object.freeze({
    IDLE: 'idle',
    DYNAMIC: 'normal-dynamic',
    STATIC: 'static',
    ELEMENT: 'element',
    AI: 'ai',
});

let activeMode = SCAN_MODES.IDLE;
const activeModes = new Set();
const listeners = new Set();
const supportedModes = new Set(Object.values(SCAN_MODES));
const primaryModeOrder = [SCAN_MODES.AI, SCAN_MODES.DYNAMIC, SCAN_MODES.ELEMENT, SCAN_MODES.STATIC];

function resolveActiveMode() {
    return primaryModeOrder.find((mode) => activeModes.has(mode)) || SCAN_MODES.IDLE;
}

function notify(previousMode) {
    listeners.forEach((listener) => {
        listener({ activeMode, previousMode });
    });
}

export function getActiveScanMode() {
    return activeMode;
}

export function canAcquireScanModeFrom(currentMode, requestedMode) {
    if (!supportedModes.has(currentMode) || !supportedModes.has(requestedMode)) return false;
    if (requestedMode === SCAN_MODES.IDLE) return false;
    if (currentMode === SCAN_MODES.IDLE || currentMode === requestedMode) return true;

    return (
        requestedMode === SCAN_MODES.STATIC &&
        (currentMode === SCAN_MODES.DYNAMIC || currentMode === SCAN_MODES.ELEMENT)
    );
}

export function canAcquireScanMode(mode) {
    return canAcquireScanModeFrom(activeMode, mode);
}

export function acquireScanMode(mode) {
    if (!canAcquireScanMode(mode)) {
        return false;
    }
    if (activeMode === mode) {
        return true;
    }

    const previousMode = activeMode;
    activeModes.add(mode);
    activeMode = resolveActiveMode();
    if (activeMode !== previousMode) notify(previousMode);
    return true;
}

export function releaseScanMode(mode) {
    if (!activeModes.delete(mode)) return false;

    const previousMode = activeMode;
    activeMode = resolveActiveMode();
    if (activeMode !== previousMode) notify(previousMode);
    return true;
}

export function isScanModeActive(mode) {
    return activeModes.has(mode);
}

export function subscribeScanMode(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function resetScanModeForTests() {
    const previousMode = activeMode;
    activeModes.clear();
    activeMode = SCAN_MODES.IDLE;
    if (previousMode !== activeMode) {
        notify(previousMode);
    }
}
