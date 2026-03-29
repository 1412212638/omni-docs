# OmniRouters Speech Reference

Primary paths:

- `POST /v1/audio/speech`
- `POST /v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

Recommended routing:

- standard TTS -> `/v1/audio/speech`
- Gemini-compatible speech -> `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

Standard TTS fields:

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

Important note:

- voice timbres in `seed-tts-1.0` and `seed-tts-2.0` should match the corresponding version

Current standard model direction:

- `seed-tts-1.0`

Current Gemini-style model example:

- `gemini-2.5-flash-preview-tts`

Suggested voices:

- 温暖阿虎 / Alvin -> `zh_male_wennuanahu_moon_bigtts`
- 阳光青年 -> `zh_male_yangguangqingnian_moon_bigtts`
- 湾区大叔 -> `zh_female_wanqudashu_moon_bigtts`
- 温柔小雅 -> `zh_female_wenrouxiaoya_moon_bigtts`
- 高冷御姐 -> `zh_female_gaolengyujie_moon_bigtts`
- Anna -> `en_female_anna_mars_bigtts`
- Adam -> `en_male_adam_mars_bigtts`
- Sarah -> `en_female_sarah_mars_bigtts`

Recommendation heuristics:

- tutorials -> neutral and clear voices
- promos -> warmer or more expressive voices
- English text -> prefer native English voices
