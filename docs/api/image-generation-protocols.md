---
title: 图片生成协议
---

# 图片生成协议

本页介绍 OmniRouters 当前提供的图片生成协议。内容参考 AstraFlow 对应协议结构，并已适配为 OmniRouters 网关地址。

## Authentication

OpenAI 和 X.AI 兼容路由使用：

```text
Authorization: Bearer <your-api-key>
```

Gemini 兼容路由使用：

```text
x-goog-api-key: <your-api-key>
```

## OpenAI 协议

### 图片生成

`POST /v1/images/generations`

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "A beautiful flower",
    "size": "1024x1024",
    "quality": "high",
    "output_format": "png",
    "output_compression": 100
  }'
```

常用字段：

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | 图片模型名称，本示例使用 `gpt-image-1`。 |
| `prompt` | string | 必填，图片生成提示词。 |
| `n` | integer | 生成图片数量。 |
| `size` | string | 输出尺寸，例如 `1024x1024`、`1024x1536` 或 `1536x1024`。 |
| `quality` | string | 图片质量，例如 `low`、`medium` 或 `high`。 |
| `output_format` | string | 输出格式，例如 `png` 或 `jpeg`。 |
| `output_compression` | integer | 在模型支持时使用，取值范围为 `0` 到 `100`。 |

### 图片编辑

使用相同的 `POST /v1/images/generations` 路由，并传入所选模型支持的图片编辑字段。不同模型的输入图片字段可能不同，平台当前的参考图示例请查看 [Omni-Image API](/zh/api/omni-image)。

### 返回参数

```json
{
  "created": 1750667997,
  "data": [
    { "b64_json": "{image_base64_string}" }
  ],
  "usage": {
    "total_tokens": 4169,
    "input_tokens": 9,
    "output_tokens": 4160
  }
}
```

根据模型和输出配置不同，`data[]` 可能包含 `b64_json` 或 `url`。

## Google Gemini Image 协议

### 图片生成

`POST /v1beta/models/{model}:generateContent`

```bash
curl "https://omnirouters.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -H "x-goog-api-key: $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          { "text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme" }
        ]
      }
    ],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"]
    }
  }'
```

响应可能同时包含文本和图片 Part：

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          { "text": "Here is the generated image." },
          { "inlineData": { "data": "...", "mimeType": "image/png" } }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 16,
    "candidatesTokenCount": 1315,
    "totalTokenCount": 1331
  }
}
```

如果需要输入图片，可按照 Gemini 兼容的内联数据或支持的媒体引用结构，在 `contents[].parts` 中加入图片 `part`。

## X.AI 协议

### 图片生成

`POST /v1/images/generations`

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-imagine-image",
    "prompt": "A joyful kindergarten celebration for Children\'s Day",
    "size": "2k",
    "aspect_ratio": "1:1",
    "n": 2
  }'
```

支持的模型值包括 `grok-imagine-image` 和 `grok-imagine-image-quality`。

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | X.AI 图片模型名称。 |
| `prompt` | string | 必填，图片提示词。 |
| `aspect_ratio` | string | 例如 `1:1`、`3:4`、`4:3`、`9:16` 或 `16:9`。 |
| `n` | integer | 返回的图片 URL 数量。 |
| `response_format` | string | 文档中的格式为 `b64_json`。 |
| `size` | string | 图片尺寸档位，例如 `1k` 或 `2k`。 |

### 返回参数

```json
{
  "created": 1782875947,
  "data": [
    { "url": "https://example.com/generated-image.png" }
  ]
}
```

## 相关链接

- [Omni-Image API](/zh/api/omni-image)
- [模型 API 手册](/zh/api/)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
