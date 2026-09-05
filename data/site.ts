/**
 * ข้อมูลหลักของเว็บไซต์
 * ──────────────────────────────────────────────────────────────
 *  ⚠️ ห้ามแก้ตัวเลข/ข้อความในไฟล์นี้ — เนื้อหาจริงอยู่ที่ content/site.json
 *
 *  วิธีแก้เนื้อหา เลือกอย่างใดอย่างหนึ่ง:
 *    1) เปิดระบบหลังบ้าน:  npm run admin   (แนะนำ)
 *    2) แก้ไฟล์ content/site.json ตรง ๆ
 *
 *  ไฟล์นี้ทำหน้าที่ "ใส่ type" ให้ข้อมูลจาก JSON เท่านั้น
 */
import raw from "@/content/site.json";

export type Social = { name: string; url: string; icon: "facebook" | "youtube" | "tiktok" | "line" };
export type NavLink = { label: string; href: string };
export type HeroHighlight = {
  icon: "shield" | "users" | "zap" | "heart";
  title: string;
  subtitle: string;
};
export type AboutFeature = { icon: "users" | "gear" | "zap" | "info"; title: string };
export type ProcessStep = {
  number: string;
  icon: "message" | "search" | "settings" | "check";
  title: string;
  detail: string;
};

export const site = raw.site;
export const contact = raw.contact;
export const sections = raw.sections;

export const social = raw.social as Social[];
export const navLinks = raw.navLinks as NavLink[];
export const heroHighlights = raw.heroHighlights as HeroHighlight[];
export const aboutFeatures = raw.aboutFeatures as AboutFeature[];
export const processSteps = raw.processSteps as ProcessStep[];
