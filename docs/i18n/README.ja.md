![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kitは、AIエージェントがショート動画をソーシャルメディアへ投稿するためのツールです。JSONを使うSDKとコマンドラインツールで、Taisly経由でTikTok、Instagram Reels、YouTube Shorts、X、Facebook、その他の接続済みプラットフォームへ動画を投稿できます。

エージェントがコンテンツ作成、投稿文の作成、キャンペーン準備までできていて、実際の動画投稿に信頼できるAPIが必要なときに使います。

[Taisly](https://taisly.com/ja) | [Agent Kit](https://taisly.com/ja/ai-agent-kit) | [APIドキュメント](https://docs.taisly.com/ja/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [ガイド](https://taisly.com/ja/blog/ai-agent-social-media-posting-api)

## 他の言語

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | **日本語** | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## クイックスタート

パッケージをインストールします。

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## 認証

Taislyの設定でAPIキーを作成し、次を設定します。

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

接続済みソーシャルアカウントを表示します。

```bash
taisly auth:status
taisly platforms:list
```

投稿前に動画を確認します。

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "公開日。短いデモ、大きなアップデート。"
```

投稿を作成し、状態を確認します。

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "公開日。短いデモ、大きなアップデート。"
taisly posts:status --id <historyId>
```

## JSONを使った手順

エージェントは投稿データを含むファイルを準備できます。

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "公開日。短いデモ、大きなアップデート。",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Codex、Claude Code、Cursor、OpenClaw、独自ツールにAIエージェント向けのソーシャル投稿機能を追加できます。
- 1つのローカル動画を複数の接続済みアカウントへ投稿できます。
- 安全な手順を使います。アカウントを見つけ、データを確認し、投稿を作成して状態を取得します。

## リンク

- Taisly: https://taisly.com/ja
- Agent Kit: https://taisly.com/ja/ai-agent-kit
- APIドキュメント: https://docs.taisly.com/ja/docs
- Taisly設定: https://app.taisly.com/ja/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
