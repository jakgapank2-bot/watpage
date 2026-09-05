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

/**
 * Hero — ใช้ไฟล์ภาพแบนเนอร์ที่มีข้อความฝังมาในรูปแล้ว
 * จึงไม่วางข้อความ HTML ทับ (จะซ้อนกันจนอ่านไม่ออก)
 *
 * • หัวข้อจริงยังมีอยู่ในรูปแบบ sr-only เพื่อ SEO และ screen reader
 * • ปุ่ม CTA อยู่ในแถบใต้ภาพ เพราะในภาพไม่มีปุ่มให้กด
 * • 4 จุดเด่นแสดงซ้ำเป็น HTML เฉพาะจอเล็ก เพราะตัวอักษรในภาพจะเล็กเกินอ่าน
 *
 * ถ้าเปลี่ยนไปใช้ภาพที่ "ไม่มีตัวหนังสือ" ให้ย้ายข้อความกลับมาทับบนภาพได้
 */
export default function Hero() {
  return (
    <section id="home" className="scroll-mt-16 bg-brown-950">
      {/* หัวข้อสำหรับ SEO / screen reader (ข้อความจริงอยู่ในภาพ) */}
      <h1 className="sr-only">
        {site.name} มากกว่าบริการ คือ “คู่คิด” — {site.tagline}
      </h1>

      {/* ───── ภาพแบนเนอร์ (เปลี่ยนได้ที่ data/images.ts → images.hero) ───── */}
      <Image
        src={asset(images.hero.src)}
        alt={images.hero.alt}
        width={images.hero.width}
        height={images.hero.height}
        priority
        sizes="100vw"
        /* จอเล็ก: ครอปแถบ 4 จุดเด่นด้านล่างของภาพออก (แสดงเป็น HTML แทน) */
        className="aspect-[1983/645] w-full object-cover object-top lg:aspect-auto lg:h-auto lg:object-fill"
      />

      {/* ───── แถบปุ่มใต้ภาพ ───── */}
      <div className="bg-gradient-to-r from-brown-950 via-brown-900 to-brown-800">
        <div className="container-page flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-center">
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full px-8 py-3.5 text-base ring-1 ring-gold-500/45 sm:w-auto"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            ปรึกษาฟรี
          </a>
          <a
            href="#portfolio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-cream-100/85 bg-white/10 px-8 py-3.5 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brown-800 sm:w-auto"
          >
            ดูผลงานของเรา
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>

        {/* 4 จุดเด่น — เฉพาะจอเล็ก (บนจอใหญ่อ่านได้จากในภาพแล้ว) */}
        <ul className="container-page grid grid-cols-1 gap-3 pb-6 sm:grid-cols-2 lg:hidden">
          {heroHighlights.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex items-center gap-3">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-brown-800 text-gold-400 ring-1 ring-gold-500/40"
                  aria-hidden="true"
                >
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-white">{item.title}</span>
                  <span className="block text-[13px] text-brown-200">{item.subtitle}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
