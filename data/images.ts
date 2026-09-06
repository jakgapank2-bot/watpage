/**
 * รูปภาพประจำ section (Hero / About / CTA / QR / โลโก้)
 * เนื้อหาจริงอยู่ที่ content/images.json — อัปโหลดผ่าน `npm run admin` ได้
 * (ระบบหลังบ้านจะแปลงเป็น .webp และกรอก width/height ให้อัตโนมัติ)
 *
 * รูปการ์ดบริการอยู่ที่ content/services.json
 * รูปผลงานอยู่ที่ content/portfolio.json
 *
 * หมายเหตุ: ไฟล์ JSON แก้ด้วยมือได้ ถ้าคีย์ไหนหายไปจะใช้ค่าว่างแทน
 * เพื่อไม่ให้ทั้งเว็บพังเพราะข้อมูลไม่ครบ
 */
import raw from "@/content/images.json";

export type ImageSlot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Images = {
  hero: ImageSlot;
  about: ImageSlot;
  cta: ImageSlot;
  lineQr: ImageSlot;
  /** โลโก้สำหรับพื้นหลังสว่าง (Navbar) — ปล่อยว่างไว้ = ใช้ตราที่วาดในโค้ด */
  logo: ImageSlot;
  /** โลโก้สำหรับพื้นหลังเข้ม (Footer) — ปล่อยว่างไว้ = ใช้ตัวเดียวกับ logo */
  logoDark: ImageSlot;
  /** true = ไฟล์โลโก้มีชื่อแบรนด์อยู่ในรูปแล้ว เว็บจะไม่แสดงชื่อซ้ำข้าง ๆ */
  logoHasText: boolean;
};

const EMPTY: ImageSlot = { src: "", alt: "", width: 0, height: 0 };
const data = raw as unknown as Partial<Images>;

export const images: Images = {
  hero: data.hero ?? EMPTY,
  about: data.about ?? EMPTY,
  cta: data.cta ?? EMPTY,
  lineQr: data.lineQr ?? EMPTY,
  logo: data.logo ?? EMPTY,
  logoDark: data.logoDark ?? EMPTY,
  logoHasText: data.logoHasText ?? false,
};
