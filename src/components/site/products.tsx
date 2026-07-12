"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ShieldCheck, Bug, Network, Globe, AlertTriangle, FileCheck,
  ArrowLeft, ArrowRight, Code2, CheckCircle2,
  ChevronLeft, ChevronRight, type LucideIcon,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import PayPalButton from "./paypal-button";
import TypedHeading from "./typed-heading";

type Product = {
  icon: LucideIcon;
  color: string;
  name: { ar: string; en: string };
  tagline: { ar: string; en: string };
  desc: { ar: string; en: string };
  features: { ar: string; en: string }[];
  price: string;
  period: { ar: string; en: string };
  popular?: boolean;
};

const products: Product[] = [
  { icon: ShieldCheck, color: "var(--neon-green)", name: { ar: "الباقة الأساسية للحماية", en: "Essential Protection" }, tagline: { ar: "الدرع الأول", en: "First defense" }, desc: { ar: "تقييم أمني شامل وتأمين أساسي للأنظمة والشبكات.", en: "Comprehensive security assessment." }, features: [{ ar: "تقييم أمني شامل", en: "Full assessment" }, { ar: "تأمين نقاط الدخول", en: "Secure entry points" }, { ar: "إعداد pfSense", en: "pfSense setup" }, { ar: "تقرير ثغرات", en: "Vulnerability report" }], price: "$1,500", period: { ar: "+ $100/شهر", en: "+ $100/mo" }, popular: true },
  { icon: Bug, color: "var(--neon-blue)", name: { ar: "اختبار الاختراق", en: "Penetration Testing" }, tagline: { ar: "اخترق قبلهم", en: "Hack first" }, desc: { ar: "محاكاة هجمات حقيقية لكشف الثغرات وإصلاحها.", en: "Real-world attack simulation." }, features: [{ ar: "اختبار شبكي وتطبيقي", en: "Network & app pentesting" }, { ar: "كشف OWASP Top 10", en: "OWASP Top 10" }, { ar: "تقرير فني + تنفيذي", en: "Tech + exec report" }, { ar: "إعادة اختبار", en: "Retest included" }], price: "$2,500", period: { ar: "لكل حملة", en: "per engagement" } },
  { icon: Network, color: "var(--neon-pink)", name: { ar: "الباقة المؤسسية Cisco", en: "Enterprise (Cisco)" }, tagline: { ar: "حماية مؤسسات", en: "Enterprise-grade" }, desc: { ar: "هندسة شبكات مؤسسية بمعايير Cisco مع عزل DMZ.", en: "Cisco-standard network engineering." }, features: [{ ar: "هندسة Cisco", en: "Cisco design" }, { ar: "عزل DMZ", en: "DMZ isolation" }, { ar: "IDS/IPS", en: "IDS/IPS" }, { ar: "مراقبة 24/7", en: "24/7 monitoring" }], price: "$3,500", period: { ar: "+ $250/شهر", en: "+ $250/mo" } },
  { icon: Globe, color: "var(--neon-green)", name: { ar: "تأمين المواقع", en: "Web Security" }, tagline: { ar: "احمِ موقعك", en: "Protect site" }, desc: { ar: "تحليل وكشف نقاط الضعف في المواقع وحمايتها.", en: "Analyze and secure websites." }, features: [{ ar: "فحص ثغرات الويب", en: "Web vuln scan" }, { ar: "حماية SQL/XSS", en: "SQL/XSS protection" }, { ar: "WAF + SSL", en: "WAF + SSL" }, { ar: "تدقيق الكود", en: "Code audit" }], price: "$800", period: { ar: "لكل موقع", en: "per website" } },
  { icon: AlertTriangle, color: "var(--neon-blue)", name: { ar: "الاستجابة للحوادث", en: "Incident Response" }, tagline: { ar: "وقت الأزمة", en: "Crisis time" }, desc: { ar: "استجابة فورية، احتواء الاختراق، والتحقيق الجنائي.", en: "Immediate response, forensics." }, features: [{ ar: "استجابة طارئة", en: "Emergency response" }, { ar: "احتواء وعزل", en: "Containment" }, { ar: "تحقيق جنائي رقمي", en: "Digital forensics" }, { ar: "خطة استعادة", en: "Recovery plan" }], price: "$1,200", period: { ar: "لكل حادثة", en: "per incident" } },
  { icon: FileCheck, color: "var(--neon-pink)", name: { ar: "الامتثال والتدريب", en: "Compliance & Training" }, tagline: { ar: "ثقافة أمنية", en: "Security culture" }, desc: { ar: "مساعدة المنشآت على الامتثال وتدريب الفرق أمنياً.", en: "Help organizations comply." }, features: [{ ar: "تقييم ISO/PCI-DSS", en: "ISO/PCI-DSS audit" }, { ar: "سياسات أمنية", en: "Security policies" }, { ar: "تدريب الفريق", en: "Team training" }, { ar: "متابعة دورية", en: "Ongoing follow-up" }], price: "$600", period: { ar: "لكل برنامج", en: "per program" } },
  { icon: Code2, color: "var(--neon-green)", name: { ar: "تطوير موقع/تطبيق شامل", en: "Custom Web/App Dev" }, tagline: { ar: "من الفكرة للإطلاق", en: "Idea to launch" }, desc: { ar: "تصميم وتطوير موقع أو تطبيق ويب شامل من الصفر.", en: "Complete website/app from scratch." }, features: [{ ar: "تصميم UI/UX متجاوب", en: "Responsive UI/UX" }, { ar: "واجهة أمامية + خلفية", en: "Frontend + backend" }, { ar: "DB + مستخدمين + لوحة تحكم", en: "DB + users + dashboard" }, { ar: "تكامل دفع", en: "Payment integration" }, { ar: "SEO", en: "SEO" }, { ar: "صيانة + تحديث دوري", en: "Maintenance" }], price: "$2,500+", period: { ar: "+ $200/شهر", en: "+ $200/mo" }, popular: true },
];

export default function Products() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const PrevIcon = isAr ? ChevronRight : ChevronLeft;
  const NextIcon = isAr ? ChevronLeft : ChevronRight;
  const total = products.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => { setIndex((prev) => (prev + 1) % total); }, 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goNext = useCallback(() => setIndex((prev) => (prev + 1) % total), [total]);
  const goPrev = useCallback(() => setIndex((prev) => (prev - 1 + total) % total), [total]);

  return (
    <section id="products" className="py-24 px-5 relative overflow-hidden" style={{ paddingBottom: "80px", "--card-w": "min(85vw, 340px)" } as React.CSSProperties}>
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center mb-10">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">{t("products.eyebrow")}</p>
          <TypedHeading text={t("products.title")} as="h2" className="text-3xl md:text-4xl font-black text-white mb-3" prefix="> " />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">{t("products.subtitle")}</p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        <div className="flex items-center justify-center gap-4 mb-5">
          <button onClick={goPrev} aria-label="Previous" className="w-11 h-11 rounded-full bg-surface border-2 border-edge text-fg/70 flex items-center justify-center hover:border-neon-green hover:text-neon-green hover:scale-110 transition-all shrink-0 z-10">
            <PrevIcon size={22} />
          </button>
          <div className="px-3 py-1 rounded-full bg-surface border border-edge">
            <span className="text-xs text-white mono-tech font-bold">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          </div>
          <button onClick={goNext} aria-label="Next" className="w-11 h-11 rounded-full bg-surface border-2 border-edge text-fg/70 flex items-center justify-center hover:border-neon-green hover:text-neon-green hover:scale-110 transition-all shrink-0 z-10">
            <NextIcon size={22} />
          </button>
        </div>

        <div className="relative overflow-hidden" dir="ltr" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div ref={trackRef} className="flex gap-4 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${index} * (var(--card-w) + 1rem)))` }}>
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.name.en} className="shrink-0" style={{ width: "var(--card-w)" }} dir="rtl">
                  <article className={`group relative h-full bg-surface rounded-xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.6)] flex flex-col ${p.popular ? "border-neon-green/60 shadow-[0_0_20px_rgba(0,255,204,0.12)]" : "border-edge hover:border-neon-green/40"}`} style={{ minHeight: "460px" }}>
                    {p.popular && <div className="bg-neon-green text-[#05080f] text-center text-[10px] font-bold py-1">{t("products.popular")} ⚡</div>}
                    <div className="p-5 pb-3" style={{ background: `linear-gradient(135deg, ${p.color}10, transparent)` }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl border shrink-0" style={{ borderColor: `${p.color}60`, backgroundColor: `${p.color}15` }}>
                          <Icon size={24} style={{ color: p.color }} />
                        </div>
                        <span className="text-[9px] mono-tech uppercase tracking-wider px-1.5 py-0.5 rounded border" style={{ color: p.color, borderColor: `${p.color}40` }}>{isAr ? p.tagline.ar : p.tagline.en}</span>
                      </div>
                      <h3 className="text-base font-bold mb-1.5 leading-tight" style={{ color: p.color }}>{isAr ? p.name.ar : p.name.en}</h3>
                      <p className="text-fg/60 text-xs leading-relaxed">{isAr ? p.desc.ar : p.desc.en}</p>
                    </div>
                    <div className="px-5 py-2 flex-1">
                      <ul className="space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f.en} className="flex items-start gap-1.5 text-xs text-fg/75">
                            <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: p.color }} />
                            <span>{isAr ? f.ar : f.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-5 pt-3 border-t border-edge bg-surface">
                      <div className="mb-3">
                        <span className="text-2xl font-black mono-tech" style={{ color: p.color }}>{p.price}</span>
                        <p className="text-[10px] text-fg/50 mt-0.5">{isAr ? p.period.ar : p.period.en}</p>
                      </div>
                      <a href="#contact-form" className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg font-bold text-xs bg-neon-green text-[#05080f] hover:shadow-[0_0_12px_rgba(0,255,204,0.4)] transition-all mb-2">{t("products.cta")}<Arrow size={12} /></a>
                      <div style={{ position: "relative", zIndex: 200, isolation: "isolate" }}>
                        <PayPalButton itemName={p.name.en} itemNameAr={p.name.ar} amount={parseFloat(p.price.replace(/[^0-9.]/g, ""))} compact />
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <Reveal className="text-center mt-6"><p className="text-sm text-fg/45">{t("products.note")}</p></Reveal>
      </div>
    </section>
  );
}
