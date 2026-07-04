"use client";

import { Languages } from "lucide-react";
import { useI18n } from "./i18n";

export default function LanguageToggle() {
  const { lang, toggle } = useI18n();

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-edge bg-surface/60 backdrop-blur-sm hover:border-neon-green/60 transition-colors group"
    >
      <Languages
        size={14}
        className="text-neon-green group-hover:scale-110 transition-transform"
      />
      <span
        className={`mono-tech text-xs font-bold transition-colors ${
          lang === "ar"
            ? "text-neon-green"
            : "text-fg/60 group-hover:text-neon-green"
        }`}
      >
        AR
      </span>
      <span className="text-fg/30 text-xs">/</span>
      <span
        className={`mono-tech text-xs font-bold transition-colors ${
          lang === "en"
            ? "text-neon-green"
            : "text-fg/60 group-hover:text-neon-green"
        }`}
      >
        EN
      </span>
    </button>
  );
}
