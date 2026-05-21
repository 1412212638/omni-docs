---
title: Claude Messages
---

# Claude Messages

`/v1/messages` is the Claude-style protocol route on OmniRouters.

Use it when you already have Anthropic-style request bodies and want a migration path with less payload reshaping.

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1/messages`
- Anthropic official docs: [Messages API reference](https://platform.claude.com/docs/en/api/messages)

## OmniRouters Notes

There are two OmniRouters-specific differences to remember:

1. Authentication uses OmniRouters bearer auth, not Anthropic's `x-api-key`
2. The request header should include `anthropic-version`

```text
Authorization: Bearer <your-api-key>
anthropic-version: 2023-06-01
```

Also remember that all models can still be called through the OpenAI-compatible protocol. Choose Claude Messages only when the Claude-style request format is the better fit for your integration.

## Minimal Example

```bash
curl https://omnirouters.com/v1/messages \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20240620",
    "max_tokens": 512,
    "messages": [
      {
        "role": "user",
        "content": "Write a short release note for a new API version."
      }
    ]
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | Claude-compatible model name enabled in your OmniRouters account |
| `messages` | Yes | Conversation messages with `user` and `assistant` roles |
| `max_tokens` | Recommended | Output length limit |
| `system` | No | System prompt or role guidance |
| `stream` | No | Enable streaming output |
| `tools` | No | Tool definitions when supported in your workflow |

## When to Use This Route

Use this route if:

- you are migrating existing Anthropic SDK code
- your app already works with Claude-style payloads
- you want to preserve Claude message conventions

## When Another Route May Be Better

- Use [OpenAI Chat Completions](/api/llm/openai-chat) if you want the cleanest cross-provider default
- Use [OpenAI Responses](/api/llm/openai-responses) for newer OpenAI-style structured workflows

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
