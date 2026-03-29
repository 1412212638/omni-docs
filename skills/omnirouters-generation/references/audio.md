# Audio Reference

## Scope

Use this reference for OmniRouters text-to-speech and Gemini-style speech generation tasks.

Primary paths:

- `POST /v1/audio/speech`
- `POST /v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## Recommended Routing

- Standard TTS -> `/v1/audio/speech`
- Gemini-compatible speech request shape -> `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## Standard TTS Request Shape

```json
{
  "model": "seed-tts-1.0",
  "voice": "zh_male_wennuanahu_moon_bigtts",
  "input": "Welcome to OmniRouters.",
  "response_format": "mp3",
  "speed": 1
}
```

## Important Standard TTS Fields

- `model`
- `voice`
- `input`
- `response_format`
- `speed`

Optional structured metadata currently shown in the public spec:

- `metadata.doubao_tts.enable_timestamp`
- `metadata.doubao_tts.emotion`
- `metadata.doubao_tts.volume_ratio`
- `metadata.doubao_tts.pitch_ratio`

Important note from the current API reference:

- voice timbre used in `seed-tts-1.0` and `seed-tts-2.0` must match the corresponding version
- `speed` should be sent as a numeric value such as `1`, not a string such as `"1"`

## Gemini-Compatible Speech

Use the Gemini-style endpoint only when the user or integration explicitly expects Gemini request shape.

Current example model in the public spec:

- `gemini-2.5-flash-preview-tts`

## Voice Suggestions

These are good default suggestions for product demos, onboarding, and general narration:

| Scenario | Display name | Voice ID |
| --- | --- | --- |
| Warm Chinese male intro | 温暖阿虎 / Alvin | `zh_male_wennuanahu_moon_bigtts` |
| Youthful Chinese explainer | 阳光青年 | `zh_male_yangguangqingnian_moon_bigtts` |
| Mature Chinese narration | 湾区大叔 | `zh_female_wanqudashu_moon_bigtts` |
| Gentle Chinese female narration | 温柔小雅 | `zh_female_wenrouxiaoya_moon_bigtts` |
| Cool mature female style | 高冷御姐 | `zh_female_gaolengyujie_moon_bigtts` |
| English female voice | Anna | `en_female_anna_mars_bigtts` |
| English male voice | Adam | `en_male_adam_mars_bigtts` |
| English female voice | Sarah | `en_female_sarah_mars_bigtts` |

## Recommendation Heuristics

- Tutorials and technical explainers -> neutral, clear voices
- Brand intros and product demos -> warmer or more expressive voices
- English content -> use native English voice IDs
- If emotion is relevant, mention it explicitly in the TTS metadata guidance

## Best Practices

- Always include both the human-readable voice label and the exact `voice` ID
- Keep `response_format` explicit in example payloads
- Mention speed only when the user has pacing requirements
- If the user asks for timestamps, mention `enable_timestamp`
