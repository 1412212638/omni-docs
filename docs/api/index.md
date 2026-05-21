---
title: API 参考
---

# API 参考

这里是 OmniRouters API 文档的总入口。OmniRouters 提供统一的多模态 AI 接入能力，包括对话、文本生成、图像、视频、语音、音乐、Embeddings、Rerank 等能力。

完整的接口目录目前维护在 Apifox。本网站主要负责提供接入路径、协议说明和使用文档入口。

## LLM 文本生成

如果你的场景是聊天、文本生成或推理工作流，建议先从这组协议页开始：

- [LLM 文本生成总览](/zh/api/llm/)
- [OpenAI Chat Completions](/zh/api/llm/openai-chat)
- [OpenAI Responses](/zh/api/llm/openai-responses)
- [Claude Messages](/zh/api/llm/claude-messages)
- [Gemini Generate Content](/zh/api/llm/gemini-generate-content)
- [协议对比](/zh/api/llm/protocol-comparison)

OmniRouters 支持使用 OpenAI 兼容协议调用账号中已启用的所有模型。如果你不确定该用哪条协议，优先从 OpenAI 兼容路由开始。

## 视频与图片生成

如果你的场景是文生视频、图生视频、生图或参考图生图，可以先看这两页：

- [Omni-Video API](/zh/api/omni-video)：视频创建兼容路由、文生视频/图生视频最小可用示例、顶层请求参数。
- [Omni-Image API](/zh/api/omni-image)：标准图片生成、参考图生图最小可用示例、顶层请求参数。

## 完整接口参考

当你需要查看接口参数、请求示例、响应结构或能力细节时，可以直接打开完整 Apifox 参考：

[打开 Apifox API 参考](https://omnirouters.apifox.cn/)

## 调用前准备

| 项目 | 内容 |
| --- | --- |
| API Key 控制台 | [https://omnirouters.com/keys](https://omnirouters.com/keys) |
| Base URL | `https://omnirouters.com/v1` |
| 认证方式 | `Authorization: Bearer <your-api-key>` |
| 请求格式 | 通常为 `Content-Type: application/json` |

## 推荐接入路径

1. 先阅读 [平台简介](/zh/guide/overview)。
2. 通过 [快速开始](/zh/guide/quick-start) 完成第一条请求。
3. 阅读 [使用文档](/zh/guide/usage) 了解通用接入规则。
4. 如果是 LLM 对话或文本生成场景，阅读 [LLM 文本生成](/zh/api/llm/)。
5. 如果是视频或图片生成场景，阅读 [Omni-Video API](/zh/api/omni-video) 或 [Omni-Image API](/zh/api/omni-image)。
6. 最后打开 [Apifox API 参考](https://omnirouters.apifox.cn/) 查看字段级细节。

## 常见能力范围

| 能力 | 适合查看的内容 |
| --- | --- |
| Chat | 对话与文本生成接口 |
| Image | 文生图与图像编辑接口 |
| Video | 文生视频、图生视频和素材重组接口 |
| Speech | 文本转语音与语音生成接口 |
| Music | Suno 与音乐生成流程 |
| Embeddings | 向量生成接口 |
| Rerank | 候选结果重排接口 |

如果你仍然不确定应该使用哪个端点，可以把你的使用场景和模型名称发给 [技术支持](/zh/guide/getting-started)。
