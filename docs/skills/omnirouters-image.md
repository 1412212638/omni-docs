# OmniRouters Image

面向 OmniRouters 图片生成和 Gemini 兼容图片请求的专用 Skill。

## 源码 / 下载

- [查看源码](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-image)
- [下载 Skill 压缩包](/downloads/omnirouters-image-skill.zip)
- [查看 `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-image/SKILL.md)

## 适用场景

- 文生图
- 参考图生图
- Gemini 兼容图片请求
- 图片模型和宽高比选择

## 默认路由

- 常规图片生成 -> `/v1/images/generations`
- Gemini 兼容图片请求 -> `/v1beta/models/*image*:generateContent`

## 模型方向

- Seedream
- GEM
- Gemini Image
- Vidu 图片工作流

## 直接执行

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/create-image.mjs \
  --prompt "一张干净的产品主视觉，棚拍柔光背景" \
  --model doubao-seedream-4-5-251128 \
  --size 4K

node scripts/create-gemini-image.mjs \
  --text "生成一张日落下的未来城市海报" \
  --model gemini-2.5-flash-image
```

如果你已经有完整请求体，也可以直接传 `--payload-file payload.json`。

## 相关链接

- [OmniRouters Generation](/zh/skills/omnirouters-generation)
- [API参考](/zh/api/)
