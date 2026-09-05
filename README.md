# วัฒน์จัดให้ — เว็บไซต์ One Page

เว็บไซต์แนะนำบริการ **“วัฒน์จัดให้”** — เรื่องรถ เรื่องเงิน ให้เป็นเรื่องง่าย
สร้างด้วย **Next.js + TypeScript + Tailwind CSS** เป็น **Static Website 100%**
ไม่มี Backend / Database / API Server พร้อม Deploy ขึ้น GitHub Pages ได้ทันที

## โครงสร้างหน้าเว็บ

```
NAVBAR → HERO → SERVICES → PORTFOLIO (ผลงานที่ผ่านมา) → ABOUT US
       → PROCESS → CTA → CONTACT → FOOTER
```

---

## 1. วิธีติดตั้ง

ต้องมี [Node.js](https://nodejs.org/) เวอร์ชัน 20 ขึ้นไป

```bash
# ติดตั้ง dependencies
npm install
```

---

## 2. วิธีรัน Local

```bash
# รันโหมดพัฒนา (แก้โค้ดแล้วเห็นผลทันที)
npm run dev
```

เปิดเบราว์เซอร์ที่ <http://localhost:3000>

คำสั่งอื่น ๆ

```bash
npm run build   # สร้างเว็บไซต์ static ลงในโฟลเดอร์ out/
npm run lint    # ตรวจสอบคุณภาพโค้ด
```

หลัง `npm run build` ไฟล์เว็บทั้งหมดจะอยู่ในโฟลเดอร์ `out/`
ทดลองเปิดแบบ static ได้ด้วย `npx serve out`

---

## 3. วิธีเพิ่มผลงาน (Portfolio)

ผลงานทั้งหมดเก็บอยู่ในไฟล์เดียวคือ [`data/portfolio.ts`](data/portfolio.ts)

**ขั้นตอน**

1. วางไฟล์รูปไว้ที่ `public/images/portfolio/` เช่น `portfolio-07.jpg`
2. เพิ่ม object ใหม่เข้าไปใน array `portfolioItems`

```ts
export const portfolioItems: PortfolioItem[] = [
  // ...ของเดิม
  {
    id: "p-07",                                   // ต้องไม่ซ้ำกับรายการอื่น
    image: "/images/portfolio/portfolio-07.jpg",  // ขึ้นต้นด้วย / เสมอ
    imageAlt: "คำอธิบายภาพสำหรับผู้พิการทางสายตา / SEO",
    category: "จัดไฟแนนซ์",                        // ป้ายมุมซ้ายบน
    title: "จัดไฟแนนซ์สำเร็จ",                      // ชื่อผลงาน
    description: "Isuzu D-Max",                   // รายละเอียดสั้น ๆ
    badge: "สำเร็จแล้ว",                           // ป้ายสีเขียว
    year: "2026",                                 // ปี (มุมขวาบน)
  },
];
```

3. บันทึกไฟล์ — Carousel, จุดบอกตำแหน่ง (dots) และ Lightbox
   จะอัปเดตให้อัตโนมัติ ไม่ต้องแก้โค้ดส่วนอื่น

> ตัวเลขสถิติใต้หัวข้อผลงาน (เช่น “10+ ปีประสบการณ์”) แก้ได้ที่ตัวแปร
> `portfolioStats` ในไฟล์เดียวกัน

**แนะนำเรื่องรูป**

- อัตราส่วน 4:3 (เช่น 1000 × 700 px หรือ 1200 × 900 px)
- ไฟล์ `.jpg` หรือ `.webp` ขนาดไม่เกิน ~300 KB เพื่อให้เว็บโหลดเร็ว
- รูปในโปรเจกต์ตอนนี้เป็น **ภาพตัวอย่าง (placeholder)** ควรแทนที่ด้วยผลงานจริง

---

## 4. วิธีเปลี่ยนข้อมูลบริษัท

| ต้องการแก้                                | ไฟล์                                       |
| ----------------------------------------- | ------------------------------------------ |
| ชื่อแบรนด์ / tagline / คำอธิบาย / ปี © | [`data/site.ts`](data/site.ts) — `site`    |
| เบอร์โทร / LINE / เวลาทำการ / QR         | [`data/site.ts`](data/site.ts) — `contact` |
| ลิงก์ Facebook / YouTube / TikTok         | [`data/site.ts`](data/site.ts) — `social`  |
| เมนูใน Navbar และ Footer                  | [`data/site.ts`](data/site.ts) — `navLinks` |
| 4 จุดเด่นใต้ Hero                         | [`data/site.ts`](data/site.ts) — `heroHighlights` |
| หัวข้อ “เกี่ยวกับเรา”                     | [`data/site.ts`](data/site.ts) — `aboutFeatures` |
| ขั้นตอนการใช้บริการ                       | [`data/site.ts`](data/site.ts) — `processSteps` |
| การ์ดบริการ 3 ใบ                          | [`data/services.ts`](data/services.ts)     |
| ผลงานที่ผ่านมา                            | [`data/portfolio.ts`](data/portfolio.ts)   |

ตัวอย่างการเปลี่ยนเบอร์โทรและ LINE:

```ts
export const contact = {
  phone: "081-234-5678",          // ข้อความที่แสดงบนเว็บ
  phoneHref: "tel:0812345678",    // ลิงก์ตอนกดโทร (ห้ามมีขีด)
  lineId: "@วัฒน์จัดให้",
  lineUrl: "https://line.me/R/ti/p/@your-line-id",  // ลิงก์แอดไลน์จริง
  // ...
};
```

> ข้อความยาว ๆ ในบางส่วน (เช่น ย่อหน้าของ About หรือหัวข้อ CTA)
> อยู่ในคอมโพเนนต์ที่ [`components/`](components/) แก้ไขได้โดยตรง

**อย่าลืม** เปลี่ยน `site.url` ใน `data/site.ts` เป็นโดเมนจริง
เพื่อให้ Open Graph / SEO ทำงานถูกต้อง เช่น `https://your-name.github.io`

---

## 5. วิธีเปลี่ยนรูป

รูปทั้งหมดอยู่ในโฟลเดอร์ `public/images/`

```
public/images/
├── hero/hero-main.svg          # ภาพใหญ่ใน Hero
├── services/service-01..03.svg # ภาพหัวการ์ดบริการ
├── portfolio/portfolio-01..06.svg
├── about/about-main.svg        # ภาพในหัวข้อเกี่ยวกับเรา
├── cta/cta-bg.svg              # ภาพพื้นหลังแถบ CTA
├── contact/line-qr.svg         # QR Code แอดไลน์
└── og-image.png                # ภาพตัวอย่างตอนแชร์ลิงก์ (1200×630)
```

**วิธีเปลี่ยน** — มี 2 แบบ

1. **ใช้ชื่อไฟล์เดิม** วางไฟล์ทับได้เลย (ถ้านามสกุลต่างกัน ต้องแก้ path ในโค้ดด้วย)
2. **ใช้ชื่อไฟล์ใหม่** วางไฟล์แล้วแก้ path ที่จุดอ้างอิง

| รูป          | แก้ path ที่                                        |
| ------------ | --------------------------------------------------- |
| Hero         | `components/Hero.tsx`                               |
| การ์ดบริการ  | `data/services.ts` (ฟิลด์ `image`)                  |
| ผลงาน        | `data/portfolio.ts` (ฟิลด์ `image`)                 |
| เกี่ยวกับเรา | `components/About.tsx`                              |
| พื้นหลัง CTA | `components/CTA.tsx`                                |
| QR Code LINE | `data/site.ts` (`contact.lineQr`)                   |
| OG / favicon | `app/layout.tsx`, `public/favicon.svg`              |

**ข้อควรระวัง**

- path ต้องขึ้นต้นด้วย `/` เสมอ เช่น `/images/portfolio/xxx.jpg`
- ถ้าเพิ่มแท็ก `<Image>` ใหม่เอง ให้ครอบ src ด้วยฟังก์ชัน `asset()` จาก
  [`lib/asset.ts`](lib/asset.ts) เช่น `src={asset("/images/xxx.jpg")}`
  เพื่อให้รูปแสดงถูกต้องตอน deploy ลง subfolder
  (รูปที่ใส่ผ่าน `data/*.ts` ทำให้อยู่แล้ว ไม่ต้องทำอะไรเพิ่ม)
- ถ้าเปลี่ยนขนาดรูป ให้แก้ค่า `width` / `height` ในแท็ก `<Image>` ตามจริงด้วย
  เพื่อไม่ให้หน้าเว็บกระตุก (Layout Shift)
- ทุกภาพต้องมี `alt` ที่สื่อความหมาย เพื่อ SEO และผู้ใช้ screen reader

---

## 6. วิธี Deploy ขึ้น GitHub Pages

โปรเจกต์นี้ตั้งค่า `output: "export"` ไว้แล้ว จึงได้ไฟล์ static ล้วนในโฟลเดอร์ `out/`

### โปรเจกต์นี้ตั้งค่าไว้สำหรับ repository ชื่อ `watpage`

เว็บจะอยู่ที่ **`https://<username>.github.io/watpage/`**
GitHub Actions จะเติม base path `/watpage` ให้อัตโนมัติ — **ไม่ต้องตั้งค่าอะไรเพิ่ม**

**ขั้นตอนด้วย GitHub Desktop**

1. เปิด GitHub Desktop → **File → Add local repository** → เลือกโฟลเดอร์นี้
2. ใส่ข้อความ commit แล้วกด **Commit to main**
3. กด **Publish repository** → ตั้งชื่อเป็น **`watpage`** → เอาเครื่องหมายถูก
   *Keep this code private* ออก (GitHub Pages ของบัญชีฟรีต้องเป็น public)
4. ทำตามหัวข้อ [7. วิธีตั้งค่า GitHub Actions](#7-วิธีตั้งค่า-github-actions) เพื่อเปิด Pages
5. ครั้งต่อ ๆ ไปแค่ Commit แล้วกด **Push origin** เว็บจะอัปเดตเอง

> อย่าลืมแก้ `site.url` ใน `data/site.ts` ให้เป็นชื่อผู้ใช้ GitHub จริงของคุณ

### ถ้าเปลี่ยนไปใช้ชื่อ repository อื่น

ไม่ต้องแก้โค้ด — Actions อ่านชื่อ repo เองจาก `actions/configure-pages`
แก้เพียง `site.url` ใน `data/site.ts` ให้ตรงกับ URL จริง

### ถ้าอยากให้เป็นเว็บหลัก `https://username.github.io/` (ไม่มีชื่อ repo ต่อท้าย)

ตั้งชื่อ repository ว่า **`<username>.github.io`** แทน
base path จะเป็นค่าว่างให้อัตโนมัติ แล้วแก้ `site.url` เป็น `https://<username>.github.io`

### build เองบนเครื่อง (ถ้าต้องการทดสอบ base path)

```bash
# Windows (PowerShell)
$env:NEXT_PUBLIC_BASE_PATH="/watpage"; npm run build

# macOS / Linux
NEXT_PUBLIC_BASE_PATH=/watpage npm run build
```

> ระบบไม่ได้ hardcode ชื่อ GitHub ของใครไว้ ทุกอย่างอ่านจาก environment variable
> ไฟล์ `public/.nojekyll` มีไว้กัน GitHub Pages ตัดโฟลเดอร์ `_next` ทิ้ง — ห้ามลบ

---

## 7. วิธีตั้งค่า GitHub Actions

ไฟล์ workflow อยู่ที่ [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) แล้ว
เหลือเพียงเปิดใช้งาน Pages ใน repository:

1. push โค้ดขึ้น GitHub (branch `main`)
2. ไปที่ **Settings → Pages**
3. ที่หัวข้อ **Build and deployment → Source** เลือก **GitHub Actions**
4. ไปที่แท็บ **Actions** จะเห็น workflow ชื่อ *Deploy to GitHub Pages* รันอัตโนมัติ
5. เมื่อขึ้นเครื่องหมายถูกสีเขียว เปิดเว็บได้จากลิงก์ในหน้า **Settings → Pages**

หลังจากนี้ทุกครั้งที่ push เข้า `main` เว็บจะอัปเดตให้อัตโนมัติ
หรือกดรันเองได้จากแท็บ Actions → Deploy to GitHub Pages → **Run workflow**

**สิ่งที่ workflow ทำ**

| ขั้นตอน           | รายละเอียด                                            |
| ----------------- | ----------------------------------------------------- |
| `configure-pages` | อ่านค่า base path ของ Pages อัตโนมัติ                 |
| `npm ci`          | ติดตั้ง dependencies ตาม `package-lock.json`          |
| `npm run build`   | สร้างไฟล์ static ลง `out/` พร้อม base path ที่ถูกต้อง |
| `upload-pages-artifact` | อัปโหลดโฟลเดอร์ `out/`                          |
| `deploy-pages`    | นำขึ้น GitHub Pages                                   |

---

## โครงสร้างโปรเจกต์

```
app/
  layout.tsx        # Metadata, SEO, Open Graph, ฟอนต์ไทย
  page.tsx          # ประกอบทุก section เข้าด้วยกัน + JSON-LD
  globals.css       # Design system (สี, ฟอนต์, animation)
components/
  Navbar.tsx        # เมนู sticky + hamburger + ไฮไลต์ section
  Hero.tsx          # หัวเว็บ + 4 จุดเด่น
  Services.tsx / ServiceCard.tsx
  Portfolio.tsx / PortfolioCard.tsx   # Carousel + Lightbox
  About.tsx  Process.tsx  CTA.tsx  Contact.tsx  Footer.tsx
  FloatingContact.tsx  # ปุ่มลอย "ปรึกษาฟรี" บนมือถือ
  Logo.tsx  SectionHeading.tsx  SocialIcons.tsx  Reveal.tsx
data/
  site.ts  services.ts  portfolio.ts   # แก้เนื้อหาทั้งหมดที่นี่
public/images/                          # รูปภาพทั้งหมด
```

## เทคโนโลยีที่ใช้

- **Next.js 16** (App Router, `output: "export"`)
- **TypeScript**
- **Tailwind CSS 4**
- **lucide-react** สำหรับไอคอน
- ฟอนต์ **Noto Sans Thai** ผ่าน `next/font` (โหลดพร้อมหน้าเว็บ ไม่ต้องพึ่ง CDN)

## หมายเหตุ

- ภาพและข้อมูลผลงานในโปรเจกต์นี้เป็น **ตัวอย่างสำหรับเดโม** กรุณาแทนที่ด้วยข้อมูลจริง
  ก่อนเผยแพร่ และหลีกเลี่ยงการใส่ข้อมูลลูกค้าที่ไม่ได้รับอนุญาต
- เว็บไซต์นี้ไม่มีระบบสมาชิก ไม่มีฟอร์มที่ส่งข้อมูลเข้าเซิร์ฟเวอร์
  และไม่เก็บข้อมูลผู้ใช้ใด ๆ
