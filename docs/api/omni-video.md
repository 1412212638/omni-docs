---
title: Omni-Video API
---

# Omni-Video API

Omni-Video 是 OmniRouters 上的视频生成统一入口，适合文生视频、图生视频、首尾帧视频、参考素材视频和部分素材重组场景。

这页先覆盖通用接入方式。不同模型家族会有自己的时长、参考图数量、宽高比和音频能力限制，接入时请以模型实际能力为准。

## 路由

| 场景 | 方法与路径 | 说明 |
| --- | --- | --- |
| 标准视频创建 | `POST https://omnirouters.com/v1/videos` | 推荐用于文生视频、图生视频、常规参考图视频。 |
| 标准任务查询 | `GET https://omnirouters.com/v1/videos/{task_id}` | 查询 `/v1/videos` 创建的任务。 |
| 素材重组创建 | `POST https://omnirouters.com/v1/video/generations` | 适合基于已有视频或商品素材做重组。 |
| 素材重组查询 | `GET https://omnirouters.com/v1/video/generations/{task_id}` | 查询素材重组任务。 |

兼容环境中也可能出现 `POST /v1/videos/generations` 和 `GET /v1/videos/generations/{task_id}`。如果你的 Apifox 环境展示的是兼容路径，按对应路径调用即可。

## 认证

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## 接入流程

1. 选择模型和场景：文生视频、图生视频、首尾帧、参考视频或素材重组。
2. 准备请求参数：至少包含 `model`，通常还需要 `prompt`、`seconds`、`image` / `images`、`metadata`。
3. 调用创建任务接口，获得 `task_id` 或 `id`。
4. 轮询查询接口，直到任务进入 `succeeded`、`completed`、`failed` 等终态。
5. 从查询结果中读取视频 URL、失败原因或其他输出信息。

首次接入建议先跑通最小可用示例；生产环境建议开启输入/输出审核。字段名区分大小写，请以示例请求中的实际字段为准。

## 最小示例

### 文生视频

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni-1080p",
    "prompt": "一个女孩在海边回头微笑",
    "seconds": "5",
    "metadata": {
      "aspect_ratio": "16:9"
    }
  }'
```

部分模型示例也会使用独立的 `resolution` 和 `aspect_ratio` 字段：

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "prompt": "一个女孩在海边回头微笑",
  "seconds": "5",
  "aspect_ratio": "16:9"
}
```

如果模型名本身已经带有分辨率后缀，例如 `Kling-3.0-omni-1080p`，通常优先以模型名为准，不要再用其他字段覆盖分辨率。

### 图生视频

```bash
curl https://omnirouters.com/v1/videos \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Kling-3.0-omni-1080p",
    "prompt": "一个女孩在海边回头微笑",
    "seconds": "5",
    "images": [
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
      "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
    ],
    "metadata": {
      "aspect_ratio": "16:9",
      "input_region": "Mainland"
    }
  }'
```

### 查询任务

```bash
curl https://omnirouters.com/v1/videos/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## 请求体参数

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 视频模型名称。建议使用完整模型名和版本/分辨率后缀，例如 `Kling-3.0-omni-1080p`、`Vidu-q2-turbo-720p`。 |
| `prompt` | string | 条件必填 | 视频生成提示词。没有传 `image`、`images` 或 `videos` 时通常必填。 |
| `seconds` | string 或 number | 是 | 视频时长。不同模型支持范围不同，详见下方模型限制。 |
| `image` | string | 否 | 单张参考图 URL。只支持 `http://` 或 `https://`。 |
| `images` | string[] | 否 | 多张参考图 URL。只支持 `http://` 或 `https://`。不同模型数量限制不同。 |
| `videos` | string[] | 否 | 参考视频 URL。通常只在 Kling O1 / 3.0 / 3.0-Omni 等模型中支持。 |
| `resolution` | string | 否 | 分辨率字段，例如 `720p`、`1080p`。如果模型名已带分辨率后缀，优先使用模型名。 |
| `aspect_ratio` | string | 否 | 顶层宽高比字段，例如 `16:9`、`9:16`、`1:1`。部分模型使用 `metadata.aspect_ratio`。 |
| `metadata` | object | 否 | 模型扩展参数容器。常见字段见下方。 |

## `metadata` 参数

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `metadata.aspect_ratio` | string | 视频画面比例。常见值：`16:9`、`9:16`、`1:1`。 |
| `metadata.negative_prompt` | string | 负向提示词，例如排除低质量、模糊、水印、字幕等。 |
| `metadata.enhance_prompt` | string | 是否启用提示词增强。常见值：`Enabled`、`Disabled`。 |
| `metadata.input_region` | string | 输入素材 URL 所在区域。常见值：`Mainland`、`Oversea`。 |
| `metadata.scene_type` / `metadata.SceneType` | string | 传递模型工作流场景，例如运动控制、模板效果等。 |
| `metadata.ext_info` / `metadata.ExtInfo` | object 或 string | 模型高级扩展参数。对象形式通常会被转换为模型所需结构。 |
| `metadata.output_config` | object | 输出与合规配置。 |

`metadata.output_config` 常见字段：

| 字段 | 可选值 | 说明 |
| --- | --- | --- |
| `AudioGeneration` | `Enabled` / `Disabled` | 是否生成音频。仅部分模型支持。 |
| `PersonGeneration` | `AllowAdult` / `Disallowed` | 人像生成策略。 |
| `InputComplianceCheck` | `Enabled` / `Disabled` | 是否开启输入内容合规检查。 |
| `OutputComplianceCheck` | `Enabled` / `Disabled` | 是否开启输出内容合规检查。 |
| `LogoAdd` | `Enabled` / `Disabled` | 是否添加标识。部分模型支持。 |
| `OffPeak` | `Enabled` / `Disabled` | Vidu 等模型可能支持的错峰配置。 |
| `EnhanceSwitch` | `Enabled` / `Disabled` | 部分模型支持的增强开关。 |

## 模型与参数限制

| 模型方向 | 时长 | 参考图限制 | 常见宽高比 |
| --- | --- | --- | --- |
| Kling 2.5 | `5` 或 `10` 秒 | 720P 最多 1 张；1080P 最多 2 张 | `16:9`、`9:16`、`1:1` |
| Kling O1 / 3.0 / 3.0-Omni | `3-15` 秒 | 高级参考输入，通常最多 7 张；有参考视频时限制更严格 | `16:9`、`9:16`、`1:1` |
| Vidu Q2 | `1-10` 秒 | 最多 7 张；`q2-pro` / `q2-turbo` 最多 2 张 | `16:9`、`9:16`、`4:3`、`3:4`、`1:1` |
| Vidu Q3 | `1-16` 秒 | 以具体模型为准 | `16:9`、`9:16`、`1:1` |
| Hailuo 2.3 / 2.3-fast | 768P：`6` 或 `10` 秒；1080P：`10` 秒 | 通常最多 1 张 | 不建议传 `aspect_ratio` |
| GV 3.1 | `8` 秒 | 最多 2 张 | `16:9`、`9:16` |
| OS 2.0 | `4`、`8`、`12` 秒 | 最多 1 张 | 文生视频支持 `16:9`、`9:16` |

## 高级参考素材规则

Kling O1 / 3.0 / 3.0-Omni 支持更复杂的参考输入，但校验更严格：

| 场景 | 限制 |
| --- | --- |
| 有参考视频 | 参考图片通常不超过 4 张，`images + element_list` 通常不超过 4。 |
| 无参考视频 | 参考图片通常不超过 7 张，`images + element_list` 通常不超过 7。 |
| 首帧/首尾帧模式 | `element_list` 通常最多 3 个元素。 |
| 多镜头 `multi_shot=true` | `shot_type` 应为 `customize`，`multi_prompt` 通常为 1-6 条。 |
| 多镜头时长 | 每个分镜 `duration` 至少 1 秒，所有 `multi_prompt.duration` 总和应等于 `seconds`。 |

## 响应体

创建任务通常返回任务对象。不同模型和路由可能字段略有差异，常见字段如下：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `task_id` / `taskId` / `id` | string | 任务 ID。后续查询任务时使用。 |
| `status` | string | 任务状态。常见值包括 `queued`、`running`、`processing`、`succeeded`、`completed`、`failed`、`cancelled`。 |
| `created_at` / `createdAt` | string 或 integer | 任务创建时间。 |
| `updated_at` / `updatedAt` | string 或 integer | 任务更新时间。 |
| `data` / `result` / `output` | object | 任务结果容器。成功后通常包含视频 URL。 |
| `video_url` / `url` / `urls` | string 或 string[] | 生成的视频地址。实际字段以返回体为准。 |
| `error` / `message` | string 或 object | 失败原因或错误信息。 |

轮询时建议把 `succeeded`、`success`、`completed`、`done` 作为成功终态，把 `failed`、`error`、`cancelled` 作为失败终态。

## 常见错误

| 错误 | 排查方向 |
| --- | --- |
| `seconds is required` | 确认传入 `seconds`，且类型和取值符合模型要求。 |
| `image is not supported; use images` | 当前路由或模型要求使用 `images` 数组。 |
| `images must be http(s) URLs` | 参考图只支持公网 URL，不支持本地路径或 base64。 |
| `videos is only supported for Kling O1 / 3.0 / 3.0-Omni` | 参考视频只在部分 Kling 模型中支持。 |
| `metadata.aspect_ratio is invalid` | 检查宽高比是否在该模型支持范围内。 |
| `metadata.<field> is not supported` | 删除模型不支持的扩展字段，或确认字段大小写。 |

## 相关入口

- [API 参考总览](/zh/api/)
- [Omni-Image API](/zh/api/omni-image)
- [OmniRouters Video Skill](/zh/skills/omnirouters-video)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
