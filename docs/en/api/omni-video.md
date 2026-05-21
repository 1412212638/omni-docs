---
title: Omni-Video API
---

# Omni-Video API

Omni-Video is the unified OmniRouters entry point for text-to-video and image-to-video generation.

This page only documents the latest working minimal request shape from section `2.3 Minimal Request Example` in the Feishu integration document.

## Routes

The two create routes below are fully compatible. They have no behavior difference, so use either one:

| Method | Path |
| --- | --- |
| `POST` | `https://omnirouters.com/v1/videos` |
| `POST` | `https://omnirouters.com/v1/video/generations` |

Use the matching task lookup route:

| Method | Path |
| --- | --- |
| `GET` | `https://omnirouters.com/v1/videos/{task_id}` |
| `GET` | `https://omnirouters.com/v1/video/generations/{task_id}` |

## Authentication

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## Integration Flow

1. Choose the scenario: text-to-video or image-to-video.
2. Build the request body with top-level fields from the minimal examples below.
3. Submit the task to either create route.
4. Use the returned `task_id` to query task status and result.

Field names are case-sensitive. Prefer the minimal request shapes below.

## Minimal Request Examples

### Text-to-Video

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni",
    "resolution": "1080p",
    "prompt": "A girl turns back and smiles by the seaside",
    "seconds": "5",
    "aspect_ratio": "16:9"
  }'
```

### Image-to-Video

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni",
    "resolution": "1080p",
    "images": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
    ],
    "prompt": "A girl turns back and smiles by the seaside",
    "seconds": "5"
  }'
```

If you prefer the compatible route, only change the URL to `/v1/video/generations`; the request body stays the same.

## Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model name, for example `Kling-3.0-omni`. |
| `resolution` | string | Yes | Output resolution, for example `1080p`. |
| `prompt` | string | Yes | Video prompt. |
| `seconds` | string | Yes | Video duration, for example `"5"`. |
| `aspect_ratio` | string | Recommended for text-to-video | Video aspect ratio, for example `16:9`. |
| `images` | string[] | Required for image-to-video | Reference image URL array. |

## Query a Task

```bash
curl https://omnirouters.com/v1/videos/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

If you created the task through `/v1/video/generations`, you can also use:

```bash
curl https://omnirouters.com/v1/video/generations/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Response Body

The create endpoint returns task information. Common fields are listed below; use the actual response as the source of truth:

| Field | Type | Description |
| --- | --- | --- |
| `task_id` / `taskId` / `id` | string | Task id for later lookup. |
| `status` | string | Task status. |
| `data` / `result` / `output` | object | Task result container. |
| `url` / `video_url` / `urls` | string or string[] | Generated video URL or URLs. |
| `error` / `message` | string or object | Failure reason or error details. |

## Related Links

- [API Reference overview](/api/)
- [Omni-Image API](/api/omni-image)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
