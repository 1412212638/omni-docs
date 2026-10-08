---
title: Gemini 3.1 Flash Image 图像生成
---

# Gemini 3.1 Flash Image 图像生成

OmniRouters Google Gemini 图片协议参考 for the `gemini-3-1-flash-image` model.

## 接口

`POST /v1beta/models/gemini-3-1-flash-image:generateContent`

## 最小请求示例

```bash
curl https://omnirouters.com/v1beta/models/gemini-3-1-flash-image:generateContent \
  -H "x-goog-api-key: $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{\n  "contents": [\n    {\n      "role": "user",\n      "parts": [\n        { "text": "Create a cinematic image of a flower in a glasshouse." }\n      ]\n    }\n  ],\n  "generationConfig": {\n    "responseModalities": ["TEXT", "IMAGE"]\n  }\n}'
```

此接口根据文本提示词生成图片。

## 请求体

| Field | Type | 必填 | Description |
| --- | --- | --- | --- |
| `contents` | array | 必填 | Gemini content 数组，包含文本或图片 Part。 |
| `generationConfig` | object | 否 | 生成配置；图片输出通常设置 `responseModalities`。 |

Gemini image responses are returned in `candidates[].content.parts[].inlineData`.

## 返回参数

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

## 说明

Model-specific validation and output availability depend on the selected model and current OmniRouters routing configuration. For shared routing guidance, see [Omni-Image API](/api/omni-image).


