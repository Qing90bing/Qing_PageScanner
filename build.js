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

        // 2. 读取所有 CSS 文件并合并
        const stylesDir = 'src/assets/styles';
        const cssFiles = await fs.readdir(stylesDir);

        let allCssContent = '';
        const themeFile = 'themes.css';

        const filteredCssFiles = cssFiles.filter(file => path.extname(file) === '.css');
        const sortedCssFiles = filteredCssFiles.sort((a, b) => {
            if (a === themeFile) return -1;
            if (b === themeFile) return 1;
            return 0;
        });

        for (const file of sortedCssFiles) {
            const content = await fs.readFile(path.join(stylesDir, file), 'utf-8');
            if (allCssContent) {
                 allCssContent += `\n\n/* --- From ${file} --- */\n`;
            }
            allCssContent += content;
        }

        const confirmationModalCss = await fs.readFile('src/assets/styles/confirmationModal.css', 'utf-8');

        // 3. 【新增】独立打包 Web Worker 脚本
        console.log('正在打包 Web Worker...');
        const workerBuildResult = await esbuild.build({
            entryPoints: ['src/features/session-scan/worker.js'],
            bundle: true,
            write: false,
            outfile: 'dist/worker.js', // 虚拟输出路径
            format: 'iife',
        });
        const bundledWorkerCode = workerBuildResult.outputFiles[0].text;
        console.log('Web Worker 打包完成。');

        // 【新增】独立打包快速扫描的 Web Worker
        console.log('正在打包快速扫描 Web Worker...');
        const quickScanWorkerResult = await esbuild.build({
            entryPoints: ['src/features/quick-scan/worker.js'],
            bundle: true,
            write: false,
            format: 'iife',
        });
        const bundledQuickScanWorkerCode = quickScanWorkerResult.outputFiles[0].text;
        console.log('快速扫描 Web Worker 打包完成。');

        // 5. 从 src/main.js 开始打包主应用程序代码
        const result = await esbuild.build({
            entryPoints: ['src/main.js'],
            bundle: true,
            write: false,
            outfile: 'dist/main.user.js',
            format: 'iife',
            globalName: 'TextExtractor', // 暴露 IIFE 的全局变量名
            define: {
                '__INJECTED_CSS__': JSON.stringify(allCssContent),
                '__CONFIRMATION_MODAL_CSS__': JSON.stringify(confirmationModalCss),
                // 将动态扫描的 Worker 代码注入
                '__WORKER_STRING__': JSON.stringify(bundledWorkerCode),
                // 将快速扫描的 Worker 代码注入
                '__QUICK_SCAN_WORKER_STRING__': JSON.stringify(bundledQuickScanWorkerCode),
            }
        });

        const bundledCode = result.outputFiles[0].text;

        console.log('开始清理代码...');
        let codeWithoutComments = strip(bundledCode);
        let cleanedCode = codeWithoutComments.split('\n').filter(line => line.trim() !== '').join('\n');
        console.log('代码清理完成。');

        const finalScript = `${header}\n\n${cleanedCode}`;

        await fs.mkdir('dist', { recursive: true });
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
