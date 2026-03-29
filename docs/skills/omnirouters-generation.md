# OmniRouters Generation

用一个 OmniRouters API Key 统一接入视频、图片和语音生成能力。

::: info
OmniRouters Generation 适合需要统一媒体生成入口的 Agent、Workflow、脚本工具和第三方 Skill 系统。你可以基于同一套凭证，将视频生成、图片生成和 TTS 语音能力收敛到一套路由与参数决策逻辑中。
:::

## 源码 / 下载

- [查看源码](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters-generation)
- [下载 Skill 压缩包](/downloads/omnirouters-generation-skill.zip)
- [查看 `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters-generation/SKILL.md)

## 环境说明

推荐使用以下环境变量：

- `OMNIROUTERS_API_KEY`：必填
- `OMNIROUTERS_BASE_URL`：可选，默认 `https://omnirouters.com`

统一认证方式：

- `Authorization: Bearer <OMNIROUTERS_API_KEY>`

当前对外说明以 [API参考](/zh/api/) 为准。

## 直接执行

Skill 压缩包已包含可执行的 Node 脚本：

```bash
export OMNIROUTERS_API_KEY=your_key

node scripts/run-generation.mjs \
  --media video \
  --prompt "一个未来感的 16:9 产品宣传片" \
  --model Vidu-q2-turbo-720p \
  --seconds 5 \
  --poll

node scripts/run-generation.mjs \
  --media image \
  --prompt "一张赛博城市海报" \
  --size 4K

node scripts/run-generation.mjs \
  --media speech \
  --input "欢迎使用 OmniRouters。" \
  --voice en_female_anna_mars_bigtts \
  --output welcome.mp3
```

如需只检查最终请求体，可加 `--dry-run`。如需查询任务结果，可用 `node scripts/get-task.mjs --task-id ... --family video-standard`。

## 支持的生成类型

### 视频生成

| 类型 | 触发条件 | 接口 | 说明 |
| --- | --- | --- | --- |
| 文生视频 | 纯文字描述 | `/v1/videos` | 适合常规短视频生成 |
| 图生视频 | 单张参考图 + 动作描述 | `/v1/videos` | 适合把静态图做成短视频 |
| 多图参考视频 | 多张参考图 | `/v1/videos` | 适合多主体、多镜头或镜头切换类视频 |
| 素材重组视频 | 提供源视频、商品图或素材图 | `/v1/video/generations` | 适合广告改编、素材替换和重组 |

### 图片生成

| 类型 | 触发条件 | 接口 | 说明 |
| --- | --- | --- | --- |
| 文生图 | 纯文字描述 | `/v1/images/generations` | 适合海报、封面、KV 和产品图 |
| 参考生图 | 一张或多张参考图 | `/v1/images/generations` | 适合风格迁移和参考图生成 |
| Gemini 图片生成 | 指定 Gemini 兼容格式 | `/v1beta/models/*image*:generateContent` | 适合已有 Gemini 风格集成 |

### 语音生成

| 类型 | 触发条件 | 接口 | 说明 |
| --- | --- | --- | --- |
| TTS 语音合成 | 配音、朗读、播报 | `/v1/audio/speech` | 支持音色、语速与输出格式 |
| Gemini-TTS | 指定 Gemini 兼容格式 | `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent` | 适合 Gemini 风格语音调用 |

## 参数与约束建议

### 视频

- 常规视频生成优先使用 `/v1/videos`
- 素材改编、`video_url` 驱动场景优先使用 `/v1/video/generations`
- `seconds` 为必填字段
- 标准 `/v1/videos` 流程可以使用单个 `image` URL 作为参考图
- 多图场景通常使用 `images` 数组，并要求公网 `http(s)` URL
- 常见 `metadata` 包括：
  - `aspect_ratio`
  - `enhance_prompt`
  - `input_region`
  - `output_config`

### 图片

- 常规图片生成优先使用 `/v1/images/generations`
- 仅在需要 Gemini 兼容请求格式时切到 `/v1beta/models/*image*:generateContent`

### TTS

- 标准 TTS 接口为 `/v1/audio/speech`
- 常见字段包括 `model`、`voice`、`input`、`response_format`、`speed`
- `speed` 必须传数值，例如 `1`，不要传字符串 `"1"`

## 模型建议

### 视频模型

- `Kling-3.0-1080p`
- `Kling-3.0-omni-1080p`
- `Vidu-q2-720p`
- `Vidu-q2-turbo-720p`
- `Hailuo-2.3-fast-768p`
- `GV-3.1-1080p`
- `OS-2.0-720p`

推荐逻辑：

- 通用短视频：Vidu / Kling
- 质量优先：高规格 Kling
- 速度优先：`Vidu-q2-turbo-*`、`Hailuo-2.3-fast-*`
- 素材改编：使用 `/v1/video/generations` 对应工作流

### 语音音色建议

| 场景 | 推荐音色 | Voice ID |
| --- | --- | --- |
| 商务介绍男声 | 温暖阿虎 | `zh_male_wennuanahu_moon_bigtts` |
| 青年讲解男声 | 阳光青年 | `zh_male_yangguangqingnian_moon_bigtts` |
| 温柔女声 | 温柔小雅 | `zh_female_wenrouxiaoya_moon_bigtts` |
| 英文女声 | Anna | `en_female_anna_mars_bigtts` |
| 英文男声 | Adam | `en_male_adam_mars_bigtts` |

## 使用建议

- 先确认模型名与账号侧实际开通保持一致
- 图片和视频素材尽量使用稳定可访问的公网 URL
- 生成前先明确时长、比例和输出格式，减少重复重试
- TTS 请求建议显式传入 `voice`、`response_format` 和数值型 `speed`
- 生产环境建议保留任务 ID、原始请求和输出记录，便于排查

## 相关链接

- [API参考](/zh/api/)
- [技术支持](/zh/guide/getting-started)
- [商务合作](/zh/guide/structure)
