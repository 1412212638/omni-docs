---
title: Omni-Video API
---

# Omni-Video API

Omni-Video is the unified video generation entry point on OmniRouters. Use it for text-to-video, image-to-video, first/last-frame video, reference-asset video workflows, and some asset remix scenarios.

This page covers the common integration path. Each model family has its own duration, reference image count, aspect ratio, and audio capability limits. Treat the selected model's capability notes as the final source of truth.

## Routes

| Scenario | Method and path | Purpose |
| --- | --- | --- |
| Standard video creation | `POST https://omnirouters.com/v1/videos` | Recommended for text-to-video, image-to-video, and common reference-image workflows. |
| Standard task lookup | `GET https://omnirouters.com/v1/videos/{task_id}` | Query tasks created through `/v1/videos`. |
| Asset remix creation | `POST https://omnirouters.com/v1/video/generations` | Useful when transforming an existing video or product assets. |
| Asset remix lookup | `GET https://omnirouters.com/v1/video/generations/{task_id}` | Query asset remix tasks. |

Some compatible environments may also expose `POST /v1/videos/generations` and `GET /v1/videos/generations/{task_id}`. If your Apifox environment shows those paths, use the matching route.

## Authentication

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## Integration Flow

1. Choose a model and scenario: text-to-video, image-to-video, first/last frame, reference video, or asset remix.
2. Prepare the request body: at minimum `model`, and usually `prompt`, `seconds`, `image` / `images`, and `metadata`.
3. Call the create endpoint and read the returned `task_id` or `id`.
4. Poll the query endpoint until the task reaches a terminal state such as `succeeded`, `completed`, or `failed`.
5. Read the output video URL or failure reason from the task result.

For first-time integration, start with the minimal example. For production, enable input/output compliance checks when your workflow requires them. Field names are case-sensitive.

## Minimal Examples

### Text-to-Video

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni-1080p",
    "prompt": "A girl turns back and smiles by the seaside",
    "seconds": "5",
    "metadata": {
      "aspect_ratio": "16:9"
    }
  }'
```

Some model examples use separate `resolution` and `aspect_ratio` fields:

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "prompt": "A girl turns back and smiles by the seaside",
  "seconds": "5",
  "aspect_ratio": "16:9"
}
```

If the model name already includes a resolution suffix, such as `Kling-3.0-omni-1080p`, prefer the model name and avoid overriding resolution elsewhere.

### Image-to-Video

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni-1080p",
    "prompt": "A girl turns back and smiles by the seaside",
    "seconds": "5",
    "images": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
    ],
    "metadata": {
      "aspect_ratio": "16:9",
      "input_region": "Mainland"
    }
  }'
```

### Query a Task

```bash
curl https://omnirouters.com/v1/videos/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Video model name. Prefer full names with version and resolution suffix, such as `Kling-3.0-omni-1080p` or `Vidu-q2-turbo-720p`. |
| `prompt` | string | Conditionally | Text prompt. Usually required when `image`, `images`, and `videos` are absent. |
| `seconds` | string or number | Yes | Video duration. Supported values depend on the selected model. |
| `image` | string | No | Single reference image URL. Only `http://` and `https://` URLs are supported. |
| `images` | string[] | No | Reference image URL array. Only `http://` and `https://` URLs are supported. Count limits vary by model. |
| `videos` | string[] | No | Reference video URLs. Usually supported only by Kling O1 / 3.0 / 3.0-Omni-style models. |
| `resolution` | string | No | Resolution, such as `720p` or `1080p`. If the model name includes resolution, prefer the model name. |
| `aspect_ratio` | string | No | Top-level aspect ratio, such as `16:9`, `9:16`, or `1:1`. Some models use `metadata.aspect_ratio` instead. |
| `metadata` | object | No | Model extension parameter container. Common fields are listed below. |

## `metadata`

| Field | Type | Description |
| --- | --- | --- |
| `metadata.aspect_ratio` | string | Video aspect ratio. Common values: `16:9`, `9:16`, `1:1`. |
| `metadata.negative_prompt` | string | Negative prompt, such as low quality, blur, watermark, or subtitles. |
| `metadata.enhance_prompt` | string | Prompt enhancement switch. Common values: `Enabled`, `Disabled`. |
| `metadata.input_region` | string | Region for input asset URLs. Common values: `Mainland`, `Oversea`. |
| `metadata.scene_type` / `metadata.SceneType` | string | Model workflow scene, such as motion control or template effects. |
| `metadata.ext_info` / `metadata.ExtInfo` | object or string | Advanced model extension parameters. Object input may be converted to the required model format. |
| `metadata.output_config` | object | Output and compliance configuration. |

Common `metadata.output_config` fields:

| Field | Values | Description |
| --- | --- | --- |
| `AudioGeneration` | `Enabled` / `Disabled` | Whether to generate audio. Supported only by some models. |
| `PersonGeneration` | `AllowAdult` / `Disallowed` | Person generation policy. |
| `InputComplianceCheck` | `Enabled` / `Disabled` | Whether to enable input compliance checks. |
| `OutputComplianceCheck` | `Enabled` / `Disabled` | Whether to enable output compliance checks. |
| `LogoAdd` | `Enabled` / `Disabled` | Whether to add a logo or mark. Supported by some models. |
| `OffPeak` | `Enabled` / `Disabled` | Off-peak option supported by models such as Vidu. |
| `EnhanceSwitch` | `Enabled` / `Disabled` | Enhancement switch supported by some models. |

## Model and Parameter Limits

| Model family | Duration | Reference image limits | Common aspect ratios |
| --- | --- | --- | --- |
| Kling 2.5 | `5` or `10` seconds | 720P up to 1 image; 1080P up to 2 images | `16:9`, `9:16`, `1:1` |
| Kling O1 / 3.0 / 3.0-Omni | `3-15` seconds | Advanced reference input, often up to 7 images; stricter when reference videos are present | `16:9`, `9:16`, `1:1` |
| Vidu Q2 | `1-10` seconds | Up to 7 images; `q2-pro` / `q2-turbo` up to 2 images | `16:9`, `9:16`, `4:3`, `3:4`, `1:1` |
| Vidu Q3 | `1-16` seconds | Depends on the specific model | `16:9`, `9:16`, `1:1` |
| Hailuo 2.3 / 2.3-fast | 768P: `6` or `10` seconds; 1080P: `10` seconds | Usually up to 1 image | Avoid passing `aspect_ratio` unless the model says otherwise |
| GV 3.1 | `8` seconds | Up to 2 images | `16:9`, `9:16` |
| OS 2.0 | `4`, `8`, or `12` seconds | Up to 1 image | Text-to-video supports `16:9`, `9:16` |

## Advanced Reference Asset Rules

Kling O1 / 3.0 / 3.0-Omni support more complex reference inputs with stricter validation:

| Scenario | Limit |
| --- | --- |
| Reference videos provided | Reference images are usually limited to 4; `images + element_list` is usually limited to 4. |
| No reference videos | Reference images are usually limited to 7; `images + element_list` is usually limited to 7. |
| First-frame or first/last-frame mode | `element_list` usually supports up to 3 elements. |
| Multi-shot `multi_shot=true` | `shot_type` should be `customize`, and `multi_prompt` usually contains 1-6 items. |
| Multi-shot duration | Each shot duration should be at least 1 second, and all `multi_prompt.duration` values should add up to `seconds`. |

## Response Body

Create requests usually return a task object. Fields vary slightly by model and route:

| Field | Type | Description |
| --- | --- | --- |
| `task_id` / `taskId` / `id` | string | Task id used for polling. |
| `status` | string | Task status. Common values include `queued`, `running`, `processing`, `succeeded`, `completed`, `failed`, `cancelled`. |
| `created_at` / `createdAt` | string or integer | Task creation time. |
| `updated_at` / `updatedAt` | string or integer | Last task update time. |
| `data` / `result` / `output` | object | Result container. Usually includes video URLs when successful. |
| `video_url` / `url` / `urls` | string or string[] | Generated video URL or URLs. Exact field names depend on the model. |
| `error` / `message` | string or object | Failure reason or error details. |

For polling, treat `succeeded`, `success`, `completed`, and `done` as success terminal states, and `failed`, `error`, and `cancelled` as failure terminal states.

## Common Errors

| Error | What to check |
| --- | --- |
| `seconds is required` | Pass `seconds` and verify the value is allowed by the model. |
| `image is not supported; use images` | The route or model expects the `images` array. |
| `images must be http(s) URLs` | Reference images must be public URLs, not local paths or base64. |
| `videos is only supported for Kling O1 / 3.0 / 3.0-Omni` | Reference videos are supported only by some Kling models. |
| `metadata.aspect_ratio is invalid` | Check the model-specific aspect ratio list. |
| `metadata.<field> is not supported` | Remove unsupported model extension fields or verify field casing. |

## Related Links

- [API Reference overview](/api/)
- [Omni-Image API](/api/omni-image)
- [OmniRouters Video Skill](/skills/omnirouters-video)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
