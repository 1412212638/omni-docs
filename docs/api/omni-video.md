---
title: Omni-Video API
---

# Omni-Video API

Omni-Video 是 OmniRouters 上的视频生成统一入口，用于文生视频、图生视频、视频参考、首尾帧、主体参考等视频创建场景。

本页按飞书接入文档 `2.3 最小可用请求示例` 整理。下面的示例是当前真实可用口径；旧的模型限制、参数限制以及旧字段说明不在本页展开。

## 路由

下面两个创建路由完全兼容，没有功能差异，任选一个即可：

| 方法 | 路径 |
| --- | --- |
| `POST` | `https://omnirouters.com/v1/videos` |
| `POST` | `https://omnirouters.com/v1/video/generations` |

任务查询使用对应的查询路由：

| 方法 | 路径 |
| --- | --- |
| `GET` | `https://omnirouters.com/v1/videos/{task_id}` |
| `GET` | `https://omnirouters.com/v1/video/generations/{task_id}` |

## 认证

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## 使用方式

将下面任意一个请求体发送到 `POST /v1/videos` 或 `POST /v1/video/generations` 即可创建任务。创建接口返回任务 ID 后，再使用对应的 `GET` 路由查询任务状态和结果。

字段名区分大小写。表格只汇总示例中反复出现的顶层字段；少数多参示例包含 `metadata` 容器时，请按示例原样传入，本页不单独展开它的子字段。

## 最小可用请求体示例

### 文生视频

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "prompt": "一个女孩在海边回头微笑",
  "seconds": "5",
  "aspect_ratio": "16:9"
}
```

### 图生视频

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "images": [
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
  ],
  "prompt": "一个女孩在海边回头微笑",
  "seconds": "5"
}
```

### 音画同出生视频

仅支持音画同出模型。

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "女孩抱着小狗跳舞",
  "images": [
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
  ],
  "aspect_ratio": "16:9",
  "input_region": "Mainland",
  "audio_generation": "Enabled"
}
```

### 首尾帧生成视频

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "prompt": "一个女孩在海边回头微笑，镜头缓慢推进",
  "seconds": "5",
  "firstframe": "https://example.com/first.jpg",
  "lastframe": "https://example.com/last.jpg"
}
```

### Vidu 为生成的视频添加背景音乐

```json
{
  "model": "Vidu-q2",
  "resolution": "1080p",
  "prompt": "一个女孩在海边回头微笑",
  "seconds": "5",
  "aspect_ratio": "16:9",
  "enable_bgm": "Enabled"
}
```

### Vidu 主体创建以及主体音色定义

```json
{
  "model": "Vidu-q2",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "让 @girl 抱起 @dog 转一圈，说狗狗真可爱！",
  "images": [
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg",
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seelite_ref_2.png"
  ],
  "aspect_ratio": "16:9",
  "metadata": {
    "vidu_q2_object_ids": ["girl", "dog"],
    "vidu_q2_voice_map": {
      "girl": "female-shaonv"
    },
    "output_config": {
      "AudioGeneration": "Enabled"
    }
  }
}
```

### Vidu 视频参考

```json
{
  "model": "Vidu-q2-pro",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "参考视频的动作和镜头语言生成新视频",
  "videos": [
    "https://example.com/ref-video.mp4"
  ],
  "aspect_ratio": "16:9"
}
```

### Vidu 图片 + 视频混合参考

```json
{
  "model": "Vidu-q2-pro",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "参考视频动作，参考图片主体形象，生成一个新视频",
  "images": [
    "https://example.com/ref-image.jpg"
  ],
  "videos": [
    "https://example.com/ref-video.mp4"
  ],
  "aspect_ratio": "16:9",
  "keep_original_sound": "Disabled"
}
```

### Vidu-q3-mix 参考生主题控制

```json
{
  "model": "Vidu-q3-mix",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "参考图片生成视频",
  "images": ["https://example.com/a.png"],
  "aspect_ratio": "9:16",
  "audio_generation": "Enabled",
  "subject_infos": [
    {
      "id": "s1",
      "name": "subject",
      "image_urls": ["https://example.com/s.jpg"]
    }
  ]
}
```

### Kling 智能分镜

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "女孩抱着小狗跳舞，镜头自然切换，主体一致性优先",
  "images": [
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg"
  ],
  "metadata": {
    "aspect_ratio": "16:9",
    "scene_type": "template_effect",
    "ext_info": {
      "AdditionalParameters": {
        "multi_shot": true,
        "shot_type": "intelligence"
      }
    }
  }
}
```

### Kling 自定义分镜

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "女孩抱着小狗跳舞",
  "images": [
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg"
  ],
  "metadata": {
    "aspect_ratio": "16:9",
    "scene_type": "template_effect",
    "ext_info": {
      "AdditionalParameters": {
        "multi_shot": true,
        "shot_type": "customize",
        "multi_prompt": [
          {
            "index": 1,
            "prompt": "女孩抱着小狗在公园转圈起舞，近景，柔和阳光",
            "duration": 2
          },
          {
            "index": 2,
            "prompt": "镜头拉远，女孩和小狗继续舞动，背景树影摇曳",
            "duration": 3
          }
        ]
      }
    }
  }
}
```

### Kling 主体一致性

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "女孩抱着小狗跳舞，主体一致性优先",
  "images": [
    "https://ark-project.tos-cn-beijing.volces.com/doc_image/seepro_first_frame.jpeg"
  ],
  "metadata": {
    "aspect_ratio": "16:9",
    "scene_type": "template_effect",
    "ext_info": {
      "AdditionalParameters": {
        "element_list": [
          {
            "element_id": 12345
          }
        ]
      }
    }
  }
}
```

### Kling 视频参考生成

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "参考 <<<video_1>>> 的动作和镜头节奏，生成一个新视频",
  "videos": [
    "https://example.com/ref-video.mp4"
  ],
  "aspect_ratio": "16:9",
  "video_reference_type": "feature"
}
```

### Kling 视频编辑生成

```json
{
  "model": "Kling-o1",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "基于 <<<video_1>>> 进行编辑，让人物服装更换为现代风格",
  "videos": [
    "https://example.com/source-video.mp4"
  ],
  "aspect_ratio": "16:9",
  "video_reference_type": "base",
  "keep_original_sound": "Enabled"
}
```

### Kling 图片 + 视频混合参考

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "seconds": "5",
  "prompt": "参考 <<<image_1>>> 的人物形象，结合 <<<video_1>>> 的动作和镜头节奏，生成一个新视频",
  "images": [
    "https://example.com/ref-image.jpg"
  ],
  "videos": [
    "https://example.com/ref-video.mp4"
  ],
  "aspect_ratio": "16:9",
  "video_reference_type": "feature"
}
```

### Kling 主体参考

```json
{
  "model": "Kling-3.0",
  "resolution": "1080p",
  "seconds": "8",
  "prompt": "让 <<<girl1>>> 抱着小狗在客厅里跳舞，镜头缓慢推进，真实电影感",
  "images": [
    "https://example.com/reference-scene.png"
  ],
  "image_usage": "Reference",
  "aspect_ratio": "16:9",
  "audio_generation": "Enabled",
  "subject_infos": [
    {
      "id": "girl1",
      "name": "女孩",
      "image_urls": [
        "https://example.com/girl-subject-1.png",
        "https://example.com/girl-subject-2.png"
      ]
    }
  ]
}
```

### Veo 视频素材参考

```json
{
  "model": "Veo-3.1",
  "resolution": "1080p",
  "seconds": "8",
  "prompt": "参考视频素材生成一个新视频",
  "videos": [
    "https://example.com/ref-video.mp4"
  ],
  "aspect_ratio": "16:9",
  "video_reference_type": "asset"
}
```

### Veo 视频风格参考示例

```json
{
  "model": "Veo-3.1",
  "resolution": "1080p",
  "seconds": "8",
  "prompt": "参考视频风格生成一个新视频",
  "videos": [
    "https://example.com/style-video.mp4"
  ],
  "aspect_ratio": "16:9",
  "video_reference_type": "style"
}
```

### Seedance2.0 全能多参请求示例

适用于 `doubao-seedance-2-0-fast-260128`、`doubao-seedance-2-0-260128`。

```json
{
  "model": "doubao-seedance-2-0-260128",
  "prompt": "全程使用视频1的第一视角构图，全程使用音频1作为背景音乐。第一人称视角果茶宣传广告，seedance牌「苹苹安安」苹果果茶限定款；首帧为图片1，你的手摘下一颗带晨露的阿克苏红苹果，轻脆的苹果碰撞声；2-4 秒：快速切镜，你的手将苹果块投入雪克杯，加入冰块与茶底，用力摇晃，冰块碰撞声与摇晃声卡点轻快鼓点，背景音：「鲜切现摇」；4-6 秒：第一人称成品特写，分层果茶倒入透明杯，你的手轻挤奶盖在顶部铺展，在杯身贴上粉红包标，镜头拉近看奶盖与果茶的分层纹理；6-8 秒：第一人称手持举杯，你将图片2中的果茶举到镜头前（模拟递到观众面前的视角），杯身标签清晰可见，背景音「来一口鲜爽」，尾帧定格为图片2。背景声音统一为女生音色。",
  "seconds": "11",
  "metadata": {
    "resolution": "720p",
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://ark-project.tos-cn-beijing.volces.com/doc_image/r2v_tea_pic1.jpg"
        },
        "role": "reference_image"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://ark-project.tos-cn-beijing.volces.com/doc_image/r2v_tea_pic2.jpg"
        },
        "role": "reference_image"
      },
      {
        "type": "video_url",
        "video_url": {
          "url": "https://ark-project.tos-cn-beijing.volces.com/doc_video/r2v_tea_video1.mp4"
        },
        "role": "reference_video"
      },
      {
        "type": "audio_url",
        "audio_url": {
          "url": "https://ark-project.tos-cn-beijing.volces.com/doc_audio/r2v_tea_audio1.mp3"
        },
        "role": "reference_audio"
      }
    ],
    "generate_audio": true,
    "ratio": "16:9",
    "watermark": false
  }
}
```

### 混元世界场景漫游 2.0

```json
{
  "model": "Hunyuan-3d-scene-2.0",
  "prompt": "一个未来感展厅的3D场景，金属材质，柔和灯光"
}
```

## 请求体参数

以下为 2.3 示例中常见的顶层字段。不同场景只需要按对应示例传入所需字段。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `model` | string | 模型名称。 |
| `prompt` | string | 视频生成提示词。 |
| `resolution` | string | 输出分辨率，例如 `1080p`、`720p`。 |
| `seconds` | string | 视频时长，例如 `"5"`、`"8"`、`"11"`。 |
| `aspect_ratio` | string | 视频宽高比，例如 `16:9`、`9:16`。 |
| `images` | string[] | 参考图片 URL 数组。 |
| `videos` | string[] | 参考视频 URL 数组。 |
| `firstframe` | string | 首帧图片 URL。 |
| `lastframe` | string | 尾帧图片 URL。 |
| `input_region` | string | 输入参考 URL 所在地域，例如 `Mainland`。 |
| `audio_generation` | string | 是否生成音频，常见值为 `Enabled`。 |
| `enable_bgm` | string | 是否添加背景音乐，常见值为 `Enabled`。 |
| `keep_original_sound` | string | 是否保留原视频声音，常见值为 `Enabled` 或 `Disabled`。 |
| `subject_infos` | object[] | 主体参考信息数组。 |
| `image_usage` | string | 图片用途标识，例如 `Reference`。 |
| `video_reference_type` | string | 视频参考类型，例如 `feature`、`base`、`asset`、`style`。 |

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

## 相关接口

- [API 参考总览](/zh/api/)
- [Omni-Image API](/zh/api/omni-image)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
