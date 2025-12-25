// src/shared/ui/mainModal/lineNumberLogic.js

/**
 * @module lineNumberLogic
 * @description 封装主模态框文本区域的行号计算和更新逻辑。
 */

import { loadSettings } from '../../../features/settings/logic.js';
import * as state from './modalState.js';

// --- 性能优化缓存 ---
// 缓存 calcStringLines 的计算结果：Map<string, number>
// Key: 句子内容 (因为宽度作为外部条件清理缓存，所以key不需要包含宽度)
const stringLinesCache = new Map();
let lastCacheWidth = 0;

// 缓存 split 的结果，避免每次滚动都切割整个大字符串
let lastTextValue = null;
let lastSplitLines = [];

/**
 * @private
 * @description 计算单个字符串在给定宽度下会占据多少行（视觉换行）。
/**
 * @private
 * @description 计算单个字符串在给定宽度下会占据多少行（视觉换行）。
 *              已添加 Memoization 缓存优化。
 * @param {string} sentence - 要计算的字符串。
 * @param {number} width - 容器的内容宽度。
 * @returns {number} 占据的行数。
 */
function calcStringLines(sentence, width) {
    if (!width || !state.canvasContext) return 1;

    // --- 缓存检查 ---
    // 如果宽度发生变化（例如窗口缩放），则之前的缓存全部失效（因为折行点变了）
    if (width !== lastCacheWidth) {
        stringLinesCache.clear();
        lastCacheWidth = width;
    }

    const cacheKey = sentence;
    if (stringLinesCache.has(cacheKey)) {
        return stringLinesCache.get(cacheKey);
    }

    // --- 计算逻辑 ---
    // 优化：直接遍历字符串不仅代码更少，而且避免了为每个段落创建大量的临时字符数组
    let lineCount = 0;
    let currentLine = '';

    // 预检：如果整句宽度都小于容器宽度，直接返回 1
    // 这个检查非常快，能命中绝大多数短行的情况
    if (state.canvasContext.measureText(sentence).width <= width) {
        lineCount = 1;
        stringLinesCache.set(cacheKey, 1);
        return 1;
    }

    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        const wordWidth = state.canvasContext.measureText(char).width;

        // 优化：避免每次都重新测量整个 currentLine 的宽度
        // 实际上 measureText 开销较大。累加字符宽度虽然不精确（因为字距调整），
        // 但在等宽字体或简单场景下可以作为估算。
        // 不过为了准确性，还是使用累加后的字符串测量。
        // 进一步优化：currentLine 是在不断增长的，measureText(currentLine + char) 
        // 比 measureText(currentLine) + measureText(char) 准确。

        // 这里保持原有逻辑准确性，重点在于 Memoization 已经能解决 99% 的重绘问题
        if (state.canvasContext.measureText(currentLine + char).width > width) {
            lineCount++;
            currentLine = char;
        } else {
            currentLine += char;
        }
    }
    if (currentLine !== '' || sentence === '') {
        lineCount++;
    }

    // --- 存入缓存 ---
    stringLinesCache.set(cacheKey, lineCount);
    return lineCount;
}

/**
 * @private
 * @description 计算文本区域内所有内容的视觉总行数，并生成行号数组和映射。
 * @returns {{lineNumbers: Array<string|number>, lineMap: Array<number>}} 包含行号数组和视觉行到真实行映射的对象。
 */
/**
 * @private
 * @description 计算文本区域内所有内容的视觉总行数，并生成行号数组和映射。
 * @returns {{lineNumbers: Array<string|number>, lineMap: Array<number>}} 包含行号数组和视觉行到真实行映射的对象。
 */
function calcLines() {
    const settings = loadSettings();
    const currentValue = state.outputTextarea.value;

    // --- 优化：缓存 Split 结果 ---
    // 只有当文本内容真正改变时才重新执行 split，避免滚动时的冗余计算
    let lines;
    if (currentValue === lastTextValue) {
        lines = lastSplitLines;
    } else {
        lines = currentValue.split('\n');
        lastTextValue = currentValue;
        lastSplitLines = lines;
    }

    let lineNumbers = [];
    let lineMap = []; // 映射：visualLineIndex -> realLineIndex

    if (settings.enableWordWrap) {
        // --- 自动换行开启时的复杂计算 ---
        const textareaStyles = window.getComputedStyle(state.outputTextarea);
        const paddingLeft = parseFloat(textareaStyles.paddingLeft);
        const paddingRight = parseFloat(textareaStyles.paddingRight);
        const textareaContentWidth = state.outputTextarea.clientWidth - paddingLeft - paddingRight;

        lines.forEach((lineString, realLineIndex) => {
            const numLinesOfSentence = calcStringLines(lineString, textareaContentWidth);

            lineNumbers.push(realLineIndex + 1);
            lineMap.push(realLineIndex);

            if (numLinesOfSentence > 1) {
                // 使用 push 填充剩余的空行号
                for (let i = 0; i < numLinesOfSentence - 1; i++) {
                    lineNumbers.push('');
                    lineMap.push(realLineIndex);
                }
            }
        });
    } else {
        // --- 自动换行关闭时的简单计算 ---
        const totalLines = lines.length;
        // 预分配数组大小，略微提升性能
        // lineNumbers = new Array(totalLines);
        // lineMap = new Array(totalLines);
        // 但为了代码简洁和一致性，依然使用 push (现代JS引擎对 push 优化很好)
        for (let i = 0; i < totalLines; i++) {
            lineNumbers.push(i + 1);
            lineMap.push(i);
        }
    }

    return { lineNumbers, lineMap };
}

/**
 * @private
 * @description 立即执行活动行高亮的更新逻辑。
 */
function _performActiveLineUpdate() {
    if (!state.lineNumbersDiv || !state.lineNumbersDiv.classList.contains('is-visible') || !state.outputTextarea) return;

    const settings = loadSettings();
    const textarea = state.outputTextarea;
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;

    // 性能优化：无需创建高消耗的 textBeforeCursor 子字符串
    // 直接遍历计算换行符数量来确定 cursorRealLineIndex
    let cursorRealLineIndex = 0;
    for (let i = 0; i < selectionEnd; i++) {
        if (text[i] === '\n') {
            cursorRealLineIndex++;
        }
    }

    let finalVisualLineIndex = -1;

    if (settings.enableWordWrap) {
        // --- 自动换行开启时的复杂计算 ---

        // 优化：复用 lastSplitLines
        let realLines;
        if (text === lastTextValue) {
            realLines = lastSplitLines;
        } else {
            // 理论上这里极少进入，因为 calcLines 通常先执行
            realLines = text.split('\n');
            lastTextValue = text;
            lastSplitLines = realLines;
        }

        let positionInRealLine = selectionEnd;
        for (let i = 0; i < cursorRealLineIndex; i++) {
            // 减去之前的行长度 + 换行符
            positionInRealLine -= (realLines[i].length + 1);
        }

        const textareaStyles = window.getComputedStyle(textarea);
        const paddingLeft = parseFloat(textareaStyles.paddingLeft);
        const paddingRight = parseFloat(textareaStyles.paddingRight);
        const textareaContentWidth = textarea.clientWidth - paddingLeft - paddingRight;

        const lineContent = realLines[cursorRealLineIndex];
        let visualLineOffset = 0;
        let currentLine = '';

        // 优化：直接遍历
        for (let i = 0; i < lineContent.length; i++) {
            const char = lineContent[i];
            const nextLine = currentLine + char;
            if (state.canvasContext.measureText(nextLine).width > textareaContentWidth) {
                visualLineOffset++;
                currentLine = char;
            } else {
                currentLine = nextLine;
            }
            if (i >= positionInRealLine - 1 && positionInRealLine > 0) {
                break;
            }
        }

        const firstVisualIndexOfRealLine = state.currentLineMap.indexOf(cursorRealLineIndex);
        if (firstVisualIndexOfRealLine !== -1) {
            finalVisualLineIndex = firstVisualIndexOfRealLine + visualLineOffset;
        }
    } else {
        // --- 自动换行关闭时的简单计算 ---
        finalVisualLineIndex = cursorRealLineIndex;
    }

    const lineDivs = state.lineNumbersDiv.children;
    for (let i = 0; i < lineDivs.length; i++) {
        lineDivs[i].classList.remove('is-active');
    }

    if (finalVisualLineIndex !== -1 && lineDivs[finalVisualLineIndex]) {
        lineDivs[finalVisualLineIndex].classList.add('is-active');
    }
}

let isUpdateActiveLineScheduled = false;

/**
 * @description (节流版) 根据光标位置更新活动行号的样式。
 */
export function updateActiveLine() {
    if (isUpdateActiveLineScheduled) return;

    isUpdateActiveLineScheduled = true;
    requestAnimationFrame(() => {
        _performActiveLineUpdate();
        isUpdateActiveLineScheduled = false;
    });
}

let isThrottled = false;

/**
 * @description 更新行号的显示（异步节流版）。
 */
export function updateLineNumbers() {
    if (!state.lineNumbersDiv || !state.outputTextarea || isThrottled) return;

    isThrottled = true;
    requestAnimationFrame(() => {
        const { lineNumbers, lineMap } = calcLines();
        state.setCurrentLineMap(lineMap);

        const currentLineCount = state.lineNumbersDiv.children.length;
        const newLineCount = lineNumbers.length;

        // 更新或添加行
        for (let i = 0; i < newLineCount; i++) {
            const lineText = lineNumbers[i] === '' ? '\u00A0' : lineNumbers[i];
            if (i < currentLineCount) {
                // 更新现有行
                if (state.lineNumbersDiv.children[i].textContent !== lineText) {
                    state.lineNumbersDiv.children[i].textContent = lineText;
                }
            } else {
                // 添加新行并应用动画
                const div = document.createElement('div');
                div.textContent = lineText;
                div.classList.add('line-number-enter-active');
                state.lineNumbersDiv.appendChild(div);
                // 动画结束后移除类，以便下次复用
                div.addEventListener('animationend', () => {
                    div.classList.remove('line-number-enter-active');
                }, { once: true });
            }
        }

        // 删除多余的行
        if (newLineCount < currentLineCount) {
            for (let i = currentLineCount - 1; i >= newLineCount; i--) {
                state.lineNumbersDiv.removeChild(state.lineNumbersDiv.children[i]);
            }
        }

        // --- 动态计算所需宽度 ---
        // 只有当行数大于 99（即3位数以上）时才开始调整宽度，避免宽度频繁跳动
        // 默认宽度 40px 足以容纳 3 位数 + padding
        if (newLineCount > 0) {
            const maxLineNumber = lineNumbers[lineNumbers.length - 1];
            // 确保 maxLineNumber 是数字，因为 lineNumbers 可能包含空字符串（用于折行）
            // 我们只需要最大的那个真实行号，通常是数组中最后一个非空数字，或者直接用行号数组长度估算
            let maxNumStr = String(maxLineNumber);

            // 如果最后一个是空字符串（折行情况），我们需要找到最大的真实行号
            if (maxLineNumber === '') {
                // 倒序查找第一个非空值
                for (let k = lineNumbers.length - 1; k >= 0; k--) {
                    if (lineNumbers[k] !== '') {
                        maxNumStr = String(lineNumbers[k]);
                        break;
                    }
                }
            }

            const textWidth = state.canvasContext.measureText(maxNumStr).width;
            // 基础 padding (4px left + 4px right = 8px) + 额外一点余量 (e.g. 2px) = 10px
            // 设置最小宽度为 40px
            const newWidth = Math.max(40, Math.ceil(textWidth + 12));

            state.lineNumbersDiv.style.setProperty('--line-number-width', `${newWidth}px`);
        }

        _performActiveLineUpdate(); // 在更新行号后，立即同步更新活动行
        isThrottled = false;
    });
}

/**
 * @description 初始化行号功能，包括事件监听和Canvas设置。
 */
export function initializeLineNumbers() {
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    const textareaStyles = window.getComputedStyle(state.outputTextarea);
    canvasContext.font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
    state.setCanvasContext(canvasContext);

    const resizeObserver = new ResizeObserver(() => {
        if (!state.lineNumbersDiv || !state.outputTextarea) return;
        state.lineNumbersDiv.style.height = state.outputTextarea.clientHeight + 'px';
        updateLineNumbers();
    });
    resizeObserver.observe(state.outputTextarea);
}
