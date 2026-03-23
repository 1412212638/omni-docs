# 快速开始

这个站点已经帮你准备好了基础配置，你可以直接从这里往下写。

## 常用命令

```bash
npm.cmd install
npm.cmd run docs:dev
npm.cmd run docs:build
```

## 目录说明

```text
docs/
  .vitepress/
    config.mts
    theme/
      index.ts
      custom.css
  index.md
  guide/
    getting-started.md
    structure.md
```

## 你的下一步

1. 把现有文档整理成 Markdown 放进 `docs/`
2. 在 `docs/.vitepress/config.mts` 里补充导航和侧边栏
3. 运行开发服务，边写边看效果
