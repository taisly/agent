import { readFile, stat } from "node:fs/promises";
import path from "node:path";

export const DEFAULT_API_URL = "https://app.taisly.com/api/private";
const DEFAULT_HISTORY_PAGE = 1;
const VIDEO_MIME_BY_EXTENSION = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".webm": "video/webm",
  ".flv": "video/x-flv",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
};
const SUPPORTED_VIDEO_EXTENSIONS = Object.keys(VIDEO_MIME_BY_EXTENSION);

export class Taisly {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.TAISLY_API_KEY;
    this.apiUrl = normalizeApiUrl(options.apiUrl || process.env.TAISLY_API_URL);
  }

  requireApiKey() {
    if (!this.apiKey) {
      throw new TaislyError(
        "TAISLY_API_KEY_MISSING",
        "Set TAISLY_API_KEY or pass apiKey to the Taisly client.",
      );
    }
  }

  async request(pathname, options = {}) {
    this.requireApiKey();

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      ...(options.headers || {}),
    };

    const response = await fetch(`${this.apiUrl}${pathname}`, {
      ...options,
      headers,
    });
    const text = await response.text();
    const data = parseJson(text);

    if (!response.ok || data?.success === false) {
      throw new TaislyError(
        data?.message || `HTTP_${response.status}`,
        data?.error || response.statusText || "Taisly request failed",
        data,
      );
    }

    return data;
  }

  auth = {
    status: async () => {
      const response = await this.request("/platform/platforms");
      return {
        success: true,
        authenticated: true,
        platformCount: response.data?.length || 0,
      };
    },
  };

  platforms = {
    list: async () => {
      const response = await this.request("/platform/platforms");
      return {
        success: true,
        count: response.data?.length || 0,
        data: normalizePlatforms(response.data || []),
      };
    },

    schema: async (platform) => ({
      success: true,
      data: getPlatformSchema(platform),
    }),
  };

  posts = {
    validate: async ({ video, platforms, description, scheduled }) => {
      if (!video) throw new TaislyError("VIDEO_REQUIRED", "Pass --video.");
      if (!description) {
        throw new TaislyError("DESCRIPTION_REQUIRED", "Pass --description.");
      }

      const platformIds = normalizePlatformIds(platforms);
      if (platformIds.length === 0) {
        throw new TaislyError("PLATFORMS_REQUIRED", "Pass at least one platform id.");
      }

      const fileInfo = await stat(video);
      if (!fileInfo.isFile()) {
        throw new TaislyError("VIDEO_NOT_FILE", "Video path must point to a file.");
      }

      const extension = path.extname(video).toLowerCase();
      if (!SUPPORTED_VIDEO_EXTENSIONS.includes(extension)) {
        throw new TaislyError(
          "UNSUPPORTED_VIDEO_EXTENSION",
          `Use one of these video extensions: ${SUPPORTED_VIDEO_EXTENSIONS.join(", ")}.`,
          { extension },
        );
      }

      return {
        success: true,
        data: {
          video,
          filename: path.basename(video),
          sizeBytes: fileInfo.size,
          sizeMb: Number((fileInfo.size / 1024 / 1024).toFixed(2)),
          platforms: platformIds,
          descriptionLength: description.length,
          scheduled: scheduled ? normalizeScheduled(scheduled) : null,
        },
      };
    },

    create: async ({ video, platforms, description, scheduled, previewTime = 0 }) => {
      const validation = await this.posts.validate({
        video,
        platforms,
        description,
        scheduled,
      });
      const platformIds = validation.data.platforms;

      const form = new FormData();
      const bytes = await readFile(video);
      const filename = path.basename(video);
      const mimeType = getVideoMimeType(video);
      form.append("video", new Blob([bytes], { type: mimeType }), filename);
      form.append("platforms", JSON.stringify(platformIds));
      form.append("description", description);
      form.append("previewTime", String(previewTime));

      if (scheduled) {
        form.append("scheduled", normalizeScheduled(scheduled));
      }

      const response = await this.request("/post", {
        method: "POST",
        body: form,
      });

      return normalizePostCreateResponse(response);
    },

    status: async (historyId) => {
      if (!historyId) throw new TaislyError("POST_ID_REQUIRED", "Pass a post id.");

      const response = await this.request("/post/history?page=1");
      const post = (response.data || []).find((item) => item.id === historyId);

      if (!post) {
        throw new TaislyError(
          "POST_NOT_FOUND_IN_RECENT_HISTORY",
          "Taisly does not expose a single-post status endpoint yet; recent history did not include this id.",
          { historyId },
        );
      }

      return {
        success: true,
        data: post,
      };
    },

    list: async ({ page = DEFAULT_HISTORY_PAGE, startTime, endTime } = {}) => {
      const params = new URLSearchParams({ page: String(page) });

      if (startTime) params.set("startTime", String(startTime));
      if (endTime) params.set("endTime", String(endTime));

      const response = await this.request(`/post/history?${params.toString()}`);
      return {
        success: true,
        page: Number(page),
        count: response.data?.length || 0,
        data: response.data || [],
      };
    },
  };

  reposts = {
    create: async ({ from, to }) => {
      if (!from) throw new TaislyError("REPOST_FROM_REQUIRED", "Pass --from.");
      const toList = normalizePlatformIds(to);
      if (toList.length === 0) {
        throw new TaislyError("REPOST_TO_REQUIRED", "Pass at least one destination.");
      }

      return this.request("/repost/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: toList }),
      });
    },

    list: async () => {
      const response = await this.request("/reposts");
      return {
        success: true,
        data: response.data || [],
      };
    },
  };
}

export class TaislyError extends Error {
  constructor(code, message, details) {
    super(message);
    this.name = "TaislyError";
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      success: false,
      code: this.code,
      message: this.message,
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

export function getPlatformSchema(platform) {
  const normalized = String(platform || "").toLowerCase();
  const base = {
    platform: platform || "video",
    media: {
      type: "video",
      maxSizeMb: 500,
      recommendedDurationSeconds: { min: 3, max: 90 },
      recommendedAspectRatio: "9:16",
      recommendedMinResolution: "540x960",
    },
    fields: {
      description: {
        type: "string",
        required: true,
        maxLength: normalized === "x" ? 100 : 2200,
      },
      scheduled: {
        type: "unix_ms_or_iso_datetime",
        required: false,
      },
    },
  };

  if (normalized === "youtube" || normalized === "youtube shorts") {
    return {
      ...base,
      platform: "YouTube",
      notes: ["Use vertical videos for Shorts-style distribution."],
    };
  }

  if (normalized === "tiktok") {
    return {
      ...base,
      platform: "TikTok",
      notes: ["Keep captions concise and validate commercial/music rights."],
    };
  }

  if (normalized === "instagram") {
    return {
      ...base,
      platform: "Instagram",
      notes: ["Use 9:16 video for Reels."],
    };
  }

  return base;
}

export async function readJsonFile(filepath) {
  const content = await readFile(filepath, "utf8");
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new TaislyError(
      "INVALID_JSON_FILE",
      `Could not parse JSON file: ${filepath}`,
      { cause: error.message },
    );
  }
}

export function normalizePlatformIds(platforms) {
  if (!platforms) return [];
  if (Array.isArray(platforms)) return platforms.filter(Boolean);
  return String(platforms)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeScheduled(value) {
  if (!value) return "";
  if (/^\d+$/.test(String(value))) return String(value);

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TaislyError(
      "INVALID_SCHEDULED_DATE",
      "Use an ISO date or Unix timestamp in milliseconds.",
    );
  }

  return String(date.getTime());
}

function normalizePlatforms(platforms) {
  return platforms.map((platform) => ({
    ...platform,
    id: String(platform.id || platform._id || ""),
    platform: platform.platform || platform.identifier,
  }));
}

function normalizePostCreateResponse(response) {
  const historyId = response.historyId || response.id || response.data?.id;

  return {
    success: true,
    historyId: historyId ? String(historyId) : undefined,
    scheduled: Boolean(response.scheduled),
    date: response.date,
    result: response.result || [],
    raw: response,
  };
}

function getVideoMimeType(video) {
  return VIDEO_MIME_BY_EXTENSION[path.extname(video).toLowerCase()];
}

function parseJson(text) {
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch (_) {
    return { success: false, message: "INVALID_JSON_RESPONSE", raw: text };
  }
}

function normalizeApiUrl(value) {
  return (value || DEFAULT_API_URL).replace(/\/$/, "");
}
