---
title: OpenAI Chat Completions
---

# OpenAI Chat Completions

`/v1/chat/completions` 是 OmniRouters 上最简单、最通用的 LLM 文本生成协议入口。

它特别适合下面这些场景：

- 你想使用熟悉的 OpenAI 风格 `messages` 请求体
- 你希望最大化 SDK 兼容性
- 你想用一套请求方式覆盖不同模型家族

## 官方文档

- OmniRouters 路由：`POST https://omnirouters.com/v1/chat/completions`
- OpenAI 官方文档：[Chat API reference](https://developers.openai.com/api/reference/resources/chat)

## OmniRouters 说明

- 你在 OmniRouters 账号中启用的所有模型，都可以通过 OpenAI 兼容协议调用。
- 这也包括 Claude 风格模型、Gemini 风格模型，只要模型名在你的账号里可用。
- 在 OmniRouters 上，认证方式统一为：

```text
Authorization: Bearer <your-api-key>
```

## 最小示例

```bash
curl https://omnirouters.com/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "请用简洁语言介绍一下 OmniRouters。"
      }
    ],
    "stream": false
  }'
```

## 常用字段

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `model` | 是 | 你要调用的 OmniRouters 模型名 |
| `messages` | 是 | 对话消息数组，通常使用 `system`、`user`、`assistant` |
| `stream` | 否 | 设为 `true` 时返回流式输出 |
| `temperature` | 否 | 在模型支持时用于控制随机性 |
| `top_p` | 否 | 可替代 temperature 的采样参数 |
| `extra_body` | 否 | 某些能力场景下的扩展参数 |

## 请求体参数 (Request Body)

下表包含 OmniRouters OpenAPI 已声明字段，以及 OpenAI Chat Completions 兼容协议中常见、模型支持时可传入的字段。不同模型对采样、工具调用、多模态输入的支持会有差异，最终以你实际启用的模型能力为准。

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型名称。填写你在 OmniRouters 账号中已启用的模型名，例如 `gpt-4o`、`claude-...`、`gemini-...` 或平台模型目录中的别名。 |
| `messages` | array | 是 | 对话消息数组。按时间顺序传入，通常包含 `system`、`user`、`assistant` 消息。详见下方 `messages` 对象结构。 |
| `stream` | boolean | 否 | 是否启用流式输出。`false` 返回完整 JSON；`true` 返回 SSE 增量事件。默认 `false`。 |
| `temperature` | number | 否 | 采样温度，常见范围 `0` 到 `2`。值越高越发散，值越低越稳定。部分推理模型可能忽略或限制此参数。 |
| `top_p` | number | 否 | nucleus sampling 参数，常见范围 `0` 到 `1`。通常不要和 `temperature` 同时大幅调整。 |
| `n` | integer | 否 | 为同一输入生成多少个候选回复。通常保持 `1`，因为候选越多 token 成本越高。 |
| `stop` | string 或 string[] | 否 | 停止序列。模型生成到这些文本时会提前停止，通常最多传 4 个。 |
| `max_tokens` | integer | 否 | 限制本次最多生成的 token 数。某些新模型也可能使用 `max_completion_tokens` 一类兼容字段。 |
| `presence_penalty` | number | 否 | 话题存在惩罚，常见范围 `-2` 到 `2`。正数会鼓励模型引入新话题。 |
| `frequency_penalty` | number | 否 | 频率惩罚，常见范围 `-2` 到 `2`。正数会减少重复表达。 |
| `logit_bias` | object | 否 | 对指定 token 的生成概率做偏置调整，键通常是 token id，值为偏置数值。 |
| `user` | string | 否 | 终端用户标识，可用于排查、风控或成本归因。建议传匿名化 id。 |
| `response_format` | object | 否 | 控制输出格式。常见值包括 `{ "type": "text" }`、`{ "type": "json_object" }`，支持结构化输出的模型还可能支持 `json_schema`。 |
| `seed` | integer | 否 | 尝试让采样更可复现。不同模型和后端版本不保证完全确定。 |
| `tools` | array | 否 | 工具定义数组。最常见的是 function tool：`{ "type": "function", "function": { "name": "...", "parameters": {...} } }`。 |
| `tool_choice` | string 或 object | 否 | 控制是否调用工具。常见值：`none`、`auto`、`required`，也可以指定某个 function。 |
| `parallel_tool_calls` | boolean | 否 | 是否允许模型并行发起多个工具调用。工具流程复杂时可显式控制。 |
| `logprobs` | boolean | 否 | 是否返回输出 token 的 log probability。仅在模型支持时生效。 |
| `top_logprobs` | integer | 否 | 搭配 `logprobs` 使用，返回每个位置最可能 token 的数量，常见范围 `0` 到 `20`。 |
| `extra_body` | object | 否 | OmniRouters 扩展字段，用于承载上游模型或供应商特定参数。当前 OpenAPI 中明确声明了 `google.image_config`。 |

## `messages` 数组中对象的结构

| 字段 | 类型 | 是否必填 | 适用角色 | 说明 |
| --- | --- | --- | --- | --- |
| `role` | string | 是 | 全部 | 消息角色。OmniRouters 当前 OpenAPI 明确声明 `system`、`user`、`assistant`；OpenAI 原生协议中还常见 `developer`、`tool`、`function`。跨模型调用时最稳妥的是 `system`、`user`、`assistant`。 |
| `content` | string 或 Part[] | 是 | `system`、`user`、`assistant` | 消息正文。纯文本可直接传字符串；多模态或结构化内容可传 Part 数组。当前 OmniRouters OpenAPI 对 Chat 路由声明为 string，传 Part 数组前应确认目标模型支持。 |
| `name` | string | 否 | `system`、`user`、`assistant` | 可选的消息作者名称，用于区分同一角色下的不同参与者。 |
| `tool_calls` | array | 否 | `assistant` | 模型返回的工具调用列表。再次提交上下文时，可把 assistant 的 `tool_calls` 原样带回。 |
| `tool_call_id` | string | 条件必填 | `tool` | 工具结果消息对应的工具调用 id。使用工具调用闭环时需要。 |
| `function_call` | object | 否 | `assistant` | 旧版函数调用字段，已被 `tool_calls` 替代。仅为兼容历史客户端保留。 |

`tool_calls` 中的 function call 通常包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 工具调用 id，后续 `tool` 消息用 `tool_call_id` 对应它。 |
| `type` | string | 工具类型，常见值为 `function`。 |
| `function.name` | string | 要调用的函数名。 |
| `function.arguments` | string | 模型生成的函数参数 JSON 字符串。调用前应在业务侧校验 JSON 和 schema。 |

## Part 对象的结构

当 `messages[].content` 使用数组时，每个元素就是一个 Part。常见 Part 结构如下：

| Part 类型 | 结构 | 说明 |
| --- | --- | --- |
| 文本 | `{ "type": "text", "text": "..." }` | 最常用的结构化文本片段。`text` 为实际输入文本。 |
| 图片 URL 或 base64 data URL | `{ "type": "image_url", "image_url": { "url": "...", "detail": "auto" } }` | `url` 可以是公网图片地址，也可以是 `data:image/png;base64,...`。`detail` 常见值为 `auto`、`low`、`high`。 |
| 音频输入 | `{ "type": "input_audio", "input_audio": { "data": "...", "format": "mp3" } }` | `data` 为 base64 音频数据；`format` 常见值为 `mp3`、`wav`。仅多模态音频模型支持。 |
| 文件输入 | `{ "type": "file", "file": { "file_id": "...", "file_data": "...", "filename": "..." } }` | 可通过文件 id 或 base64 文件内容传入文件。是否支持取决于目标模型和平台能力。 |
| 拒答片段 | `{ "type": "refusal", "refusal": "..." }` | 通常出现在 assistant 历史消息或返回体中，用于表示模型拒答内容。普通用户请求中很少手写。 |

## ExtraContent 对象的结构

`extra_body` 用于传递协议标准字段之外的模型或供应商扩展参数。当前 OpenAPI 中明确声明的结构如下：

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `extra_body.google` | object | 否 | Google / Gemini 系模型的扩展配置容器。 |
| `extra_body.google.image_config` | object | 否 | 图像生成相关配置。仅在调用支持图像输出或图像生成的模型时有意义。 |
| `extra_body.google.image_config.aspect_ratio` | string | 否 | 图像宽高比。可选值：`1:1`、`3:4`、`4:3`、`9:16`、`16:9`。默认 `16:9`。 |
| `extra_body.google.image_config.image_size` | string | 否 | 图像尺寸或清晰度档位。可选值：`1K`、`2K`、`4K`。默认 `1K`。 |

示例：

```json
{
  "extra_body": {
    "google": {
      "image_config": {
        "aspect_ratio": "16:9",
        "image_size": "1K"
      }
    }
  }
}
```

## 返回参数 (Response Body)

非流式请求通常返回 Chat Completion 对象：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 本次补全结果 id。 |
| `object` | string | 对象类型，通常为 `chat.completion`。 |
| `created` | integer | 创建时间，Unix 秒级时间戳。 |
| `model` | string | 实际用于生成的模型名。 |
| `choices` | array | 候选回复数组。`n` 大于 1 时可能返回多个候选。 |
| `choices[].index` | integer | 候选下标。 |
| `choices[].message` | object | 模型生成的 assistant 消息。 |
| `choices[].message.role` | string | 通常为 `assistant`。 |
| `choices[].message.content` | string 或 null | 模型生成的文本内容。工具调用或拒答场景下可能为空。 |
| `choices[].message.refusal` | string 或 null | 模型拒答内容。没有拒答时通常为 `null`。 |
| `choices[].message.tool_calls` | array 或 null | 模型请求调用的工具列表。业务侧执行工具后，再用 `tool` 消息把结果传回。 |
| `choices[].message.annotations` | array | 额外标注信息，例如引用、检索来源等。是否返回取决于模型能力。 |
| `choices[].finish_reason` | string | 结束原因。常见值：`stop`、`length`、`content_filter`、`tool_calls`、`function_call`。 |
| `choices[].logprobs` | object 或 null | token log probability 信息。仅请求并且模型支持时返回。 |
| `usage` | object | token 用量统计。 |
| `usage.prompt_tokens` | integer | 输入 token 数。 |
| `usage.completion_tokens` | integer | 输出 token 数。 |
| `usage.total_tokens` | integer | 输入与输出 token 总数。 |
| `usage.prompt_tokens_details` | object | 输入 token 明细，可能包含 `cached_tokens`、`audio_tokens`。 |
| `usage.completion_tokens_details` | object | 输出 token 明细，可能包含 `reasoning_tokens`、`audio_tokens`、`accepted_prediction_tokens`、`rejected_prediction_tokens`。 |
| `service_tier` | string | 服务处理层级。只有平台或模型返回时才出现。 |
| `system_fingerprint` | string | 后端配置指纹。用于排查可复现性问题，可能不存在。 |

当 `stream: true` 时，接口会返回 SSE 增量数据。每个 chunk 通常包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `object` | string | 通常为 `chat.completion.chunk`。 |
| `id` | string | 本次补全 id，同一次流式响应中通常保持一致。 |
| `created` | integer | chunk 创建时间。 |
| `model` | string | 使用的模型名。 |
| `choices[].delta` | object | 本次增量内容，可能包含 `role`、`content`、`tool_calls`、`refusal`。 |
| `choices[].finish_reason` | string 或 null | 未结束时通常为 `null`，最后一个有效 chunk 中给出结束原因。 |
| `usage` | object | 如果启用了流式 usage 选项，最后阶段可能返回用量统计。 |

## 什么时候优先用它

如果你满足以下任意一种情况，优先选这条路由：

- 想找一条跨模型最稳妥的默认协议
- 你已经有 OpenAI chat 客户端代码
- 你希望请求体尽量简单清晰
- 你不需要强依赖 Claude 或 Gemini 的原生请求格式

## 什么时候看别的协议

- 想要更偏结构化的 OpenAI 新工作流，就看 [OpenAI Responses](/zh/api/llm/openai-responses)
- 想尽量保留 Anthropic 风格请求体，就看 [Claude Messages](/zh/api/llm/claude-messages)
- 想尽量保留 Gemini 风格请求体，就看 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)

## 参考入口

- [LLM 文本生成总览](/zh/api/llm/)
- [协议对比](/zh/api/llm/protocol-comparison)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
