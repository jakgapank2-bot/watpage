import Image from "next/image";
import { ArrowRight, Heart, MessageCircle, ShieldCheck, Users, Zap } from "lucide-react";
import { asset } from "@/lib/asset";
import { images } from "@/data/images";
import { contact, heroHighlights, site } from "@/data/site";

const icons = {
  shield: ShieldCheck,
  users: Users,
  zap: Zap,
  heart: Heart,
} as const;

export default function Hero() {
  return (
    <section id="home" className="relative isolate scroll-mt-16 overflow-hidden">
      {/* ───── ภาพพื้นหลัง (เปลี่ยนได้ที่ data/images.ts → images.hero) ───── */}
      <Image
        src={asset(images.hero.src)}
        alt={images.hero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* ชั้นไล่สีให้ตัวอักษรฝั่งซ้ายอ่านง่าย */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brown-950/90 via-brown-950/28 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brown-950/40 via-transparent to-brown-950/8"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="flex min-h-[560px] flex-col justify-center pt-12 pb-8 lg:min-h-[600px] lg:pt-16">
          <div className="max-w-2xl animate-fade-up text-center lg:text-start">
            <h1 className="text-4xl leading-[1.15] font-extrabold tracking-tight text-white drop-shadow-[0_3px_12px_rgba(36,20,8,0.6)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              {site.name}
              <span className="mt-1.5 block">
                มากกว่าบริการ คือ{" "}
                <span className="whitespace-nowrap text-gold-400">“คู่คิด”</span>
              </span>
            </h1>

            <p className="mt-4 text-xl font-bold text-cream-100 drop-shadow-md sm:text-2xl">
              {site.tagline}
            </p>

            <p className="mt-2.5 text-base font-medium text-brown-200 sm:text-lg">
              สินเชื่อรถยนต์ <span className="mx-1.5 text-gold-400">|</span> ผ่อนง่าย{" "}
              <span className="mx-1.5 text-gold-400">|</span> อนุมัติไว
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3.5 text-base ring-1 ring-gold-500/45"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                ปรึกษาฟรี
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream-100/85 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-brown-800"
              >
                ดูผลงานของเรา
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ───── ข้อความลายมือมุมขวาบน (ซ่อนบนจอเล็ก) ───── */}
          <p
            className="script-gold pointer-events-none absolute top-16 right-10 hidden max-w-[16rem] text-right text-2xl leading-snug xl:block"
            aria-hidden="true"
          >
            “ทุกเส้นทาง...
            <br />
            เราพร้อมจัดให้”
          </p>

          {/* ───── แถบคำโปรยแนวตั้งฝั่งขวา ───── */}
          <p
            className="pointer-events-none absolute right-9 bottom-32 hidden text-right text-xs font-bold tracking-[0.3em] text-gold-300/90 uppercase xl:block"
            aria-hidden="true"
          >
            Teamwork
            <br />
            Trust
            <br />
            Finance Solution
          </p>

          {/* ───── 4 จุดเด่น (อยู่ในภาพ) ───── */}
          <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {heroHighlights.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.title}
                  className="flex animate-fade-up items-center gap-3"
                  style={{ animationDelay: `${180 + i * 90}ms` }}
                >
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-brown-950/70 text-gold-400 ring-1 ring-gold-500/40 backdrop-blur"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-white drop-shadow">
                      {item.title}
                    </span>
                    <span className="block text-[13px] text-brown-200">{item.subtitle}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
