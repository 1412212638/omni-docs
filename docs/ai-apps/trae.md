---
title: TRAE 配置教程
---

# TRAE 配置教程

本教程介绍如何在 TRAE 中添加 OmniRouters 自定义模型。TRAE 是面向开发者的 AI 编程工具，提供国际站和中国站版本；本文以桌面客户端的模型设置界面为准。

开始前，请先[下载 TRAE 国际版](https://www.trae.ai/)或[下载 TRAE 中国版](https://www.trae.cn/)，并准备好 OmniRouters API Key 和要使用的模型 ID。

## 1. 打开模型设置

点击 TRAE 右上角的设置图标，在设置页面左侧选择“模型”，然后点击“添加模型”。

![步骤 1：进入模型设置并添加模型](/images/ai-apps/trae/step-1-settings-models.png)

## 2. 选择自定义模型

在“添加模型”窗口中选择“自定义模型”。

![步骤 2：选择自定义模型](/images/ai-apps/trae/step-2-custom-model.png)

## 3. 填写 API 配置

在自定义模型页面填写以下内容：

| 字段 | 填写内容 | 说明 |
| --- | --- | --- |
| API 格式 | `OpenAI Chat Completions 格式` | OmniRouters 提供 OpenAI Chat Completions 兼容接口。 |
| 自定义请求地址 | `https://omnirouters.com/v1` | 填写 OmniRouters API Base URL，并关闭“完整 URL”。 |
| 模型 ID | 你的 OmniRouters 模型 ID | 例如 `gpt-5.5`、`claude-sonnet-4-6` 或账号中已启用的其他模型。 |
| 模型展示名称 | 自定义名称 | 可选；不填写时通常显示模型 ID。 |
| API 密钥 | 你的 OmniRouters API Key | 从 OmniRouters 控制台获取，请勿公开或分享。 |

完成后点击右下角“添加模型”。

![步骤 3：填写自定义模型 API 配置](/images/ai-apps/trae/step-3-api-settings.png)

> 请使用 `https://omnirouters.com/v1` 作为自定义请求地址。不要把 API Key 写入 URL，也不要把 `/chat/completions` 重复拼接到地址中。

## 4. 使用模型

返回 TRAE 工作区后，在模型选择器中选择刚添加的模型，即可在 Agent 或对话中使用 OmniRouters。

## 故障排查

- **返回 401 或认证失败**：检查 API Key 是否正确、是否已失效，并确认填写到了“API 密钥”字段。
- **返回模型不存在**：检查模型 ID 的大小写和连字符，并确认模型已在 OmniRouters 账号中启用。
- **请求地址错误**：确认使用 `https://omnirouters.com/v1`，且“完整 URL”开关处于关闭状态。
- **协议不兼容**：确认 API 格式选择的是“OpenAI Chat Completions 格式”。

## 相关链接

- [TRAE 国际站](https://www.trae.ai/)
- [TRAE 中国站](https://www.trae.cn/)
- [TRAE 中国站文档](https://docs.trae.cn/)
- [AI 应用文档](/zh/ai-apps/)
- [模型 API 手册](/zh/api/)
