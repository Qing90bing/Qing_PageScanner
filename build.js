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

        // 2. 从 src/main.js 开始打包应用程序代码
        const result = await esbuild.build({
            entryPoints: ['src/main.js'],
            bundle: true,
            write: false, // 我们将自己写入最终文件
            outfile: 'dist/main.user.js', // 保留此项，作为参考
            format: 'iife', // IIFE 格式（立即调用函数表达式），适用于用户脚本
        });

        const bundledCode = result.outputFiles[0].text;

        // 3. 将头部信息和打包后的代码拼接在一起
        const finalScript = `${header}\n\n${bundledCode}`;

        // 4. 确保 dist 目录存在
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
