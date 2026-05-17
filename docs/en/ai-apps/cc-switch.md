# CC Switch

A cross-platform AI CLI management tool.

::: info
CC Switch is an open-source AI CLI manager designed to unify provider configuration, MCP servers, and prompt files across tools such as Claude Code, Codex, and Gemini CLI. It is useful for teams that switch between multiple AI coding assistants and want to avoid editing config files by hand.
:::

## Official Links

- GitHub repository: [https://github.com/farion1231/cc-switch](https://github.com/farion1231/cc-switch)
- Releases: [https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases)

## Core Features

### Provider management

- Centralizes provider configuration across Claude Code, Codex, Gemini CLI, and similar tools
- Supports multiple endpoints and API keys for the same provider
- Useful when switching between multiple models and multiple platforms

### MCP management

- Supports centralized MCP server configuration
- Helps reuse MCP settings across different CLI tools
- Common transport types include `stdio`, `HTTP`, and `SSE`

### Prompt management

- Supports centralized system prompt and preset management
- Can map to common prompt files such as `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md`
- Useful for maintaining multiple team workflows

### Multi-platform support

- Supports desktop installations
- Supports CLI usage
- Supports a Web version for headless or remote server environments

## OmniRouters Integration

### Parameters

| Parameter | Description |
| --- | --- |
| Provider name | Use a descriptive name such as `OmniRouters Codex` |
| API key | Get it from OmniRouters: [https://omnirouters.com/console/token](https://omnirouters.com/console/token) |
| Base URL | Use `https://omnirouters.com/v1` |
| Model name | Must match the actual model name available in OmniRouters |

### Setup Steps

1. Open the [OmniRouters token page](https://omnirouters.com/console/token), create an API key, and copy it.
2. Open CC Switch and choose the target application you want to manage, such as Claude, Codex, or Gemini.
3. Create a new provider configuration and give it a clear display name.
4. In the endpoint or API configuration section, fill in:

   - Base URL: `https://omnirouters.com/v1`
   - API Key: the key copied from OmniRouters

5. Configure your model mapping based on your workflow. A common setup is:

   - Primary model: your default day-to-day model
   - Lightweight model: a faster and lower-cost model
   - High-performance model: a stronger reasoning or generation model
   - Custom model: reserved for special workflows

6. Save the configuration and test it from the corresponding CLI tool.

## Installation

### macOS

If you use Homebrew, check whether the project still provides the latest cask-based installation:

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

### Windows

Download the `.msi` installer or portable `.zip` package from the Releases page.

### Linux

Download the `.deb` package or `.AppImage` from the Releases page.

If you use an Arch-based distribution, you can also check whether the project provides a community package.

### Web version

If you want to use CC Switch on a headless machine or over SSH, check the project releases for its Web build and access the local port from a browser after startup.

## Recommendations

- Always keep the OmniRouters base URL pointed to `/v1`
- Make sure model names exactly match the names available in OmniRouters
- After the first setup, validate the connection with a simple test request
- If multiple teammates share configurations, define a consistent provider naming convention
- If you manage several CLIs at once, split your model mapping into primary, lightweight, and high-performance groups

## Notes

- This page is an OmniRouters integration tutorial based on the public CC Switch project. It does not mean the project is officially maintained by OmniRouters.
- If CC Switch adds Deep Link import, one-click onboarding, or new provider flows in the future, the setup steps may change.

## Related Links

- [GitHub repository](https://github.com/farion1231/cc-switch)
- [Releases](https://github.com/farion1231/cc-switch/releases)
- [OmniRouters API key page](https://omnirouters.com/console/token)
- [OmniRouters API Reference](/api/)
