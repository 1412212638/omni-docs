---
title: OpenAI Responses
---

# OpenAI Responses

`/v1/responses` is the newer OpenAI-style route for structured response workflows, tool invocation, and reasoning-oriented integrations.

On OmniRouters, it is best used when you want a modern OpenAI-compatible entry point but still want to stay inside the OmniRouters model catalogue.

## Official Documentation

- OmniRouters route: `POST https://omnirouters.com/v1/responses`
- OpenAI official docs: [Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create)

## OmniRouters Notes

- All models enabled in your OmniRouters account can be called through the OpenAI-compatible protocol.
- On OmniRouters, this route is intended for Responses-style integrations.
- The current OmniRouters OpenAPI schema documents this endpoint with a `messages`-based body. For field-level behavior, treat the OmniRouters schema in Apifox as the source of truth.

That last point matters: upstream OpenAI examples may use request fields that differ from the current OmniRouters schema. Use the official docs for conceptual guidance, and use OmniRouters Apifox for exact request validation.

## Minimal Example

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
        "content": "Return a three-bullet API summary."
      }
    ],
    "response_format": {
      "type": "json_object"
    },
    "stream": false
  }'
```

## Common Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `model` | Yes | The OmniRouters model name you want to call |
| `messages` | Yes | Request content in the OmniRouters-documented schema |
| `response_format` | No | Ask for plain text or JSON-style output |
| `tools` | No | Tool definitions for structured tool use |
| `stream` | No | Return partial output chunks when enabled |
| `max_tokens` | No | Limit generated output length |

## Request Body Parameters

The current OmniRouters OpenAPI schema documents `/v1/responses` with a `messages`-based request body. Native OpenAI Responses integrations more commonly use fields such as `input`, `instructions`, and `max_output_tokens`. When calling OmniRouters, start with the `messages` structure documented here; if your SDK sends native Responses fields, validate compatibility with the target model.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | OmniRouters model name, such as `gpt-4o`, `gpt-5.2`, or a model alias from the OmniRouters catalogue. |
| `messages` | array | Yes | Main input structure in the current OmniRouters schema. Contains message objects described below. |
| `input` | string or array | Compatibility field | Native OpenAI Responses input. Can be plain text, message items, or tool results. Usually do not send both `messages` and `input` for the same request. |
| `instructions` | string | No | Native Responses system/developer-level instructions. With `messages`, a `system` message can express the same intent. |
| `temperature` | number | No | Sampling temperature, commonly from `0` to `2`, often defaulting to `1`. |
| `top_p` | number | No | Nucleus sampling parameter, often defaulting to `1`. Usually tune either `temperature` or `top_p`. |
| `n` | integer | No | Number of candidates. Kept in the OmniRouters schema for Chat-style compatibility. |
| `stream` | boolean | No | Whether to return streaming events. Defaults to `false`. |
| `stop` | string or string[] | No | Stop sequence or sequences. |
| `max_tokens` | integer | No | Maximum output token field in the current OmniRouters schema. |
| `max_output_tokens` | integer | Compatibility field | Native Responses maximum output token field. Prefer the field your SDK sends when platform compatibility is confirmed. |
| `presence_penalty` | number | No | Presence penalty, commonly from `-2` to `2`. |
| `frequency_penalty` | number | No | Frequency penalty, commonly from `-2` to `2`. |
| `logit_bias` | object | No | Probability bias for specific tokens. |
| `user` | string | No | End-user identifier. Native OpenAI APIs are moving toward more specific safety and cache identifiers, but compatible clients still commonly send this field. |
| `response_format` | object | No | Structured output control in the OmniRouters schema. Common values: `{ "type": "text" }`, `{ "type": "json_object" }`. |
| `text` | object | Compatibility field | Native Responses text output configuration, such as `{ "format": { "type": "text" } }` or JSON Schema formats. |
| `seed` | integer | No | Attempts to make results more reproducible. Determinism is not guaranteed. |
| `tools` | array | No | Tool definitions. The current schema explicitly supports function tools. |
| `tool_choice` | string or object | No | Controls tool selection. Common values are `none`, `auto`, and `required`, or an object selecting a specific function. |
| `parallel_tool_calls` | boolean | Compatibility field | Whether to allow parallel tool calls. Common in native Responses requests. |
| `previous_response_id` | string | Compatibility field | Native Responses state field for continuing from a previous response. Usually unnecessary for stateless `messages` requests. |
| `metadata` | object | Compatibility field | Custom metadata for tracing or filtering. |
| `store` | boolean | Compatibility field | Whether to store the response. Platform behavior may vary. |
| `reasoning` | object | Compatibility field | Reasoning-model configuration, such as effort or summary settings. Support varies by model. |
| `truncation` | string | Compatibility field | Context truncation strategy. Common values: `disabled`, `auto`. |
| `logprobs` | boolean | No | Whether to return token log probabilities. |
| `top_logprobs` | integer | No | Used with `logprobs`, commonly from `0` to `20`. |

## `messages` Object Structure

| Field | Type | Required | Roles | Description |
| --- | --- | --- | --- | --- |
| `role` | string | Yes | All | Message author role. The OmniRouters schema includes `system`, `user`, `assistant`, `tool`, and `function`. |
| `content` | string or Part[] | Yes | `system`, `user`, `assistant`, `tool`, `function` | Message content. Can be a plain string or a multimodal Part array. |
| `name` | string | No | Any | Optional author name, often used to distinguish participants or function names. |
| `tool_calls` | array | No | `assistant` | Tool calls generated by the assistant. |
| `tool_call_id` | string | Conditionally | `tool` | Tool call id that this tool-result message answers. |

Common `tool_calls` structure:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Tool call id. |
| `type` | string | Tool type, most commonly `function`. |
| `function.name` | string | Function name. |
| `function.arguments` | string | JSON string generated by the model. Validate it before executing the function. |

## Part Object Structure

In the current OmniRouters `messages[].content` shape, Part objects represent text or multimodal input:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | Yes | Content type. Chat-compatible inputs commonly use `text` and `image_url`; native Responses inputs commonly use `input_text`, `input_image`, and `input_file`. |
| `text` | string | Conditionally | Text content. Used when `type` is `text` or `input_text`. |
| `image_url` | object or string | Conditionally | Image input. Chat-style shape is usually `{ "url": "...", "detail": "auto" }`; native `input_image` may also use a direct image URL or data URL. |
| `file_id` | string | Conditionally | Uploaded file id, commonly used with native `input_file`. |
| `file_data` | string | Conditionally | Base64 file content for direct file input. |
| `file_url` | string | Conditionally | File URL, when allowed by the target model and platform. |
| `filename` | string | No | File name. Recommended when using `file_data`, so the model can infer file type. |
| `detail` | string | No | Image or file rendering detail. Common values include `low`, `high`, `auto`, and `original`, depending on content type and model support. |

Common example:

```json
[
  { "type": "input_text", "text": "Explain this image." },
  {
    "type": "input_image",
    "image_url": "data:image/png;base64,...",
    "detail": "auto"
  }
]
```

## ExtraContent Object Structure

The Responses route does not currently declare a fixed `extra_body` object in the OmniRouters schema. Extension behavior is mainly expressed through these objects:

| Object | Shape | Description |
| --- | --- | --- |
| `response_format` | `{ "type": "text" }` or `{ "type": "json_object" }` | Output format control in the OmniRouters schema. JSON mode usually still requires explicit JSON instructions in the prompt. |
| `text.format` | `{ "type": "text" }`, `{ "type": "json_schema", "schema": {...}, "strict": true }` | Native Responses structured output configuration. Availability depends on compatibility support. |
| `tools[].function` | `{ "name": "...", "description": "...", "parameters": {...} }` | Function tool definition. `parameters` is a JSON Schema object. |
| `tool_choice` | `"auto"`, `"none"`, `"required"`, or a specific tool object | Controls whether the model may call tools, must call tools, or must call one selected tool. |
| `reasoning` | `{ "effort": "...", "summary": "..." }` | Reasoning-model extension configuration. Exact enum values and behavior depend on the model. |
| `metadata` | Any JSON object | Business metadata for tracing. It should not be relied on as model input. |

## Response Body Parameters

Non-streaming Responses usually return a Response object. Exact fields vary by model, tools, structured output settings, and platform compatibility:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Response id. Can be used for tracing or as `previous_response_id`. |
| `object` | string | Object type, usually `response`. |
| `created_at` | integer | Unix timestamp in seconds. |
| `status` | string | Response status. Common values: `completed`, `incomplete`, `failed`, `cancelled`. |
| `error` | object or null | Error object when request or generation fails. Usually `null` on success. |
| `incomplete_details` | object or null | Reason details when `status` is `incomplete`, such as token limits. |
| `model` | string | Model actually used. |
| `instructions` | string or null | Instructions used for this response. |
| `output` | array | Output items. Text, tool calls, and reasoning items may all appear here. |
| `output_text` | string | SDKs often expose this convenience aggregation of all `output_text` content. The raw HTTP response may not include it directly. |
| `parallel_tool_calls` | boolean | Whether parallel tool calls were enabled. |
| `previous_response_id` | string or null | Previous response id. |
| `reasoning` | object or null | Reasoning configuration or summary information. |
| `store` | boolean | Whether this response is stored. |
| `temperature` | number | Sampling temperature used. |
| `text` | object | Text output configuration, such as format. |
| `tool_choice` | string or object | Tool selection strategy used. |
| `tools` | array | Tools available to this response. |
| `top_p` | number | `top_p` used. |
| `truncation` | string | Truncation strategy. |
| `usage` | object | Token usage. |
| `metadata` | object | Metadata attached to the request. |

Common `output[]` item shapes:

| Type | Key fields | Description |
| --- | --- | --- |
| `message` | `id`, `status`, `role`, `content[]` | Model output message. `role` is usually `assistant`. |
| `output_text` content | `type`, `text`, `annotations` | Text output part. Read final text from `output[].content[].text`. |
| `function_call` | `id`, `call_id`, `name`, `arguments`, `status` | Function call requested by the model. Execute it in your application, then submit the tool output. |
| `reasoning` | `id`, `summary`, `status` | Reasoning summary or state returned by reasoning models. |
| `web_search_call` / `file_search_call` | `id`, `status`, query or result fields | May appear when built-in tools are used. OmniRouters passthrough depends on tool support. |

Common `usage` structure:

| Field | Type | Description |
| --- | --- | --- |
| `input_tokens` | integer | Input token count. |
| `output_tokens` | integer | Output token count. |
| `total_tokens` | integer | Total token count. |
| `input_tokens_details.cached_tokens` | integer | Input tokens served from cache. |
| `output_tokens_details.reasoning_tokens` | integer | Reasoning token count. |

When `stream: true`, Responses-style SSE events may include `response.created`, `response.output_item.added`, `response.output_text.delta`, `response.completed`, and related events. Handle streams by accumulating text and tool-call arguments by event type instead of assuming every event is a complete final JSON object.

## When to Use This Route

Use this route if:

- you prefer newer OpenAI-style workflows
- you want to structure outputs more explicitly
- you want to prepare for tool-oriented integrations
- you are comfortable following the OmniRouters-specific schema in Apifox

## When Another Route May Be Better

- Use [OpenAI Chat Completions](/api/llm/openai-chat) if you want the most straightforward and broadly familiar request shape
- Use [Claude Messages](/api/llm/claude-messages) for Anthropic-native payloads
- Use [Gemini Generate Content](/api/llm/gemini-generate-content) for Gemini-native payloads

## Reference Links

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)
