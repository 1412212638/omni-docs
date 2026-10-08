---
title: GPT Image 1 图像编辑
---

# GPT Image 1 图像编辑

OmniRouters OpenAI 图片协议参考 for the `gpt-image-1` model.

## 接口

`POST /v1/images/edits`

## 最小请求示例

```bash
curl https://omnirouters.com/v1/images/edits \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{\n  "model": "gpt-image-1",\n  "prompt": "Make the lighting warmer and preserve the composition.",\n  "image": "<binary image file>"\n}'
```

此接口用于编辑上传的图片。 Use multipart form data when the gateway requires a binary upload.

## 请求体

| Field | Type | 必填 | Description |
| --- | --- | --- | --- |
| `model` | string | 必填 | 固定使用 `gpt-image-1`。 |
| `prompt` | string | 必填 | 图片提示词。 |
| `image` | binary file | 必填 | 待编辑的图片文件。 |
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


