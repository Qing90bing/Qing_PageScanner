// src/shared/ui/mainModal/modalState.js

/**
 * @module modalState
 * @description 存放和导出主模态框的共享状态和DOM元素引用。
 */

// --- DOM元素引用 ---
export let modalOverlay = null;
export let outputTextarea = null;
export let lineNumbersDiv = null;
export let statsContainer = null;
export let placeholder = null;
export let loadingContainer = null;

// --- 状态与上下文 ---
export let canvasContext = null; // 用于文本宽度计算的Canvas上下文
export let currentLineMap = []; // 当前的行号映射关系
export let currentMode = 'quick-scan'; // 模态框的当前模式, 默认为 'quick-scan'

// --- 公共常量 ---
export const SHOW_PLACEHOLDER = '::show_placeholder::'; // 特殊标识符
export const SHOW_LOADING = '::show_loading::'; // 加载状态标识符

// --- 更新函数 ---
// 为了避免循环依赖，我们提供setter函数来修改状态
export function setModalOverlay(element) { modalOverlay = element; }
export function setOutputTextarea(element) { outputTextarea = element; }
export function setLineNumbersDiv(element) { lineNumbersDiv = element; }
export function setStatsContainer(element) { statsContainer = element; }
export function setPlaceholder(element) { placeholder = element; }
export function setLoadingContainer(element) { loadingContainer = element; }
export function setCanvasContext(context) { canvasContext = context; }
export function setCurrentLineMap(map) { currentLineMap = map; }
export function setCurrentMode(mode) { currentMode = mode; }
export function getCurrentMode() { return currentMode; }

export function resetState() {
    modalOverlay = null;
    outputTextarea = null;
    lineNumbersDiv = null;
    statsContainer = null;
    placeholder = null;
    loadingContainer = null;
    canvasContext = null;
    currentLineMap = [];
    currentMode = 'quick-scan';
}
