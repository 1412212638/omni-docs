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
