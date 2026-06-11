![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit helps AI agents publish short-form videos to social media. It is a JSON-based SDK and command-line tool for posting videos through Taisly to TikTok, Instagram Reels, YouTube Shorts, X, Facebook, and other connected platforms.

Use it when your agent can prepare content, write post text, or plan a campaign, but still needs a reliable API to actually publish the video.

[Taisly](https://taisly.com/en) | [Agent Kit](https://taisly.com/en/ai-agent-kit) | [API docs](https://docs.taisly.com/en/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Guide](https://taisly.com/en/blog/ai-agent-social-media-posting-api)

## Languages

**English** | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Quick start

Install the package:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Authentication

Create an API key in Taisly Settings, then set:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

List connected social accounts:

```bash
taisly auth:status
taisly platforms:list
```

Validate the video before publishing:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Launch day. Short demo, big update."
```

Create the post and check status:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Launch day. Short demo, big update."
taisly posts:status --id <historyId>
```

## JSON process

The agent can prepare a file with publishing data:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Launch day. Short demo, big update.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Add social media publishing for AI agents to Codex, Claude Code, Cursor, OpenClaw, and your own tools.
- Publish one local video to multiple connected accounts.
- Use a safe process: find accounts, validate data, create the post, and fetch status.

## Links

- Taisly: https://taisly.com/en
- Agent Kit: https://taisly.com/en/ai-agent-kit
- API docs: https://docs.taisly.com/en/docs
- Taisly Settings: https://app.taisly.com/en/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
