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
};

export default [
    {
        ignores: ['dist/**', 'node_modules/**', 'tests/**'],
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
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
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
    },
];
