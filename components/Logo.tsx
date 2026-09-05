import { site } from "@/data/site";

type LogoProps = {
  /** true = โทนสำหรับพื้นหลังเข้ม (Footer) */
  onDark?: boolean;
  className?: string;
};

/**
 * โลโก้ "วัฒน์จัดให้" — ตราวงกลมน้ำตาล-ทอง (จับมือ + รถ) + ชื่อแบรนด์
 * เป็น SVG วาดด้วยโค้ด ถ้ามีไฟล์โลโก้จริงให้แทนที่ <svg> ด้วย <Image> ได้เลย
 */
export default function Logo({ onDark = false, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`.trim()}>
      <svg viewBox="0 0 64 64" className="size-11 shrink-0" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#33200f" />
        <circle cx="32" cy="32" r="30" fill="none" stroke="#c9a227" strokeWidth="3" />
        <circle cx="32" cy="32" r="24.5" fill="none" stroke="#d9b85c" strokeWidth="1.4" opacity=".75" />
        {/* ขีดรอบวงแบบเหรียญตรา */}
        <g stroke="#d9b85c" strokeWidth="1.6" strokeLinecap="round" opacity=".65">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 24;
            return (
              <line
                key={i}
                x1={32 + Math.cos(a) * 26.5}
                y1={32 + Math.sin(a) * 26.5}
                x2={32 + Math.cos(a) * 28.6}
                y2={32 + Math.sin(a) * 28.6}
              />
            );
          })}
        </g>
        {/* จับมือ */}
        <path
          d="M14 30c0-2.4 1.9-4.3 4.3-4.3h9.5l4.2 3.1 4.2-3.1h9.5c2.4 0 4.3 1.9 4.3 4.3v2.6c0 2.4-1.9 4.3-4.3 4.3h-8.1L32 42l-5.6-4.8h-8.1c-2.4 0-4.3-1.9-4.3-4.3z"
          fill="#d9b85c"
        />
        <path d="M27 31.4h10" stroke="#33200f" strokeWidth="1.8" strokeLinecap="round" />
        {/* รถด้านล่าง */}
        <path
          d="M20 50.5c0-1.5 1-2 2.4-2.4l3.2-3.6c.7-.8 1.7-1.2 2.7-1.2h7.4c1 0 2 .4 2.7 1.2l3.2 3.6c1.4.4 2.4.9 2.4 2.4v1.6H20z"
          fill="#c9a227"
          opacity=".9"
        />
      </svg>

      <span className="flex flex-col leading-tight">
        <span
          className={`text-lg font-extrabold tracking-tight sm:text-xl ${
            onDark ? "text-cream-100" : "text-brown-900"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`text-[10.5px] font-medium sm:text-[11px] ${
            onDark ? "text-brown-200" : "text-brown-700/70"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
