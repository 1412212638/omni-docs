---
title: SystemOne 结构化决策
---

# SystemOne 结构化决策

`POST /v1/systemone` 是 OmniRouters 的结构化决策端点。它根据一段待分析状态和一组命名问题，为每个问题返回一个结构化结果。

它适合工单分流、优先级判断、分类、资格检查等需要稳定字段，而不是自由文本回复的工作流。

## 端点与认证

```text
POST https://omnirouters.com/v1/systemone
Authorization: Bearer <your-api-key>
Content-Type: application/json
```

请求是单次、非流式的。该端点不使用 `messages`、`contents` 或 `input` 数组。

## 最小请求

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

## 请求体参数（Request Body）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 用于决策的已启用 SystemOne 模型，例如 `jev-1.13.0`。 |
| `state` | string、object 或 array | 是 | 待分析内容。普通文本使用字符串；依赖结构化状态时可以传 JSON 对象或数组。 |
| `questions` | object | 是 | 命名问题集合。每个属性名都会成为结果中的一个字段。 |

### 问题对象结构

`questions` 中每个问题对象包含以下字段：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | 是 | 该问题的输出类型。目前支持 `noul`、`choice` 和 `score`。 |
| `instructions` | string | 是 | 用自然语言描述问题或决策要求。 |
| `criteria` | object 或 array | `choice`、`score` 必填 | 可选项或有序评分标准。`noul` 不需要该字段。 |

### 问题类型

| 类型 | criteria | 结果 | 使用场景 |
| --- | --- | --- | --- |
| `noul` | 无 | Boolean `true` 或 `false` | 是非判断，例如客户是否要求退款。 |
| `choice` | key 为稳定结果值、value 为描述的对象 | `criteria` 中的一个 key | 队列、分类或路由选择。 |
| `score` | 从低到高排列的数组 | 被选标准对应的数字下标 | 优先级或紧急程度评分。 |

问题 key 应保持稳定并便于程序读取。人类可读的说明放在 `instructions` 和 `criteria` 中。

## 返回结果（Response Body）

接口会为 `questions` 中的每个 key 返回一个结果字段。上方示例可能返回：

```json
{
  "wants_refund": true,
  "queue": "billing",
  "urgency": 2
}
```

`choice` 结果是其 criteria 对象中的一个 key。`score` 结果是 criteria 数组的从零开始的下标：`0` 表示第一个标准，`1` 表示第二个标准，以此类推。`noul` 结果是布尔值。

应用在执行自动化操作前，应根据本次请求定义校验返回的 key 和 value。如果结果存在歧义，或无法安全映射到请求的 schema，应转人工复核，不要把缺失或未知值当作肯定结果。

## 请求设计建议

- 将决策所需的事实都放入 `state`；该端点无状态。
- 使用 `score` 时，criteria 应互斥并按顺序排列。
- 使用 `billing` 这类稳定标识符作为 choice key，不要用长描述作为 key。
- `instructions` 应足够具体，避免不同人员产生不同理解。
- 结果由模型生成；涉及财务、法律、权限或其他重大影响的操作应增加人工复核。

## 相关页面

- [LLM 文本生成总览](/zh/api/llm/)
- [协议对比](/zh/api/llm/protocol-comparison)
- [完整 Apifox 接口参考](https://omnirouters.apifox.cn/)

