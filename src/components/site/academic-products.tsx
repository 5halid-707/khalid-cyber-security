"use client";

import {
  ShieldCheck,
  Code2,
  Network,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";

type AcademicProduct = {
  icon: LucideIcon;
  color: string;
  name: string;
  sourceTrack: string;
  trackProgress: number;
  desc: string;
  deliverables: string[];
  price: string;
  period: string;
  badge: string;
};

const products: AcademicProduct[] = [
  {
    icon: ShieldCheck,
    color: "var(--neon-green)",
    name: "استشارات إدارة المخاطر السيبرانية",
    sourceTrack:
      "Digital Security Training: Cyber Threats and Risk Management",
    trackProgress: 100,
    desc: "تقييم شامل لمخاطرمنشأتك، صياغة سياسات أمنية، وتطبيق التشفير — مستندة لتعليم أكاديمي معتمد من Coventry University.",
    deliverables: [
      "تقييم شامل للتهديدات والمخاطر السيبرانية",
      "صياغة سياسة أمن معلوماتي مخصصة",
      "تطبيق حلول التشفير والشهادات الرقمية",
      "استشارة التقنيات الناشئة ومستقبل الأمن",
      "تقرير تنفيذي + خارطة طريق للتحصين",
    ],
    price: "$2,000",
    period: "استشارة شاملة + تقرير",
    badge: "مدعوم بـ Coventry University",
  },
  {
    icon: Code2,
    color: "var(--neon-blue)",
    name: "تصميم وتطوير أنظمة آمنة",
    sourceTrack: "Information Security Design and Development",
    trackProgress: 99,
    desc: "مراجعة وتصميم دورة حياة التطوير الآمن (SDLC)، هندسة بنية آمنة، واختبار أمني شامل لأنظمتك وتطبيقاتك.",
    deliverables: [
      "مراجعة وتحسين دورة حياة التطوير (Secure SDLC)",
      "تصميم بنية نظام آمنة من الأساس",
      "اختبار أمني شامل للأنظمة والتطبيقات",
      "مراجعة كود أمنية + إصلاح الثغرات",
      "خطة صيانة واختبار دوري",
    ],
    price: "$3,000",
    period: "لكل مشروع تطوير",
    badge: "مدعوم بـ Coventry University",
  },
  {
    icon: Network,
    color: "var(--neon-pink)",
    name: "هندسة الدفاع السيبراني للشبكات",
    sourceTrack: "Network Security and Defence",
    trackProgress: 100,
    desc: "تصميم بنية أمن شبكات متعددة الطبقات، استراتيجية دفاع متكاملة، وتحصين مستقبلي ضد التهديدات المتطورة.",
    deliverables: [
      "تصميم بنية أمن شبكات متعددة الطبقات",
      "استراتيجية دفاع سيبراني متكاملة",
      "إعداد أنظمة مراقبة وكشف التهديدات",
      "تحصين البيئة قبل وأثناء وبعد الحوادث",
      "خطة تطوير مستقبلية لمواكبة التهديدات",
    ],
    price: "$2,800",
    period: "هندسة + تنفيذ",
    badge: "مدعوم بـ Coventry University",
  },
];

export default function AcademicProducts() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="academic-products" className="py-24 px-5 relative">
      {/* Premium gradient background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(0,255,204,0.06), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {t("aproducts.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("aproducts.title")}
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {t("aproducts.subtitle")}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name} delay={i * 120}>
                <article className="group relative h-full bg-surface rounded-xl overflow-hidden border-2 border-neon-green/30 shadow-[0_0_30px_rgba(0,255,204,0.08)] flex flex-col transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.7)] hover:border-neon-green/60">
                  {/* Premium top strip */}
                  <div
                    className="px-5 py-2 flex items-center justify-between"
                    style={{
                      background: `linear-gradient(90deg, color-mix(in srgb, ${p.color} 20%, transparent), transparent)`,
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#05080f]">
                      <GraduationCap size={13} />
                      <span style={{ color: p.color }}>
                        {isAr ? p.badge : "Backed by Coventry University"}
                      </span>
                    </span>
                    <span
                      className="mono-tech text-[10px] font-bold"
                      style={{ color: p.color }}
                    >
                      {p.trackProgress}% ACADEMIC
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Icon + name */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border transition-transform group-hover:scale-110"
                        style={{
                          borderColor: p.color,
                          backgroundColor: `color-mix(in srgb, ${p.color} 12%, transparent)`,
                          boxShadow: `0 0 18px color-mix(in srgb, ${p.color} 25%, transparent)`,
                        }}
                      >
                        <Icon size={24} style={{ color: p.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-lg font-bold leading-tight"
                          style={{ color: p.color }}
                        >
                          {p.name}
                        </h3>
                        <p className="text-[10px] text-fg/40 mt-1 leading-tight">
                          من المسار: {p.sourceTrack}
                        </p>
                      </div>
                    </div>

                    <p className="text-fg/65 text-sm leading-relaxed mb-5 min-h-[4em]">
                      {p.desc}
                    </p>

                    {/* Deliverables */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {p.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-sm text-fg/80"
                        >
                          <CheckCircle2
                            size={15}
                            className="shrink-0 mt-0.5"
                            style={{ color: p.color }}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="pt-4 border-t border-edge">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span
                          className="text-3xl font-black mono-tech"
                          style={{ color: p.color }}
                        >
                          {p.price}
                        </span>
                      </div>
                      <p className="text-xs text-fg/50 mb-4">{p.period}</p>

                      <a
                        href="#contact"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all"
                        style={{
                          backgroundColor: p.color,
                          color: "#05080f",
                        }}
                      >
                        {t("aproducts.cta")}
                        <Arrow size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Trust note */}
        <Reveal className="text-center mt-10">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface border border-neon-green/30">
            <GraduationCap size={16} className="text-neon-green" />
            <p className="text-sm text-fg/70">{t("aproducts.trust")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
