![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit은 AI 에이전트가 짧은 영상을 소셜 미디어에 게시하도록 돕는 도구입니다. JSON을 사용하는 SDK와 명령줄 도구이며, Taisly를 통해 TikTok, Instagram Reels, YouTube Shorts, X, Facebook 및 연결된 다른 플랫폼에 영상을 게시할 수 있습니다.

에이전트가 콘텐츠를 준비하고 게시 문구를 작성하고 캠페인을 구성할 수 있지만, 실제 영상 게시를 위한 안정적인 API가 필요할 때 사용하세요.

[Taisly](https://taisly.com/ko) | [Agent Kit](https://taisly.com/ko/ai-agent-kit) | [API 문서](https://docs.taisly.com/ko/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [가이드](https://taisly.com/ko/blog/ai-agent-social-media-posting-api)

## 다른 언어

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | **한국어** | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## 빠른 시작

패키지를 설치합니다.

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## 인증

Taisly 설정에서 API 키를 만들고 다음을 설정합니다.

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

연결된 소셜 계정을 조회합니다.

```bash
taisly auth:status
taisly platforms:list
```

게시 전에 영상을 확인합니다.

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "출시일. 짧은 데모, 큰 업데이트."
```

게시물을 만들고 상태를 확인합니다.

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "출시일. 짧은 데모, 큰 업데이트."
taisly posts:status --id <historyId>
```

## JSON을 사용하는 절차

에이전트는 게시 데이터를 담은 파일을 준비할 수 있습니다.

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "출시일. 짧은 데모, 큰 업데이트.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Codex, Claude Code, Cursor, OpenClaw 및 자체 도구에 AI 에이전트용 소셜 게시 기능을 추가하세요.
- 하나의 로컬 영상을 여러 연결 계정에 게시하세요.
- 안전한 절차를 사용하세요. 계정을 찾고, 데이터를 확인하고, 게시물을 만든 뒤 상태를 가져옵니다.

## 링크

- Taisly: https://taisly.com/ko
- Agent Kit: https://taisly.com/ko/ai-agent-kit
- API 문서: https://docs.taisly.com/ko/docs
- Taisly 설정: https://app.taisly.com/ko/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
