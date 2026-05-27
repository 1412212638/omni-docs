# Codex Configuration Guide

This guide shows how to configure Codex to use the OmniRouters OpenAI Compatible API.

## 1. Create the Codex configuration file

Linux / macOS:

```bash
mkdir -p ~/.codex
vim ~/.codex/config.toml
```

Windows:

```text
C:\Users\YourUsername\.codex\config.toml
```

If the `.codex` directory or `config.toml` file does not exist, create it manually.

## 2. Write the API configuration

Add the following content to `config.toml`, and replace `YOUR_API_KEY` with your OmniRouters API key.

```toml
model = "gpt-5.5"
model_provider = "thirdparty"

[model_providers.thirdparty]
name = "My OpenAI Compatible API"

# API base URL
api_base_url = "https://omnirouters.com/v1"

# Whether to use official OpenAI authentication
requires_openai_auth = false

# Your API key
api_key = "YOUR_API_KEY"

# Use the OpenAI Responses API
wire_api = "responses"

# Disable WebSocket
supports_websockets = false
```

Field reference:

| Field | Description |
| --- | --- |
| `model` | Default model used by Codex, for example `gpt-5.5`. |
| `model_provider` | Provider name used by the model. It must match `thirdparty` in `[model_providers.thirdparty]`. |
| `api_base_url` | OmniRouters API base URL. For Codex, use `https://omnirouters.com/v1`. |
| `requires_openai_auth` | Set to `false` so Codex does not use official OpenAI authentication. |
| `api_key` | Your OmniRouters API key. |
| `wire_api` | Set to `responses` to use the OpenAI Responses API. |
| `supports_websockets` | Set to `false` to disable WebSocket. |

## 3. Restart Codex

Save `config.toml`, then restart Codex for the configuration to take effect.

If requests show `Reconnecting`, the configuration usually does not include:

```toml
supports_websockets = false
```

Add the field, save the configuration, and restart Codex again.

## Related Links

- [AI Apps overview](/ai-apps/)
- [CC Switch](/ai-apps/cc-switch)
- [OmniRouters API Reference](/api/)
