# OmniRouters Image Reference

Primary paths:

- `POST /v1/images/generations`
- `POST /v1beta/models/gemini-2.5-flash-image:generateContent`
- `POST /v1beta/models/gemini-3-pro-image-preview:generateContent`
- `POST /v1beta/models/gemini-3.1-flash-image-preview:generateContent`

Recommended routing:

- standard text-to-image or reference-to-image -> `/v1/images/generations`
- Gemini-compatible image requests -> `...:generateContent`

Model directions seen in current references:

- `doubao-seedream-4-5-251128`
- `gemini-2.5-flash-image`
- `gemini-3-pro-image-preview`
- `gemini-3.1-flash-image-preview`
- GEM 2.5 / 3.0 / 3.1 families
- Vidu q2 image capability

Expanded model notes from the current comparison sheet:

- `Google nano 2.5`: up to 4K, max 3 references
- `Google nano 3.0`: up to 4K, max 14 references
- `Google nano 3.1`: up to 4K, max 14 references, includes very wide/tall ratios
- `Kling 2.1`: 1K / 2K, up to 4 references
- `Kling 3.0`: 1K / 2K, up to 1 reference
- `Kling 3.0-Omni`: 1K / 2K / 4K, up to 1 reference, subject-image support
- `Seedream 4.0`: up to 4K, prompt-driven aspect ratio
- `Seedream 4.5`: 2K / 4K, prompt-driven aspect ratio
- `Seedream 5.0-lite`: 2K / 3K, prompt-driven aspect ratio
- `Jimeng 4.0`: 1024 to 4096 square-ish image range, no aspect-ratio matrix in the sheet
- `Vidu q2`: 1080p / 2K / 4K, up to 7 references

Image count guidance:

- `GEM 2.5`: `0-3`
- `GEM 3.0`: `0-14`
- `GEM 3.1`: `0-14`
- `Vidu q2`: `0-7`

Vidu q2 image rules:

- formats: `png`, `jpeg`, `jpg`, `webp`
- minimum size: `128x128`
- avoid extreme ratios beyond `1:4` or `4:1`

Common aspect ratios:

- GEM: `1:1`, `3:2`, `2:3`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`
- Hunyuan: `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9`
- Vidu: `16:9`, `9:16`, `1:1`, `3:4`, `4:3`, `21:9`, `2:3`, `3:2`
- Kling: `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `21:9`

Useful standard fields:

- `model`
- `prompt`
- `image`
- `response_format`
- `size`
- `stream`
- `watermark`
