# 来源

提取自 LeoSasion/PixelVault 的 client/src/tailwind-theme.css、themes.css 和 index.css（2026-09-30）。
保留四套语义颜色及主要卡片、按钮、背景材质。组件以 pv- 命名，不复制业务逻辑、用户数据或 API 配置。
原项目不自动改用本库；后续接入时可按 README 渐进替换。

## DLSS Studio（DLSS5）

2026-09-30 读取本机 DLSS5 项目的 `app/web/index.html`，按其样式加载顺序核对 `studio.css`、`dark-polish.css`、`glass-mode.css`、`workbench.css` 等覆盖。深色使用最终 `#010203` 背景、`#77fbd1` 薄荷色、青紫光谱边缘；浅色使用最终 `#e9ebee` 背景、银白渐变和 `#526176` 辅助文字。

仅抽取通用颜色、填充、阴影、边缘反光及面板透明配方；未复制图标、示例影像、业务脚本、模型或打包运行时。原生桌面窗口透明行为不属于此 CSS 库。
