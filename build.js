// 在 Node.js 中使用 ES 模块，这样我们就可以使用 import/export
// 注意：这需要 package.json 中设置 "type": "module"
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import strip from 'strip-comments';
import postcss from 'postcss';
import discardComments from 'postcss-discard-comments';

// --- 主构建函数 ---
async function build() {
    try {
        console.log('开始构建...');

        // 1. 从 src/header.txt 读取 UserScript 头部信息
        const header = await fs.readFile('src/header.txt', 'utf-8');

        // 2. 读取所有 CSS 文件并合并
        console.log('正在读取和合并 CSS 文件...');
        const stylesDir = 'src/assets/styles';
        const cssFiles = await fs.readdir(stylesDir);

        let allCssContent = '';
        const themeFile = 'themes.css'; // 主题文件应最先加载

        // 筛选并排序 CSS 文件，确保 themes.css 在最前面
        const sortedCssFiles = cssFiles
            .filter(file => path.extname(file) === '.css')
            .sort((a, b) => {
                if (a === themeFile) return -1;
                if (b === themeFile) return 1;
                return 0;
            });

        for (const file of sortedCssFiles) {
            const content = await fs.readFile(path.join(stylesDir, file), 'utf-8');
            allCssContent += content + '\n';
        }
        console.log('CSS 文件合并完成。');

        // 使用 PostCSS 清理 CSS 注释
        console.log('正在清理 CSS 注释...');
        const postcssResult = await postcss([discardComments({ removeAll: true })]).process(allCssContent, { from: undefined });
        const cleanedCss = postcssResult.css;
        console.log('CSS 注释清理完成。');

        // 3. 【新增】独立打包 Web Worker 脚本
        console.log('正在打包 Web Workers...');
        const workerBuildResult = await esbuild.build({
            entryPoints: [
                'src/features/session-scan/worker.js',
                'src/features/quick-scan/worker.js'
            ],
            bundle: true,
            write: false,
            outdir: 'dist/workers', // 虚拟输出目录
            format: 'iife',
        });

        // 分别获取两个 worker 的代码
        const sessionScanWorkerCode = workerBuildResult.outputFiles.find(f => f.path.includes('session-scan')).text;
        const quickScanWorkerCode = workerBuildResult.outputFiles.find(f => f.path.includes('quick-scan')).text;
        console.log('Web Workers 打包完成。');

        // 4. 从 src/main.js 开始打包主应用程序代码
        console.log('正在打包主应用程序...');
        const result = await esbuild.build({
            entryPoints: ['src/main.js'],
            bundle: true,
            write: false,
            outfile: 'dist/main.user.js',
            format: 'iife',
            globalName: 'TextExtractor', // 暴露 IIFE 的全局变量名
            define: {
                // 将所有合并后的 CSS 作为单个字符串注入
                '__INJECTED_CSS__': JSON.stringify(cleanedCss),
                // 将打包好的、无依赖的 Worker 代码注入
                '__WORKER_STRING__': JSON.stringify(sessionScanWorkerCode),
                '__QUICK_SCAN_WORKER_STRING__': JSON.stringify(quickScanWorkerCode),
            }
        });
        console.log('主应用程序打包完成。');

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
