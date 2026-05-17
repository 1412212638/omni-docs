# CC Switch

跨平台的 AI CLI 统一管理工具。

::: info
CC Switch 是一款开源的 AI CLI 管理工具，适合统一管理 Claude Code、Codex、Gemini CLI 等不同命令行助手的 Provider 配置、MCP 服务器和提示词文件。对于同时使用多种 AI CLI 的团队来说，它可以减少手工修改配置文件的成本。
:::

## 官方链接

- GitHub 仓库：[https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)
- Releases 下载页：[https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)

## 核心特性

### Provider 管理

- 可以在 Claude Code、Codex、Gemini CLI 等不同 CLI 工具之间统一管理 Provider 配置
- 支持为同一个 Provider 配置多个端点和 API Key
- 适合在多个模型和多个平台之间快速切换

### MCP 管理

- 支持统一管理 MCP 服务器配置
- 适合在多个 CLI 工具之间复用 MCP 设置
- 常见传输方式包括 `stdio`、`HTTP` 和 `SSE`

### Prompts 管理

- 支持集中管理系统提示词和预设
- 可以对应不同 CLI 工具常见的提示词文件，例如 `CLAUDE.md`、`AGENTS.md`、`GEMINI.md`
- 适合团队维护多套不同工作流提示词

### 多平台支持

- 支持桌面端安装
- 支持命令行模式
- 支持适合远程服务器场景的 Web 版本

## OmniRouters 接入方法

### 配置步骤

1. 打开 [OmniRouters Keys 页面](https://omnirouters.com/keys)，创建 API Key。
2. 在目标 API Key 的操作菜单中选择 `CC 切换`。

   ![在 Keys 页面选择 CC 切换](/images/ai-apps/cc-switch-key-menu.png)

3. 系统会打开一个 `填写 CC Switch` 弹窗，在这里完成目标应用和模型配置。

   ![填写 CC Switch 弹窗](/images/ai-apps/cc-switch-dialog.png)

### 弹窗各字段说明

- 应用：顶部切换应用类型，可在 `Claude`、`Codex`、`Gemini` 之间选择目标应用
- 名称：为当前配置填写一个便于识别的名称，例如 `My Claude`
- 主模型：必填项，填写默认使用的主力模型
- Haiku 模型：轻量快速模型
- Sonnet 模型：均衡模型
- Opus 模型：最强模型
- 所有模型均为下拉选择；如果尚未选择，会显示“请选择模型”

### 完成导入

- 完成配置后，点击 `打开 CC Switch`，即可将配置导入 CC Switch 并开始使用
- 如果暂时不导入，点击 `取消` 即可放弃本次操作

## 安装方式

### macOS

如果你使用 Homebrew，可以优先查看项目是否提供最新 cask 安装方式：

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

### Windows

从 Releases 页面下载 `.msi` 安装包或便携版 `.zip`。

### Linux

从 Releases 页面下载 `.deb` 包或 `.AppImage`。

如果你使用 Arch 系发行版，也可以查看项目是否提供对应社区包。

### Web 版本

如果你希望在无头服务器或 SSH 环境中使用，可以查看项目提供的 Web 版本发布包，并通过浏览器访问运行后的本地端口。

## 使用建议

- 在创建 API Key 后再进入 `CC 切换` 流程，避免切换时没有可用密钥
- 模型名称必须与 OmniRouters 中可调用的名称完全一致
- 首次导入完成后，建议先在目标 CLI 工具中执行一个简单请求测试连通性
- 如果团队会共用配置，建议先定义统一的 Provider 命名规则
- 如果你会同时管理多个 CLI，建议把常用模型拆成主模型、轻量模型和高性能模型三类

## 说明

- 当前这篇文档是基于 CC Switch 的公开项目功能整理的 OmniRouters 接入教程，不代表 OmniRouters 官方维护该项目
- 如果 CC Switch 后续新增 Deep Link、一键导入或新的 Provider 配置方式，接入步骤可能会发生变化

## 相关链接

- [GitHub 仓库](https://github.com/farion1231/cc-switch)
- [Releases 下载页](https://github.com/farion1231/cc-switch/releases)
- [OmniRouters Keys 页面](https://omnirouters.com/keys)
- [OmniRouters API 参考](/zh/api/)
