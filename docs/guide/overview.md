# 平台简介

OmniRouters 是一个面向多模态 AI 能力接入的统一 API 平台。开发者可以通过统一的文档与接入入口，调用对话、图像、视频、音频、音乐、Embeddings、Rerank 等多类模型能力。

这个文档站的目标，是在你打开完整 Apifox 接口参考之前，先提供清晰的接入路径、核心概念和使用说明。

## OmniRouters 提供什么

| 模块 | 说明 |
| --- | --- |
| 统一接入 | 通过统一的平台入口接入多类 AI 能力。 |
| 多模态能力 | 覆盖文本、图像、视频、音频、音乐、Embeddings、Rerank 等能力。 |
| 接入指引 | 说明 API Key 获取、Base URL、请求格式和常见使用路径。 |
| 接口参考 | 需要完整参数和响应结构时，可跳转到 Apifox 接口参考。 |

## 核心概念

### API Key

API 请求使用 Bearer Token 认证。你可以在 OmniRouters 控制台创建和管理 API Key：

[打开 API Key 控制台](https://omnirouters.com/console/token)

### Base URL

API 请求使用以下基础地址：

```text
https://omnirouters.com/v1
```

### 模型名称

模型名称需要与你账号内可用的 OmniRouters 模型以及接口参考中的模型名称保持一致。如果请求因为模型名称失败，优先检查模型是否已启用，以及名称是否完全匹配。

### API 参考

本站负责提供接入路径和使用说明。完整接口列表、参数定义和响应示例仍然保留在 Apifox：

[打开 Apifox API 参考](https://omnirouters.apifox.cn/)

## 推荐阅读路径

1. 阅读[快速开始](/zh/guide/quick-start)，完成第一次请求。
2. 阅读[使用文档](/zh/guide/usage)，了解认证、模型名称、异步任务、计费和错误处理。
3. 打开 [API 参考](/zh/api/)，查看具体接口参数。

