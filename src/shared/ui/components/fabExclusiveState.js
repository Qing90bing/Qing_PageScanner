import { canAcquireScanModeFrom, SCAN_MODES } from '../../services/scanModeCoordinator.js';

const snapshots = new Map();
const fabModes = Object.freeze({
    ai: SCAN_MODES.AI,
    dynamic: SCAN_MODES.DYNAMIC,
    static: SCAN_MODES.STATIC,
    element: SCAN_MODES.ELEMENT,
});

function getDisabledFabs(fabs, activeMode) {
    const tooltipKey =
        activeMode === SCAN_MODES.AI ? 'tooltip.disabled.ai_scan_active' : 'tooltip.disabled.scan_in_progress';

    return new Map(
        Object.entries(fabModes)
            .map(([fabName, mode]) => [fabs[fabName], mode])
            .filter(([fab, mode]) => fab && !canAcquireScanModeFrom(activeMode, mode))
            .map(([fab]) => [fab, tooltipKey])
    );
}

function captureFabState(fab) {
    return {
        disabled: Boolean(fab.disabled),
        hadDisabledClass: fab.classList.contains('fab-disabled'),
        ariaDisabled: fab.getAttribute('aria-disabled'),
        tabIndex: fab.tabIndex,
        tooltipKey: fab.dataset.tooltipKey,
    };
}

function restoreFabState(fab, snapshot, setTooltip) {
    fab.disabled = snapshot.disabled;
    fab.classList.toggle('fab-disabled', snapshot.hadDisabledClass);
    if (snapshot.ariaDisabled === null) {
        fab.removeAttribute('aria-disabled');
    } else {
        fab.setAttribute('aria-disabled', snapshot.ariaDisabled);
    }
    fab.tabIndex = snapshot.tabIndex;
    if (typeof snapshot.tooltipKey === 'undefined') {
        delete fab.dataset.tooltipKey;
    } else {
        setTooltip(fab, snapshot.tooltipKey);
    }
}

/**
 * 根据扫描协调器状态保存、禁用并恢复存在冲突的普通扫描 FAB。
 * @param {{ai?: HTMLElement, dynamic?: HTMLElement, static?: HTMLElement, element?: HTMLElement}} fabs
 * @param {string} activeMode
 * @param {(fab: HTMLElement, disabled: boolean, tooltipKey?: string) => void} setDisabled
 * @param {(fab: HTMLElement, tooltipKey: string) => void} setTooltip
 */
export function applyScanModeFabState(fabs, activeMode, setDisabled, setTooltip) {
    const disabledFabs = getDisabledFabs(fabs, activeMode);

    snapshots.forEach((snapshot, fab) => {
        if (disabledFabs.has(fab)) return;
        restoreFabState(fab, snapshot, setTooltip);
        snapshots.delete(fab);
    });

    disabledFabs.forEach((tooltipKey, fab) => {
        if (!snapshots.has(fab)) {
            snapshots.set(fab, captureFabState(fab));
        }
        setDisabled(fab, true, tooltipKey);
    });
}

export function syncFabScanModeBaseline(fab) {
    if (!fab || !snapshots.has(fab)) return;
    snapshots.set(fab, captureFabState(fab));
}

export function resetFabScanModeStateForTests() {
    snapshots.clear();
}
