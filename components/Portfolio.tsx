"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { portfolioItems, portfolioStats } from "@/data/portfolio";
import { asset } from "@/lib/asset";

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* ---------- Carousel ---------- */
  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    let nearest = 0;
    let min = Number.POSITIVE_INFINITY;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < min) {
        min = distance;
        nearest = i;
      }
    });

    setIndex(nearest);
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncState();
    track.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);
    return () => {
      track.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  const scrollToCard = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  /* ---------- Lightbox ---------- */
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const shiftLightbox = useCallback(
    (direction: -1 | 1) =>
      setLightbox((current) =>
        current === null
          ? current
          : (current + direction + portfolioItems.length) % portfolioItems.length,
      ),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") shiftLightbox(1);
      if (e.key === "ArrowLeft") shiftLightbox(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, shiftLightbox]);

  const current = lightbox === null ? null : portfolioItems[lightbox];

  return (
    <section id="portfolio" className="relative scroll-mt-20 overflow-hidden bg-navy-900 py-20 lg:py-28">
      {/* แสงตกแต่งพื้นหลัง */}
      <div
        className="absolute -top-32 right-0 size-[30rem] rounded-full bg-brand-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-brand-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container-page">
        <Reveal>
          <SectionHeading
            onDark
            eyebrow="Our Portfolio"
            title="ผลงานที่ผ่านมา"
            subtitle="ความสำเร็จของลูกค้า คือความภูมิใจของเรา"
          />
        </Reveal>

        {/* สถิติ */}
        <Reveal delay={120}>
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
            {portfolioStats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl bg-white/5 px-5 py-4 text-center ring-1 ring-white/10"
              >
                <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-brand-100/70">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ปุ่มควบคุม Carousel (Desktop) */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-brand-100/70">
            เลื่อนดูผลงานทั้งหมด {portfolioItems.length} รายการ
          </p>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edges.start}
              aria-label="ผลงานก่อนหน้า"
              className="grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/10"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={edges.end}
              aria-label="ผลงานถัดไป"
              className="grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/10"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* รางเลื่อนผลงาน */}
        <div
          ref={trackRef}
          className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pt-2 pb-4 lg:-mx-8 lg:px-8"
          role="group"
          aria-label="ผลงานที่ผ่านมา"
        >
          {portfolioItems.map((item, i) => (
            <div
              key={item.id}
              className="w-[82%] shrink-0 snap-start sm:w-[54%] lg:w-[calc((100%-3rem)/3)]"
            >
              <PortfolioCard item={item} onOpen={() => setLightbox(i)} />
            </div>
          ))}
        </div>

        {/* จุดบอกตำแหน่ง */}
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {portfolioItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`ไปยังผลงานที่ ${i + 1}`}
              aria-current={index === i ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === i ? "w-8 bg-brand-400" : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-navy-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            อยากให้ผลงานชิ้นต่อไปเป็นของคุณ
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* ---------- Lightbox ---------- */}
      {current && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`ภาพผลงาน ${current.title}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="ปิดภาพ"
            autoFocus
            className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            <X className="size-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              shiftLightbox(-1);
            }}
            aria-label="ภาพก่อนหน้า"
            className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              shiftLightbox(1);
            }}
            aria-label="ภาพถัดไป"
            className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>

          <figure
            className="w-full max-w-4xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={asset(current.image)}
              alt={current.imageAlt}
              width={1000}
              height={700}
              sizes="(max-width: 1024px) 92vw, 900px"
              className="h-auto w-full rounded-2xl shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <p className="text-sm font-semibold text-brand-300">
                {current.category} · {current.year}
              </p>
              <p className="mt-1 text-xl font-extrabold text-white">{current.title}</p>
              <p className="text-sm text-brand-100/70">{current.description}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
