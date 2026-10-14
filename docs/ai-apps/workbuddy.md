---
title: WorkBuddy 配置教程
---

# WorkBuddy 配置教程

WorkBuddy 是腾讯推出的全场景 AI 办公工作台。本教程介绍如何在 WorkBuddy 中添加 OmniRouters 自定义模型，并使用 OpenAI Chat Completions 兼容接口开始对话。

开始前，请先[下载 WorkBuddy](https://www.workbuddy.cn/)，并准备好 OmniRouters API Key 和要使用的模型 ID。

## 1. 进入模型设置

打开 WorkBuddy 后，点击左下角头像或菜单，在菜单中选择“设置”。

![步骤 1：从菜单打开设置](/images/ai-apps/workbuddy/step-2-open-settings.png)

在设置页面左侧选择“模型”，然后点击“添加模型”。

![步骤 2：进入模型并添加模型](/images/ai-apps/workbuddy/step-1-model-settings.png)

## 2. 填写自定义模型 API

在添加模型页面选择“自定义”供应商，并填写以下内容：

| 字段 | 填写内容 | 说明 |
| --- | --- | --- |
| 供应商 | `自定义` | WorkBuddy 此处使用 OpenAI 兼容协议 API。 |
| 接口地址 | `https://omnirouters.com/v1/chat/completions` | WorkBuddy 要求填写完整的 Chat Completions 接口地址。 |
| API Key | 你的 OmniRouters API Key | 从 OmniRouters 控制台获取，请勿公开或分享。 |
| 模型名称 | 你的 OmniRouters 模型 ID | 例如 `gpt-5.5`、`claude-sonnet-4-6` 或账号中已启用的其他模型。 |

填写完成后，点击“测试连接”。出现“连接成功”后，点击“保存”。

![步骤 3：填写接口地址、API Key 和模型名称](/images/ai-apps/workbuddy/step-3-api-form.png)

> WorkBuddy 这里使用完整接口地址 `https://omnirouters.com/v1/chat/completions`。如果你使用的是账号专属网关地址，请以实际可用地址为准。

## 3. 选择已添加的模型

返回 WorkBuddy 主界面，点击底部的模型选择器。在“自定义模型”区域选择刚刚保存的模型。

![步骤 4：选择自定义模型](/images/ai-apps/workbuddy/step-4-select-model.png)

## 4. 发送测试消息

在输入框中发送一条简单消息，例如“你好”，等待模型返回结果。能够正常收到回复，即表示 WorkBuddy 已经成功接入 OmniRouters。

![步骤 5：发送测试消息](/images/ai-apps/workbuddy/step-5-test-chat.png)

## 故障排查

- **测试连接失败或返回 401**：检查 API Key 是否正确、是否已失效，并确认填写到了 API Key 字段。
- **模型不存在**：检查模型 ID 的大小写、连字符和版本号，并确认模型已在 OmniRouters 账号中启用。
- **接口地址错误**：确认 WorkBuddy 填写的是完整地址 `https://omnirouters.com/v1/chat/completions`，不要重复添加路径。
- **模型可以选择但无法回复**：重新测试连接，检查网络，并确认所选模型支持 Chat Completions 协议。

## 相关链接

- [WorkBuddy 官方网站](https://www.workbuddy.cn/)
- [WorkBuddy 产品介绍](https://www.workbuddy.cn/docs/workbuddy/)
- [WorkBuddy 常见问题](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/FAQ)
- [AI 应用文档](/zh/ai-apps/)
- [模型 API 手册](/zh/api/)
