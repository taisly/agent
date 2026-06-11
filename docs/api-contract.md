# Taisly Agent Kit API Contract

Date: 2026-06-10

This document defines the v0 contract that AI agents, the `@taisly/agent` package, docs, and marketing pages should agree on.

## Product Boundary

Taisly Agent Kit is not a new dashboard and not a generic social media workspace.

It exposes one focused workflow:

```txt
local video + connected platform IDs + caption + optional schedule -> Taisly post -> historyId
```

## Required Environment

```bash
export TAISLY_API_KEY=taisly_...
export TAISLY_API_URL=https://app.taisly.com/api/private
```

`TAISLY_API_URL` is optional. The package defaults to production.

## Stable v0 CLI Commands

These commands are the public v0 surface:

```bash
taisly auth:status
taisly platforms:list
taisly integrations:list
taisly platforms:schema --platform TikTok
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1,platform_id_2 --description "Launch day"
taisly posts:create --video ./launch.mp4 --platforms platform_id_1,platform_id_2 --description "Launch day"
taisly posts:create --json ./campaign.json
taisly posts:list --page 1
taisly posts:status --id <historyId>
taisly reposts:list
taisly reposts:create --from <platform_id> --to <platform_id_1,platform_id_2>
```

Every command returns JSON. Errors return:

```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Human readable explanation"
}
```

## JSON Post Payload

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1", "platform_id_2"],
  "description": "Launch day. Short demo, big update.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

Required:

- `video`
- `platforms`
- `description`

Optional:

- `scheduled`
- `previewTime`

## Agent Safety Contract

Agents must:

- call `platforms:list` before creating a post;
- never invent platform IDs;
- validate before creating a post;
- ask for human confirmation when destination, video, caption, or timing is ambiguous;
- store and report `historyId`;
- avoid blind retries after a timeout.

Agents must not:

- print `TAISLY_API_KEY`;
- post to every connected account unless explicitly asked;
- promise draft mode until the backend supports it.

## Current v0 Limits

- `posts:create` uses the existing multipart `/post` API.
- `posts:validate` is local preflight, not a server validation endpoint.
- `posts:status` reads recent history until a single-post status endpoint ships.
- Platform schema is package-provided static guidance until a backend schema endpoint ships.
- MCP is planned after the CLI/API contract stabilizes.

## Next Backend Contract

The next backend work should make the agent surface stronger without changing the human UI:

```txt
GET /post/:id or GET /post/status?id=...
POST /post/validate
GET /platform/schema
POST /media/upload
Idempotency-Key on POST /post and POST /repost/add
```

Once those exist, `@taisly/agent` can add:

```txt
media:upload
posts:create --media-id ...
posts:schedule
mcp
```
