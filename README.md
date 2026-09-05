# วัฒน์จัดให้ — เว็บไซต์ One Page

เว็บไซต์แนะนำบริการ **“วัฒน์จัดให้”** — เรื่องรถ เรื่องเงิน ให้เป็นเรื่องง่าย
สร้างด้วย **Next.js + TypeScript + Tailwind CSS** เป็น **Static Website 100%**
ไม่มี Backend / Database / API Server พร้อม Deploy ขึ้น GitHub Pages ได้ทันที

🌐 เว็บจริง: <https://jakgapank2-bot.github.io/watpage/>

## โครงสร้างหน้าเว็บ

```
NAVBAR → HERO → SERVICES → PORTFOLIO (ผลงาน) → ABOUT US
       → PROCESS → CTA → FOOTER (รวมข้อมูลติดต่อ)
```

---

## 1. วิธีติดตั้ง

ต้องมี [Node.js](https://nodejs.org/) เวอร์ชัน 20 ขึ้นไป

```bash
npm install
```

---

## 2. คำสั่งที่ใช้บ่อย

```bash
npm run admin   # 🛠️ เปิดระบบหลังบ้านแก้เนื้อหา  → http://localhost:4000
npm run dev     # 👀 ดูเว็บระหว่างแก้ (อัปเดตทันที) → http://localhost:3000
npm run build   # สร้างเว็บไซต์ static ลงในโฟลเดอร์ out/
npm run lint    # ตรวจสอบคุณภาพโค้ด
```

> เปิด `npm run admin` กับ `npm run dev` พร้อมกันได้ แก้ในหลังบ้านแล้วเห็นผลทันทีที่หน้าเว็บ

---

## 3. 🛠️ ระบบหลังบ้าน (แก้ข้อความและรูป)

```bash
npm run admin
```

เปิด <http://localhost:4000> แล้วแก้ได้ทุกส่วนของหน้าเว็บ แบ่งเป็นแท็บ

| แท็บ | แก้อะไรได้ |
| ---- | ---------- |
| **ข้อมูลเว็บไซต์** | ชื่อแบรนด์ · สโลแกน · เบอร์โทร · LINE · เวลาทำการ · โซเชียล · เมนู |
| **Hero (หัวเว็บ)** | ภาพแบนเนอร์ · ข้อความบนปุ่ม · 4 จุดเด่น |
| **บริการ** | หัวข้อส่วน + การ์ดบริการ (เพิ่ม / ลบ / สลับลำดับ / เปลี่ยนรูป) |
| **ผลงาน** | หมวดหมู่ + รายการผลงาน (เพิ่ม / ลบ / สลับลำดับ / เปลี่ยนรูป) |
| **เกี่ยวกับเรา** | ข้อความ · ภาพประกอบ · รายการจุดเด่น |
| **ขั้นตอน** | 4 ขั้นตอนการใช้บริการ |
| **แถบ CTA** | ข้อความชวนติดต่อ · ภาพพื้นหลัง · QR Code แอดไลน์ |
| **รูป & WebP** | แปลงรูปเดิมทั้งหมดเป็น WebP ทีเดียว |

### ขั้นตอนใช้งาน

1. `npm run admin` → แก้ข้อความ หรือ **ลากไฟล์รูปมาวาง** ในช่องรูป
2. กดปุ่ม **บันทึก** มุมขวาบน (เขียนลงไฟล์ `content/*.json` และสำรองของเดิมให้อัตโนมัติ)
3. เปิด GitHub Desktop → **Commit to main** → **Push origin**
4. รอ ~2 นาที เว็บจริงอัปเดตเอง

### เรื่องที่ต้องรู้

- ระบบนี้ **รันบนเครื่องคุณเท่านั้น** (ผูกกับ `127.0.0.1`) ไม่ได้ถูก deploy ขึ้นเว็บ
  เว็บจริงยังเป็น static 100% ไม่มี backend ตามสเปกเดิม
- แก้แล้ว **ต้อง commit + push** ถึงจะขึ้นเว็บจริง — กดบันทึกอย่างเดียวยังไม่พอ
- ไฟล์สำรองอยู่ที่ `content/.backup/` (ไม่ถูก commit ขึ้น git)
- เนื้อหาทั้งหมดเก็บเป็น JSON ที่โฟลเดอร์ [`content/`](content/) จะเปิดแก้ด้วยมือก็ได้

### 🖼️ การแปลงรูปเป็น WebP

WebP เล็กกว่า PNG/JPG มาก โดยคุณภาพตาแทบไม่เห็นความต่าง ทำให้เว็บโหลดเร็วขึ้นโดยเฉพาะบนมือถือ

- **รูปที่อัปโหลดผ่านหลังบ้าน** → แปลงเป็น `.webp` + ย่อขนาดให้พอดีอัตโนมัติ ไม่ต้องทำอะไรเพิ่ม
- **รูปเดิมที่มีอยู่แล้ว** → แท็บ *รูป & WebP* กดปุ่มเดียวแปลงทั้งหมด
  ระบบจะแก้ path ในเนื้อหาให้เอง แล้วกด **บันทึก**
- ผลลัพธ์จริงของเว็บนี้: **5.44 MB → 0.24 MB (เล็กลง 96%)**
- `og-image.png` จะถูกข้ามไว้เสมอ เพราะบางแพลตฟอร์มอ่าน WebP ตอนแชร์ลิงก์ไม่ได้

---

## 4. 📸 เปลี่ยนรูปด้วยมือ (ถ้าไม่ใช้หลังบ้าน)

```
public/images/
├── hero/hero-bg.webp            ← ภาพหัวเว็บ         (1983 × 793)
├── services/service-01.webp     ← การ์ดบริการใบที่ 1  (800 × 520)
│            service-02.webp  service-03.webp
├── portfolio/portfolio-01.webp  ← ผลงานชิ้นที่ 1     (1000 × 700)
│            … ถึง portfolio-06.webp
├── about/about-main.webp        ← ภาพ "เกี่ยวกับเรา"  (900 × 620)
├── cta/cta-bg.webp              ← พื้นหลังแถบ CTA     (1600 × 440)
├── contact/line-qr.webp         ← QR Code แอดไลน์     (376 × 376)
└── og-image.png                 ← ภาพตอนแชร์ลิงก์     (1200 × 630)
```

**วิธีที่ 1** — ตั้งชื่อไฟล์และนามสกุลเหมือนเดิม แล้ววางทับได้เลย ไม่ต้องแตะโค้ด

**วิธีที่ 2** — วางไฟล์ลงในโฟลเดอร์ แล้วแก้ path ที่ไฟล์ JSON

| รูปของ section | แก้ที่ไฟล์ | ตำแหน่ง |
| -------------- | --------- | ------- |
| Hero / เกี่ยวกับเรา / CTA / QR | [`content/images.json`](content/images.json) | `hero` · `about` · `cta` · `lineQr` |
| การ์ดบริการ | [`content/services.json`](content/services.json) | ฟิลด์ `image` |
| ผลงาน | [`content/portfolio.json`](content/portfolio.json) | ฟิลด์ `image` |
| โลโก้ | [`components/Logo.tsx`](components/Logo.tsx) | (SVG เขียนในโค้ด) |
| favicon | `public/favicon.svg` | — |

**ข้อควรระวัง**

- path ต้องขึ้นต้นด้วย `/` เสมอ
- `width` / `height` ใน `images.json` ต้องตรงกับขนาดจริง ไม่งั้นหน้าเว็บจะกระตุกตอนโหลด
  (ถ้าอัปโหลดผ่านหลังบ้าน ระบบกรอกให้เอง)
- ภาพ Hero เป็น **แบนเนอร์ที่มีตัวหนังสือฝังมาในรูปแล้ว** เว็บจึงไม่วางข้อความทับ
  ถ้าเปลี่ยนเป็นรูปที่ไม่มีตัวหนังสือ ต้องให้ผู้ดูแลย้ายข้อความกลับมาเป็นตัวอักษร HTML
- บนจอมือถือ เว็บจะครอปแถบ 4 จุดเด่นด้านล่างของแบนเนอร์ออก แล้วแสดงเป็นข้อความแทน
- ถ้าเพิ่มแท็ก `<Image>` ใหม่เอง ต้องครอบ src ด้วย `asset()` จาก [`lib/asset.ts`](lib/asset.ts)

> ⚠️ รูปตัวอย่าง (บริการ / ผลงาน / เกี่ยวกับเรา / CTA) เป็น **ภาพประกอบที่วาดขึ้น**
> ไม่ใช่ภาพถ่ายจริง กรุณาเปลี่ยนเป็นรูปจริงก่อนเผยแพร่

---

## 5. เพิ่มผลงานด้วยมือ (Portfolio)

แนะนำให้ใช้หลังบ้าน (`npm run admin` → แท็บ *ผลงาน* → **+ เพิ่มผลงาน**)
หรือแก้ที่ [`content/portfolio.json`](content/portfolio.json) ตรง ๆ

```json
{
  "id": "p-07",
  "image": "/images/portfolio/portfolio-07.webp",
  "imageAlt": "คำอธิบายภาพ",
  "category": "จัดไฟแนนซ์",
  "title": "จัดไฟแนนซ์สำเร็จ",
  "description": "Isuzu D-Max",
  "badge": "สำเร็จแล้ว",
  "date": "ก.ค. 2026"
}
```

- `category` ต้องตรงกับชื่อใน `categories` (รายการแรกคือ “ทั้งหมด” ห้ามลบ)
- ปุ่มกรอง / Carousel / จุดบอกตำแหน่ง / Lightbox อัปเดตให้เองทั้งหมด

---

## 6. เปลี่ยนข้อมูลบริษัทด้วยมือ

แนะนำให้ใช้หลังบ้าน หรือแก้ที่ [`content/site.json`](content/site.json)

| ต้องการแก้ | ตำแหน่งในไฟล์ |
| ---------- | ------------- |
| ชื่อแบรนด์ / สโลแกน / ปี © / URL | `site` |
| เบอร์โทร / LINE / เวลาทำการ | `contact` |
| ลิงก์ Facebook / YouTube / TikTok / LINE | `social` |
| เมนู Navbar และ Footer | `navLinks` |
| 4 จุดเด่นใน Hero | `heroHighlights` |
| จุดเด่นใน “เกี่ยวกับเรา” | `aboutFeatures` |
| ขั้นตอนการใช้บริการ | `processSteps` |
| หัวข้อ/คำโปรยของแต่ละ section | `sections` |

**อย่าลืม** แก้ `site.url` ให้ตรงกับ URL จริง เพื่อให้ SEO และภาพตอนแชร์ลิงก์ถูกต้อง

---

## 7. วิธี Deploy ขึ้น GitHub Pages

โปรเจกต์นี้ผูกกับ repository ชื่อ **`watpage`** ของบัญชี `jakgapank2-bot`
เว็บอยู่ที่ `https://jakgapank2-bot.github.io/watpage/`

**อัปเดตเว็บด้วย GitHub Desktop**

1. แก้เนื้อหา (ผ่านหลังบ้าน หรือแก้ไฟล์เอง)
2. เปิด GitHub Desktop → ใส่ข้อความ commit → **Commit to main**
3. กด **Push origin**
4. รอ ~2 นาที เว็บจะอัปเดตอัตโนมัติ

**เงื่อนไขที่ต้องมี** (ตั้งครั้งเดียวพอ)

- repository ต้องเป็น **public** (บัญชีฟรีใช้ Pages กับ repo private ไม่ได้)
- **Settings → Pages → Source** ต้องเลือกเป็น **GitHub Actions**

**ถ้าเปลี่ยนชื่อ repository** — ไม่ต้องแก้โค้ด
GitHub Actions อ่านชื่อ repo เองจาก `actions/configure-pages`
แก้เพียง `site.url` ใน `content/site.json` ให้ตรงกับ URL ใหม่

**build เองบนเครื่อง** (ถ้าอยากทดสอบ base path)

```bash
# Windows (PowerShell)
$env:NEXT_PUBLIC_BASE_PATH="/watpage"; npm run build

# macOS / Linux
NEXT_PUBLIC_BASE_PATH=/watpage npm run build
```

> ไฟล์ `public/.nojekyll` มีไว้กัน GitHub Pages ตัดโฟลเดอร์ `_next` ทิ้ง — ห้ามลบ

---

## 8. วิธีตั้งค่า GitHub Actions

ไฟล์ workflow อยู่ที่ [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) แล้ว
เหลือเพียงเปิดใช้งาน Pages ใน repository:

1. push โค้ดขึ้น GitHub (branch `main`)
2. **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**
3. ดูผลที่แท็บ **Actions** — workflow ชื่อ *Deploy to GitHub Pages* จะรันเอง
4. ขึ้นติ๊กเขียวแล้วเปิดเว็บได้จากลิงก์ในหน้า **Settings → Pages**

| ขั้นตอนใน workflow | ทำอะไร |
| ------------------ | ------ |
| `configure-pages` | อ่าน base path ของ Pages อัตโนมัติ |
| `npm ci` | ติดตั้ง dependencies |
| `npm run build` | สร้างไฟล์ static ลง `out/` |
| `upload-pages-artifact` | อัปโหลดโฟลเดอร์ `out/` |
| `deploy-pages` | นำขึ้น GitHub Pages |

> ⚠️ อย่ากดปุ่ม **Configure** ที่การ์ด “Next.js” ในหน้า Settings → Pages
> เพราะจะสร้าง workflow ซ้อนกับของเดิมแล้วตีกัน

---

## โครงสร้างโปรเจกต์

```
admin/                # 🛠️ ระบบหลังบ้าน (รันบนเครื่องเท่านั้น ไม่ถูก deploy)
  server.mjs          #    เซิร์ฟเวอร์ Node + แปลง WebP ด้วย sharp
  index.html          #    หน้าจอแก้เนื้อหา
content/              # 📝 เนื้อหาทั้งหมดของเว็บ (แก้ผ่านหลังบ้านหรือแก้เอง)
  site.json  services.json  portfolio.json  images.json
app/
  layout.tsx          # Metadata, SEO, Open Graph, ฟอนต์ไทย
  page.tsx            # ประกอบทุก section + JSON-LD
  globals.css         # Design system (สีน้ำตาล-ทอง, ฟอนต์, animation)
components/
  Navbar.tsx          # เมนู sticky + hamburger + ไฮไลต์ section
  Hero.tsx            # แบนเนอร์หัวเว็บ + ปุ่ม + 4 จุดเด่น
  Services.tsx / ServiceCard.tsx
  Portfolio.tsx / PortfolioCard.tsx   # ปุ่มกรอง + Carousel + Lightbox
  About.tsx  Process.tsx  CTA.tsx  Footer.tsx
  FloatingContact.tsx # ปุ่มลอย "ปรึกษาฟรี" บนมือถือ
  Logo.tsx  SectionHeading.tsx  SocialIcons.tsx  Reveal.tsx
data/                 # ใส่ type ให้ข้อมูลจาก content/*.json
lib/asset.ts          # เติม base path ให้ path ของรูป
public/images/        # ไฟล์รูปจริง
```

## เทคโนโลยีที่ใช้

- **Next.js 16** (App Router, `output: "export"`)
- **TypeScript** · **Tailwind CSS 4** · **lucide-react**
- **sharp** — ใช้เฉพาะในระบบหลังบ้านสำหรับแปลง WebP (ไม่ถูกรวมในเว็บที่ deploy)
- ฟอนต์ **Noto Sans Thai** ผ่าน `next/font` (โหลดพร้อมหน้าเว็บ ไม่พึ่ง CDN)

## หมายเหตุ

- ข้อมูลผลงาน เบอร์โทร LINE และรูปตัวอย่างเป็น **ข้อมูลสำหรับเดโม**
  กรุณาแทนที่ด้วยข้อมูลจริงก่อนเผยแพร่ และหลีกเลี่ยงการใส่ข้อมูลลูกค้าที่ไม่ได้รับอนุญาต
- เว็บไซต์ที่ deploy ไม่มีระบบสมาชิก ไม่มีฟอร์มที่ส่งข้อมูลเข้าเซิร์ฟเวอร์
  และไม่เก็บข้อมูลผู้ใช้ใด ๆ
