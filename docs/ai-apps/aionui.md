# AionUi

免费开源的桌面办公 Agent。

::: info
AionUi 是一款免费、本地、开源的 Cowork 工具，支持 Gemini CLI、Claude Code、Codex、OpenCode、Qwen Code、Goose CLI、Auggie 等多种 AI 代理。它提供完整的 GUI 界面和 WebUI 远程访问能力，可以作为 Cowork 的开源替代方案。
:::

## 官方链接

- 官网：[https://www.aionui.com](https://www.aionui.com)
- GitHub 仓库：[https://github.com/iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi)
- 下载地址：[https://github.com/iOfficeAI/AionUi/releases](https://github.com/iOfficeAI/AionUi/releases)

## 核心特性

### 多会话聊天

- 支持多会话与独立上下文，每个会话都有单独的上下文记忆
- 对话数据保存在本地 SQLite 数据库中，便于长期保留

### 多模型支持

- 支持 Gemini、OpenAI、Claude、Qwen 等主流模型
- 支持 Ollama、LM Studio 等本地模型部署方案

### 多代理模式

- 可同时运行多个 AI 代理，如 Gemini CLI、Claude Code、Codex、OpenCode、Qwen Code、Goose CLI、Auggie 等
- 支持通过 MCP 统一管理和配置代理
- 支持为不同代理配置专属 Skills
- 支持自定义助手配置，便于构建个性化工作流
- 每个代理都可以独立配置、独立使用

### 文件管理

- 支持文件树浏览和拖拽上传
- 支持让 AI 协助整理文件夹和自动分类

### 预览面板

- 支持 PDF、Word、Excel、PPT、代码、Markdown、图片等多种格式预览
- 支持实时跟踪文件变化，并可直接编辑 Markdown、代码和 HTML

### 图像生成与编辑

- 支持 Gemini 2.5 Flash Image Preview、Nano、Banana 等图像生成模型
- 支持 AI 驱动的图像识别与编辑

### 多渠道访问

- 支持 WebUI 远程访问，可在浏览器中从不同设备访问
- 支持 Telegram 集成
- 支持飞书集成
- 所有数据默认保存在本地 SQLite 数据库中，适合本地或服务器部署

## NewAPI 接入方法

### 参数填写

| 参数 | 说明 |
| --- | --- |
| 提供商类型 | 选择 NewAPI 支持的类型 |
| API 密钥 | 在 NewAPI 中获取 |
| API 地址 | 填写 NewAPI 站点地址，例如 `https://<your-newapi-domain>/v1` |

### 配置步骤

1. 在 NewAPI 中复制 API Key。
2. 打开 AionUi 设置页面，进入模型配置页签。
3. 点击“添加模型”，并选择 NewAPI 作为提供商。
4. 填写 API 地址和 API 密钥。
5. 在模型列表中选择需要添加的模型，并确保模型名称与 NewAPI 中的配置一致。
6. 选择合适的请求协议后保存配置。
7. 返回聊天页面，选择已配置的 NewAPI 模型开始使用。

## 使用建议

- 建议先确认 NewAPI 站点地址填写到了 `/v1`
- 模型名称应与服务端配置保持一致
- 首次配置完成后，可先用一个简单对话测试连通性

## 相关链接

- [GitHub 仓库](https://github.com/iOfficeAI/AionUi)
- [完整使用指南](https://github.com/iOfficeAI/AionUi#-detailed-usage-guide)
- [FAQ 常见问题](https://github.com/iOfficeAI/AionUi#-support--help)
