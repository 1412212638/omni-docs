---
title: OpenAI Responses 扩展操作
---

# OpenAI Responses 扩展操作

本页介绍 OmniRouters 提供的 Responses API 扩展操作。认证方式和 Base URL 与其他 OmniRouters API 相同。

## 认证

```text
Authorization: Bearer <your-api-key>
```

## 创建响应

`POST /v1/responses`

```bash
curl https://omnirouters.com/v1/responses \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "input": "Explain how a refund request should be routed."
  }'
```

常见请求字段包括 `model`、`input`、`instructions`、`tools`、`tool_choice`、`stream`、`temperature`、`top_p` 和 `max_output_tokens`。具体字段以所选模型支持的能力为准。

## 获取响应

`GET /v1/responses/{response_id}`

```bash
curl https://omnirouters.com/v1/responses/resp_123 \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## 删除响应

`DELETE /v1/responses/{response_id}`

```bash
curl -X DELETE https://omnirouters.com/v1/responses/resp_123 \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## 取消响应

`POST /v1/responses/{response_id}/cancel`

```bash
curl -X POST https://omnirouters.com/v1/responses/resp_123/cancel \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## 统计输入 Token

`POST /v1/responses/input_tokens`

```bash
curl https://omnirouters.com/v1/responses/input_tokens \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "input": "Count the tokens in this text."
  }'
```

## 压缩对话

`POST /v1/responses/compact`

```bash
curl https://omnirouters.com/v1/responses/compact \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-enabled-model",
    "input": []
  }'
```

## 返回参数

响应通常包含 `id`、`object`、`status`、`model`、`output` 和 `usage`。根据请求状态，响应也可能包含 `error`、`incomplete_details` 或工具调用项。对于未列出的字段，应按向前兼容的扩展字段处理。

> 各项操作是否可用取决于账号启用的上游模型和 OmniRouters 当前路由配置。若需要最广泛的兼容性，仍建议优先使用 Chat Completions 路由。
