/**
 * ผลงานที่ผ่านมา (Portfolio)
 * ------------------------------------------------------------------
 * วิธีเพิ่มผลงานใหม่:
 *   1) วางไฟล์รูปไว้ที่ public/images/portfolio/ (เช่น portfolio-07.jpg)
 *   2) เพิ่ม object ใหม่เข้าไปใน array ด้านล่าง
 *   3) ไม่ต้องแก้โค้ดส่วนอื่นเลย ระบบ Carousel / Lightbox จะอัปเดตอัตโนมัติ
 *
 * หมายเหตุ: ข้อมูลด้านล่างเป็น "ข้อมูลตัวอย่าง" สำหรับเดโม
 *           กรุณาแทนที่ด้วยผลงานจริงก่อนเผยแพร่
 */

export type PortfolioItem = {
  id: string;
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  badge: string;
  year: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p-01",
    image: "/images/portfolio/portfolio-01.svg",
    imageAlt: "ตัวอย่างผลงานจัดไฟแนนซ์รถกระบะ Toyota Hilux Revo",
    category: "จัดไฟแนนซ์",
    title: "จัดไฟแนนซ์สำเร็จ",
    description: "Toyota Hilux Revo",
    badge: "สำเร็จแล้ว",
    year: "2026",
  },
  {
    id: "p-02",
    image: "/images/portfolio/portfolio-02.svg",
    imageAlt: "ตัวอย่างผลงานรีไฟแนนซ์รถยนต์เก๋ง",
    category: "รีไฟแนนซ์",
    title: "รีไฟแนนซ์ผ่าน",
    description: "Toyota / Honda",
    badge: "สำเร็จแล้ว",
    year: "2026",
  },
  {
    id: "p-03",
    image: "/images/portfolio/portfolio-03.svg",
    imageAlt: "ตัวอย่างผลงานจดทะเบียนรถยนต์ไฟฟ้า BYD ATTO 3",
    category: "จดทะเบียน EV",
    title: "จดทะเบียนรถยนต์ไฟฟ้า",
    description: "BYD ATTO 3",
    badge: "สำเร็จแล้ว",
    year: "2026",
  },
  {
    id: "p-04",
    image: "/images/portfolio/portfolio-04.svg",
    imageAlt: "ตัวอย่างผลงานติดตามหนี้และปิดบัญชีได้ตามเป้า",
    category: "ติดตามหนี้",
    title: "ติดตามหนี้สำเร็จ",
    description: "ปิดบัญชีได้ตามเป้า",
    badge: "สำเร็จแล้ว",
    year: "2025",
  },
  {
    id: "p-05",
    image: "/images/portfolio/portfolio-05.svg",
    imageAlt: "ตัวอย่างผลงานจัดไฟแนนซ์รถยนต์มือสอง",
    category: "จัดไฟแนนซ์",
    title: "จัดไฟแนนซ์รถมือสอง",
    description: "รถยนต์มือสอง",
    badge: "สำเร็จแล้ว",
    year: "2025",
  },
  {
    id: "p-06",
    image: "/images/portfolio/portfolio-06.svg",
    imageAlt: "ตัวอย่างผลงานจดทะเบียน EV ครบทุกขั้นตอน",
    category: "จดทะเบียน EV",
    title: "จดทะเบียน EV",
    description: "ดำเนินการครบทุกขั้นตอน",
    badge: "สำเร็จแล้ว",
    year: "2025",
  },
];

/** สถิติที่แสดงใต้หัวข้อ Portfolio (แก้ไขตัวเลขได้ตามจริง) */
export const portfolioStats = [
  { value: "10+", label: "ปีประสบการณ์" },
  { value: "ทุกยี่ห้อ", label: "รองรับรถทุกแบรนด์" },
  { value: "ทั่วประเทศ", label: "พื้นที่ให้บริการ" },
] as const;
