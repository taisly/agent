# Taisly Agent

JSON-first SDK and CLI for AI agents that publish short-form videos through Taisly.

Taisly is the execution layer for AI-generated video workflows: agents can discover connected accounts, create an immediate or scheduled post, and track the returned `historyId`.

## Install

```bash
npm install -g @taisly/agent
```

For local development inside this repository:

```bash
node packages/agent/src/cli.js help
```

## Authentication

Create an API key in Taisly Settings, then set:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

## Commands

```bash
taisly auth:status
taisly platforms:list
taisly integrations:list
taisly platforms:schema --platform TikTok
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1,platform_id_2 --description "Launch day"
taisly posts:create --video ./launch.mp4 --platforms platform_id_1,platform_id_2 --description "Launch day" --scheduled "2026-06-14T09:00:00+07:00"
taisly posts:create --json ./campaign.json
taisly posts:list --page 1
taisly posts:status --id <historyId>
taisly reposts:create --from <platform_id> --to <platform_id_1,platform_id_2>
```

Every command prints JSON.

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

console.log(post.historyId);
```

## JSON Input

Agents can create a payload file and pass it to the CLI:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1", "platform_id_2"],
  "description": "Launch day. Short demo, big update.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

The `video` path must point to a real local file available to the agent.
Supported video extensions for local preflight are `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`, `.flv`, `.mpeg`, and `.mpg`.

```bash
taisly posts:validate --json ./campaign.json
taisly posts:create --json ./campaign.json
```

## Agent Recipes

The `examples/` folder includes copy-paste workflows for common coding agents:

- `examples/codex/post-video.md`
- `examples/claude-code/schedule-video.md`
- `examples/cursor/post-build-demo-video.md`
- `examples/post-video.sh`
- `examples/schedule-video.sh`

Each recipe follows the same safe path:

```txt
auth -> platforms:list -> schema -> validate -> human confirmation -> create -> status
```

## Current Limits

- `posts:create` uses the existing multipart `/post` API.
- `posts:status` reads recent history because a single-post status endpoint is not available yet.
- `posts:validate` is local preflight; final validation still happens in Taisly.
- Media upload/reuse and MCP are planned next.

## Safe Agent Workflow

1. Run `platforms:list`.
2. Ask the user to confirm destination accounts.
3. Run `platforms:schema` for platform constraints.
4. Run `posts:validate`.
5. Create the post with `posts:create`.
6. Store the returned `historyId`.
7. Check status with `posts:status`.
