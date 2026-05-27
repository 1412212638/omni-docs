# Codex 配置教程

本页介绍如何让 Codex 使用 OmniRouters 的 OpenAI Compatible API。

## 1. 创建 Codex 配置目录

Linux / macOS：

```bash
mkdir -p ~/.codex
vim ~/.codex/config.toml
```

Windows：

```text
C:\Users\你的用户名\.codex\config.toml
```

如果 `.codex` 目录或 `config.toml` 文件不存在，请手动创建。

## 2. 写入 API 配置

将下面内容写入 `config.toml`，并把 `YOUR_API_KEY` 替换为你的 OmniRouters API Key。

```toml
model = "gpt-5.5"
model_provider = "thirdparty"

[model_providers.thirdparty]
name = "My OpenAI Compatible API"

# API 地址
api_base_url = "https://omnirouters.com/v1"

# 是否使用 OpenAI 官方认证
requires_openai_auth = false

# 你的 API Key
api_key = "YOUR_API_KEY"

# 使用 OpenAI Responses API
wire_api = "responses"

# 禁用 WebSocket
supports_websockets = false
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `model` | Codex 默认使用的模型名称，例如 `gpt-5.5`。 |
| `model_provider` | 当前模型使用的 Provider 名称，需要和 `[model_providers.thirdparty]` 中的 `thirdparty` 保持一致。 |
| `api_base_url` | OmniRouters API 地址，Codex 这里填写 `https://omnirouters.com/v1`。 |
| `requires_openai_auth` | 设为 `false`，表示不走 OpenAI 官方认证。 |
| `api_key` | 你的 OmniRouters API Key。 |
| `wire_api` | 设为 `responses`，使用 OpenAI Responses API。 |
| `supports_websockets` | 设为 `false`，禁用 WebSocket。 |

## 3. 重启 Codex

保存 `config.toml` 后，重启 Codex 即可生效。

如果请求过程中出现 `Reconnecting` 字样，一般是配置里没有写入：

```toml
supports_websockets = false
```

确认补上该字段后，保存配置并再次重启 Codex。

## 相关链接

- [AI 应用总览](/zh/ai-apps/)
- [CC Switch](/zh/ai-apps/cc-switch)
- [OmniRouters API 参考](/zh/api/)
