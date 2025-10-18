// 在 Node.js 中使用 ES 模块，这样我们就可以使用 import/export
// 注意：这需要 package.json 中设置 "type": "module"
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

// --- 主构建函数 ---
async function build() {
    try {
        console.log('开始构建...');

        // 1. 从 src/header.txt 读取 UserScript 头部信息
        const header = await fs.readFile('src/header.txt', 'utf-8');

        // 3. 读取所有 CSS 文件并合并
        const stylesDir = 'src/assets/styles';
        const cssFiles = await fs.readdir(stylesDir);

        // 确保先加载 themes.css，再加载其他样式文件
        let allCssContent = await fs.readFile('src/assets/themes.css', 'utf-8');

        for (const file of cssFiles) {
            if (path.extname(file) === '.css') {
                const content = await fs.readFile(path.join(stylesDir, file), 'utf-8');
                allCssContent += `\n\n/* --- From ${file} --- */\n${content}`;
            }
        }

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
            }
        });

        const bundledCode = result.outputFiles[0].text;

        // 5. 将头部、CSS 注入代码和打包后的代码拼接在一起
        const finalScript = `${header}\n\n${bundledCode}`;

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
