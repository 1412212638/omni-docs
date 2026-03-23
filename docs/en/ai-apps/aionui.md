# AionUi

A free and open-source desktop AI workspace.

::: info
AionUi is a free, local-first, open-source cowork tool that supports Gemini CLI, Claude Code, Codex, OpenCode, Qwen Code, Goose CLI, Auggie, and other AI agents. It provides a full GUI and WebUI remote access experience, making it a strong open-source alternative to Cowork.
:::

## Official Links

- Website: [https://www.aionui.com](https://www.aionui.com)
- GitHub repository: [https://github.com/iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi)
- Downloads: [https://github.com/iOfficeAI/AionUi/releases](https://github.com/iOfficeAI/AionUi/releases)

## Core Features

### Multi-session chat

- Supports multiple chat sessions with isolated context memory
- Conversation data is stored locally in SQLite for long-term retention

### Multi-model support

- Supports major model providers such as Gemini, OpenAI, Claude, and Qwen
- Supports local model deployment solutions such as Ollama and LM Studio

### Multi-agent mode

- Can run multiple AI agents at the same time, including Gemini CLI, Claude Code, Codex, OpenCode, Qwen Code, Goose CLI, and Auggie
- Supports unified agent management through MCP
- Supports dedicated Skills configuration for different agents
- Supports custom assistant profiles for personalized workflows
- Each agent can be configured and used independently

### File management

- Supports file tree browsing and drag-and-drop uploads
- Supports AI-assisted folder organization and automatic classification

### Preview panel

- Supports previewing PDF, Word, Excel, PPT, code, Markdown, images, and more
- Supports real-time file tracking and direct editing for Markdown, code, and HTML

### Image generation and editing

- Supports image generation models such as Gemini 2.5 Flash Image Preview, Nano, and Banana
- Supports AI-powered image recognition and editing

### Multi-channel access

- Supports WebUI remote access from browsers on multiple devices
- Supports Telegram integration
- Supports Feishu integration
- Stores data locally in SQLite by default, which is suitable for both local and server deployment

## OmniRouters Integration

### Parameters

| Parameter | Description |
| --- | --- |
| Provider type | Choose a provider type supported by OmniRouters |
| API key | Get it from OmniRouters: [https://omnirouters.com/console/token](https://omnirouters.com/console/token) |
| API base URL | Use your OmniRouters endpoint, for example `https://omnirouters.com/v1` |

### Setup Steps

1. Copy your API key from the [OmniRouters token page](https://omnirouters.com/console/token).

   ![Copy API key](https://docs.newapi.pro/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcopy_apikey.0372e2da.png&w=1080&q=75&dpl=dpl_3ggDbp26db2ct37PJBBuDCNTEJQZ)

2. Open the AionUi settings page, go to the model configuration tab, and click "Add Model".

   ![Open settings and add model](https://docs.newapi.pro/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-model-1.0baf829f.png&w=1080&q=75&dpl=dpl_3ggDbp26db2ct37PJBBuDCNTEJQZ)

3. Choose `NewAPI` as the provider, then fill in the API base URL and API key.

   ![Choose provider and fill configuration](https://docs.newapi.pro/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnewapi_provider.da7e766f.png&w=1080&q=75&dpl=dpl_3ggDbp26db2ct37PJBBuDCNTEJQZ)

4. Select the model you want to add from the model list, and make sure the model name matches the configuration in OmniRouters.
5. Choose the appropriate request protocol and save the configuration.
6. Return to the chat page and start using the configured OmniRouters model.

## Recommendations

- Make sure the OmniRouters base URL ends with `/v1`
- Keep the model name consistent with the server-side configuration
- After the initial setup, test connectivity with a simple conversation first

## Note

In the current AionUi configuration flow, the provider is still selected as `NewAPI`, but the endpoint and API key should come from OmniRouters.

## Related Links

- [GitHub repository](https://github.com/iOfficeAI/AionUi)
- [Detailed usage guide](https://github.com/iOfficeAI/AionUi#-detailed-usage-guide)
- [FAQ](https://github.com/iOfficeAI/AionUi#-support--help)
