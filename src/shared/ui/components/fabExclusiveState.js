import { SCAN_MODES } from '../../services/scanModeCoordinator.js';

const snapshots = new Map();

function getDisabledFabs(fabs, activeMode) {
    if (activeMode === SCAN_MODES.AI) {
        return new Map(
            [fabs.dynamic, fabs.static, fabs.element]
                .filter(Boolean)
                .map((fab) => [fab, 'tooltip.disabled.ai_scan_active'])
        );
    }
    if (activeMode === SCAN_MODES.DYNAMIC && fabs.element) {
        return new Map([[fabs.element, 'tooltip.disabled.scan_in_progress']]);
    }
    if (activeMode === SCAN_MODES.ELEMENT && fabs.dynamic) {
        return new Map([[fabs.dynamic, 'tooltip.disabled.scan_in_progress']]);
    }
    return new Map();
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
 * @param {{dynamic?: HTMLElement, static?: HTMLElement, element?: HTMLElement}} fabs
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

export function resetFabScanModeStateForTests() {
    snapshots.clear();
}
