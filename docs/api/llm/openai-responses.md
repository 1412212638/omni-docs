---
title: OpenAI Responses
---

# OpenAI Responses

`/v1/responses` 是 OmniRouters 上偏现代化的 OpenAI 风格协议入口，适合结构化输出、工具调用和推理型工作流。

如果你想在 OmniRouters 的模型目录内继续使用 OpenAI 风格的接入思路，这条路由会很有价值。

## 官方文档

- OmniRouters 路由：`POST https://omnirouters.com/v1/responses`
- OpenAI 官方文档：[Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create)

## OmniRouters 说明

- 你在 OmniRouters 账号中启用的所有模型，都可以通过 OpenAI 兼容协议调用。
- 在 OmniRouters 上，这条路由用于承载 Responses 风格工作流。
- 但当前 OmniRouters 的 OpenAPI 文档中，这个端点仍然以 `messages` 为主请求结构进行说明，因此字段级行为应以 OmniRouters 的 Apifox/OpenAPI 为准。

这点很重要：上游 OpenAI 官方文档可以帮助你理解 Responses 思路，但实际接 OmniRouters 时，还是要优先按照你们平台当前的 schema 来写请求。

## 最小示例

```bash
curl https://omnirouters.com/v1/responses \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "messages": [
      {
        "role": "system",
        "content": "You are a concise technical writer."
      },
      {
        "role": "user",
        "content": "请返回三条 API 简介。"
      }
    ],
    "response_format": {
      "type": "json_object"
    },
    "stream": false
  }'
```

## 常用字段

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `model` | 是 | 你要调用的 OmniRouters 模型名 |
| `messages` | 是 | 当前 OmniRouters 文档中使用的请求内容结构 |
| `response_format` | 否 | 控制输出为普通文本或 JSON 风格 |
| `tools` | 否 | 工具定义 |
| `stream` | 否 | 是否启用流式输出 |
| `max_tokens` | 否 | 限制输出长度 |

## 什么时候优先用它

适合这些场景：

- 你更偏向新式的 OpenAI 工作流
- 你希望更明确地控制结构化输出
- 你打算围绕工具调用或推理工作流设计接入方式
- 你愿意以 OmniRouters 当前 schema 为准做适配

## 什么时候别的协议更合适

- 如果你只想找一条最直接、最稳妥的通用协议，优先看 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- 如果你已经有 Anthropic 风格请求体，优先看 [Claude Messages](/zh/api/llm/claude-messages)
- 如果你已经有 Gemini 风格请求体，优先看 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)

## 参考入口

- [LLM 文本生成总览](/zh/api/llm/)
- [协议对比](/zh/api/llm/protocol-comparison)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
