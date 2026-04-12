---
title: API 参考
---

# API 参考

这里是 OmniRouters API 文档的入口页。OmniRouters 提供面向多模态 AI 能力的统一接入，包括对话、图像、视频、语音、音乐、Embeddings、Rerank 等能力。

完整接口目录目前维护在 Apifox。本站负责提供接入路径、使用说明和完整接口参考入口。

## 完整接口参考

当你需要查看接口参数、请求示例、响应结构或具体能力说明时，可以打开完整 Apifox 接口参考：

[打开 Apifox API 参考](https://omnirouters.apifox.cn/)

## 调用前准备

| 项目 | 内容 |
| --- | --- |
| API Key 控制台 | [https://omnirouters.com/console/token](https://omnirouters.com/console/token) |
| Base URL | `https://omnirouters.com/v1` |
| 认证方式 | `Authorization: Bearer <your-api-key>` |
| 请求格式 | 通常为 `Content-Type: application/json` |

## 推荐接入路径

1. 先阅读[平台简介](/zh/guide/overview)。
2. 通过[快速开始](/zh/guide/quick-start)完成第一次请求。
3. 阅读[使用文档](/zh/guide/usage)了解常见规则。
4. 打开 [Apifox API 参考](https://omnirouters.apifox.cn/)查看具体接口参数。

## 常见能力范围

| 能力 | 适合查看的内容 |
| --- | --- |
| Chat | 对话和文本生成接口 |
| Image | 文生图和图像编辑接口 |
| Video | 文生视频、图生视频和素材视频接口 |
| Speech | 文本转语音和音色生成接口 |
| Music | Suno 和音乐生成工作流 |
| Embeddings | 向量生成接口 |
| Rerank | 候选内容重排接口 |

如果你不确定应该使用哪个接口，可以把使用场景和模型名称发给[技术支持](/zh/guide/getting-started)。
