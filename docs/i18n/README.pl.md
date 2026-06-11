![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit pomaga agentom AI publikować krótkie filmy w mediach społecznościowych. To SDK i narzędzie wiersza poleceń oparte na JSON, które pozwala publikować przez Taisly na TikToku, Instagram Reels, YouTube Shorts, X, Facebooku i innych połączonych platformach.

Użyj go, gdy agent potrafi już przygotować treść, napisać opis publikacji lub ułożyć kampanię, ale nadal potrzebuje niezawodnego API do faktycznej publikacji wideo.

[Taisly](https://taisly.com/pl) | [Agent Kit](https://taisly.com/pl/ai-agent-kit) | [Dokumentacja API](https://docs.taisly.com/pl/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Poradnik](https://taisly.com/pl/blog/ai-agent-social-media-posting-api)

## Inne języki

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | **Polski**

## Szybki start

Zainstaluj pakiet:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Autoryzacja

Utwórz klucz API w ustawieniach Taisly, a potem ustaw:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Wyświetl połączone konta społecznościowe:

```bash
taisly auth:status
taisly platforms:list
```

Sprawdź film przed publikacją:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Dzień premiery. Krótka prezentacja, duża aktualizacja."
```

Opublikuj treść i sprawdź status:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Dzień premiery. Krótka prezentacja, duża aktualizacja."
taisly posts:status --id <historyId>
```

## Proces z JSON

Agent może przygotować plik z danymi publikacji:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Dzień premiery. Krótka prezentacja, duża aktualizacja.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Dodaj publikowanie w mediach społecznościowych dla agentów AI do Codex, Claude Code, Cursor, OpenClaw i własnych narzędzi.
- Publikuj jeden lokalny film na kilku połączonych kontach.
- Korzystaj z bezpiecznego procesu: znajdź konta, sprawdź dane, utwórz publikację i pobierz status.

## Linki

- Taisly: https://taisly.com/pl
- Agent Kit: https://taisly.com/pl/ai-agent-kit
- Dokumentacja API: https://docs.taisly.com/pl/docs
- Ustawienia Taisly: https://app.taisly.com/pl/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
