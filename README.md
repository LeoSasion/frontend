# PixelVault Styles

从 PixelVault 提取的四主题 CSS 样式库。零运行时依赖，无需 React、Vue 或 Tailwind；原生 CSS 可直接使用。仓库与包保持私有，不发布到公共 npm。

| ID | 风格 | 主色 | 材质 |
| --- | --- | --- | --- |
| `light` | 清雅白紫 | `hsl(262 80% 55%)` | 白色面板、柔和紫色阴影 |
| `mint` | 雾光薄荷 | `#116f5c` | 灰蓝底、银白渐变、薄荷边缘 |
| `green` | 暗夜黑绿 | `#75f59b` | 绿光背景、20px 毛玻璃 |
| `orange` | 经典黑橙 | `#ff6a00` | 深色面板、橙色实心按钮 |

## 预览与检查

需要 Node.js 20+，没有需要安装的依赖：

```sh
npm run preview
# 打开 http://127.0.0.1:4178
npm test
npm pack --dry-run
```

预览可切换四种主题，演示按钮、表单、进度、状态以及局部主题并排使用。保存按钮只产生页面反馈，不调用业务接口。

## 直接使用 CSS

复制整个 `styles/` 文件夹到项目，保留三个 CSS 文件的相对位置：

```html
<link rel="stylesheet" href="./styles/index.css">
<body class="pv-scope pv-shell" data-pv-theme="green">
  <section class="pv-card">
    <label class="pv-label" for="title">名称</label>
    <input class="pv-input" id="title" placeholder="输入名称">
    <button class="pv-button" type="button">保存</button>
  </section>
</body>
```

`pv-scope` 设置字体、文本和焦点样式；`pv-shell` 提供主题背景与绿光；组件类只作用于显式使用它们的元素。没有全局 reset。

每个 `[data-pv-theme]` 区域都定义完整变量集，所以嵌套或并排的主题不会继承上一套主题的颜色。主题样式应用于本节点及后代。Portal/弹层请挂载到主题区域内，或给弹层容器设置相同属性。

## 作为私有依赖安装

有仓库权限时通过 Git 安装，或本地打包：

```sh
npm install git+ssh://git@github.com/LeoSasion/pixelvault-styles.git
# 本地：在本库运行 npm pack，然后在消费项目安装生成的 .tgz
```

```js
import '@leosasion/pixelvault-styles/styles.css';
import { setTheme, saveTheme, loadTheme } from '@leosasion/pixelvault-styles';
setTheme(loadTheme());
// 用户切换时：
setTheme('green');
saveTheme('green');
```

JS 只是可选辅助函数，CSS 不依赖它。导入模块不会访问 DOM 或存储，适用于 SSR；在浏览器挂载后调用 `setTheme`。存储受限时 `loadTheme` 返回默认白紫，`saveTheme` 不抛出存储错误。无自动事件监听或系统主题覆盖。

## React / Vue

React：

```tsx
import '@leosasion/pixelvault-styles/styles.css';
import type { ThemeId } from '@leosasion/pixelvault-styles';
export function Panel({ theme = 'green' }: { theme?: ThemeId }) {
  return <section data-pv-theme={theme} className="pv-scope pv-shell">
    <div className="pv-card"><button className="pv-button">保存</button></div>
  </section>;
}
```

Vue：在入口导入 CSS，模板中用 `:data-pv-theme="theme"` 绑定主题，组件使用同名 CSS 类。

## 只用变量 / 接入已有组件

仅导入 `@leosasion/pixelvault-styles/tokens.css`，使用 `var(--pv-primary)` 等完整 CSS 颜色值（无需再包 `hsl()`）。`tokens.json` 提供相同变量供工具读取，值可能含 `var()` / 渐变，不是全部已解析的 RGB 值。

```css
.your-card {
  color: var(--pv-card-foreground);
  background: var(--pv-surface);
  border: 1px solid var(--pv-surface-border);
  box-shadow: var(--pv-surface-shadow);
  backdrop-filter: var(--pv-blur);
}
```

语义变量：`background` / `foreground`、`primary` / `primary-foreground`、`muted` / `muted-foreground`、`border`、`input`、`ring`。材质变量：`surface`、`surface-shadow`、`surface-hover`、`button-fill`、`button-text`、`shell`、`glow`。全部以 `--pv-` 开头。

Tailwind 项目可以把自己的颜色映射到这些变量；本库不绑定 Tailwind 版本。不要直接覆盖全局无前缀变量，建议在应用自己的主题适配层映射。

## 组件约定

| 类名 | 用途 |
| --- | --- |
| `pv-card` / `pv-card--interactive` | 面板 / 可交互面板的悬停材质 |
| `pv-button` / `pv-button--outline` | 主按钮 / 次按钮；禁用使用原生 `disabled` |
| `pv-input` / `pv-label` | input、textarea、select 及关联标签 |
| `pv-badge` / `pv-badge--success` | 标签 / 完成状态 |
| `pv-muted` / `pv-error` / `pv-warning` | 辅助、错误、警告文本 |
| `pv-progress` | 原生 progress |

错误字段设置 `aria-invalid="true"`，并通过 `aria-describedby` 关联错误说明；图标按钮需有可访问名称。CSS 不替代组件的行为和语义。

支持减少动态效果设置；不支持背景模糊时，黑绿卡片退化为不透明深绿底。低对比的原始 success / warning 调色板值为来源兼容而保留；正文状态请用已配对的 `success-text` / `success-surface` 和 `warning-text`。自定义组合需自行检查对比度。

## 范围

这是样式库，不是完整组件框架，不包含登录、API、用户数据、生成任务或弹窗逻辑。原 PixelVault 的部署与源码未被替换。来源及抽取范围见 [SOURCE.md](SOURCE.md)。
