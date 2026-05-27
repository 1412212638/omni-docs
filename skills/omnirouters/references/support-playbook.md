# OmniRouters Support Playbook

## Scope

Use this skill for operated-platform support:

- request-level usage and billing explanations
- API call troubleshooting with `request_id`
- customer-visible models, groups, tokens, and balance
- explaining quota, usage logs, and API key behavior
- drafting customer replies

Do not provide deployment, Docker, reverse proxy, database, or server administration guidance unless the user explicitly says the customer is self-hosting.

## Support Flow

1. Identify the customer question category.
   - Billing or reconciliation -> ask for `X-Oneapi-Request-Id` and run `usage`.
   - Failed API call -> ask for `X-Oneapi-Request-Id` and run `diagnose`.
   - Model unavailable -> check `models` and `groups`.
   - OpenAI/Gemini/Claude compatibility -> read `model-compatibility.md`.
   - 401/403/429/timeout/model errors -> read `api-errors.md`.
   - Balance or quota -> check `balance`.
   - API key issue -> check masked `tokens`; never request the full key.

2. Separate facts from interpretation.
   - Facts: log fields, status, quota, model, token name, timestamps.
   - Interpretation: likely cause, next action, whether support needs escalation.

3. Write customer-facing replies.
   - Keep replies short.
   - Avoid internal implementation details.
   - Include the request ID when relevant.
   - Include precise next steps.

## Common Customer Replies

### Successful Billed Request

Explain that the request completed and the usage log shows final actual consumption. Quote `quota`, model, token counts, and time. If converting to currency, say it is an estimate based on current display conversion.

### Failed Request

Explain that the request failed and whether a billing log exists. If no consume log exists, say no successful consumption record was found for that request ID. If an error log exists, summarize the customer-safe error message and next step.

### No Log Found

Ask for:

- exact `X-Oneapi-Request-Id`
- approximate request time with timezone
- account email or username
- API key name, not the full key

### Token/Auth Problems

Do not ask customers to paste API keys. Ask them to confirm:

- key belongs to the correct account
- key is enabled
- key has remaining quota or unlimited quota
- key group can access the requested model

### Model Access Problems

Check whether the model appears in the customer's available models and whether their group can use it. If the model is not listed, tell the customer to use an available model or contact support to enable access.

### Protocol Compatibility Problems

If a customer says a parameter works on one model but not another, explain that OmniRouters offers compatible protocols, but upstream model families are not fully identical. Recommend the native protocol when the customer depends on provider-specific features.
