import { site } from "@/data/site";

type LogoProps = {
  /** true = โทนสำหรับพื้นหลังเข้ม (Footer) */
  onDark?: boolean;
  className?: string;
};

/** โลโก้ "วัฒน์จัดให้" — ไอคอนรถ + ชื่อแบรนด์ + tagline */
export default function Logo({ onDark = false, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`.trim()}>
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-2xl shadow-sm ${
          onDark ? "bg-white/10 ring-1 ring-white/20" : "bg-brand-600"
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-6 text-white" fill="none">
          <path
            d="M4.5 16.5v1.75a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75V16.5m17 0v1.75a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75V16.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M3.2 16.5h17.6a.7.7 0 0 0 .7-.7v-3.05c0-1.2-.8-2.25-1.96-2.55l-1.62-.42-2.2-3.05A2.6 2.6 0 0 0 13.6 5.7H9.1c-.9 0-1.74.44-2.24 1.2L5 10.05l-1.34.4A2.1 2.1 0 0 0 2.5 12.5v3.3c0 .39.31.7.7.7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M6.2 10.2h11.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="7" cy="13.4" r="1.15" fill="currentColor" />
          <circle cx="17" cy="13.4" r="1.15" fill="currentColor" />
        </svg>
      </span>

      <span className="flex flex-col leading-tight">
        <span
          className={`text-lg font-extrabold tracking-tight sm:text-xl ${
            onDark ? "text-white" : "text-navy-900"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`text-[11px] font-medium sm:text-xs ${
            onDark ? "text-brand-200" : "text-navy-900/55"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
