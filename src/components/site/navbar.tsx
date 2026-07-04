"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#services", label: "خدماتنا" },
  { href: "#tools", label: "أدواتنا" },
  { href: "#portfolio", label: "أعمالنا" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <a href="#home" className="font-mono text-xl md:text-2xl text-glow-green">
          &lt;EliteTech/&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
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

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-fg"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#05080f]/95 backdrop-blur-md border-b border-edge">
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
