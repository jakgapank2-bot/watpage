import Image from "next/image";
import { CheckCircle2, Clock, Info, MessageSquareText } from "lucide-react";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";
import { aboutFeatures } from "@/data/site";

const icons = {
  message: MessageSquareText,
  check: CheckCircle2,
  clock: Clock,
  info: Info,
} as const;

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- ภาพ ---------- */}
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/5">
                <Image
                  src={asset("/images/about/about-main.svg")}
                  alt="ภาพประกอบทีมงานวัฒน์จัดให้ที่ดูแลเรื่องรถและเอกสารให้ลูกค้า"
                  width={900}
                  height={700}
                  loading="lazy"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="h-auto w-full"
                />
              </div>

              <div className="absolute -right-2 -bottom-6 rounded-2xl bg-brand-600 px-6 py-5 text-white shadow-xl shadow-brand-600/30 sm:right-6">
                <p className="text-3xl font-extrabold">10+</p>
                <p className="text-sm font-medium text-brand-100">ปีของประสบการณ์</p>
              </div>
            </div>
          </Reveal>

          {/* ---------- ข้อความ ---------- */}
          <Reveal delay={120}>
            <div>
              <p className="text-sm font-extrabold tracking-[0.28em] text-brand-600 uppercase">
                About Us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                ทำไมลูกค้าถึงเลือกวัฒน์จัดให้
              </h2>

              <p className="mt-6 text-lg font-semibold text-navy-900/80">
                เราเชื่อว่าเรื่องรถและเรื่องเงิน ไม่ควรเป็นเรื่องที่ยุ่งยาก
              </p>
              <p className="mt-3 text-base leading-relaxed text-navy-900/60">
                วัฒน์จัดให้ พร้อมช่วยดูแลตั้งแต่การให้คำปรึกษา การจัดไฟแนนซ์ การติดตามงาน
                ไปจนถึงขั้นตอนต่าง ๆ ที่เกี่ยวข้อง เพื่อให้คุณใช้เวลากับเรื่องสำคัญอื่นได้เต็มที่
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {aboutFeatures.map((feature) => {
                  const Icon = icons[feature.icon];
                  return (
                    <li
                      key={feature.title}
                      className="rounded-2xl border border-navy-900/5 bg-brand-50/50 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50"
                    >
                      <span
                        className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white"
                        aria-hidden="true"
                      >
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-3.5 text-base font-bold text-navy-900">{feature.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-900/60">
                        {feature.detail}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
