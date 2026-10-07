---
title: Native LLM Protocol Operations
---

# Native LLM Protocol Operations

This page collects the additional native-protocol operations available in the Model API Manual.

## Anthropic Messages token counting

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

The response contains the input token count. The standard Messages request is documented in [Claude Messages](/api/llm/claude-messages).

## Gemini content generation

Use the Gemini-compatible routes when an application already sends `contents` and `generationConfig`:

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

See [Gemini Generate Content](/api/llm/gemini-generate-content) for the request and response object structure.

## Gemini media analysis

- `POST /v1beta/models/{model}:generateContent` can carry supported media parts for analysis.

The exact `Part` shape and media restrictions follow the selected Gemini model. For cross-model text generation, use [OpenAI Chat Completions](/api/llm/openai-chat).
