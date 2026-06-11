# Cursor Recipe: Post A Build Demo Video

Use this recipe when a developer asks Cursor to publish a build/demo video after shipping a feature.

## Prompt Shape

```txt
Use Taisly to post ./assets/build-demo.mp4 to my connected X and YouTube Shorts accounts.
Use a short caption that mentions the feature shipped today.
```

## Steps

1. Check that Taisly credentials are available.

```bash
taisly auth:status
```

2. List connected accounts and choose the requested destinations.

```bash
taisly platforms:list
```

3. Create a JSON payload.

```json
{
  "video": "./assets/build-demo.mp4",
  "platforms": ["x_platform_id", "youtube_platform_id"],
  "description": "Shipped today: a faster workflow for publishing short-form videos."
}
```

4. Validate the payload.

```bash
taisly posts:validate --json ./campaign.json
```

5. Confirm with the developer before publishing.

6. Create the post.

```bash
taisly posts:create --json ./campaign.json
```

7. Save the returned `historyId` in the final response.

## Safety

- Do not use generated captions that imply unsupported product claims.
- Do not publish from a dirty build artifact unless the user confirms the exact file.
