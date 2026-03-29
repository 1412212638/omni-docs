# Image Reference

## Scope

Use this reference when the task is about OmniRouters image generation or image-model selection.

Primary paths:

- `POST /v1/images/generations`
- `POST /v1beta/models/gemini-2.5-flash-image:generateContent`
- `POST /v1beta/models/gemini-3-pro-image-preview:generateContent`
- `POST /v1beta/models/gemini-3.1-flash-image-preview:generateContent`

## Recommended Routing

- Standard text-to-image or reference-to-image -> `/v1/images/generations`
- Gemini-compatible image payloads -> `...:generateContent`

## Models Seen In Current References

- `doubao-seedream-4-5-251128`
- `gemini-2.5-flash-image`
- `gemini-3-pro-image-preview`
- `gemini-3.1-flash-image-preview`
- GEM 2.5 / 3.0 / 3.1 family references
- Vidu q2 image capability references

## Standard Image Request Shape

```json
{
  "model": "doubao-seedream-4-5-251128",
  "prompt": "Generate a joyful amusement park poster",
  "image": [
    "https://example.com/reference-1.png",
    "https://example.com/reference-2.png"
  ],
  "response_format": "url",
  "size": "4K",
  "stream": true,
  "watermark": true
}
```

## Gemini-Compatible Request Shape

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Generate an image of a beautiful sunset over mountains"
        }
      ]
    }
  ],
  "generationConfig": {
    "responseModalities": ["TEXT", "IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9"
    }
  }
}
```

## Current Image Count Guidance

From the image parameter notes:

- `GEM 2.5`: `0-3` images
- `GEM 3.0`: `0-14` images
- `GEM 3.1`: `0-14` images
- `Vidu q2`: `0-7` images

For Vidu q2 reference images:

- supported formats: `png`, `jpeg`, `jpg`, `webp`
- minimum size: `128x128`
- aspect ratio must remain below extreme bounds such as `1:4` or `4:1`

## Aspect Ratio Guidance

### GEM

- `1:1`
- `3:2`
- `2:3`
- `3:4`
- `4:3`
- `4:5`
- `5:4`
- `9:16`
- `16:9`
- `21:9`

### Hunyuan

- `16:9`
- `9:16`
- `1:1`
- `4:3`
- `3:4`
- `3:2`
- `2:3`
- `21:9`

### Vidu

- `16:9`
- `9:16`
- `1:1`
- `3:4`
- `4:3`
- `21:9`
- `2:3`
- `3:2`

### Kling

- `16:9`
- `9:16`
- `1:1`
- `4:3`
- `3:4`
- `3:2`
- `2:3`
- `21:9`

### Qwen

- not supported in the cited image note

## Best Practices

- Prefer the standard `/v1/images/generations` path unless the user explicitly needs Gemini-compatible request shape
- Keep prompts concise and goal-oriented
- Call out image-count limits when users provide many references
- Mention `response_format`, `size`, `stream`, and `watermark` only when helpful
- If model availability may differ by account, say that explicitly
