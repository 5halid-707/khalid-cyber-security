"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ExternalLink,
  Globe,
  Film,
  ShoppingBag,
  Camera,
  MessageCircle,
  Store,
  Car,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
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
  {
    title: "Amazon Clone — E-Commerce Store",
    titleAr: "أمازون — متجر إلكتروني",
    category: { ar: "متجر إلكتروني", en: "E-Commerce Store" },
    categoryColor: "#ff9900",
    description: {
      ar: "متجر إلكتروني متكامل بتصميم Amazon — بحث منتجات، سلة تسوق، صفحات منتجات تفصيلية، نظام طلبات. مبني بـ React مع واجهة مستخدم احترافية.",
      en: "Complete e-commerce store with Amazon design — product search, shopping cart, detailed product pages, order system. Built with React + professional UI.",
    },
    tech: ["React", "JavaScript", "CSS3", "Cart System", "Product Catalog"],
    liveUrl: "https://bright-5halid-amazon.netlify.app/",
    preview: "/work-amazon-preview.png",
    icon: ShoppingBag,
  },
  {
    title: "Instagram Clone — Social App",
    titleAr: "إنستغرام — تطبيق اجتماعي",
    category: { ar: "تطبيق تواصل اجتماعي", en: "Social Media App" },
    categoryColor: "#e1306c",
    description: {
      ar: "تطبيق تواصل اجتماعي بتصميم Instagram — تسجيل دخول وإنشاء حساب، مشاركات صور، تفاعل (إعجابات/تعليقات)، واجهة مستخدم عصرية بالعربية والإنجليزية.",
      en: "Social media app with Instagram design — login & signup, photo posts, interactions (likes/comments), modern UI in Arabic & English.",
    },
    tech: ["React", "JavaScript", "CSS3", "Auth", "Bilingual UI"],
    liveUrl: "https://bright-khalid-insta-app.netlify.app/",
    preview: "/work-insta-preview.png",
    icon: Camera,
  },
  {
    title: "WhatsApp Clone — Chat Messenger",
    titleAr: "واتساب — تطبيق محادثات",
    category: { ar: "تطبيق محادثات", en: "Chat Messenger" },
    categoryColor: "#25d366",
    description: {
      ar: "تطبيق محادثات فورية بتصميم WhatsApp — تسجيل دخول، قائمة جهات اتصال، فتح محادثات، فقاعات رسائل، واجهة دركن مودرن. مبني بـ React.",
      en: "Real-time chat messenger with WhatsApp design — login, contact list, chat conversations, message bubbles, modern dark UI. Built with React.",
    },
    tech: ["React", "JavaScript", "CSS3", "Auth", "Real-time Chat"],
    liveUrl: "https://bright-khalid-whats-app.netlify.app/",
    preview: "/work-whatsapp-preview.png",
    icon: MessageCircle,
  },
  {
    title: "Haraj — Saudi Classifieds Marketplace",
    titleAr: "حراج — سوق الإعلانات المبوبة الأول",
    category: { ar: "منصة إعلانات مبوبة شاملة", en: "Full Classifieds Platform" },
    categoryColor: "#f97316",
    description: {
      ar: "منصة إعلانات مبوبة متكاملة بأسلوب حراج السعودي — 20+ قسم (سيارات، عقارات، أجهزة، أزياء، أثاث، وظائف)، بحث متقدم، نظام عضويات، رفع صور، محادثة بين البائع والمشتري، Service Worker للعمل offline، SEO محسّن، تصميم متجاوب بالكامل. قابل للتطوير والتحديث الدوري.",
      en: "Complete classified ads platform in Saudi Haraj style — 20+ categories (cars, real estate, electronics, fashion, furniture, jobs), advanced search, memberships, image uploads, buyer-seller chat, Service Worker for offline support, SEO optimized, fully responsive. Maintainable and scalable.",
    },
    tech: ["Next.js", "React", "TypeScript", "Service Worker", "PWA", "SEO", "20+ Categories", "Scalable"],
    liveUrl: "https://haraj-v2.vercel.app/",
    preview: "/work-haraj-preview-v2.png",
    icon: Store,
  },
  {
    title: "Uber — Smart Ride & Delivery Platform",
    titleAr: "أوبر — منصة النقل والتوصيل الذكية",
    category: { ar: "منصة نقل وتوصيل", en: "Ride & Delivery Platform" },
    categoryColor: "#6366f1",
    description: {
      ar: "منصة نقل وتوصيل ذكية بأسلوب Uber — حجز رحلات فورية ومجدولة، تتبع السائق على الخريطة، نظام Uber One للاشتراكات، دعم عربي/إنجليزي، إحصائيات (+5M رحلة، +50K سائق، 4.9 تقييم)، تصميم dark mode متجاوب بالكامل.",
      en: "Smart ride & delivery platform in Uber style — instant & scheduled rides, driver tracking on map, Uber One subscription, Arabic/English support, stats (+5M rides, +50K drivers, 4.9 rating), fully responsive dark mode.",
    },
    tech: ["Next.js", "React", "TypeScript", "Dark Mode", "Bilingual", "Map Tracking", "Booking System", "Scalable"],
    liveUrl: "https://uber-new-omega.vercel.app/",
    preview: "/work-uber-preview.png",
    icon: Car,
  },
];

const AUTOPLAY_MS = 6000; // 6 seconds per slide

export default function PreviousWorks() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0-100 for autoplay progress bar
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = works.length;

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(((idx % total) + total) % total);
      setProgress(0);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
      setProgress(0);
    }, AUTOPLAY_MS);

    // Progress bar animation
    const tickMs = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + (tickMs / AUTOPLAY_MS) * 100));
    }, tickMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, total, current]);

  // Pause on hover
  const pauseAutoplay = () => setIsPlaying(false);
  const resumeAutoplay = () => setIsPlaying(true);

  const ArrowNext = isAr ? ChevronLeft : ChevronRight;
  const ArrowPrev = isAr ? ChevronRight : ChevronLeft;
  const activeWork = works[current];
  const ActiveIcon = activeWork.icon;

  return (
    <section id="previous-works" className="py-24 px-5 relative overflow-hidden">
      {/* Background ambient glow that shifts with active slide */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${activeWork.categoryColor}15, transparent 60%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-12">
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
              ? "مشاريع حقيقية صممتها ورفعتها على الإنترنت — معاينة مباشرة لكل عمل"
              : "Real projects I designed and deployed live on the internet — live preview for each"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        {/* Main carousel */}
        <div
          className="relative rounded-2xl overflow-hidden border-2 border-edge shadow-[0_15px_50px_-10px_rgba(0,0,0,0.7)]"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          dir="ltr"
        >
          {/* Slides container */}
          <div className="relative h-[420px] sm:h-[460px] md:h-[500px]">
            {works.map((w, i) => {
              const Icon = w.icon;
              const isActive = i === current;
              return (
                <div
                  key={w.title}
                  className={`absolute inset-0 transition-all duration-700 ${
                    isActive
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-95 z-0 pointer-events-none"
                  }`}
                >
                  {/* Background image with Ken Burns zoom */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={w.preview}
                      alt={isAr ? w.titleAr : w.title}
                      className={`w-full h-full object-cover ${
                        isActive ? "animate-ken-burns" : ""
                      }`}
                      style={{
                        filter: isActive
                          ? "brightness(0.5) contrast(1.1)"
                          : "brightness(0.3)",
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/60 to-transparent" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${w.categoryColor}20, transparent 50%)`,
                      }}
                    />
                  </div>

                  {/* Content overlay — clickable */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-10 pointer-events-auto">
                    <div className="max-w-2xl">
                      {/* Category + LIVE badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm border"
                          style={{
                            color: w.categoryColor,
                            borderColor: `${w.categoryColor}60`,
                            backgroundColor: `${w.categoryColor}20`,
                          }}
                        >
                          {isAr ? w.category.ar : w.category.en}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-neon-green/20 border border-neon-green/50 backdrop-blur-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                          <span className="text-[9px] text-neon-green font-bold mono-tech">
                            LIVE
                          </span>
                        </span>
                      </div>

                      {/* Title with icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border backdrop-blur-sm"
                          style={{
                            borderColor: `${w.categoryColor}60`,
                            backgroundColor: `${w.categoryColor}25`,
                          }}
                        >
                          <Icon size={22} style={{ color: w.categoryColor }} />
                        </div>
                        <h3
                          className="text-xl md:text-3xl font-black leading-tight"
                          style={{ color: w.categoryColor }}
                        >
                          {isAr ? w.titleAr : w.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-fg/80 text-sm md:text-base leading-relaxed mb-4 line-clamp-2 md:line-clamp-3">
                        {isAr ? w.description.ar : w.description.en}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {w.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm border border-edge text-fg/70 font-mono"
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
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm bg-neon-green text-[#05080f] hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] hover:scale-105 transition-all"
                      >
                        <Globe size={15} />
                        {isAr ? "معاينة مباشرة" : "View Live Site"}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prev/Next arrows */}
          <button
            onClick={prev}
            aria-label={isAr ? "السابق" : "Previous"}
            className="absolute top-1/2 -translate-y-1/2 left-3 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border border-edge text-white flex items-center justify-center hover:bg-neon-green hover:text-[#05080f] hover:scale-110 transition-all"
          >
            <ArrowPrev size={20} />
          </button>
          <button
            onClick={next}
            aria-label={isAr ? "التالي" : "Next"}
            className="absolute top-1/2 -translate-y-1/2 right-3 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border border-edge text-white flex items-center justify-center hover:bg-neon-green hover:text-[#05080f] hover:scale-110 transition-all"
          >
            <ArrowNext size={20} />
          </button>

          {/* Autoplay progress bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40 z-20">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                backgroundColor: activeWork.categoryColor,
                boxShadow: `0 0 8px ${activeWork.categoryColor}`,
              }}
            />
          </div>

          {/* Play/Pause toggle */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-edge text-white flex items-center justify-center hover:bg-neon-green hover:text-[#05080f] transition-all"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          {/* Slide counter */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-edge">
            <span className="text-xs text-white mono-tech font-bold">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Dot navigation + thumbnails */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 flex-wrap px-2">
          {works.map((w, i) => {
            const isActive = i === current;
            return (
              <button
                key={w.title}
                onClick={() => goTo(i)}
                aria-label={`${isAr ? "عرض مشروع" : "View project"} ${i + 1}: ${isAr ? w.titleAr : w.title}`}
                className={`group relative transition-all shrink-0 ${
                  isActive ? "w-20 h-14 sm:w-24 sm:h-16" : "w-14 h-10 sm:w-16 sm:h-12 opacity-60 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all ${
                    isActive
                      ? "border-neon-green shadow-[0_0_12px_rgba(0,255,204,0.4)]"
                      : "border-edge group-hover:border-neon-green/50"
                  }`}
                >
                  <img
                    src={w.preview}
                    alt={isAr ? w.titleAr : w.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Track name display below dots — clickable to open project */}
        <div className="text-center mt-4">
          <a
            href={activeWork.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-fg/50 hover:text-neon-green transition-colors group"
          >
            <span className="mono-tech text-neon-green">#{current + 1}</span>
            <span style={{ color: activeWork.categoryColor }} className="font-bold">
              {isAr ? activeWork.titleAr : activeWork.title}
            </span>
            <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.12) translate(-2%, -1%); }
        }
        .animate-ken-burns {
          animation: ken-burns ${AUTOPLAY_MS}ms ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
