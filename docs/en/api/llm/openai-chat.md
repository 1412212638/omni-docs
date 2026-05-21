---
title: OpenAI Chat Completions
---

# OpenAI Chat Completions

`/v1/chat/completions` is the simplest and broadest LLM text-generation protocol on OmniRouters.

It is the best default when you want:

- a familiar OpenAI-style `messages` payload
- broad SDK compatibility
- one request format that can be reused across different model families

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1/chat/completions`
- OpenAI official docs: [Chat API reference](https://developers.openai.com/api/reference/resources/chat)

## OmniRouters Notes

- All models enabled in your OmniRouters account can be called through the OpenAI-compatible protocol.
- That includes Claude-style and Gemini-style models, as long as the model name is available in your account.
- Authentication stays the same as other OmniRouters APIs:

```text
Authorization: Bearer <your-api-key>
```

## Minimal Example

```bash
curl https://omnirouters.com/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Write a short product introduction for OmniRouters."
      }
    ],
    "stream": false
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | The OmniRouters model name you want to call |
| `messages` | Yes | Conversation history, usually `system`, `user`, and `assistant` roles |
| `stream` | No | Return streaming chunks when set to `true` |
| `temperature` | No | Control randomness when supported by the model |
| `top_p` | No | Alternative sampling control |
| `extra_body` | No | Provider-specific extension object when required by a capability |

## When to Use This Route

Use this route if:

- you want the safest cross-model default
- you already have OpenAI chat client code
- you want a clean `messages`-based request shape
- you do not need provider-native payload formats

## When Another Route May Be Better

- Use [OpenAI Responses](/api/llm/openai-responses) if you want a newer, more structured OpenAI-style workflow
- Use [Claude Messages](/api/llm/claude-messages) if you want Anthropic-style request bodies
- Use [Gemini Generate Content](/api/llm/gemini-generate-content) if you want Gemini-style `contents` / `parts` payloads

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
