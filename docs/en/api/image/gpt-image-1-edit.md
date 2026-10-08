---
title: GPT Image 1 Image Editing
---

# GPT Image 1 Image Editing

OmniRouters OpenAI image protocol reference for the `gpt-image-1` model.

## Endpoint

`POST /v1/images/edits`

## Minimal request

```bash
curl https://omnirouters.com/v1/images/edits \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{\n  "model": "gpt-image-1",\n  "prompt": "Make the lighting warmer and preserve the composition.",\n  "image": "<binary image file>"\n}'
```

This operation edits an uploaded image. Use multipart form data when the gateway requires a binary upload.

## Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | 必填 | 固定使用 `gpt-image-1`。 |
| `prompt` | string | 必填 | Image prompt. |
| `image` | binary file | 必填 | 待编辑的图片文件。 |
| `quality` | string | 否 | 图片质量：`low`、`medium` 或 `high`。 |
| `n` | integer | 否 | 生成数量。 |

The response may return Base64 data in `data[].b64_json` or a hosted URL in `data[].url`, depending on the model.

## Response body

```json
{
  "created": 1782875947,
  "data": [
    { "b64_json": "{image_base64_string}" }
  ]
}
```

## Notes

Model-specific validation and output availability depend on the selected model and current OmniRouters routing configuration. For shared routing guidance, see [Omni-Image API](/api/omni-image).

