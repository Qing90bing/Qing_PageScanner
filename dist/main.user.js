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
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==



// --- CSS 注入 ---
(function() {
    'use strict';
    const css = `
/* src/assets/themes.css */
/* 这个文件只定义颜色变量和主题切换逻辑 */

:root {
  /* 浅色模式颜色变量 */
  --color-bg: #ffffff;
  --color-text: #333333;
  --color-border: #e0e0e0;
  --color-overlay-bg: rgba(0,0,0,0.5);
  --color-shadow: rgba(0,0,0,0.2);
  --color-primary: #1a73e8;
  --color-primary-hover: #185abc;
  --color-primary-text: #ffffff;
  --color-toast-bg: #333333;
  --color-toast-text: #ffffff;
  --color-textarea-bg: #ffffff;
  --color-textarea-border: #cccccc;

  /* 深色模式颜色变量 */
  --dark-color-bg: #2d2d2d;
  --dark-color-text: #f0f0f0;
  --dark-color-border: #555555;
  --dark-color-overlay-bg: rgba(0,0,0,0.7);
  --dark-color-shadow: rgba(0,0,0,0.4);
  --dark-color-primary: #1e90ff;
  --dark-color-primary-hover: #1c86ee;
  --dark-color-primary-text: #ffffff;
  --dark-color-toast-bg: #eeeeee;
  --dark-color-toast-text: #111111;
  --dark-color-textarea-bg: #3a3a3a;
  --dark-color-textarea-border: #666666;
}

/* 根据 data-theme 属性应用浅色主题 */
body[data-theme='light'] {
  --main-bg: var(--color-bg);
  --main-text: var(--color-text);
  --main-border: var(--color-border);
  --main-overlay-bg: var(--color-overlay-bg);
  --main-shadow: var(--color-shadow);
  --main-primary: var(--color-primary);
  --main-primary-hover: var(--color-primary-hover);
  --main-primary-text: var(--color-primary-text);
  --main-toast-bg: var(--color-toast-bg);
  --main-toast-text: var(--color-toast-text);
  --main-textarea-bg: var(--color-textarea-bg);
  --main-textarea-border: var(--color-textarea-border);
}

/* 根据 data-theme 属性应用深色主题 */
body[data-theme='dark'] {
  --main-bg: var(--dark-color-bg);
  --main-text: var(--dark-color-text);
  --main-border: var(--dark-color-border);
  --main-overlay-bg: var(--dark-color-overlay-bg);
  --main-shadow: var(--dark-color-shadow);
  --main-primary: var(--dark-color-primary);
  --main-primary-hover: var(--dark-color-primary-hover);
  --main-primary-text: var(--dark-color-primary-text);
  --main-toast-bg: var(--dark-color-toast-bg);
  --main-toast-text: var(--dark-color-toast-text);
  --main-textarea-bg: var(--dark-color-textarea-bg);
  --main-textarea-border: var(--dark-color-textarea-border);
}


/* --- From main-ui.css --- */
/* src/assets/styles/main-ui.css */

/* --- 悬浮操作按钮 (FAB) --- */
.text-extractor-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  background-color: var(--main-primary);
  border-radius: 50%;
  box-shadow: 0 4px 8px var(--main-shadow);
  cursor: pointer;
  z-index: 9999;
  transition: background-color 0.3s;
  /* position: relative; 作为 SVG 绝对定位的基准 (父元素 fixed 已经可以作为基准) */
}
.text-extractor-fab:hover { background-color: var(--main-primary-hover); }
.text-extractor-fab svg {
  /* 采用绝对定位方案实现完美居中 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 26px; /* 保持图标尺寸 */
  height: 26px;
}

/* --- 文本提取模态框 --- */
.text-extractor-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10000;
  display: none;
  justify-content: center;
  align-items: center;
}

.text-extractor-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  width: 80%; max-width: 700px; max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--main-shadow);
  display: flex;
  flex-direction: column;
}

.text-extractor-modal-header {
  padding: 16px;
  border-bottom: 1px solid var(--main-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  font-weight: 500;
  color: var(--main-text);
}

.text-extractor-modal-close {
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  color: var(--main-text);
}

.text-extractor-modal-content {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
}

.text-extractor-modal-content textarea {
  width: 100%;
  height: 300px;
  border: 1px solid var(--main-textarea-border);
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  resize: vertical;
}

.text-extractor-modal-footer {
  padding: 16px;
  border-top: 1px solid var(--main-border);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text-extractor-copy-btn {
  padding: 10px 20px;
  background-color: var(--main-primary);
  color: var(--main-primary-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.text-extractor-copy-btn:hover { background-color: var(--main-primary-hover); }

/* --- “已复制”提示消息 (Toast) --- */
.text-extractor-toast {
  position: fixed; bottom: 100px; right: 30px;
  background-color: var(--main-toast-bg);
  color: var(--main-toast-text);
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10001;
  opacity: 0;
  transition: opacity 0.5s;
}


/* --- From settings-panel.css --- */
/* src/assets/styles/settings-panel.css */

.settings-panel-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10002;
  display: flex; justify-content: center; align-items: center;
}
.settings-panel-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  border: 1px solid var(--main-border);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--main-shadow);
  width: 90%;
  max-width: 400px;
}
.settings-panel-header, .settings-panel-content, .settings-panel-footer {
  padding: 16px;
}
.settings-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--main-border);
}
.settings-panel-header h2 { margin: 0; font-size: 1.1em; }
.settings-panel-close { cursor: pointer; font-size: 24px; }

.setting-item { margin-bottom: 16px; }
.setting-item > label { display: block; margin-bottom: 8px; font-weight: 500; }
.setting-item select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--main-textarea-border);
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
}

/* -- 全新重构的自定义复选框样式 -- */
.checkbox-group {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-top: 12px;
  cursor: pointer;
  user-select: none;
  height: 20px;
  line-height: 20px;
  color: var(--main-text);
}

/* 彻底隐藏原生的复选框 */
.checkbox-group input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 创建一个假的复选框容器 */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: var(--main-textarea-bg);
  border: 1px solid var(--main-textarea-border);
  border-radius: 3px;
  transition: all 0.2s;
}

/* 当鼠标悬停时，给一个反馈 */
.checkbox-group:hover input ~ .checkmark {
  border-color: var(--main-primary);
}

/* 当复选框被选中时，改变背景和边框颜色 */
.checkbox-group input:checked ~ .checkmark {
  background-color: var(--main-primary);
  border-color: var(--main-primary);
}

/* 创建勾选标记 (✓)，默认隐藏 */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* 当复选框被选中时，显示勾选标记 */
.checkbox-group input:checked ~ .checkmark:after {
  display: block;
}

/* 勾选标记的样式 */
.checkbox-group .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--main-bg);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
/* -- 结束自定义复选框样式 -- */

.settings-panel-footer {
  border-top: 1px solid var(--main-border);
  text-align: right;
}
#save-settings-btn {
  padding: 10px 20px;
  background-color: var(--main-primary);
  color: var(--main-primary-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#save-settings-btn:hover { background-color: var(--main-primary-hover); }

    `;
    GM_addStyle(css);
})();


(() => {
  // src/assets/icon.js
  var translateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>`;

  // src/ui/components/fab.js
  function createFab(onClick) {
    const fab = document.createElement("div");
    fab.className = "text-extractor-fab";
    fab.innerHTML = translateIcon;
    fab.addEventListener("click", onClick);
    document.body.appendChild(fab);
    return fab;
  }

  // src/core/settings.js
  var defaultSettings = {
    // 主题设置, 可选值: 'light', 'dark', 'system'
    theme: "system",
    // 过滤规则设置
    filterRules: {
      // 是否过滤纯数字和货币符号组成的字符串
      numbers: true,
      // 是否过滤纯中文字符串
      chinese: true,
      // 是否过滤包含中文字符的字符串
      containsChinese: false,
      // 是否过滤纯表情符号字符串
      emojiOnly: true,
      // 是否过滤纯符号字符串
      symbols: true
    }
  };
  function loadSettings() {
    const savedSettings = GM_getValue("script_settings", null);
    if (savedSettings) {
      try {
        return {
          ...defaultSettings,
          ...JSON.parse(savedSettings)
        };
      } catch (error) {
        console.error("\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u8BBE\u7F6E\u65F6\u51FA\u9519:", error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  }
  function saveSettings(settings) {
    if (typeof settings !== "object" || settings === null) {
      console.error("\u5C1D\u8BD5\u4FDD\u5B58\u7684\u8BBE\u7F6E\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u5BF9\u8C61:", settings);
      return;
    }
    GM_setValue("script_settings", JSON.stringify(settings));
  }

  // src/core/processor.js
  var numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;
  var pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;
  var containsChineseRegex = /[\u4e00-\u9fa5]/u;
  var emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
  var containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;
  var extractAndProcessText = () => {
    const settings = loadSettings();
    const { filterRules } = settings;
    const uniqueTexts = /* @__PURE__ */ new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) {
        continue;
      }
      if (parent && parent.closest(".text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay")) {
        continue;
      }
      let text = node.nodeValue || "";
      text = text.replace(/(\r\n|\n|\r)+/g, "\n");
      if (text.trim() === "") {
        continue;
      }
      const trimmedText = text.trim();
      if (filterRules.numbers && numberAndCurrencyRegex.test(trimmedText)) {
        continue;
      }
      if (filterRules.chinese && pureChineseRegex.test(trimmedText)) {
        continue;
      }
      if (filterRules.containsChinese && containsChineseRegex.test(trimmedText)) {
        continue;
      }
      if (filterRules.emojiOnly && emojiOnlyRegex.test(trimmedText)) {
        continue;
      }
      if (filterRules.symbols && !containsLetterOrNumberRegex.test(trimmedText)) {
        continue;
      }
      uniqueTexts.add(text);
    }
    return Array.from(uniqueTexts);
  };
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => (
        // 2. 对每个字符串进行处理：
        //    - 将字符串中的双引号 " 转义为 \"
        //    - 将字符串中的换行符 \n 转义为 \\n
        //    - 然后按照 `["...", ""]` 的格式包裹起来
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`
      )
    );
    return `[
${result.join(",\n")}
]`;
  };

  // src/ui/components/mainModal.js
  var modalOverlay = null;
  var outputTextarea = null;
  var handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  function showToast() {
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
  }
  function createMainModal() {
    if (modalOverlay) return;
    modalOverlay = document.createElement("div");
    modalOverlay.className = "text-extractor-modal-overlay";
    modalOverlay.innerHTML = `
    <div class="text-extractor-modal">
      <div class="text-extractor-modal-header">
        <span>\u63D0\u53D6\u7684\u6587\u672C</span>
        <span class="text-extractor-modal-close">&times;</span>
      </div>
      <div class="text-extractor-modal-content">
        <textarea id="text-extractor-output"></textarea>
      </div>
      <div class="text-extractor-modal-footer">
        <button class="text-extractor-copy-btn">\u4E00\u952E\u590D\u5236</button>
      </div>
    </div>
  `;
    document.body.appendChild(modalOverlay);
    outputTextarea = document.getElementById("text-extractor-output");
    const closeBtn = modalOverlay.querySelector(".text-extractor-modal-close");
    const copyBtn = modalOverlay.querySelector(".text-extractor-copy-btn");
    closeBtn.addEventListener("click", closeModal);
    copyBtn.addEventListener("click", () => {
      const textToCopy = outputTextarea.value;
      GM_setClipboard(textToCopy, "text");
      showToast();
    });
  }
  function openModal() {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    outputTextarea.value = "\u6587\u672C\u63D0\u53D6\u4E2D...";
    modalOverlay.style.display = "flex";
    document.addEventListener("keydown", handleKeyDown);
    setTimeout(() => {
      const extractedTexts = extractAndProcessText();
      const formattedText = formatTextsForTranslation(extractedTexts);
      outputTextarea.value = formattedText;
    }, 50);
  }
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.style.display = "none";
      document.removeEventListener("keydown", handleKeyDown);
    }
  }

  // src/ui/index.js
  function initUI() {
    createMainModal();
    createFab(openModal);
  }

  // src/ui/theme.js
  function initTheme() {
    const { theme } = loadSettings();
    applyTheme(theme);
  }
  function applyTheme(theme) {
    let finalTheme = theme;
    if (theme === "system") {
      finalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.body.setAttribute("data-theme", finalTheme);
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const { theme } = loadSettings();
    if (theme === "system") {
      applyTheme("system");
    }
  });

  // src/ui/settingsPanel.js
  var settingsPanel = null;
  function getPanelHTML(settings) {
    return `
    <div class="settings-panel-modal">
      <div class="settings-panel-header">
        <h2>\u811A\u672C\u8BBE\u7F6E</h2>
        <span class="settings-panel-close">&times;</span>
      </div>
      <div class="settings-panel-content">
        <div class="setting-item">
          <label for="theme-select">\u754C\u9762\u4E3B\u9898</label>
          <select id="theme-select">
            <option value="system" ${settings.theme === "system" ? "selected" : ""}>\u8DDF\u968F\u7CFB\u7EDF</option>
            <option value="light" ${settings.theme === "light" ? "selected" : ""}>\u6D45\u8272\u6A21\u5F0F</option>
            <option value="dark" ${settings.theme === "dark" ? "selected" : ""}>\u6DF1\u8272\u6A21\u5F0F</option>
          </select>
        </div>
        <div class="setting-item">
          <label>\u5185\u5BB9\u8FC7\u6EE4\u89C4\u5219</label>
          <label class="checkbox-group" for="filter-numbers">\u8FC7\u6EE4\u7EAF\u6570\u5B57/\u8D27\u5E01
            <input type="checkbox" id="filter-numbers" ${settings.filterRules.numbers ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-group" for="filter-chinese">\u8FC7\u6EE4\u7EAF\u4E2D\u6587
            <input type="checkbox" id="filter-chinese" ${settings.filterRules.chinese ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-group" for="filter-contains-chinese">\u8FC7\u6EE4\u5305\u542B\u4E2D\u6587\u7684\u6587\u672C
            <input type="checkbox" id="filter-contains-chinese" ${settings.filterRules.containsChinese ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-group" for="filter-emoji-only">\u8FC7\u6EE4\u7EAF\u8868\u60C5\u7B26\u53F7
            <input type="checkbox" id="filter-emoji-only" ${settings.filterRules.emojiOnly ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-group" for="filter-symbols">\u8FC7\u6EE4\u7EAF\u7B26\u53F7
            <input type="checkbox" id="filter-symbols" ${settings.filterRules.symbols ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <div class="settings-panel-footer">
        <button id="save-settings-btn">\u4FDD\u5B58\u5E76\u5E94\u7528</button>
      </div>
    </div>
  `;
  }
  var handleKeyDown2 = (event) => {
    if (event.key === "Escape") {
      hideSettingsPanel();
    }
  };
  function showSettingsPanel() {
    if (settingsPanel) {
      settingsPanel.style.display = "flex";
      return;
    }
    const currentSettings = loadSettings();
    settingsPanel = document.createElement("div");
    settingsPanel.className = "settings-panel-overlay";
    settingsPanel.innerHTML = getPanelHTML(currentSettings);
    document.body.appendChild(settingsPanel);
    settingsPanel.querySelector(".settings-panel-close").addEventListener("click", hideSettingsPanel);
    settingsPanel.querySelector("#save-settings-btn").addEventListener("click", handleSave);
    document.addEventListener("keydown", handleKeyDown2);
  }
  function hideSettingsPanel() {
    if (settingsPanel) {
      document.removeEventListener("keydown", handleKeyDown2);
      settingsPanel.remove();
      settingsPanel = null;
    }
  }
  function handleSave() {
    const newTheme = document.getElementById("theme-select").value;
    const filterNumbers = document.getElementById("filter-numbers").checked;
    const filterChinese = document.getElementById("filter-chinese").checked;
    const filterContainsChinese = document.getElementById("filter-contains-chinese").checked;
    const filterEmojiOnly = document.getElementById("filter-emoji-only").checked;
    const filterSymbols = document.getElementById("filter-symbols").checked;
    const newSettings = {
      theme: newTheme,
      filterRules: {
        numbers: filterNumbers,
        chinese: filterChinese,
        containsChinese: filterContainsChinese,
        emojiOnly: filterEmojiOnly,
        symbols: filterSymbols
      }
    };
    saveSettings(newSettings);
    applyTheme(newSettings.theme);
    alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF01");
    hideSettingsPanel();
  }
  function initSettingsPanel() {
    GM_registerMenuCommand("\u6253\u5F00\u8BBE\u7F6E", showSettingsPanel);
  }

  // src/main.js
  (function() {
    "use strict";
    initTheme();
    initUI();
    initSettingsPanel();
  })();
})();
