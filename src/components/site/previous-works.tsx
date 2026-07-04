"use client";

import { ExternalLink, Github, Globe, Film, ArrowUpLeft } from "lucide-react";
import Reveal from "./reveal";
import TypedHeading from "./typed-heading";
import { useI18n } from "./i18n";

type Work = {
  title: string;
  titleAr: string;
  category: { ar: string; en: string };
  categoryColor: string;
  description: { ar: string; en: string };
  tech: string[];
  liveUrl: string;
  preview: string;
  icon: typeof Film;
};

const works: Work[] = [
  {
    title: "Netflix Clone — Movies Streaming",
    titleAr: "نتفليكس — منصة أفلام",
    category: { ar: "موقع ويب تفاعلي", en: "Interactive Web App" },
    categoryColor: "#e50914",
    description: {
      ar: "منصة بث أفلام ومسلسلات بتصميم Netflix الأصلي — نظام تسجيل دخول، صفحات أفلام، تشغيل تريلرز، وإشعارات تفاعلية. مبني بـ React مع مصادقة كاملة.",
      en: "Movies & series streaming platform with authentic Netflix design — login system, movie pages, trailer playback, interactive notifications. Built with React + full authentication.",
    },
    tech: ["React", "JavaScript", "CSS3", "Toastify", "Authentication"],
    liveUrl: "https://bright-5halid-nettflix.netlify.app/",
    preview: "/work-netflix-preview.png",
    icon: Film,
  },
];

export default function PreviousWorks() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="previous-works" className="py-24 px-5 relative">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {"// PORTFOLIO"}
          </p>
          <TypedHeading
            text={isAr ? "أعمالي المنجزة" : "My Completed Projects"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "مشاريع حقيقية صممتها ورفعتها على الإنترنت — متاحة للمعاينة المباشرة"
              : "Real projects I designed and deployed live on the internet — available for live preview"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {works.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={w.title} delay={i * 120}>
                <article className="shine-wrap group relative h-full bg-surface rounded-xl overflow-hidden border border-edge transition-all duration-500 hover:border-neon-green/50 hover:shadow-[0_10px_40px_-10px_rgba(0,255,204,0.2)] flex flex-col">
                  {/* Preview image */}
                  <div className="relative h-48 overflow-hidden bg-[#0d1117]">
                    <img
                      src={w.preview}
                      alt={isAr ? w.titleAr : w.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                    {/* Category badge */}
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm border"
                      style={{
                        color: w.categoryColor,
                        borderColor: `${w.categoryColor}50`,
                        backgroundColor: `${w.categoryColor}15`,
                      }}
                    >
                      {isAr ? w.category.ar : w.category.en}
                    </div>
                    {/* Live badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-neon-green/20 border border-neon-green/50 backdrop-blur-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                      <span className="text-[9px] text-neon-green font-bold mono-tech">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border"
                        style={{
                          borderColor: `${w.categoryColor}50`,
                          backgroundColor: `${w.categoryColor}15`,
                        }}
                      >
                        <Icon size={18} style={{ color: w.categoryColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-base font-bold leading-tight flex items-center gap-1.5"
                          style={{ color: w.categoryColor }}
                        >
                          {isAr ? w.titleAr : w.title}
                          <ArrowUpLeft
                            size={14}
                            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                          />
                        </h3>
                      </div>
                    </div>

                    <p className="text-fg/70 text-sm leading-relaxed mb-4">
                      {isAr ? w.description.ar : w.description.en}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {w.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#0d1117] border border-edge text-fg/60 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={w.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm bg-neon-green text-[#05080f] hover:shadow-[0_0_15px_rgba(0,255,204,0.5)] transition-all"
                    >
                      <Globe size={15} />
                      {isAr ? "معاينة الموقع مباشرة" : "View Live Site"}
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* "More coming" placeholder card */}
          <Reveal delay={200}>
            <article className="h-full bg-surface/40 rounded-xl overflow-hidden border border-dashed border-edge flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
              <div className="w-14 h-14 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mb-4">
                <Github size={24} className="text-neon-green" />
              </div>
              <h3 className="text-white font-bold mb-2">
                {isAr ? "المزيد من الأعمال قريباً" : "More Projects Coming Soon"}
              </h3>
              <p className="text-fg/50 text-sm max-w-xs">
                {isAr
                  ? "أرسل لي روابط أعمالك الأخرى وسأضيفها هنا مع معاينة مباشرة لكل واحد"
                  : "Send me links to your other projects and I'll add them here with live preview for each"}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
