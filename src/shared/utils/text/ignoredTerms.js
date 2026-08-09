// src/shared/utils/text/ignoredTerms.js

/**
 * @module ignoredTerms
 * @description 维护不应进入待翻译结果的品牌名、技术术语和服务名称。
 */

/**
 * 需要过滤的特定术语列表（区分大小写）。
 * @example
 * IGNORED_TERMS: ['IGNORE', 'TERM']
 * @type {string[]}
 */
const IGNORED_TERMS_ARRAY = [
    'Github',
    'Microsoft',
    'Tampermonkey',
    'JavaScript',
    'TypeScript',
    'Hugging Face',
    'Google',
    'Facebook',
    'Twitter',
    'LinkedIn',
    'OpenAI',
    'ChatGPT',
    'API',
    'Glossary of computer science',
    'HTML',
    'CSS',
    'JSON',
    'XML',
    'HTTP',
    'HTTPS',
    'URL',
    'IP address',
    'DNS',
    'CPU',
    'GPU',
    'RAM',
    'SSD',
    'USB',
    'Wi-Fi',
    'Bluetooth',
    'VPN',
    'Modrinth',
    'Minecraft',
    'Modrinth+',
    'AI',
    'Bilibili',
    'QQ',
    'WeChat',
    'Discord',
    'Telegram',
    'WhatsApp',
    'Line',
    'Slack',
    'Zoom',
    'Skype',
    'TikTok',
    'Douyin',
    'Weibo',
    'Zhihu',
    'Xiaohongshu',
    'Steam',
    'Epic Games',
    'Spotify',
    'Apple Music',
    'NetEase Cloud Music',
    'Adobe Photoshop',
    'Adobe Premiere',
    'Microsoft Office',
    'WPS Office',
    'Modrinth',
    'CurseForge',
    'Thunder',
    'Baidu Netdisk',
    'Quark',
    'Alipay',
    'WeChat Pay',
    'Taobao',
    'JD.com',
    'Tmall',
    'Amazon',
    'eBay',
];

// Set 适合在过滤阶段进行高频的精确查找。
const IGNORED_TERMS_SET = new Set(IGNORED_TERMS_ARRAY);

// 默认导出 Set
export default IGNORED_TERMS_SET;
