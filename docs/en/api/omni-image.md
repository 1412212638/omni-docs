---
title: Omni-Image API
---

# Omni-Image API

Omni-Image is the unified image generation entry point on OmniRouters. Use it for text-to-image, reference-to-image, image editing, and Gemini-compatible image workflows.

This page covers two common entry points:

- Standard image generation: `POST /v1/images/generations`
- Gemini-compatible image requests: `POST /v1beta/models/{model}:generateContent`

## Routes

| Scenario | Method and path | Purpose |
| --- | --- | --- |
| Standard image generation | `POST https://omnirouters.com/v1/images/generations` | Recommended for text-to-image, reference-to-image, and most image tasks. |
| Gemini image generation | `POST https://omnirouters.com/v1beta/models/{model}:generateContent` | Use when you want to keep Gemini `contents` / `parts` payloads. |

Common Gemini image model paths:

| Model | Path |
| --- | --- |
| `gemini-2.5-flash-image` | `/v1beta/models/gemini-2.5-flash-image:generateContent` |
| `gemini-3-pro-image-preview` | `/v1beta/models/gemini-3-pro-image-preview:generateContent` |
| `gemini-3.1-flash-image-preview` | `/v1beta/models/gemini-3.1-flash-image-preview:generateContent` |

## Authentication

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## Standard Image Generation

### Minimal Example

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "Create an image of a girl and a cow plush happily riding a roller coaster in an amusement park",
    "response_format": "url",
    "size": "4K",
    "stream": false,
    "watermark": false
  }'
```

### Reference-to-Image

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "Keep the subject consistent and create a clean product key visual with soft studio lighting",
    "image": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimages_1.png",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimages_2.png"
    ],
    "response_format": "url",
    "size": "4K",
    "watermark": false
  }'
```

## Standard Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Image model name, such as `doubao-seedream-4-5-251128`, `gemini-2.5-flash-image`, or another enabled image model. |
| `prompt` | string | Yes | Image prompt. Describe subject, style, composition, background, lighting, text requirements, and constraints. |
| `image` | string[] | No | Reference image URL list. Use public `http://` or `https://` URLs. |
| `response_format` | string | No | Response format. Common values: `url`, `b64_json`. `url` is recommended by default. |
| `size` | string | No | Image size or quality tier, such as `1K`, `2K`, `3K`, or `4K`. Supported values depend on the model. |
| `stream` | boolean | No | Whether to return streaming results. Useful for long-running generations or progressive updates. |
| `watermark` | boolean | No | Whether to add a watermark. Configure according to product requirements. |
| `metadata` | object | No | Model extension container. Some models accept `aspect_ratio`, compliance checks, and other options here. |

## Image Count and Format Limits

| Model family | Reference image count | Notes |
| --- | --- | --- |
| GEM 2.5 | `0-3` images | Supports text-to-image and reference-image generation. |
| GEM 3.0 | `0-14` images | Suitable for multi-reference workflows. |
| GEM 3.1 | `0-14` images | Suitable for multi-reference workflows. |
| Vidu q2 | `0-7` images | Supports `png`, `jpeg`, `jpg`, `webp`; minimum size `128x128`; avoid extreme ratios beyond `1:4` or `4:1`. |
| Kling 2.1 | Up to 4 images | Common output tiers include 1K / 2K. |
| Kling 3.0 / 3.0-Omni | Usually up to 1 image | Omni models may support higher output tiers; follow model notes. |
| Seedream 4.x / 5.x | Model-dependent | Usually controlled through prompt and `size`; some models support 2K / 4K. |

## Aspect Ratios

When the selected model supports aspect ratio control, pass it through the model's expected field, such as `metadata.aspect_ratio`, `aspect_ratio`, or a model-specific parameter.

| Model family | Supported aspect ratios |
| --- | --- |
| GEM | `1:1`, `3:2`, `2:3`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9` |
| Hunyuan | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9` |
| Vidu | `16:9`, `9:16`, `1:1`, `3:4`, `4:3`, `21:9`, `2:3`, `3:2` |
| Kling | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9` |
| Qwen | Do not pass aspect ratio unless the specific model says it is supported. |

## Compliance Checks

Some image models support input and output compliance check switches:

| Field | Values | Description |
| --- | --- | --- |
| `InputComplianceCheck` | `Enabled` / `Disabled` | Whether to enable input compliance checks. |
| `OutputComplianceCheck` | `Enabled` / `Disabled` | Whether to enable output compliance checks. |

When passed through `metadata`, a common shape is:

```json
{
  "metadata": {
    "InputComplianceCheck": "Enabled",
    "OutputComplianceCheck": "Enabled"
  }
}
```

## Standard Response Body

Non-streaming requests usually return an image result object. Exact fields vary by model:

| Field | Type | Description |
| --- | --- | --- |
| `created` | integer | Unix timestamp in seconds. |
| `data` | array | Image result array. |
| `data[].url` | string | Image URL, common when `response_format=url`. |
| `data[].b64_json` | string | Base64 image content, common when `response_format=b64_json`. |
| `data[].revised_prompt` | string | Prompt rewritten by the model, returned only by some models. |
| `id` / `task_id` | string | Task id when the selected model returns an async task. |
| `status` | string | Async task status. |
| `error` | object or string | Error details. |

When `stream: true`, the API may return SSE events. Accumulate image results or progress by event type.

## Gemini-Compatible Image Requests

Gemini image routes use `contents` / `parts`. Use `text` for prompts and `inlineData` for base64 image input.

```bash
curl https://omnirouters.com/v1beta/models/gemini-2.5-flash-image:generateContent \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Generate a futuristic city poster at sunset"
          }
        ]
      }
    ],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "maxOutputTokens": 8192
    }
  }'
```

### Gemini Part Structure

| Part type | Shape | Description |
| --- | --- | --- |
| Text | `{ "text": "..." }` | Prompt or instruction. |
| Inline image | `{ "inlineData": { "mimeType": "image/png", "data": "..." } }` | Base64 image content. Do not include a `data:image/...;base64,` prefix. |
| File reference | `{ "fileData": { "mimeType": "...", "fileUri": "..." } }` | Gemini-native file reference. OmniRouters generic guidance recommends `inlineData` instead. |

## Gemini Image Response Body

Gemini-compatible routes usually return a `GenerateContentResponse`:

| Field | Type | Description |
| --- | --- | --- |
| `candidates` | array | Candidate results. |
| `candidates[].content.parts` | array | Output parts. Text is in `text`; images usually appear in `inlineData` or a model-specific image field. |
| `candidates[].finishReason` | string | Stop reason, such as `STOP`, `MAX_TOKENS`, or `SAFETY`. |
| `promptFeedback` | object | Prompt-level safety feedback. |
| `usageMetadata` | object | Token usage metadata. |

## Common Errors

| Error | What to check |
| --- | --- |
| `model is required` | Pass a model name and confirm the model is enabled in your account. |
| `prompt is required` | The standard image endpoint requires `prompt`. |
| `image must be http(s) URLs` | Reference images should be public URLs. For Gemini-compatible local files, use `inlineData`. |
| `aspect_ratio is invalid` | Check the model-specific aspect ratio list. |
| `unsupported size` | Verify that `size` is one of the model's supported tiers. |

## Related Links

- [API Reference overview](/api/)
- [Omni-Video API](/api/omni-video)
- [Gemini Generate Content](/api/llm/gemini-generate-content)
- [OmniRouters Image Skill](/skills/omnirouters-image)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
