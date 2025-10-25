// src/shared/ui/mainModal/lineNumberLogic.js

/**
 * @module lineNumberLogic
 * @description 封装主模态框文本区域的行号计算和更新逻辑。
 */

import * as state from './modalState.js';

/**
 * @private
 * @description 计算文本区域内所有内容的视觉总行数，并生成行号数组和映射。
 * @returns {{lineNumbers: Array<string|number>, lineMap: Array<number>}} 包含行号数组和视觉行到真实行映射的对象。
 */
function calculateVisualLines(text) {
    if (!mirrorDiv || !state.outputTextarea) return 1;

    // &nbsp; 是为了确保即使是空行也能被正确测量高度
    mirrorDiv.textContent = text || '\u00A0';

    const textareaStyles = window.getComputedStyle(state.outputTextarea);
    const lineHeight = parseFloat(textareaStyles.lineHeight);

    // 向上取整，以处理半行的情况
    return Math.ceil(mirrorDiv.scrollHeight / lineHeight);
}

function calcLines() {
    // 确保 outputTextarea 存在
    if (!state.outputTextarea) return { lineNumbers: [], lineMap: [] };

    // 同步镜像样式，以防textarea样式发生变化
    syncMirrorStyles();

    const lines = state.outputTextarea.value.split('\n');
    let lineNumbers = [];
    let lineMap = []; // 映射：visualLineIndex -> realLineIndex

    lines.forEach((lineString, realLineIndex) => {
        const numLinesOfSentence = calculateVisualLines(lineString);

        lineNumbers.push(realLineIndex + 1);
        lineMap.push(realLineIndex);

        if (numLinesOfSentence > 1) {
            for (let i = 0; i < numLinesOfSentence - 1; i++) {
                lineNumbers.push('');
                lineMap.push(realLineIndex);
            }
        }
    });

    return { lineNumbers, lineMap };
}

/**
 * @description 根据光标位置更新活动行号的样式。
 */
export function updateActiveLine() {
    if (!state.lineNumbersDiv || !state.lineNumbersDiv.classList.contains('is-visible') || !state.outputTextarea) return;

    const textarea = state.outputTextarea;
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;

    // 找到光标所在的真实行
    const textBeforeCursor = text.substring(0, selectionEnd);
    const cursorRealLineIndex = textBeforeCursor.split('\n').length - 1;

    // 获取真实行内容
    const realLines = text.split('\n');
    const lineContent = realLines[cursorRealLineIndex] || '';

    // 计算光标在当前真实行的字符位置
    let positionInRealLine = selectionEnd;
    for (let i = 0; i < cursorRealLineIndex; i++) {
        positionInRealLine -= (realLines[i].length + 1); // +1 是为了换行符
    }
    positionInRealLine = Math.max(0, positionInRealLine);

    // 计算光标所在位置的视觉偏移
    const textBeforeCursorInLine = lineContent.substring(0, positionInRealLine);
    const visualLineOffset = calculateVisualLines(textBeforeCursorInLine) - 1;

    // 计算最终的视觉行索引
    const firstVisualIndexOfRealLine = state.currentLineMap.indexOf(cursorRealLineIndex);
    if (firstVisualIndexOfRealLine === -1) return;

    const finalVisualLineIndex = firstVisualIndexOfRealLine + visualLineOffset;

    // 更新UI
    const lineDivs = state.lineNumbersDiv.children;
    for (let i = 0; i < lineDivs.length; i++) {
        lineDivs[i].classList.remove('is-active');
    }
    if (lineDivs[finalVisualLineIndex]) {
        lineDivs[finalVisualLineIndex].classList.add('is-active');
    }
}

/**
 * @description 更新行号的显示。
 */
export function updateLineNumbers() {
    if (!state.lineNumbersDiv || !state.outputTextarea) return;
    const { lineNumbers, lineMap } = calcLines();
    state.setCurrentLineMap(lineMap);

    const lineElements = lineNumbers.map(line => {
        const div = document.createElement('div');
        div.textContent = line === '' ? '\u00A0' : line;
        return div;
    });
    state.lineNumbersDiv.replaceChildren(...lineElements);
    updateActiveLine();
}

/**
 * @description 初始化行号功能，包括事件监听和Canvas设置。
 */
let mirrorDiv = null;

function syncMirrorStyles() {
    if (!mirrorDiv || !state.outputTextarea) return;

    const textareaStyles = window.getComputedStyle(state.outputTextarea);
    const stylesToCopy = [
        'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'wordSpacing',
        'lineHeight', 'textIndent', 'whiteSpace', 'wordWrap', 'wordBreak',
        'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
        'boxSizing'
    ];

    stylesToCopy.forEach(prop => {
        mirrorDiv.style[prop] = textareaStyles[prop];
    });

    mirrorDiv.style.width = textareaStyles.width;
}


export function initializeLineNumbers() {
    if (!state.outputTextarea) return;

    mirrorDiv = document.createElement('div');
    mirrorDiv.id = 'tc-line-height-mirror';

    // 将镜像元素移出屏幕外，但保持其渲染
    mirrorDiv.style.position = 'absolute';
    mirrorDiv.style.left = '-9999px';
    mirrorDiv.style.top = '0';
    mirrorDiv.style.visibility = 'hidden';

    // 附加到与textarea相同的父元素下，以确保继承正确的样式
    state.outputTextarea.parentElement.appendChild(mirrorDiv);

    syncMirrorStyles();

    const resizeObserver = new ResizeObserver(() => {
        if (!state.lineNumbersDiv || !state.outputTextarea) return;
        state.lineNumbersDiv.style.height = state.outputTextarea.clientHeight + 'px';
        updateLineNumbers();
    });
    resizeObserver.observe(state.outputTextarea);

    // 添加滚动同步
    state.outputTextarea.addEventListener('scroll', () => {
        if (state.lineNumbersDiv) {
            state.lineNumbersDiv.scrollTop = state.outputTextarea.scrollTop;
        }
    });
}
