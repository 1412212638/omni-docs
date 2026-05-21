---
title: LLM Text Generation
---

# LLM Text Generation

Use this section when you want to integrate OmniRouters for chat, text generation, reasoning, or protocol migration.

OmniRouters supports multiple request protocols for LLM text generation. The most important rule is simple:

> All models enabled in your OmniRouters account can be called through the OpenAI-compatible protocol.

That means `/v1/chat/completions` and `/v1/responses` are the safest default choices when you want one request style that works across providers and model families.

## Recommended Default

For most new integrations, start with one of these two OpenAI-compatible routes:

- [`/v1/chat/completions`](/api/llm/openai-chat) for broad SDK compatibility and simple chat workflows
- [`/v1/responses`](/api/llm/openai-responses) for newer structured workflows, tool use, and response formatting

Use the Claude or Gemini protocol pages when you are migrating an existing client, SDK, or payload format and want to minimize request-shape changes.

## Available Protocols

| Protocol | OmniRouters endpoint | Best for | Official docs |
| --- | --- | --- | --- |
| OpenAI Chat Completions | `POST /v1/chat/completions` | Broad compatibility, simple chat, fastest migration from existing OpenAI chat clients | [OpenAI Chat API reference](https://developers.openai.com/api/reference/resources/chat) |
| OpenAI Responses | `POST /v1/responses` | Newer structured workflows, tool calling, reasoning-oriented integrations | [OpenAI Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create) |
| Claude Messages | `POST /v1/messages` | Anthropic / Claude SDK migration with a Claude-style payload | [Anthropic Messages API reference](https://platform.claude.com/docs/en/api/messages) |
| Gemini Generate Content | `POST /v1beta/models/{model}:generateContent` | Google Gemini SDK migration with `contents` / `parts` request format | [Google Gemini generateContent reference](https://ai.google.dev/api/generate-content) |

## OmniRouters Conventions

Before you choose a protocol, keep these OmniRouters-specific rules in mind:

- Base URL: `https://omnirouters.com`
- OpenAI-compatible routes usually live under `https://omnirouters.com/v1`
- Gemini-style routes use `https://omnirouters.com/v1beta/...`
- Authentication uses `Authorization: Bearer <your-api-key>` on OmniRouters, even when the upstream provider uses another auth header
- Model names must match the models enabled in your OmniRouters account
- Use [https://omnirouters.com/keys](https://omnirouters.com/keys) to create and manage API keys

## Which Protocol Should You Pick?

### If you are building a new app

Start with the OpenAI-compatible protocol.

- Choose [OpenAI Chat Completions](/api/llm/openai-chat) if you want the most common request shape
- Choose [OpenAI Responses](/api/llm/openai-responses) if your app needs structured outputs or tool workflows

### If you already use Claude

Use the [Claude Messages](/api/llm/claude-messages) page first. It keeps the request body closer to Anthropic's native format.

### If you already use Gemini

Use the [Gemini Generate Content](/api/llm/gemini-generate-content) page first. It keeps the `contents` / `parts` structure familiar.

### If you want the shortest path with the widest compatibility

Start with [OpenAI Chat Completions](/api/llm/openai-chat). On OmniRouters, this is the cleanest default for cross-provider model access.

## Continue Reading

1. Read [OpenAI Chat Completions](/api/llm/openai-chat)
2. Review [Protocol Comparison](/api/llm/protocol-comparison)
3. Open the full [Apifox API Reference](https://omnirouters.apifox.cn/)
