---
title: DeepSeek Harness 配置教程
---

# DeepSeek Harness 配置教程

本教程介绍如何在 DeepSeek Harness（DSH）中添加 OmniRouters 自定义模型 API，并使用已添加的模型开始对话。请先[下载并安装 DeepSeek Harness](https://www.deepseek.com/harness/)，并准备好 OmniRouters API Key。

## 1. 打开设置

在 DSH 左下角点击“更多”，然后在弹出的菜单中选择“设置”。

![步骤 1：从“更多”菜单打开设置](/images/ai-apps/dsh/step-1-more-menu.png)

## 2. 添加模型提供商

在设置窗口中选择“模型”，然后点击“添加模型提供商”。

![步骤 2：添加模型提供商](/images/ai-apps/dsh/step-2-add-provider.png)

## 3. 填写 OmniRouters API 配置

选择“自定义模型 API”，并按下表填写：

| 字段 | 填写内容 | 说明 |
| --- | --- | --- |
| Provider ID | `omnirouters` | 用于标识提供商的英文 ID。 |
| 显示名称 | `OmniRouters` | 在 DSH 界面中显示的名称，可按需自定义。 |
| API 地址 | `https://omnirouters.com/v1` | 使用 OmniRouters API Base URL。 |
| API 协议 | `OpenAI Chat Completions` | 选择 OpenAI Chat Completions 兼容协议。 |
| API 密钥 | 你的 OmniRouters API Key | 在 OmniRouters 控制台创建或复制。请勿公开或分享此密钥。 |

确认信息无误后，点击窗口底部的创建/保存按钮。

![步骤 3：填写自定义模型 API 配置](/images/ai-apps/dsh/step-3-provider-settings.png)

> 请使用 `https://omnirouters.com/v1`，不要把 API Key 填入 API 地址。API Key 只填写在“API 密钥”栏中。

## 4. 添加可用模型

在模型选择窗口中勾选你准备使用的模型，然后点击“添加所选”。只添加 OmniRouters 账号当前可用且你计划使用的模型即可。

![步骤 4：选择并添加模型](/images/ai-apps/dsh/step-4-select-models.png)

## 5. 开始对话

新建会话，在输入框旁的模型选择器中选择刚添加的模型，然后发送一条测试消息。模型成功返回回复后，即表示配置完成。

![步骤 5：选择模型并开始对话](/images/ai-apps/dsh/step-5-start-chat.png)

## 故障排查

- **认证失败或返回 401**：检查 API Key 是否填写正确，以及该 Key 是否有效。
- **模型不可用或返回模型不存在**：检查模型 ID 是否出现在 DSH 的模型列表中，并确认 OmniRouters 账号已开通该模型。
- **连接失败**：确认 API 地址为 `https://omnirouters.com/v1`，并检查当前网络是否能够访问 OmniRouters。
- **模型列表为空**：重新检查 API 地址、API 协议和 API Key，然后在提供商设置中重新获取或添加模型。

## 相关链接

- [DeepSeek Harness 官方页面](https://www.deepseek.com/harness/)
- [DeepSeek Harness 开发者文档](https://deepseek-harness.github.io/deepseek-harness/guide/quickstart)
- [AI 应用文档](/zh/ai-apps/)
- [OmniRouters API 手册](/zh/api/)
