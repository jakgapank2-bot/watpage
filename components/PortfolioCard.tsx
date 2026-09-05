import Image from "next/image";
import { BadgeCheck, CalendarDays, Maximize2 } from "lucide-react";
import { asset } from "@/lib/asset";
import type { PortfolioItem } from "@/data/portfolio";

type PortfolioCardProps = {
  item: PortfolioItem;
  /** เปิด Lightbox เมื่อคลิกที่การ์ด */
  onOpen: () => void;
};

export default function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`ดูภาพผลงาน ${item.title} - ${item.description}`}
      className="group block h-full w-full overflow-hidden rounded-2xl bg-white text-start shadow-[0_16px_36px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1.5 hover:ring-gold-500/60 focus-visible:-translate-y-1.5"
    >
      {/* ───── รูปผลงาน (เปลี่ยนได้ที่ data/portfolio.ts) ───── */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={asset(item.image)}
          alt={item.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 290px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* ป้ายหมวดหมู่มุมซ้ายบน */}
        <span className="absolute top-3 left-3 rounded-md bg-brown-300 px-2.5 py-1 text-xs font-bold text-brown-900 shadow">
          {item.category}
        </span>

        {/* ไอคอนขยายภาพตอน hover */}
        <span
          className="absolute inset-0 grid place-items-center bg-brown-950/35 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <span className="grid size-12 place-items-center rounded-full bg-white/25 text-white backdrop-blur">
            <Maximize2 className="size-5" />
          </span>
        </span>
      </div>

      {/* ───── รายละเอียดใต้ภาพ ───── */}
      <div className="px-4 pt-3 pb-3.5">
        <h3 className="text-[15px] font-extrabold text-brown-900">{item.title}</h3>
        <p className="mt-0.5 text-[13px] text-brown-800/60">{item.description}</p>

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-brown-100 pt-2.5">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brown-800/60">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {item.date}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[12px] font-bold text-emerald-700">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            {item.badge}
          </span>
        </div>
      </div>
    </button>
  );
}
