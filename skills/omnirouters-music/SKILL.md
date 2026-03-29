---
name: omnirouters-music
description: Use when a user wants to generate, extend, splice, or document OmniRouters music workflows, especially Suno-based creation. This skill maps song generation, lyric generation, continuation, clip stitching, and task polling to the correct OmniRouters Suno endpoints and explains model versions, request modes, and output handling.
---

# OmniRouters Music

## When to use

Use this skill for OmniRouters music tasks, especially when the user wants to:

- generate a full song
- generate lyrics first and then create music
- continue an existing song from a timestamp
- stitch or infill music clips
- choose a Suno model version
- write docs, payload examples, or integration guides for Suno-based music workflows

## Workflow

1. Read `references/music.md`.
2. Classify the task:
   - song generation
   - lyric generation
   - continuation
   - clip stitching
   - task polling
3. Recommend:
   - endpoint
   - model version
   - minimal payload
   - polling or callback strategy

## Scripts

Prefer the bundled scripts when the user wants to actually submit or inspect requests:

- `scripts/create-music.mjs` for `/suno/submit/music`
- `scripts/create-lyrics.mjs` for `/suno/submit/lyrics`
- `scripts/get-task.mjs` for `/suno/fetch/{task_id}`

## Default routing

- create music -> `/suno/submit/music`
- create lyrics -> `/suno/submit/lyrics`
- fetch task -> `/suno/fetch/{task_id}`

## Output format

Include:

- best endpoint
- suggested `mv`
- example payload
- task polling guidance
- expected result fields such as `audio_url`, `image_url`, and `video_url`

## Guardrails

- Keep Suno `mv` values exact
- Distinguish inspiration mode from custom mode
- Mention when continuation needs `task_id`, `continue_at`, and `continue_clip_id`
- Mention that polling every `2-5` seconds is the safer default when no callback is used

## Reference

- `references/music.md`
