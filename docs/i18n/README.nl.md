![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit helpt AI-agenten korte video's op sociale media te publiceren. Het is een SDK en opdrachtregelprogramma op basis van JSON voor publicatie naar TikTok, Instagram Reels, YouTube Shorts, X, Facebook en andere gekoppelde platforms via Taisly.

Gebruik het wanneer je agent al inhoud kan voorbereiden, publicatietekst kan schrijven of een campagne kan opzetten, maar nog een betrouwbare API nodig heeft om de video echt te publiceren.

[Taisly](https://taisly.com/nl) | [Agent Kit](https://taisly.com/nl/ai-agent-kit) | [API-documentatie](https://docs.taisly.com/nl/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Gids](https://taisly.com/nl/blog/ai-agent-social-media-posting-api)

## Talen

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | **Nederlands** | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Snel starten

Installeer het pakket:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Authenticatie

Maak een API-sleutel aan in de Taisly-instellingen en stel deze variabele in:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Toon de gekoppelde sociale accounts:

```bash
taisly auth:status
taisly platforms:list
```

Controleer de video voor publicatie:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Lanceringsdag. Korte demonstratie, grote update."
```

Publiceer en controleer de status:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Lanceringsdag. Korte demonstratie, grote update."
taisly posts:status --id <historyId>
```

## Proces met JSON

De agent kan een bestand met publicatiegegevens voorbereiden:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Lanceringsdag. Korte demonstratie, grote update.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Voeg publicatie op sociale media voor AI-agenten toe aan Codex, Claude Code, Cursor, OpenClaw en eigen hulpmiddelen.
- Publiceer een lokale video naar meerdere gekoppelde accounts.
- Gebruik een veilig proces: accounts vinden, gegevens controleren, de publicatie maken en de status opvragen.

## Links

- Taisly: https://taisly.com/nl
- Agent Kit: https://taisly.com/nl/ai-agent-kit
- API-documentatie: https://docs.taisly.com/nl/docs
- Taisly-instellingen: https://app.taisly.com/nl/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
