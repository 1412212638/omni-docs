# Quick Start

This guide helps you complete a basic OmniRouters API request.

## 1. Create an API Key

Open the OmniRouters API key page and create a key:

[https://omnirouters.com/console/token](https://omnirouters.com/console/token)

Store the key securely. Do not publish it in client-side code, public repositories, screenshots, or shared documents.

## 2. Set the Base URL

Use:

```text
https://omnirouters.com/v1
```

## 3. Send a Test Request

Replace `<your-api-key>` and `<model-name>` with your own values.

```bash
curl https://omnirouters.com/v1/chat/completions \
  -H "Authorization: Bearer <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model-name>",
    "messages": [
      {
        "role": "user",
        "content": "Say hello from OmniRouters."
      }
    ]
  }'
```

If you are testing image, video, speech, or music generation, open the API reference and use the corresponding endpoint category:

[Open Apifox API Reference](https://omnirouters.apifox.cn/)

## 4. Check the Response

A successful request should return a JSON response. If the request fails, check:

- Whether the API key is correct
- Whether the model name is available for your account
- Whether the request body matches the endpoint schema
- Whether your account balance is sufficient

## 5. Next Steps

- Read the [Usage Guide](/guide/usage)
- Open the [API Reference](/api/)
- Contact [Support](/guide/getting-started) if you need help

