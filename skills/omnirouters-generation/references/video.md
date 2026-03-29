# Video Reference

## Scope

Use this reference when the user needs OmniRouters video generation guidance.

Primary paths:

- `POST /v1/videos`
- `POST /v1/video/generations`
- `GET /v1/videos/{task_id}`
- `GET /v1/video/generations/{task_id}`

Standard auth:

- `Authorization: Bearer <OMNIROUTERS_API_KEY>`

## Recommended Routing

- Pure prompt-based short video -> `/v1/videos`
- Image-to-video -> `/v1/videos`
- Existing video or asset remix workflow -> `/v1/video/generations`
- Task status lookup -> matching `.../{task_id}` route

## Model Families Seen In Current References

- `Kling-3.0-1080p`
- `Kling-3.0-omni-1080p`
- `Vidu-q2-720p`
- `Vidu-q2-turbo-720p`
- `Hailuo-2.3-fast-768p`
- `GV-3.1-1080p`
- `OS-2.0-720p`

Keep model names exact and mention that the final available set depends on the account configuration.

## Common Request Shape

```json
{
  "model": "Kling-3.0-omni-1080p",
  "seconds": "5",
  "prompt": "A girl dances while holding a puppy",
  "images": [
    "https://example.com/frame-1.jpg",
    "https://example.com/frame-2.jpg"
  ],
  "metadata": {
    "aspect_ratio": "16:9",
    "negative_prompt": "low quality, blur, watermark",
    "enhance_prompt": "Enabled",
    "input_region": "Mainland"
  }
}
```

## Required and Important Fields

### model

- Required
- Use the exact model name, including version and resolution suffix when applicable

### seconds

- Required for all current video models
- Common allowed ranges from the reference:
  - `Kling 2.5`: `5` or `10`
  - `Kling O1`: `3-10`
  - `Kling 3.0 / 3.0-Omni`: `3-15`
  - `Hailuo 2.3 / 2.3-fast 768P`: `6` or `10`
  - `Hailuo 1080P`: `10`
  - `Vidu Q2`: `1-10`
  - `Vidu Q3`: `1-16`
  - `GV`: `8`
  - `OS`: `4`, `8`, `12`

### prompt

- Required when both `images` and `videos` are empty
- For some advanced Kling flows, shot-specific prompts can override the top-level prompt

### images

- Use the `images` array, not a single `image` field, for the referenced video guide
- Only public `http(s)` URLs are supported
- Do not suggest base64 for these video asset inputs

Common limits from the current guide:

- `Vidu q2`: up to `7` reference images
- `Vidu q2-pro / q2-turbo`: up to `2` images
- `Hailuo 2.3 / 2.3-fast`: up to `1` image
- `Kling 2.5 720P`: up to `1` image
- `Kling 2.5 1080P`: up to `2` images
- `GV 3.1 / 3.1-fast`: up to `2` images
- `OS 2.0`: up to `1` image

### videos

- Use the `videos` array for reference videos
- Only public `http(s)` URLs are supported
- Currently supported in the guide for:
  - `Kling O1`
  - `Kling 3.0`
  - `Kling 3.0-Omni`

## Supported metadata fields

Common accepted fields:

- `negative_prompt`
- `enhance_prompt`
- `input_region`
- `aspect_ratio`
- `scene_type`
- `ext_info`
- `output_config`
- `vidu_q2_object_ids`
- `vidu_q2_voice_map`

Avoid inventing other metadata keys unless separately documented.

## Aspect Ratio Guidance

### Kling text-to-video

- `16:9`
- `9:16`
- `1:1`

### Vidu q2

- `16:9`
- `9:16`
- `4:3`
- `3:4`
- `1:1`

### Vidu q2-pro / q2-turbo / q3

- `16:9`
- `9:16`
- `1:1`

### GV

- `16:9`
- `9:16`

### OS text-to-video

- `16:9`
- `9:16`

### Hailuo

- aspect ratio not supported in the cited guide

## Response and Follow-Up

- Treat these as async task-style flows unless the current endpoint explicitly documents otherwise
- If a creation endpoint returns a task id, tell the user to poll the matching query route

## Best Practices

- State clearly whether the user is doing prompt-only generation, image-to-video, or asset remix
- Keep URLs stable and externally reachable
- Choose aspect ratio and duration before sending the first request
- Mention model-specific image limits when users pass multiple references
