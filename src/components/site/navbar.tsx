"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "./i18n";
import LanguageToggle from "./language-toggle";

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#products", label: t("nav.products") },
    { href: "#previous-works", label: t("nav.portfolio") },
    { href: "#designs", label: t("nav.designs") },
    { href: "#showcase", label: t("nav.showcase") },
    { href: "#training", label: t("nav.training") },
    { href: "#credentials", label: t("nav.credentials") },
    { href: "#contact-form", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? "bg-[#05080f]/90 backdrop-blur-md border-b border-edge"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <span className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-neon-green/60 group-hover:border-neon-green transition-colors">
            <img
              src="/khalid-avatar.jpg"
              alt="Khalid Al-harbi - Cyber Security Expert"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-[#05080f] shadow-[0_0_6px_var(--neon-green)]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="mono-tech text-base md:text-lg text-glow-green">
              {t("brand.name")}
            </span>
            <span className="text-[9px] text-fg/50 hidden sm:block">
              {t("brand.role")}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-fg/80 hover:text-neon-green transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            className="lg:hidden p-2 text-fg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#05080f]/95 backdrop-blur-md border-b border-edge">
          <ul className="flex flex-col px-5 py-4 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-fg/80 hover:text-neon-green transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
