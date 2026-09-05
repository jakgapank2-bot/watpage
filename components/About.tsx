import Image from "next/image";
import { ArrowRight, Info, MessageSquareText, Settings2, Users, Zap } from "lucide-react";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";
import { images } from "@/data/images";
import { aboutFeatures } from "@/data/site";

const icons = {
  message: MessageSquareText,
  users: Users,
  gear: Settings2,
  zap: Zap,
  info: Info,
} as const;

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-cream-100 py-16 lg:py-20">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.05fr_0.85fr] lg:gap-10">
          {/* ───── 1. ภาพ (เปลี่ยนได้ที่ data/images.ts → images.about) ───── */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-[0_18px_40px_-24px_rgba(36,20,8,0.6)] ring-1 ring-brown-200">
              <Image
                src={asset(images.about.src)}
                alt={images.about.alt}
                width={images.about.width}
                height={images.about.height}
                loading="lazy"
                sizes="(max-width: 1024px) 92vw, 30vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          {/* ───── 2. ข้อความ ───── */}
          <Reveal delay={100}>
            <div className="text-center lg:text-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-brown-900 sm:text-[2.1rem]">
                ทำไมลูกค้าถึงเลือกวัฒน์จัดให้
              </h2>

              <p className="mt-4 text-lg leading-snug font-bold text-brown-800">
                “เราเชื่อว่าเรื่องรถและเรื่องเงิน
                <br className="hidden sm:block" /> ไม่ควรเป็นเรื่องที่ยุ่งยาก”
              </p>

              <p className="mt-3 text-[15px] leading-relaxed text-brown-800/65">
                วัฒน์จัดให้ พร้อมช่วยดูแลตั้งแต่การให้คำปรึกษา การจัดไฟแนนซ์ การติดตามงาน
                ไปจนถึงขั้นตอนต่าง ๆ ที่เกี่ยวข้อง ด้วยทีมงานมืออาชีพ และการบริการที่จริงใจ
              </p>

              <a href="#contact" className="btn-primary mt-6 px-7 py-3 text-[15px]">
                รู้จักเรามากขึ้น
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* ───── 3. รายการจุดเด่น ───── */}
          <Reveal delay={180}>
            <ul className="space-y-2.5">
              {aboutFeatures.map((feature) => {
                const Icon = icons[feature.icon];
                return (
                  <li
                    key={feature.title}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-brown-100 transition hover:-translate-y-0.5 hover:ring-gold-400"
                  >
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-lg bg-brown-50 text-brown-700"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[15px] font-bold text-brown-900">{feature.title}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
