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

Expanded capability notes from the current comparison sheet:

- `Hailuo-02`: text-to-video, image-to-video, first/last frame support, 720P/1080P
- `Hailuo-2.3`: text-to-video and image-to-video, 768P/1080P
- `Hailuo-2.3-fast`: image-to-video oriented, single-image input, 768P/1080P
- `Kling-2.1`: text-to-video and image-to-video, up to 4 images, `camera_control`
- `Kling-2.5 Turbo`: text-to-video and image-to-video, 1080P
- `Kling-O1`: text/video/image hybrid reference workflows, supports first/last frame
- `Kling-2.6`: text-to-video and image-to-video
- `Kling-2.6 (audio-video)`: audio-video output capable
- `Kling-3.0`: text-to-video and image-to-video, `3-15s`, audio-video capable
- `Kling-3.0-omni`: supports first/last frame, reference video, and audio-video with some limits
- `Veo-3.1`: text-to-video and image-to-video, `16:9` / `9:16`, up to 3 references

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

Audio-video notes from the matrix:

- some Kling variants support direct audio-video generation
- `Veo-3.1` audio output depends on enabling the audio-generation flag

Common aspect ratios:

- Kling: `16:9`, `9:16`, `1:1`
- Vidu q2: `16:9`, `9:16`, `4:3`, `3:4`, `1:1`
- Vidu q2-pro / q2-turbo / q3: `16:9`, `9:16`, `1:1`
- GV: `16:9`, `9:16`
- OS: `16:9`, `9:16`
