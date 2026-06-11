![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit membantu agen AI menerbitkan video pendek ke media sosial. Ini adalah SDK dan alat baris perintah berbasis JSON untuk menerbitkan video ke TikTok, Instagram Reels, YouTube Shorts, X, Facebook, dan platform terhubung lain melalui Taisly.

Gunakan ketika agen Anda sudah bisa menyiapkan konten, menulis teks publikasi, atau menyusun kampanye, tetapi masih membutuhkan API yang andal untuk benar-benar menerbitkan video.

[Taisly](https://taisly.com/id) | [Agent Kit](https://taisly.com/id/ai-agent-kit) | [Dokumentasi API](https://docs.taisly.com/id/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Panduan](https://taisly.com/id/blog/ai-agent-social-media-posting-api)

## Bahasa lain

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | **Bahasa Indonesia** | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## Mulai cepat

Instal paket:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Autentikasi

Buat kunci API di pengaturan Taisly, lalu atur:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Tampilkan akun sosial yang terhubung:

```bash
taisly auth:status
taisly platforms:list
```

Periksa video sebelum diterbitkan:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Hari peluncuran. Peragaan singkat, pembaruan besar."
```

Terbitkan publikasi dan periksa statusnya:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Hari peluncuran. Peragaan singkat, pembaruan besar."
taisly posts:status --id <historyId>
```

## Proses dengan JSON

Agen dapat menyiapkan file berisi data publikasi:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Hari peluncuran. Peragaan singkat, pembaruan besar.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Tambahkan publikasi media sosial untuk agen AI ke Codex, Claude Code, Cursor, OpenClaw, dan alat buatan sendiri.
- Terbitkan satu video lokal ke beberapa akun terhubung.
- Gunakan proses aman: temukan akun, periksa data, buat publikasi, dan ambil status.

## Tautan

- Taisly: https://taisly.com/id
- Agent Kit: https://taisly.com/id/ai-agent-kit
- Dokumentasi API: https://docs.taisly.com/id/docs
- Pengaturan Taisly: https://app.taisly.com/id/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
