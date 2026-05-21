---
title: Gemini Generate Content
---

# Gemini Generate Content

`/v1beta/models/{model}:generateContent` is the Gemini-style protocol route on OmniRouters.

Use it when you already work with Gemini request bodies and want to preserve the `contents` / `parts` payload structure.

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1beta/models/{model}:generateContent`
- Google official docs: [Gemini generateContent reference](https://ai.google.dev/api/generate-content)

## OmniRouters Notes

There are a few important OmniRouters-specific differences:

1. Authentication uses OmniRouters bearer auth, not `x-goog-api-key`
2. The OmniRouters route lives under `https://omnirouters.com/v1beta/...`
3. The current OmniRouters OpenAPI description notes that media uploads should use `inlineData` base64 content rather than `fileData.fileUri`

```text
Authorization: Bearer <your-api-key>
```

All models can still be called through the OpenAI-compatible protocol. Choose Gemini Generate Content when preserving Gemini request structure is more important than using one universal request style.

## Minimal Example

```bash
curl https://omnirouters.com/v1beta/models/gemini-2.5-flash:generateContent \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-2.5-flash",
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Summarize OmniRouters in three concise bullets."
          }
        ]
      }
    ]
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | Gemini-compatible model name enabled in your OmniRouters account |
| `contents` | Yes | The Gemini-style content array |
| `parts` | Yes | Message parts such as `text` or `inlineData` |
| `generationConfig` | No | Sampling, max tokens, and output formatting |
| `systemInstruction` | No | Model behavior guidance |
| `safetySettings` | No | Safety filter configuration |

## When to Use This Route

Use this route if:

- you are migrating an existing Gemini integration
- your application already uses `contents` / `parts`
- you want Gemini-style multimodal payloads

## When Another Route May Be Better

- Use [OpenAI Chat Completions](/api/llm/openai-chat) if you want the simplest universal protocol across all models
- Use [OpenAI Responses](/api/llm/openai-responses) if you want a newer OpenAI-style workflow

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
