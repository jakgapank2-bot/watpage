import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";
import { images } from "@/data/images";
import { contact } from "@/data/site";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ───── ภาพพื้นหลัง (เปลี่ยนได้ที่ data/images.ts → images.cta) ───── */}
      <Image
        src={asset(images.cta.src)}
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brown-950/88 via-brown-950/55 to-brown-900/25"
        aria-hidden="true"
      />

      <div className="container-page py-14 lg:py-16">
        <Reveal>
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-start">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.35rem]">
                พร้อมให้คำปรึกษา <span className="text-gold-400">ฟรี!</span>
              </h2>
              <p className="mt-2.5 text-base text-brown-200 sm:text-lg">
                ให้เรื่องรถ เป็นเรื่องง่าย แค่เข้ามาคุยกับเรา
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <a
                  href={contact.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-7 py-3.5 text-base ring-1 ring-gold-500/45"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  ปรึกษาฟรีตอนนี้
                </a>
                <a
                  href={contact.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-14px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  แอดไลน์
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brown-950/80 px-7 py-3.5 text-base font-bold text-white ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-brown-950"
                >
                  <Phone className="size-5 text-gold-400" aria-hidden="true" />
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* ข้อความลายมือฝั่งขวา */}
            <p className="script-gold shrink-0 text-2xl leading-snug lg:text-right lg:text-[1.75rem]">
              “เรื่องรถ...
              <br />
              ไว้ใจ วัฒน์จัดให้”
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
