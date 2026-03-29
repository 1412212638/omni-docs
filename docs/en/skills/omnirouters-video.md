# OmniRouters Video

Focused skill for OmniRouters video generation, image-to-video, and asset remix workflows.

## Source / Download

- [View source](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-video)
- [Download skill package](/downloads/omnirouters-video-skill.zip)
- [Open `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-video/SKILL.md)

## Best for

- text-to-video
- image-to-video
- remixing existing footage with new assets
- choosing between `/v1/videos` and `/v1/video/generations`

## Default routing

- prompt-only or image-based generation -> `/v1/videos`
- asset remix -> `/v1/video/generations`
- task lookup -> matching `.../{task_id}` route

## Model families

- Kling
- Vidu
- Hailuo
- GV
- OS

## Direct execution

After downloading the skill package, you can run the bundled Node scripts directly:

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-standard-video.mjs \
  --prompt "A cinematic product teaser with soft camera motion" \
  --model Vidu-q2-turbo-720p \
  --seconds 5 \
  --aspect-ratio 16:9 \
  --poll

node scripts/create-remix-video.mjs \
  --video-url https://example.com/source.mp4 \
  --images https://example.com/product.png \
  --prompt "Keep the original pacing and replace the product shots" \
  --poll

node scripts/get-task.mjs --task-id your_task_id --route standard
```

Use `--dry-run` if you want to inspect the final request without sending it.

For the standard route, the bundled script now targets the verified `/v1/videos` path.

## Related Links

- [OmniRouters Generation](/skills/omnirouters-generation)
- [API Reference](/api/)
