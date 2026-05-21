---
title: Claude Messages
---

# Claude Messages

`/v1/messages` 是 OmniRouters 上的 Claude 风格协议入口。

如果你已经在使用 Anthropic 风格请求体，希望迁移时少改 payload，这一页最适合你。

## 官方文档

- OmniRouters 路由：`POST https://omnirouters.com/v1/messages`
- Anthropic 官方文档：[Messages API reference](https://platform.claude.com/docs/en/api/messages)

## OmniRouters 说明

这里有两个需要特别注意的 OmniRouters 差异：

1. OmniRouters 推荐使用统一的 `Authorization: Bearer <token>` 认证，同时也兼容 Anthropic 原生 `x-api-key`
2. 请求头中需要带上 `anthropic-version`

```text
Authorization: Bearer <your-api-key>
anthropic-version: 2023-06-01
```

如果你使用 Anthropic 原生 SDK 或希望最大程度保持原生 Claude 请求格式，也可以改用：

```text
x-api-key: <your-api-key>
anthropic-version: 2023-06-01
```

`Authorization` 和 `x-api-key` 二选一即可，不建议在同一个请求里同时传两个认证头。

另外，别忘了 OmniRouters 上所有模型都能通过 OpenAI 兼容协议调用。只有当 Claude 风格请求体更适合你现有集成时，才更推荐使用这条路由。

## 最小示例

```bash
curl https://omnirouters.com/v1/messages \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20240620",
    "max_tokens": 512,
    "messages": [
      {
        "role": "user",
        "content": "请写一段新版本发布说明。"
      }
    ]
  }'
```

## 常用字段

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `model` | 是 | 在 OmniRouters 账号中启用的 Claude 风格模型名 |
| `messages` | 是 | 由 `user` / `assistant` 组成的对话数组 |
| `max_tokens` | 推荐填写 | 输出长度限制 |
| `system` | 否 | 系统提示词或角色说明 |
| `stream` | 否 | 是否启用流式输出 |
| `tools` | 否 | 工具定义 |

## 请求体参数 (Request Body)

`/v1/messages` 采用 Claude Messages 风格。和 OpenAI Chat 最大的差异是：`system` 不放在 `messages` 数组里，而是请求体顶层字段；`messages[].role` 只使用 `user` 和 `assistant`；`max_tokens` 在当前 OmniRouters OpenAPI 中是必填字段。

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 要调用的 Claude 风格模型名，填写 OmniRouters 账号中已启用的模型。 |
| `messages` | array | 是 | 对话消息数组，由 `user` 和 `assistant` 消息组成。需要传完整上下文。 |
| `max_tokens` | integer | 是 | 本次最多生成的 token 数。不同模型有不同上限，超过模型限制会报错或被截断。 |
| `system` | string | 否 | 系统提示词，用于设置角色、任务边界、输出风格等。不要写成 `messages` 中的 `system` 消息。 |
| `stream` | boolean | 否 | 是否启用 SSE 流式输出。默认 `false`。 |
| `temperature` | number | 否 | 随机性控制，当前 schema 范围为 `0` 到 `1`。建议只重点调整 `temperature` 和 `top_p` 其中一个。 |
| `top_p` | number | 否 | nucleus sampling 参数。 |
| `top_k` | integer | 否 | 每一步只从概率最高的 K 个候选中采样。 |
| `stop_sequences` | string[] | 否 | 自定义停止序列。模型生成到这些字符串时停止，返回体中 `stop_reason` 会是 `stop_sequence`。 |
| `metadata` | object | 否 | 请求元数据。当前 schema 明确支持 `metadata.user_id`。 |
| `tools` | array | 否 | 工具定义数组。Claude 使用 `name`、`description`、`input_schema` 描述工具。 |
| `tool_choice` | object | 否 | 控制工具使用策略。`type` 可为 `auto`、`any`、`tool`；当 `type` 为 `tool` 时需要指定 `name`。 |

常用请求头：

| Header | 是否必填 | 说明 |
| --- | --- | --- |
| `anthropic-version` | 是 | Anthropic API 版本，例如 `2023-06-01`。 |
| `Authorization` | 二选一 | OmniRouters 统一认证方式，格式为 `Bearer <your-api-key>`。 |
| `x-api-key` | 二选一 | Anthropic 原生认证方式。使用 Anthropic SDK 迁移时可以用这个头。 |

## `messages` 数组中对象的结构

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `role` | string | 是 | 消息角色，只能是 `user` 或 `assistant`。多轮对话时按时间顺序交替传入。 |
| `content` | string 或 Part[] | 是 | 消息内容。简单文本可直接传字符串；多模态、工具调用或工具结果使用 Part 数组。 |

Claude Messages 是无状态协议。每次请求都需要把希望模型看到的上下文重新放进 `messages`。如果要让 Claude 延续某个 assistant 回复，也可以在最后一条 `assistant` 消息中预填一段内容，让模型从该内容后继续生成。

## Part 对象的结构

Claude 中的 Part 通常称为 content block。`messages[].content` 为数组时，每个元素就是一个 content block：

| Part 类型 | 结构 | 适用角色 | 说明 |
| --- | --- | --- | --- |
| 文本 | `{ "type": "text", "text": "..." }` | `user`、`assistant` | 普通文本内容。 |
| 图片 | `{ "type": "image", "source": { "type": "base64", "media_type": "image/png", "data": "..." } }` | `user` | base64 图片输入。`media_type` 常见值包括 `image/jpeg`、`image/png`、`image/gif`、`image/webp`。 |
| 工具调用 | `{ "type": "tool_use", "id": "...", "name": "...", "input": {...} }` | `assistant` | 模型请求调用工具时返回。继续对话时应把该 block 保留在 assistant 消息中。 |
| 工具结果 | `{ "type": "tool_result", "tool_use_id": "...", "content": "..." }` | `user` | 业务侧执行工具后的结果。`tool_use_id` 对应上一轮 `tool_use.id`。 |

工具调用闭环通常是：

1. 请求中传 `tools`
2. 模型返回 `content[].type = "tool_use"`，且 `stop_reason = "tool_use"`
3. 业务侧执行工具
4. 下一次请求把上一轮 assistant 的 `tool_use` 和新的 user `tool_result` 一起传回

`tool_result.content` 也可以是数组，用于返回结构化文本或多模态结果；是否支持图片等内容取决于目标模型能力。

## ExtraContent 对象的结构

Claude Messages 没有名为 `extra_body` 的固定扩展字段，但下面几个对象承担了扩展信息的作用：

| 对象 | 结构 | 说明 |
| --- | --- | --- |
| `source` | `{ "type": "base64", "media_type": "...", "data": "..." }` | 图片 Part 的数据源。OmniRouters 当前 schema 声明 `type` 固定为 `base64`。 |
| `metadata` | `{ "user_id": "..." }` | 外部用户标识，便于业务侧追踪、风控或问题排查。建议传匿名化 id。 |
| `tools[]` | `{ "name": "...", "description": "...", "input_schema": {...} }` | 工具定义。`name` 建议只使用字母、数字、下划线和连字符；`input_schema` 为 JSON Schema。 |
| `tool_choice` | `{ "type": "auto" }`、`{ "type": "any" }`、`{ "type": "tool", "name": "..." }` | `auto` 表示模型自行决定；`any` 表示必须使用某个工具；`tool` 表示强制使用指定工具。 |

## 返回参数 (Response Body)

非流式请求通常返回 Claude Message 对象：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 消息 id，例如 `msg_...`。 |
| `type` | string | 对象类型，通常为 `message`。 |
| `role` | string | 固定为 `assistant`。 |
| `model` | string | 实际用于生成的模型名。 |
| `content` | array | assistant 输出的 content blocks。可能包含 `text`、`tool_use` 等。 |
| `content[].type` | string | 输出块类型。常见值：`text`、`tool_use`。 |
| `content[].text` | string | 文本输出。仅 `type = "text"` 时出现。 |
| `content[].id` | string | 工具调用 id。仅 `type = "tool_use"` 时出现。 |
| `content[].name` | string | 工具名。仅 `type = "tool_use"` 时出现。 |
| `content[].input` | object | 工具参数。仅 `type = "tool_use"` 时出现。 |
| `stop_reason` | string 或 null | 模型停止生成的原因。常见值见下表。 |
| `stop_sequence` | string 或 null | 如果因为自定义停止序列停止，这里返回命中的序列；否则通常为 `null`。 |
| `usage` | object | token 用量统计。 |
| `usage.input_tokens` | integer | 输入 token 数。 |
| `usage.output_tokens` | integer | 输出 token 数。 |
| `usage.cache_creation_input_tokens` | integer | 创建缓存使用的输入 token 数。平台透传时可能出现。 |
| `usage.cache_read_input_tokens` | integer | 从缓存读取的输入 token 数。平台透传时可能出现。 |

`stop_reason` 常见值：

| 值 | 含义 | 处理建议 |
| --- | --- | --- |
| `end_turn` | 模型自然结束本轮回复。 | 直接读取 `content`。 |
| `max_tokens` | 达到 `max_tokens` 限制。 | 如需完整内容，提高 `max_tokens` 后重试或让模型继续。 |
| `stop_sequence` | 命中自定义停止序列。 | 查看 `stop_sequence` 确认命中的文本。 |
| `tool_use` | 模型希望调用工具。 | 执行业务工具，并用 `tool_result` 继续下一轮。 |
| `pause_turn` | 模型暂停本轮，通常用于较长工具/服务端流程。 | 按原上下文继续请求。 |
| `refusal` | 安全策略导致拒答。 | 不要直接重放相同上下文；应调整请求或向用户返回合适提示。 |

当 `stream: true` 时，返回的是 Anthropic 风格 SSE 事件流。常见事件包括 `message_start`、`content_block_start`、`content_block_delta`、`content_block_stop`、`message_delta`、`message_stop`。`stop_reason` 通常在 `message_delta` 阶段出现。

## 什么时候优先用它

适合这些情况：

- 你已经有 Anthropic SDK 或 Claude 风格 payload
- 你希望尽量保持 Claude 的消息结构
- 你想降低协议迁移时的改造量

## 什么时候别的协议更合适

- 想要一条跨模型最通用的默认协议，优先看 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- 想要更偏现代 OpenAI 风格的结构化工作流，优先看 [OpenAI Responses](/zh/api/llm/openai-responses)

## 参考入口

- [LLM 文本生成总览](/zh/api/llm/)
- [协议对比](/zh/api/llm/protocol-comparison)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
