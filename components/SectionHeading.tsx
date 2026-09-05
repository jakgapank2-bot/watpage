import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** ข้อความเล็กด้านบน เช่น OUR SERVICES */
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  /** true = ใช้บนพื้นหลังสีเข้ม (Navy) */
  onDark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-sm font-extrabold tracking-[0.28em] uppercase ${
          onDark ? "text-brand-300" : "text-brand-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          onDark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            onDark ? "text-brand-100/80" : "text-navy-900/60"
          }`}
        >
          {subtitle}
        </p>
      )}
      <span
        className={`mx-auto mt-6 block h-1 w-16 rounded-full ${
          onDark ? "bg-brand-400" : "bg-brand-600"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
