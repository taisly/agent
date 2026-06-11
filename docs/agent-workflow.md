# AI Agent Workflow

This document describes the expected Taisly workflow for Codex, Claude Code, Cursor, OpenClaw-style agents, and automation scripts.

## Golden Path

1. User connects social accounts in Taisly.
2. User creates an API key in Settings.
3. Agent receives `TAISLY_API_KEY` through environment variables.
4. Agent runs `taisly platforms:list`.
5. Agent maps requested destinations to platform IDs.
6. Agent asks for confirmation if destination, caption, video, or schedule is ambiguous.
7. Agent runs `taisly posts:create`.
8. Agent stores `historyId`.
9. Agent reports initial platform statuses.

## Safe Defaults

- Never publish to every account by default.
- Never retry `posts:create` blindly after a timeout.
- Never print API keys.
- Treat `historyId` as the source of truth for follow-up.
- Prefer scheduled posting for future timestamps.

## Example Agent Prompt

```txt
Post ./launch.mp4 to my TikTok and YouTube Shorts tomorrow at 9 AM Bangkok time.
Use this caption: "Launch day. Short demo, big update."
```

Expected agent steps:

```bash
taisly auth:status
taisly platforms:list
taisly platforms:schema --platform TikTok
taisly platforms:schema --platform YouTube
taisly posts:create \
  --video ./launch.mp4 \
  --platforms <tiktok_id>,<youtube_id> \
  --description "Launch day. Short demo, big update." \
  --scheduled "2026-06-14T09:00:00+07:00"
```

## Current Gaps

- Dedicated single-post status endpoint.
- Backend media metadata validation.
- Shared platform schema endpoint.
- Draft/human approval mode.
- Idempotency keys.
