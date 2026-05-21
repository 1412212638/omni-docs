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
