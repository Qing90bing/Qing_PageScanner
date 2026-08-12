import test from 'node:test';
import assert from 'node:assert/strict';
import { log, updateLoggerPrefix, updateLoggerState } from '../src/shared/utils/core/logger.js';

test('logger uses the prefix injected by the internationalization layer', () => {
    const originalConsoleLog = console.log;
    const calls = [];

    try {
        console.log = (...args) => calls.push(args);
        updateLoggerPrefix('[测试日志]');
        updateLoggerState(true);
        log('message');

        assert.deepEqual(calls, [['[测试日志]', 'message']]);
    } finally {
        updateLoggerState(false);
        updateLoggerPrefix('[Qing PageScanner]');
        console.log = originalConsoleLog;
    }
});
