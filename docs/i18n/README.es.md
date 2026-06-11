![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit ayuda a los agentes de IA a publicar videos cortos en redes sociales. Es un SDK y una CLI basada en JSON para publicar en TikTok, Instagram Reels, YouTube Shorts, X, Facebook y otras plataformas conectadas mediante Taisly.

Úsalo cuando tu agente ya puede preparar contenido, escribir el texto de la publicación o armar una campaña, pero aún necesita una API confiable para publicar el video.

[Taisly](https://taisly.com/es) | [Agent Kit](https://taisly.com/es/ai-agent-kit) | [Documentación API](https://docs.taisly.com/es/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Guía](https://taisly.com/es/blog/ai-agent-social-media-posting-api)

## Idiomas

[English](README.en.md) | **Español** | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Inicio rápido

Instala el paquete:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Autenticación

Crea una clave API en la configuración de Taisly y define:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Lista las cuentas sociales conectadas:

```bash
taisly auth:status
taisly platforms:list
```

Valida el video antes de publicarlo:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Día de lanzamiento. Demostración corta, gran actualización."
```

Publica el contenido y revisa su estado:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Día de lanzamiento. Demostración corta, gran actualización."
taisly posts:status --id <historyId>
```

## Flujo con JSON

El agente puede preparar un archivo con los datos de la publicación:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Día de lanzamiento. Demostración corta, gran actualización.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Agrega publicación en redes sociales para agentes de IA a Codex, Claude Code, Cursor, OpenClaw y herramientas propias.
- Publica un video local en varias cuentas conectadas.
- Usa un proceso seguro: encontrar cuentas, validar datos, crear la publicación y consultar el estado.

## Enlaces

- Taisly: https://taisly.com/es
- Agent Kit: https://taisly.com/es/ai-agent-kit
- Documentación API: https://docs.taisly.com/es/docs
- Configuración de Taisly: https://app.taisly.com/es/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
