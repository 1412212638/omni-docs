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

### 参数填写

| 参数 | 说明 |
| --- | --- |
| Provider 名称 | 自定义一个便于识别的名称，例如 `OmniRouters Codex` |
| API Key | 在 OmniRouters 获取：[https://omnirouters.com/console/token](https://omnirouters.com/console/token) |
| Base URL | 填写 `https://omnirouters.com/v1` |
| 模型名称 | 与 OmniRouters 中实际可用的模型名称保持一致 |

### 配置步骤

1. 打开 [OmniRouters Token 页面](https://omnirouters.com/console/token)，创建并复制 API Key。
2. 打开 CC Switch，选择需要管理的目标应用，例如 Claude、Codex 或 Gemini。
3. 新建一个 Provider 配置，并填写一个方便识别的名称。
4. 在端点或 API 配置中填入：

   - Base URL：`https://omnirouters.com/v1`
   - API Key：你从 OmniRouters 复制的密钥

5. 根据你的使用习惯填写模型配置。常见做法是：

   - 主模型：填写默认使用的主力模型
   - 轻量模型：填写响应更快、成本更低的模型
   - 高性能模型：填写更强的推理或生成模型
   - 自定义模型：保留给特定工作流使用

6. 保存配置后，切换到对应 CLI 工具中测试连接是否成功。

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

- 建议统一把 OmniRouters 的 Base URL 配置到 `/v1`
- 模型名称必须与 OmniRouters 中可调用的名称完全一致
- 首次配置完成后，先用一个简单请求测试连通性
- 如果团队会共用配置，建议先定义统一的 Provider 命名规则
- 如果你会同时管理多个 CLI，建议把常用模型拆成主模型、轻量模型和高性能模型三类

## 说明

- 当前这篇文档是基于 CC Switch 的公开项目功能整理的 OmniRouters 接入教程，不代表 OmniRouters 官方维护该项目
- 如果 CC Switch 后续新增 Deep Link、一键导入或新的 Provider 配置方式，接入步骤可能会发生变化

## 相关链接

- [GitHub 仓库](https://github.com/farion1231/cc-switch)
- [Releases 下载页](https://github.com/farion1231/cc-switch/releases)
- [OmniRouters API Key 页面](https://omnirouters.com/console/token)
- [OmniRouters API 参考](/zh/api/)
