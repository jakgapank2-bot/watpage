import Image from "next/image";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SocialIcons from "./SocialIcons";
import { contact } from "@/data/site";
import { asset } from "@/lib/asset";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Contact Us"
            title="ติดต่อเรา"
            subtitle="ปรึกษาได้ทุกเรื่องรถ ทุกเรื่องเงิน ยินดีให้คำแนะนำโดยไม่มีค่าใช้จ่าย"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
          {/* ---------- ข้อมูลติดต่อ ---------- */}
          <Reveal className="h-full">
            <div className="grid h-full gap-4 sm:grid-cols-2">
              <a
                href={contact.phoneHref}
                className="group rounded-3xl border border-navy-900/5 bg-brand-50/50 p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span
                  className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-white"
                  aria-hidden="true"
                >
                  <Phone className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-navy-900/50 uppercase">
                  โทรศัพท์
                </h3>
                <p className="mt-1 text-xl font-extrabold text-navy-900 group-hover:text-brand-700">
                  {contact.phone}
                </p>
              </a>

              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-navy-900/5 bg-brand-50/50 p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span
                  className="grid size-12 place-items-center rounded-2xl bg-[#06C755] text-white"
                  aria-hidden="true"
                >
                  <MessageCircle className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-navy-900/50 uppercase">
                  LINE
                </h3>
                <p className="mt-1 text-xl font-extrabold text-navy-900 group-hover:text-brand-700">
                  {contact.lineId}
                </p>
              </a>

              <div className="rounded-3xl border border-navy-900/5 bg-brand-50/50 p-6">
                <span
                  className="grid size-12 place-items-center rounded-2xl bg-navy-800 text-white"
                  aria-hidden="true"
                >
                  <Clock className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-navy-900/50 uppercase">
                  เวลาทำการ
                </h3>
                <ul className="mt-1.5 space-y-1">
                  {contact.hours.map((slot) => (
                    <li key={slot.day} className="text-[15px] text-navy-900/75">
                      <span className="font-bold text-navy-900">{slot.day}</span> · {slot.time}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-navy-900/5 bg-brand-50/50 p-6">
                <span
                  className="grid size-12 place-items-center rounded-2xl bg-navy-800 text-white"
                  aria-hidden="true"
                >
                  <MapPin className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-navy-900/50 uppercase">
                  พื้นที่ให้บริการ
                </h3>
                <p className="mt-1 text-[15px] text-navy-900/75">{contact.address}</p>

                <div className="mt-5">
                  <p className="mb-2.5 text-sm font-bold text-navy-900/50">ติดตามเรา</p>
                  <SocialIcons />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------- QR Code ---------- */}
          <Reveal delay={140} className="h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-navy-900 p-8 text-center shadow-2xl shadow-navy-900/25">
              <p className="text-sm font-extrabold tracking-[0.22em] text-brand-300 uppercase">
                Add LINE
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white">แอดไลน์ ปรึกษาได้ทันที</h3>

              <div className="mt-6 w-full max-w-[15rem] rounded-3xl bg-white p-4 shadow-xl">
                <Image
                  src={asset(contact.lineQr)}
                  alt={`QR Code สำหรับเพิ่มเพื่อนทาง LINE ${contact.lineId}`}
                  width={376}
                  height={376}
                  loading="lazy"
                  sizes="240px"
                  className="h-auto w-full rounded-2xl"
                />
              </div>

              <p className="mt-5 text-sm text-brand-100/70">
                สแกน QR หรือกดปุ่มด้านล่างเพื่อเริ่มแชท
              </p>
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full max-w-[15rem] items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3.5 text-base font-bold text-white transition hover:brightness-110"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                แอดไลน์เลย
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
