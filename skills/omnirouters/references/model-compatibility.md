# Model Compatibility Notes

Use this reference for customer questions like:

- "OpenAI format calling Gemini has a feature that does not work"
- "Why does this parameter work with OpenAI but not Claude/Gemini?"
- "Should I use `/v1/chat/completions` or `/v1beta/models/...:generateContent`?"
- "Why is JSON/tool/multimodal/streaming behavior different across models?"

## Core Principle

OmniRouters provides compatible request protocols, but compatibility does not mean every upstream model supports every provider-specific field with identical behavior.

Say this clearly:

> OmniRouters can route OpenAI-compatible requests to different model families, but Gemini, Claude, OpenAI, and other upstreams have different native capabilities. Some fields may be ignored, transformed, or only partially supported depending on the selected model and route.

## Protocol Choice

| Customer Need | Recommended Route |
| --- | --- |
| Broad compatibility, normal chat | `/v1/chat/completions` |
| OpenAI Responses-style workflows | `/v1/responses` |
| Claude-native message structure | `/v1/messages` |
| Gemini-native features | `/v1beta/models/{model}:generateContent` |
| Embeddings | `/v1/embeddings` |
| Rerank | `/v1/rerank` |
| Image generation | `/v1/images/generations` or Gemini native image route if required |
| Audio speech/transcription | `/v1/audio/*` |

## OpenAI Format -> Gemini

Common caveats:

- OpenAI-only fields may not map 1:1 to Gemini native fields.
- `response_format` and strict JSON behavior can differ from Gemini native `responseMimeType` / schema behavior.
- Tool calling/function calling may require provider-specific payload shapes for advanced features.
- Multimodal input works best when the selected route and model both support the input format.
- Thinking/reasoning parameters are model-specific; if the model exposes native thinking controls, prefer Gemini native format.
- Some safety, generation, or media options are Gemini-native and should be sent through `/v1beta/models/{model}:generateContent`.

Customer reply template:

```text
您好，这属于 OpenAI 兼容协议转 Gemini 模型时的字段兼容差异。
OmniRouters 可以用 OpenAI 格式调用 Gemini 模型，但 Gemini 的原生能力和 OpenAI 字段并不是完全一一对应，因此部分参数可能会被忽略或转换为近似行为。

如果您依赖 Gemini 的原生能力，建议改用 `/v1beta/models/{model}:generateContent`。如果只是普通对话，可以继续使用 `/v1/chat/completions`。
```

## OpenAI Format -> Claude

Common caveats:

- Claude's native API uses `/v1/messages`, `anthropic-version`, `system`, `messages`, and `max_tokens`.
- OpenAI `messages` can be converted for normal chat, but provider-specific Claude features are more reliable through `/v1/messages`.
- Tool use and structured output may not behave exactly like OpenAI.

Customer reply template:

```text
您好，这通常是 OpenAI 兼容格式与 Claude 原生 Messages 格式之间的差异。
如果只是普通文本对话，可以继续使用 `/v1/chat/completions`；如果需要 Claude 原生工具调用、系统提示或高级参数，建议使用 `/v1/messages`。
```

## When To Ask For More Info

Ask for:

- endpoint path
- model name
- request ID if the call reached OmniRouters
- sanitized request body with API key removed
- expected behavior and actual behavior

Never ask for the full API key.
