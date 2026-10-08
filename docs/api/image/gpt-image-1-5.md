---
title: GPT Image 1.5 图像生成
---

# GPT Image 1.5 图像生成

OmniRouters OpenAI 图片协议参考 for the `gpt-image-1-5` model.

## 接口

`POST /v1/images/generations`

## 最小请求示例

```bash
curl https://omnirouters.com/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{\n  "model": "gpt-image-1-5",\n  "prompt": "A cinematic flower in a glasshouse",\n  "size": "1024x1024",\n  "quality": "high",\n  "n": 1\n}'
```

此接口根据文本提示词生成图片。

## 请求体

| Field | Type | 必填 | Description |
| --- | --- | --- | --- |
| `model` | string | 必填 | 固定使用 `gpt-image-1-5`。 |
| `prompt` | string | 必填 | 图片提示词。 |
| `size` | string | 否 | 输出尺寸，例如 1024x1024。 |
| `quality` | string | 否 | 图片质量：`low`、`medium` 或 `high`。 |
| `n` | integer | 否 | 生成数量。 |

The response may return Base64 data in `data[].b64_json` or a hosted URL in `data[].url`, depending on the model.

## 返回参数

```json
{
  "created": 1782875947,
  "data": [
    { "b64_json": "{image_base64_string}" }
  ]
}
```

## 说明

Model-specific validation and output availability depend on the selected model and current OmniRouters routing configuration. For shared routing guidance, see [Omni-Image API](/api/omni-image).


