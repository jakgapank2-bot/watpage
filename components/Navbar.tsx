"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import Logo from "./Logo";
import { contact, navLinks, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  /* เปลี่ยนสไตล์ Navbar เมื่อเลื่อนลง */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ไฮไลต์เมนูตาม section ที่กำลังดูอยู่ */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ล็อกการเลื่อนหน้าจอ + ปิดด้วยปุ่ม Esc ขณะเปิดเมนูมือถือ */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-navy-900/5 bg-white/95 shadow-[0_10px_30px_-18px_rgba(8,28,63,0.45)] backdrop-blur"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between py-3" aria-label="เมนูหลัก">
        <a href="#home" className="shrink-0" aria-label={`${site.name} - กลับไปด้านบน`}>
          <Logo />
        </a>

        {/* เมนู Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                    isActive
                      ? "text-brand-600"
                      : "text-navy-900/75 hover:text-brand-600"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 sm:inline-flex"
          >
            <MessageCircle className="size-[18px]" aria-hidden="true" />
            ปรึกษาฟรี
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            className="grid size-11 place-items-center rounded-2xl border border-navy-900/10 bg-white text-navy-900 transition hover:border-brand-300 hover:text-brand-600 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* เมนู Mobile */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-navy-900/5 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors ${
                  active === link.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-navy-900/80 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/25"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              ปรึกษาฟรี
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
