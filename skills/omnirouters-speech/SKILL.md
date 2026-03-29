---
name: omnirouters-speech
description: Use when a user wants to generate, document, or troubleshoot OmniRouters text-to-speech workflows. This skill maps standard TTS and Gemini-compatible speech requests to the correct OmniRouters endpoints, recommends voices, and explains payload fields such as voice, speed, format, and timestamp metadata.
---

# OmniRouters Speech

## When to use

Use this skill for OmniRouters speech tasks, especially when the user wants to:

- convert text into speech
- pick a suitable Chinese or English voice
- control speed, format, timestamps, or emotion metadata
- choose between standard TTS and Gemini-compatible speech APIs
- write docs or examples for OmniRouters speech generation

## Workflow

1. Read `references/audio.md`.
2. Decide whether the request should use:
   - standard TTS
   - Gemini-compatible speech
3. Recommend:
   - endpoint
   - model
   - voice
   - minimal payload
   - important metadata fields

## Scripts

Prefer the bundled scripts when the user wants to actually submit or inspect requests:

- `scripts/create-speech.mjs` for `/v1/audio/speech`
- `scripts/create-gemini-speech.mjs` for Gemini-compatible speech requests

## Default routing

- standard TTS -> `/v1/audio/speech`
- Gemini-compatible speech request -> `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## Output format

Include:

- best endpoint
- suggested voice and voice ID
- example payload
- speed / format / metadata notes

## Guardrails

- Always include the exact `voice` ID
- Mention when voice IDs need to match the relevant Seed-TTS version
- Keep emotion and timestamp guidance tied to documented fields

## Reference

- `references/audio.md`
