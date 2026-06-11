# Codex Recipe: Post A Short Video Through Taisly

Use this recipe when the user asks Codex to publish a short-form video through Taisly.

## Preconditions

- `TAISLY_API_KEY` is set in the local environment.
- The video file exists locally.
- The user has connected social accounts in Taisly.

## Prompt Shape

```txt
Post ./launch.mp4 to my TikTok and YouTube Shorts accounts with this caption:
"New product update is live."
Ask me to confirm the destination accounts before publishing.
```

## Steps For Codex

1. Check authentication.

```bash
taisly auth:status
```

2. List connected accounts.

```bash
taisly platforms:list
```

3. Ask the user to confirm exact destination account IDs.

4. Create a payload file.

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1", "platform_id_2"],
  "description": "New product update is live."
}
```

5. Validate before posting.

```bash
taisly posts:validate --json ./campaign.json
```

6. Publish only after confirmation.

```bash
taisly posts:create --json ./campaign.json
```

7. Store and report the returned `historyId`.

```bash
taisly posts:status --id <historyId>
```

## Safety

- Do not invent platform IDs.
- Do not post to every connected account unless the user explicitly asks.
- Do not print `TAISLY_API_KEY`.
