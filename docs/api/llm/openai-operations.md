---
title: OpenAI Responses Operations
---

# OpenAI Responses Operations

This page documents the Responses API operations exposed by OmniRouters. Use the same API key and base URL as other OmniRouters APIs.

## Authentication

```text
Authorization: Bearer <your-api-key>
```

## Create a response

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

Common request fields include `model`, `input`, `instructions`, `tools`, `tool_choice`, `stream`, `temperature`, `top_p`, and `max_output_tokens`. The exact fields depend on the selected model.

## Retrieve a response

`GET /v1/responses/{response_id}`

```bash
curl https://omnirouters.com/v1/responses/resp_123 \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Delete a response

`DELETE /v1/responses/{response_id}`

```bash
curl -X DELETE https://omnirouters.com/v1/responses/resp_123 \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Cancel a response

`POST /v1/responses/{response_id}/cancel`

```bash
curl -X POST https://omnirouters.com/v1/responses/resp_123/cancel \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Count input tokens

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

## Compact a conversation

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

## Response body

Responses commonly include an `id`, `object`, `status`, `model`, `output`, and `usage`. A response may also include `error`, `incomplete_details`, or tool-call items. Always treat unknown fields as forward-compatible additions.

> Availability of individual operations depends on the enabled upstream model and current OmniRouters routing configuration. The Chat Completions route remains the broadest compatibility option.
