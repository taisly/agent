![Taisly Agent Kit: AI agent social media posting for TikTok, Instagram Reels, YouTube Shorts, X, and Facebook](assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

AI agent social media posting for short-form video. Taisly Agent Kit is a JSON-first SDK and CLI that lets AI agents, developer tools, and automation workflows publish videos to TikTok, Instagram Reels, YouTube Shorts, X, Facebook, and other connected social platforms through Taisly.

Use it when your agent can create content, write captions, or prepare a campaign, but still needs a reliable video publishing API to put that content online.

[Website](https://taisly.com/en) | [Agent Kit](https://taisly.com/en/ai-agent-kit) | [API Docs](https://docs.taisly.com/en/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Guide](https://taisly.com/en/blog/ai-agent-social-media-posting-api)

## Languages

Read this guide in:
[English](docs/i18n/README.en.md),
[Español](docs/i18n/README.es.md),
[Deutsch](docs/i18n/README.de.md),
[Français](docs/i18n/README.fr.md),
[Português](docs/i18n/README.pt-PT.md),
[ไทย](docs/i18n/README.th.md),
[中文](docs/i18n/README.zh-CN.md),
[Bahasa Indonesia](docs/i18n/README.id.md),
[Русский](docs/i18n/README.ru.md),
[Nederlands](docs/i18n/README.nl.md),
[한국어](docs/i18n/README.ko.md),
[日本語](docs/i18n/README.ja.md),
[العربية](docs/i18n/README.ar.md),
[Türkçe](docs/i18n/README.tr.md),
[Polski](docs/i18n/README.pl.md).

## Why developers use it

- Build AI agent social media posting into Codex, Claude Code, Cursor, OpenClaw, and custom automation tools.
- Automate video publishing from one local file to multiple connected social accounts.
- Give agents a safe JSON workflow: discover accounts, validate payloads, create posts, and check status.
- Add TikTok API posting automation, Instagram Reels automation, YouTube Shorts publishing, and cross-platform social media automation without building every platform integration yourself.

Taisly handles the connected accounts and posting execution. Your agent handles planning, caption writing, campaign logic, or workflow orchestration.

## Install

```bash
npm install -g @taisly/agent
```

Or run it without a global install:

```bash
npx @taisly/agent help
```

For local development inside this repository:

```bash
node packages/agent/src/cli.js help
```

## Authentication

Create an API key in [Taisly Settings](https://app.taisly.com/en/settings), then set:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

`TAISLY_API_URL` is optional unless you need to target a non-default Taisly API environment.

## Quick start

List the connected social accounts available to the API key:

```bash
taisly auth:status
taisly platforms:list
```

Validate a local video before publishing:

```bash
taisly posts:validate \
  --video ./launch.mp4 \
  --platforms platform_id_1,platform_id_2 \
  --description "Launch day"
```

Publish now:

```bash
taisly posts:create \
  --video ./launch.mp4 \
  --platforms platform_id_1,platform_id_2 \
  --description "Launch day"
```

Schedule for later:

```bash
taisly posts:create \
  --video ./launch.mp4 \
  --platforms platform_id_1,platform_id_2 \
  --description "Launch day" \
  --scheduled "2026-06-14T09:00:00+07:00"
```

Check the returned post:

```bash
taisly posts:status --id <historyId>
```

Every command prints JSON so agents can parse results without scraping terminal text.

## JSON workflow for agents

Agents can write a payload file and pass it to the CLI:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1", "platform_id_2"],
  "description": "Launch day. Short demo, big update.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

Then run:

```bash
taisly posts:validate --json ./campaign.json
taisly posts:create --json ./campaign.json
```

The `video` path must point to a real local file available to the agent. Supported local preflight extensions are `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`, `.flv`, `.mpeg`, and `.mpg`.

## Commands

```bash
taisly auth:status
taisly platforms:list
taisly integrations:list
taisly platforms:schema --platform TikTok
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Launch day"
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Launch day"
taisly posts:create --json ./campaign.json
taisly posts:list --page 1
taisly posts:status --id <historyId>
taisly reposts:list
taisly reposts:create --from <platform_id> --to <platform_id_1,platform_id_2>
```

`integrations:*` commands are aliases for `platforms:*` commands. Taisly calls connected social accounts platforms in the app, while many public APIs call them integrations.

## SDK

```js
import { Taisly } from "@taisly/agent";

const taisly = new Taisly({
  apiKey: process.env.TAISLY_API_KEY,
});

const platforms = await taisly.platforms.list();

const validation = await taisly.posts.validate({
  video: "./launch.mp4",
  platforms: [platforms.data[0].id],
  description: "Launch day",
});

const post = await taisly.posts.create({
  video: "./launch.mp4",
  platforms: [platforms.data[0].id],
  description: "Launch day",
  scheduled: "2026-06-14T09:00:00+07:00",
});

console.log(validation.success);
console.log(post.historyId);
```

## Use with AI agents

Taisly Agent Kit is designed for agentic workflows where the user gives a high-level instruction and the agent executes a safe posting path.

- Codex: let a coding agent publish demo videos, launch clips, or build updates after user confirmation.
- Claude Code: add social posting to local content workflows and campaign scripts.
- Cursor: ship video publishing from developer tools, content apps, and internal automation.
- OpenClaw and custom agents: connect planning, caption writing, and posting execution through a single CLI.

Recommended agent path:

```txt
auth:status -> platforms:list -> platforms:schema -> posts:validate -> user confirmation -> posts:create -> posts:status
```

## Agent recipes

The `examples/` folder includes copy-paste workflows for common coding agents:

- `examples/codex/post-video.md`
- `examples/claude-code/schedule-video.md`
- `examples/cursor/post-build-demo-video.md`
- `examples/post-video.sh`
- `examples/schedule-video.sh`

## What this package is not

- It is not a social media dashboard.
- It is not a video editor.
- It does not replace a Taisly account.
- It requires connected social accounts and a Taisly API key.
- It does not bypass platform rules, account permissions, or media validation.

## Current limits

- `posts:create` uses the existing multipart `/post` API.
- `posts:status` reads recent history because a single-post status endpoint is not available yet.
- `posts:validate` is local preflight; final validation still happens in Taisly.
- Media upload reuse and MCP are planned next.

## Links

- Taisly: <https://taisly.com/en>
- Agent Kit page: <https://taisly.com/en/ai-agent-kit>
- API docs: <https://docs.taisly.com/en/docs>
- npm package: <https://www.npmjs.com/package/@taisly/agent>
- GitHub repo: <https://github.com/taisly/agent>
- SEO guide: <https://taisly.com/en/blog/ai-agent-social-media-posting-api>
