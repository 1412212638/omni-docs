# OmniRouters Video Reference

Primary paths:

- `POST /v1/videos`
- `POST /v1/video/generations`
- `POST /v1/videos/generations`
- `GET /v1/videos/{task_id}`
- `GET /v1/video/generations/{task_id}`
- `GET /v1/videos/generations/{task_id}`

Recommended routing:

- standard prompt-only video -> `/v1/videos/generations`
- image-to-video -> `/v1/videos/generations`
- asset remix workflow -> `/v1/video/generations`

Common model families seen in current references:

- `Kling-3.0-1080p`
- `Kling-3.0-omni-1080p`
- `Vidu-q2-720p`
- `Vidu-q2-turbo-720p`
- `Hailuo-2.3-fast-768p`
- `GV-3.1-1080p`
- `OS-2.0-720p`

Important fields:

- `model`: required
- `seconds`: required
- `prompt`: required when no image/video references are passed
- `images`: public `http(s)` URLs only
- `videos`: public `http(s)` URLs only and only for some models

Selected limits from current references:

- `Kling 3.0 / 3.0-Omni`: `3-15` seconds
- `Vidu Q2`: `1-10` seconds
- `Vidu Q3`: `1-16` seconds
- `GV`: `8` seconds
- `OS`: `4`, `8`, `12` seconds

Image count limits:

- `Vidu q2`: up to `7`
- `Vidu q2-pro / q2-turbo`: up to `2`
- `Hailuo 2.3`: up to `1`
- `Kling 2.5 720P`: up to `1`
- `Kling 2.5 1080P`: up to `2`
- `GV 3.1`: up to `2`
- `OS 2.0`: up to `1`

Useful metadata fields:

- `aspect_ratio`
- `negative_prompt`
- `enhance_prompt`
- `input_region`
- `output_config`

Common aspect ratios:

- Kling: `16:9`, `9:16`, `1:1`
- Vidu q2: `16:9`, `9:16`, `4:3`, `3:4`, `1:1`
- Vidu q2-pro / q2-turbo / q3: `16:9`, `9:16`, `1:1`
- GV: `16:9`, `9:16`
- OS: `16:9`, `9:16`
