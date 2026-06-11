# GitHub And NPM Launch Plan

This is the operational checklist for turning the in-repo Agent Kit into a public distribution channel.

## 1. Create Public GitHub Repo

Recommended repo:

```txt
taisly-agent-kit
```

Recommended description:

```txt
JSON-first CLI, SDK, and agent skill for publishing short-form videos through Taisly.
```

Recommended topics:

```txt
ai-agents
agentic-ai
social-media
video-publishing
tiktok
instagram-reels
youtube-shorts
automation
codex
claude-code
cursor
openapi
llms-txt
mcp
```

Initial files to copy:

```txt
docs/agent-kit/README.md     -> README.md
SKILL.md                     -> SKILL.md
packages/agent/LICENSE       -> LICENSE
packages/agent               -> packages/agent
docs/agent-kit               -> docs
```

## 2. Publish NPM Package

Preferred package:

```txt
@taisly/agent
```

Fallback if the scope is unavailable:

```txt
taisly-agent
```

Before publish:

```bash
cd packages/agent
npm pack --dry-run
npm publish --access public
```

After publish:

```bash
npx @taisly/agent help
npx @taisly/agent platforms:list
npx @taisly/agent posts:validate --video ./your-video.mp4 --platforms <platform_id> --description "Smoke test"
```

## 3. Website Links

Add links from:

- `/agent`;
- `/ai-agent-kit`;
- `/ai-agents`;
- docs home;
- API key settings page;
- footer "Other" section.

This branch covers `/agent`, the website page, `/ai-agents` link, footer link, Settings API key link, docs `/llms.txt`, `/llms-full.txt`, and `/agents` discovery surface.

After the package is published, add a dedicated docs page on `docs.taisly.com`.

## 4. Product Copy

Primary headline:

```txt
Let AI agents publish your short-form videos.
```

Secondary:

```txt
Connect TikTok, Instagram Reels, YouTube Shorts, X, and Facebook once. Give your agent a Taisly API key. It can schedule and track video posts with JSON commands.
```

## 5. MCP Later

Do not ship MCP before the SDK contract is stable.

Recommended first MCP tools:

```txt
taisly_auth_status
taisly_platforms_list
taisly_platform_schema
taisly_post_create
taisly_post_status
taisly_repost_create
```

Keep MCP as a thin wrapper around `@taisly/agent`.
