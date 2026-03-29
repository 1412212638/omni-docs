# OmniRouters Speech

面向 OmniRouters 文本转语音和 Gemini 兼容语音请求的专用 Skill。

## 源码 / 下载

- [查看源码](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-speech)
- [下载 Skill 压缩包](/downloads/omnirouters-speech-skill.zip)
- [查看 `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-speech/SKILL.md)

## 适用场景

- 文本转语音
- 音色选择
- 语速和输出格式控制
- 时间戳和情绪参数

## 默认路由

- 标准 TTS -> `/v1/audio/speech`
- Gemini 兼容语音请求 -> `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## 推荐默认音色

- 温暖阿虎
- 阳光青年
- 温柔小雅
- Anna
- Adam

## 直接执行

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-speech.mjs \
  --input "欢迎使用 OmniRouters，您的请求已经收到。" \
  --voice zh_male_wennuanahu_moon_bigtts \
  --response-format mp3 \
  --output welcome.mp3

node scripts/create-gemini-speech.mjs \
  --input "请用平静的语气说一句你好。" \
  --voice-name Kore
```

如需先检查请求而不真正发送，可以加 `--dry-run`。

`speed` 需要传数值，例如 `1`，不要传字符串 `"1"`。

## 相关链接

- [OmniRouters Generation](/zh/skills/omnirouters-generation)
- [API参考](/zh/api/)
