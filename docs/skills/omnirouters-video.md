# OmniRouters Video

面向 OmniRouters 视频生成、图生视频和素材重组场景的专用 Skill。

## 源码 / 下载

- [查看源码](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-video)
- [下载 Skill 压缩包](/downloads/omnirouters-video-skill.zip)
- [查看 `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-video/SKILL.md)

## 适用场景

- 文生视频
- 图生视频
- 基于现有视频或商品素材做重组
- 选择 `/v1/videos/generations` 和 `/v1/video/generations`

## 默认路由

- 文本或图片驱动的视频生成 -> `/v1/videos/generations`
- 素材重组视频 -> `/v1/video/generations`
- 任务查询 -> 对应的 `.../{task_id}` 路径

## 模型方向

- Kling
- Vidu
- Hailuo
- GV
- OS

## 直接执行

下载 Skill 压缩包后，可以直接运行内置的 Node 脚本：

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-standard-video.mjs \
  --prompt "一个有电影感的产品短片，镜头缓慢推进" \
  --model doubao-seedance-1-5-pro-251215 \
  --duration 5 \
  --ratio 16:9 \
  --poll

node scripts/create-remix-video.mjs \
  --video-url https://example.com/source.mp4 \
  --images https://example.com/product.png \
  --prompt "保留原视频节奏，替换成新的商品主体" \
  --poll

node scripts/get-task.mjs --task-id your_task_id --route standard
```

如果你只想先检查最终请求体，可以加 `--dry-run`。

## 相关链接

- [OmniRouters Generation](/zh/skills/omnirouters-generation)
- [API参考](/zh/api/)
