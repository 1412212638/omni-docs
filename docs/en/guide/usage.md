# Usage Guide

This page explains the common rules you should follow when integrating OmniRouters APIs.

## Authentication

Use bearer token authentication for API requests:

```http
Authorization: Bearer <your-api-key>
```

Keep API keys on the server side whenever possible. If a key is exposed, rotate it in the console as soon as possible.

## Request Format

Most JSON APIs use:

```http
Content-Type: application/json
```

For file or asset based workflows, follow the exact request format in the Apifox reference.

## Model Selection

Use model names exactly as they appear in the reference or console. Model availability can depend on account configuration, provider availability, and capability category.

Examples of capability categories include:

| Category | Common Usage |
| --- | --- |
| Chat | Conversation, assistant responses, text generation |
| Image | Text-to-image and image editing workflows |
| Video | Text-to-video, image-to-video, and asset based video generation |
| Speech | Text-to-speech and voice generation |
| Music | Music generation workflows |
| Embeddings | Vector generation for retrieval and semantic search |
| Rerank | Reordering candidate documents or passages |

## Async Generation Tasks

Some image, video, and music workflows may return a task identifier instead of the final asset immediately. In those cases:

1. Submit the generation request.
2. Store the returned task ID.
3. Poll the matching task query endpoint.
4. Stop polling when the task reaches a final status.
5. Read the returned asset URL or error information.

Always follow the endpoint-specific response structure in the Apifox reference:

[Open Apifox API Reference](https://omnirouters.apifox.cn/)

## Error Handling

When a request fails, log the following information on your server side:

- Endpoint
- Request ID if available
- Model name
- Error code and error message
- Timestamp
- Whether the request consumed balance

Do not log full API keys, user secrets, or sensitive prompt content unless you have a clear operational need and proper access controls.

## Billing Notes

OmniRouters primarily uses prepaid balance. Consumed API calls are generally not refundable. For billing and refund details, see:

[Billing and Refund Policy](/legal/billing-refund)

## Support

If you need help, contact:

```text
support@omnirouters.com
```

