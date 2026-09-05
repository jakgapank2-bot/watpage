import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: string;
  /** true = ใช้บนพื้นหลังสีเข้ม (น้ำตาลเข้ม) */
  onDark?: boolean;
  align?: "center" | "start";
};

export default function SectionHeading({
  title,
  subtitle,
  onDark = false,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-[2.1rem] ${
          onDark ? "text-white" : "text-brown-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2.5 text-base ${onDark ? "text-brown-200" : "text-brown-800/65"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
