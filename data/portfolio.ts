/**
 * ผลงานที่ผ่านมา (Portfolio)
 * ══════════════════════════════════════════════════════════════
 *  วิธีเพิ่มผลงานใหม่:
 *    1) วางไฟล์รูปไว้ที่ public/images/portfolio/ (แนะนำ 1000 × 700 px)
 *    2) เพิ่ม object ใหม่เข้าไปใน array portfolioItems ด้านล่าง
 *    3) ถ้าใช้ category ใหม่ ให้เพิ่มชื่อลงใน portfolioCategories ด้วย
 *
 *  ไม่ต้องแก้โค้ดส่วนอื่นเลย — Carousel / ปุ่มกรอง / Lightbox อัปเดตเอง
 *
 *  หมายเหตุ: ข้อมูลด้านล่างเป็น "ตัวอย่างสำหรับเดโม"
 *            กรุณาแทนที่ด้วยผลงานจริงก่อนเผยแพร่
 */

export type PortfolioItem = {
  id: string;
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  badge: string;
  date: string;
};

/** ปุ่มกรองหมวดหมู่ — ตัวแรกคือ "ทั้งหมด" (แสดงทุกรายการ) */
export const portfolioCategories = [
  "ทั้งหมด",
  "จัดไฟแนนซ์",
  "ติดตามหนี้",
  "จดทะเบียน EV",
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p-01",
    image: "/images/portfolio/portfolio-01.svg",
    imageAlt: "ตัวอย่างผลงานจัดไฟแนนซ์รถกระบะ Toyota Hilux Revo",
    category: "จัดไฟแนนซ์",
    title: "จัดไฟแนนซ์สำเร็จ",
    description: "Toyota Hilux Revo",
    badge: "สำเร็จแล้ว",
    date: "ม.ค. 2026",
  },
  {
    id: "p-02",
    image: "/images/portfolio/portfolio-02.svg",
    imageAlt: "ตัวอย่างผลงานรีไฟแนนซ์รถยนต์เก๋ง Honda Civic",
    category: "จัดไฟแนนซ์",
    title: "รีไฟแนนซ์ผ่าน",
    description: "Honda Civic",
    badge: "สำเร็จแล้ว",
    date: "ก.พ. 2026",
  },
  {
    id: "p-03",
    image: "/images/portfolio/portfolio-03.svg",
    imageAlt: "ตัวอย่างผลงานจดทะเบียนรถยนต์ไฟฟ้า BYD ATTO 3",
    category: "จดทะเบียน EV",
    title: "จดทะเบียนรถยนต์ไฟฟ้า",
    description: "BYD ATTO 3",
    badge: "สำเร็จแล้ว",
    date: "มี.ค. 2026",
  },
  {
    id: "p-04",
    image: "/images/portfolio/portfolio-04.svg",
    imageAlt: "ตัวอย่างผลงานติดตามหนี้และปิดบัญชีได้ตามเป้า",
    category: "ติดตามหนี้",
    title: "ติดตามหนี้สำเร็จ",
    description: "ปิดบัญชีได้ตามเป้า",
    badge: "สำเร็จแล้ว",
    date: "เม.ย. 2026",
  },
  {
    id: "p-05",
    image: "/images/portfolio/portfolio-05.svg",
    imageAlt: "ตัวอย่างผลงานจัดไฟแนนซ์รถยนต์มือสอง",
    category: "จัดไฟแนนซ์",
    title: "จัดไฟแนนซ์รถมือสอง",
    description: "รถยนต์มือสอง",
    badge: "สำเร็จแล้ว",
    date: "พ.ค. 2026",
  },
  {
    id: "p-06",
    image: "/images/portfolio/portfolio-06.svg",
    imageAlt: "ตัวอย่างผลงานจดทะเบียน EV ครบทุกขั้นตอน",
    category: "จดทะเบียน EV",
    title: "จดทะเบียน EV",
    description: "ดำเนินการครบทุกขั้นตอน",
    badge: "สำเร็จแล้ว",
    date: "มิ.ย. 2026",
  },
];
