# 快速开始

这份指南帮助你完成一次基础的 OmniRouters API 请求。

## 1. 创建 API Key

打开 OmniRouters API Key 页面并创建密钥：

[https://omnirouters.com/console/token](https://omnirouters.com/console/token)

请妥善保存 API Key，不要把它放在前端代码、公开仓库、截图或共享文档中。

## 2. 设置 Base URL

使用：

```text
https://omnirouters.com/v1
```

## 3. 发送测试请求

将 `<your-api-key>` 和 `<model-name>` 替换为你自己的 API Key 和模型名称。

```bash
curl https://omnirouters.com/v1/chat/completions \
  -H "Authorization: Bearer <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model-name>",
    "messages": [
      {
        "role": "user",
        "content": "Say hello from OmniRouters."
      }
    ]
  }'
```

如果你要测试图像、视频、语音或音乐生成，可以打开 API 参考，进入对应接口分类：

[打开 Apifox API 参考](https://omnirouters.apifox.cn/)

## 4. 检查响应

请求成功后会返回 JSON 响应。如果请求失败，优先检查：

- API Key 是否正确
- 模型名称是否在你的账号中可用
- 请求体是否符合接口参数要求
- 账号余额是否充足

## 5. 下一步

- 阅读[使用文档](/zh/guide/usage)
- 查看 [API 参考](/zh/api/)
- 遇到问题时联系[技术支持](/zh/guide/getting-started)

