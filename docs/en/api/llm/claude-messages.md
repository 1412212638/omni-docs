---
title: Claude Messages
---

# Claude Messages

`/v1/messages` is the Claude-style protocol route on OmniRouters.

Use it when you already have Anthropic-style request bodies and want a migration path with less payload reshaping.

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1/messages`
- Anthropic official docs: [Messages API reference](https://platform.claude.com/docs/en/api/messages)

## OmniRouters Notes

There are two OmniRouters-specific differences to remember:

1. Authentication uses OmniRouters bearer auth, not Anthropic's `x-api-key`
2. The request header should include `anthropic-version`

```text
Authorization: Bearer <your-api-key>
anthropic-version: 2023-06-01
```

Also remember that all models can still be called through the OpenAI-compatible protocol. Choose Claude Messages only when the Claude-style request format is the better fit for your integration.

## Minimal Example

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
        "content": "Write a short release note for a new API version."
      }
    ]
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | Claude-compatible model name enabled in your OmniRouters account |
| `messages` | Yes | Conversation messages with `user` and `assistant` roles |
| `max_tokens` | Recommended | Output length limit |
| `system` | No | System prompt or role guidance |
| `stream` | No | Enable streaming output |
| `tools` | No | Tool definitions when supported in your workflow |

## Request Body Parameters

`/v1/messages` uses the Claude Messages-style payload. The biggest differences from OpenAI Chat are: `system` is a top-level request field rather than a message in the `messages` array; `messages[].role` only uses `user` and `assistant`; and `max_tokens` is required in the current OmniRouters OpenAPI schema.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Claude-compatible model enabled in your OmniRouters account. |
| `messages` | array | Yes | Conversation messages made of `user` and `assistant` entries. Send the complete context you want the model to see. |
| `max_tokens` | integer | Yes | Maximum number of tokens to generate. Different models have different limits; values above the model limit may fail or be truncated. |
| `system` | string | No | System prompt for role, task boundaries, or output style. Do not put this in `messages` as a `system` role. |
| `stream` | boolean | No | Whether to return SSE streaming output. Defaults to `false`. |
| `temperature` | number | No | Randomness control. The current schema declares a range from `0` to `1`. Usually tune either `temperature` or `top_p`, not both. |
| `top_p` | number | No | Nucleus sampling parameter. |
| `top_k` | integer | No | Samples only from the top K token candidates at each step. |
| `stop_sequences` | string[] | No | Custom stop sequences. If the model emits one, `stop_reason` is `stop_sequence`. |
| `metadata` | object | No | Request metadata. The current schema explicitly supports `metadata.user_id`. |
| `tools` | array | No | Tool definitions. Claude tools use `name`, `description`, and `input_schema`. |
| `tool_choice` | object | No | Controls tool use. `type` may be `auto`, `any`, or `tool`; when `type` is `tool`, provide `name`. |

## `messages` Object Structure

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | string | Yes | Message role. Must be `user` or `assistant`. For multi-turn conversations, pass messages in chronological order. |
| `content` | string or Part[] | Yes | Message content. Plain text can be sent as a string; multimodal input, tool calls, and tool results use Part arrays. |

Claude Messages is stateless. Every request must include the context the model should see. You can also prefill part of Claude's response by ending the request with an `assistant` message whose `content` the model should continue from.

## Part Object Structure

In Claude, Parts are usually called content blocks. When `messages[].content` is an array, every item is a content block:

| Part type | Shape | Roles | Description |
| --- | --- | --- | --- |
| Text | `{ "type": "text", "text": "..." }` | `user`, `assistant` | Plain text content. |
| Image | `{ "type": "image", "source": { "type": "base64", "media_type": "image/png", "data": "..." } }` | `user` | Base64 image input. Common `media_type` values include `image/jpeg`, `image/png`, `image/gif`, and `image/webp`. |
| Tool use | `{ "type": "tool_use", "id": "...", "name": "...", "input": {...} }` | `assistant` | Returned by the model when it wants to call a tool. Keep this block in the assistant message when continuing the conversation. |
| Tool result | `{ "type": "tool_result", "tool_use_id": "...", "content": "..." }` | `user` | Result returned by your application after executing a tool. `tool_use_id` maps to the previous `tool_use.id`. |

A tool loop usually works like this:

1. Send `tools` in the request
2. The model returns `content[].type = "tool_use"` and `stop_reason = "tool_use"`
3. Your application executes the tool
4. The next request includes the previous assistant `tool_use` and a new user `tool_result`

`tool_result.content` may also be an array for structured or multimodal results; support for images or other content depends on the selected model.

## ExtraContent Object Structure

Claude Messages does not use a fixed field named `extra_body`, but these objects carry extension data:

| Object | Shape | Description |
| --- | --- | --- |
| `source` | `{ "type": "base64", "media_type": "...", "data": "..." }` | Data source for image Parts. The current OmniRouters schema declares `type` as `base64`. |
| `metadata` | `{ "user_id": "..." }` | External user identifier for tracing, abuse monitoring, or debugging. Prefer an anonymized id. |
| `tools[]` | `{ "name": "...", "description": "...", "input_schema": {...} }` | Tool definition. Prefer letters, digits, underscores, and hyphens in `name`; `input_schema` is JSON Schema. |
| `tool_choice` | `{ "type": "auto" }`, `{ "type": "any" }`, `{ "type": "tool", "name": "..." }` | `auto` lets the model decide; `any` requires some tool use; `tool` forces a specific tool. |

## Response Body Parameters

Non-streaming requests usually return a Claude Message object:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Message id, for example `msg_...`. |
| `type` | string | Object type, usually `message`. |
| `role` | string | Always `assistant`. |
| `model` | string | Model actually used. |
| `content` | array | Assistant output content blocks. May include `text`, `tool_use`, and other block types. |
| `content[].type` | string | Output block type. Common values: `text`, `tool_use`. |
| `content[].text` | string | Text output, present when `type = "text"`. |
| `content[].id` | string | Tool call id, present when `type = "tool_use"`. |
| `content[].name` | string | Tool name, present when `type = "tool_use"`. |
| `content[].input` | object | Tool arguments, present when `type = "tool_use"`. |
| `stop_reason` | string or null | Why generation stopped. Common values are listed below. |
| `stop_sequence` | string or null | The matched custom stop sequence, if `stop_reason` is `stop_sequence`; otherwise usually `null`. |
| `usage` | object | Token usage. |
| `usage.input_tokens` | integer | Input token count. |
| `usage.output_tokens` | integer | Output token count. |
| `usage.cache_creation_input_tokens` | integer | Input tokens used to create cache entries, when passed through. |
| `usage.cache_read_input_tokens` | integer | Input tokens read from cache, when passed through. |

Common `stop_reason` values:

| Value | Meaning | Handling |
| --- | --- | --- |
| `end_turn` | The model naturally finished the turn. | Read `content`. |
| `max_tokens` | The response hit `max_tokens`. | Increase `max_tokens` or ask the model to continue. |
| `stop_sequence` | A custom stop sequence was reached. | Inspect `stop_sequence`. |
| `tool_use` | The model wants to call a tool. | Execute the tool and continue with a `tool_result`. |
| `pause_turn` | The model paused the turn, often for longer server-side flows. | Continue with the same context. |
| `refusal` | The model refused due to safety policy. | Do not simply replay the same context; revise the request or return an appropriate user-facing message. |

When `stream: true`, the route returns Anthropic-style SSE events. Common events include `message_start`, `content_block_start`, `content_block_delta`, `content_block_stop`, `message_delta`, and `message_stop`. `stop_reason` is usually provided in `message_delta`.

## When to Use This Route

Use this route if:

- you are migrating existing Anthropic SDK code
- your app already works with Claude-style payloads
- you want to preserve Claude message conventions

## When Another Route May Be Better

- Use [OpenAI Chat Completions](/api/llm/openai-chat) if you want the cleanest cross-provider default
- Use [OpenAI Responses](/api/llm/openai-responses) for newer OpenAI-style structured workflows

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
