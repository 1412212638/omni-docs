# 项目结构

VitePress 的核心思路很简单：`docs/` 目录里的 Markdown 页面会被编译成静态站点。

## 推荐组织方式

```text
docs/
  index.md
  guide/
  api/
  tutorial/
```

## 配置入口

站点配置文件在 `docs/.vitepress/config.mts`。

你通常会在这里维护：

- 站点标题和描述
- 顶部导航
- 侧边栏
- 社交链接
- 页脚

## 主题定制

如果你想改颜色、字体或局部组件，优先从 `docs/.vitepress/theme/custom.css` 开始。
