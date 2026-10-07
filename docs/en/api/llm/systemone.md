---
title: SystemOne Structured Decisions
---

# SystemOne Structured Decisions

`POST /v1/systemone` is OmniRouters' structured decision endpoint. It evaluates a piece of state against a set of named questions and returns one structured answer for each question.

The endpoint is designed for routing, triage, classification, eligibility checks, and other workflows where the application needs predictable decision fields instead of free-form prose.

## Endpoint and authentication

```text
POST https://omnirouters.com/v1/systemone
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

The request is single-turn and non-streaming. The endpoint does not use `messages`, `contents`, or `input` arrays.

## Minimal request

```bash
curl https://omnirouters.com/v1/systemone \
  -H "Authorization: Bearer $OMNIROUTERS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jev-1.13.0",
    "state": "I was charged twice for my annual plan this morning. Please refund one of the charges today.",
    "questions": {
      "wants_refund": {
        "type": "noul",
        "instructions": "Is the customer asking for money back?"
      },
      "queue": {
        "type": "choice",
        "instructions": "Which queue should handle this?",
        "criteria": {
          "billing": "Billing department",
          "technical": "Technical support",
          "sales": "Sales team"
        }
      },
      "urgency": {
        "type": "score",
        "instructions": "How urgent is this issue?",
        "criteria": [
          "Can wait a week",
          "Should be handled this week",
          "Needs a reply today"
        ]
      }
    }
  }'
```

## Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `model` | string | Yes | Enabled SystemOne model used for the decision, such as `jev-1.13.0`. |
| `state` | string, object, or array | Yes | Content to analyze. Use a string for plain text, or JSON data when the decision depends on structured state. |
| `questions` | object | Yes | Named question definitions. Each property key becomes a field in the structured result. |

### Question definition

Each value in `questions` must contain:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | Yes | Output schema for the question. Supported types are `noul`, `choice`, and `score`. |
| `instructions` | string | Yes | Plain-language question or decision instruction. |
| `criteria` | object or array | Required for `choice` and `score` | Allowed choices or ordered scoring criteria. Omit it for `noul`. |

### Question types

| Type | Criteria | Expected result | Use case |
| --- | --- | --- | --- |
| `noul` | None | Boolean `true` or `false` | Yes/no decisions, such as whether a customer wants a refund. |
| `choice` | Object whose keys are stable output values and whose values describe those choices | One key from `criteria` | Queue selection, category, or route assignment. |
| `score` | Ordered array from lowest to highest | A numeric index representing the selected criterion | Priority or urgency scoring. |

Keep question keys stable and machine-friendly. The keys are the contract your application uses to read the result. Put human-readable wording in `instructions` and `criteria`.

## Response

The endpoint returns one result field for each key in `questions`. A typical result for the example above is:

```json
{
  "wants_refund": true,
  "queue": "billing",
  "urgency": 2
}
```

The `choice` result is one of the keys in its criteria object. The `score` result is a zero-based numeric index into its criteria array: `0` means the first criterion, `1` the second, and so on. The `noul` result is a boolean.

Applications should validate the returned keys and values against the request definition before taking an automated action. If a decision is ambiguous or cannot be safely mapped to the requested schema, handle the response as requiring review rather than assuming a missing or unknown value is a positive decision.

## Request design guidance

- Put all facts needed for the decision in `state`; the endpoint is stateless.
- Use criteria values that are mutually exclusive and ordered when using `score`.
- Use stable identifiers such as `billing` as choice keys; do not use long descriptions as keys.
- Keep `instructions` specific enough that two operators would interpret the question the same way.
- Treat the result as a model-generated decision. Add human review for financial, legal, access-control, or other high-impact actions.

## Related pages

- [LLM Text Generation overview](/api/llm/)
- [Protocol Comparison](/api/llm/protocol-comparison)
- [Full Apifox reference](https://omnirouters.apifox.cn/)

