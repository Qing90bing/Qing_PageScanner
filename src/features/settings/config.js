// src/features/settings/config.js

export const filterDefinitions = [
  { id: 'filter-numbers', key: 'numbers', label: '过滤纯数字/货币' },
  { id: 'filter-chinese', key: 'chinese', label: '过滤纯中文' },
  { id: 'filter-contains-chinese', key: 'containsChinese', label: '过滤包含中文的文本' },
  { id: 'filter-emoji-only', key: 'emojiOnly', label: '过滤纯表情符号' },
  { id: 'filter-symbols', key: 'symbols', label: '过滤纯符号' },
  { id: 'filter-term', key: 'termFilter', label: '过滤特定术语' },
  { id: 'filter-single-letter', key: 'singleLetter', label: '过滤纯单个英文字母' },
];

export const relatedSettingsDefinitions = [
    { id: 'show-fab', key: 'showFab', label: '显示悬浮按钮' },
];
