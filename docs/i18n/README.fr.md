![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit aide les agents IA à publier des vidéos courtes sur les réseaux sociaux. C'est un SDK et une interface en ligne de commande basés sur JSON pour publier sur TikTok, Instagram Reels, YouTube Shorts, X, Facebook et d'autres plateformes connectées via Taisly.

Utilisez-le quand votre agent sait déjà préparer du contenu, rédiger le texte d'une publication ou organiser une campagne, mais a encore besoin d'une API fiable pour publier la vidéo.

[Taisly](https://taisly.com/fr) | [Agent Kit](https://taisly.com/fr/ai-agent-kit) | [Documentation API](https://docs.taisly.com/fr/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Guide](https://taisly.com/fr/blog/ai-agent-social-media-posting-api)

## Langues

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | **Français** | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Démarrage rapide

Installez le paquet :

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Authentification

Créez une clé API dans les paramètres Taisly, puis définissez :

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Listez les comptes sociaux connectés :

```bash
taisly auth:status
taisly platforms:list
```

Vérifiez la vidéo avant publication :

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Jour de lancement. Courte démo, grande mise à jour."
```

Publiez le contenu et vérifiez son statut :

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Jour de lancement. Courte démo, grande mise à jour."
taisly posts:status --id <historyId>
```

## Parcours avec JSON

L'agent peut préparer un fichier contenant les données de publication :

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Jour de lancement. Courte démo, grande mise à jour.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Ajoutez la publication sur les réseaux sociaux pour agents IA à Codex, Claude Code, Cursor, OpenClaw et vos outils internes.
- Publiez une vidéo locale vers plusieurs comptes connectés.
- Utilisez un processus sûr : trouver les comptes, vérifier les données, créer la publication et consulter le statut.

## Liens

- Taisly: https://taisly.com/fr
- Agent Kit: https://taisly.com/fr/ai-agent-kit
- Documentation API: https://docs.taisly.com/fr/docs
- Paramètres Taisly: https://app.taisly.com/fr/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
