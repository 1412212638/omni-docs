# Common API Errors

Use this reference for customer-facing explanations. Keep replies short and avoid internal route/channel details.

## 401 Unauthorized

Likely causes:

- API Key is missing, invalid, copied incorrectly, or belongs to another account.
- Customer used profile access token as model API key, or used model API key as profile access token.

Reply:

```text
您好，当前请求鉴权未通过。请确认 Authorization 使用的是模型调用 API Key，格式为 `Bearer sk-...`，并确认该 Key 属于当前账户且未被删除或禁用。
为了安全，请不要发送完整 API Key；如需我们协助核对，请提供 API Key 名称或打码后的尾号。
```

## 403 Forbidden

Likely causes:

- Account disabled or key disabled.
- API Key 分组无权访问该模型。
- IP 限制未通过。
- 余额或订阅权限不足。

Reply:

```text
您好，请求已被权限策略拦截。请确认该 API Key 处于启用状态、所属分组有权限访问该模型，并检查账户额度或订阅是否可用。
如需我们协助排查，请提供请求 ID、模型名称和 API Key 名称，不要发送完整 API Key。
```

## 429 Rate Limit

Likely causes:

- Account/key/model route reached rate limit.
- Upstream provider temporarily限流.
- Too many concurrent or repeated requests.

Reply:

```text
您好，该请求触发了限流。建议降低并发或重试频率，并在重试时加入退避间隔。
如果持续出现，请提供请求 ID、模型名称和大致并发量，我们可以继续核对限流来源。
```

## 400 Invalid Request

Likely causes:

- Missing required field.
- Unsupported parameter for the selected model or protocol.
- Using OpenAI-compatible fields with a provider-native feature that requires native protocol.

Reply:

```text
您好，请求参数未通过校验。请确认 endpoint、model、messages/contents 等必填字段是否正确。
如果问题出现在某个模型特有参数上，可能是协议兼容差异；请提供脱敏后的请求体，我们会帮您确认应使用 OpenAI 兼容格式还是模型原生格式。
```

## 5xx / Timeout

Likely causes:

- Upstream provider timeout or temporary failure.
- Streaming connection interrupted.
- Large request or long generation task exceeds normal response time.

Reply:

```text
您好，这次请求可能遇到上游响应超时或临时服务异常。建议稍后重试；如果是长文本、图片、视频或流式请求，可以适当降低输入规模或延长客户端超时。
请提供请求 ID 和请求时间，我们可以进一步核对具体记录。
```

## Model Not Found / No Available Channel

Likely causes:

- Model name typo.
- Model not enabled for the customer's group.
- Token group cannot access the selected model.

Reply:

```text
您好，当前账户或 API Key 所属分组暂未匹配到该模型。请先通过模型列表确认可用模型名称，或切换到有权限的分组/API Key 后重试。
```
