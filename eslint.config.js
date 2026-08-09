import js from '@eslint/js';
import globals from 'globals';

const userscriptGlobals = {
    GM_addStyle: 'readonly',
    GM_deleteValue: 'readonly',
    GM_getValue: 'readonly',
    GM_info: 'readonly',
    GM_registerMenuCommand: 'readonly',
    GM_setClipboard: 'readonly',
    GM_setValue: 'readonly',
    GM_unregisterMenuCommand: 'readonly',
    GM_xmlhttpRequest: 'readonly',
    __INJECTED_CSS__: 'readonly',
    __PROCESSING_WORKER_STRING__: 'readonly',
};

const sharedRules = {
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-async-promise-executor': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
};

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    {
        files: ['src/**/*.js'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...userscriptGlobals,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...sharedRules,
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
            'max-lines': ['error', { max: 900, skipBlankLines: true, skipComments: true }],
        },
    },
    {
        files: ['build.js'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...sharedRules,
        },
    },
    {
        files: ['tests/**/*.js'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...sharedRules,
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
        },
    },
];
