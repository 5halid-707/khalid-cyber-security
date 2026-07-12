"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MessagesSquare,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { useI18n } from "./i18n";

const WORDS = {
  ar: [
    "أحمي شبكتك من الاختراق...",
    "أكشف ثغرات أنظمتك قبل المهاجمين...",
    "أؤمّن بياناتك الحساسة احترافياً...",
    "أبني درعاً سيبرانياً لا يُخترق...",
  ],
  en: [
    "Protecting your network from breaches...",
    "Detecting vulnerabilities before attackers...",
    "Securing your sensitive data professionally...",
    "Building an impenetrable cyber shield...",
  ],
};

const HERO_VIDEOS = [
  { src: "/bg-hacking.mp4", label: { ar: "اختبار اختراق وحماية", en: "Penetration Testing" } },
  { src: "/bg-ecommerce.mp4", label: { ar: "تصميم متاجر ومواقع", en: "E-Commerce & Web" } },
  { src: "/bg-marketing.mp4", label: { ar: "تسويق إلكتروني", en: "Digital Marketing" } },
];
const VIDEO_CYCLE_MS = 7000;

export default function Hero() {
  const { lang, t } = useI18n();
  const words = WORDS[lang];
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const [videoIndex, setVideoIndex] = useState(0);

  // Reset typing animation when language changes
  useEffect(() => {
    indexRef.current = 0;
    charRef.current = 0;
    deletingRef.current = false;
    const id = setTimeout(() => setText(""), 0);
    return () => clearTimeout(id);
  }, [lang]);

  // Cycle through hero background videos
  useEffect(() => {
    const id = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, VIDEO_CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[indexRef.current];
      if (deletingRef.current) {
        charRef.current -= 1;
        setText(current.substring(0, charRef.current));
      } else {
        charRef.current += 1;
        setText(current.substring(0, charRef.current));
      }

      let speed = deletingRef.current ? 45 : 95;

      if (!deletingRef.current && charRef.current === current.length) {
        speed = 2200;
        deletingRef.current = true;
      } else if (deletingRef.current && charRef.current === 0) {
        deletingRef.current = false;
        indexRef.current = (indexRef.current + 1) % words.length;
        speed = 500;
      }

      timeout = setTimeout(tick, speed);
    };

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, [words]);

  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 overflow-hidden"
    >
      {/* Video slider background — multiple videos cycling with crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_VIDEOS.map((v, i) => (
          <video
            key={v.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
              i === videoIndex ? "opacity-60" : "opacity-0"
            }`}
            style={{ filter: "brightness(0.55) contrast(1.05)" }}
          >
            <source src={v.src} type="video/mp4" />
          </video>
        ))}
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(0,168,232,0.10), transparent 60%), linear-gradient(rgba(5,8,15,0.50), rgba(5,8,15,0.70))",
          }}
        />
        {/* Video indicator dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_VIDEOS.map((v, i) => (
            <button
              key={i}
              onClick={() => setVideoIndex(i)}
              aria-label={`Video ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === videoIndex
                  ? "w-8 bg-neon-green shadow-[0_0_6px_var(--neon-green)]"
                  : "w-2 bg-fg/30 hover:bg-fg/50"
              }`}
            />
          ))}
        </div>
        {/* Current video label */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] mono-tech text-neon-green/70 tracking-widest">
            {HERO_VIDEOS[videoIndex].label[lang === "ar" ? "ar" : "en"]}
          </span>
        </div>
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 right-[15%] w-40 h-40 rounded-full bg-neon-green/10 blur-3xl animate-glow-pulse z-0" />
      <div className="absolute bottom-1/4 left-[15%] w-52 h-52 rounded-full bg-neon-blue/10 blur-3xl animate-glow-pulse z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl">
        {/* Professional certified badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border border-neon-green/50 bg-neon-green/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,204,0.2)]">
          <BadgeCheck size={18} className="text-neon-green" />
          <span className="text-sm md:text-base text-neon-green font-bold">
            {lang === "ar" ? "خبير محترف معتمد" : "Certified Professional Expert"}
          </span>
        </div>

        <p className="mono-tech text-sm md:text-base text-neon-green/80 mb-4 tracking-widest">
          {lang === "ar"
            ? "// CYBER SECURITY EXPERT"
            : "// CYBER SECURITY EXPERT"}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-glow-white mb-3 leading-tight">
          {lang === "ar" ? "خالد الحربي" : "Khalid Al-harbi"}
        </h1>

        <p className="text-lg md:text-2xl text-fg/70 font-medium mb-2">
          {t("hero.subtitle")}
        </p>

        {/* Services line */}
        <p className="text-base md:text-lg text-neon-blue/80 font-medium mb-8">
          {lang === "ar"
            ? "أمن سيبراني • تصميم مواقع ومتاجر • تسويق إلكتروني • مونتاج • اختبار اختراق"
            : "Cyber Security • Web & Store Design • Digital Marketing • Video Editing • Penetration Testing"}
        </p>

        <div className="h-12 md:h-14 mb-10 flex justify-center">
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="mono-tech text-2xl md:text-3xl text-neon-green border-r-4 border-neon-green pr-3 cursor-blink min-h-[1.2em]"
            style={{ textShadow: "0 0 8px rgba(0,255,204,0.7)" }}
          >
            {text}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 bg-neon-green text-[#05080f] font-bold px-8 py-3 rounded-md shadow-[0_0_15px_rgba(0,255,204,0.4)] hover:shadow-[0_0_25px_rgba(0,255,204,0.7)] hover:-translate-y-0.5 transition-all"
          >
            <ShieldCheck size={18} />
            {t("hero.cta.services")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-neon-blue text-neon-blue font-bold px-8 py-3 rounded-md hover:bg-neon-blue/10 transition-all"
          >
            <MessagesSquare size={18} />
            {t("hero.cta.contact")}
            <Arrow size={16} />
          </a>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 mt-14">
          {[
            { num: "35+", label: t("hero.stats.creds") },
            { num: "9", label: t("hero.stats.services") },
            { num: "3", label: t("hero.stats.tracks") },
            { num: "250+", label: t("hero.stats.cpd") },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-4xl font-black text-neon-green mono-tech">
                {s.num}
              </div>
              <div className="text-[11px] md:text-sm text-fg/50 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-fg/40">
        <span className="text-xs mono-tech">{t("hero.scroll")}</span>
        <div className="w-px h-10 bg-gradient-to-b from-neon-green to-transparent" />
      </div>
    </section>
  );
}
