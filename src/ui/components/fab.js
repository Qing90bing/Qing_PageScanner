// src/ui/components/fab.js

/**
 * @module fab
 * @description 负责创建和管理所有悬浮操作按钮。
 */

import { translateIcon } from '../../assets/icon.js';
import { dynamicIcon } from '../../assets/dynamicIcon.js';
import { stopIcon } from '../../assets/stopIcon.js';
import { summaryIcon } from '../../assets/summaryIcon.js';

import * as sessionExtractor from '../../core/sessionExtractor.js';
import { formatTextsForTranslation } from '../../core/processor.js';
import { updateModalContent } from './mainModal.js';
import { showNotification, showLiveCounter, hideLiveCounter, updateLiveCounter } from '../components.js';

/**
 * @private
 * @description 创建一个单独的悬浮按钮。
 * @param {string} className - 按钮的 CSS 类名。
 * @param {string} innerHTML - 按钮内部的 SVG 图标。
 * @param {string} title - 鼠标悬停时显示的提示文本。
 * @param {function} onClick - 点击事件的回调函数。
 * @returns {HTMLElement} - 创建的按钮元素。
 */
function createSingleFab(className, innerHTML, title, onClick) {
    const fab = document.createElement('div');
    fab.className = `text-extractor-fab ${className}`;
    fab.innerHTML = innerHTML;
    fab.title = title;
    fab.addEventListener('click', onClick);
    return fab;
}

/**
 * @description 创建并初始化所有悬浮操作按钮。
 * @param {function} onStaticExtract - “静态提取”按钮的点击回调函数。
 */
export function createFab(onStaticExtract) {
    // 创建一个容器来包裹所有的 FAB
    const fabContainer = document.createElement('div');
    fabContainer.className = 'text-extractor-fab-container';

    // --- 创建三个按钮 ---

    // 1. 总结按钮 (最上方)
    const summaryFab = createSingleFab(
        'fab-summary',
        summaryIcon,
        '查看会话总结',
        handleSummaryClick
    );

    // 2. 动态扫描按钮 (中间)
    const dynamicFab = createSingleFab(
        'fab-dynamic',
        dynamicIcon,
        '开始动态扫描会话',
        handleDynamicExtractClick
    );

    // 3. 静态扫描按钮 (最下方)
    const staticFab = createSingleFab(
        'fab-static',
        translateIcon,
        '快捷提取当前页面所有文本',
        onStaticExtract
    );

    // --- 添加到页面 ---
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    document.body.appendChild(fabContainer);

    // 触发进入动画
    setTimeout(() => {
        fabContainer.classList.add('fab-container-visible');
    }, 50); // 延迟以确保CSS过渡生效

    // --- 事件处理逻辑 ---

    /**
     * @private
     * @description 处理“查看总结”按钮的点击事件。
     */
    function handleSummaryClick() {
        const results = sessionExtractor.getSessionTexts();
        if (results.length === 0) {
            // 如果没有文本，显示提示信息
            const message = "当前没有总结文本。\n\n- 点击 [动态扫描] 按钮开始一个新会话，收集动态内容。\n- 点击 [静态扫描] 按钮可进行一次性的快捷提取。";
            updateModalContent(message, true);
        } else {
            // 如果有文本，格式化并显示
            const formattedText = formatTextsForTranslation(results);
            updateModalContent(formattedText, true);
        }
    }

    /**
     * @private
     * @description 处理“动态扫描”按钮的点击事件。
     */
    function handleDynamicExtractClick() {
        if (sessionExtractor.isSessionRecording()) {
            // --- 正在录制 -> 点击停止 ---
            const results = sessionExtractor.stop();
            dynamicFab.innerHTML = dynamicIcon;
            dynamicFab.classList.remove('is-recording');
            dynamicFab.title = '开始动态扫描会话';

            hideLiveCounter();
            showNotification(`扫描结束，共发现 ${results.length} 条文本`, { type: 'success' });

        } else {
            // --- 未在录制 -> 点击开始 ---
            // 1. 立即更新UI，提供即时反馈
            dynamicFab.innerHTML = stopIcon;
            dynamicFab.classList.add('is-recording');
            dynamicFab.title = '停止动态扫描会话';

            showNotification('会话扫描已开始', { type: 'info' });
            showLiveCounter(); // 这会显示初始的“0”

            // 2. 将耗时的扫描任务放入异步队列，防止阻塞UI渲染
            setTimeout(() => {
                // 在开始录制时，传递一个回调函数用于更新计数器
                sessionExtractor.start(updateLiveCounter);
            }, 50); // 50ms的延迟足以让浏览器先完成UI的重绘
        }
    }
}