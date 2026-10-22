export const POST_SETTINGS_SCHEMA = {
  type: "object",
  description: "Optional per-platform posting settings. All fields are optional; omitted values keep the existing posting behavior. These settings apply to every selected account on the corresponding platform.",
  properties: {
    TikTok: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "FOLLOWER_OF_CREATOR", "SELF_ONLY"],
          description: "TikTok visibility. Choose a value permitted by the creator's account. Branded content cannot use SELF_ONLY.",
        },
        comment_disabled: {
          type: "boolean",
          description: "true disables comments; false does not override the creator's account restrictions.",
        },
        duet_disabled: {
          type: "boolean",
          description: "true disables Duet; false does not override the creator's account restrictions.",
        },
        stitch_disabled: {
          type: "boolean",
          description: "true disables Stitch; false does not override the creator's account restrictions.",
        },
        brand_content_toggle: {
          type: "boolean",
          description: "true discloses a paid partnership promoting a third-party business. Cannot be combined with status SELF_ONLY.",
        },
        brand_organic_toggle: {
          type: "boolean",
          description: "true discloses promotion of the creator's own business. May be combined with brand_content_toggle.",
        },
        is_aigc: {
          type: "boolean",
          description: "Whether this video is AI-generated. Omit to keep the existing behavior.",
        },
      },
      additionalProperties: true,
    },
    YouTube: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Optional YouTube video title, up to 100 characters. Omit to use the post caption.",
        },
        status: {
          type: "string",
          enum: ["public", "private", "unlisted"],
          description: "YouTube video visibility.",
        },
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};

export function getPostSettingsSchema(platform) {
  return {
    ...POST_SETTINGS_SCHEMA,
    properties: { [platform]: POST_SETTINGS_SCHEMA.properties[platform] },
  };
}

export function parsePostSettings(value) {
  let settings = value === undefined ? {} : value;
  if (typeof settings === "string") {
    try {
      settings = JSON.parse(settings);
    } catch {
      throw new Error("settings must be a JSON object.");
    }
  }
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    throw new Error("settings must be a JSON object.");
  }
  for (const [platform, schema] of Object.entries(POST_SETTINGS_SCHEMA.properties)) {
    const options = settings[platform];
    if (options === undefined) continue;
    if (!options || typeof options !== "object" || Array.isArray(options)) {
      throw new Error(`settings.${platform} must be an object.`);
    }
    for (const [name, field] of Object.entries(schema.properties)) {
      const value = options[name];
      if (value === undefined) continue;
      if (typeof value !== field.type) {
        throw new Error(`settings.${platform}.${name} must be a ${field.type}.`);
      }
      if (field.enum && !field.enum.includes(value)) {
        throw new Error(`settings.${platform}.${name} must be one of: ${field.enum.join(", ")}.`);
      }
    }
  }
  if (settings.TikTok?.brand_content_toggle === true && settings.TikTok.status === "SELF_ONLY") {
    throw new Error("TikTok branded content cannot use status SELF_ONLY.");
  }
  return settings;
}
