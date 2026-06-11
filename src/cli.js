#!/usr/bin/env node
import { Taisly, TaislyError, readJsonFile } from "./index.js";

const client = new Taisly();
const [command, ...rawArgs] = process.argv.slice(2);
const args = parseArgs(rawArgs);

try {
  const result = await run(command, await loadJsonInput(args));
  printJson(result);
} catch (error) {
  if (error instanceof TaislyError) {
    printJson(error.toJSON());
    process.exitCode = 1;
  } else {
    printJson({
      success: false,
      code: "UNEXPECTED_ERROR",
      message: error?.message || "Unexpected error",
    });
    process.exitCode = 1;
  }
}

async function run(commandName, options) {
  switch (commandName) {
    case "auth:status":
      return client.auth.status();

    case "platforms:list":
    case "integrations:list":
      return client.platforms.list();

    case "platforms:schema":
    case "integrations:schema":
    case "integrations:settings":
      return client.platforms.schema(options.platform || options._[0]);

    case "posts:validate":
      return client.posts.validate({
        video: options.video,
        platforms: options.platforms || options.integrations,
        description: options.description || options.caption,
        scheduled: options.scheduled || options.at,
      });

    case "posts:create":
      return client.posts.create({
        video: options.video,
        platforms: options.platforms || options.integrations,
        description: options.description || options.caption,
        scheduled: options.scheduled || options.at,
        previewTime: options.previewTime || 0,
      });

    case "posts:list":
      return client.posts.list({
        page: options.page || 1,
        startTime: options.startTime,
        endTime: options.endTime,
      });

    case "posts:status":
      return client.posts.status(options.id || options._[0]);

    case "reposts:list":
      return client.reposts.list();

    case "reposts:create":
      return client.reposts.create({
        from: options.from,
        to: options.to,
      });

    case "help":
    case undefined:
      return help();

    default:
      throw new TaislyError(
        "UNKNOWN_COMMAND",
        `Unknown command: ${commandName}. Run taisly help.`,
      );
  }
}

function help() {
  return {
    success: true,
    commands: [
      "auth:status",
      "platforms:list",
      "integrations:list",
      "platforms:schema --platform TikTok",
      "posts:validate --video ./launch.mp4 --platforms <id,id> --description 'Launch day'",
      "posts:create --video ./launch.mp4 --platforms <id,id> --description 'Launch day' --scheduled 2026-06-14T09:00:00+07:00",
      "posts:create --json campaign.json",
      "posts:list --page 1",
      "posts:status --id <historyId>",
      "reposts:list",
      "reposts:create --from <platformId> --to <platformId,platformId>",
    ],
    env: ["TAISLY_API_KEY", "TAISLY_API_URL"],
    jsonInput:
      "Pass --json file.json or --input file.json to load command options from a JSON file.",
  };
}

async function loadJsonInput(options) {
  const filepath =
    options.input || (typeof options.json === "string" ? options.json : undefined);

  if (!filepath) return options;

  const fileOptions = await readJsonFile(filepath);

  return {
    ...options,
    ...fileOptions,
    _: options._,
  };
}

function parseArgs(values) {
  const parsed = { _: [] };

  for (let index = 0; index < values.length; index += 1) {
    const token = values[index];

    if (!token.startsWith("--")) {
      parsed._.push(token);
      continue;
    }

    const key = token.slice(2);
    const next = values[index + 1];

    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
}
