// ==UserScript==
// @name         网页文本提取工具
// @name:en-US   Web Text Extraction Tool
// @namespace    https://github.com/Qing90bing/Qing_PageScanner
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  像扫描仪一样快速“扫描”整个网页，智能识别并捕获所有需要翻译的文本片段，提高你的翻译效率。
// @description:en-US  Scan the entire web page like a scanner, intelligently identify and capture all text fragments that need translation.
// @license      MIT
// @copyright    2025, Qing90bing
// @author       Qing90bing
// @supportURL   https://github.com/Qing90bing/Qing_PageScanner/issues
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


(() => {
  // src/assets/icon.js
  var translateIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#FFFFFF">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4.86 19l5.09-5.02 3.92 3.91z"/>
</svg>`;

  // src/core/processor.js
  var extractAndProcessText = () => {
    const uniqueTexts = /* @__PURE__ */ new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) {
        continue;
      }
      if (parent && parent.closest(".text-extractor-fab, .text-extractor-modal-overlay")) {
        continue;
      }
      let text = node.nodeValue || "";
      text = text.replace(/(\r\n|\n|\r)+/g, "\n");
      if (text.trim() === "") {
        continue;
      }
      if (/^\d+$/.test(text.trim())) {
        continue;
      }
      uniqueTexts.add(text);
    }
    return Array.from(uniqueTexts);
  };
  var formatTextsForTranslation = (texts) => {
    const result = texts.map((text) => `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`);
    return `[
${result.join(",\n")}
]`;
  };

  // src/ui/index.js
  var styles = `
    .text-extractor-fab {
      position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px;
      background-color: #1a73e8; border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: flex; justify-content: center; align-items: center;
      cursor: pointer; z-index: 9999; transition: background-color 0.3s;
    }
    .text-extractor-fab:hover { background-color: #185abc; }
    
    .text-extractor-modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.5); z-index: 10000;
      display: none; justify-content: center; align-items: center;
    }
    .text-extractor-modal {
      background-color: white; width: 80%; max-width: 700px; max-height: 80vh;
      border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      display: flex; flex-direction: column;
    }
    .text-extractor-modal-header {
      padding: 16px; border-bottom: 1px solid #e0e0e0;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 1.2em; font-weight: 500;
    }
    .text-extractor-modal-close { cursor: pointer; font-size: 24px; font-weight: bold; }
    .text-extractor-modal-content { padding: 16px; overflow-y: auto; flex-grow: 1; }
    .text-extractor-modal-content textarea {
      width: 100%; height: 300px; border: 1px solid #ccc; border-radius: 4px;
      padding: 8px; font-size: 14px; resize: vertical;
    }
    .text-extractor-modal-footer {
      padding: 16px; border-top: 1px solid #e0e0e0;
      display: flex; justify-content: flex-end; align-items: center;
    }
    .text-extractor-copy-btn {
      padding: 10px 20px; background-color: #1a73e8; color: white;
      border: none; border-radius: 4px; cursor: pointer; font-size: 16px;
    }
    .text-extractor-copy-btn:hover { background-color: #185abc; }
    .text-extractor-toast {
      position: fixed; bottom: 100px; right: 30px; background-color: #333;
      color: white; padding: 10px 20px; border-radius: 4px;
      z-index: 10001; opacity: 0; transition: opacity 0.5s;
    }
`;
  function initUI() {
    GM_addStyle(styles);
    const fab = document.createElement("div");
    fab.className = "text-extractor-fab";
    fab.innerHTML = translateIcon;
    document.body.appendChild(fab);
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "text-extractor-modal-overlay";
    modalOverlay.innerHTML = `
        <div class="text-extractor-modal">
            <div class="text-extractor-modal-header">
                <span>\u63D0\u53D6\u7684\u6587\u672C</span>
                <span class="text-extractor-modal-close">&times;</span>
            </div>
            <div class="text-extractor-modal-content">
                <textarea id="text-extractor-output" readonly></textarea>
            </div>
            <div class="text-extractor-modal-footer">
                <button class="text-extractor-copy-btn">\u4E00\u952E\u590D\u5236</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
    const modal = document.querySelector(".text-extractor-modal-overlay");
    const closeBtn = document.querySelector(".text-extractor-modal-close");
    const copyBtn = document.querySelector(".text-extractor-copy-btn");
    const outputTextarea = document.getElementById("text-extractor-output");
    fab.addEventListener("click", () => {
      outputTextarea.value = "\u6587\u672C\u63D0\u53D6\u4E2D...";
      modal.style.display = "flex";
      setTimeout(() => {
        const extractedTexts = extractAndProcessText();
        const formattedText = formatTextsForTranslation(extractedTexts);
        outputTextarea.value = formattedText;
      }, 50);
    });
    const closeModal = () => {
      modal.style.display = "none";
    };
    closeBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
    copyBtn.addEventListener("click", () => {
      const textToCopy = outputTextarea.value;
      GM_setClipboard(textToCopy, "text");
      const toast = document.createElement("div");
      toast.className = "text-extractor-toast";
      toast.textContent = "\u5DF2\u590D\u5236!";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "1";
      }, 10);
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 2e3);
    });
  }

  // src/main.js
  (function() {
    "use strict";
    initUI();
  })();
})();
