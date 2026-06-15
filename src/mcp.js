import { createInterface } from "node:readline";
import { Taisly, TaislyError } from "./index.js";

const PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED_PROTOCOL_VERSIONS = new Set([
  "2025-06-18",
  "2025-03-26",
  "2024-11-05",
]);
const SERVER_NAME = "taisly-agent-kit";
const SERVER_TITLE = "Taisly Agent Kit";
const SERVER_VERSION = "0.2.0";

const JSON_OBJECT_SCHEMA = {
  type: "object",
  additionalProperties: true,
};

const TOOLS = [
  {
    name: "taisly_auth_status",
    title: "Taisly Auth Status",
    description: "Check whether the Taisly API key is valid and count connected social accounts.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "taisly_platforms_list",
    title: "List Taisly Platforms",
    description: "List connected TikTok, Instagram, YouTube, X, Facebook, and other social accounts available to this API key.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "taisly_platform_schema",
    title: "Get Platform Posting Schema",
    description: "Get local posting constraints for a destination platform before validating or creating a post.",
    inputSchema: {
      type: "object",
      properties: {
        platform: {
          type: "string",
          description: "Platform name, for example TikTok, Instagram, YouTube, X, or Facebook.",
        },
      },
      required: ["platform"],
      additionalProperties: false,
    },
  },
  {
    name: "taisly_posts_validate",
    title: "Validate Taisly Post",
    description: "Validate a local video path, destination platform IDs, caption, and optional schedule before publishing.",
    inputSchema: {
      type: "object",
      properties: {
        video: {
          type: "string",
          description: "Local video path available to the agent.",
        },
        platforms: {
          oneOf: [
            { type: "array", items: { type: "string" } },
            { type: "string" },
          ],
          description: "Destination platform IDs from taisly_platforms_list.",
        },
        description: {
          type: "string",
          description: "Post caption or description.",
        },
        scheduled: {
          type: "string",
          description: "Optional ISO datetime or Unix timestamp in milliseconds.",
        },
      },
      required: ["video", "platforms", "description"],
      additionalProperties: false,
    },
  },
  {
    name: "taisly_posts_create",
    title: "Create Taisly Post",
    description: "Publish or schedule a video post through Taisly after the user explicitly confirms the media, destinations, caption, and schedule.",
    inputSchema: {
      type: "object",
      properties: {
        video: {
          type: "string",
          description: "Local video path available to the agent.",
        },
        platforms: {
          oneOf: [
            { type: "array", items: { type: "string" } },
            { type: "string" },
          ],
          description: "Destination platform IDs from taisly_platforms_list.",
        },
        description: {
          type: "string",
          description: "Post caption or description.",
        },
        scheduled: {
          type: "string",
          description: "Optional ISO datetime or Unix timestamp in milliseconds.",
        },
        previewTime: {
          type: "number",
          description: "Optional preview timestamp used by the Taisly posting API.",
        },
        confirmed: {
          type: "boolean",
          description: "Must be true only after explicit user confirmation.",
        },
      },
      required: ["video", "platforms", "description", "confirmed"],
      additionalProperties: false,
    },
  },
  {
    name: "taisly_posts_status",
    title: "Get Taisly Post Status",
    description: "Fetch recent-history status for a Taisly post by historyId.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Taisly historyId returned by taisly_posts_create.",
        },
        historyId: {
          type: "string",
          description: "Alias for id.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "taisly_posts_list",
    title: "List Taisly Posts",
    description: "List recent Taisly post history for status checks and audits.",
    inputSchema: {
      type: "object",
      properties: {
        page: {
          type: "number",
          description: "History page number. Defaults to 1.",
        },
        startTime: {
          type: "string",
          description: "Optional start timestamp filter.",
        },
        endTime: {
          type: "string",
          description: "Optional end timestamp filter.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "taisly_reposts_list",
    title: "List Taisly Reposts",
    description: "List configured repost automations for connected social accounts.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "taisly_reposts_create",
    title: "Create Taisly Repost",
    description: "Create a repost automation from one connected account to one or more destination accounts.",
    inputSchema: {
      type: "object",
      properties: {
        from: {
          type: "string",
          description: "Source platform ID.",
        },
        to: {
          oneOf: [
            { type: "array", items: { type: "string" } },
            { type: "string" },
          ],
          description: "Destination platform IDs.",
        },
      },
      required: ["from", "to"],
      additionalProperties: false,
    },
  },
];

const TOOL_HANDLERS = {
  taisly_auth_status: (client) => client.auth.status(),
  taisly_platforms_list: (client) => client.platforms.list(),
  taisly_platform_schema: (client, args) => client.platforms.schema(args.platform),
  taisly_posts_validate: (client, args) =>
    client.posts.validate({
      video: args.video,
      platforms: args.platforms,
      description: args.description,
      scheduled: args.scheduled,
    }),
  taisly_posts_create: (client, args) => {
    if (args.confirmed !== true) {
      throw new TaislyError(
        "CONFIRMATION_REQUIRED",
        "Set confirmed to true only after the user explicitly approves the video, destination accounts, caption, and schedule.",
        { required: { confirmed: true } },
      );
    }

    return client.posts.create({
      video: args.video,
      platforms: args.platforms,
      description: args.description,
      scheduled: args.scheduled,
      previewTime: args.previewTime || 0,
    });
  },
  taisly_posts_status: (client, args) => client.posts.status(args.id || args.historyId),
  taisly_posts_list: (client, args) =>
    client.posts.list({
      page: args.page || 1,
      startTime: args.startTime,
      endTime: args.endTime,
    }),
  taisly_reposts_list: (client) => client.reposts.list(),
  taisly_reposts_create: (client, args) =>
    client.reposts.create({
      from: args.from,
      to: args.to,
    }),
};

export async function startMcpServer(options = {}) {
  const server = new TaislyMcpServer(options);
  await server.start();
}

class TaislyMcpServer {
  constructor({
    client = new Taisly(),
    input = process.stdin,
    output = process.stdout,
    error = process.stderr,
  } = {}) {
    this.client = client;
    this.input = input;
    this.output = output;
    this.error = error;
  }

  async start() {
    const lines = createInterface({
      input: this.input,
      crlfDelay: Infinity,
    });

    for await (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      try {
        const message = JSON.parse(line);
        await this.handleMessage(message);
      } catch (error) {
        this.sendError(null, -32700, "Parse error", error?.message);
      }
    }
  }

  async handleMessage(message) {
    if (Array.isArray(message)) {
      await Promise.all(message.map((item) => this.handleMessage(item)));
      return;
    }

    if (!message || typeof message !== "object" || message.jsonrpc !== "2.0") {
      this.sendError(null, -32600, "Invalid Request");
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(message, "id")) {
      this.handleNotification(message);
      return;
    }

    try {
      const result = await this.handleRequest(message.method, message.params || {});
      this.send({ jsonrpc: "2.0", id: message.id, result });
    } catch (error) {
      this.sendError(
        message.id,
        error?.code || -32603,
        error?.message || "Internal error",
        error?.data,
      );
    }
  }

  handleNotification(message) {
    if (message.method === "notifications/initialized") return;
    if (message.method === "notifications/cancelled") return;
    this.error.write(`Taisly MCP ignored notification: ${message.method}\n`);
  }

  async handleRequest(method, params) {
    switch (method) {
      case "initialize":
        return this.initialize(params);
      case "ping":
        return {};
      case "tools/list":
        return { tools: TOOLS };
      case "tools/call":
        return this.callTool(params);
      default:
        throw {
          code: -32601,
          message: `Method not found: ${method}`,
        };
    }
  }

  initialize(params) {
    return {
      protocolVersion: negotiateProtocolVersion(params.protocolVersion),
      capabilities: {
        tools: {
          listChanged: false,
        },
      },
      serverInfo: {
        name: SERVER_NAME,
        title: SERVER_TITLE,
        version: SERVER_VERSION,
      },
      instructions:
        "Use Taisly tools to discover connected social accounts, validate posts, ask for explicit user confirmation, then create and monitor posts.",
    };
  }

  async callTool(params) {
    const name = params.name;
    const args = normalizeArguments(params.arguments);
    const handler = TOOL_HANDLERS[name];

    if (!handler) {
      throw {
        code: -32602,
        message: `Unknown tool: ${name}`,
      };
    }

    try {
      const data = await handler(this.client, args);
      return toolResult(data);
    } catch (error) {
      return toolError(error);
    }
  }

  send(message) {
    this.output.write(`${JSON.stringify(message)}\n`);
  }

  sendError(id, code, message, data) {
    this.send({
      jsonrpc: "2.0",
      id,
      error: {
        code,
        message,
        ...(data ? { data } : {}),
      },
    });
  }
}

function negotiateProtocolVersion(requestedVersion) {
  if (SUPPORTED_PROTOCOL_VERSIONS.has(requestedVersion)) {
    return requestedVersion;
  }

  return PROTOCOL_VERSION;
}

function normalizeArguments(args) {
  if (!args || typeof args !== "object" || Array.isArray(args)) {
    return {};
  }

  return args;
}

function toolResult(data) {
  const structuredContent = toStructuredContent(data);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(structuredContent, null, 2),
      },
    ],
    structuredContent,
    isError: false,
  };
}

function toolError(error) {
  const data =
    error instanceof TaislyError
      ? error.toJSON()
      : {
          success: false,
          code: "UNEXPECTED_ERROR",
          message: error?.message || "Unexpected error",
        };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: toStructuredContent(data),
    isError: true,
  };
}

function toStructuredContent(data) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data;
  }

  return {
    success: true,
    data,
  };
}

export const mcp = {
  protocolVersion: PROTOCOL_VERSION,
  serverName: SERVER_NAME,
  tools: TOOLS,
  outputSchema: JSON_OBJECT_SCHEMA,
};
