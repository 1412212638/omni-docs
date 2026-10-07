---
title: 原生大语言模型协议扩展操作
---

# 原生大语言模型协议扩展操作

本页汇总模型 API 手册中提供的原生协议扩展操作。

## Anthropic Messages Token 统计

`POST /v1/messages/count_tokens`

```bash
curl https://omnirouters.com/v1/messages/count_tokens \
  -H "x-api-key: $OMNIROUTERS_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-claude-model",
    "messages": [
      { "role": "user", "content": "Count these input tokens." }
    ]
  }'
```

响应中会返回输入 Token 数量。标准 Messages 请求请参阅 [Claude Messages](/zh/api/llm/claude-messages)。

## Gemini 内容生成

如果你的应用已经使用 `contents` 和 `generationConfig` 请求体，可以使用 Gemini 兼容路由：

- `POST /v1beta/models/{model}:generateContent`
- `POST /v1beta/models/{model}:streamGenerateContent`

```bash
curl "https://omnirouters.com/v1beta/models/your-enabled-gemini-model:generateContent" \
  -H "x-goog-api-key: $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      { "role": "user", "parts": [{ "text": "Hello" }] }
    ]
  }'
```

请求体和响应对象结构请参阅 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)。

## Gemini 媒体分析

- `POST /v1beta/models/{model}:generateContent` can carry supported media parts for analysis.

具体 `Part` 结构和媒体限制以所选 Gemini 模型为准。如果需要跨模型进行文本生成，建议使用 [OpenAI Chat Completions](/zh/api/llm/openai-chat)。
