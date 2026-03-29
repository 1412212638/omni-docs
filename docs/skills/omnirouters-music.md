# OmniRouters Music

面向 OmniRouters Suno 音乐生成、歌词生成、续写与任务查询的专用 Skill。

## 源码 / 下载

- [查看源码](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-music)
- [下载 Skill 压缩包](/downloads/omnirouters-music-skill.zip)
- [查看 `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-music/SKILL.md)

## 适用场景

- 直接生成歌曲
- 先生成歌词再生成歌曲
- 从现有片段继续续写
- 选择 Suno 的 `mv` 版本
- 查询任务结果

## 默认路由

- 生成歌曲 -> `/suno/submit/music`
- 生成歌词 -> `/suno/submit/lyrics`
- 查询任务 -> `/suno/fetch/{task_id}`

## 版本示例

- `chirp-v3.0`
- `chirp-v3.5`
- `chirp-v4`
- `chirp-auk`
- `chirp-bluejay`
- `chirp-crow`

## 直接执行

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-music.mjs \
  --prompt "[Verse]\n城市灯火在夜里闪烁" \
  --mv chirp-v5 \
  --poll

node scripts/create-lyrics.mjs --prompt "写一首关于海洋的 dream pop 歌词"

node scripts/get-task.mjs --task-id your_task_id
```

如果你想走灵感模式，而不是直接提供完整歌词，可以改用 `--gpt-description-prompt`。

## 相关链接

- [OmniRouters Generation](/zh/skills/omnirouters-generation)
- [API参考](/zh/api/)
