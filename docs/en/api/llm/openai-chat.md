---
title: OpenAI Chat Completions
---

# OpenAI Chat Completions

`/v1/chat/completions` is the simplest and broadest LLM text-generation protocol on OmniRouters.

It is the best default when you want:

- a familiar OpenAI-style `messages` payload
- broad SDK compatibility
- one request format that can be reused across different model families

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1/chat/completions`
- OpenAI official docs: [Chat API reference](https://developers.openai.com/api/reference/resources/chat)

## OmniRouters Notes

- All models enabled in your OmniRouters account can be called through the OpenAI-compatible protocol.
- That includes Claude-style and Gemini-style models, as long as the model name is available in your account.
- Authentication stays the same as other OmniRouters APIs:

```text
Authorization: Bearer <your-api-key>
```

## Minimal Example

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
        "content": "Write a short product introduction for OmniRouters."
      }
    ],
    "stream": false
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | The OmniRouters model name you want to call |
| `messages` | Yes | Conversation history, usually `system`, `user`, and `assistant` roles |
| `stream` | No | Return streaming chunks when set to `true` |
| `temperature` | No | Control randomness when supported by the model |
| `top_p` | No | Alternative sampling control |
| `extra_body` | No | Provider-specific extension object when required by a capability |

## Request Body Parameters

The table below combines fields explicitly declared in the current OmniRouters OpenAPI schema with common OpenAI Chat Completions-compatible fields that may be accepted when the selected model supports them. Sampling, tool use, and multimodal support can differ by model.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Model name enabled in your OmniRouters account, such as `gpt-4o`, `claude-...`, `gemini-...`, or a model alias from the OmniRouters catalogue. |
| `messages` | array | Yes | Conversation messages in chronological order. Usually contains `system`, `user`, and `assistant` messages. See the message object structure below. |
| `stream` | boolean | No | Whether to return Server-Sent Events instead of a complete JSON object. Defaults to `false`. |
| `temperature` | number | No | Sampling temperature, commonly from `0` to `2`. Higher values make output more varied; lower values make it more deterministic. Some reasoning models may ignore or restrict it. |
| `top_p` | number | No | Nucleus sampling parameter, commonly from `0` to `1`. Usually tune either `temperature` or `top_p`, not both heavily. |
| `n` | integer | No | Number of candidate completions to generate. Keep this at `1` unless you really need multiple candidates, because each candidate consumes tokens. |
| `stop` | string or string[] | No | Stop sequences. Generation stops when the model emits one of these strings. Commonly up to 4 sequences. |
| `max_tokens` | integer | No | Maximum number of tokens to generate. Some newer models may also support compatibility fields such as `max_completion_tokens`. |
| `presence_penalty` | number | No | Presence penalty, commonly from `-2` to `2`. Positive values encourage new topics. |
| `frequency_penalty` | number | No | Frequency penalty, commonly from `-2` to `2`. Positive values reduce repeated phrasing. |
| `logit_bias` | object | No | Adjusts likelihood for specific token ids. Keys are usually token ids and values are bias scores. |
| `user` | string | No | End-user identifier for debugging, abuse monitoring, or cost attribution. Prefer an anonymized id. |
| `response_format` | object | No | Output format control. Common values include `{ "type": "text" }` and `{ "type": "json_object" }`; models with structured output support may also accept JSON Schema formats. |
| `seed` | integer | No | Attempts to make sampling more reproducible. Exact determinism is not guaranteed. |
| `tools` | array | No | Tool definitions. The most common shape is a function tool: `{ "type": "function", "function": { "name": "...", "parameters": {...} } }`. |
| `tool_choice` | string or object | No | Controls whether tools are used. Common values are `none`, `auto`, and `required`, or an object selecting a specific function. |
| `parallel_tool_calls` | boolean | No | Whether the model may issue multiple tool calls in parallel. Useful to control complex tool workflows. |
| `logprobs` | boolean | No | Whether to return token log probabilities, when supported by the model. |
| `top_logprobs` | integer | No | Used with `logprobs`; returns the top candidate tokens per output position, commonly from `0` to `20`. |
| `extra_body` | object | No | OmniRouters extension object for provider-specific parameters. The current OpenAPI schema explicitly declares `google.image_config`. |

## `messages` Object Structure

| Field | Type | Required | Roles | Description |
| --- | --- | --- | --- | --- |
| `role` | string | Yes | All | Message role. The current OmniRouters OpenAPI schema explicitly declares `system`, `user`, and `assistant`; OpenAI-native clients may also use `developer`, `tool`, and `function`. For cross-model use, `system`, `user`, and `assistant` are the safest choices. |
| `content` | string or Part[] | Yes | `system`, `user`, `assistant` | Message body. Pass a string for plain text, or a Part array for multimodal or structured content. The current OmniRouters Chat schema declares this as string, so validate Part arrays with the target model before relying on them. |
| `name` | string | No | `system`, `user`, `assistant` | Optional participant name, useful when multiple participants share the same role. |
| `tool_calls` | array | No | `assistant` | Tool calls generated by the model. When continuing a tool workflow, include the assistant message with its `tool_calls`. |
| `tool_call_id` | string | Conditionally | `tool` | The id of the tool call this tool result answers. Required for tool-result messages. |
| `function_call` | object | No | `assistant` | Legacy function-calling field, replaced by `tool_calls`. Kept for older client compatibility. |

Function tool calls commonly contain:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Tool call id. A later `tool` message refers to it with `tool_call_id`. |
| `type` | string | Tool type, usually `function`. |
| `function.name` | string | Function name to call. |
| `function.arguments` | string | JSON string generated by the model. Validate it before executing the function. |

## Part Object Structure

When `messages[].content` is an array, each item is a Part:

| Part type | Shape | Description |
| --- | --- | --- |
| Text | `{ "type": "text", "text": "..." }` | Structured text part. |
| Image URL or base64 data URL | `{ "type": "image_url", "image_url": { "url": "...", "detail": "auto" } }` | `url` may be a public image URL or a `data:image/png;base64,...` URL. `detail` commonly accepts `auto`, `low`, or `high`. |
| Audio input | `{ "type": "input_audio", "input_audio": { "data": "...", "format": "mp3" } }` | Base64 audio input. `format` commonly accepts `mp3` or `wav`. Only supported by multimodal audio models. |
| File input | `{ "type": "file", "file": { "file_id": "...", "file_data": "...", "filename": "..." } }` | File input by uploaded file id or base64 file content. Support depends on model and platform capability. |
| Refusal | `{ "type": "refusal", "refusal": "..." }` | Usually appears in assistant history or response content to represent a refusal. Rarely authored by user requests. |

## ExtraContent Object Structure

`extra_body` carries model- or provider-specific options outside the standard protocol fields. The current OpenAPI schema explicitly declares this structure:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `extra_body.google` | object | No | Google / Gemini-specific configuration container. |
| `extra_body.google.image_config` | object | No | Image generation configuration. Meaningful only when the selected model supports image output or image generation. |
| `extra_body.google.image_config.aspect_ratio` | string | No | Image aspect ratio. Allowed values: `1:1`, `3:4`, `4:3`, `9:16`, `16:9`. Defaults to `16:9`. |
| `extra_body.google.image_config.image_size` | string | No | Image size or quality tier. Allowed values: `1K`, `2K`, `4K`. Defaults to `1K`. |

Example:

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

## Response Body Parameters

Non-streaming requests usually return a Chat Completion object:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Completion id. |
| `object` | string | Object type, usually `chat.completion`. |
| `created` | integer | Unix timestamp in seconds. |
| `model` | string | Model actually used for generation. |
| `choices` | array | Candidate responses. More than one may be returned when `n` is greater than `1`. |
| `choices[].index` | integer | Candidate index. |
| `choices[].message` | object | Assistant message generated by the model. |
| `choices[].message.role` | string | Usually `assistant`. |
| `choices[].message.content` | string or null | Generated text. May be null for tool-call or refusal flows. |
| `choices[].message.refusal` | string or null | Refusal text, usually `null` when there is no refusal. |
| `choices[].message.tool_calls` | array or null | Tool calls requested by the model. Execute them in your application, then send results back as tool messages. |
| `choices[].message.annotations` | array | Additional annotations such as citations or retrieved sources. Returned only when supported. |
| `choices[].finish_reason` | string | Stop reason. Common values: `stop`, `length`, `content_filter`, `tool_calls`, `function_call`. |
| `choices[].logprobs` | object or null | Token log probability information when requested and supported. |
| `usage` | object | Token usage. |
| `usage.prompt_tokens` | integer | Input token count. |
| `usage.completion_tokens` | integer | Output token count. |
| `usage.total_tokens` | integer | Total input plus output tokens. |
| `usage.prompt_tokens_details` | object | Input-token breakdown, such as `cached_tokens` or `audio_tokens`. |
| `usage.completion_tokens_details` | object | Output-token breakdown, such as `reasoning_tokens`, `audio_tokens`, `accepted_prediction_tokens`, or `rejected_prediction_tokens`. |
| `service_tier` | string | Processing tier, when returned by the platform or model. |
| `system_fingerprint` | string | Backend fingerprint for reproducibility debugging. May be absent. |

When `stream: true`, the API returns SSE chunks. Each chunk commonly contains:

| Field | Type | Description |
| --- | --- | --- |
| `object` | string | Usually `chat.completion.chunk`. |
| `id` | string | Completion id, usually the same across all chunks in the stream. |
| `created` | integer | Chunk creation timestamp. |
| `model` | string | Model name. |
| `choices[].delta` | object | Incremental content. May include `role`, `content`, `tool_calls`, or `refusal`. |
| `choices[].finish_reason` | string or null | Usually `null` until the final chunk that carries the stop reason. |
| `usage` | object | Usage may appear near the end when stream usage reporting is enabled. |

## When to Use This Route

Use this route if:

- you want the safest cross-model default
- you already have OpenAI chat client code
- you want a clean `messages`-based request shape
- you do not need provider-native payload formats

## When Another Route May Be Better

- Use [OpenAI Responses](/api/llm/openai-responses) if you want a newer, more structured OpenAI-style workflow
- Use [Claude Messages](/api/llm/claude-messages) if you want Anthropic-style request bodies
- Use [Gemini Generate Content](/api/llm/gemini-generate-content) if you want Gemini-style `contents` / `parts` payloads

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
