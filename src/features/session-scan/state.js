export function createSessionScanState() {
    return {
        isRecording: false,
        isPaused: false,
        useFallback: false,
        currentCount: 0,
        sessionStartGeneration: 0,
        onUpdate: null,
    };
}
