---
title: Omni-Video API
---

# Omni-Video API

Omni-Video 是 OmniRouters 上的视频生成统一入口，用于文生视频和图生视频。

本页只保留当前飞书接入文档 `2.3 最小可用请求示例` 中的最新可用参数。

## 路由

下面两个创建路由完全兼容，没有功能差异，任选一个即可：

| 方法 | 路径 |
| --- | --- |
| `POST` | `https://omnirouters.com/v1/videos` |
| `POST` | `https://omnirouters.com/v1/video/generations` |

任务查询使用对应的任务查询路由：

| 方法 | 路径 |
| --- | --- |
| `GET` | `https://omnirouters.com/v1/videos/{task_id}` |
| `GET` | `https://omnirouters.com/v1/video/generations/{task_id}` |

## 认证

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## 接入流程

1. 选择模型与场景：文生视频或图生视频。
2. 按最小可用示例准备顶层请求参数。
3. 调用任意一个创建路由提交任务。
4. 使用返回的 `task_id` 查询任务状态和结果。

字段名区分大小写。请优先按下面的最小可用示例组织请求体。

## 最小可用请求示例

### 文生视频

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni",
    "resolution": "1080p",
    "prompt": "一个女孩在海边回头微笑",
    "seconds": "5",
    "aspect_ratio": "16:9"
  }'
```

### 图生视频

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni",
    "resolution": "1080p",
    "images": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
    ],
    "prompt": "一个女孩在海边回头微笑",
    "seconds": "5"
  }'
```

如果你更习惯使用兼容路由，只需要把 URL 换成 `/v1/video/generations`，请求体不需要变化。

## 请求体参数

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型名称，例如 `Kling-3.0-omni`。 |
| `resolution` | string | 是 | 输出分辨率，例如 `1080p`。 |
| `prompt` | string | 是 | 视频生成提示词。 |
| `seconds` | string | 是 | 视频时长，例如 `"5"`。 |
| `aspect_ratio` | string | 文生视频建议填写 | 视频宽高比，例如 `16:9`。 |
| `images` | string[] | 图生视频必填 | 参考图片 URL 数组。 |

## 查询任务

```bash
curl https://omnirouters.com/v1/videos/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

如果创建任务时使用的是 `/v1/video/generations`，也可以使用：

```bash
curl https://omnirouters.com/v1/video/generations/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## 响应体

创建接口会返回任务信息。常见字段如下，实际以接口返回为准：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `task_id` / `taskId` / `id` | string | 任务 ID，用于后续查询。 |
| `status` | string | 任务状态。 |
| `data` / `result` / `output` | object | 任务结果容器。 |
| `url` / `video_url` / `urls` | string 或 string[] | 生成的视频地址。 |
| `error` / `message` | string 或 object | 失败原因或错误信息。 |

## 相关入口

- [API 参考总览](/zh/api/)
- [Omni-Image API](/zh/api/omni-image)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
