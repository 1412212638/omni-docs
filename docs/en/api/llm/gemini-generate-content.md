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

## Request Body Parameters

In Gemini-native protocol, the OpenAI/Claude idea of `messages` maps to `contents`. Each `contents[]` object represents one message turn, and every message is composed of one or more `parts[]`. The current OmniRouters OpenAPI schema allows the model name in both the path and request body; keep them consistent.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Gemini model name. It also appears in the path, for example `/v1beta/models/gemini-2.5-flash:generateContent`. Keep the body value aligned with the path. |
| `contents` | array | Yes | Gemini-style message array. Single-turn requests usually have one `user` content; multi-turn conversations include prior `user` and `model` contents. |
| `generationConfig` | object | No | Generation configuration, including sampling, max output tokens, response MIME type, and JSON Schema. See ExtraContent below. |
| `systemInstruction` | object | No | System instruction. The current OpenAPI schema declares `{ "parts": [{ "text": "..." }] }`. |
| `safetySettings` | array | No | Safety filtering settings. Configure thresholds by harm category. |
| `tools` | array | Gemini-native field | Function calling, code execution, and other tool definitions. The current generic OmniRouters OpenAPI schema does not expand this field; validate support before relying on it. |
| `toolConfig` | object | Gemini-native field | Tool invocation configuration, such as function-calling mode. |
| `cachedContent` | string | Gemini-native field | Reference to cached context, typically shaped like `cachedContents/{id}`. Platform support may vary. |

## `contents` Object Structure

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | string | Yes | Message role. Common values are `user` for user input and `model` for model history. Defaults can be treated as `user` when omitted by higher-level SDKs. |
| `parts` | Part[] | Yes | Content parts. Text, images, audio, video, PDFs, tool calls, and tool results are all represented as Parts. |

Multi-turn example:

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Remember: the project codename is Aurora." }]
    },
    {
      "role": "model",
      "parts": [{ "text": "Got it." }]
    },
    {
      "role": "user",
      "parts": [{ "text": "What is the project codename?" }]
    }
  ]
}
```

## Part Object Structure

The current OmniRouters OpenAPI schema explicitly declares Gemini Parts with `text`, `inlineData`, and `fileData`. For media uploads, OmniRouters specifically recommends `inlineData` with base64 content; `fileData.fileUri` and the Gemini File API are currently not supported on this route.

| Part type | Shape | Support | Description |
| --- | --- | --- | --- |
| Text | `{ "text": "..." }` | Supported | Text prompt, question, instruction, or system instruction content. |
| Inline file | `{ "inlineData": { "mimeType": "image/png", "data": "..." } }` | Supported | Direct base64 file content. Works for images, PDFs, audio, video, and similar supported media. |
| File reference | `{ "fileData": { "mimeType": "...", "fileUri": "..." } }` | Currently unsupported | Gemini-native file reference via File API or `gs://`. On OmniRouters, use `inlineData` instead. |
| Function call | `{ "functionCall": { "name": "...", "args": {...} } }` | Model-dependent | Gemini-native tool-call output. Not expanded in the generic OpenAPI schema. |
| Function response | `{ "functionResponse": { "name": "...", "response": {...} } }` | Model-dependent | Tool result returned to the model by your application. |
| Executable code | `{ "executableCode": { "language": "...", "code": "..." } }` | Model-dependent | Gemini code-execution related content. |
| Code execution result | `{ "codeExecutionResult": { "outcome": "...", "output": "..." } }` | Model-dependent | Result from a code-execution tool. |

`inlineData` object:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mimeType` | string | Yes | File MIME type, such as `image/png`, `image/jpeg`, `audio/mp3`, `audio/wav`, `video/mp4`, or `application/pdf`. |
| `data` | string | Yes | Base64-encoded file content. Do not include a `data:...;base64,` prefix unless the target model documentation explicitly allows it. |

## ExtraContent Object Structure

Gemini extension configuration mainly lives in `generationConfig`, `systemInstruction`, and `safetySettings`:

| Object / field | Type | Description |
| --- | --- | --- |
| `generationConfig.temperature` | number | Randomness control. Current OpenAPI range is `0.0` to `2.0`, default `1`. |
| `generationConfig.topP` | number | Nucleus sampling parameter, range `0` to `1`, default `0.95`. |
| `generationConfig.topK` | integer | Limits candidate tokens, default `40`, minimum `1`. |
| `generationConfig.maxOutputTokens` | integer | Maximum output tokens, default `8192`, minimum `1`. |
| `generationConfig.responseMimeType` | string | Response MIME type, such as `text/plain` or `application/json`. |
| `generationConfig.responseSchema` | object | JSON Schema for structured output when `responseMimeType` is `application/json`. |
| `systemInstruction.parts[]` | Part[] | System instruction content. Text Parts are recommended in the current schema. |
| `safetySettings[].category` | string | Safety category. Current OpenAPI values include `HARM_CATEGORY_HARASSMENT`, `HARM_CATEGORY_HATE_SPEECH`, `HARM_CATEGORY_SEXUALLY_EXPLICIT`, and `HARM_CATEGORY_DANGEROUS_CONTENT`. |
| `safetySettings[].threshold` | string | Blocking threshold. Current OpenAPI values include `BLOCK_NONE`, `BLOCK_ONLY_HIGH`, `BLOCK_MEDIUM_AND_ABOVE`, and `BLOCK_LOW_AND_ABOVE`. |
| `generationConfig.responseModalities` | string[] | Extension used by image/audio generation models, such as `TEXT`, `IMAGE`, or `AUDIO`. Generic text/vision calls usually do not need it. |
| `generationConfig.imageConfig` | object | Image-generation extension, such as `aspectRatio` and `image_size`. Only relevant models support it. |

JSON output example:

```json
{
  "generationConfig": {
    "responseMimeType": "application/json",
    "responseSchema": {
      "type": "object",
      "properties": {
        "summary": { "type": "string" },
        "tags": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "required": ["summary"]
    }
  }
}
```

## Response Body Parameters

Non-streaming requests usually return a `GenerateContentResponse` object:

| Field | Type | Description |
| --- | --- | --- |
| `candidates` | array | Candidate responses. Usually contains at least one candidate; if the prompt is blocked, there may be no candidates and `promptFeedback` should be inspected. |
| `candidates[].index` | integer | Candidate index. |
| `candidates[].content` | object | Candidate content, using the same Content shape as the request. |
| `candidates[].content.role` | string | Usually `model`. |
| `candidates[].content.parts` | Part[] | Output parts. Text responses usually appear in `parts[].text`. |
| `candidates[].finishReason` | string | Why generation stopped, such as natural stop, token limit, or safety filtering. |
| `candidates[].finishMessage` | string | Additional explanation for the finish reason. Not always returned. |
| `candidates[].safetyRatings` | array | Safety categories and confidence for the candidate. |
| `candidates[].citationMetadata` | object | Citation metadata, when citations are returned. |
| `candidates[].groundingMetadata` | object | Grounding or retrieval metadata, depending on model and tool support. |
| `candidates[].avgLogprobs` | number | Average log probability for the candidate, when supported. |
| `candidates[].logprobsResult` | object | Detailed token log probability result, when supported. |
| `promptFeedback` | object | Prompt-level safety feedback. Check this first when there are no candidates. |
| `promptFeedback.blockReason` | string | Reason the prompt was blocked. |
| `promptFeedback.safetyRatings` | array | Prompt safety ratings. |
| `usageMetadata` | object | Token usage metadata. |
| `usageMetadata.promptTokenCount` | integer | Input token count. |
| `usageMetadata.candidatesTokenCount` | integer | Candidate output token count. |
| `usageMetadata.totalTokenCount` | integer | Total token count. |
| `usageMetadata.cachedContentTokenCount` | integer | Cached-content token count, when passed through. |
| `usageMetadata.thoughtsTokenCount` | integer | Thinking/reasoning token count, when passed through by reasoning models. |
| `usageMetadata.promptTokensDetails` | array | Input token breakdown by modality. |
| `usageMetadata.candidatesTokensDetails` | array | Output token breakdown by modality. |

Common `finishReason` values:

| Value | Meaning | Handling |
| --- | --- | --- |
| `STOP` | Normal stop. | Read `candidates[0].content.parts`. |
| `MAX_TOKENS` | The output hit `maxOutputTokens`. | Increase `maxOutputTokens` or ask the model to continue. |
| `SAFETY` | Stopped because of safety filtering. | Inspect `safetyRatings`; do not blindly replay the same request. |
| `RECITATION` | Stopped because of potential recitation/copyright risk. | Adjust the prompt toward summary or original wording. |
| `OTHER` | Other reason. | Inspect `finishMessage` and platform logs. |

For streaming interfaces, Gemini-native responses arrive as multiple incremental responses. Each response may contain partial `candidates[].content.parts`; clients should concatenate text by candidate index and part order.

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
