# Claude Code Recipe: Schedule A Video Post

Use this recipe when the user asks Claude Code to schedule a short-form video through Taisly.

## Prompt Shape

```txt
Schedule ./demo.mp4 for tomorrow at 9 AM Bangkok time on my Instagram Reels and TikTok accounts.
Caption: "A quick demo of what shipped today."
```

## Steps

1. Discover connected accounts.

```bash
taisly platforms:list
```

2. Inspect constraints for the target platforms.

```bash
taisly platforms:schema --platform TikTok
taisly platforms:schema --platform Instagram
```

3. Convert the requested time to an explicit ISO timestamp.

```json
{
  "video": "./demo.mp4",
  "platforms": ["instagram_platform_id", "tiktok_platform_id"],
  "description": "A quick demo of what shipped today.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

4. Validate and ask for confirmation.

```bash
taisly posts:validate --json ./campaign.json
```

5. Create the scheduled post after confirmation.

```bash
taisly posts:create --json ./campaign.json
```

6. Report the returned `historyId` and scheduled time.

## Safety

- Always show the exact destination account names/IDs before scheduling.
- Do not silently change timezone.
- If the date is ambiguous, ask the user before creating the post.
