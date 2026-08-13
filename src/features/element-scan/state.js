export function createElementScanState() {
    return {
        isActive: false,
        isPaused: false,
        isAdjusting: false,
        currentTarget: null,
        elementPath: [],
        stagedTexts: new Set(),
        shouldResumeAfterModalClose: false,
    };
}
