---
name: omnirouters-image
description: Use when a user wants to generate, document, or troubleshoot OmniRouters image workflows. This skill maps prompt-based, reference-based, and Gemini-compatible image requests to the correct OmniRouters image endpoints and helps choose the right model family and request shape.
---

# OmniRouters Image

## When to use

Use this skill for OmniRouters image tasks, especially when the user wants to:

- generate posters, covers, product shots, or key visuals
- use one or more reference images
- choose between standard OmniRouters image APIs and Gemini-compatible image APIs
- write docs, examples, or integration snippets for image generation

## Workflow

1. Read `references/image.md`.
2. Classify the request:
   - text-to-image
   - reference-to-image
   - Gemini-compatible image request
3. Recommend:
   - endpoint
   - model family
   - minimal payload
   - image-count and aspect-ratio constraints

## Scripts

Prefer the bundled scripts when the user wants to actually submit or inspect requests:

- `scripts/create-image.mjs` for `/v1/images/generations`
- `scripts/create-gemini-image.mjs` for Gemini-compatible image requests

## Default routing

- standard image generation -> `/v1/images/generations`
- Gemini-compatible request shape -> `/v1beta/models/*image*:generateContent`

## Output format

Include:

- best endpoint
- suggested model family
- example payload
- reference-image limits
- aspect-ratio guidance

## Guardrails

- Keep model names exact
- Do not invent unsupported aspect ratios
- Mention image-count limits when the user passes many references
- Call out account-specific model availability when needed

## Reference

- `references/image.md`
