import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/data/services";
import { asset } from "@/lib/asset";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/5 bg-white shadow-[0_18px_40px_-28px_rgba(8,28,63,0.45)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_30px_60px_-30px_rgba(8,28,63,0.5)]">
      {/* รูปภาพด้านบน */}
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={asset(service.image)}
          alt={service.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-4 left-4 grid size-14 place-items-center rounded-2xl bg-brand-600 text-xl font-extrabold text-white shadow-lg shadow-navy-900/30 ring-4 ring-white/25"
          aria-hidden="true"
        >
          {service.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="text-xl font-extrabold text-navy-900 lg:text-[1.375rem]">
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-navy-900/65">
          {service.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-[15px] text-navy-900/80">
              <span
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white"
                aria-hidden="true"
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex justify-end pt-7">
          <a
            href="#contact"
            aria-label={`สอบถามเพิ่มเติมเกี่ยวกับบริการ${service.title}`}
            className="grid size-12 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/25 transition group-hover:bg-brand-700 hover:scale-105"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
