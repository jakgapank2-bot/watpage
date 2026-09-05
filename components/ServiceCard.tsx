import Image from "next/image";
import { ArrowRight, Car, Check, FileText, Zap } from "lucide-react";
import { asset } from "@/lib/asset";
import type { Service } from "@/data/services";

/** ไอคอนวงกลมสีขาวที่คร่อมขอบล่างของรูป */
const icons = {
  car: Car,
  file: FileText,
  bolt: Zap,
} as const;

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_36px_-24px_rgba(36,20,8,0.55)] ring-1 ring-brown-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-26px_rgba(36,20,8,0.6)]">
      {/* ───── รูปด้านบน (เปลี่ยนได้ที่ data/services.ts) ───── */}
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={asset(service.image)}
          alt={service.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* เลขลำดับมุมซ้ายบน */}
        <span
          className="absolute top-4 left-4 grid size-12 place-items-center rounded-full bg-brown-800/90 text-lg font-extrabold text-gold-400 ring-2 ring-gold-500/50 backdrop-blur"
          aria-hidden="true"
        >
          {service.number}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-6 pt-9 pb-6">
        {/* ไอคอนวงกลมคร่อมขอบรูป */}
        <span
          className="absolute -top-7 left-6 grid size-14 place-items-center rounded-full bg-white text-brown-700 shadow-[0_8px_20px_-8px_rgba(36,20,8,0.5)] ring-1 ring-brown-100"
          aria-hidden="true"
        >
          <Icon className="size-6" />
        </span>

        <h3 className="text-xl font-extrabold text-brown-900">{service.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-brown-800/65">
          {service.description}
        </p>

        <ul className="mt-4 space-y-2">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-[15px] text-brown-900/85">
              <span
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brown-700 text-white"
                aria-hidden="true"
              >
                <Check className="size-3" strokeWidth={3.5} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex justify-end pt-6">
          <a
            href="#contact"
            aria-label={`สอบถามเพิ่มเติมเกี่ยวกับบริการ${service.title}`}
            className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brown-600 to-brown-800 text-white shadow-[0_10px_22px_-12px_rgba(36,20,8,0.7)] transition hover:scale-105 hover:brightness-110"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
