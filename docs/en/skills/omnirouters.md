# OmniRouters

OmniRouters is a user-level skill for OmniRouters account operations and support workflows. It is designed for Claude Code, Codex, OpenClaw, and other AI coding assistants, allowing users to inspect models, manage tokens, check groups and balance, and reconcile per-request usage by `request_id`.

::: info
The OmniRouters Skill adapts the New API / new-api user workflow for OmniRouters. It avoids printing real `sk-` keys in terminal output, chat, logs, or files; sensitive operations such as copying token keys use safer channels.
:::

## Source / Download

- [View source](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters)
- [Download skill package](/downloads/omnirouters-skill.zip)
- [Open `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters/SKILL.md)

## What Is OmniRouters Skill

OmniRouters Skill is a lightweight extension for AI coding assistants. After installation, the assistant can call the bundled script during a conversation and access OmniRouters user APIs for model lookup, group lookup, balance checks, token management, and request-level billing reconciliation.

It reduces context switching between the editor, terminal, and OmniRouters dashboard. You can ask from the current coding context:

```text
/omnirouters models
/omnirouters balance
/omnirouters usage 202605220433553074851578268d9d6HOuv1cXR
```

## Why Use Skills

- Zero switching: query OmniRouters account state directly from Claude Code, Codex, OpenClaw, and similar assistants.
- Built-in operations: inspect models, groups, balance, and tokens; create or switch API tokens.
- Request-level reconciliation: use `X-Oneapi-Request-Id` to check actual consumption for a single request.
- Security first: token lists only show masked keys; real `sk-` keys are not printed.
- Ready to run: the skill includes a Node.js script, so you do not need to write API calls by hand.

## Supported AI Editors

| AI editor / coding assistant | Type | Notes |
| --- | --- | --- |
| Claude Code | Terminal AI coding assistant | Can call `/omnirouters` during a conversation |
| Codex CLI | Terminal AI coding assistant | Can call the script from the skill directory |
| OpenClaw | Self-hosted AI assistant platform | Supports skill-based conversation workflows |
| Cursor | AI-native code editor | Suitable for skill protocol or scripted workflows |
| Windsurf | AI code editor | Suitable for skill protocol or scripted workflows |
| Cline | VS Code AI extension | Can reuse the script inside project workflows |

Any AI tool that supports the Skills protocol or can read a skill directory can use this skill to call OmniRouters user APIs.

## Commands and Capabilities

### Query Commands

| Command | Description | Use case |
| --- | --- | --- |
| `/omnirouters models` | List available models | See models callable by the current account |
| `/omnirouters groups` | List usable groups | Inspect account groups, ratios, and quota-related data |
| `/omnirouters balance` | Check account balance | Show remaining quota, used quota, and request count |
| `/omnirouters usage <request_id>` | Query per-request usage | Reconcile model, token, quota, and token counts by request id |

### Token Management Commands

| Command | Description | Use case |
| --- | --- | --- |
| `/omnirouters tokens` | List API tokens | Show created tokens with masked keys |
| `/omnirouters create-token <name> [--group=xxx]` | Create a new API token | Create independent keys for projects or apps |
| `/omnirouters switch-group <token_id> <group>` | Switch token group | Adjust model access and group routing for a token |
| `/omnirouters copy-token <token_id>` | Copy the real key | Copy the key to the system clipboard without printing it |

### Help Command

| Command | Description | Use case |
| --- | --- | --- |
| `/omnirouters help <question>` | Ask OmniRouters / New API usage questions | Get help for deployment, configuration, API calls, groups, and tokens |

## Installation and Configuration

### Install the Skill

Download the package and place the `omnirouters` directory in your AI coding assistant's Skills directory:

- [Download OmniRouters Skill](/downloads/omnirouters-skill.zip)
- [View source directory](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters)

If your tool supports installing a skill from a local directory, point it to `skills/omnirouters` in this repository.

### Set Environment Variables

OmniRouters Skill needs the following environment variables to connect to your OmniRouters account:

```bash
export OMNIROUTERS_BASE_URL=https://omnirouters.com
export OMNIROUTERS_ACCESS_TOKEN=your-profile-access-token
export OMNIROUTERS_USER_ID=1
```

| Variable | Description | Example |
| --- | --- | --- |
| `OMNIROUTERS_BASE_URL` | OmniRouters service URL, defaults to `https://omnirouters.com` | `https://omnirouters.com` |
| `OMNIROUTERS_ACCESS_TOKEN` | Profile access token, not a model API key | `your-profile-access-token` |
| `OMNIROUTERS_USER_ID` | User id used by the `New-Api-User` request header | `1` |
| `OMNIROUTERS_QUOTA_PER_UNIT` | Optional conversion value, otherwise read from API or defaults to `500000` | `500000` |

The script also accepts upstream New API-style variables:

```bash
export NEWAPI_BASE_URL=https://omnirouters.com
export NEWAPI_ACCESS_TOKEN=your-profile-access-token
export NEWAPI_USER_ID=1
```

Do not commit `.env` files containing access tokens to Git.

## Start Using

After installing the skill and configuring environment variables, enter `/omnirouters` commands in a supported AI coding assistant.

Common examples:

```text
/omnirouters models
/omnirouters groups
/omnirouters balance
/omnirouters tokens
/omnirouters create-token my-app --group default
/omnirouters switch-group 7 auto
/omnirouters usage 202605220433553074851578268d9d6HOuv1cXR
/omnirouters copy-token 7
/omnirouters help How do I check the actual cost of one request?
```

To run the script directly from a terminal, enter the skill directory and run:

```bash
node scripts/omnirouters.mjs models
node scripts/omnirouters.mjs balance
node scripts/omnirouters.mjs tokens --page-size 20
node scripts/omnirouters.mjs usage <request_id>
```

Add `--json` to print sanitized JSON:

```bash
node scripts/omnirouters.mjs balance --json
```

## Request-Level Reconciliation

To reconcile actual consumption for one model request, first capture the response header:

```text
X-Oneapi-Request-Id: <request_id>
```

Then run:

```bash
node scripts/omnirouters.mjs usage <request_id>
```

In the result, `quota` is the final raw integer consumption for that request. USD conversion in docs or script output is only a display helper; keep the raw `quota` for settlement, audit exports, and reconciliation.

## Runtime Requirements

OmniRouters Skill uses a Node.js script to call user APIs:

| Runtime | Version | Notes |
| --- | --- | --- |
| Node.js | 18+ | Current LTS is recommended |

The script uses `fetch` for OmniRouters API calls and the system clipboard for `copy-token`.

## Security Mechanisms

- Never expose real `sk-` keys in chat, terminal output, logs, files, or command arguments.
- `tokens` only shows masked keys.
- `create-token` does not retrieve or print the real key after creation.
- `copy-token` copies the real key to the system clipboard only.
- `usage` preserves raw `quota` to avoid reconciliation errors caused by display conversions.
- Error messages redact suspected secrets.

## Learn More

- [OmniRouters API Reference](/api/)
- [OmniRouters Skills overview](/skills/)
- [New API Skill reference](https://docs.newapi.pro/zh/docs/skills/newapi)
- [New API GitHub](https://github.com/QuantumNous/new-api)
