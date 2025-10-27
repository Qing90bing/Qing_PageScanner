// src/shared/ui/mainModal/lineNumberLogic.js

/**
 * @module lineNumberLogic
 * @description 封装主模态框文本区域的行号计算和更新逻辑。
 */

import { loadSettings } from '../../../features/settings/logic.js';
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
    const settings = loadSettings();
    const lines = state.outputTextarea.value.split('\n');
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
                for (let i = 0; i < numLinesOfSentence - 1; i++) {
                    lineNumbers.push('');
                    lineMap.push(realLineIndex);
                }
            }
        });
    } else {
        // --- 自动换行关闭时的简单计算 ---
        lines.forEach((_, realLineIndex) => {
            lineNumbers.push(realLineIndex + 1);
            lineMap.push(realLineIndex);
        });
    }

    return { lineNumbers, lineMap };
}

/**
 * @description 根据光标位置更新活动行号的样式。
 */
export function updateActiveLine() {
    if (!state.lineNumbersDiv || !state.lineNumbersDiv.classList.contains('is-visible') || !state.outputTextarea) return;

    const settings = loadSettings();
    const textarea = state.outputTextarea;
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;

    const textBeforeCursor = text.substring(0, selectionEnd);
    const cursorRealLineIndex = textBeforeCursor.split('\n').length - 1;

    let finalVisualLineIndex = -1;

    if (settings.enableWordWrap) {
        // --- 自动换行开启时的复杂计算 ---
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

let isThrottled = false;

/**
 * @description 更新行号的显示（异步节流版）。
 */
export function updateLineNumbers() {
    if (!state.lineNumbersDiv || !state.outputTextarea || isThrottled) return;

    isThrottled = true;
    setTimeout(() => {
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

        updateActiveLine();
        isThrottled = false;
    }, 100); // 100ms 的节流延迟
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
