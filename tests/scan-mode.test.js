import test from 'node:test';
import assert from 'node:assert/strict';
import {
    acquireScanMode,
    getActiveScanMode,
    releaseScanMode,
    resetScanModeForTests,
    SCAN_MODES,
    subscribeScanMode,
} from '../src/shared/services/scanModeCoordinator.js';
import { applyScanModeFabState, resetFabScanModeStateForTests } from '../src/shared/ui/components/fabExclusiveState.js';

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

test('dynamic and element modes disable only their conflicting ordinary FAB', () => {
    const dynamic = createFab({ tooltip: 'dynamic' });
    const staticFab = createFab({ tooltip: 'static' });
    const element = createFab({ tooltip: 'element' });
    const fabs = { dynamic, static: staticFab, element };

    applyScanModeFabState(fabs, SCAN_MODES.DYNAMIC, setDisabled, setTooltip);
    assert.equal(dynamic.disabled, false);
    assert.equal(staticFab.disabled, false);
    assert.equal(element.disabled, true);
    assert.equal(element.dataset.tooltipKey, 'tooltip.disabled.scan_in_progress');

    applyScanModeFabState(fabs, SCAN_MODES.IDLE, setDisabled, setTooltip);
    assert.equal(element.disabled, false);
    assert.equal(element.dataset.tooltipKey, 'element');

    applyScanModeFabState(fabs, SCAN_MODES.ELEMENT, setDisabled, setTooltip);
    assert.equal(dynamic.disabled, true);
    assert.equal(dynamic.dataset.tooltipKey, 'tooltip.disabled.scan_in_progress');
    assert.equal(staticFab.disabled, false);
    assert.equal(element.disabled, false);

    applyScanModeFabState(fabs, SCAN_MODES.IDLE, setDisabled, setTooltip);
    assert.equal(dynamic.disabled, false);
    assert.equal(dynamic.dataset.tooltipKey, 'dynamic');
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
