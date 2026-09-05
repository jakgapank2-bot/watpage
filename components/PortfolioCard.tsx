import Image from "next/image";
import { BadgeCheck, Maximize2 } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { asset } from "@/lib/asset";

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
      className="group relative block h-full w-full overflow-hidden rounded-3xl bg-navy-800 text-start ring-1 ring-white/10 transition duration-300 hover:-translate-y-1.5 hover:ring-brand-400/60 focus-visible:-translate-y-1.5"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={asset(item.image)}
          alt={item.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/45 to-navy-950/5"
          aria-hidden="true"
        />

        {/* หมวดหมู่ + ปี */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-600/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            {item.category}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {item.year}
          </span>
        </div>

        {/* ไอคอนขยายภาพ (แสดงตอน hover) */}
        <span
          className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          <Maximize2 className="size-6" />
        </span>

        {/* ข้อความบนภาพ */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            {item.badge}
          </span>
          <h3 className="mt-2.5 text-lg font-extrabold text-white lg:text-xl">{item.title}</h3>
          <p className="text-sm font-medium text-brand-100/85">{item.description}</p>
        </div>
      </div>
    </button>
  );
}
