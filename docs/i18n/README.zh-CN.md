![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit 帮助 AI 代理把短视频发布到社交媒体。它是基于 JSON 的 SDK 和命令行工具，可通过 Taisly 将视频发布到 TikTok、Instagram Reels、YouTube Shorts、X、Facebook 以及其他已连接平台。

当你的代理已经能准备内容、撰写发布文案或规划活动，但还需要可靠的 API 来真正发布视频时，可以使用它。

[Taisly](https://taisly.com/zh-CN) | [Agent Kit](https://taisly.com/zh-CN/ai-agent-kit) | [API 文档](https://docs.taisly.com/zh-CN/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [指南](https://taisly.com/zh-CN/blog/ai-agent-social-media-posting-api)

## 其他语言

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | **中文** | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## 快速开始

安装包：

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## 身份验证

在 Taisly 设置中创建 API 密钥，然后设置：

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

列出已连接的社交账号：

```bash
taisly auth:status
taisly platforms:list
```

发布前检查视频：

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "发布日。短演示，大更新。"
```

发布帖子并检查状态：

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "发布日。短演示，大更新。"
taisly posts:status --id <historyId>
```

## 使用 JSON 的流程

代理可以准备一个包含发布数据的文件：

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "发布日。短演示，大更新。",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- 为 Codex、Claude Code、Cursor、OpenClaw 和自有工具加入 AI 代理社交发布能力。
- 将一个本地视频发布到多个已连接账号。
- 使用安全流程：查找账号、检查数据、创建帖子并获取状态。

## 链接

- Taisly: https://taisly.com/zh-CN
- Agent Kit: https://taisly.com/zh-CN/ai-agent-kit
- API 文档: https://docs.taisly.com/zh-CN/docs
- Taisly 设置: https://app.taisly.com/zh-CN/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
