import test from 'node:test';
import assert from 'node:assert/strict';
import {
    acquireScanMode,
    getActiveScanMode,
    isScanModeActive,
    releaseScanMode,
    resetScanModeForTests,
    SCAN_MODES,
    subscribeScanMode,
} from '../src/shared/services/scanModeCoordinator.js';
import {
    applyScanModeFabState,
    resetFabScanModeStateForTests,
    syncFabScanModeBaseline,
} from '../src/shared/ui/components/fabExclusiveState.js';

class FakeClassList {
    constructor(values = []) {
        this.values = new Set(values);
    }

    contains(value) {
        return this.values.has(value);
    }

    toggle(value, force) {
        if (force) this.values.add(value);
        else this.values.delete(value);
    }
}

function createFab({ disabled = false, tooltip = 'original' } = {}) {
    const attributes = new Map([['aria-disabled', String(disabled)]]);
    return {
        disabled,
        tabIndex: disabled ? -1 : 0,
        dataset: { tooltipKey: tooltip },
        classList: new FakeClassList(disabled ? ['fab-disabled'] : []),
        getAttribute(name) {
            return attributes.get(name) ?? null;
        },
        setAttribute(name, value) {
            attributes.set(name, value);
        },
    };
}

function setDisabled(fab, disabled, tooltip) {
    fab.disabled = disabled;
    fab.classList.toggle('fab-disabled', disabled);
    fab.setAttribute('aria-disabled', String(disabled));
    fab.tabIndex = disabled ? -1 : 0;
    if (tooltip) fab.dataset.tooltipKey = tooltip;
}

function setTooltip(fab, tooltip) {
    fab.dataset.tooltipKey = tooltip;
}

test.beforeEach(() => {
    resetScanModeForTests();
    resetFabScanModeStateForTests();
});

test('AI lock blocks direct acquisition by every regular scan mode', () => {
    assert.equal(acquireScanMode(SCAN_MODES.AI), true);
    assert.equal(acquireScanMode(SCAN_MODES.DYNAMIC), false);
    assert.equal(acquireScanMode(SCAN_MODES.STATIC), false);
    assert.equal(acquireScanMode(SCAN_MODES.ELEMENT), false);
    assert.equal(getActiveScanMode(), SCAN_MODES.AI);
});

test('a running regular scan prevents AI from forcing a mode switch', () => {
    assert.equal(acquireScanMode(SCAN_MODES.DYNAMIC), true);
    assert.equal(acquireScanMode(SCAN_MODES.AI), false);
    assert.equal(getActiveScanMode(), SCAN_MODES.DYNAMIC);
});

test('dynamic and element scans allow a temporary static scan without yielding the primary mode', () => {
    [SCAN_MODES.DYNAMIC, SCAN_MODES.ELEMENT].forEach((primaryMode) => {
        assert.equal(acquireScanMode(primaryMode), true);
        assert.equal(acquireScanMode(SCAN_MODES.STATIC), true);
        assert.equal(getActiveScanMode(), primaryMode);
        assert.equal(isScanModeActive(primaryMode), true);
        assert.equal(isScanModeActive(SCAN_MODES.STATIC), true);

        assert.equal(releaseScanMode(SCAN_MODES.STATIC), true);
        assert.equal(getActiveScanMode(), primaryMode);
        assert.equal(releaseScanMode(primaryMode), true);
    });
});

test('a temporary static scan remains active if its primary scan stops first', () => {
    assert.equal(acquireScanMode(SCAN_MODES.DYNAMIC), true);
    assert.equal(acquireScanMode(SCAN_MODES.STATIC), true);
    assert.equal(releaseScanMode(SCAN_MODES.DYNAMIC), true);
    assert.equal(getActiveScanMode(), SCAN_MODES.STATIC);
    assert.equal(isScanModeActive(SCAN_MODES.STATIC), true);
    assert.equal(releaseScanMode(SCAN_MODES.STATIC), true);
    assert.equal(getActiveScanMode(), SCAN_MODES.IDLE);
});

test('AI mode disables all ordinary FABs and restores their exact previous states', () => {
    const dynamic = createFab();
    const staticFab = createFab({ disabled: true, tooltip: 'pre-disabled' });
    const element = createFab();
    const fabs = { dynamic, static: staticFab, element };

    applyScanModeFabState(fabs, SCAN_MODES.AI, setDisabled, setTooltip);
    Object.values(fabs).forEach((fab) => {
        assert.equal(fab.disabled, true);
        assert.equal(fab.getAttribute('aria-disabled'), 'true');
        assert.equal(fab.classList.contains('fab-disabled'), true);
        assert.equal(fab.tabIndex, -1);
    });

    applyScanModeFabState(fabs, SCAN_MODES.IDLE, setDisabled, setTooltip);
    assert.equal(dynamic.disabled, false);
    assert.equal(element.disabled, false);
    assert.equal(staticFab.disabled, true);
    assert.equal(staticFab.dataset.tooltipKey, 'pre-disabled');
});

test('every active scan mode disables every unavailable scan FAB', () => {
    const ai = createFab({ tooltip: 'ai' });
    const dynamic = createFab({ tooltip: 'dynamic' });
    const staticFab = createFab({ tooltip: 'static' });
    const element = createFab({ tooltip: 'element' });
    const fabs = { ai, dynamic, static: staticFab, element };
    const modeByFab = new Map([
        [ai, SCAN_MODES.AI],
        [dynamic, SCAN_MODES.DYNAMIC],
        [staticFab, SCAN_MODES.STATIC],
        [element, SCAN_MODES.ELEMENT],
    ]);
    const enabledModesByActiveMode = new Map([
        [SCAN_MODES.AI, new Set([SCAN_MODES.AI])],
        [SCAN_MODES.DYNAMIC, new Set([SCAN_MODES.DYNAMIC, SCAN_MODES.STATIC])],
        [SCAN_MODES.STATIC, new Set([SCAN_MODES.STATIC])],
        [SCAN_MODES.ELEMENT, new Set([SCAN_MODES.STATIC, SCAN_MODES.ELEMENT])],
    ]);

    Object.values(SCAN_MODES)
        .filter((mode) => mode !== SCAN_MODES.IDLE)
        .forEach((activeMode) => {
            applyScanModeFabState(fabs, activeMode, setDisabled, setTooltip);

            modeByFab.forEach((mode, fab) => {
                const shouldBeDisabled = !enabledModesByActiveMode.get(activeMode).has(mode);
                assert.equal(fab.disabled, shouldBeDisabled, `${mode} while ${activeMode} is active`);
                if (shouldBeDisabled) {
                    const tooltipKey =
                        activeMode === SCAN_MODES.AI
                            ? 'tooltip.disabled.ai_scan_active'
                            : 'tooltip.disabled.scan_in_progress';
                    assert.equal(fab.dataset.tooltipKey, tooltipKey);
                }
            });

            applyScanModeFabState(fabs, SCAN_MODES.IDLE, setDisabled, setTooltip);
            modeByFab.forEach((mode, fab) => {
                assert.equal(fab.disabled, false);
                assert.equal(
                    fab.dataset.tooltipKey,
                    mode === SCAN_MODES.STATIC ? 'static' : mode.replace('normal-', '')
                );
            });
        });
});

test('AI feature availability changes survive an active scan lock', () => {
    const ai = createFab({ tooltip: 'tooltip.ai_scan' });
    const element = createFab({ tooltip: 'tooltip.element_scan' });
    const fabs = { ai, element };

    applyScanModeFabState(fabs, SCAN_MODES.ELEMENT, setDisabled, setTooltip);
    setDisabled(ai, true, 'tooltip.ai_disabled');
    syncFabScanModeBaseline(ai);
    applyScanModeFabState(fabs, SCAN_MODES.ELEMENT, setDisabled, setTooltip);
    applyScanModeFabState(fabs, SCAN_MODES.IDLE, setDisabled, setTooltip);
    assert.equal(ai.disabled, true);
    assert.equal(ai.dataset.tooltipKey, 'tooltip.ai_disabled');

    applyScanModeFabState(fabs, SCAN_MODES.ELEMENT, setDisabled, setTooltip);
    setDisabled(ai, false, 'tooltip.ai_scan');
    syncFabScanModeBaseline(ai);
    applyScanModeFabState(fabs, SCAN_MODES.ELEMENT, setDisabled, setTooltip);
    applyScanModeFabState(fabs, SCAN_MODES.IDLE, setDisabled, setTooltip);
    assert.equal(ai.disabled, false);
    assert.equal(ai.dataset.tooltipKey, 'tooltip.ai_scan');
});

test('coordinator notifications make idempotent AI start and stop observable', () => {
    const transitions = [];
    const unsubscribe = subscribeScanMode((change) => transitions.push(change));
    assert.equal(acquireScanMode(SCAN_MODES.AI), true);
    assert.equal(acquireScanMode(SCAN_MODES.AI), true);
    assert.equal(releaseScanMode(SCAN_MODES.AI), true);
    assert.equal(releaseScanMode(SCAN_MODES.AI), false);
    unsubscribe();
    assert.equal(transitions.length, 2);
    assert.deepEqual(
        transitions.map((item) => item.activeMode),
        [SCAN_MODES.AI, SCAN_MODES.IDLE]
    );
});
