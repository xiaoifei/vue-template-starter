# Vue3 前端脚手架

可复用的 Vue 3 + TypeScript 前端基础工程。适合作为面向最终用户的新项目起点：克隆仓库后安装依赖、配置 API 地址，即可开始开发。

## 技术栈

- **包管理**：pnpm
- **应用与构建**：Vue 3、`<script setup>`、TypeScript strict、Vite
- **状态与路由**：Pinia、Vue Router 4
- **UI 与样式**：shadcn-vue、Reka UI、Tailwind CSS v4、Lucide
- **网络请求**：Axios 单例封装，集中处理 token 注入与错误响应
- **代码质量**：ESLint flat config、Prettier、Husky、lint-staged、commitlint
- **测试**：Vitest、jsdom、Vue Test Utils、V8 覆盖率

shadcn-vue 组件源码位于 `src/components/ui/`，可按需添加和调整。项目通过 `components.json`、TypeScript `@/*` 路径别名、Vite alias 与 Tailwind v4 CSS-first 配置接入。

## 目录结构

```text
src/
├── api/          # 按业务模块组织 API 调用
├── assets/       # 静态资源
├── components/   # 公共组件与 shadcn-vue 组件
├── composables/  # 可复用组合式逻辑
├── layouts/      # 页面布局
├── router/       # 路由与导航守卫
├── stores/       # Pinia 状态模块
├── styles/       # 全局样式与主题变量
├── types/        # 全局类型（含 Vite 环境变量类型）
├── utils/        # request、工具函数
└── views/        # 路由页面
```

## 环境要求

- Node.js 20.19+ 或 22.12+
- pnpm 10+

## 开始使用

在本目录执行：

```bash
pnpm install
```

配置环境变量。复制 `.env.example` 为 `.env.local`（本地文件不会提交），并按环境修改 API 地址：

```dotenv
VITE_API_BASE_URL=http://localhost:8000/api
```

启动开发服务：

```bash
pnpm dev
```

默认打开 Vite 输出的本地地址（通常是 `http://localhost:5173`）。生产环境构建与预览：

```bash
pnpm build
pnpm preview
```

## 常用命令

| 命令                 | 用途                       |
| -------------------- | -------------------------- |
| `pnpm dev`           | 启动本地开发服务           |
| `pnpm build`         | 执行类型检查并构建生产资源 |
| `pnpm preview`       | 本地预览生产构建           |
| `pnpm lint`          | ESLint 检查                |
| `pnpm format`        | 使用 Prettier 格式化       |
| `pnpm format:check`  | 检查格式，不修改文件       |
| `pnpm test`          | 运行 Vitest 测试           |
| `pnpm test:coverage` | 运行测试并输出覆盖率       |

覆盖率统计 `composables/` 和 `stores/`，分支、函数、行覆盖率阈值均为 60%。提交时 Husky 会运行 lint-staged；提交信息需符合 Conventional Commits，例如 `feat: add profile page`。

## 请求层

API 模块从 `src/utils/request.ts` 导入 Axios 实例：

```ts
import request from '@/utils/request'

export function getExample() {
  return request.get<Example>('/example')
}
```

请求拦截器从 `localStorage.access_token` 读取 token 并添加 Bearer Authorization；响应拦截器统一转换错误。`baseURL` 从 `VITE_API_BASE_URL` 读取，不在代码中硬编码。

## 新项目复用

克隆本仓库后，可将仓库目录作为新项目的起点，再按需修改 `package.json` 中的项目名称、首页内容、页面路由、主题与环境变量：

```bash
git clone <你的 GitHub 仓库地址> my-project
cd my-project
pnpm install
pnpm dev
```

如果希望新项目不保留脚手架仓库的 Git 历史，可在克隆后删除 `.git` 并执行 `git init`，再连接新项目自己的远程仓库。
