---
name: taisly-social-media-posting
description: Publish short-form videos to TikTok, Instagram Reels, YouTube Shorts, X, and Facebook from AI agents through Taisly.
metadata:
  publicName: Taisly Social Media Posting Skill
  requirements:
    env:
      - TAISLY_API_KEY
    binaries:
      - taisly
---

# Taisly Social Media Posting Skill

Use this skill when a user asks an AI agent to publish, schedule, or repost short-form video content through Taisly.

## Rules

- Always discover platforms before posting.
- Ask for explicit confirmation before publishing to live social accounts unless the user already gave exact destination accounts, video file, caption, and schedule.
- If MCP tools are available, prefer them over shell commands; otherwise use the JSON-first CLI.
- For MCP publishing, call `taisly_posts_create` only with `confirmed: true` after explicit user approval.
- Never invent platform IDs.
- Never expose or print `TAISLY_API_KEY`.
- Prefer scheduled posts when the user gives a future time.
- Save the returned `historyId` so status can be checked later.
- Supported local video extensions are `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`, `.flv`, `.mpeg`, and `.mpg`.

## Environment

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
taisly posts:validate --video ./video.mp4 --platforms platform_id_1,platform_id_2 --description "Caption"
taisly posts:create --video ./video.mp4 --platforms platform_id_1,platform_id_2 --description "Caption" --scheduled "2026-06-14T09:00:00+07:00"
taisly posts:create --json ./campaign.json
taisly posts:list --page 1
taisly posts:status --id <historyId>
taisly reposts:create --from <platform_id> --to <platform_id_1,platform_id_2>
taisly mcp
```

All commands return JSON.

## MCP Tools

When the MCP server is connected, use these tools instead of shell commands:

- `taisly_auth_status`
- `taisly_platforms_list`
- `taisly_platform_schema`
- `taisly_posts_validate`
- `taisly_posts_create`
- `taisly_posts_status`
- `taisly_posts_list`
- `taisly_reposts_list`
- `taisly_reposts_create`

## Posting Workflow

1. Run `taisly auth:status`.
2. Run `taisly platforms:list`.
3. Match the user's requested platforms to connected platform IDs.
4. Run `taisly platforms:schema --platform <name>` for constraints.
5. Run `taisly posts:validate`.
6. Confirm destination accounts and caption with the user.
7. Run `taisly posts:create`.
8. Report the returned `historyId`, scheduled date, and per-platform initial statuses.

For MCP, follow the same sequence with `taisly_auth_status`, `taisly_platforms_list`, `taisly_platform_schema`, `taisly_posts_validate`, `taisly_posts_create`, and `taisly_posts_status`.

## Error Handling

- `TAISLY_API_KEY_MISSING`: ask the user to create or provide an API key.
- `PLATFORMS_REQUIRED`: ask which connected accounts should receive the post.
- `VIDEO_REQUIRED`: ask for a local video path.
- `POST_NOT_FOUND_IN_RECENT_HISTORY`: tell the user the post was created but a dedicated status endpoint is not available yet; check Taisly History.

## What Not To Do

- Do not post to every connected account unless the user explicitly asks.
- Do not retry `posts:create` blindly after a timeout; ask the user or check History first.
- Do not use unsupported file types.
