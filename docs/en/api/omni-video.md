---
title: Omni-Video API
---

# Omni-Video API

Omni-Video is the unified OmniRouters entry point for video creation workflows, including text-to-video, image-to-video, video reference, first/last-frame generation, and subject reference generation.

This page follows section `2.3 Minimal Request Example` from the Feishu integration document. The examples below are the current working shapes; legacy model limits, parameter limit tables, and old field notes are not duplicated here.

## Routes

The two create routes below are fully compatible. They have no behavior difference, so use either one:

| Method | Path |
| --- | --- |
| `POST` | `https://omnirouters.com/v1/videos` |
| `POST` | `https://omnirouters.com/v1/video/generations` |

Use the matching task lookup route:

| Method | Path |
| --- | --- |
| `GET` | `https://omnirouters.com/v1/videos/{task_id}` |
| `GET` | `https://omnirouters.com/v1/video/generations/{task_id}` |

## Authentication

```text
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

## Usage

Send any request body below to `POST /v1/videos` or `POST /v1/video/generations` to create a task. After the create endpoint returns a task id, query the matching `GET` route for status and result.

Field names are case-sensitive. The parameter table summarizes recurring top-level fields only. A few multi-parameter examples include a `metadata` container; pass it exactly as shown in the example when that scenario needs it.

## Minimal Request Body Examples

### Text-to-Video

```json
{
  "model": "Kling-3.0-omni",
  "resolution": "1080p",
  "prompt": "一个女孩在海边回头微笑",
  "seconds": "5",
  "aspect_ratio": "16:9"
}
```

### Image-to-Video

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

### Audio-Video Co-Generation

Only supported by audio-video co-generation models.

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

### First/Last-Frame Video

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

### Vidu Background Music

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

### Vidu Subject Creation and Voice Mapping

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

### Vidu Video Reference

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

### Vidu Image + Video Mixed Reference

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

### Vidu-q3-mix Reference Subject Control

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

### Kling Smart Storyboard

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

### Kling Custom Storyboard

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

### Kling Subject Consistency

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

### Kling Video Reference Generation

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

### Kling Video Editing

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

### Kling Image + Video Mixed Reference

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

### Kling Subject Reference

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

### Veo Video Asset Reference

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

### Veo Video Style Reference

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

### Seedance 2.0 All-in-One Multi-Parameter Example

Applies to `doubao-seedance-2-0-fast-260128` and `doubao-seedance-2-0-260128`.

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

### Hunyuan World Scene Roaming 2.0

```json
{
  "model": "Hunyuan-3d-scene-2.0",
  "prompt": "一个未来感展厅的3D场景，金属材质，柔和灯光"
}
```

## Request Body

These are the common top-level fields that appear in the section 2.3 examples. For each workflow, send only the fields shown in its example.

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | Model name. |
| `prompt` | string | Video generation prompt. |
| `resolution` | string | Output resolution, for example `1080p` or `720p`. |
| `seconds` | string | Video duration, for example `"5"`, `"8"`, or `"11"`. |
| `aspect_ratio` | string | Video aspect ratio, for example `16:9` or `9:16`. |
| `images` | string[] | Reference image URL array. |
| `videos` | string[] | Reference video URL array. |
| `firstframe` | string | First-frame image URL. |
| `lastframe` | string | Last-frame image URL. |
| `input_region` | string | Region of input reference URLs, for example `Mainland`. |
| `audio_generation` | string | Whether to generate audio, commonly `Enabled`. |
| `enable_bgm` | string | Whether to add background music, commonly `Enabled`. |
| `keep_original_sound` | string | Whether to keep original video audio, commonly `Enabled` or `Disabled`. |
| `subject_infos` | object[] | Subject reference information array. |
| `image_usage` | string | Image usage marker, for example `Reference`. |
| `video_reference_type` | string | Video reference type, for example `feature`, `base`, `asset`, or `style`. |

## Query a Task

```bash
curl https://omnirouters.com/v1/videos/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

If you created the task through `/v1/video/generations`, you can also use:

```bash
curl https://omnirouters.com/v1/video/generations/$TASK_ID \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Response Body

The create endpoint returns task information. Common fields are listed below; use the actual response as the source of truth:

| Field | Type | Description |
| --- | --- | --- |
| `task_id` / `taskId` / `id` | string | Task id for later lookup. |
| `status` | string | Task status. |
| `data` / `result` / `output` | object | Task result container. |
| `url` / `video_url` / `urls` | string or string[] | Generated video URL or URLs. |
| `error` / `message` | string or object | Failure reason or error details. |

## Related Links

- [API Reference overview](/api/)
- [Omni-Image API](/api/omni-image)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
