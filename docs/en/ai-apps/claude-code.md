# Claude Code Configuration Guide

This guide shows how to configure Claude Code to call models through the OmniRouters gateway.

## 1. Install Claude Code

Run the following command in your terminal to install Claude Code globally:

```bash
npm install -g @anthropic-ai/claude-code
```

After installation, check whether it is available:

```bash
claude --version
```

If a version is printed, the installation is working. The displayed version is only a reference; use the actual output on your machine.

## 2. Core configuration

To route Claude Code through OmniRouters, update the local configuration before starting Claude Code.

### Step 1: Update `settings.json`

Find the configuration file for your operating system.

macOS:

```bash
open ~/.claude/settings.json
```

Linux:

```bash
vim ~/.claude/settings.json
```

Windows:

```text
C:\Users\YourUsername\.claude\settings.json
```

If the `.claude` directory or `settings.json` file does not exist, create it manually.

Replace the file content with the following configuration, and replace `YOUR API TOKEN` with your OmniRouters API key:

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

Notes:

- `ANTHROPIC_BASE_URL` should be `https://omnirouters.com` without `/v1`.
- `ANTHROPIC_MODEL` and the top-level `model` must use the same model name.
- To change the default model later, update both values and restart Claude Code.

### Step 2: Skip onboarding

To avoid the CLI trying to connect to the original provider for verification, update the onboarding state directly.

Open the configuration file on macOS:

```bash
open ~/.claude/.claude.json
```

Linux:

```bash
vim ~/.claude/.claude.json
```

Windows path:

```text
C:\Users\YourUsername\.claude\.claude.json
```

Find `hasCompletedOnboarding` and make sure it is set to `true`. If it is not, update it to:

```json
{
  "hasCompletedOnboarding": true
}
```

If the file already contains other settings, only make sure the `hasCompletedOnboarding` field is `true`.

## 3. Start and use Claude Code

Start Claude Code from the terminal:

```bash
claude
```

When entering a project directory for the first time, choose:

```text
1 Yes, I trust this folder
```

After Claude Code starts, check the current model:

```text
/model
```

Confirm that the current model is the OmniRouters model configured above, then start using Claude Code normally.

## 4. Notes and limitations

- Gateway delay: after creating a new token, synchronization may take about 1 minute. If you receive `401`, wait and try again.
- Rate limits: for high-frequency code completion workloads, contact OmniRouters business support to request adjusted limits for your account.
- Compliance review: if input or output triggers sensitive terms, the request may return a `400` error.

## Related Links

- [AI Apps overview](/ai-apps/)
- [Codex Configuration Guide](/ai-apps/codex)
- [OmniRouters API Reference](/api/)
