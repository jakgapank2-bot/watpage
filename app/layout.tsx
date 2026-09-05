import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * URL แบบเต็มของภาพ OG — ต้องเป็น absolute URL เสมอ
 * (สร้างจาก site.url ตรง ๆ เพื่อไม่ให้ base path ซ้ำซ้อนกัน)
 */
const ogImageUrl = `${site.url}/images/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "จัดไฟแนนซ์รถยนต์",
    "รีไฟแนนซ์รถ",
    "ติดตามหนี้",
    "เร่งรัดหนี้สิน",
    "จดทะเบียนรถยนต์ไฟฟ้า",
    "จดทะเบียน EV",
    "วัฒน์จัดให้",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [ogImageUrl],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1656dc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
