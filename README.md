# Qing PageScanner

Qing PageScanner 是一个运行在 Tampermonkey 中的网页文本扫描与整理工具，支持静态扫描、动态扫描、元素扫描和 AI 辅助整理。

## 开发

环境要求：Node.js 20 或更高版本。

```text
npm ci
npm run check
```

常用命令：

- `npm run lint`：检查源码、构建脚本和测试代码。
- `npm test`：运行 Node 测试。
- `npm run build`：生成 `dist/main.user.js`。
- `npm run format`：使用 Prettier 格式化项目文件。
- `npm run check`：运行完整本地门禁。

## 项目结构

```text
src/
  main.js                  应用启动入口
  features/                按用户功能组织的业务模块
  shared/config/           按领域拆分的静态配置
  shared/services/         外部 API、持久化、Worker 和跨功能协调
  shared/ui/               UI 容器、组件和主模态框
  shared/utils/            DOM、文本和核心工具
  assets/                  图标、样式和构建资源
tests/                     行为与构建安全测试
dist/                      构建生成的 UserScript
```

更详细的边界、异步清理和安全规则见 [`AGENTS.md`](AGENTS.md)。
