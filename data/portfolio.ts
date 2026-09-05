/**
 * ผลงานที่ผ่านมา (Portfolio)
 * เนื้อหาจริงอยู่ที่ content/portfolio.json — แก้ผ่าน `npm run admin` ได้
 *
 * categories[0] คือ "ทั้งหมด" (แสดงทุกรายการ) ต้องอยู่ตำแหน่งแรกเสมอ
 */
import raw from "@/content/portfolio.json";

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

export const portfolioCategories = raw.categories as string[];
export const portfolioItems = raw.items as PortfolioItem[];
