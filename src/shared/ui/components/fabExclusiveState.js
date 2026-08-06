const snapshots = new Map();

/**
 * 保存并恢复普通扫描 FAB 在 AI 独占锁前的完整禁用状态。
 * @param {HTMLElement[]} fabs
 * @param {boolean} isAiActive
 * @param {(fab: HTMLElement, disabled: boolean, tooltipKey?: string) => void} setDisabled
 * @param {(fab: HTMLElement, tooltipKey: string) => void} setTooltip
 */
export function applyAiExclusiveFabState(fabs, isAiActive, setDisabled, setTooltip) {
    const ordinaryFabs = fabs.filter(Boolean);
    if (isAiActive) {
        ordinaryFabs.forEach((fab) => {
            if (!snapshots.has(fab)) {
                snapshots.set(fab, {
                    disabled: Boolean(fab.disabled),
                    hadDisabledClass: fab.classList.contains('fab-disabled'),
                    ariaDisabled: fab.getAttribute('aria-disabled'),
                    tabIndex: fab.tabIndex,
                    tooltipKey: fab.dataset.tooltipKey,
                });
            }
            setDisabled(fab, true, 'tooltip.disabled.ai_scan_active');
        });
        return;
    }

    ordinaryFabs.forEach((fab) => {
        const snapshot = snapshots.get(fab);
        if (!snapshot) return;
        fab.disabled = snapshot.disabled;
        fab.classList.toggle('fab-disabled', snapshot.hadDisabledClass);
        fab.setAttribute('aria-disabled', snapshot.ariaDisabled || String(snapshot.disabled));
        fab.tabIndex = snapshot.tabIndex;
        setTooltip(fab, snapshot.tooltipKey);
        snapshots.delete(fab);
    });
}

export function resetAiExclusiveFabStateForTests() {
    snapshots.clear();
}
