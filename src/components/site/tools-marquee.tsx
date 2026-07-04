"use client";

import { useI18n } from "./i18n";

const TOOLS = [
  // === Credentials & Education platforms ===
  {
    name: "IBM",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg",
  },
  {
    name: "Cisco",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cisco/cisco-original.svg",
  },
  // === Cyber security tools ===
  {
    name: "Kali Linux",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kali/kali-linux-wordmark.svg",
  },
  // === Programming & frameworks ===
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Flutter",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  // === Databases & web ===
  {
    name: "MySQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "WordPress",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  // === Design & media ===
  {
    name: "Photoshop",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  },
  {
    name: "Premiere Pro",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg",
  },
];

/**
 * Platforms that don't have devicon SVGs — rendered as branded text chips.
 */
const TEXT_PLATFORMS = [
  { name: "Coventry University", color: "#00ffcc" },
  { name: "FutureLearn", color: "#de00a5" },
  { name: "Credly", color: "#ff6c00" },
  { name: "TryHackMe", color: "#88cc14" },
  { name: "CPD UK", color: "#00a8e8" },
  { name: "Alison", color: "#00ffcc" },
];

export default function ToolsMarquee() {
  const { t } = useI18n();
  // Duplicate both lists for seamless infinite scroll
  const loop = [...TOOLS, ...TOOLS];
  const textLoop = [...TEXT_PLATFORMS, ...TEXT_PLATFORMS];

  return (
    <section
      id="tools"
      className="relative py-14 bg-[#05080f]/80 backdrop-blur-sm border-y border-edge overflow-hidden"
    >
      <p className="text-center mono-tech text-xs text-fg/50 tracking-[0.3em] mb-7">
        {t("tools.eyebrow")}
      </p>

      {/* Row 1: Devicon logos */}
      <div className="relative mb-5">
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#05080f] to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#05080f] to-transparent pointer-events-none" />
        <div className="flex gap-14 animate-marquee w-max items-center">
          {loop.map((tool, i) => (
            <div
              key={`img-${i}`}
              className="shrink-0 w-20 h-20 flex items-center justify-center opacity-65 hover:opacity-100 hover:scale-110 transition-all duration-300"
              title={tool.name}
            >
              <img
                src={tool.src}
                alt={tool.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Text-based platform chips (reverse direction) */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#05080f] to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#05080f] to-transparent pointer-events-none" />
        <div
          className="flex gap-6 animate-marquee w-max items-center"
          style={{ animationDirection: "reverse", animationDuration: "40s" }}
        >
          {textLoop.map((p, i) => (
            <div
              key={`txt-${i}`}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-edge opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}`,
                }}
              />
              <span
                className="text-sm font-bold whitespace-nowrap"
                style={{ color: p.color }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
