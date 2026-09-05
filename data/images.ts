/**
 * รูปภาพประจำ section (Hero / About / CTA / QR)
 * เนื้อหาจริงอยู่ที่ content/images.json — อัปโหลดผ่าน `npm run admin` ได้
 * (ระบบหลังบ้านจะแปลงเป็น .webp และกรอก width/height ให้อัตโนมัติ)
 *
 * รูปการ์ดบริการอยู่ที่ content/services.json
 * รูปผลงานอยู่ที่ content/portfolio.json
 */
import raw from "@/content/images.json";

export type ImageSlot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = raw as Record<"hero" | "about" | "cta" | "lineQr", ImageSlot>;
