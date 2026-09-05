"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { contact } from "@/data/site";

/**
 * ปุ่มลอย "ปรึกษาฟรี" มุมขวาล่าง (แสดงเฉพาะจอเล็ก)
 * กดแล้วเลือกได้ว่าจะแอดไลน์ หรือโทรหาเรา
 */
export default function FloatingContact() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-60 flex flex-col items-end gap-3 transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {open && (
        <div className="flex animate-fade-up flex-col gap-2.5">
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full bg-[#06C755] px-5 py-3.5 text-[15px] font-bold text-white shadow-xl"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            แอดไลน์
          </a>
          <a
            href={contact.phoneHref}
            className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3.5 text-[15px] font-bold text-brown-900 shadow-xl ring-1 ring-brown-200"
          >
            <Phone className="size-5 text-brown-700" aria-hidden="true" />
            {contact.phone}
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "ปิดช่องทางติดต่อ" : "เปิดช่องทางติดต่อ ปรึกษาฟรี"}
        className="btn-primary px-6 py-4 text-base ring-1 ring-gold-500/45"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5" aria-hidden="true" />
        )}
        {open ? "ปิด" : "ปรึกษาฟรี"}
      </button>
    </div>
  );
}
