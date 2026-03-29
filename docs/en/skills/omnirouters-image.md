# OmniRouters Image

Focused skill for OmniRouters image generation and Gemini-compatible image workflows.

## Source / Download

- [View source](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-image)
- [Download skill package](/downloads/omnirouters-image-skill.zip)
- [Open `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-image/SKILL.md)

## Best for

- text-to-image
- reference-to-image
- choosing Gemini-compatible image payloads
- image model and aspect-ratio guidance

## Default routing

- standard image generation -> `/v1/images/generations`
- Gemini-compatible image requests -> `/v1beta/models/*image*:generateContent`

## Model directions

- Seedream
- GEM
- Gemini image
- Vidu image workflows

## Direct execution

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-image.mjs \
  --prompt "A clean product hero shot on a soft studio background" \
  --model doubao-seedream-4-5-251128 \
  --size 4K

node scripts/create-gemini-image.mjs \
  --text "Generate a futuristic city poster at sunset" \
  --model gemini-2.5-flash-image
```

If you already have a full payload, pass `--payload-file payload.json` instead of composing flags manually.

## Related Links

- [OmniRouters Generation](/skills/omnirouters-generation)
- [API Reference](/api/)
