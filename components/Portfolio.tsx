"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";
import { portfolioCategories, portfolioItems } from "@/data/portfolio";

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>(portfolioCategories[0]);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* รายการที่ผ่านตัวกรองหมวดหมู่ */
  const list = useMemo(
    () =>
      filter === portfolioCategories[0]
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === filter),
    [filter],
  );

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

  /* เปลี่ยนหมวด แล้วเลื่อนรางกลับไปเริ่มต้น */
  const changeFilter = (category: string) => {
    setFilter(category);
    setIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

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
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  /* ---------- Lightbox ---------- */
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const shiftLightbox = useCallback(
    (direction: -1 | 1) =>
      setLightbox((current) =>
        current === null ? current : (current + direction + list.length) % list.length,
      ),
    [list.length],
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

  const current = lightbox === null ? null : list[lightbox];

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-br from-brown-900 via-brown-800 to-brown-700 py-16 lg:py-20"
    >
      <div className="relative container-page">
        {/* ───── หัวข้อ + ลิงก์ขวา ───── */}
        <Reveal>
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1 text-center lg:text-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.1rem]">
                ผลงานของเรา
              </h2>
              <p className="mt-2 text-[15px] text-brown-200">
                ตัวอย่างผลงานจริงในแต่ละบริการ ที่เราภูมิใจ
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-gold-300 transition hover:text-gold-400"
            >
              ดูผลงานทั้งหมด
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* ───── ปุ่มกรองหมวดหมู่ ───── */}
        <Reveal delay={100}>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => changeFilter(category)}
                aria-pressed={filter === category}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  filter === category
                    ? "bg-brown-300 text-brown-900 shadow"
                    : "bg-white/10 text-brown-100 ring-1 ring-white/15 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ───── รางเลื่อน + ปุ่มลูกศรสองข้าง ───── */}
        <div className="relative mt-7">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="ผลงานก่อนหน้า"
            className="absolute top-1/2 -left-2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-brown-300 text-brown-900 shadow-lg transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40 sm:grid lg:-left-4"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="ผลงานถัดไป"
            className="absolute top-1/2 -right-2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-brown-300 text-brown-900 shadow-lg transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40 sm:grid lg:-right-4"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 lg:mx-0 lg:px-0"
            role="group"
            aria-label="ผลงานที่ผ่านมา"
          >
            {list.map((item, i) => (
              <div
                key={item.id}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3.75rem)/4)]"
              >
                <PortfolioCard item={item} onOpen={() => setLightbox(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* ───── จุดบอกตำแหน่ง ───── */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {list.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`ไปยังผลงานที่ ${i + 1}`}
              aria-current={index === i ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? "w-6 bg-gold-400" : "w-2 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ───── Lightbox ───── */}
      {current && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-brown-950/93 p-4 backdrop-blur-sm"
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

          <figure className="w-full max-w-4xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <Image
              src={asset(current.image)}
              alt={current.imageAlt}
              width={1000}
              height={700}
              sizes="(max-width: 1024px) 92vw, 900px"
              className="h-auto w-full rounded-xl shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <p className="text-sm font-semibold text-gold-400">
                {current.category} · {current.date}
              </p>
              <p className="mt-1 text-xl font-extrabold text-white">{current.title}</p>
              <p className="text-sm text-brown-200">{current.description}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
