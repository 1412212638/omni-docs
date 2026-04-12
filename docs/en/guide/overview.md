# Platform Overview

OmniRouters is a unified API access platform for multimodal AI capabilities. It helps developers call different model capabilities through a consistent documentation and integration entry point, including chat, image, video, audio, music, embeddings, rerank, and related generation workflows.

The goal of this documentation site is to give developers a clear starting path before they open the full endpoint reference in Apifox.

## What OmniRouters Provides

| Area | Description |
| --- | --- |
| Unified access | Use one platform entry point to connect to multiple AI capability categories. |
| Multimodal coverage | Browse documentation for text, image, video, audio, music, embeddings, rerank, and more. |
| Integration guidance | Learn where to get an API key, which base URL to use, and how to structure requests. |
| Reference handoff | Use the Apifox reference when you need complete endpoint parameters and response schemas. |

## Core Concepts

### API Key

API requests use bearer token authentication. You can create and manage API keys in the OmniRouters console:

[Open API Key Console](https://omnirouters.com/console/token)

### Base URL

Use the following base URL for API requests:

```text
https://omnirouters.com/v1
```

### Model Names

Model names should match the models available in your OmniRouters account and in the API reference. If a request fails because of the model name, check whether the model is enabled and whether the name exactly matches the reference.

### API Reference

This docs site gives you the onboarding path. The full endpoint list, parameter definitions, and response examples remain available in Apifox:

[Open Apifox API Reference](https://omnirouters.apifox.cn/)

## Recommended Reading Path

1. Read the [Quick Start](/guide/quick-start) page to complete your first request.
2. Review the [Usage Guide](/guide/usage) page for authentication, model names, async tasks, billing, and error handling.
3. Open the [API Reference](/api/) page when you need endpoint-level details.

