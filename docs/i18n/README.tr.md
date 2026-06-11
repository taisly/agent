![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit, yapay zeka ajanlarının kısa videoları sosyal medyada yayınlamasına yardımcı olur. JSON tabanlı bir SDK ve komut satırı aracıdır; Taisly üzerinden TikTok, Instagram Reels, YouTube Shorts, X, Facebook ve bağlı diğer platformlara video gönderebilir.

Ajanınız içerik hazırlayabiliyor, paylaşım metni yazabiliyor veya kampanya planlayabiliyor; fakat videoyu gerçekten yayınlamak için güvenilir bir API'ye ihtiyaç duyuyorsa kullanın.

[Taisly](https://taisly.com/tr) | [Agent Kit](https://taisly.com/tr/ai-agent-kit) | [API dokümantasyonu](https://docs.taisly.com/tr/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [Rehber](https://taisly.com/tr/blog/ai-agent-social-media-posting-api)

## Diğer diller

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | **Türkçe** | [Polski](README.pl.md)

## Hızlı başlangıç

Paketi kurun:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## Kimlik doğrulama

Taisly ayarlarında bir API anahtarı oluşturun ve şunu ayarlayın:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

Bağlı sosyal hesapları listeleyin:

```bash
taisly auth:status
taisly platforms:list
```

Yayınlamadan önce videoyu denetleyin:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "Lansman günü. Kısa tanıtım, büyük güncelleme."
```

Paylaşımı yayınlayın ve durumunu kontrol edin:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "Lansman günü. Kısa tanıtım, büyük güncelleme."
taisly posts:status --id <historyId>
```

## JSON ile süreç

Ajan yayın verilerini içeren bir dosya hazırlayabilir:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "Lansman günü. Kısa tanıtım, büyük güncelleme.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- Codex, Claude Code, Cursor, OpenClaw ve kendi araçlarınıza yapay zeka ajanları için sosyal medya yayını ekleyin.
- Bir yerel videoyu birden fazla bağlı hesaba yayınlayın.
- Güvenli bir süreç kullanın: hesapları bul, verileri denetle, paylaşımı oluştur ve durumu al.

## Bağlantılar

- Taisly: https://taisly.com/tr
- Agent Kit: https://taisly.com/tr/ai-agent-kit
- API dokümantasyonu: https://docs.taisly.com/tr/docs
- Taisly ayarları: https://app.taisly.com/tr/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
