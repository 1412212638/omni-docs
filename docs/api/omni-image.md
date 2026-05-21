---
title: Omni-Image API
---

# Omni-Image API

Omni-Image 是 OmniRouters 上的图片生成入口，用于文生图、图生图、GPT 生图、异步任务生图、多图生成和全景图生成。

本页按飞书接入文档 `2.3 最小可用请求示例` 整理。下面的示例是当前真实可用口径；旧的模型限制和旧参数说明不在本页展开。

## 路由

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `POST` | `https://omnirouters.com/v1/images/generations` | 同步创建图片任务或直接返回图片结果 |
| `POST` | `https://omnirouters.com/v1/images/generations?async=true` | 异步创建图片任务 |
| `GET` | `https://omnirouters.com/v1/images/generations/{task_id}` | 查询异步图片任务 |

Gemini 原生 `contents` / `parts` 格式请看 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)，不放在 Omni-Image 标准创建页里混用。

## 认证

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## 使用方式

同步创建时，直接把对应场景的请求体发送到 `POST /v1/images/generations`。异步创建时，在同一路由后添加 `?async=true`，然后使用返回的 `task_id` 调用查询路由获取结果。

建议异步轮询间隔设置为 5 秒或 10 秒一次。

## 最小可用请求体示例

### 文生图

```json
{
  "model": "Nano-Banana2",
  "resolution": "4K",
  "prompt": "一个女孩在海边回头微笑，电影感光影，高清细节",
  "aspect_ratio": "16:9"
}
```

### 图生图

```json
{
  "model": "Nano-Banana2",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9"
}
```

### GPT 生图

```json
{
  "model": "GPT-image-2",
  "quality": "low",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9"
}
```

### 异步任务生图

创建任务：

```bash
curl --location --request POST 'https://omnirouters.com/v1/images/generations?async=true' \
  --header 'Authorization: Bearer sk-xxxx' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "model": "Nano-Banana2",
    "resolution": "4K",
    "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
    "images": [
      "https://example.com/image1.png",
      "https://example.com/image2.png"
    ],
    "aspect_ratio": "16:9"
  }'
```

轮询结果：

```bash
curl --location --request GET 'https://omnirouters.com/v1/images/generations/{task_id}' \
  --header 'Authorization: Bearer sk-xxxx'
```

### 参考 URL 所在地域

```json
{
  "model": "Nano-Banana2",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9",
  "input_region": "Mainland"
}
```

`input_region` 用于标识输入参考图 URL 的区域信息。可选值：

| 值 | 说明 |
| --- | --- |
| `Mainland` | 中国大陆 |
| `Oversea` | 海外 |
| `OverseaUSWest` | 海外-美西 |

### Kling 一次性生成多张图片

```json
{
  "model": "Kling:3.0-omni",
  "resolution": "4K",
  "prompt": "一只小猫坐在窗边",
  "aspect_ratio": "16:9",
  "n": 3
}
```

### Seedream 一次性生成多张图片

```json
{
  "model": "Seedream:4.5",
  "resolution": "4K",
  "prompt": "一只小猫坐在窗边",
  "n": 3
}
```

### GPT-image-2 一次性生成多张图片

```json
{
  "model": "GPT-image-2",
  "quality": "low",
  "resolution": "4K",
  "prompt": "将图1的服装换为图2的服装，整体自然协调，时尚杂志风格",
  "images": [
    "https://example.com/image1.png",
    "https://example.com/image2.png"
  ],
  "aspect_ratio": "16:9",
  "n": 3
}
```

### 混元世界全景图 2.0 生成

```json
{
  "model": "Hunyuan-3d-2.0",
  "prompt": "一个雪山湖泊的360度全景图，真实摄影风格"
}
```

## 请求体参数

以下为 2.3 示例中常见的顶层字段。不同场景只需要按对应示例传入所需字段。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `model` | string | 图片模型名称。 |
| `prompt` | string | 图片生成提示词。 |
| `resolution` | string | 图片清晰度或尺寸档位，例如 `4K`。 |
| `aspect_ratio` | string | 图片宽高比，例如 `16:9`。 |
| `images` | string[] | 参考图片 URL 数组。 |
| `quality` | string | GPT 图片场景的质量档位，例如 `low`。 |
| `n` | number | 一次性生成图片数量。 |
| `input_region` | string | 输入参考图 URL 的区域信息，例如 `Mainland`。 |

异步创建使用查询参数 `async=true`，不是请求体字段。

## 查询异步任务

```bash
curl https://omnirouters.com/v1/images/generations/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## 响应体

接口通常返回图片结果对象或异步任务对象。常见字段如下，实际以接口返回为准：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `data` | array | 图片结果数组。 |
| `data[].url` | string | 图片 URL。 |
| `data[].b64_json` | string | base64 图片内容。 |
| `id` / `task_id` | string | 异步任务 ID。 |
| `status` | string | 异步任务状态。 |
| `error` / `message` | string 或 object | 失败原因或错误信息。 |

## 相关接口

- [API 参考总览](/zh/api/)
- [Omni-Video API](/zh/api/omni-video)
- [Gemini Generate Content](/zh/api/llm/gemini-generate-content)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
