import Image from "next/image";
import { asset } from "@/lib/asset";
import { images } from "@/data/images";
import { site } from "@/data/site";

type LogoProps = {
  /** true = โทนสำหรับพื้นหลังเข้ม (Footer) */
  onDark?: boolean;
  className?: string;
};

/**
 * โลโก้ "วัฒน์จัดให้"
 *
 * ลำดับการเลือกภาพ:
 *   1) พื้นหลังเข้ม → ใช้ images.logoDark ถ้ามี
 *   2) ถ้าไม่มี → ใช้ images.logo
 *   3) ถ้ายังไม่ได้อัปโหลดเลย → ใช้ตราวงกลมที่วาดด้วยโค้ด (SVG ด้านล่าง)
 *
 * อัปโหลดไฟล์โลโก้ได้ที่ `npm run admin` → แท็บ "ข้อมูลเว็บไซต์"
 * ถ้าไฟล์โลโก้มีชื่อแบรนด์อยู่ในรูปแล้ว ให้ติ๊ก "โลโก้มีชื่อแบรนด์ในรูปแล้ว"
 * เว็บจะซ่อนข้อความข้าง ๆ ให้ ไม่ให้ชื่อซ้ำกัน
 */
export default function Logo({ onDark = false, className = "" }: LogoProps) {
  const picked = onDark && images.logoDark.src ? images.logoDark : images.logo;
  const hasFile = Boolean(picked.src);

  /**
   * โลโก้แนวตั้ง (สูงกว่ากว้าง) ต้องการความสูงมากกว่าถึงจะอ่านออก
   * จึงแยกขนาดตามสัดส่วนของไฟล์ ไม่บังคับความสูงเดียวกันทั้งหมด
   */
  const ratio = picked.width && picked.height ? picked.width / picked.height : 3;
  const sizeClass =
    ratio >= 1.6
      ? "h-11 max-w-[13rem]" // โลโก้แนวนอน (มีชื่อแบรนด์ต่อท้าย)
      : ratio >= 0.95
        ? "h-13 max-w-[8rem]" // โลโก้ทรงจัตุรัส
        : "h-16 max-w-[7rem]"; // โลโก้แนวตั้ง

  /**
   * บนพื้นหลังเข้ม ถ้ายังไม่ได้อัปโหลดโลโก้เวอร์ชันสีอ่อน
   * ให้รองพื้นสีครีมไว้ กันโลโก้สีเข้มจมหายไปกับพื้นหลัง
   * (อัปโหลดโลโก้สีอ่อนใส่ช่อง logoDark แล้วพื้นรองนี้จะหายไปเอง)
   */
  const needsBackdrop = onDark && hasFile && !images.logoDark.src;

  const logoImage = hasFile ? (
    <Image
      src={asset(picked.src)}
      alt={picked.alt || `โลโก้ ${site.name}`}
      width={picked.width || 160}
      height={picked.height || 44}
      priority
      sizes="220px"
      className={`w-auto shrink-0 object-contain ${sizeClass}`}
    />
  ) : null;

  return (
    <span className={`flex items-center gap-2.5 ${className}`.trim()}>
      {hasFile ? (
        needsBackdrop ? (
          <span className="grid shrink-0 place-items-center rounded-full bg-cream-50 p-2 shadow-sm ring-1 ring-gold-500/30">
            {logoImage}
          </span>
        ) : (
          logoImage
        )
      ) : (
        <svg viewBox="0 0 64 64" className="size-11 shrink-0" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#33200f" />
          <circle cx="32" cy="32" r="30" fill="none" stroke="#c9a227" strokeWidth="3" />
          <circle
            cx="32"
            cy="32"
            r="24.5"
            fill="none"
            stroke="#d9b85c"
            strokeWidth="1.4"
            opacity=".75"
          />
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
      )}

      {/* ซ่อนข้อความถ้าไฟล์โลโก้มีชื่อแบรนด์อยู่ในรูปแล้ว */}
      {!(hasFile && images.logoHasText) && (
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
      )}
    </span>
  );
}
