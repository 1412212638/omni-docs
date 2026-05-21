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

1. 在 OmniRouters 上使用的是 Bearer Token 认证，而不是 Anthropic 原生的 `x-api-key`
2. 请求头中需要带上 `anthropic-version`

```text
Authorization: Bearer <your-api-key>
anthropic-version: 2023-06-01
```

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
