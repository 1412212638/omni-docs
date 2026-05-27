# OmniRouters Actions

## Environment

Use these environment variables:

| Variable | Purpose |
| --- | --- |
| `OMNIROUTERS_BASE_URL` | Service URL, defaults to `https://omnirouters.com` |
| `OMNIROUTERS_ACCESS_TOKEN` | Profile access token from Personal Profile -> Access Token |
| `OMNIROUTERS_USER_ID` | User ID required by the `New-Api-User` header |
| `OMNIROUTERS_QUOTA_PER_UNIT` | Optional conversion value, defaults to API status or `500000` |

The script also accepts `NEWAPI_BASE_URL`, `NEWAPI_ACCESS_TOKEN`, and `NEWAPI_USER_ID` as compatibility fallbacks.

## Script

```bash
node scripts/omnirouters.mjs models
node scripts/omnirouters.mjs groups
node scripts/omnirouters.mjs balance
node scripts/omnirouters.mjs tokens --page-size 20
node scripts/omnirouters.mjs create-token my-app --group default --unlimited
node scripts/omnirouters.mjs switch-group 7 auto
node scripts/omnirouters.mjs usage 202605220433553074851578268d9d6HOuv1cXR
node scripts/omnirouters.mjs copy-token 7
```

Add `--json` to print sanitized JSON instead of a compact human summary.

## Endpoint Map

| Action | Endpoint |
| --- | --- |
| `models` | `GET /api/user/models` |
| `groups` | `GET /api/user/self/groups` |
| `balance` | `GET /api/user/self` |
| `tokens` | `GET /api/token/?p=1&page_size=20` |
| `create-token` | `POST /api/token/` |
| `switch-group` | `GET /api/token/{id}` then `PUT /api/token/` |
| `usage` | `GET /api/log/self?type=2&request_id={id}&p=1&page_size=1` |
| `copy-token` | `POST /api/token/{id}/key`, copied only to clipboard |

All authenticated requests use:

```text
Authorization: Bearer <OMNIROUTERS_ACCESS_TOKEN>
New-Api-User: <OMNIROUTERS_USER_ID>
```

## Request Reconciliation

For a model request, capture the response header:

```text
X-Oneapi-Request-Id: <request_id>
```

Then run:

```bash
node scripts/omnirouters.mjs usage <request_id>
```

The `quota` field is the final actual consumption for the request. The default USD estimate is:

```text
quota / quota_per_unit
```

Keep raw `quota` for settlement and audit exports.
