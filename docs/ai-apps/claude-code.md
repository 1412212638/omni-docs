# Claude Code 配置教程

本页介绍如何让 Claude Code 通过 OmniRouters 网关调用模型。

## 1. 安装 Claude Code

在个人电脑终端执行以下命令进行全局安装：

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后，可以通过以下命令检查是否安装成功：

```bash
claude --version
```

如果能正常展示版本号，说明安装成功。版本号仅做参考，以本机实际输出为准。

## 2. 核心配置步骤

要让 Claude Code 走 OmniRouters 网关，需要先修改本地配置文件，再启动 Claude Code。

### 第一步：修改 `settings.json`

根据操作系统找到对应的配置文件路径。

macOS：

```bash
open ~/.claude/settings.json
```

Linux：

```bash
vim ~/.claude/settings.json
```

Windows：

```text
C:\Users\你的用户名\.claude\settings.json
```

如果 `.claude` 文件夹或 `settings.json` 文件不存在，请手动创建。

将文件内的配置整体替换为以下内容，并把 `YOUR API TOKEN` 替换为你的 OmniRouters API Key：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "YOUR API TOKEN",
    "ANTHROPIC_BASE_URL": "https://omnirouters.com",
    "ANTHROPIC_MODEL": "claude-opus-4.7"
  },
  "model": "claude-opus-4.7"
}
```

注意：

- `ANTHROPIC_BASE_URL` 填写 `https://omnirouters.com`，后面不要带 `/v1`。
- `ANTHROPIC_MODEL` 和顶层 `model` 都要同步填写同一个模型名称。
- 如果后续需要更换默认模型，请同时修改这两个值，然后重启 Claude Code。

### 第二步：跳过初始引导

为了避免 CLI 尝试连接原厂验证，建议直接修改 onboarding 状态。

macOS 终端打开配置文件：

```bash
open ~/.claude/.claude.json
```

Linux：

```bash
vim ~/.claude/.claude.json
```

Windows 对应路径：

```text
C:\Users\你的用户名\.claude\.claude.json
```

在文件中查找 `hasCompletedOnboarding` 参数，确保它的值为 `true`。如果不是，可以直接修改为：

```json
{
  "hasCompletedOnboarding": true
}
```

如果文件里已有其他配置，只需要保证 `hasCompletedOnboarding` 字段为 `true`。

## 3. 启动与使用

在终端直接输入命令启动：

```bash
claude
```

首次进入项目目录时，选择：

```text
1 Yes, I trust this folder
```

启动后，可以输入以下命令检查当前模型：

```text
/model
```

确认当前使用的是配置的 OmniRouters 模型后，即可开始对话并正常运行。

## 4. 注意事项与限制

- 网关延迟：新建 Token 后约有 1 分钟同步时间，如果提示 `401`，请稍后再试。
- 频次限制：对于高频代码补全需求，建议联系 OmniRouters 商务根据账号申请调频。
- 合规审核：如果输入或输出触发敏感词，可能会收到 `400` 错误。

## 相关链接

- [AI 应用总览](/zh/ai-apps/)
- [Codex 配置教程](/zh/ai-apps/codex)
- [OmniRouters API 参考](/zh/api/)
