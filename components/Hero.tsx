import Image from "next/image";
import { ArrowRight, Heart, MessageCircle, ShieldCheck, Users, Zap } from "lucide-react";
import { contact, heroHighlights, site } from "@/data/site";
import { asset } from "@/lib/asset";

const icons = {
  shield: ShieldCheck,
  users: Users,
  zap: Zap,
  heart: Heart,
} as const;

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-20">
      {/* พื้นหลังไล่สีฟ้าอ่อน + วงกลมตกแต่ง */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-brand-50 via-white to-white" />
      <div
        className="absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-brand-200/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 -left-40 -z-10 size-[28rem] rounded-full bg-brand-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="grid items-center gap-10 pt-12 pb-4 lg:min-h-[560px] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16">
          {/* ---------- ข้อความ ---------- */}
          <div className="animate-fade-up text-center lg:text-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
              <span className="size-2 rounded-full bg-brand-500" aria-hidden="true" />
              ทุกเส้นทาง... เราพร้อมจัดให้
            </span>

            <h1 className="mt-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.1]">
              {site.name}
              <span className="mt-2 block text-brand-600">
                มากกว่าบริการ คือ <span className="whitespace-nowrap">“คู่คิด”</span>
              </span>
            </h1>

            <p className="mt-5 text-lg font-medium text-navy-900/70 sm:text-xl">
              {site.tagline}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-navy-900/60 lg:mx-0">
              {site.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                ปรึกษาฟรี
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-900/10 bg-white px-8 py-4 text-base font-bold text-navy-900 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
              >
                ดูผลงานของเรา
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ---------- ภาพประกอบ ---------- */}
          <div className="relative animate-fade-in lg:animate-fade-up">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/25 ring-1 ring-navy-900/5">
              <Image
                src={asset("/images/hero/hero-main.svg")}
                alt="ภาพประกอบบริการของวัฒน์จัดให้ รถยนต์และสถานีชาร์จรถไฟฟ้า"
                width={960}
                height={640}
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="h-auto w-full"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-navy-950/20 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* ป้ายลอยบนภาพ */}
            <div className="absolute -bottom-5 left-4 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-navy-900/15 ring-1 ring-navy-900/5 sm:left-8">
              <p className="text-sm font-semibold text-navy-900/60">พร้อมดูแลคุณ</p>
              <p className="text-lg font-extrabold text-brand-600">ทุกเส้นทาง</p>
            </div>
          </div>
        </div>

        {/* ---------- 4 จุดเด่น ---------- */}
        <ul className="mt-12 grid grid-cols-1 gap-3 pb-16 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {heroHighlights.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                className="animate-fade-up flex items-center gap-4 rounded-2xl border border-navy-900/5 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10"
                style={{ animationDelay: `${150 + i * 90}ms` }}
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"
                  aria-hidden="true"
                >
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block text-base font-bold text-navy-900">{item.title}</span>
                  <span className="block text-sm text-navy-900/60">{item.subtitle}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
