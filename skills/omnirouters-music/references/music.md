# OmniRouters Music Reference

Primary paths:

- `POST /suno/submit/music`
- `POST /suno/submit/lyrics`
- `GET /suno/fetch/{task_id}`

Standard auth:

- `Authorization: Bearer <OMNIROUTERS_API_KEY>`

## Song generation

Common fields from the current references:

- `prompt`
- `mv`
- `title`
- `tags`
- `make_instrumental`
- `task_id`
- `continue_at`
- `continue_clip_id`
- `gpt_description_prompt`
- `notify_hook`

Mode guidance:

- inspiration mode -> use `gpt_description_prompt`
- custom mode -> use `prompt`, `title`, and `tags`
- continuation -> requires `task_id`, `continue_at`, and `continue_clip_id`

## Lyrics generation

Path:

- `POST /suno/submit/lyrics`

Common fields:

- `prompt`
- `notify_hook`

## Clip stitching

Current reference fields:

- `clip_id`
- `is_infill`

## Task querying

Primary query path:

- `GET /suno/fetch/{task_id}`

Reference notes also mention generic task querying concepts such as:

- `ids`
- `action`

Task types seen in current notes:

- `MUSIC`
- `LYRICS`

## Suno model versions

Current `mv` mapping:

- `chirp-v3.0`
- `chirp-v3.5`
- `chirp-v4`
- `chirp-auk`
- `chirp-bluejay`
- `chirp-crow`

Practical version mapping from the local Suno notes:

- `v3.0` -> `chirp-v3.0`
- `v3.5` -> `chirp-v3.5`
- `v4.0` -> `chirp-v4`
- `v4.5` -> `chirp-auk`
- `v4.5+` -> `chirp-bluejay`
- `v5` -> `chirp-crow`

## Typical result fields

Song task results may include:

- `id`
- `title`
- `status`
- `audio_url`
- `image_url`
- `video_url`
- `model_name`
- `major_model_version`

Lyrics task results may include:

- `id`
- `text`
- `title`
- `status`

## Best practices

- For sectioned lyrics, use structures like `[Verse]`, `[Chorus]`, and `[Bridge]`
- Poll every `2-5` seconds when not using `notify_hook`
- Prefer `chirp-crow` when the user asks for the latest v5-style generation
- Use `notify_hook` when you want fewer polling requests
- Explain custom mode and inspiration mode separately so users do not mix the required fields
