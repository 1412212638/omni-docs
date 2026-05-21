---
title: Omni-Image API
---

# Omni-Image API

Omni-Image 是 OmniRouters 上的图片生成统一入口，适合文生图、参考图生图、图像编辑和 Gemini 图片协议兼容场景。

这页覆盖两个常用入口：

- 标准图片生成：`POST /v1/images/generations`
- Gemini 图片兼容：`POST /v1beta/models/{model}:generateContent`

## 路由

| 场景 | 方法与路径 | 说明 |
| --- | --- | --- |
| 标准图片生成 | `POST https://omnirouters.com/v1/images/generations` | 推荐用于文生图、参考图生图和大多数图片任务。 |
| Gemini 图片生成 | `POST https://omnirouters.com/v1beta/models/{model}:generateContent` | 适合保留 Gemini `contents` / `parts` 请求结构。 |

Gemini 图片模型常见路径示例：

| 模型 | 路径 |
| --- | --- |
| `gemini-2.5-flash-image` | `/v1beta/models/gemini-2.5-flash-image:generateContent` |
| `gemini-3-pro-image-preview` | `/v1beta/models/gemini-3-pro-image-preview:generateContent` |
| `gemini-3.1-flash-image-preview` | `/v1beta/models/gemini-3.1-flash-image-preview:generateContent` |

## 认证

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## 标准图片生成

### 最小示例

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "生成女孩和奶牛玩偶在游乐园开心地坐过山车的图片",
    "response_format": "url",
    "size": "4K",
    "stream": false,
    "watermark": false
  }'
```

### 参考图生图

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedream-4-5-251128",
    "prompt": "保持人物主体一致，生成一张干净的产品主视觉，棚拍柔光背景",
    "image": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimages_1.png",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimages_2.png"
    ],
    "response_format": "url",
    "size": "4K",
    "watermark": false
  }'
```

## 标准请求体参数

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 图片模型名称，例如 `doubao-seedream-4-5-251128`、`gemini-2.5-flash-image` 或平台模型目录中的图片模型。 |
| `prompt` | string | 是 | 图片生成提示词。建议明确主体、风格、构图、背景、光线、文字要求和限制。 |
| `image` | string[] | 否 | 参考图片 URL 列表。只传公网可访问的 `http://` 或 `https://` 地址。 |
| `response_format` | string | 否 | 响应格式。常见值：`url`、`b64_json`。默认建议使用 `url`。 |
| `size` | string | 否 | 图片尺寸或清晰度档位，例如 `1K`、`2K`、`3K`、`4K`。支持范围取决于模型。 |
| `stream` | boolean | 否 | 是否启用流式返回。生成时间较长或需要渐进结果时可开启。 |
| `watermark` | boolean | 否 | 是否添加水印。生产环境按业务要求设置。 |
| `metadata` | object | 否 | 模型扩展参数。部分模型会通过这里接收 `aspect_ratio`、合规检查等配置。 |

## 图片数量和格式限制

| 模型方向 | 参考图数量 | 说明 |
| --- | --- | --- |
| GEM 2.5 | `0-3` 张 | 支持文生图和参考图生成。 |
| GEM 3.0 | `0-14` 张 | 适合多参考图工作流。 |
| GEM 3.1 | `0-14` 张 | 适合多参考图工作流。 |
| Vidu q2 | `0-7` 张 | 支持 `png`、`jpeg`、`jpg`、`webp`；图片像素不小于 `128x128`；避免超过 `1:4` 或 `4:1` 的极端比例。 |
| Kling 2.1 | 最多 4 张 | 常见输出档位为 1K / 2K。 |
| Kling 3.0 / 3.0-Omni | 通常最多 1 张 | Omni 方向可支持更高输出档位，具体以模型说明为准。 |
| Seedream 4.x / 5.x | 以模型说明为准 | 通常以 prompt 和 `size` 控制输出，部分模型支持 2K / 4K。 |

## 宽高比

如果模型支持宽高比控制，可在模型约定字段中传入，例如 `metadata.aspect_ratio`、`aspect_ratio` 或模型专属参数。常见范围如下：

| 模型方向 | 支持的宽高比 |
| --- | --- |
| GEM | `1:1`、`3:2`、`2:3`、`3:4`、`4:3`、`4:5`、`5:4`、`9:16`、`16:9`、`21:9` |
| Hunyuan | `16:9`、`9:16`、`1:1`、`4:3`、`3:4`、`3:2`、`2:3`、`21:9` |
| Vidu | `16:9`、`9:16`、`1:1`、`3:4`、`4:3`、`21:9`、`2:3`、`3:2` |
| Kling | `16:9`、`9:16`、`1:1`、`4:3`、`3:4`、`3:2`、`2:3`、`21:9` |
| Qwen | 暂不建议传宽高比参数，除非具体模型说明支持。 |

## 合规检查

部分图片模型支持输入/输出合规检查开关：

| 字段 | 可选值 | 说明 |
| --- | --- | --- |
| `InputComplianceCheck` | `Enabled` / `Disabled` | 是否开启输入内容合规检查。 |
| `OutputComplianceCheck` | `Enabled` / `Disabled` | 是否开启输出内容合规检查。 |

如果通过 `metadata` 传递，常见结构如下：

```json
{
  "metadata": {
    "InputComplianceCheck": "Enabled",
    "OutputComplianceCheck": "Enabled"
  }
}
```

## 标准响应体

非流式请求通常返回图片结果对象。实际字段可能随模型不同而变化，常见结构如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `created` | integer | 创建时间，Unix 秒级时间戳。 |
| `data` | array | 图片结果数组。 |
| `data[].url` | string | 图片 URL。`response_format=url` 时常见。 |
| `data[].b64_json` | string | base64 图片内容。`response_format=b64_json` 时常见。 |
| `data[].revised_prompt` | string | 模型改写后的提示词。只有部分模型返回。 |
| `id` / `task_id` | string | 如果模型以异步任务形式返回，可能出现任务 ID。 |
| `status` | string | 异步任务状态。 |
| `error` | object 或 string | 错误信息。 |

当 `stream: true` 时，可能返回 SSE 增量事件。客户端应按事件类型累积图片结果或进度信息。

## Gemini 图片兼容请求

Gemini 图片接口使用 `contents` / `parts` 结构。文本使用 `text`，本地或二进制图片建议转为 `inlineData` 的 base64。

```bash
curl https://omnirouters.com/v1beta/models/gemini-2.5-flash-image:generateContent \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "生成一张日落下的未来城市海报"
          }
        ]
      }
    ],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "maxOutputTokens": 8192
    }
  }'
```

### Gemini Part 结构

| Part 类型 | 结构 | 说明 |
| --- | --- | --- |
| 文本 | `{ "text": "..." }` | 提示词或指令。 |
| 内联图片 | `{ "inlineData": { "mimeType": "image/png", "data": "..." } }` | base64 图片内容，不要带 `data:image/...;base64,` 前缀。 |
| 文件引用 | `{ "fileData": { "mimeType": "...", "fileUri": "..." } }` | Gemini 原生文件引用。当前 OmniRouters 通用说明中更推荐使用 `inlineData`。 |

## Gemini 图片响应体

Gemini 兼容接口通常返回 `GenerateContentResponse`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `candidates` | array | 候选结果。 |
| `candidates[].content.parts` | array | 输出内容。文本在 `text`，图片通常在 `inlineData` 或模型约定的图片字段中。 |
| `candidates[].finishReason` | string | 结束原因，例如 `STOP`、`MAX_TOKENS`、`SAFETY`。 |
| `promptFeedback` | object | prompt 级安全反馈。 |
| `usageMetadata` | object | token 用量统计。 |

## 常见错误

| 错误 | 排查方向 |
| --- | --- |
| `model is required` | 确认传入模型名，且账号已启用该模型。 |
| `prompt is required` | 标准图片接口必须传入 `prompt`。 |
| `image must be http(s) URLs` | 参考图应使用公网 URL。Gemini 兼容接口如需传本地文件，请使用 `inlineData`。 |
| `aspect_ratio is invalid` | 检查宽高比是否在该模型支持范围内。 |
| `unsupported size` | 检查 `size` 是否在模型支持的档位内。 |

## 相关入口

- [API 参考总览](/zh/api/)
- [Omni-Video API](/zh/api/omni-video)
- [Gemini Generate Content](/zh/api/llm/gemini-generate-content)
- [OmniRouters Image Skill](/zh/skills/omnirouters-image)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
