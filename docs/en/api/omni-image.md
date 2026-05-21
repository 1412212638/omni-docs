---
title: Omni-Image API
---

# Omni-Image API

Omni-Image is the OmniRouters image generation entry point for text-to-image, image-to-image, GPT image generation, async image tasks, multi-image generation, and panorama generation.

This page follows section `2.3 Minimal Request Example` from the Feishu integration document. The examples below are the current working shapes; legacy model limits and old parameter notes are not duplicated here.

## Routes

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `https://omnirouters.com/v1/images/generations` | Create an image task synchronously or return image results directly |
| `POST` | `https://omnirouters.com/v1/images/generations?async=true` | Create an async image task |
| `GET` | `https://omnirouters.com/v1/images/generations/{task_id}` | Query an async image task |

For Gemini-native `contents` / `parts` payloads, see [Gemini Generate Content](/api/llm/gemini-generate-content). They are not mixed into this standard Omni-Image page.

## Authentication

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## Usage

For synchronous creation, send the request body for the target workflow to `POST /v1/images/generations`. For async creation, add `?async=true` to the same route, then query the returned `task_id` with the lookup route.

For async polling, a 5-second or 10-second interval is recommended.

## Minimal Request Body Examples

### Text-to-Image

```json
{
  "model": "Nano-Banana2",
  "resolution": "4K",
  "prompt": "一个女孩在海边回头微笑，电影感光影，高清细节",
  "aspect_ratio": "16:9"
}
```

### Image-to-Image

```json
{
  "model": "Nano-Banana2",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9"
}
```

### GPT Image Generation

```json
{
  "model": "GPT-image-2",
  "quality": "low",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9"
}
```

### Async Image Task

Create the task:

```bash
curl --location --request POST 'https://omnirouters.com/v1/images/generations?async=true' \
  --header 'Authorization: Bearer sk-xxxx' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "model": "Nano-Banana2",
    "resolution": "4K",
    "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
    "images": [
      "https://example.com/image1.png",
      "https://example.com/image2.png"
    ],
    "aspect_ratio": "16:9"
  }'
```

Poll the result:

```bash
curl --location --request GET 'https://omnirouters.com/v1/images/generations/{task_id}' \
  --header 'Authorization: Bearer sk-xxxx'
```

### Reference URL Region

```json
{
  "model": "Nano-Banana2",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9",
  "input_region": "Mainland"
}
```

`input_region` marks the region of the input reference image URLs:

| Value | Description |
| --- | --- |
| `Mainland` | Mainland China |
| `Oversea` | Overseas |
| `OverseaUSWest` | Overseas, US West |

### Kling Generate Multiple Images

```json
{
  "model": "Kling:3.0-omni",
  "resolution": "4K",
  "prompt": "一只小猫坐在窗边",
  "aspect_ratio": "16:9",
  "n": 3
}
```

### Seedream Generate Multiple Images

```json
{
  "model": "Seedream:4.5",
  "resolution": "4K",
  "prompt": "一只小猫坐在窗边",
  "n": 3
}
```

### GPT-image-2 Generate Multiple Images

```json
{
  "model": "GPT-image-2",
  "quality": "low",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9",
  "n": 3
}
```

### Hunyuan World Panorama 2.0

```json
{
  "model": "Hunyuan-3d-2.0",
  "prompt": "一个雪山湖泊的360度全景图，真实摄影风格"
}
```

## Request Body

These are the common top-level fields that appear in the section 2.3 examples. For each workflow, send only the fields shown in its example.

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | Image model name. |
| `prompt` | string | Image generation prompt. |
| `resolution` | string | Image resolution or size tier, for example `4K`. |
| `aspect_ratio` | string | Image aspect ratio, for example `16:9`. |
| `images` | string[] | Reference image URL array. |
| `quality` | string | Quality tier for GPT image workflows, for example `low`. |
| `n` | number | Number of images to generate in one request. |
| `input_region` | string | Region of input reference image URLs, for example `Mainland`. |

Async creation uses the query parameter `async=true`; it is not a request body field.

## Query an Async Task

```bash
curl https://omnirouters.com/v1/images/generations/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Response Body

The endpoint usually returns an image result object or an async task object. Common fields are listed below; use the actual response as the source of truth:

| Field | Type | Description |
| --- | --- | --- |
| `data` | array | Image result array. |
| `data[].url` | string | Image URL. |
| `data[].b64_json` | string | Base64 image content. |
| `id` / `task_id` | string | Async task id. |
| `status` | string | Async task status. |
| `error` / `message` | string or object | Failure reason or error details. |

## Related Links

- [API Reference overview](/api/)
- [Omni-Video API](/api/omni-video)
- [Gemini Generate Content](/api/llm/gemini-generate-content)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
