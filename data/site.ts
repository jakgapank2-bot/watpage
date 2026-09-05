/**
 * ข้อมูลหลักของเว็บไซต์
 * แก้ไขข้อมูลบริษัท / ช่องทางติดต่อ / ลิงก์โซเชียล ได้ที่ไฟล์นี้ไฟล์เดียว
 * (ส่วนของ "รูปภาพ" อยู่ที่ data/images.ts)
 */

export const site = {
  name: "วัฒน์จัดให้",
  tagline: "เรื่องรถ เรื่องเงิน ให้เป็นเรื่องง่าย",
  description:
    "บริการจัดไฟแนนซ์รถยนต์ รีไฟแนนซ์ ติดตามหนี้ และจดทะเบียนรถยนต์ไฟฟ้า ดูแลครบทุกขั้นตอนโดยทีมงานมืออาชีพ",
  // ใช้สำหรับ Open Graph / metadataBase
  url: "https://jakgapank2-bot.github.io/watpage",
  copyrightYear: "2026",
} as const;

export const contact = {
  phone: "081-234-5678",
  // เบอร์สำหรับลิงก์ tel: (ไม่มีขีด, ใส่รหัสประเทศได้)
  phoneHref: "tel:0812345678",
  lineId: "@วัฒน์จัดให้",
  lineUrl: "https://line.me/R/ti/p/@example",
  email: "contact@example.com",
  address: "ให้บริการทั่วประเทศ",
  hours: "จันทร์ - เสาร์  09:00 - 18:00 น.",
} as const;

export const social = [
  { name: "Facebook", url: "https://facebook.com/", icon: "facebook" },
  { name: "YouTube", url: "https://youtube.com/", icon: "youtube" },
  { name: "TikTok", url: "https://tiktok.com/", icon: "tiktok" },
  { name: "LINE", url: "https://line.me/", icon: "line" },
] as const;

export const navLinks = [
  { label: "หน้าแรก", href: "#home" },
  { label: "บริการของเรา", href: "#services" },
  { label: "ผลงาน", href: "#portfolio" },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
] as const;

/** 4 จุดเด่นที่แสดงอยู่ในภาพ Hero */
export const heroHighlights = [
  { icon: "shield", title: "เชื่อถือได้", subtitle: "ดูแลครบทุกขั้นตอน" },
  { icon: "users", title: "ทีมงานมืออาชีพ", subtitle: "ประสบการณ์จริง" },
  { icon: "zap", title: "รวดเร็ว", subtitle: "ประสานงานไว" },
  { icon: "heart", title: "ดูแลต่อเนื่อง", subtitle: "ไม่ทิ้งลูกค้า" },
] as const;

/** จุดเด่นในหัวข้อ "เกี่ยวกับเรา" — icon ที่ใช้ได้: users | gear | zap | info */
export const aboutFeatures = [
  { icon: "users", title: "ให้คำปรึกษาแบบมืออาชีพ" },
  { icon: "gear", title: "ดูแลทุกขั้นตอน" },
  { icon: "zap", title: "ประสานงานรวดเร็ว" },
  { icon: "info", title: "ให้ข้อมูลตรงไปตรงมา" },
] as const;

/** ขั้นตอนการใช้บริการ — icon ที่ใช้ได้: message | search | settings | check */
export const processSteps = [
  { number: "01", icon: "message", title: "ปรึกษา", detail: "พูดคุยความต้องการ" },
  { number: "02", icon: "search", title: "ตรวจสอบข้อมูล", detail: "ประเมินและแนะนำแนวทาง" },
  { number: "03", icon: "settings", title: "ดำเนินการ", detail: "ทีมงานประสานงานให้" },
  { number: "04", icon: "check", title: "สำเร็จ", detail: "ส่งมอบและดูแลต่อเนื่อง" },
] as const;

export type NavLink = (typeof navLinks)[number];
