# OmniRouters

OmniRouters 是面向 OmniRouters 账户操作和支持工作流的用户级 Skill。它适合在 Claude Code、Codex、OpenClaw（龙虾）等 AI 编码助手里，通过自然语言或 `/omnirouters` 指令查询模型、管理令牌、查看分组与余额，并按 `request_id` 查询单次请求用量。

::: info
OmniRouters Skill 面向 OmniRouters 用户侧账户工作流设计。它不会在终端、聊天、日志或文件中明文输出 `sk-` 密钥，令牌复制等敏感操作会通过安全通道完成。
:::

## 源码 / 下载

- [查看源码](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters)
- [下载 Skill 压缩包](/downloads/omnirouters-skill.zip)
- [查看 `SKILL.md`](https://github.com/1412212638/omni-docs/blob/main/skills/omnirouters/SKILL.md)

## 什么是 OmniRouters Skill

OmniRouters Skill 是一个轻量级的 AI 编码助手扩展。安装后，助手可以在对话中调用随 Skill 打包的脚本，直接访问 OmniRouters 用户接口，完成模型查询、分组查看、余额查看、令牌管理和请求级账单核对等操作。

它解决的核心问题是减少在编辑器、终端和 OmniRouters 控制台之间反复切换的成本。你可以在当前编码上下文里直接询问：

```text
/omnirouters models
/omnirouters balance
/omnirouters usage 202605220433553074851578268d9d6HOuv1cXR
```

## 为什么使用 Skills

- 零切换：在 Claude Code、Codex、OpenClaw 等 AI 编码助手里直接查询 OmniRouters 账户状态。
- 内置运维动作：可查看模型、分组、余额、令牌列表，并创建或切换 API Token。
- 请求级核对：通过响应头里的 `X-Oneapi-Request-Id` 查询单次请求实际消耗。
- 安全优先：令牌列表只展示掩码密钥，真实 `sk-` 密钥不会被打印出来。
- 即插即用：Skill 自带 Node.js 脚本，不需要额外写接口调用代码。

## 支持的 AI 编辑器

| AI 编辑器 / 编码助手 | 类型 | 备注 |
| --- | --- | --- |
| Claude Code | 终端 AI 编程助手 | 可在对话中调用 `/omnirouters` 指令 |
| Codex CLI | 终端 AI 编程助手 | 可通过 Skill 目录调用脚本 |
| OpenClaw（龙虾） | 自托管 AI 助手平台 | 支持 Skills 的对话工作流 |
| Cursor | AI 原生代码编辑器 | 适合接入 Skill 协议或脚本化工作流 |
| Windsurf | AI 代码编辑器 | 适合接入 Skill 协议或脚本化工作流 |
| Cline | VS Code AI 扩展 | 可在项目工作流里复用脚本 |

任何支持 Skills 协议或可读取 Skill 目录的 AI 工具，都可以基于该 Skill 调用 OmniRouters 用户接口。

## 功能与指令一览

### 查询类指令

| 指令 | 说明 | 用途 |
| --- | --- | --- |
| `/omnirouters models` | 列出可用模型 | 查看当前账户可调用的模型列表 |
| `/omnirouters groups` | 列出可用分组 | 查看账户分组、倍率与配额相关信息 |
| `/omnirouters balance` | 查看账户余额 | 查询剩余额度、已用额度和请求次数 |
| `/omnirouters usage <request_id>` | 查询单次请求用量 | 按请求 ID 核对模型、令牌、消耗和 Token 数 |

### 令牌管理指令

| 指令 | 说明 | 用途 |
| --- | --- | --- |
| `/omnirouters tokens` | 列出 API 令牌 | 查看所有已创建令牌，密钥以掩码形式显示 |
| `/omnirouters create-token <name> [--group=xxx]` | 创建新 API 令牌 | 为不同项目或应用创建独立密钥 |
| `/omnirouters switch-group <token_id> <group>` | 切换令牌分组 | 调整令牌所属分组和模型访问范围 |
| `/omnirouters copy-token <token_id>` | 复制真实密钥 | 将真实密钥复制到系统剪贴板，不在终端显示 |

### 帮助指令

| 指令 | 说明 | 用途 |
| --- | --- | --- |
| `/omnirouters help <question>` | 提问 OmniRouters 使用问题 | 获取部署、配置、接口调用、分组、令牌等帮助 |

## 安装与配置

### 安装 Skill

下载压缩包后，将 `omnirouters` 目录放入你的 AI 编码助手 Skills 目录中：

- [下载 OmniRouters Skill](/downloads/omnirouters-skill.zip)
- [查看源码目录](https://github.com/1412212638/omni-docs/tree/main/skills/omnirouters)

如果你的工具支持从本地目录安装 Skill，可以直接指向仓库中的 `skills/omnirouters` 目录。

### 设置环境变量

OmniRouters Skill 需要以下环境变量连接你的 OmniRouters 账户：

```bash
export OMNIROUTERS_BASE_URL=https://omnirouters.com
export OMNIROUTERS_ACCESS_TOKEN=your-profile-access-token
export OMNIROUTERS_USER_ID=1
```

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `OMNIROUTERS_BASE_URL` | OmniRouters 服务地址，默认 `https://omnirouters.com` | `https://omnirouters.com` |
| `OMNIROUTERS_ACCESS_TOKEN` | 个人资料页的系统访问令牌，不是模型 API Key | `your-profile-access-token` |
| `OMNIROUTERS_USER_ID` | 用户 ID，用于 `New-Api-User` 请求头 | `1` |
| `OMNIROUTERS_QUOTA_PER_UNIT` | 可选，额度换算值，默认读取接口或使用 `500000` | `500000` |

## 开始使用

安装并配置环境变量后，在支持 Skills 的 AI 编码助手中直接输入 `/omnirouters` 指令即可。

常用示例：

```text
/omnirouters models
/omnirouters groups
/omnirouters balance
/omnirouters tokens
/omnirouters create-token my-app --group default
/omnirouters switch-group 7 auto
/omnirouters usage 202605220433553074851578268d9d6HOuv1cXR
/omnirouters copy-token 7
/omnirouters help 如何查看某次请求的实际消耗？
```

如果需要在终端里直接执行脚本，可以进入 Skill 目录后运行：

```bash
node scripts/omnirouters.mjs models
node scripts/omnirouters.mjs balance
node scripts/omnirouters.mjs tokens --page-size 20
node scripts/omnirouters.mjs usage <request_id>
```

添加 `--json` 可以输出经过脱敏处理的 JSON：

```bash
node scripts/omnirouters.mjs balance --json
```

## 请求级用量核对

如果你需要核对某一次模型请求的实际消耗，请先从模型响应头中记录：

```text
X-Oneapi-Request-Id: <request_id>
```

然后执行：

```bash
node scripts/omnirouters.mjs usage <request_id>
```

返回结果中，`quota` 是该请求最终实际消耗的原始整数额度。文档或脚本里展示的 USD 换算仅用于辅助阅读；结算、审计和对账时应保留原始 `quota`。

## 运行环境要求

OmniRouters Skill 使用 Node.js 脚本执行用户接口调用：

| 运行时 | 版本要求 | 说明 |
| --- | --- | --- |
| Node.js | 18+ | 推荐使用当前 LTS 版本 |

脚本使用 `fetch` 调用 OmniRouters API，并通过系统剪贴板完成 `copy-token` 操作。

## 安全机制

- 不在聊天、终端、日志、文件或命令参数中暴露任何 `sk-` 真实密钥。
- `tokens` 只显示掩码密钥。
- `create-token` 创建完成后不读取、不打印真实密钥。
- `copy-token` 只把真实密钥复制到系统剪贴板。
- `usage` 保留原始 `quota`，避免账单核对时因换算产生误差。
- 如果调用失败，错误信息会对疑似密钥内容做脱敏处理。

## 了解更多

- [OmniRouters API 参考](/zh/api/)
- [OmniRouters Skills 总览](/zh/skills/)
