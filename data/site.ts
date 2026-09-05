/**
 * ข้อมูลหลักของเว็บไซต์
 * แก้ไขข้อมูลบริษัท / ช่องทางติดต่อ / ลิงก์โซเชียล ได้ที่ไฟล์นี้ไฟล์เดียว
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
  hours: [
    { day: "จันทร์ - เสาร์", time: "09:00 - 18:00 น." },
    { day: "อาทิตย์", time: "ปิดทำการ" },
  ],
  // รูป QR Code สำหรับแอดไลน์ (แทนที่ไฟล์นี้ด้วย QR จริงได้เลย)
  lineQr: "/images/contact/line-qr.svg",
} as const;

export const social = [
  { name: "Facebook", url: "https://facebook.com/", icon: "facebook" },
  { name: "YouTube", url: "https://youtube.com/", icon: "youtube" },
  { name: "TikTok", url: "https://tiktok.com/", icon: "tiktok" },
] as const;

export const navLinks = [
  { label: "หน้าแรก", href: "#home" },
  { label: "บริการของเรา", href: "#services" },
  { label: "ผลงานของเรา", href: "#portfolio" },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
] as const;

export const heroHighlights = [
  { icon: "shield", title: "เชื่อถือได้", subtitle: "ดูแลครบทุกขั้นตอน" },
  { icon: "users", title: "ทีมงานมืออาชีพ", subtitle: "ประสบการณ์จริง" },
  { icon: "zap", title: "รวดเร็ว", subtitle: "ประสานงานไว" },
  { icon: "heart", title: "ดูแลต่อเนื่อง", subtitle: "ไม่ทิ้งลูกค้า" },
] as const;

export type NavLink = (typeof navLinks)[number];

/** จุดเด่นในหัวข้อ "เกี่ยวกับเรา" */
export const aboutFeatures = [
  {
    icon: "message",
    title: "ให้คำปรึกษาแบบมืออาชีพ",
    detail: "วิเคราะห์ความต้องการก่อนเสนอแนวทางที่เหมาะกับคุณจริง ๆ",
  },
  {
    icon: "check",
    title: "ดูแลทุกขั้นตอน",
    detail: "ตั้งแต่เตรียมเอกสารจนถึงวันรับรถ ไม่ต้องวิ่งเอง",
  },
  {
    icon: "clock",
    title: "ประสานงานรวดเร็ว",
    detail: "ติดต่อง่าย ตอบไว อัปเดตความคืบหน้าเป็นระยะ",
  },
  {
    icon: "info",
    title: "ให้ข้อมูลตรงไปตรงมา",
    detail: "แจ้งเงื่อนไขและค่าใช้จ่ายชัดเจน ไม่มีข้อมูลซ่อนเร้น",
  },
] as const;

/** ขั้นตอนการใช้บริการ (Timeline) */
export const processSteps = [
  {
    number: "01",
    icon: "message",
    title: "ปรึกษา",
    detail: "พูดคุยความต้องการ",
  },
  {
    number: "02",
    icon: "search",
    title: "ตรวจสอบข้อมูล",
    detail: "ประเมินและแนะนำแนวทาง",
  },
  {
    number: "03",
    icon: "settings",
    title: "ดำเนินการ",
    detail: "ทีมงานประสานงานให้",
  },
  {
    number: "04",
    icon: "award",
    title: "สำเร็จ",
    detail: "ส่งมอบและดูแลต่อเนื่อง",
  },
] as const;
