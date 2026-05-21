---
title: OpenAI Responses
---

# OpenAI Responses

`/v1/responses` 是 OmniRouters 上偏现代化的 OpenAI 风格协议入口，适合结构化输出、工具调用和推理型工作流。

如果你想在 OmniRouters 的模型目录内继续使用 OpenAI 风格的接入思路，这条路由会很有价值。

## 官方文档

- OmniRouters 路由：`POST https://omnirouters.com/v1/responses`
- OpenAI 官方文档：[Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create)

## OmniRouters 说明

- 你在 OmniRouters 账号中启用的所有模型，都可以通过 OpenAI 兼容协议调用。
- 在 OmniRouters 上，这条路由用于承载 Responses 风格工作流。
- 但当前 OmniRouters 的 OpenAPI 文档中，这个端点仍然以 `messages` 为主请求结构进行说明，因此字段级行为应以 OmniRouters 的 Apifox/OpenAPI 为准。

这点很重要：上游 OpenAI 官方文档可以帮助你理解 Responses 思路，但实际接 OmniRouters 时，还是要优先按照你们平台当前的 schema 来写请求。

## 最小示例

```bash
curl https://omnirouters.com/v1/responses \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "messages": [
      {
        "role": "system",
        "content": "You are a concise technical writer."
      },
      {
        "role": "user",
        "content": "请返回三条 API 简介。"
      }
    ],
    "response_format": {
      "type": "json_object"
    },
    "stream": false
  }'
```

## 常用字段

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `model` | 是 | 你要调用的 OmniRouters 模型名 |
| `messages` | 是 | 当前 OmniRouters 文档中使用的请求内容结构 |
| `response_format` | 否 | 控制输出为普通文本或 JSON 风格 |
| `tools` | 否 | 工具定义 |
| `stream` | 否 | 是否启用流式输出 |
| `max_tokens` | 否 | 限制输出长度 |

## 请求体参数 (Request Body)

当前 OmniRouters OpenAPI 对 `/v1/responses` 仍以 `messages` 为主请求结构进行说明；OpenAI 原生 Responses API 则更常使用 `input`、`instructions`、`max_output_tokens` 等字段。接入 OmniRouters 时，建议先按本页 `messages` 结构实现；如果你的 SDK 已经发送原生 Responses 字段，再按目标模型做兼容验证。

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 要调用的 OmniRouters 模型名，例如 `gpt-4o`、`gpt-5.2` 或平台模型目录中的别名。 |
| `messages` | array | 是 | OmniRouters 当前 schema 中的主要输入结构。由多条消息组成，详见下方 `messages` 对象结构。 |
| `input` | string 或 array | 兼容字段 | OpenAI 原生 Responses 输入字段。可以是纯文本、消息数组或工具结果数组。若使用 `messages`，通常不再同时传 `input`。 |
| `instructions` | string | 否 | 原生 Responses 中的系统/开发者级指令。使用 `messages` 时，也可以通过 `system` 消息表达。 |
| `temperature` | number | 否 | 采样温度，常见范围 `0` 到 `2`，默认通常为 `1`。 |
| `top_p` | number | 否 | nucleus sampling 参数，默认通常为 `1`。建议和 `temperature` 二选一重点调整。 |
| `n` | integer | 否 | 生成候选数量。OmniRouters schema 中保留了 OpenAI Chat 风格的 `n` 字段。 |
| `stream` | boolean | 否 | 是否返回流式事件。默认 `false`。 |
| `stop` | string 或 string[] | 否 | 停止序列，模型生成到指定文本时停止。 |
| `max_tokens` | integer | 否 | 当前 OmniRouters schema 中的最大输出 token 字段。 |
| `max_output_tokens` | integer | 兼容字段 | OpenAI 原生 Responses 常用的最大输出 token 字段。若平台同时支持，优先与 SDK 保持一致。 |
| `presence_penalty` | number | 否 | 话题存在惩罚，常见范围 `-2` 到 `2`。 |
| `frequency_penalty` | number | 否 | 重复频率惩罚，常见范围 `-2` 到 `2`。 |
| `logit_bias` | object | 否 | 对特定 token 做概率偏置。 |
| `user` | string | 否 | 终端用户标识。OpenAI 原生中该字段逐步被更细的安全和缓存标识替代，但兼容客户端仍常传。 |
| `response_format` | object | 否 | OmniRouters schema 中的结构化输出控制。常见值：`{ "type": "text" }`、`{ "type": "json_object" }`。 |
| `text` | object | 兼容字段 | OpenAI 原生 Responses 的文本输出配置，例如 `{ "format": { "type": "text" } }` 或 JSON Schema 格式。 |
| `seed` | integer | 否 | 尝试让结果更可复现，不保证完全确定。 |
| `tools` | array | 否 | 工具定义数组。当前 schema 明确支持 function tool。 |
| `tool_choice` | string 或 object | 否 | 控制模型如何选择工具。常见值：`none`、`auto`、`required`，也可指定某个 function。 |
| `parallel_tool_calls` | boolean | 兼容字段 | 是否允许并行工具调用。OpenAI 原生 Responses 常见字段。 |
| `previous_response_id` | string | 兼容字段 | 原生 Responses 的多轮状态字段，用于引用上一轮 response。使用 stateless `messages` 时通常不需要。 |
| `metadata` | object | 兼容字段 | 附加元数据，便于业务侧追踪或筛选。 |
| `store` | boolean | 兼容字段 | 是否存储响应。是否生效取决于平台实现。 |
| `reasoning` | object | 兼容字段 | 推理模型相关配置，例如 reasoning effort 或 summary。不同模型支持差异较大。 |
| `truncation` | string | 兼容字段 | 上下文超长时的截断策略。常见值：`disabled`、`auto`。 |
| `logprobs` | boolean | 否 | 是否返回输出 token 的 log probability。 |
| `top_logprobs` | integer | 否 | 搭配 `logprobs` 使用，常见范围 `0` 到 `20`。 |

## `messages` 数组中对象的结构

| 字段 | 类型 | 是否必填 | 适用角色 | 说明 |
| --- | --- | --- | --- | --- |
| `role` | string | 是 | 全部 | 消息作者角色。OmniRouters schema 明确包含 `system`、`user`、`assistant`、`tool`、`function`。 |
| `content` | string 或 Part[] | 是 | `system`、`user`、`assistant`、`tool`、`function` | 消息内容。可以是纯文本字符串，也可以是多模态 Part 数组。 |
| `name` | string | 否 | 任意 | 可选作者名称。常用于区分同一角色下的不同调用者或函数名。 |
| `tool_calls` | array | 否 | `assistant` | assistant 消息中由模型生成的工具调用。 |
| `tool_call_id` | string | 条件必填 | `tool` | 工具结果消息要关联的工具调用 id。 |

`tool_calls` 的常见结构：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 工具调用 id。 |
| `type` | string | 工具类型，当前最常见为 `function`。 |
| `function.name` | string | 函数名。 |
| `function.arguments` | string | 模型生成的参数 JSON 字符串。业务侧应校验后再执行。 |

## Part 对象的结构

在 OmniRouters 当前 `messages[].content` 结构中，Part 对象用于表达文本或多模态输入：

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | 是 | 内容类型。兼容 Chat 风格时常见 `text`、`image_url`；原生 Responses 风格常见 `input_text`、`input_image`、`input_file`。 |
| `text` | string | 条件必填 | 文本内容。`type` 为 `text` 或 `input_text` 时使用。 |
| `image_url` | object 或 string | 条件必填 | 图片输入。Chat 风格常见 `{ "url": "...", "detail": "auto" }`；Responses 原生 `input_image` 中也可直接使用图片 URL 或 data URL。 |
| `file_id` | string | 条件必填 | 已上传文件 id。原生 Responses `input_file` 常用。 |
| `file_data` | string | 条件必填 | base64 文件内容。适合不走文件上传时直接传入。 |
| `file_url` | string | 条件必填 | 文件 URL。目标模型和平台允许时可用。 |
| `filename` | string | 否 | 文件名。使用 `file_data` 时建议带上，便于模型理解文件类型。 |
| `detail` | string | 否 | 图片或文件解析精度。常见值：`low`、`high`、`auto`、`original`，具体取决于内容类型和模型能力。 |

常见写法：

```json
[
  { "type": "input_text", "text": "请解释这张图。" },
  {
    "type": "input_image",
    "image_url": "data:image/png;base64,...",
    "detail": "auto"
  }
]
```

## ExtraContent 对象的结构

Responses 路由没有像 Chat Completions 那样在当前 schema 中固定声明 `extra_body`。扩展能力主要通过下面这些对象表达：

| 对象 | 结构 | 说明 |
| --- | --- | --- |
| `response_format` | `{ "type": "text" }` 或 `{ "type": "json_object" }` | OmniRouters 当前 schema 中的输出格式控制。JSON 模式通常还需要在 prompt 中明确要求输出 JSON。 |
| `text.format` | `{ "type": "text" }`、`{ "type": "json_schema", "schema": {...}, "strict": true }` | OpenAI 原生 Responses 的结构化输出配置。是否可用取决于平台兼容情况。 |
| `tools[].function` | `{ "name": "...", "description": "...", "parameters": {...} }` | function tool 定义。`parameters` 是 JSON Schema。 |
| `tool_choice` | `"auto"`、`"none"`、`"required"` 或指定工具对象 | 控制模型是否必须调用工具、自动选择工具，或强制调用某个工具。 |
| `reasoning` | `{ "effort": "...", "summary": "..." }` | 推理模型扩展配置。具体枚举和行为以模型说明为准。 |
| `metadata` | 任意 JSON object | 业务自定义元数据，不参与模型推理时可用于追踪请求。 |

## 返回参数 (Response Body)

非流式 Responses 通常返回 Response 对象。字段是否完整返回取决于模型、工具、结构化输出和平台兼容层：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | Response id，后续可用于追踪或作为 `previous_response_id`。 |
| `object` | string | 对象类型，通常为 `response`。 |
| `created_at` | integer | 创建时间，Unix 秒级时间戳。 |
| `status` | string | 响应状态。常见值：`completed`、`incomplete`、`failed`、`cancelled`。 |
| `error` | object 或 null | 请求失败或生成失败时的错误对象。成功时通常为 `null`。 |
| `incomplete_details` | object 或 null | `status` 为 `incomplete` 时的原因说明，例如达到 token 限制。 |
| `model` | string | 实际使用的模型名。 |
| `instructions` | string 或 null | 本次请求使用的指令内容。 |
| `output` | array | 输出项数组。文本、工具调用、推理过程等都可能作为 output item 出现。 |
| `output_text` | string | SDK 常提供的便捷聚合字段，用于读取所有 `output_text` 拼接后的文本。原始 HTTP 响应不一定直接包含该字段。 |
| `parallel_tool_calls` | boolean | 是否允许并行工具调用。 |
| `previous_response_id` | string 或 null | 上一轮 response id。 |
| `reasoning` | object 或 null | 推理配置或推理摘要信息。 |
| `store` | boolean | 是否存储该响应。 |
| `temperature` | number | 本次响应使用的采样温度。 |
| `text` | object | 文本输出配置，例如 format。 |
| `tool_choice` | string 或 object | 本次使用的工具选择策略。 |
| `tools` | array | 本次可用的工具定义。 |
| `top_p` | number | 本次响应使用的 top_p。 |
| `truncation` | string | 截断策略。 |
| `usage` | object | token 用量统计。 |
| `metadata` | object | 请求附带的元数据。 |

`output[]` 中常见对象结构：

| 类型 | 关键字段 | 说明 |
| --- | --- | --- |
| `message` | `id`、`status`、`role`、`content[]` | 模型输出消息。`role` 通常为 `assistant`。 |
| `output_text` content | `type`、`text`、`annotations` | 文本输出片段。读取最终文本时通常取 `output[].content[].text`。 |
| `function_call` | `id`、`call_id`、`name`、`arguments`、`status` | 模型请求调用函数工具。业务侧执行后，将结果作为 tool output 继续提交。 |
| `reasoning` | `id`、`summary`、`status` | 推理模型可能返回的推理摘要或状态信息。 |
| `web_search_call` / `file_search_call` | `id`、`status`、查询或结果字段 | 使用内置工具时可能出现。OmniRouters 是否透传取决于具体工具支持。 |

`usage` 常见结构：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `input_tokens` | integer | 输入 token 数。 |
| `output_tokens` | integer | 输出 token 数。 |
| `total_tokens` | integer | 总 token 数。 |
| `input_tokens_details.cached_tokens` | integer | 命中缓存的输入 token 数。 |
| `output_tokens_details.reasoning_tokens` | integer | 推理 token 数。 |

当 `stream: true` 时，通常会返回 Responses SSE 事件流，例如 `response.created`、`response.output_item.added`、`response.output_text.delta`、`response.completed` 等。处理流式输出时，应按事件类型累积文本和工具调用参数，而不是假设每个事件都是完整 JSON 结果。

## 什么时候优先用它

适合这些场景：

- 你更偏向新式的 OpenAI 工作流
- 你希望更明确地控制结构化输出
- 你打算围绕工具调用或推理工作流设计接入方式
- 你愿意以 OmniRouters 当前 schema 为准做适配

## 什么时候别的协议更合适

- 如果你只想找一条最直接、最稳妥的通用协议，优先看 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- 如果你已经有 Anthropic 风格请求体，优先看 [Claude Messages](/zh/api/llm/claude-messages)
- 如果你已经有 Gemini 风格请求体，优先看 [Gemini Generate Content](/zh/api/llm/gemini-generate-content)

## 参考入口

- [LLM 文本生成总览](/zh/api/llm/)
- [协议对比](/zh/api/llm/protocol-comparison)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
