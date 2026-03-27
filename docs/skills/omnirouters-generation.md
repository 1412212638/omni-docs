# OmniRouters Generation

使用一套 OmniRouters API Key 调用视频、图片与语音生成能力的统一 Skill。

::: info
OmniRouters Generation 面向需要统一媒体生成入口的 Agent、Workflow、脚本工具和第三方 Skill 系统。你可以通过一套 OmniRouters 凭证，接入视频生成、图片生成和 TTS 语音合成能力，并根据用户输入自动选择更合适的接口与模型。
:::

## 环境说明

推荐使用以下环境变量：

- `OMNIROUTERS_API_KEY`：OmniRouters API Key，必填
- `OMNIROUTERS_BASE_URL`：可选，默认 `https://omnirouters.com`

请求时统一使用：

- `Authorization: Bearer <OMNIROUTERS_API_KEY>`

平台当前公开接口以 [API参考](/zh/api/) 为准。

## 快速开始

直接告诉我你想生成什么，我会根据输入自动匹配更合适的能力类型：

```text
生成一个 16:9 的产品宣传视频，画面要有科技感
把这张参考图做成 5 秒视频，让人物缓慢转头
基于这段商品素材视频，替换成新的主图和文案
生成一张赛博城市海报
用温暖男声朗读这段欢迎词
```

## 支持的生成类型

### 视频生成

| 类型 | 触发条件 | 接口 | 说明 |
| --- | --- | --- | --- |
| 文生视频 | 纯文字描述 | `/v1/videos/generations` | 适合从文字直接生成短视频 |
| 图生视频 | 单张参考图 + 动作描述 | `/v1/videos/generations` | 适合把图片作为首帧生成短视频 |
| 多图参考视频 | 多张参考图 | `/v1/videos/generations` | 适合多人、多主体或镜头切换类视频 |
| 素材重组视频 | 提供源视频、商品图或素材图 | `/v1/video/generations` | 适合基于现有素材做广告化重组、替换与改编 |

### 图片生成

| 类型 | 触发条件 | 接口 | 说明 |
| --- | --- | --- | --- |
| 文生图 | 纯文字描述 | `/v1/images/generations` | 适合海报、封面、KV、商品图等常规图片生成 |
| 参考生图 | 一张或多张参考图 | `/v1/images/generations` | 适合风格迁移或多图参考生成 |
| Gemini 图片生成 | 指定 Gemini 图片接口格式 | `/v1beta/models/*image*:generateContent` | 适合需要 Gemini 风格接口的集成场景 |

### 音频生成

| 类型 | 触发条件 | 接口 | 说明 |
| --- | --- | --- | --- |
| TTS 语音合成 | 配音、朗读、播报 | `/v1/audio/speech` | 支持指定模型、音色、语速与格式 |
| Gemini-TTS | 指定 Gemini 语音接口格式 | `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent` | 适合 Gemini 风格语音生成请求 |

## 自动识别规则

### 视频生成

```text
用户输入 -> 意图识别
------------------------------
纯文字描述 -> 文生视频
单张图片 + 动作描述 -> 图生视频
多张参考图 -> 多图参考视频
源视频 + 商品图/素材图 -> 素材重组视频
```

### 图片生成

```text
用户输入 -> 意图识别
------------------------------
"生成图片/海报/封面" -> 图片生成模式
纯文字 -> 文生图
参考图 + 风格要求 -> 参考生图
明确指定 Gemini 图片 -> Gemini 图片生成
```

### 音频生成

```text
用户输入 -> 意图识别
------------------------------
"配音/朗读/播报" + 文本 -> TTS 语音合成
明确指定 Gemini 语音 -> Gemini-TTS
```

## 模型选择建议

### 视频模型

根据当前 API 参考，OmniRouters 可覆盖多类视频模型系列，例如：

- `Kling-3.0-1080p`
- `Kling-3.0-omni-1080p`
- `Vidu-q2-720p`
- `Vidu-q2-turbo-720p`
- `Hailuo-2.3-fast-768p`
- `GV-3.1-1080p`
- `OS-2.0-720p`

推荐选择思路：

| 场景 | 推荐方向 | 说明 |
| --- | --- | --- |
| 通用短视频生成 | Vidu / Kling 系列 | 适合从文本或单图快速生成可用视频 |
| 质量优先 | Kling 高规格模型 | 更适合对分辨率和镜头表现要求更高的场景 |
| 速度优先 | `Vidu-q2-turbo-*`、`Hailuo-2.3-fast-*` | 更适合快速验证和批量出稿 |
| 素材改编 | `/v1/video/generations` 对应的素材重组能力 | 更适合已有视频或商品素材的广告化重组 |

### 图片模型

当前图片接口支持的模型方向可包含：

- `GEM 2.5`
- `GEM 3.0`
- `GEM 3.1`
- Vidu q2 图片能力

推荐选择思路：

| 场景 | 推荐方向 | 说明 |
| --- | --- | --- |
| 常规图片生成 | GEM 系列 | 适合海报、KV、商品图等标准场景 |
| 多图参考生成 | GEM 3.0 / 3.1 | 可支持更多参考图输入 |
| Vidu 风格图片工作流 | Vidu q2 | 适合与你的视频工作流保持一致 |

### 语音模型

标准 TTS 建议优先使用：

- `seed-tts-1.0`

如需 Gemini 风格语音请求格式，可使用：

- `gemini-2.5-flash-preview-tts`

## 参数与约束建议

### 视频

- `seconds` 为必填字段，不同模型支持的时长范围不同
- `images` 仅支持公网 `http(s)` URL，不支持单独的 `image` 字段
- `videos` 仅支持公网 `http(s)` URL，且只适用于部分模型
- 常用 `metadata` 字段包括：
  - `aspect_ratio`
  - `negative_prompt`
  - `enhance_prompt`
  - `input_region`
  - `output_config`

### 图片

- Vidu q2 最多支持 `7` 张参考图
- GEM 2.5 支持 `0-3` 张图
- GEM 3.0 / 3.1 支持 `0-14` 张图
- 常用宽高比包括：
  - `16:9`
  - `9:16`
  - `1:1`
  - `4:3`
  - `3:4`
  - `3:2`
  - `2:3`
  - `21:9`

### TTS

- 请求接口：`/v1/audio/speech`
- 常用字段：
  - `model`
  - `voice`
  - `input`
  - `response_format`
  - `speed`

## TTS 音色推荐

以下音色可作为默认推荐起点：

| 场景 | 推荐音色 | Voice ID |
| --- | --- | --- |
| 商务介绍男声 | 温暖阿虎 | `zh_male_wennuanahu_moon_bigtts` |
| 青年男声讲解 | 阳光青年 | `zh_male_yangguangqingnian_moon_bigtts` |
| 成熟沉稳男声 | 湾区大叔 | `zh_female_wanqudashu_moon_bigtts` |
| 温柔女声 | 温柔小雅 | `zh_female_wenrouxiaoya_moon_bigtts` |
| 高冷御姐风格 | 高冷御姐 | `zh_female_gaolengyujie_moon_bigtts` |
| 英文女声 | Anna | `en_female_anna_mars_bigtts` |
| 英文男声 | Adam | `en_male_adam_mars_bigtts` |

使用建议：

- 技术讲解、教程类内容优先选择中性、清晰的音色
- 产品介绍、品牌内容可选择更有情绪色彩的音色
- 英文内容建议直接选择英文 voice，避免跨语种音色失真

## 接口映射建议

### 视频生成

- 常规文生视频、图生视频优先使用 `/v1/videos/generations`
- 当请求围绕现有 `video_url`、商品图、素材图做重组时，优先使用 `/v1/video/generations`
- 对异步视频任务，按返回的任务信息继续轮询查询结果

### 图片生成

- 常规图片生成优先走 `/v1/images/generations`
- 仅在需要 Gemini 兼容格式时，再切换到 `/v1beta/models/*image*:generateContent`

### 音频生成

- 标准文本转语音优先使用 `/v1/audio/speech`
- 仅在需要 Gemini 风格请求格式时，再使用 `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`

## 使用建议

- 先确认模型名称与账户侧实际开放的模型保持一致
- 图片、视频素材建议使用稳定可访问的公网 URL
- 生成前先明确目标宽高比、时长与输出格式，避免重复生成
- TTS 请求建议显式传入 `voice`、`response_format` 和 `speed`
- 生产环境建议保留任务 ID、原始请求和回调结果，便于排查问题

## 相关链接

- [API参考](/zh/api/)
- [技术支持](/zh/guide/getting-started)
- [商务合作](/zh/guide/structure)
