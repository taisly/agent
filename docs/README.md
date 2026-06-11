# Taisly Agent Kit

Taisly Agent Kit is the public-facing integration surface for AI agents that need to publish short-form videos through Taisly.

The product position is simple:

> Taisly is the video publishing API for AI agents.

Humans keep using the dashboard. Agents use a small, predictable surface:

1. discover connected platforms;
2. inspect platform constraints;
3. create an immediate or scheduled video post;
4. keep the returned `historyId`;
5. check status.

## What This Branch Adds

- `packages/agent`: JSON-first CLI and SDK package skeleton.
- `SKILL.md`: instructions that Codex, Claude Code, Cursor, OpenClaw-style agents can read.
- `/ai-agent-kit`: SEO/devrel landing page for the website.
- `/agent`: short Postiz-style SEO entrypoint that renders the Agent Kit page.
- this documentation folder: launch plan for GitHub/npm/MCP.
- `postiz-agent-analysis.md`: fresh Postiz AI-agent surface comparison.
- `api-contract.md`: v0 CLI/API contract for docs, package, and future MCP.
- `owner-launch-runbook.ru.md`: owner checklist for GitHub/npm/docs launch.

## Why Not MCP First

Postiz exposes MCP, CLI, agent skills, and docs. The useful lesson is not "ship everything at once"; the lesson is to expose one stable primitive through multiple agent-friendly surfaces.

For Taisly, the primitive is video posting:

```txt
video file + platform IDs + caption + optional schedule -> historyId
```

MCP should wrap that primitive later. The package and docs come first because they are easier to ship, easier to test, and easier for agents to discover.

## MVP Agent Commands

```bash
taisly auth:status
taisly platforms:list
taisly integrations:list
taisly platforms:schema --platform TikTok
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1,platform_id_2 --description "Launch day"
taisly posts:create --video ./launch.mp4 --platforms platform_id_1,platform_id_2 --description "Launch day"
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Launch day" --scheduled "2026-06-14T09:00:00+07:00"
taisly posts:create --json ./campaign.json
taisly posts:list --page 1
taisly posts:status --id <historyId>
taisly reposts:create --from <platform_id> --to <platform_id_1,platform_id_2>
```

## Next Backend Contracts

These are intentionally not required for the first web/package branch, but they should be next:

- `GET /post/:id` or `GET /post/status?id=...`.
- `POST /post/validate` for media/caption/platform preflight.
- `GET /platform/schema` backed by a real platform capability registry.
- optional `Idempotency-Key` support for `POST /post`.
- later: `POST /media/upload` and `mediaId` post creation.
- later: MCP server wrapping the same SDK.

## Launch Checklist

- Web page live at `/ai-agent-kit`.
- Short agent entrypoint live at `/agent`.
- Public repo created from the Agent Kit files.
- npm package published as `@taisly/agent` or `taisly-agent`.
- Docs page updated with API key setup and quickstart.
- Settings page links to Agent Kit.
- Blog post: "How to let AI agents post videos to TikTok, Instagram Reels, and YouTube Shorts".
