---
name: omnirouters-video
description: Use when a user wants to generate, transform, or document video workflows on OmniRouters. This skill maps prompt-only, image-to-video, and asset-remix requests to the correct OmniRouters video endpoints, suggests suitable model families such as Kling, Vidu, Hailuo, GV, or OS, and explains the required fields and polling flow.
---

# OmniRouters Video

## When to use

Use this skill for OmniRouters video work, especially when the user wants to:

- generate a video from a text prompt
- animate one or more reference images
- remix an existing video with new product assets
- choose between `/v1/videos/generations` and `/v1/video/generations`
- write docs, examples, or SDK snippets for OmniRouters video APIs

## Workflow

1. Read `references/video.md`.
2. Classify the request:
   - prompt-only
   - image-to-video
   - multi-image video
   - asset remix
3. Recommend:
   - endpoint
   - model family
   - minimal payload
   - required constraints such as `seconds`, image limits, and URL-only inputs
4. If the endpoint is async, explain how to poll the task result.

## Default routing

- prompt-only or image-to-video -> `/v1/videos/generations`
- remix based on `video_url`, product images, or source footage -> `/v1/video/generations`
- task lookup -> matching `.../{task_id}` route

## Output format

When answering, include:

- best endpoint
- suggested model family
- example request body
- key limits
- next-step polling path

## Guardrails

- Keep model names exact
- `images` and `videos` should be public `http(s)` URLs where required
- Do not suggest unsupported fields or base64 video asset inputs
- Mention account-specific model availability when relevant

## Reference

- `references/video.md`
