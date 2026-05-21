---
title: 协议对比
---

# 协议对比

这一页帮助你在 OmniRouters 上选择更合适的 LLM 文本生成协议。

## 最先给出的建议

如果你现在还不确定该从哪条协议开始，优先用 OpenAI 兼容请求。

原因很简单：在 OmniRouters 上，你账号里启用的所有模型都可以通过 OpenAI 兼容协议调用。

## 协议对比表

| 协议 | 端点 | 最适合场景 | 请求结构 | 官方文档 | OmniRouters 说明 |
| --- | --- | --- | --- | --- | --- |
| OpenAI Chat Completions | `/v1/chat/completions` | 大多数项目的默认起点 | `messages` 数组 | [OpenAI Chat](https://developers.openai.com/api/reference/resources/chat) | 跨模型最稳妥的默认选择 |
| OpenAI Responses | `/v1/responses` | 更现代的结构化工作流 | 当前 OmniRouters 文档仍以 `messages` 为主 | [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) | 字段级行为建议以 Apifox 为准 |
| Claude Messages | `/v1/messages` | Anthropic SDK 迁移 | Claude 风格的 `messages`、`max_tokens`、`system` | [Anthropic Messages](https://platform.claude.com/docs/en/api/messages) | 在 OmniRouters 上使用 bearer auth，并带 `anthropic-version` |
| Gemini Generate Content | `/v1beta/models/{model}:generateContent` | Gemini SDK 迁移 | `contents` 与 `parts` | [Gemini generateContent](https://ai.google.dev/api/generate-content) | 在 OmniRouters 上使用 bearer auth，多模态上传需遵循平台限制 |

## 实际建议

### 新项目怎么选

- 想要最直接、最通用的方案：选 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- 想围绕结构化输出或工具调用来设计：选 [OpenAI Responses](/zh/api/llm/openai-responses)

### 迁移项目怎么选

- 原来已经在用 Anthropic：选 [Claude Messages](/zh/api/llm/claude-messages)
- 原来已经在用 Gemini：选 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)

## 最后的判断原则

如果两条协议都能完成同一件事，优先使用 OpenAI 兼容协议；只有在你明确想保留某家上游的原生请求结构时，再切到 Claude 或 Gemini 风格协议。
