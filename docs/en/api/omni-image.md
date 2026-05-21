---
title: Omni-Image API
---

# Omni-Image API

Omni-Image is the OmniRouters image generation entry point for text-to-image and reference-to-image workflows.

This page only documents the current standard image creation shape: all request parameters are top-level fields.

## Route

| Method | Path |
| --- | --- |
| `POST` | `https://omnirouters.com/v1/images/generations` |

For Gemini-native `contents` / `parts` payloads, see [Gemini Generate Content](/api/llm/gemini-generate-content). They are not mixed into this standard Omni-Image page.

## Authentication

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## Minimal Request Examples

### Text-to-Image

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
    "stream": false,
    "watermark": false
  }'
```

## Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Image model name, for example `doubao-seedream-4-5-251128`. |
| `prompt` | string | Yes | Image generation prompt. |
| `image` | string[] | No | Reference image URL array. Omit for text-to-image; provide it for reference-to-image. |
| `response_format` | string | No | Response format, commonly `url`. |
| `size` | string | No | Image size or quality tier, for example `4K`. |
| `stream` | boolean | No | Whether to return streaming output. |
| `watermark` | boolean | No | Whether to add a watermark. |

## Response Body

The endpoint usually returns an image result object. Common fields are listed below; use the actual response as the source of truth:

| Field | Type | Description |
| --- | --- | --- |
| `data` | array | Image result array. |
| `data[].url` | string | Image URL, common when `response_format=url`. |
| `data[].b64_json` | string | Base64 image content, possible when `response_format=b64_json`. |
| `id` / `task_id` | string | Task id when the selected model returns an async task. |
| `status` | string | Async task status. |
| `error` / `message` | string or object | Failure reason or error details. |

## Related Links

- [API Reference overview](/api/)
- [Omni-Video API](/api/omni-video)
- [Gemini Generate Content](/api/llm/gemini-generate-content)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
