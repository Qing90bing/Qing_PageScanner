// src/shared/ui/mainModal/lineNumberLogic.js

/**
 * @module lineNumberLogic
 * @description 封装主模态框文本区域的行号计算和更新逻辑。
 */

import * as state from './modalState.js';

/**
 * @private
 * @description 计算单个字符串在给定宽度下会占据多少行（视觉换行）。
 * @param {string} sentence - 要计算的字符串。
 * @param {number} width - 容器的内容宽度。
 * @returns {number} 占据的行数。
 */
function calcStringLines(sentence, width) {
    if (!width || !state.canvasContext) return 1;

    const words = sentence.split('');
    let lineCount = 0;
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const wordWidth = state.canvasContext.measureText(words[i]).width;
        const lineWidth = state.canvasContext.measureText(currentLine).width;

        if (lineWidth + wordWidth > width) {
            lineCount++;
            currentLine = words[i];
        } else {
            currentLine += words[i];
        }
    }
    if (currentLine.trim() !== '' || sentence === '') {
        lineCount++;
    }
    return lineCount;
}

/**
 * @private
 * @description 计算文本区域内所有内容的视觉总行数，并生成行号数组和映射。
 * @returns {{lineNumbers: Array<string|number>, lineMap: Array<number>}} 包含行号数组和视觉行到真实行映射的对象。
 */
function calcLines() {
    const lines = state.outputTextarea.value.split('\n');
    const textareaStyles = window.getComputedStyle(state.outputTextarea);

    const paddingLeft = parseFloat(textareaStyles.paddingLeft);
    const paddingRight = parseFloat(textareaStyles.paddingRight);
    const textareaContentWidth = state.outputTextarea.clientWidth - paddingLeft - paddingRight;

    let lineNumbers = [];
    let lineMap = []; // 映射：visualLineIndex -> realLineIndex

    lines.forEach((lineString, realLineIndex) => {
        const numLinesOfSentence = calcStringLines(lineString, textareaContentWidth);

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

    const textBeforeCursor = text.substring(0, selectionEnd);
    const cursorRealLineIndex = textBeforeCursor.split('\n').length - 1;

    const realLines = text.split('\n');
    let positionInRealLine = selectionEnd;
    for (let i = 0; i < cursorRealLineIndex; i++) {
        positionInRealLine -= (realLines[i].length + 1);
    }

    const textareaStyles = window.getComputedStyle(textarea);
    const paddingLeft = parseFloat(textareaStyles.paddingLeft);
    const paddingRight = parseFloat(textareaStyles.paddingRight);
    const textareaContentWidth = textarea.clientWidth - paddingLeft - paddingRight;

    const lineContent = realLines[cursorRealLineIndex];
    let visualLineOffset = 0;
    let currentLine = '';

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
    if (firstVisualIndexOfRealLine === -1) return;

    const finalVisualLineIndex = firstVisualIndexOfRealLine + visualLineOffset;

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
