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

## Retrieve, delete, or cancel a response

- `GET /v1/responses/{response_id}` retrieves a response.
- `DELETE /v1/responses/{response_id}` deletes a response.
- `POST /v1/responses/{response_id}/cancel` cancels an in-progress response.

```bash
curl https://omnirouters.com/v1/responses/resp_123 \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"

curl -X DELETE https://omnirouters.com/v1/responses/resp_123 \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"

curl -X POST https://omnirouters.com/v1/responses/resp_123/cancel \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY"
```

## Input token count

`POST /v1/responses/input_tokens` accepts `model` and `input` and returns the estimated input token count.

## Conversation compaction

`POST /v1/responses/compact` accepts a response input and returns a compacted conversation representation.

## Response body

Responses commonly include an `id`, `object`, `status`, `model`, `output`, and `usage`. A response may also include `error`, `incomplete_details`, or tool-call items. Unknown fields should be treated as forward-compatible additions.

> Availability of individual operations depends on the enabled upstream model and current OmniRouters routing configuration. Chat Completions remains the broadest compatibility option.
