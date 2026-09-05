import { Clock, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { contact, navLinks, site } from "@/data/site";

/**
 * Footer + แถบข้อมูลติดต่อ
 * มี id="contact" เพื่อให้เมนู "ติดต่อเรา" เลื่อนมาที่นี่
 */
export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 bg-brown-950 text-white">
      <div className="container-page py-9">
        {/* ───── แถวบน: โลโก้ / เมนู / โซเชียล ───── */}
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <Logo onDark />

          <nav aria-label="เมนูส่วนท้าย">
            <ul className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-[15px]">
              {navLinks.map((link, i) => (
                <li key={link.href} className="flex items-center gap-1.5">
                  <a
                    href={link.href}
                    className="px-1.5 py-1 font-medium text-brown-100/75 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                  {i < navLinks.length - 1 && (
                    <span className="text-white/20" aria-hidden="true">
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <SocialIcons onDark />
        </div>
      </div>

      {/* ───── แถบล่าง: ข้อมูลติดต่อ + copyright ───── */}
      <div className="border-t border-white/10 bg-brown-950">
        <div className="container-page flex flex-col items-center gap-3 py-4 text-center text-sm lg:flex-row lg:justify-between lg:text-start">
          <ul className="flex flex-col items-center gap-x-7 gap-y-2 sm:flex-row">
            <li>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 font-semibold text-brown-100 transition hover:text-gold-400"
              >
                <Phone className="size-4 text-gold-400" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-brown-100 transition hover:text-gold-400"
              >
                <MessageCircle className="size-4 text-[#06C755]" aria-hidden="true" />
                {contact.lineId}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-brown-100/75">
              <Clock className="size-4 text-gold-400" aria-hidden="true" />
              {contact.hours}
            </li>
          </ul>

          <p className="text-brown-100/55">
            © {site.copyrightYear} {site.name}. สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
}
