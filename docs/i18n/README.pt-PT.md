![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

O Taisly Agent Kit ajuda agentes de IA a publicar vídeos curtos nas redes sociais. É um SDK e uma interface de linha de comandos baseada em JSON para publicar no TikTok, Instagram Reels, YouTube Shorts, X, Facebook e outras plataformas ligadas através da Taisly.

Use-o quando o agente já consegue preparar conteúdo, escrever o texto da publicação ou organizar uma campanha, mas ainda precisa de uma API fiável para publicar o vídeo.

[Taisly](https://taisly.com/pt-PT) | [Agent Kit](https://taisly.com/pt-PT/ai-agent-kit) | [Documentação da API](https://docs.taisly.com/pt-PT/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Guia](https://taisly.com/pt-PT/blog/ai-agent-social-media-posting-api)

## Idiomas

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | **Português** | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Início rápido

Instale o pacote:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Autenticação

Crie uma chave API nas definições da Taisly e configure:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Liste as contas sociais ligadas:

```bash
taisly auth:status
taisly platforms:list
```

Valide o vídeo antes de publicar:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Dia de lançamento. Demonstração curta, grande atualização."
```

Publique e verifique o estado:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Dia de lançamento. Demonstração curta, grande atualização."
taisly posts:status --id <historyId>
```

## Processo com JSON

O agente pode preparar um ficheiro com os dados da publicação:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Dia de lançamento. Demonstração curta, grande atualização.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Adicione publicação em redes sociais para agentes de IA ao Codex, Claude Code, Cursor, OpenClaw e ferramentas próprias.
- Publique um vídeo local em várias contas ligadas.
- Use um processo seguro: encontrar contas, validar dados, criar a publicação e consultar o estado.

## Ligações

- Taisly: https://taisly.com/pt-PT
- Agent Kit: https://taisly.com/pt-PT/ai-agent-kit
- Documentação da API: https://docs.taisly.com/pt-PT/docs
- Definições da Taisly: https://app.taisly.com/pt-PT/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
