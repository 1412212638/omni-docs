---
title: Model API Manual
---

# Model API Manual

Use this page as the entry point for the OmniRouters Model API Manual. APIs are organized into Large Language Models, Image Generation, Video Generation, Audio Generation, and Structured Decisions.

The complete endpoint catalogue is maintained in Apifox. This site provides the onboarding path, integration notes, and links to the full reference.

## Large Language Models

If you are integrating chat, text generation, or reasoning workflows, start with the dedicated LLM protocol pages:

- [LLM Text Generation overview](/api/llm/)
- [OpenAI Chat Completions](/api/llm/openai-chat)
- [OpenAI Responses](/api/llm/openai-responses)
- [OpenAI Responses Operations](/api/llm/openai-operations)
- [Claude Messages](/api/llm/claude-messages)
- [Gemini Generate Content](/api/llm/gemini-generate-content)
- [Native Protocol Operations](/api/llm/native-protocol-operations)
- [Protocol Comparison](/api/llm/protocol-comparison)

OmniRouters supports OpenAI-compatible requests across all enabled models. If you are unsure which protocol to use, start with OpenAI-compatible routes first.

## Image Generation

- [Omni-Image API](/api/omni-image)

## Video Generation

If you are integrating text-to-video, image-to-video, image generation, or reference-image workflows, start with these pages:

- [Omni-Video API](/api/omni-video): compatible video creation routes, minimal text-to-video/image-to-video examples, and top-level request fields.
- [Omni-Image API](/api/omni-image): standard image generation, minimal reference-to-image examples, and top-level request fields.

## Audio Generation

Audio generation documentation is being organized. For complete fields and endpoints, see the [Apifox API Reference](https://omnirouters.apifox.cn/) for now.

## Structured Decisions

- [SystemOne](/api/llm/systemone): structured decisions driven by question definitions and evaluation criteria.

## Full Endpoint Reference

Open the full API reference when you need endpoint parameters, request examples, response schemas, or capability-specific details:

[Open Apifox API Reference](https://omnirouters.apifox.cn/)

## Before You Call the API

| Item | Value |
| --- | --- |
| API key console | [https://omnirouters.com/keys](https://omnirouters.com/keys) |
| Base URL | `https://omnirouters.com/v1` |
| Authentication | `Authorization: Bearer <your-api-key>` |
| Request format | Usually `Content-Type: application/json` |

## Recommended Path

1. Read the [Platform Overview](/guide/overview) page.
2. Complete your first request with [Quick Start](/guide/quick-start).
3. Review the [Usage Guide](/guide/usage).
4. Read the [LLM Text Generation](/api/llm/) section if your use case is chat or text generation.
5. Read [Omni-Video API](/api/omni-video) or [Omni-Image API](/api/omni-image) if your use case is video or image generation.
6. Open the [Apifox API Reference](https://omnirouters.apifox.cn/) for endpoint-level details.

## Common Capability Areas

| Capability | What to Look For |
| --- | --- |
| Chat | Conversation and text generation endpoints |
| Image | Text-to-image and image editing endpoints |
| Video | Text-to-video, image-to-video, and asset video endpoints |
| Speech | Text-to-speech and voice generation endpoints |
| Music | Suno and music generation workflows |
| Embeddings | Vector generation endpoints |
| Rerank | Candidate reranking endpoints |

If you are unsure which endpoint to use, send the use case and model name to [Support](/guide/getting-started).
