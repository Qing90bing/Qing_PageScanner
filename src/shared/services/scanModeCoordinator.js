export const SCAN_MODES = Object.freeze({
    IDLE: 'idle',
    DYNAMIC: 'normal-dynamic',
    STATIC: 'static',
    ELEMENT: 'element',
    AI: 'ai',
});

let activeMode = SCAN_MODES.IDLE;
const listeners = new Set();
const supportedModes = new Set(Object.values(SCAN_MODES));

function notify(previousMode) {
    listeners.forEach((listener) => {
        listener({ activeMode, previousMode });
    });
}

export function getActiveScanMode() {
    return activeMode;
}

export function canAcquireScanModeFrom(currentMode, requestedMode) {
    return (
        supportedModes.has(currentMode) &&
        supportedModes.has(requestedMode) &&
        requestedMode !== SCAN_MODES.IDLE &&
        (currentMode === SCAN_MODES.IDLE || currentMode === requestedMode)
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
