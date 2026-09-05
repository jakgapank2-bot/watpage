import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page py-12 lg:py-14">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo onDark />

          <nav aria-label="เมนูส่วนท้าย">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[15px]">
              {navLinks.map((link, i) => (
                <li key={link.href} className="flex items-center gap-2">
                  <a
                    href={link.href}
                    className="rounded-full px-2 py-1 font-medium text-brand-100/75 transition-colors hover:text-white"
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

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-brand-100/60">
            © {site.copyrightYear} {site.name}. สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
}
