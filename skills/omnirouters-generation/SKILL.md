---
name: omnirouters-generation
description: Use when a user wants to build, document, or troubleshoot OmniRouters media generation requests, including video, image, and text-to-speech workflows. This skill maps requests to the correct OmniRouters endpoints, helps choose models such as Vidu, Kling, GEM, Seed-TTS, or Gemini-compatible variants, and provides payload guidance, constraints, and follow-up polling flows.
---

# OmniRouters Generation

## When to use

Use this skill when the task involves OmniRouters media generation, especially when the user wants to:

- generate or transform video
- generate images from prompts or references
- synthesize speech with OmniRouters TTS
- choose between standard OmniRouters endpoints and Gemini-compatible endpoints
- write docs, SDK snippets, example payloads, or integration guides for OmniRouters media APIs

Typical user asks that should trigger this skill:

- "Help me call OmniRouters to generate a video"
- "Which OmniRouters endpoint should I use for image generation?"
- "Give me a Seed-TTS example with a warm male voice"
- "Map this product brief to the right OmniRouters model and payload"

## Workflow

1. Identify the target media type.
   - Video -> read `references/video.md`
   - Image -> read `references/image.md`
   - Speech / TTS -> read `references/audio.md`

2. Decide whether the request fits a standard OmniRouters endpoint or a Gemini-compatible endpoint.
   - Standard video/image/TTS should prefer `/v1/...`
   - Gemini-compatible image or speech should prefer `/v1beta/models/...:generateContent`

3. Produce a practical answer.
   Include:
   - endpoint
   - auth format
   - suggested model family
   - minimal example payload
   - key constraints
   - task polling flow when the workflow is async

4. Keep the answer grounded in the references.
   - Do not invent model names
   - Do not invent unsupported fields
   - If enabled models depend on the user's account, say so explicitly

## Scripts

Prefer the bundled scripts when the user wants to actually submit or inspect requests:

- `scripts/run-generation.mjs` for unified video, image, and speech submission
- `scripts/get-task.mjs` for video and music task lookup

## Routing Cheat Sheet

### Video

- Pure prompt -> `/v1/videos/generations`
- Single reference image + motion intent -> `/v1/videos/generations`
- Existing video or product assets for remix / replacement -> `/v1/video/generations`
- Async task lookup -> `/v1/video/generations/{task_id}` or equivalent task query route

### Image

- Standard text-to-image or reference-to-image -> `/v1/images/generations`
- Gemini-style image request shape -> `/v1beta/models/*image*:generateContent`

### Speech

- Standard TTS -> `/v1/audio/speech`
- Gemini-style speech request shape -> `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## Output Template

When answering, prefer this structure:

### 1. Recommendation

- Best endpoint
- Suggested model or model family
- Why that route fits the request

### 2. Request Example

- `Authorization: Bearer <OMNIROUTERS_API_KEY>`
- Minimal JSON body

### 3. Constraints

- required fields
- URL-only or aspect-ratio rules
- duration / image-count / voice caveats

### 4. Next Step

- task polling path for async jobs
- testing advice for first request

## Guardrails

- Video reference `images` and `videos` should be public `http(s)` URLs when the reference says so
- Do not suggest base64 for video asset inputs when the reference says URL-only
- Keep `voice` recommendations human-readable by including both the display name and the voice ID
- For TTS, mention that voice IDs must match the relevant Seed-TTS version when applicable
- If the user asks for a public docs page or skill docs, keep the wording friendly and product-facing
- If the user asks for implementation or SDK help, optimize for exact payload shape and constraints

## References

- Video rules and model families: `references/video.md`
- Image rules and aspect ratios: `references/image.md`
- TTS fields and voice suggestions: `references/audio.md`
