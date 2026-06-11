![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit помогает агентам ИИ публиковать короткие видео в социальные сети. Это SDK и CLI с обменом данными через JSON: агент может отправить видео в TikTok, Instagram Reels, YouTube Shorts, X, Facebook и другие подключенные платформы через Taisly.

Используйте его, когда агент уже умеет готовить контент, писать текст для публикации или собирать кампанию, но ему нужен надежный API для реальной публикации видео.

[Taisly](https://taisly.com/ru) | [Agent Kit](https://taisly.com/ru/ai-agent-kit) | [Документация API](https://docs.taisly.com/ru/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Руководство](https://taisly.com/ru/blog/ai-agent-social-media-posting-api)

## Другие языки

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | **Русский** | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Быстрый старт

Установите пакет:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Аутентификация

Создайте API-ключ в настройках Taisly и задайте переменную окружения:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Получите список подключенных аккаунтов:

```bash
taisly auth:status
taisly platforms:list
```

Проверьте видео перед публикацией:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "День запуска. Короткое демо, большое обновление."
```

Опубликуйте пост и проверьте статус:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "День запуска. Короткое демо, большое обновление."
taisly posts:status --id <historyId>
```

## Процесс с JSON

Агент может подготовить файл с данными публикации:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "День запуска. Короткое демо, большое обновление.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Добавляйте публикацию в соцсети для агентов ИИ в Codex, Claude Code, Cursor, OpenClaw и собственные инструменты.
- Публикуйте одно локальное видео сразу в несколько подключенных аккаунтов.
- Используйте безопасный процесс: найти аккаунты, проверить данные, создать пост и получить статус.

## Ссылки

- Taisly: https://taisly.com/ru
- Agent Kit: https://taisly.com/ru/ai-agent-kit
- Документация API: https://docs.taisly.com/ru/docs
- Настройки Taisly: https://app.taisly.com/ru/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
