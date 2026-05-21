---
title: OpenAI Responses
---

# OpenAI Responses

`/v1/responses` is the newer OpenAI-style route for structured response workflows, tool invocation, and reasoning-oriented integrations.

On OmniRouters, it is best used when you want a modern OpenAI-compatible entry point but still want to stay inside the OmniRouters model catalogue.

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1/responses`
- OpenAI official docs: [Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create)

## OmniRouters Notes

- All models enabled in your OmniRouters account can be called through the OpenAI-compatible protocol.
- On OmniRouters, this route is intended for Responses-style integrations.
- The current OmniRouters OpenAPI schema documents this endpoint with a `messages`-based body. For field-level behavior, treat the OmniRouters schema in Apifox as the source of truth.

That last point matters: upstream OpenAI examples may use request fields that differ from the current OmniRouters schema. Use the official docs for conceptual guidance, and use OmniRouters Apifox for exact request validation.

## Minimal Example

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
        "content": "Return a three-bullet API summary."
      }
    ],
    "response_format": {
      "type": "json_object"
    },
    "stream": false
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | The OmniRouters model name you want to call |
| `messages` | Yes | Request content in the OmniRouters-documented schema |
| `response_format` | No | Ask for plain text or JSON-style output |
| `tools` | No | Tool definitions for structured tool use |
| `stream` | No | Return partial output chunks when enabled |
| `max_tokens` | No | Limit generated output length |

## When to Use This Route

Use this route if:

- you prefer newer OpenAI-style workflows
- you want to structure outputs more explicitly
- you want to prepare for tool-oriented integrations
- you are comfortable following the OmniRouters-specific schema in Apifox

## When Another Route May Be Better

- Use [OpenAI Chat Completions](/api/llm/openai-chat) if you want the most straightforward and broadly familiar request shape
- Use [Claude Messages](/api/llm/claude-messages) for Anthropic-native payloads
- Use [Gemini Generate Content](/api/llm/gemini-generate-content) for Gemini-native payloads

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
