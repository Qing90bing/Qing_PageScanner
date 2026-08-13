import { AI_DEFAULT_SETTINGS, mergeAiSettings } from './ai/contracts.js';
import { DEFAULT_OUTPUT_TAB_SIZE } from '../config/outputConfig.js';

const DEFAULT_SETTINGS = Object.freeze({
    language: 'auto',
    outputFormat: 'array',
    includeArrayBrackets: true,
    tabSize: DEFAULT_OUTPUT_TAB_SIZE,
    theme: 'system',
    showFab: true,
    fabPosition: 'bottom-right',
    showScanCount: true,
    showLineNumbers: true,
    showStatistics: true,
    enableWordWrap: false,
    enableTextTruncation: true,
    textTruncationLength: 50000,
    enableDebugLogging: false,
    elementScan_persistData: true,
    sessionScan_persistData: true,
    ai: AI_DEFAULT_SETTINGS,
    filterRules: Object.freeze({
        numbers: true,
        chinese: true,
        containsChinese: false,
        emojiOnly: true,
        symbols: true,
        termFilter: true,
        singleLetter: false,
        repeatingChars: true,
        filePath: true,
        hexColor: true,
        email: true,
        uuid: true,
        gitCommitHash: true,
        websiteUrl: true,
        shorthandNumber: true,
    }),
});

export function createDefaultSettings() {
    return {
        ...DEFAULT_SETTINGS,
        filterRules: { ...DEFAULT_SETTINGS.filterRules },
        ai: mergeAiSettings(DEFAULT_SETTINGS.ai),
    };
}
