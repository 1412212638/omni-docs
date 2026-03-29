# OmniRouters Speech

Focused skill for OmniRouters text-to-speech and Gemini-compatible speech generation.

## Source / Download

- [View source](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-speech)
- [Download skill package](/downloads/omnirouters-speech-skill.zip)
- [Open `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-speech/SKILL.md)

## Best for

- text-to-speech
- voice selection
- speed and format control
- timestamp and emotion metadata

## Default routing

- standard TTS -> `/v1/audio/speech`
- Gemini-compatible speech -> `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## Good voice defaults

- Warm Alvin
- Sunny Youth
- Gentle Xiaoya
- Anna
- Adam

## Direct execution

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-speech.mjs \
  --input "Welcome to OmniRouters. Your request has been received." \
  --voice en_female_anna_mars_bigtts \
  --response-format mp3 \
  --output welcome.mp3

node scripts/create-gemini-speech.mjs \
  --input "Please say hello in a calm voice." \
  --voice-name Kore
```

Use `--dry-run` to inspect the request before you submit it.

Pass `speed` as a number, for example `1`, not as a quoted string.

## Related Links

- [OmniRouters Generation](/skills/omnirouters-generation)
- [API Reference](/api/)
