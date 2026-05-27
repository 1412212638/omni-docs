---
name: omnirouters
description: After-sales and technical support assistant for the OmniRouters operated platform. Use when support staff need to answer customer questions, inspect request-level usage/cost by request_id, diagnose API call failures, check customer-visible models/groups/balance/tokens, explain quota billing, or draft customer-facing replies without exposing secrets or internal-only details.
---

# OmniRouters Support

OmniRouters is an operated AI gateway built on the New API / new-api ecosystem by QuantumNous. This skill is for OmniRouters after-sales support and technical support workflows, not infrastructure deployment.

## Security Guidelines

1. Do not expose any `sk-` key value in chat, files, code, logs, or command arguments.
2. Prefer the bundled script for live operations: `scripts/omnirouters.mjs`.
3. Do not read `.env` files or environment variables containing credentials unless the user explicitly asks for configuration help.
4. After `create-token`, do not retrieve or print the real key. Tell the user to use `copy-token <id>` if they need it copied securely.
5. For per-request reconciliation, preserve the raw integer `quota` as the source of truth. Currency conversions are display helpers only.
6. Keep customer replies concise, factual, and action-oriented. Do not mention internal channel IDs, upstream keys, admin-only metadata, or protected implementation details unless explicitly approved.

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
| `diagnose` | `/omnirouters diagnose <request_id>` | Inspect request logs and summarize likely customer-facing cause |
| `copy-token` | `/omnirouters copy-token <token_id>` | Copy the real API key to clipboard without printing it |
| `reply` | `/omnirouters reply <situation>` | Draft a support reply using the support playbook |
| `help` | `/omnirouters help <question>` | Answer OmniRouters usage and support questions |

## Execution

Run actions with:

```bash
node "${CLAUDE_SKILL_DIR}/scripts/omnirouters.mjs" <action> [args]
```

For Codex or other tools that expose a different skill directory variable, resolve the script path relative to this `SKILL.md`.

## Output Guidance

- For `usage`, report `request_id`, `model_name`, `token_name`, `quota`, estimated USD, prompt/completion tokens, use time, and created time.
- For `diagnose`, separate facts found in logs from likely causes and recommended customer reply.
- For token actions, show token IDs and masked keys only.
- For troubleshooting, include the endpoint used and the missing configuration variable when a call fails.
- If a question is about upstream New API behavior, mention that OmniRouters follows New API conventions unless OmniRouters has an explicit override.
- Do not answer customer support questions with server deployment, Docker, reverse proxy, or self-hosting guidance unless the user explicitly says the customer is self-hosting.
- For model request compatibility questions, read `references/model-compatibility.md` first.
- For customer-facing API error explanations, read `references/api-errors.md` first.

## References

- Action details and API endpoints: `references/actions.md`
- Support response playbook: `references/support-playbook.md`
- Model request compatibility notes: `references/model-compatibility.md`
- Common API errors and replies: `references/api-errors.md`
