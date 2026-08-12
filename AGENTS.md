# Qing PageScanner 开发规范

这份文件是项目的代码边界和交付规则。新增功能、修复问题和整理代码都应遵守这里的约束。

## 目录边界

- `src/main.js` 只负责启动应用和连接顶层功能。
- `src/features/<feature>/` 按功能组织代码。`logic.js` 负责状态和业务流程，`ui.js` 负责 DOM 展示与交互。
- `src/shared/services/` 负责浏览器、Tampermonkey、持久化、Worker 和跨功能协调等外部边界。
- `src/shared/config/` 按领域存放不属于用户设置的静态参数，例如 `scannerConfig.js` 和 `uiConfig.js`；不要把不同领域重新聚合成一个万能配置对象。
- `src/shared/utils/` 只放可复用的无 UI 工具。与业务状态无关的解析、过滤和格式化逻辑优先放这里。
- `src/shared/ui/components/` 只提供可复用 UI 组件，不直接读取某个功能的内部状态。
- `src/assets/` 只存放图标、样式和构建时注入资源。
- `tests/` 存放可重复运行的行为测试。纯函数优先直接测试，浏览器行为通过最小 DOM 或构建产物测试。
- `dist/` 是构建产物，只能通过 `npm run build` 更新，禁止手工编辑。

功能模块可以依赖 `shared`，但不要互相导入另一个功能模块的内部实现。用户设置的读写统一走 `src/shared/services/settings.js`，设置面板的副作用才留在 `src/features/settings/logic.js`。`shared/ui/entry.js`、`shared/ui/mainModal/` 和 `shared/ui/summaryHandler.js` 是应用组装层，可以连接功能入口；其中的可复用组件和服务不得反向依赖功能模块。

## 图标规范

- 使用新图标时，先从 [Google Fonts Icons](https://fonts.google.com/icons) 中查找并选择；使用 Google Material Symbols 时，在图标文件注释中记录图标名称和来源，避免手工绘制近似图标。

## JavaScript 规则

- 使用原生 ES modules 和显式 `.js` 相对导入。
- 使用 4 个空格缩进、单引号和 Prettier 默认的尾逗号规则。
- 单个源码文件控制在 900 行以内；超过这个范围时先拆分状态、外部边界或纯逻辑，再继续添加功能。
- 不使用 `var`，不把可变绑定写成 `let`，不使用宽松相等。
- 不在业务代码中直接调用 `GM_*` API。统一通过 `src/shared/services/tampermonkey.js` 访问。
- 不直接把不可信字符串写入 `innerHTML`。受控静态 HTML 字符串必须经过 `createTrustedHTML`，它不是清理器；页面文本、选择器和用户输入一律使用 `textContent` 或属性 API。
- 定时器、`MutationObserver`、Worker 和事件监听器必须有对应的清理路径。异步流程必须处理停止、暂停、取消或过期状态。
- ESLint 必须保留 `@eslint/js` 的推荐规则；项目规则只能在推荐规则之上合并，不能覆盖它。构建时注入的全局占位符要在 ESLint 配置中明确声明。
- 需要销毁的事件监听器必须复用同一个具名函数引用，不能在 `removeEventListener` 中重新创建匿名回调。
- 不用固定等待时间代表网络、动画或 DOM 状态已经完成。下一步应由真实的完成事件、状态或回调驱动；确实只为视觉反馈保留的延时要在调用点写清原因。
- 复杂状态流程要把纯决策提取成可测试函数，避免在 UI 回调中直接修改多个全局集合。
- 不为了“统一”改动已有的特殊分支，先确认它是否保护某个已修复的边界问题。

## 测试和提交前检查

行为变化必须同时添加能复现旧问题的回归测试。涉及构建入口、UserScript 元数据或 Worker 时，必须检查生成产物。

提交前运行：

```text
npm ci
npm run check
```

`npm run check` 会依次执行 ESLint、Prettier、Node 测试和构建。只修改源码后也要确认 `dist/main.user.js` 是否需要重新生成。不要把测试临时跳过、改成空断言或依赖本机未声明的全局变量。

## 变更范围

- 优先做小范围、可回滚的模块整理，每个提交只表达一个目的。
- 修改共享服务时，检查所有调用方和对应的 Worker、导出、持久化格式。
- 删除代码前要在源码、测试、构建脚本、文档和动态字符串中搜索完整引用。
- 不提交 API Key、页面内容、个人数据或本地调试产物。

## Git 提交规范

- 使用 Conventional Commits 类型前缀，例如 `feat:`、`fix:`、`refactor:`、`perf:`、`docs:`、`chore:` 和 `build:`。
- 类型前缀后使用中文，格式为 `fix: 修复元素扫描工具栏渲染问题`。
- 每个提交只表达一个变动点，不要把功能修复、重构、文档和构建产物混在同一提交中。
- `dist/main.user.js` 只能在对应源码提交完成后单独使用 `build:` 提交更新。
- 只有更新版本号时，提交说明才使用“更新用户脚本构建产物”。
- 提交前先检查暂存区文件范围，再运行 `npm run check`。
