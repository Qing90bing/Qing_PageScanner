// src/shared/constants/events.js

/**
 * @fileoverview Centralized event and message type definitions.
 * Using constants for these helps prevent typos and makes dependencies clearer.
 */

// --- Event Bus Events ---
// Events fired and listened to via the global event bus.
export const EVENT_BUS = {
    CLEAR_SESSION_SCAN: 'clearSessionScan',
    SESSION_CLEARED: 'sessionCleared',
    CLEAR_ELEMENT_SCAN: 'clearElementScan',
};

// --- Web Worker Message Types ---
// Used in `postMessage` calls between the main thread and web workers.
export const WORKER_MESSAGES = {
    // --- Main Thread to Worker ---
    SESSION_START: 'session-start',
    SESSION_ADD_TEXTS: 'session-add-texts',
    SESSION_CLEAR: 'session-clear',
    SESSION_GET_SUMMARY: 'session-get-summary',
    SESSION_GET_COUNT: 'session-get-count',

    // --- Element Scan ---
    ELEMENT_SCAN_START: 'element-scan-start',
    ELEMENT_SCAN_PROCESS: 'element-scan-process',


    // --- Worker to Main Thread ---
    COUNT_UPDATED: 'countUpdated',
    SUMMARY_READY: 'summaryReady',
    SESSION_SYNC_DATA: 'session-sync-data',
};
