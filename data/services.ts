/**
 * ข้อมูลบริการ (Services)
 * เนื้อหาจริงอยู่ที่ content/services.json — แก้ผ่าน `npm run admin` ได้
 */
import raw from "@/content/services.json";

export type Service = {
  id: string;
  number: string;
  icon: "car" | "file" | "bolt";
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export const services = raw.services as Service[];
