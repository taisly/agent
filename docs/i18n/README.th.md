![Taisly Agent Kit](../../assets/taisly-agent-banner.jpg)

# Taisly Agent Kit

Taisly Agent Kit ช่วยให้เอเจนต์ AI โพสต์วิดีโอสั้นลงโซเชียลมีเดียได้ เป็น SDK และเครื่องมือบรรทัดคำสั่งที่ใช้ JSON เพื่อโพสต์วิดีโอผ่าน Taisly ไปยัง TikTok, Instagram Reels, YouTube Shorts, X, Facebook และแพลตฟอร์มอื่นที่เชื่อมต่อไว้

ใช้เมื่อตัวเอเจนต์เตรียมคอนเทนต์ เขียนข้อความโพสต์ หรือจัดแคมเปญได้แล้ว แต่ยังต้องการ API ที่เชื่อถือได้สำหรับการเผยแพร่วิดีโอจริง

[Taisly](https://taisly.com/th) | [Agent Kit](https://taisly.com/th/ai-agent-kit) | [เอกสาร API](https://docs.taisly.com/th/docs) | [npm](https://www.npmjs.com/package/@taisly/agent) | [GitHub](https://github.com/taisly/agent) | [คู่มือ](https://taisly.com/th/blog/ai-agent-social-media-posting-api)

## ภาษาอื่น

[English](README.en.md) | [Español](README.es.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Português](README.pt-PT.md) | **ไทย** | [中文](README.zh-CN.md) | [Bahasa Indonesia](README.id.md) | [Русский](README.ru.md) | [Nederlands](README.nl.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [العربية](README.ar.md) | [Türkçe](README.tr.md) | [Polski](README.pl.md)

## เริ่มต้นอย่างรวดเร็ว

ติดตั้งแพ็กเกจ:

```bash
npm install -g @taisly/agent
npx @taisly/agent help
```

## การยืนยันตัวตน

สร้าง API key ในการตั้งค่า Taisly แล้วกำหนดค่า:

```bash
export TAISLY_API_KEY="taisly_..."
export TAISLY_API_URL="https://app.taisly.com/api/private"
```

ดูบัญชีโซเชียลที่เชื่อมต่อ:

```bash
taisly auth:status
taisly platforms:list
```

ตรวจสอบวิดีโอก่อนโพสต์:

```bash
taisly posts:validate --video ./launch.mp4 --platforms platform_id_1 --description "วันเปิดตัว เดโมสั้น อัปเดตใหญ่"
```

สร้างโพสต์และตรวจสอบสถานะ:

```bash
taisly posts:create --video ./launch.mp4 --platforms platform_id_1 --description "วันเปิดตัว เดโมสั้น อัปเดตใหญ่"
taisly posts:status --id <historyId>
```

## ขั้นตอนด้วย JSON

เอเจนต์สามารถเตรียมไฟล์ข้อมูลสำหรับการโพสต์ได้:

```json
{
  "video": "./launch.mp4",
  "platforms": ["platform_id_1"],
  "description": "วันเปิดตัว เดโมสั้น อัปเดตใหญ่",
  "scheduled": "2026-06-14T09:00:00+07:00"
}
```

- เพิ่มความสามารถในการโพสต์โซเชียลสำหรับเอเจนต์ AI ให้กับ Codex, Claude Code, Cursor, OpenClaw และเครื่องมือของคุณ
- โพสต์วิดีโอจากไฟล์ในเครื่องไปยังหลายบัญชีที่เชื่อมต่อไว้
- ใช้ขั้นตอนที่ปลอดภัย: ค้นหาบัญชี ตรวจสอบข้อมูล สร้างโพสต์ และดึงสถานะ

## ลิงก์

- Taisly: https://taisly.com/th
- Agent Kit: https://taisly.com/th/ai-agent-kit
- เอกสาร API: https://docs.taisly.com/th/docs
- การตั้งค่า Taisly: https://app.taisly.com/th/settings
- npm: https://www.npmjs.com/package/@taisly/agent
- GitHub: https://github.com/taisly/agent
