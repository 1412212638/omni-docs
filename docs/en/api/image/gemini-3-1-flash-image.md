---
title: Gemini 3.1 Flash Image Image Generation
---

# Gemini 3.1 Flash Image Image Generation

OmniRouters Google Gemini image protocol reference for the `gemini-3-1-flash-image` model.

## Endpoint

`POST /v1beta/models/gemini-3-1-flash-image:generateContent`

## Minimal request

```bash
curl https://omnirouters.com/v1beta/models/gemini-3-1-flash-image:generateContent \
  -H "x-goog-api-key: $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{\n  "contents": [\n    {\n      "role": "user",\n      "parts": [\n        { "text": "Create a cinematic image of a flower in a glasshouse." }\n      ]\n    }\n  ],\n  "generationConfig": {\n    "responseModalities": ["TEXT", "IMAGE"]\n  }\n}'
```

This operation creates a new image from a text prompt.

## Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contents` | array | 必填 | Gemini content 数组，包含文本或图片 Part。 |
| `generationConfig` | object | 否 | 生成配置；图片输出通常设置 `responseModalities`。 |

Gemini image responses are returned in `candidates[].content.parts[].inlineData`.

## Response body

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          { "inlineData": { "data": "...", "mimeType": "image/png" } }
        ]
      },
      "finishReason": "STOP"
    }
  ]
}
```

## Notes

Model-specific validation and output availability depend on the selected model and current OmniRouters routing configuration. For shared routing guidance, see [Omni-Image API](/api/omni-image).

