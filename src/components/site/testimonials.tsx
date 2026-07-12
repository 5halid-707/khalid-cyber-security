"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Quote, Briefcase, ShieldCheck, TrendingUp, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

type Testimonial = {
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  company: { ar: string; en: string };
  text: { ar: string; en: string };
  rating: number;
  icon: typeof Briefcase;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    name: { ar: "أحمد العتيبي", en: "Ahmed Al-Otaibi" },
    role: { ar: "مدير تقني", en: "Technical Manager" },
    company: { ar: "شركة المرجان", en: "Al-Mirjan Co." },
    text: {
      ar: "خالد أثبت احترافيته في تأمين شبكتنا بالكامل. اختبار الاختراق الذي أجراه كشف ثغرات لم نكن نعرف بوجودها، وأغلقها جميعاً بنسبة 100%. أنصح به بشدة لأي مؤسسة تهتم بأمن بياناتها.",
      en: "Khalid proved his professionalism in securing our entire network. His penetration test uncovered vulnerabilities we didn't know existed, and closed them all 100%. Highly recommend for any organization that cares about data security.",
    },
    rating: 5,
    icon: ShieldCheck,
    color: "#00ffcc",
  },
  {
    name: { ar: "سارة الدوسري", en: "Sarah Al-Dosari" },
    role: { ar: "صاحبة متجر إلكتروني", en: "E-Commerce Owner" },
    company: { ar: "متجر الجبال", en: "Al-Jibal Store" },
    text: {
      ar: "صمّم وبرمج وحما متجرنا الإلكتروني من الصفر. النتيجة فاقت توقعاتي — تصميم احترافي، سرعة عالية، وأمان قوي. خدمة ما بعد البيع ممتازة ويستجيب بسرعة لأي استفسار.",
      en: "He designed, developed, and secured our e-commerce store from scratch. The result exceeded my expectations — professional design, high speed, and strong security. After-sale service is excellent with quick response.",
    },
    rating: 5,
    icon: TrendingUp,
    color: "#00a8e8",
  },
  {
    name: { ar: "محمد الشهري", en: "Mohammed Al-Shehri" },
    role: { ar: "مدير مشروع", en: "Project Manager" },
    company: { ar: "شركة الخدمات المساندة", en: "Supportive Services Co." },
    text: {
      ar: "عملنا مع خالد في مشاريع تصميم وبرمجة متعددة. يتميز بالدقة في المواعيد، العمق التقني، والقدرة على فهم احتياجات العميل وتحويلها لحلول عملية. شراكة ناجحة بكل المقاييس.",
      en: "We worked with Khalid on multiple design and programming projects. He excels in deadline accuracy, technical depth, and the ability to understand client needs and turn them into practical solutions. A successful partnership by all measures.",
    },
    rating: 5,
    icon: Briefcase,
    color: "#ff00cc",
  },
  {
    name: { ar: "فهد القحطاني", en: "Fahad Al-Qahtani" },
    role: { ar: "رجل أعمال", en: "Businessman" },
    company: { ar: "مجموعة عقارية", en: "Real Estate Group" },
    text: {
      ar: "بعد هجوم سيبراني استهدف أنظمتنا، استعنا بخالد للاستجابة والتحقيق. كان احترافياً وسريعاً — احتوى الهجوم، حسب البيانات، وأعاد أنظمتنا للعمل في وقت قياسي. شخص ثقة في الأوقات الحرجة.",
      en: "After a cyber attack targeted our systems, we called Khalid for response and investigation. He was professional and fast — contained the attack, recovered data, and restored our systems in record time. A trusted person in critical moments.",
    },
    rating: 5,
    icon: ShieldCheck,
    color: "#00ffcc",
  },
  {
    name: { ar: "نورة العنزي", en: "Noura Al-Anazi" },
    role: { ar: "مديرة تسويق", en: "Marketing Director" },
    company: { ar: "علامة تجارية", en: "Fashion Brand" },
    text: {
      ar: "صمّم لنا هوية بصرية كاملة — شعار، ألوان، دليل استخدام. التصميم عكس روح علامتنا التجارية بدقة وزاد من احترافيتنا أمام عملائنا. عمل فني وتجاري في نفس الوقت.",
      en: "He designed our complete visual identity — logo, colors, brand guidelines. The design accurately reflected our brand spirit and increased our professionalism. Both artistic and commercial work at the same time.",
    },
    rating: 5,
    icon: TrendingUp,
    color: "#00a8e8",
  },
  {
    name: { ar: "عبدالله الحربي", en: "Abdullah Al-Harbi" },
    role: { ar: "مدير تقنية المعلومات", en: "IT Manager" },
    company: { ar: "مؤسسة كبيرة", en: "Large Enterprise" },
    text: {
      ar: "طبّق خالد الباقة المؤسسية Cisco عندنا — هندسة شبكة احترافية بمعايير عالمية، عزل DMZ، أنظمة IDS/IPS، ومراقبة 24/7. التقرير الذي قدّمه كان دقيقاً وشاملاً. استثمار يستحق كل ريال.",
      en: "Khalid implemented the Enterprise Cisco package — professional network engineering with global standards, DMZ isolation, IDS/IPS systems, and 24/7 monitoring. The report he provided was accurate and comprehensive. An investment worth every riyal.",
    },
    rating: 5,
    icon: Briefcase,
    color: "#ff00cc",
  },
];

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const total = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const ArrowNext = isAr ? ChevronLeft : ChevronRight;
  const ArrowPrev = isAr ? ChevronRight : ChevronLeft;

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, total]);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPlaying(false);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (isAr) {
        diff > 0 ? prev() : next();
      } else {
        diff > 0 ? next() : prev();
      }
    }
  };

  return (
    <section id="testimonials" className="py-24 px-5 relative overflow-hidden">
      {/* Ambient cyber gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,255,204,0.08), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,0,204,0.08), transparent 50%)",
        }}
      />
      {/* Cyber grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,204,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center mb-10">
          <p className="mono-tech text-xs text-neon-blue/70 tracking-[0.3em] mb-3">
            {"// CLIENT TESTIMONIALS"}
          </p>
          <TypedHeading
            text={isAr ? "آراء عملائي" : "Client Testimonials"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "نتائج حقيقية من عملاء حقيقيين — ثقتهم هي أفضل دليل على احترافيتي"
              : "Real results from real clients — their trust is the best proof of my professionalism"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-blue rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
        </Reveal>

        {/* Rating summary */}
        <Reveal className="text-center mb-8">
          <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-surface/60 border border-neon-green/30">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="text-neon-green fill-neon-green" />
              ))}
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-white mono-tech">5.0</p>
              <p className="text-[10px] text-fg/50">
                {isAr ? "تقييم العملاء (6 عملاء)" : "Client Rating (6 clients)"}
              </p>
            </div>
          </div>
        </Reveal>

        {/* 3D Cyber Slider */}
        <div
          className="relative"
          style={{ perspective: "1200px" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Slider viewport */}
          <div className="relative h-[420px] sm:h-[380px] flex items-center justify-center">
            {testimonials.map((t, i) => {
              const isActive = i === current;
              const offset = i - current;
              const isPrev = offset === -1 || (current === 0 && i === total - 1);
              const isNext = offset === 1 || (current === total - 1 && i === 0);

              // Calculate 3D position
              let translateX = 0;
              let translateZ = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;

              if (isActive) {
                translateX = 0;
                translateZ = 0;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isPrev) {
                translateX = isAr ? 80 : -80;
                translateZ = -120;
                rotateY = isAr ? -25 : 25;
                scale = 0.85;
                opacity = 0.5;
                zIndex = 20;
              } else if (isNext) {
                translateX = isAr ? -80 : 80;
                translateZ = -120;
                rotateY = isAr ? 25 : -25;
                scale = 0.85;
                opacity = 0.5;
                zIndex = 20;
              } else {
                translateX = offset > 0 ? 200 : -200;
                translateZ = -250;
                rotateY = offset > 0 ? -45 : 45;
                scale = 0.6;
                opacity = 0;
                zIndex = 0;
              }

              const Icon = t.icon;

              return (
                <div
                  key={i}
                  className="absolute w-[90%] sm:w-[70%] md:w-[60%] max-w-lg"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onClick={() => !isActive && goTo(i)}
                >
                  <div
                    className="relative p-6 rounded-2xl bg-surface/80 backdrop-blur-md border-2 overflow-hidden h-full"
                    style={{
                      borderColor: isActive ? `${t.color}80` : "#1f2937",
                      boxShadow: isActive
                        ? `0 20px 60px -10px rgba(0,0,0,0.8), 0 0 40px ${t.color}30, inset 0 0 20px ${t.color}05`
                        : "0 10px 30px -10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Cyber corner accents (only active) */}
                    {isActive && (
                      <>
                        <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: t.color }} />
                        <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: t.color }} />
                        <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: t.color }} />
                        <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: t.color }} />
                      </>
                    )}

                    {/* Quote watermark */}
                    <Quote
                      size={80}
                      className="absolute -top-3 -left-3 opacity-5 rotate-180"
                      style={{ color: t.color }}
                    />

                    {/* Rating + Icon */}
                    <div className="relative flex items-center justify-between mb-4">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={16}
                            className={s <= t.rating ? "text-neon-green fill-neon-green" : "text-fg/20"}
                          />
                        ))}
                      </div>
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border shrink-0"
                        style={{
                          borderColor: `${t.color}50`,
                          backgroundColor: `${t.color}10`,
                          boxShadow: isActive ? `0 0 15px ${t.color}40` : "none",
                        }}
                      >
                        <Icon size={20} style={{ color: t.color }} />
                      </div>
                    </div>

                    {/* Testimonial text */}
                    <p className="relative text-sm sm:text-base text-fg/80 leading-relaxed mb-5">
                      "{isAr ? t.text.ar : t.text.en}"
                    </p>

                    {/* Client info */}
                    <div className="relative flex items-center gap-3 pt-4 border-t border-edge">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center border shrink-0 font-bold"
                        style={{
                          borderColor: `${t.color}50`,
                          backgroundColor: `${t.color}15`,
                          color: t.color,
                          boxShadow: isActive ? `0 0 12px ${t.color}30` : "none",
                        }}
                      >
                        {(isAr ? t.name.ar : t.name.en).charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {isAr ? t.name.ar : t.name.en}
                        </p>
                        <p className="text-[11px] text-fg/50 truncate">
                          {isAr ? t.role.ar : t.role.en} — {isAr ? t.company.ar : t.company.en}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => { setIsPlaying(false); prev(); }}
            aria-label={isAr ? "السابق" : "Previous"}
            className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-4 z-40 w-11 h-11 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-white flex items-center justify-center hover:bg-neon-blue hover:text-[#05080f] hover:scale-110 transition-all touch-manipulation pointer-events-auto"
            style={{ touchAction: "manipulation" }}
          >
            <ArrowPrev size={22} />
          </button>
          <button
            onClick={() => { setIsPlaying(false); next(); }}
            aria-label={isAr ? "التالي" : "Next"}
            className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-4 z-40 w-11 h-11 rounded-full bg-surface/80 backdrop-blur-md border border-edge text-white flex items-center justify-center hover:bg-neon-blue hover:text-[#05080f] hover:scale-110 transition-all touch-manipulation pointer-events-auto"
            style={{ touchAction: "manipulation" }}
          >
            <ArrowNext size={22} />
          </button>
        </div>

        {/* Dots + autoplay indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsPlaying(false); goTo(i); }}
              aria-label={`${isAr ? "عرض" : "View"} ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
                i === current
                  ? "w-8 bg-neon-blue shadow-[0_0_8px_var(--neon-blue)]"
                  : "w-2 bg-fg/30 hover:bg-fg/50"
              }`}
              style={{ touchAction: "manipulation" }}
            />
          ))}
        </div>

        {/* Counter + play/pause */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="text-xs text-fg/40 mono-tech">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="inline-flex items-center gap-1.5 text-[11px] text-fg/50 hover:text-neon-blue transition-colors px-3 py-1.5 rounded-full border border-edge touch-manipulation"
            >
              <Zap size={11} />
              {isAr ? "استئناف" : "Resume"}
            </button>
          )}
        </div>

        {/* Bottom note */}
        <Reveal className="mt-8 text-center">
          <p className="text-sm text-fg/40">
            {isAr
              ? "🔒 تُحافظ على خصوصية عملائي — الأسماء قد تكون مستعارة لحماية الهوية"
              : "🔒 I maintain client privacy — names may be pseudonyms to protect identity"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
