// 在 Node.js 中使用 ES 模块，这样我们就可以使用 import/export
// 注意：这需要 package.json 中设置 "type": "module"
import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import strip from 'strip-comments';
import postcss from 'postcss';
import discardComments from 'postcss-discard-comments';
import cssnano from 'cssnano';

// --- esbuild 插件：虚拟语言模块 ---
const localesPlugin = {
    name: 'locales-plugin',
    setup(build) {
        // 拦截 'virtual:locales' 导入
        build.onResolve({ filter: /^virtual:locales$/ }, args => ({
            path: args.path,
            namespace: 'locales-ns',
        }));

        // 加载虚拟模块内容
        build.onLoad({ filter: /.*/, namespace: 'locales-ns' }, async () => {
            const i18nDir = 'src/shared/i18n';
            // 使用 path.resolve 确保绝对路径，以便 esbuild 正确解析内部的相对导入
            const absI18nDir = path.resolve(i18nDir);

            const files = await fs.readdir(i18nDir);
            const jsonFiles = files.filter(file => path.extname(file) === '.json');

            const imports = [];
            const exports = [];
            const languageList = [];

            for (const file of jsonFiles) {
                const langCode = path.basename(file, '.json');
                const identifier = langCode.replace(/[^a-zA-Z0-9]/g, '_');

                // 读取 metadata
                const content = await fs.readFile(path.join(i18nDir, file), 'utf-8');
                let name = langCode;
                try {
                    const json = JSON.parse(content);
                    if (json._meta && json._meta.name) {
                        name = json._meta.name;
                    }
                } catch (e) {
                    console.warn(`Warning: Failed to parse ${file}`);
                }

                // 这里的导入路径是相对于 resolveDir (即 i18n 目录) 的
                imports.push(`import ${identifier} from './${file}';`);
                exports.push(`    '${langCode}': ${identifier},`);
                languageList.push({ code: langCode, name: name });
            }

            const contents = `
${imports.join('\n')}

export const locales = {
${exports.join('\n')}
};

export const resourceLanguages = ${JSON.stringify(languageList, null, 4)};
            `;

            return {
                contents,
                loader: 'js',
                resolveDir: absI18nDir, // 关键：告诉 esbuild 如何解析生成的 import
            };
        });
    },
};

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

        // 使用 PostCSS 清理和压缩 CSS
        console.log('正在清理和压缩 CSS...');
        const postcssResult = await postcss([
            discardComments({ removeAll: true }),
            cssnano()
        ]).process(allCssContent, { from: undefined });
        const cleanedCss = postcssResult.css;
        console.log('CSS 清理和压缩完成。');

        // 3. 打包通用的 Web Worker 脚本
        console.log('正在打包通用 Web Worker...');
        const workerBuildResult = await esbuild.build({
            entryPoints: ['src/shared/workers/processing.worker.js'],
            bundle: true,
            write: false,
            outfile: 'dist/processing-worker.js',
            format: 'iife',
            plugins: [localesPlugin], // Worker 也需要解析 virtual:locales
        });
        const processingWorkerCode = workerBuildResult.outputFiles[0].text;
        console.log('通用 Web Worker 打包完成。');

        // 4. 从 src/main.js 开始打包主应用程序代码
        console.log('正在打包主应用程序...');
        const result = await esbuild.build({
            entryPoints: ['src/main.js'],
            bundle: true,
            write: false,
            outfile: 'dist/main.user.js',
            format: 'iife',
            plugins: [localesPlugin], // 添加虚拟模块插件
            globalName: 'TextExtractor',
            define: {
                '__INJECTED_CSS__': JSON.stringify(cleanedCss),
                '__PROCESSING_WORKER_STRING__': JSON.stringify(processingWorkerCode),
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
