// 在 Node.js 中使用 ES 模块，这样我们就可以使用 import/export
// 注意：这需要 package.json 中设置 "type": "module"
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import strip from 'strip-comments';

// --- 主构建函数 ---
async function build() {
    try {
        console.log('开始构建...');

        // 1. 从 src/header.txt 读取 UserScript 头部信息
        const header = await fs.readFile('src/header.txt', 'utf-8');

        // 3. 读取所有 CSS 文件并合并
        const stylesDir = 'src/assets/styles';
        const cssFiles = await fs.readdir(stylesDir);

        // 确保 themes.css 始终最先被加载，然后加载所有其他 CSS 文件
        let allCssContent = '';
        const themeFile = 'themes.css';

        // 先筛选出所有 .css 文件
        const filteredCssFiles = cssFiles.filter(file => path.extname(file) === '.css');

        // 将 themes.css 移到列表的开头
        const sortedCssFiles = filteredCssFiles.sort((a, b) => {
            if (a === themeFile) return -1;
            if (b === themeFile) return 1;
            return 0;
        });

        // 依次读取和拼接文件内容
        for (const file of sortedCssFiles) {
            const content = await fs.readFile(path.join(stylesDir, file), 'utf-8');
            if (allCssContent) {
                 allCssContent += `\n\n/* --- From ${file} --- */\n`;
            }
            allCssContent += content;
        }

        // 读取确认模态框的 CSS 内容以供独立注入
        const confirmationModalCss = await fs.readFile('src/assets/styles/confirmationModal.css', 'utf-8');

        // 读取 Web Worker 脚本内容
        const workerScript = await fs.readFile('src/features/session-scan/worker.js', 'utf-8');

        // 2. 从 src/main.js 开始打包应用程序代码
        const result = await esbuild.build({
            entryPoints: ['src/main.js'],
            bundle: true,
            write: false, // 我们将自己写入最终文件
            outfile: 'dist/main.user.js', // 保留此项，作为参考
            format: 'iife', // IIFE 格式（立即调用函数表达式），适用于用户脚本
            define: {
                // 将合并后的 CSS 内容作为全局常量注入到代码中
                '__INJECTED_CSS__': JSON.stringify(allCssContent),
                // 单独注入确认模态框的CSS
                '__CONFIRMATION_MODAL_CSS__': JSON.stringify(confirmationModalCss),
                // 注入 Web Worker 脚本
                '__WORKER_STRING__': JSON.stringify(workerScript),
            }
        });

        const bundledCode = result.outputFiles[0].text;

        // --- 新增代码清理步骤 ---
        console.log('开始清理代码...');
        // 使用 strip-comments 安全地移除注释，同时保留格式
        let codeWithoutComments = strip(bundledCode);
        // 移除所有纯空白行
        let cleanedCode = codeWithoutComments.split('\n').filter(line => line.trim() !== '').join('\n');
        console.log('代码清理完成。');
        // --- 清理步骤结束 ---

        // 5. 将头部、CSS 注入代码和清理后的代码拼接在一起
        const finalScript = `${header}\n\n${cleanedCode}`;

        // 6. 确保 dist 目录存在
        await fs.mkdir('dist', { recursive: true });

        // 5. 将最终的脚本写入 dist 目录
        const outputPath = path.join('dist', 'main.user.js');
        await fs.writeFile(outputPath, finalScript);

        console.log(`✅ 构建成功！脚本已保存至 ${outputPath}`);

    } catch (error) {
        console.error('🔥 构建失败:', error);
        process.exit(1);
    }
}

// --- 运行构建 ---
build();
