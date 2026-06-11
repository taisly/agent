![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

يساعد Taisly Agent Kit وكلاء الذكاء الاصطناعي على نشر الفيديوهات القصيرة في شبكات التواصل. وهو SDK وأداة سطر أوامر تعتمد على JSON لنشر الفيديو عبر Taisly إلى TikTok وInstagram Reels وYouTube Shorts وX وFacebook والمنصات المتصلة الأخرى.

استخدمه عندما يستطيع الوكيل تجهيز المحتوى وكتابة نص المنشور وتحضير الحملة، لكنه لا يزال يحتاج إلى API موثوق لنشر الفيديو فعليًا.

[Taisly](https://taisly.com/ar) | [Agent Kit](https://taisly.com/ar/ai-agent-kit) | [وثائق API](https://docs.taisly.com/ar/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [الدليل](https://taisly.com/ar/blog/ai-agent-social-media-posting-api)

## لغات أخرى

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | [ไทย](README.th.md) | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | **العربية** | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## بدء سريع

ثبّت الحزمة:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## المصادقة

أنشئ مفتاح API في إعدادات Taisly، ثم عرّف المتغير:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

اعرض الحسابات الاجتماعية المتصلة:

```bash
taisly auth:status
taisly platforms:list
```

تحقق من الفيديو قبل النشر:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "يوم الإطلاق. عرض قصير وتحديث كبير."
```

أنشئ المنشور وتحقق من حالته:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "يوم الإطلاق. عرض قصير وتحديث كبير."
taisly posts:status --id <historyId>
```

## عملية باستخدام JSON

يمكن للوكيل تجهيز ملف يحتوي على بيانات النشر:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "يوم الإطلاق. عرض قصير وتحديث كبير.",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- أضف النشر في شبكات التواصل لوكلاء الذكاء الاصطناعي إلى Codex وClaude Code وCursor وOpenClaw وأدواتك الخاصة.
- انشر فيديو محليًا واحدًا إلى عدة حسابات متصلة.
- استخدم عملية آمنة: العثور على الحسابات، التحقق من البيانات، إنشاء المنشور، ثم جلب الحالة.

## الروابط

- Taisly: https://taisly.com/ar
- Agent Kit: https://taisly.com/ar/ai-agent-kit
- وثائق API: https://docs.taisly.com/ar/docs
- إعدادات Taisly: https://app.taisly.com/ar/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
