---
title: LLM 文本生成
---

# LLM 文本生成

这一组页面用于说明 OmniRouters 的聊天、文本生成、推理与协议迁移接入方式。

OmniRouters 针对 LLM 文本生成支持多种请求协议，但有一条最重要的规则：

> 你在 OmniRouters 账号中启用的所有模型，都可以通过 OpenAI 兼容协议进行调用。

这意味着如果你想用一套请求方式覆盖多家模型，`/v1/chat/completions` 和 `/v1/responses` 会是最稳妥的默认选择。

## 推荐默认方案

对大多数新接入项目，建议优先从以下两条 OpenAI 兼容路由开始：

- [`/v1/chat/completions`](/zh/api/llm/openai-chat)：适合最广泛的 SDK 兼容和常规聊天工作流
- [`/v1/responses`](/zh/api/llm/openai-responses)：适合更偏结构化输出、工具调用和推理型流程

如果你已经有现成的 Claude 或 Gemini 客户端代码，再根据需要切换到对应的原生协议页面，这样改动会更小。

## 可用协议

| 协议 | OmniRouters 端点 | 适合场景 | 官方文档 |
| --- | --- | --- | --- |
| OpenAI Chat Completions | `POST /v1/chat/completions` | 通用兼容、简单聊天、现有 OpenAI chat 客户端迁移 | [OpenAI Chat API 文档](https://developers.openai.com/api/reference/resources/chat) |
| OpenAI Responses | `POST /v1/responses` | 更现代的结构化工作流、工具调用、推理型接入 | [OpenAI Responses API 文档](https://developers.openai.com/api/reference/resources/responses/methods/create) |
| Claude Messages | `POST /v1/messages` | Anthropic / Claude SDK 迁移，尽量保留 Claude 风格请求体 | [Anthropic Messages API 文档](https://platform.claude.com/docs/en/api/messages) |
| Gemini Generate Content | `POST /v1beta/models/{model}:generateContent` | Google Gemini SDK 迁移，保留 `contents` / `parts` 结构 | [Google Gemini generateContent 文档](https://ai.google.dev/api/generate-content) |

## OmniRouters 平台约定

在选择协议前，先记住这几个 OmniRouters 平台侧规则：

- Base URL：`https://omnirouters.com`
- OpenAI 兼容路由通常位于 `https://omnirouters.com/v1`
- Gemini 风格路由位于 `https://omnirouters.com/v1beta/...`
- 在 OmniRouters 上统一使用 `Authorization: Bearer <your-api-key>` 认证，即使上游官方协议使用的是别的认证头
- 模型名必须与当前账号中实际启用的模型名称一致
- 你可以通过 [https://omnirouters.com/keys](https://omnirouters.com/keys) 创建和管理 API Key

## 该怎么选

### 如果你在新做一个应用

优先使用 OpenAI 兼容协议。

- 想要最常见的请求格式，就看 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- 想要更结构化的输出与工作流，就看 [OpenAI Responses](/zh/api/llm/openai-responses)

### 如果你已经在用 Claude

优先看 [Claude Messages](/zh/api/llm/claude-messages)，这样请求体改动最小。

### 如果你已经在用 Gemini

优先看 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)，这样 `contents` / `parts` 结构可以保留。

### 如果你只想找一条最稳妥的通用接法

优先从 [OpenAI Chat Completions](/zh/api/llm/openai-chat) 开始。在 OmniRouters 上，这是跨模型调用时最清晰的默认协议。

## 继续阅读

1. 阅读 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
2. 查看 [协议对比](/zh/api/llm/protocol-comparison)
3. 打开完整的 [Apifox API 参考](https://omnirouters.apifox.cn/)
