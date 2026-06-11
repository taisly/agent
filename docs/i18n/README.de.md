![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit hilft KI-Agenten dabei, Kurzvideos in sozialen Netzwerken zu veröffentlichen. Es ist ein JSON-basiertes SDK mit CLI, mit dem Agenten Videos über Taisly auf TikTok, Instagram Reels, YouTube Shorts, X, Facebook und weiteren verbundenen Plattformen posten können.

Nutze es, wenn dein Agent Inhalte vorbereitet, Veröffentlichungstexte schreibt oder Kampagnen plant, aber noch eine zuverlässige API für die eigentliche Videoveröffentlichung braucht.

[Taisly](https://taisly.com/de) | [Agent Kit](https://taisly.com/de/ai-agent-kit) | [API-Dokumentation](https://docs.taisly.com/de/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Anleitung](https://taisly.com/de/blog/ai-agent-social-media-posting-api)

## Sprachen

[English](README.en.md) | [Español](README.es.md) | **Deutsch** | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Schnellstart

Installiere das Paket:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Authentifizierung

Erstelle einen API-Schlüssel in den Taisly-Einstellungen und setze:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Verbundene Social-Media-Konten auflisten:

```bash
taisly auth:status
taisly platforms:list
```

Video vor der Veröffentlichung prüfen:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Starttag. Kurze Vorführung, großes Update."
```

Beitrag veröffentlichen und Status prüfen:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Starttag. Kurze Vorführung, großes Update."
taisly posts:status --id <historyId>
```

## JSON-Ablauf

Der Agent kann eine Datei mit den Veröffentlichungsdaten vorbereiten:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Starttag. Kurze Vorführung, großes Update.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Ergänze Codex, Claude Code, Cursor, OpenClaw und eigene Werkzeuge um Social-Media-Veröffentlichung für KI-Agenten.
- Veröffentliche ein lokales Video auf mehreren verbundenen Konten.
- Nutze einen sicheren Ablauf: Konten finden, Daten prüfen, Beitrag erstellen und Status abrufen.

## Links

- Taisly: https://taisly.com/de
- Agent Kit: https://taisly.com/de/ai-agent-kit
- API-Dokumentation: https://docs.taisly.com/de/docs
- Taisly-Einstellungen: https://app.taisly.com/de/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
