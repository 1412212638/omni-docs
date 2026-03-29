# OmniRouters Generation

Use one OmniRouters API key to route video, image, and speech generation through a single skill-style workflow.

::: info
OmniRouters Generation is designed for agents, workflows, scripts, and third-party skill systems that need a unified media-generation entry point. With one OmniRouters credential set, you can connect video generation, image generation, and TTS synthesis, then route each request to the most suitable interface and model.
:::

## Source / Download

- [View source](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-generation)
- [Download skill package](/downloads/omnirouters-generation-skill.zip)
- [Open `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-generation/SKILL.md)

## Environment

Recommended environment variables:

- `OMNIROUTERS_API_KEY`: required OmniRouters API key
- `OMNIROUTERS_BASE_URL`: optional, defaults to `https://omnirouters.com`

Use the same auth format across requests:

- `Authorization: Bearer <OMNIROUTERS_API_KEY>`

The current public surface is documented in the [API Reference](/api/).

## Direct execution

The skill package now includes executable Node scripts, so it can route and submit requests directly:

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/run-generation.mjs \
  --media video \
  --prompt "A futuristic 16:9 product promo" \
  --duration 5 \
  --poll

node scripts/run-generation.mjs \
  --media image \
  --prompt "A cyberpunk city poster" \
  --size 4K

node scripts/run-generation.mjs \
  --media speech \
  --input "Welcome to OmniRouters." \
  --voice en_female_anna_mars_bigtts \
  --output welcome.mp3
```

You can inspect the final request with `--dry-run`, or fetch tasks later with `node scripts/get-task.mjs --task-id ... --family video-standard`.

## Quick Start

Describe what you want to generate and the skill can route it to the right interface:

```text
Create a 16:9 product promo video with a futuristic look
Turn this reference image into a 5-second video with a slow head turn
Use this source video and replace the product shots with new assets
Generate a cyberpunk city poster
Read this welcome script in a warm male voice
```

## Supported Generation Types

### Video generation

| Type | Trigger | API | Notes |
| --- | --- | --- | --- |
| Text-to-video | Pure text prompt | `/v1/videos/generations` | Best for short videos created directly from prompts |
| Image-to-video | One reference image plus motion instructions | `/v1/videos/generations` | Best for animating a still image into a short clip |
| Multi-image video | Multiple reference images | `/v1/videos/generations` | Best for multi-subject or shot-switching style videos |
| Asset-driven remix | Source video, product images, or asset pack | `/v1/video/generations` | Best for ad-style remix, replacement, or restructuring workflows |

### Image generation

| Type | Trigger | API | Notes |
| --- | --- | --- | --- |
| Text-to-image | Pure text prompt | `/v1/images/generations` | Best for posters, covers, key visuals, and standard image creation |
| Reference-to-image | One or more reference images | `/v1/images/generations` | Best for style-guided or reference-based generation |
| Gemini image generation | Gemini-compatible image request format | `/v1beta/models/*image*:generateContent` | Best when your integration already targets Gemini-style image endpoints |

### Audio generation

| Type | Trigger | API | Notes |
| --- | --- | --- | --- |
| TTS speech synthesis | Dubbing, narration, reading text aloud | `/v1/audio/speech` | Supports explicit model, voice, speed, and output format |
| Gemini-TTS | Gemini-compatible speech request format | `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent` | Best when your integration expects Gemini-style speech calls |

## Intent Routing Rules

### Video generation

```text
User input -> Intent
------------------------------
Pure prompt -> Text-to-video
Single image + motion request -> Image-to-video
Multiple reference images -> Multi-image video
Source video + product assets -> Asset-driven remix
```

### Image generation

```text
User input -> Intent
------------------------------
"Generate an image / poster / cover" -> Image generation mode
Pure text -> Text-to-image
Reference image + style instruction -> Reference-to-image
Explicit Gemini image request -> Gemini image generation
```

### Audio generation

```text
User input -> Intent
------------------------------
"Dub / narrate / read aloud" + text -> TTS speech synthesis
Explicit Gemini speech request -> Gemini-TTS
```

## Model Selection Suggestions

### Video models

Based on the current API reference, OmniRouters can cover multiple video-model families, for example:

- `Kling-3.0-1080p`
- `Kling-3.0-omni-1080p`
- `Vidu-q2-720p`
- `Vidu-q2-turbo-720p`
- `Hailuo-2.3-fast-768p`
- `GV-3.1-1080p`
- `OS-2.0-720p`

Recommended selection logic:

| Scenario | Recommended direction | Why |
| --- | --- | --- |
| General short-form video generation | Vidu or Kling families | Good for prompt-based and single-image video workflows |
| Quality-first output | Higher-tier Kling models | Better when resolution and motion quality matter more |
| Speed-first generation | `Vidu-q2-turbo-*`, `Hailuo-2.3-fast-*` | Better for fast iteration and bulk draft generation |
| Asset remix workflows | `/v1/video/generations` style models | Better when you already have footage or product materials |

### Image models

The current image references indicate support for model directions such as:

- `GEM 2.5`
- `GEM 3.0`
- `GEM 3.1`
- Vidu q2 image capability

Recommended selection logic:

| Scenario | Recommended direction | Why |
| --- | --- | --- |
| Standard image generation | GEM family | Best for posters, covers, key visuals, and product imagery |
| Multi-reference image workflows | GEM 3.0 or 3.1 | Supports more reference images in one request |
| Video-aligned visual workflows | Vidu q2 | Useful when you want image and video workflows to stay aligned |

### Speech models

For standard TTS, prefer:

- `seed-tts-1.0`

For Gemini-style speech requests, use:

- `gemini-2.5-flash-preview-tts`

## Parameter and Constraint Guidance

### Video

- `seconds` is required and allowed ranges depend on the target model
- the public `/v1/videos/generations` example uses a single `image` URL for reference-video generation
- some account-specific or remix-style flows may use `images` arrays, and those should still be public `http(s)` URLs
- `videos` only supports public `http(s)` URLs and is only available for part of the model set
- Common `metadata` fields include:
  - `aspect_ratio`
  - `negative_prompt`
  - `enhance_prompt`
  - `input_region`
  - `output_config`

### Image

- Vidu q2 supports up to `7` reference images
- GEM 2.5 supports `0-3` images
- GEM 3.0 and 3.1 support `0-14` images
- Common aspect ratios include:
  - `16:9`
  - `9:16`
  - `1:1`
  - `4:3`
  - `3:4`
  - `3:2`
  - `2:3`
  - `21:9`

### TTS

- API: `/v1/audio/speech`
- Common fields:
  - `model`
  - `voice`
  - `input`
  - `response_format`
  - `speed`

## TTS Voice Suggestions

These voice IDs are good starting points for automatic recommendation:

| Scenario | Suggested voice | Voice ID |
| --- | --- | --- |
| Business intro male voice | Warm Alvin | `zh_male_wennuanahu_moon_bigtts` |
| Youthful explainer male voice | Sunny Youth | `zh_male_yangguangqingnian_moon_bigtts` |
| Mature steady male voice | Bay Area Uncle | `zh_female_wanqudashu_moon_bigtts` |
| Soft female voice | Gentle Xiaoya | `zh_female_wenrouxiaoya_moon_bigtts` |
| Cool mature female style | Cool Yujie | `zh_female_gaolengyujie_moon_bigtts` |
| English female voice | Anna | `en_female_anna_mars_bigtts` |
| English male voice | Adam | `en_male_adam_mars_bigtts` |

Recommendation notes:

- Use neutral, clear voices for tutorials and technical explainers
- Use more expressive voices for brand, promo, or storytelling content
- For English content, prefer native English voice IDs instead of cross-language voices

## API Mapping Guidance

### Video generation

- Use `/v1/videos/generations` first for standard text-to-video and image-to-video flows
- Use `/v1/video/generations` when the request is centered on existing `video_url` input, product assets, or remix workflows
- For async video tasks, continue with the task lookup flow returned by the relevant interface

### Image generation

- Use `/v1/images/generations` for standard image workflows
- Switch to `/v1beta/models/*image*:generateContent` only when you need Gemini-compatible request formats

### Audio generation

- Use `/v1/audio/speech` for standard TTS
- Switch to `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent` only when you need Gemini-style speech payloads

## Recommendations

- Keep model names aligned with the models actually enabled on your OmniRouters account
- Use stable public URLs for image and video assets
- Define aspect ratio, duration, and output format up front to reduce failed retries
- For TTS, explicitly pass `voice`, `response_format`, and `speed`
- In production, retain task IDs, original payloads, and output records for troubleshooting

## Related Links

- [API Reference](/api/)
- [Support](/guide/getting-started)
- [Business](/guide/structure)
