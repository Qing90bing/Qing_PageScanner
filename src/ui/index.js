import { translateIcon } from '../assets/icon.js';
import { extractAndProcessText, formatTextsForTranslation } from '../core/processor.js';

// --- 样式 ---
const styles = `
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

/**
 * 初始化整个用户界面，创建元素并绑定事件监听器。
 */
export function initUI() {
    // 1. 注入样式
    GM_addStyle(styles);

    // 2. 创建 UI 元素
    const fab = document.createElement('div');
    fab.className = 'text-extractor-fab';
    fab.innerHTML = translateIcon;
    document.body.appendChild(fab);

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'text-extractor-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="text-extractor-modal">
            <div class="text-extractor-modal-header">
                <span>提取的文本</span>
                <span class="text-extractor-modal-close">&times;</span>
            </div>
            <div class="text-extractor-modal-content">
                <textarea id="text-extractor-output" readonly></textarea>
            </div>
            <div class="text-extractor-modal-footer">
                <button class="text-extractor-copy-btn">一键复制</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // 3. 获取动态元素的引用
    const modal = document.querySelector('.text-extractor-modal-overlay');
    const closeBtn = document.querySelector('.text-extractor-modal-close');
    const copyBtn = document.querySelector('.text-extractor-copy-btn');
    const outputTextarea = document.getElementById('text-extractor-output');

    // 4. 绑定事件监听器
    fab.addEventListener('click', () => {
        outputTextarea.value = '文本提取中...';
        modal.style.display = 'flex';
        
        // 使用 setTimeout 异步执行提取，避免UI卡顿
        setTimeout(() => {
            const extractedTexts = extractAndProcessText();
            const formattedText = formatTextsForTranslation(extractedTexts);
            outputTextarea.value = formattedText;
        }, 50);
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        // 如果点击的是遮罩层本身，而不是模态框内容，则关闭模态框
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = outputTextarea.value;
        GM_setClipboard(textToCopy, 'text');
        
        // 创建并显示“已复制”提示
        const toast = document.createElement('div');
        toast.className = 'text-extractor-toast';
        toast.textContent = '已复制!';
        document.body.appendChild(toast);
        
        // 触发显示动画
        setTimeout(() => { toast.style.opacity = '1'; }, 10);
        
        // 2秒后自动隐藏并移除
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => { toast.remove(); }, 500);
        }, 2000);
    });
}
