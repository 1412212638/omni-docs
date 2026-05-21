---
title: Gemini Generate Content
---

# Gemini Generate Content

`/v1beta/models/{model}:generateContent` 是 OmniRouters 上的 Gemini 风格协议入口。

如果你已经在使用 Gemini 的 `contents` / `parts` 请求结构，并希望迁移时保留这种风格，就优先看这一页。

## 官方文档

- OmniRouters 路由：`POST https://omnirouters.com/v1beta/models/{model}:generateContent`
- Google 官方文档：[Gemini generateContent reference](https://ai.google.dev/api/generate-content)

## OmniRouters 说明

这里有几个 OmniRouters 侧的关键差异：

1. 在 OmniRouters 上统一使用 Bearer Token 认证，而不是 `x-goog-api-key`
2. 路由路径位于 `https://omnirouters.com/v1beta/...`
3. 当前 OmniRouters OpenAPI 文档特别说明：多媒体上传建议使用 `inlineData` 的 base64 形式，而不是 `fileData.fileUri`

```text
Authorization: Bearer <your-api-key>
```

另外，OmniRouters 上所有模型都能通过 OpenAI 兼容协议调用。只有在你特别希望保留 Gemini 风格请求结构时，才更推荐使用这条路由。

## 最小示例

```bash
curl https://omnirouters.com/v1beta/models/gemini-2.5-flash:generateContent \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-2.5-flash",
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "请用三条简洁要点概括 OmniRouters。"
          }
        ]
      }
    ]
  }'
```

## 常用字段

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `model` | 是 | 在 OmniRouters 账号中启用的 Gemini 风格模型名 |
| `contents` | 是 | Gemini 风格内容数组 |
| `parts` | 是 | 每条消息中的组成部分，如 `text`、`inlineData` |
| `generationConfig` | 否 | 采样、最大输出长度、格式等生成参数 |
| `systemInstruction` | 否 | 系统行为指令 |
| `safetySettings` | 否 | 安全过滤配置 |

## 请求体参数 (Request Body)

Gemini 原生协议里，OpenAI/Claude 中的 `messages` 概念对应 `contents`。每个 `contents[]` 对象表示一轮消息，每条消息由多个 `parts[]` 组成。OmniRouters 当前 OpenAPI 要求路径中的 `{model}` 和请求体里的 `model` 都能表达模型名；实际接入时建议保持一致。

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | Gemini 模型名。路径中也会出现，例如 `/v1beta/models/gemini-2.5-flash:generateContent`。建议 body 中的 `model` 与路径一致。 |
| `contents` | array | 是 | Gemini 风格消息数组。单轮请求通常只有一个 `user` content；多轮对话需要把历史 `user` 和 `model` content 一起传入。 |
| `generationConfig` | object | 否 | 生成配置，包括采样、最大输出 token、响应 MIME 类型和 JSON Schema。详见 ExtraContent。 |
| `systemInstruction` | object | 否 | 系统指令。当前 OpenAPI 声明为 `{ "parts": [{ "text": "..." }] }`。 |
| `safetySettings` | array | 否 | 安全过滤设置。可按类别设置不同拦截阈值。 |
| `tools` | array | Gemini 原生字段 | 函数调用、代码执行等工具定义。OmniRouters 当前 generic OpenAPI 未展开，使用前需确认模型和平台支持。 |
| `toolConfig` | object | Gemini 原生字段 | 工具调用配置，例如函数调用模式。 |
| `cachedContent` | string | Gemini 原生字段 | 引用已缓存上下文，格式通常类似 `cachedContents/{id}`。是否支持取决于平台实现。 |

## `contents` 数组中对象的结构

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `role` | string | 是 | 消息角色。常见值：`user` 表示用户输入，`model` 表示模型历史回复。默认可视为 `user`。 |
| `parts` | Part[] | 是 | 内容片段数组。文本、图片、音频、视频、PDF、工具调用等都通过 Part 表达。 |

多轮示例：

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "请记住：项目代号是 Aurora。" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "好的，我已记住。" }]
    },
    {
      "role": "user",
      "parts": [{ "text": "项目代号是什么？" }]
    }
  ]
}
```

## Part 对象的结构

OmniRouters 当前 OpenAPI 对 Gemini Part 明确声明了 `text`、`inlineData`、`fileData`。其中多媒体上传特别建议使用 `inlineData` 的 base64 形式；当前不支持 `fileData.fileUri` 或 Gemini File API。

| Part 类型 | 结构 | 是否支持 | 说明 |
| --- | --- | --- | --- |
| 文本 | `{ "text": "..." }` | 支持 | 文本提示词、问题、说明、系统指令都使用该结构。 |
| 内联文件 | `{ "inlineData": { "mimeType": "image/png", "data": "..." } }` | 支持 | 直接传 base64 文件内容。适用于图片、PDF、音频、视频等。 |
| 文件引用 | `{ "fileData": { "mimeType": "...", "fileUri": "..." } }` | 当前不支持 | Gemini 原生可引用 File API 或 `gs://` 文件；OmniRouters 当前说明不支持，应改用 `inlineData`。 |
| 函数调用 | `{ "functionCall": { "name": "...", "args": {...} } }` | 视模型而定 | Gemini 原生工具调用返回结构。generic OpenAPI 未展开。 |
| 函数结果 | `{ "functionResponse": { "name": "...", "response": {...} } }` | 视模型而定 | 业务侧执行函数后返回给模型的结果。 |
| 可执行代码 | `{ "executableCode": { "language": "...", "code": "..." } }` | 视模型而定 | Gemini 原生代码执行能力相关结构。 |
| 代码执行结果 | `{ "codeExecutionResult": { "outcome": "...", "output": "..." } }` | 视模型而定 | 代码执行工具返回的结果结构。 |

`inlineData` 对象结构：

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `mimeType` | string | 是 | 文件 MIME 类型，例如 `image/png`、`image/jpeg`、`audio/mp3`、`audio/wav`、`video/mp4`、`application/pdf`。 |
| `data` | string | 是 | base64 编码后的文件内容，不要带 `data:...;base64,` 前缀，除非目标模型文档明确允许。 |

## ExtraContent 对象的结构

Gemini 的扩展配置主要放在 `generationConfig`、`systemInstruction`、`safetySettings` 中：

| 对象/字段 | 类型 | 说明 |
| --- | --- | --- |
| `generationConfig.temperature` | number | 随机性控制，当前 OpenAPI 范围 `0.0` 到 `2.0`，默认 `1`。 |
| `generationConfig.topP` | number | nucleus sampling 参数，范围 `0` 到 `1`，默认 `0.95`。 |
| `generationConfig.topK` | integer | 限制候选 token 数，默认 `40`，最小 `1`。 |
| `generationConfig.maxOutputTokens` | integer | 最大输出 token 数，默认 `8192`，最小 `1`。 |
| `generationConfig.responseMimeType` | string | 响应 MIME 类型，例如 `text/plain`、`application/json`。 |
| `generationConfig.responseSchema` | object | 当 `responseMimeType` 为 `application/json` 时，可传 JSON Schema 控制输出结构。 |
| `systemInstruction.parts[]` | Part[] | 系统指令内容。当前建议只传文本 Part。 |
| `safetySettings[].category` | string | 安全类别。当前 OpenAPI 声明：`HARM_CATEGORY_HARASSMENT`、`HARM_CATEGORY_HATE_SPEECH`、`HARM_CATEGORY_SEXUALLY_EXPLICIT`、`HARM_CATEGORY_DANGEROUS_CONTENT`。 |
| `safetySettings[].threshold` | string | 拦截阈值。当前 OpenAPI 声明：`BLOCK_NONE`、`BLOCK_ONLY_HIGH`、`BLOCK_MEDIUM_AND_ABOVE`、`BLOCK_LOW_AND_ABOVE`。 |
| `generationConfig.responseModalities` | string[] | 图像/音频等生成模型可能使用的扩展字段，例如 `TEXT`、`IMAGE`、`AUDIO`。generic 文本/视觉接口不一定需要。 |
| `generationConfig.imageConfig` | object | 图像生成模型可能使用的扩展字段，例如 `aspectRatio`、`image_size`。仅相关模型支持。 |

JSON 输出示例：

```json
{
  "generationConfig": {
    "responseMimeType": "application/json",
    "responseSchema": {
      "type": "object",
      "properties": {
        "summary": { "type": "string" },
        "tags": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "required": ["summary"]
    }
  }
}
```

## 返回参数 (Response Body)

非流式请求通常返回 `GenerateContentResponse` 对象：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `candidates` | array | 候选回复数组。正常情况下至少包含一个候选；如果 prompt 被拦截，可能没有候选并返回 `promptFeedback`。 |
| `candidates[].index` | integer | 候选下标。 |
| `candidates[].content` | object | 候选内容，结构同请求中的 `Content`。 |
| `candidates[].content.role` | string | 通常为 `model`。 |
| `candidates[].content.parts` | Part[] | 模型输出的内容片段。文本回复通常在 `parts[].text`。 |
| `candidates[].finishReason` | string | 结束原因，例如自然结束、达到 token 限制、安全拦截等。 |
| `candidates[].finishMessage` | string | 对结束原因的补充说明。并非所有响应都会返回。 |
| `candidates[].safetyRatings` | array | 候选内容的安全分类和置信度。 |
| `candidates[].citationMetadata` | object | 引用来源信息。模型返回引用时可能出现。 |
| `candidates[].groundingMetadata` | object | grounding / 检索增强相关元数据。是否出现取决于模型和工具。 |
| `candidates[].avgLogprobs` | number | 候选平均 log probability。仅支持时返回。 |
| `candidates[].logprobsResult` | object | 更细的 token log probability 结果。仅支持时返回。 |
| `promptFeedback` | object | prompt 级安全反馈。如果没有候选，优先检查此字段。 |
| `promptFeedback.blockReason` | string | prompt 被阻止的原因。 |
| `promptFeedback.safetyRatings` | array | prompt 的安全评分。 |
| `usageMetadata` | object | token 用量统计。 |
| `usageMetadata.promptTokenCount` | integer | 输入 token 数。 |
| `usageMetadata.candidatesTokenCount` | integer | 候选输出 token 数。 |
| `usageMetadata.totalTokenCount` | integer | 总 token 数。 |
| `usageMetadata.cachedContentTokenCount` | integer | 缓存内容 token 数。平台透传时可能出现。 |
| `usageMetadata.thoughtsTokenCount` | integer | 推理/思考 token 数。推理模型透传时可能出现。 |
| `usageMetadata.promptTokensDetails` | array | 输入 token 按模态拆分的明细。 |
| `usageMetadata.candidatesTokensDetails` | array | 输出 token 按模态拆分的明细。 |

常见 `finishReason` 需要这样理解：

| 值 | 含义 | 处理建议 |
| --- | --- | --- |
| `STOP` | 正常停止。 | 读取 `candidates[0].content.parts`。 |
| `MAX_TOKENS` | 达到最大输出 token 限制。 | 提高 `maxOutputTokens` 或让模型继续。 |
| `SAFETY` | 因安全策略停止。 | 查看 `safetyRatings`，不要直接重放相同请求。 |
| `RECITATION` | 因潜在背诵/引用风险停止。 | 调整 prompt，要求概括或原创表达。 |
| `OTHER` | 其他原因。 | 结合 `finishMessage` 和平台日志排查。 |

当使用流式接口时，Gemini 原生会返回多个增量响应，每个响应都可能包含部分 `candidates[].content.parts`。客户端需要按候选下标和 part 顺序拼接文本。

## 什么时候优先用它

适合这些情况：

- 你在迁移现有 Gemini SDK / Gemini 请求体
- 你希望继续使用 `contents` / `parts` 结构
- 你需要更贴近 Gemini 风格的多模态请求格式

## 什么时候别的协议更合适

- 想要最简单的一套通用协议，优先看 [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- 想要更现代的 OpenAI 风格工作流，优先看 [OpenAI Responses](/zh/api/llm/openai-responses)

## 参考入口

- [LLM 文本生成总览](/zh/api/llm/)
- [协议对比](/zh/api/llm/protocol-comparison)
- [完整 Apifox 参考](https://omnirouters.apifox.cn/)
