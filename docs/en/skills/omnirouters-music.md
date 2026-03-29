# OmniRouters Music

Focused skill for OmniRouters Suno-based music generation, lyric generation, continuation, and task polling.

## Source / Download

- [View source](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-music)
- [Download skill package](/downloads/omnirouters-music-skill.zip)
- [Open `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-music/SKILL.md)

## Best for

- create a song
- generate lyrics first
- continue from an existing clip
- choose a Suno `mv` version
- fetch task results

## Default routing

- song generation -> `/suno/submit/music`
- lyric generation -> `/suno/submit/lyrics`
- task polling -> `/suno/fetch/{task_id}`

## Version examples

- `chirp-v3.0`
- `chirp-v3.5`
- `chirp-v4`
- `chirp-auk`
- `chirp-bluejay`
- `chirp-crow`

## Direct execution

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-music.mjs \
  --prompt "[Verse]\nCity lights shimmer tonight" \
  --mv chirp-crow \
  --poll

node scripts/create-lyrics.mjs --prompt "dream pop song about the ocean"

node scripts/get-task.mjs --task-id your_task_id
```

Use `--gpt-description-prompt` when you want inspiration mode instead of a fully custom lyric block.

`chirp-crow` is the current v5-style identifier verified in live task results.

## Related Links

- [OmniRouters Generation](/skills/omnirouters-generation)
- [API Reference](/api/)
