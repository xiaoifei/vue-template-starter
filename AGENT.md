## 目录
[样式规范 (Style Guide)]()


## 样式规范 (Style Guide)
> 适用范围：`src/**/*.vue`、`src/**/*.css`、`src/**/*.ts` 中涉及样式的一切改动。
> 违反以下「禁止」条款的代码不得进入提交；AI 生成样式代码前必须先读本节。

### 1. 层叠顺序（Cascade Layers）—— 唯一优先级来源
- 全局样式入口 `src/styles/index.css`，样式顺序已声明`@layer reset, theme, base, components, utilities;`，不得随意调整：
- 禁止用 !important 解决层叠冲突。优先级问题一律通过调整 @layer 归位解决。
- 覆盖第三方内部类时，必须写在 @layer components 内，并用容器限定作用域，例如：
```
@layer components {
  .flow-container :where(.vue-flow__controls) {
    @apply bg-card border-border shadow-sm;
  }
}
```
### 2. Design Token —— 唯一视觉来源
- 颜色、圆角、间距、阴影、字体，必须使用 @theme 中定义的语义化 Token（bg-primary、text-muted-foreground、rounded-lg、border-border 等）。
- 禁止在业务代码中写任意值：bg-[#3b82f6]、rounded-[7px]、text-[13px]、shadow-[0_1px_2px_rgba(0,0,0,.1)] 一律不允许。
- 需要新增视觉变量时，必须先在 src/styles/theme.css 的 @theme 中定义 Token，再在业务中使用，不得就地硬编码。
- 字体只允许来自 `--font-sans` / `--font-heading` 两个 Token。禁止在组件或业务 CSS 中另写 `font-family`，也禁止引入第二套字体；确需更换字体时，只改 `--font-sans` 这一处 Token。
- 主题切换（亮/暗）只允许改 Token 值，禁止在组件内写 dark: 前缀去逐处适配颜色（dark:bg-gray-900 属于硬编码，不得使用）。

### 3. shadcn-vue 定制规则
- 禁止为 shadcn-vue 组件写类名覆盖（如 .shadcn-button { ... } 或 :deep(.btn)）。
- 定制主题的唯一方式是重定义 @theme 中的 CSS 变量（--color-primary、--radius-lg 等），组件会随 Token 自动换肤。
- 需要微调单个组件实例时，通过组件自身的 class prop 传入 Tailwind 工具类（基于 Token），不使用内联 style。

### 第三方ui库规则（vueflow）
- 禁止直接重写 .vue-flow__node、.vue-flow__edge 等内部类名，覆盖必须满足以下全部条件：
    1. 写在 @layer components 内；
    2. 用外层容器类限定（如 .flow-container）；
    3. 使用 :where() 包裹内部类名，不提升权重；
    4. 属性值使用 Token 工具类或 CSS 变量，禁止硬编码颜色。
- 自定义节点/边的样式优先通过 VueFlow 组件的 class 透传 + Tailwind 工具类实现。

### 5. 类名书写约定
- 禁止动态拼接类名：bg-${color}-500、text-${size} 等模板字符串写法一律不允许，Tailwind 扫描器无法识别，样式会静默失效。
- 条件类名必须使用项目提供的 cn() 工具（来自 `cn` 包，官方出品的 `clsx` + `tailwind-merge` 替代实现；`@/lib/utils` 只是一行转出，禁止在业务里直接 `from 'clsx'` / `from 'tailwind-merge'`）：
```ts
import { cn } from 'cn'
<div :class="cn('rounded-lg p-4', isActive && 'bg-primary text-primary-foreground')" />
```

### 6. 文件组织
- 全局样式按职责拆分，禁止所有样式堆进一个文件：
    - `src/styles/index.css` —— 层序声明 + 第三方 CSS 导入；
    - `src/styles/theme.css` —— `@theme` Token 定义
    - `src/styles/base.css` —— 全局基础样式（归入 `@layer reset`）
- 组件级样式**优先**用 Tailwind 工具类，`.vue` 的 `<style>` 块仅在确实无法用工具类表达时使用，且必须加 `scoped` 并归入`@layer components`。
- **禁止**在 `.vue` 的 `<style>` 中使用 `@apply` 批量生成组件类（与工具类优先原则冲突）；`@apply` 仅允许出现在 `@layer components` 的全局 CSS 中。

### 7. 工具链保障
- Stylelint 配置**必须**包含：
    - `no-descending-specificity`、`no-important`（针对业务目录）等规则；
- `pnpm lint` 与 `pnpm format:check` 必须覆盖 `src/**/*.{css,vue}`，CI 中不得跳过。

### 8. 新增第三方库的准入流程
引入任何带样式的第三方库前，必须对用户进行提问：
1. 它的 CSS 归入哪个 `@layer`？归位理由？
2. 它与现有 Token 体系的视觉对齐方案是什么？
3. 它是否会挂载样式到 `body`（影响 scoped preflight）？
未回答上述三项不允许安装库。否则视为违规。

### 自查程序：
- [ ] 所有第三方 CSS 是否通过 @import ... layer(...) 导入？
- [ ] 是否出现 !important？（禁止，改层序）
- [ ] 是否出现任意值 [...]？（禁止，用 Token）
- [ ] 是否出现动态拼接类名？（禁止，用 cn()）
- [ ] 覆盖第三方内部类是否写在 @layer components + 容器限定 + :where() 内？
- [ ] shadcn-vue 是否通过重定义 Token 换肤，而非类名覆盖？
- [ ] 新增颜色/圆角/间距是否已在 @theme 中定义 Token？
