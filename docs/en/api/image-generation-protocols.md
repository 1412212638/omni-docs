---
title: Image Generation Protocols
---

# Image Generation Protocols

This page documents the image-generation protocols currently exposed by OmniRouters, based on the corresponding AstraFlow protocol structures and adapted to the OmniRouters gateway.

## Authentication

OpenAI and X.AI compatible routes use:

```text
Authorization: Bearer <your-api-key>
```

Gemini-compatible routes use:

```text
x-goog-api-key: <your-api-key>
```

## OpenAI protocol

### Generate an image

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

Common fields:

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | The image model name. For this example, `gpt-image-1`. |
| `prompt` | string | Required image-generation prompt. |
| `n` | integer | Number of images to generate. |
| `size` | string | Output size, such as `1024x1024`, `1024x1536`, or `1536x1024`. |
| `quality` | string | Image quality, such as `low`, `medium`, or `high`. |
| `output_format` | string | Output format, such as `png` or `jpeg`. |
| `output_compression` | integer | Output compression level from `0` to `100`, where supported. |

### Edit an image

Use the same `POST /v1/images/generations` route with the image-edit fields supported by the selected model. The exact input-image field shape may vary by model; use [Omni-Image API](/api/omni-image) for the platform's current reference-image examples.

### Response body

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

Depending on the model and output configuration, `data[]` may contain `b64_json` or `url`.

## Google Gemini Image protocol

### Generate an image

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

The response may contain text and image parts:

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

For image input, add an image `part` to `contents[].parts` using the Gemini-compatible inline data or supported media reference shape.

## X.AI protocol

### Generate an image

`POST /v1/images/generations`

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-imagine-image",
    "prompt": "A joyful kindergarten celebration for Children's Day",
    "size": "2k",
    "aspect_ratio": "1:1",
    "n": 2
  }'
```

Supported model values include `grok-imagine-image` and `grok-imagine-image-quality`.

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | X.AI image model name. |
| `prompt` | string | Required image prompt. |
| `aspect_ratio` | string | For example `1:1`, `3:4`, `4:3`, `9:16`, or `16:9`. |
| `n` | integer | Number of image URLs to return. |
| `response_format` | string | The documented format is `b64_json`. |
| `size` | string | Image size tier, such as `1k` or `2k`. |

### Response body

```json
{
  "created": 1782875947,
  "data": [
    { "url": "https://example.com/generated-image.png" }
  ]
}
```

## Related links

- [Omni-Image API](/api/omni-image)
- [Model API Manual](/api/)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
