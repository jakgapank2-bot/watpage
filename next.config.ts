import type { NextConfig } from "next";

/**
 * Base path สำหรับ GitHub Pages
 * - Deploy ที่ https://username.github.io/          -> ปล่อยว่าง (ไม่ต้องตั้งค่า)
 * - Deploy ที่ https://username.github.io/repo-name -> NEXT_PUBLIC_BASE_PATH=/repo-name
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static Export: สร้างไฟล์ HTML/CSS/JS ล้วน ไม่ต้องมี Node server
  output: "export",

  // GitHub Pages เสิร์ฟไฟล์แบบ static -> ใช้ /path/index.html
  trailingSlash: true,

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  images: {
    // จำเป็นสำหรับ output: "export" (ไม่มี Image Optimization Server)
    unoptimized: true,
  },
};

export default nextConfig;
