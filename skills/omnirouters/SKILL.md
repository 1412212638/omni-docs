---
name: omnirouters
description: Assistant for OmniRouters account operations and support workflows. Use when the user asks an AI coding assistant to inspect OmniRouters models, groups, balance, API tokens, or per-request usage/cost by request_id; create or switch API tokens; securely copy token keys; or answer OmniRouters usage questions grounded in the bundled references.
---

# OmniRouters

OmniRouters is an AI gateway built on the New API / new-api ecosystem by QuantumNous. This skill adapts the upstream New API user workflow for OmniRouters-specific operations, support, and request-level reconciliation.

## Security Guidelines

1. Do not expose any `sk-` key value in chat, files, code, logs, or command arguments.
2. Prefer the bundled script for live operations: `scripts/omnirouters.mjs`.
3. Do not read `.env` files or environment variables containing credentials unless the user explicitly asks for configuration help.
4. After `create-token`, do not retrieve or print the real key. Tell the user to use `copy-token <id>` if they need it copied securely.
5. For per-request reconciliation, preserve the raw integer `quota` as the source of truth. Currency conversions are display helpers only.

## Configuration

Read `references/actions.md` before executing live actions. The script needs:

```bash
export OMNIROUTERS_BASE_URL=https://omnirouters.com
export OMNIROUTERS_ACCESS_TOKEN=your-profile-access-token
export OMNIROUTERS_USER_ID=1
```

`OMNIROUTERS_ACCESS_TOKEN` is the user profile access token, not a model API key.

## Actions

| Action | Usage | Description |
| --- | --- | --- |
| `models` | `/omnirouters models` | List available models for the account |
| `groups` | `/omnirouters groups` | List usable groups and ratios |
| `balance` | `/omnirouters balance` | Show account quota, used quota, and request count |
| `tokens` | `/omnirouters tokens` | List masked API tokens |
| `create-token` | `/omnirouters create-token <name> [--group=xxx]` | Create a masked API token record |
| `switch-group` | `/omnirouters switch-group <token_id> <group>` | Move a token to another group |
| `usage` | `/omnirouters usage <request_id>` | Query request-level consumption for reconciliation |
| `copy-token` | `/omnirouters copy-token <token_id>` | Copy the real API key to clipboard without printing it |
| `help` | `/omnirouters help <question>` | Answer OmniRouters/New API usage questions |

## Execution

Run actions with:

```bash
node "${CLAUDE_SKILL_DIR}/scripts/omnirouters.mjs" <action> [args]
```

For Codex or other tools that expose a different skill directory variable, resolve the script path relative to this `SKILL.md`.

## Output Guidance

- For `usage`, report `request_id`, `model_name`, `token_name`, `quota`, estimated USD, prompt/completion tokens, use time, and created time.
- For token actions, show token IDs and masked keys only.
- For troubleshooting, include the endpoint used and the missing configuration variable when a call fails.
- If a question is about upstream New API behavior, mention that OmniRouters follows New API conventions unless OmniRouters has an explicit override.

## References

- Action details and API endpoints: `references/actions.md`
