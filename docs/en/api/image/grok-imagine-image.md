---
title: Grok Imagine Image Generation
---

# Grok Imagine Image Generation

OmniRouters X.AI image protocol reference for the `grok-imagine-image` model.

## Endpoint

`POST /v1/images/generations`

## Minimal request

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{\n  "model": "grok-imagine-image",\n  "prompt": "A cinematic flower in a glasshouse",\n  "size": "1024x1024",\n  "quality": "high",\n  "n": 1\n}'
```

This operation creates a new image from a text prompt.

## Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | 必填 | 固定使用 `grok-imagine-image`。 |
| `prompt` | string | 必填 | Image prompt. |
| `size` | string | 否 | 输出尺寸，例如 1024x1024。 |
| `quality` | string | 否 | 图片质量：`low`、`medium` 或 `high`。 |
| `n` | integer | 否 | 生成数量。 |

The response may return Base64 data in `data[].b64_json` or a hosted URL in `data[].url`, depending on the model.

## Response body

```json
{
  "created": 1782875947,
  "data": [
    { "url": "https://example.com/image.png" }
  ]
}
```

## Notes

Model-specific validation and output availability depend on the selected model and current OmniRouters routing configuration. For shared routing guidance, see [Omni-Image API](/api/omni-image).

