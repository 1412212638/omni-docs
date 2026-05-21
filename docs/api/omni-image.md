---
title: Omni-Image API
---

# Omni-Image API

Omni-Image 是 OmniRouters 上的图片生成入口，用于文生图和参考图生图。

本页只保留当前可用的标准图片创建口径：请求参数均为顶层字段。

## 路由

| 方法 | 路径 |
| --- | --- |
| `POST` | `https://omnirouters.com/v1/images/generations` |

Gemini 原生 `contents` / `parts` 格式请看 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)，不放在 Omni-Image 标准创建页里混用。

## 认证

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## 最小可用请求示例

### 文生图

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
    "prompt": "保持主体一致，生成一张干净的产品主视觉，棚拍柔光背景",
    "image": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimages_1.png",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seedream4_imagesToimages_2.png"
    ],
    "response_format": "url",
    "size": "4K",
    "stream": false,
    "watermark": false
  }'
```

## 请求体参数

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 图片模型名称，例如 `doubao-seedream-4-5-251128`。 |
| `prompt` | string | 是 | 图片生成提示词。 |
| `image` | string[] | 否 | 参考图片 URL 数组。文生图可不传，参考图生图时传入。 |
| `response_format` | string | 否 | 响应格式，常用 `url`。 |
| `size` | string | 否 | 图片尺寸或清晰度档位，例如 `4K`。 |
| `stream` | boolean | 否 | 是否启用流式返回。 |
| `watermark` | boolean | 否 | 是否添加水印。 |

## 响应体

接口通常返回图片结果对象。常见字段如下，实际以接口返回为准：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `data` | array | 图片结果数组。 |
| `data[].url` | string | 图片 URL。`response_format=url` 时常见。 |
| `data[].b64_json` | string | base64 图片内容。`response_format=b64_json` 时可能出现。 |
| `id` / `task_id` | string | 如果模型以异步任务形式返回，可能出现任务 ID。 |
| `status` | string | 异步任务状态。 |
| `error` / `message` | string 或 object | 失败原因或错误信息。 |

## 相关入口

- [API 参考总览](/zh/api/)
- [Omni-Video API](/zh/api/omni-video)
- [Gemini Generate Content](/zh/api/llm/gemini-generate-content)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
