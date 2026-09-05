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

## 2. วิธีรัน Local

```bash
npm run dev     # รันโหมดพัฒนา แก้โค้ดแล้วเห็นผลทันที
```

เปิดเบราว์เซอร์ที่ <http://localhost:3000>

```bash
npm run build   # สร้างเว็บไซต์ static ลงในโฟลเดอร์ out/
npm run lint    # ตรวจสอบคุณภาพโค้ด
npx serve out   # ทดลองเปิดไฟล์ที่ build แล้ว
```

---

## 3. 📸 วิธีเปลี่ยนรูป (แยกเป็นส่วน ๆ)

รูปทุกรูปถูกแยกไว้ตาม section ให้เอาไฟล์ของคุณมาวางแทนได้ง่าย ๆ

### โครงสร้างโฟลเดอร์รูป

```
public/images/
├── hero/hero-bg.svg            ← ภาพหัวเว็บ         (1920 × 760)
├── services/service-01.svg     ← การ์ดบริการใบที่ 1  (800 × 520)
│            service-02.svg     ← การ์ดบริการใบที่ 2
│            service-03.svg     ← การ์ดบริการใบที่ 3
├── portfolio/portfolio-01.svg  ← ผลงานชิ้นที่ 1     (1000 × 700)
│            … ถึง portfolio-06.svg
├── about/about-main.svg        ← ภาพ "เกี่ยวกับเรา"  (900 × 620)
├── cta/cta-bg.svg              ← พื้นหลังแถบ CTA     (1600 × 440)
├── contact/line-qr.svg         ← QR Code แอดไลน์     (376 × 376)
└── og-image.png                ← ภาพตอนแชร์ลิงก์     (1200 × 630)
```

### วิธีที่ 1 — ง่ายที่สุด (ไม่ต้องแตะโค้ดเลย)

แปลงรูปของคุณเป็น **นามสกุลเดิม** แล้ว **วางทับไฟล์เดิม** ได้เลย

### วิธีที่ 2 — ใช้ไฟล์ .jpg / .webp / .png ของคุณเอง

วางไฟล์ลงในโฟลเดอร์ของ section นั้น แล้วแก้ path ที่ตารางด้านล่าง **บรรทัดเดียว**

| รูปของ section    | แก้ที่ไฟล์                               | ตัวแปร             |
| ----------------- | ---------------------------------------- | ------------------ |
| Hero (หัวเว็บ)    | [`data/images.ts`](data/images.ts)       | `images.hero`      |
| เกี่ยวกับเรา      | [`data/images.ts`](data/images.ts)       | `images.about`     |
| พื้นหลัง CTA      | [`data/images.ts`](data/images.ts)       | `images.cta`       |
| QR Code LINE      | [`data/images.ts`](data/images.ts)       | `images.lineQr`    |
| การ์ดบริการ 3 ใบ  | [`data/services.ts`](data/services.ts)   | ฟิลด์ `image`      |
| ผลงาน             | [`data/portfolio.ts`](data/portfolio.ts) | ฟิลด์ `image`      |
| โลโก้             | [`components/Logo.tsx`](components/Logo.tsx) | (SVG ในโค้ด)   |
| favicon           | `public/favicon.svg`                     | —                  |

ตัวอย่าง — เปลี่ยนภาพ Hero เป็นรูปถ่ายจริง:

```ts
// data/images.ts
hero: {
  src: "/images/hero/hero-bg.jpg",   // ← เปลี่ยนตรงนี้
  alt: "ทีมงานวัฒน์จัดให้ พร้อมรถยนต์",
  width: 1920,                        // ← ใส่ขนาดจริงของรูป
  height: 760,
},
```

**ข้อควรระวัง**

- path ต้องขึ้นต้นด้วย `/` เสมอ
- `width` / `height` ต้องตรงกับขนาดจริง ไม่งั้นหน้าเว็บจะกระตุกตอนโหลด
- ภาพ Hero: ฝั่งซ้ายจะถูกทับด้วยข้อความ ควรเลือกรูปที่ตัวแบบอยู่ **ฝั่งขวา**
- ไฟล์ควรไม่เกิน ~300 KB ต่อรูป เพื่อให้เว็บโหลดเร็ว (แนะนำ `.webp`)
- ถ้าเพิ่มแท็ก `<Image>` ใหม่เอง ต้องครอบ src ด้วย `asset()` จาก [`lib/asset.ts`](lib/asset.ts)

> ⚠️ รูปที่ให้มาทั้งหมดเป็น **ภาพประกอบตัวอย่าง** ไม่ใช่ภาพถ่ายจริง
> กรุณาเปลี่ยนเป็นรูปจริงก่อนเผยแพร่

---

## 4. วิธีเพิ่มผลงาน (Portfolio)

แก้ที่ [`data/portfolio.ts`](data/portfolio.ts) ไฟล์เดียว

```ts
export const portfolioItems: PortfolioItem[] = [
  // ...ของเดิม
  {
    id: "p-07",                                   // ห้ามซ้ำกับรายการอื่น
    image: "/images/portfolio/portfolio-07.jpg",  // ขึ้นต้นด้วย / เสมอ
    imageAlt: "คำอธิบายภาพ",
    category: "จัดไฟแนนซ์",                        // ต้องตรงกับ portfolioCategories
    title: "จัดไฟแนนซ์สำเร็จ",
    description: "Isuzu D-Max",
    badge: "สำเร็จแล้ว",
    date: "ก.ค. 2026",
  },
];
```

**เพิ่มหมวดหมู่ใหม่** — เพิ่มชื่อลงใน `portfolioCategories` ในไฟล์เดียวกัน
(ตัวแรกคือ “ทั้งหมด” ต้องอยู่ตำแหน่งแรกเสมอ)

```ts
export const portfolioCategories = ["ทั้งหมด", "จัดไฟแนนซ์", "ติดตามหนี้", "จดทะเบียน EV"] as const;
```

ปุ่มกรอง / Carousel / จุดบอกตำแหน่ง / Lightbox อัปเดตให้เองทั้งหมด

---

## 5. วิธีเปลี่ยนข้อมูลบริษัท

| ต้องการแก้                         | ไฟล์                                     | ตัวแปร             |
| ---------------------------------- | ---------------------------------------- | ------------------ |
| ชื่อแบรนด์ / tagline / ปี ©        | [`data/site.ts`](data/site.ts)           | `site`             |
| เบอร์โทร / LINE / เวลาทำการ        | [`data/site.ts`](data/site.ts)           | `contact`          |
| ลิงก์ Facebook / YouTube / TikTok  | [`data/site.ts`](data/site.ts)           | `social`           |
| เมนู Navbar และ Footer             | [`data/site.ts`](data/site.ts)           | `navLinks`         |
| 4 จุดเด่นใน Hero                   | [`data/site.ts`](data/site.ts)           | `heroHighlights`   |
| จุดเด่นใน "เกี่ยวกับเรา"           | [`data/site.ts`](data/site.ts)           | `aboutFeatures`    |
| ขั้นตอนการใช้บริการ                | [`data/site.ts`](data/site.ts)           | `processSteps`     |
| การ์ดบริการ 3 ใบ                   | [`data/services.ts`](data/services.ts)   | `services`         |
| ผลงาน                              | [`data/portfolio.ts`](data/portfolio.ts) | `portfolioItems`   |

```ts
export const contact = {
  phone: "081-234-5678",          // ข้อความที่แสดงบนเว็บ
  phoneHref: "tel:0812345678",    // ลิงก์ตอนกดโทร (ห้ามมีขีด)
  lineId: "@วัฒน์จัดให้",
  lineUrl: "https://line.me/R/ti/p/@your-line-id",  // ลิงก์แอดไลน์จริง
  hours: "จันทร์ - เสาร์  09:00 - 18:00 น.",
};
```

> ข้อความยาว ๆ บางส่วน (ย่อหน้าใน About, หัวข้อ CTA) อยู่ในไฟล์ที่
> [`components/`](components/) แก้ไขได้โดยตรง

**อย่าลืม** แก้ `site.url` ให้ตรงกับ URL จริง เพื่อให้ SEO และภาพตอนแชร์ลิงก์ถูกต้อง

---

## 6. วิธี Deploy ขึ้น GitHub Pages

โปรเจกต์นี้ผูกกับ repository ชื่อ **`watpage`** ของบัญชี `jakgapank2-bot`
เว็บจะอยู่ที่ `https://jakgapank2-bot.github.io/watpage/`

**อัปเดตเว็บด้วย GitHub Desktop**

1. แก้ไฟล์ในเครื่อง
2. เปิด GitHub Desktop → ใส่ข้อความ commit → **Commit to main**
3. กด **Push origin**
4. รอ ~2 นาที เว็บจะอัปเดตอัตโนมัติ

**เงื่อนไขที่ต้องมี** (ตั้งครั้งเดียวพอ)

- repository ต้องเป็น **public** (บัญชีฟรีใช้ Pages กับ repo private ไม่ได้)
- **Settings → Pages → Source** ต้องเลือกเป็น **GitHub Actions**

**ถ้าเปลี่ยนชื่อ repository** — ไม่ต้องแก้โค้ด
GitHub Actions อ่านชื่อ repo เองจาก `actions/configure-pages`
แก้เพียง `site.url` ใน `data/site.ts` ให้ตรงกับ URL ใหม่

**build เองบนเครื่อง** (ถ้าอยากทดสอบ base path)

```bash
# Windows (PowerShell)
$env:NEXT_PUBLIC_BASE_PATH="/watpage"; npm run build

# macOS / Linux
NEXT_PUBLIC_BASE_PATH=/watpage npm run build
```

> ไฟล์ `public/.nojekyll` มีไว้กัน GitHub Pages ตัดโฟลเดอร์ `_next` ทิ้ง — ห้ามลบ

---

## 7. วิธีตั้งค่า GitHub Actions

ไฟล์ workflow อยู่ที่ [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) แล้ว
เหลือเพียงเปิดใช้งาน Pages ใน repository:

1. push โค้ดขึ้น GitHub (branch `main`)
2. **Settings → Pages → Build and deployment → Source** เลือก **GitHub Actions**
3. ดูผลที่แท็บ **Actions** — workflow ชื่อ *Deploy to GitHub Pages* จะรันเอง
4. ขึ้นติ๊กเขียวแล้วเปิดเว็บได้จากลิงก์ในหน้า **Settings → Pages**

| ขั้นตอนใน workflow      | ทำอะไร                                     |
| ----------------------- | ------------------------------------------ |
| `configure-pages`       | อ่าน base path ของ Pages อัตโนมัติ         |
| `npm ci`                | ติดตั้ง dependencies                       |
| `npm run build`         | สร้างไฟล์ static ลง `out/`                 |
| `upload-pages-artifact` | อัปโหลดโฟลเดอร์ `out/`                     |
| `deploy-pages`          | นำขึ้น GitHub Pages                        |

> ⚠️ อย่ากดปุ่ม **Configure** ที่การ์ด "Next.js" ในหน้า Settings → Pages
> เพราะจะสร้าง workflow ซ้อนกับของเดิมแล้วตีกัน

---

## โครงสร้างโปรเจกต์

```
app/
  layout.tsx        # Metadata, SEO, Open Graph, ฟอนต์ไทย
  page.tsx          # ประกอบทุก section + JSON-LD
  globals.css       # Design system (สีน้ำตาล-ทอง, ฟอนต์, animation)
components/
  Navbar.tsx        # เมนู sticky + hamburger + ไฮไลต์ section
  Hero.tsx          # หัวเว็บภาพเต็มจอ + 4 จุดเด่น
  Services.tsx / ServiceCard.tsx
  Portfolio.tsx / PortfolioCard.tsx   # ปุ่มกรอง + Carousel + Lightbox
  About.tsx  Process.tsx  CTA.tsx  Footer.tsx
  FloatingContact.tsx  # ปุ่มลอย "ปรึกษาฟรี" บนมือถือ
  Logo.tsx  SectionHeading.tsx  SocialIcons.tsx  Reveal.tsx
data/
  site.ts       # ข้อมูลบริษัท / ติดต่อ / เมนู / เนื้อหาสั้น ๆ
  images.ts     # 📸 รูปทุก section รวมไว้ที่นี่
  services.ts   # การ์ดบริการ
  portfolio.ts  # ผลงาน + หมวดหมู่
lib/asset.ts    # เติม base path ให้ path ของรูป
public/images/  # ไฟล์รูปจริง
```

## เทคโนโลยีที่ใช้

- **Next.js 16** (App Router, `output: "export"`)
- **TypeScript** · **Tailwind CSS 4** · **lucide-react**
- ฟอนต์ **Noto Sans Thai** ผ่าน `next/font` (โหลดพร้อมหน้าเว็บ ไม่พึ่ง CDN)

## หมายเหตุ

- ข้อมูลผลงาน เบอร์โทร LINE และรูปภาพทั้งหมดเป็น **ตัวอย่างสำหรับเดโม**
  กรุณาแทนที่ด้วยข้อมูลจริงก่อนเผยแพร่ และหลีกเลี่ยงการใส่ข้อมูลลูกค้าที่ไม่ได้รับอนุญาต
- เว็บไซต์นี้ไม่มีระบบสมาชิก ไม่มีฟอร์มที่ส่งข้อมูลเข้าเซิร์ฟเวอร์ และไม่เก็บข้อมูลผู้ใช้ใด ๆ
