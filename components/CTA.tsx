import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { contact } from "@/data/site";
import { asset } from "@/lib/asset";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ภาพพื้นหลัง + ชั้นไล่สีให้ตัวอักษรอ่านง่าย */}
      <Image
        src={asset("/images/cta/cta-bg.svg")}
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950/95 via-navy-900/85 to-brand-700/70"
        aria-hidden="true"
      />

      <div className="container-page py-20 lg:py-24">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="text-center lg:text-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                พร้อมให้คำปรึกษา <span className="text-brand-300">ฟรี!</span>
              </h2>
              <p className="mt-4 text-lg text-brand-100/85">
                ให้เรื่องรถ เป็นเรื่องง่าย แค่เข้ามาคุยกับเรา
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <a
                  href={contact.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-navy-950/40 transition hover:-translate-y-0.5 hover:bg-brand-400"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  ปรึกษาฟรีตอนนี้
                </a>
                <a
                  href={contact.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-8 py-4 text-base font-bold text-white shadow-xl shadow-navy-950/40 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  แอดไลน์
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-medium text-brand-100/80">โทรหาเรา</span>
                    {contact.phone}
                  </span>
                </a>
              </div>
            </div>

            {/* QR Code สำหรับแอดไลน์ */}
            <div className="mx-auto w-full max-w-[16rem]">
              <div className="rounded-3xl bg-white/95 p-5 text-center shadow-2xl backdrop-blur">
                <Image
                  src={asset(contact.lineQr)}
                  alt={`QR Code สำหรับเพิ่มเพื่อนทาง LINE ${contact.lineId}`}
                  width={376}
                  height={376}
                  loading="lazy"
                  sizes="240px"
                  className="h-auto w-full rounded-2xl"
                />
                <p className="mt-3 text-sm font-bold text-navy-900">สแกนแอดไลน์</p>
                <p className="text-xs text-navy-900/60">ปรึกษาได้ทันที</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
