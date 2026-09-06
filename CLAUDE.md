@AGENTS.md

# วัฒน์จัดให้ — เว็บไซต์ One Page

เว็บไซต์แนะนำบริการรถยนต์/สินเชื่อ ภาษาไทย หน้าเดียว
**Static 100%** ไม่มี backend / database / API server — deploy บน GitHub Pages

- Live: <https://jakgapank2-bot.github.io/watpage/>
- Repo: `jakgapank2-bot/watpage` · branch `main` · deploy อัตโนมัติผ่าน GitHub Actions
- คู่มือสำหรับเจ้าของเว็บอยู่ที่ [README.md](README.md) (ภาษาไทย) — ไฟล์นี้เป็นบันทึกสำหรับ agent

## Stack

Next.js 16 (App Router, `output: "export"`) · TypeScript · Tailwind CSS 4 · lucide-react
sharp (ใช้เฉพาะระบบหลังบ้าน ไม่ถูกรวมในเว็บที่ deploy)

## คำสั่ง

```bash
npm run dev      # http://localhost:3000
npm run admin    # ระบบหลังบ้าน http://localhost:4000 (Node ล้วน ไม่เกี่ยวกับ Next)
npm run build    # static export ลง out/
npm run lint     # eslint — ต้องผ่านก่อน commit เสมอ
```

## สถาปัตยกรรม

```
content/*.json   ← เนื้อหาจริงทั้งหมด (แก้ผ่าน npm run admin หรือแก้ไฟล์ตรง ๆ)
data/*.ts        ← import JSON แล้วใส่ type เท่านั้น ห้ามเก็บเนื้อหาไว้ที่นี่
components/      ← UI ทั้งหมด อ่านค่าจาก data/
admin/           ← server.mjs + index.html (local-only CMS)
public/images/   ← ไฟล์รูป (.webp ทั้งหมด ยกเว้น og-image.png)
```

**หลักการ:** ข้อความหรือรูปที่เจ้าของเว็บอาจอยากแก้ ต้องอยู่ใน `content/*.json`
ไม่ hardcode ลงคอมโพเนนต์ ถ้าเพิ่มข้อความใหม่ในหน้าเว็บ ให้เพิ่มเข้า `content/site.json`
(ส่วนใหญ่อยู่ใต้ `sections`) แล้วเพิ่มช่องกรอกในหลังบ้านด้วย

## ข้อควรระวัง (เคยพลาดมาแล้ว)

**1. `next/image` + `unoptimized` ไม่เติม basePath ให้**
ต้องครอบ src ด้วย `asset()` จาก [`lib/asset.ts`](lib/asset.ts) ทุกครั้ง
ไม่งั้นรูปจะ 404 ตอน deploy ลง subfolder (`/watpage/`)

**2. `output: "export"` = ห้ามมี route handler / server action ใน `app/`**
ระบบหลังบ้านจึงเป็น Node server แยก (`admin/server.mjs`) ไม่ใช่ API route
ห้ามย้ายเข้ามาใน Next app เพราะ build จะพัง

**3. `og-image.png` ต้องเป็น .png เสมอ**
บางแพลตฟอร์มอ่าน WebP ตอนพรีวิวลิงก์ไม่ได้ — `convert-all` มีกฎข้ามไฟล์นี้ไว้แล้ว
และ metadata ใน `app/layout.tsx` ใช้ absolute URL (`site.url + path`) ไม่ใช่ basePath
เพราะเคยเกิด path ซ้ำ (`/watpage/watpage/...`)

**4. ภาพ Hero มีตัวหนังสือฝังมาในรูปแล้ว**
`components/Hero.tsx` จึงไม่วางข้อความ HTML ทับ (จะซ้อนกันจนอ่านไม่ออก)
มี `<h1 className="sr-only">` ไว้เพื่อ SEO แทน · แสดงภาพเต็มใบทุกขนาดจอ ห้ามครอป
ถ้าเปลี่ยนเป็นภาพที่ไม่มีตัวหนังสือ ค่อยย้ายข้อความกลับมาเป็น HTML

**5. อย่า hardcode สัดส่วนภาพ**
ให้อ่านจาก `width`/`height` ใน JSON เสมอ เจ้าของเว็บเปลี่ยนรูปเป็นสัดส่วนอื่นได้ตลอด

**6. หลังบ้านบันทึกแบบ merge ทีละคีย์ ไม่ใช่เขียนทับ**
`mergeContent()` ใน `admin/server.mjs` — กันกรณีเปิดหน้าหลังบ้านค้างไว้แล้วกดบันทึก
จะได้ไม่ลบฟิลด์ที่เพิ่งเพิ่มเข้ามาทีหลัง (array แทนที่ทั้งก้อน, object รวมทีละชั้น)
และ `data/images.ts` ใส่ค่า default ให้ทุกคีย์ กันเว็บพังถ้า JSON ไม่ครบ

**7. เพิ่มฟิลด์ใหม่ใน content ต้องแตะ 3 ที่**
`content/*.json` → `data/*.ts` (type) → `admin/index.html` (ช่องกรอก)

## Design system

โทน **น้ำตาล/ทอง luxury** — token อยู่ใน `app/globals.css` (`@theme`)
`brown-50..950`, `gold-300..600`, `cream-50..200`
utility ที่ทำเอง: `container-page`, `btn-primary`, `script-gold`, `no-scrollbar`

- ข้อความ UI และคอมเมนต์ในโค้ด **เป็นภาษาไทย**
- animation ใช้ `components/Reveal.tsx` (IntersectionObserver + CSS) ไม่ใช้ library
- เคารพ `prefers-reduced-motion` (มี guard ใน globals.css แล้ว)

## Deploy

`.github/workflows/deploy.yml` — trigger เมื่อ push เข้า `main`
basePath อ่านอัตโนมัติจาก `actions/configure-pages` **ไม่ต้อง hardcode ชื่อ repo**
เปลี่ยนชื่อ repo ได้โดยไม่ต้องแก้โค้ด (แก้แค่ `site.url` ใน `content/site.json`)

เงื่อนไขฝั่ง GitHub: repo ต้องเป็น **public** และ Settings → Pages → Source = **GitHub Actions**
อย่ากดปุ่ม *Configure* ที่การ์ด "Next.js" ในหน้านั้น จะได้ workflow ซ้อนกันแล้วตีกัน

## Workflow ของเจ้าของเว็บ

`npm run admin` → แก้/อัปรูป → กดบันทึก → **GitHub Desktop: Commit + Push** → เว็บอัปเดตใน ~2 นาที
เจ้าของเว็บ commit เองบ่อย ๆ — ก่อน commit ให้ `git status` ดูก่อนเสมอว่ามีงานของเขาคาอยู่ไหม

## หมายเหตุเรื่องการแก้ไฟล์

ไฟล์ในโปรเจกต์นี้มีภาษาไทยเยอะ การใช้ `sed`/`perl` บน Git Bash (Windows)
ทำ escape พังบ่อย (เคยกิน `\` ใน regex มาแล้ว) — ใช้ Edit/Write tool จะปลอดภัยกว่า

## สิ่งที่ยังเป็นข้อมูลตัวอย่าง

รูปผลงาน (portfolio) และเบอร์โทร `081-234-5678` ยังเป็นข้อมูลเดโม
อย่านำเสนอว่าเป็นข้อมูลจริง และเตือนเจ้าของเว็บให้เปลี่ยนก่อนเผยแพร่จริง
