---
title: Protocol Comparison
---

# Protocol Comparison

This page helps you choose between the main LLM text-generation protocols available on OmniRouters.

## First Recommendation

If you are unsure where to start, use an OpenAI-compatible request.

That is the most stable default on OmniRouters because all enabled models can be called through the OpenAI-compatible protocol.

## Comparison Table

| Protocol | Endpoint | Best for | Request shape | Official docs | OmniRouters note |
| --- | --- | --- | --- | --- | --- |
| OpenAI Chat Completions | `/v1/chat/completions` | Best default for most projects | `messages` array | [OpenAI Chat](https://developers.openai.com/api/reference/resources/chat) | Safest universal option across model families |
| OpenAI Responses | `/v1/responses` | Newer structured workflows | OmniRouters currently documents a `messages`-based schema | [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) | Check Apifox for exact field behavior |
| Claude Messages | `/v1/messages` | Anthropic SDK migration | Claude-style `messages`, `max_tokens`, `system` | [Anthropic Messages](https://platform.claude.com/docs/en/api/messages) | Uses bearer auth on OmniRouters, plus `anthropic-version` |
| Gemini Generate Content | `/v1beta/models/{model}:generateContent` | Gemini SDK migration | `contents` and `parts` | [Gemini generateContent](https://ai.google.dev/api/generate-content) | Uses bearer auth on OmniRouters; multimodal uploads should follow OmniRouters constraints |

## Practical Guidance

### Start here for new builds

- Choose [OpenAI Chat Completions](/api/llm/openai-chat) if you want the cleanest default
- Choose [OpenAI Responses](/api/llm/openai-responses) if you are designing around structured outputs or tool workflows

### Start here for migration projects

- Choose [Claude Messages](/api/llm/claude-messages) if you already ship Anthropic payloads
- Choose [Gemini Generate Content](/api/llm/gemini-generate-content) if you already ship Gemini payloads

## Final Rule of Thumb

If two routes can solve the same task, prefer the OpenAI-compatible protocol unless you have a strong migration reason to keep a provider-native request shape.
