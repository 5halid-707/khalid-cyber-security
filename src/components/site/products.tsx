"use client";

import {
  ShieldCheck,
  Bug,
  Network,
  Globe,
  AlertTriangle,
  FileCheck,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";

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
  {
    icon: ShieldCheck,
    color: "var(--neon-green)",
    name: {
      ar: "الباقة الأساسية للحماية",
      en: "Essential Protection Package",
    },
    tagline: { ar: "الدرع الأول لمنشأتك", en: "Your first line of defense" },
    desc: {
      ar: "تقييم أمني شامل وتأمين أساسي للأنظمة والشبكات بأسلوب مفتوح المصدر.",
      en: "Comprehensive security assessment and baseline hardening using open-source tools.",
    },
    features: [
      { ar: "تقييم أمني شامل للبنية التحتية", en: "Full infrastructure assessment" },
      { ar: "تأمين نقاط الدخول الأساسية", en: "Secure entry points" },
      { ar: "إعداد جدار حماية pfSense", en: "pfSense firewall setup" },
      { ar: "تقرير ثغرات مفصّل", en: "Detailed vulnerability report" },
    ],
    price: "$1,500",
    period: {
      ar: "بدء + $100/شهر صيانة",
      en: "Setup + $100/mo maintenance",
    },
    popular: true,
  },
  {
    icon: Bug,
    color: "var(--neon-blue)",
    name: {
      ar: "اختبار الاختراق الاحترافي",
      en: "Professional Penetration Testing",
    },
    tagline: { ar: "اخترق قبل أن يخترقوك", en: "Hack before you get hacked" },
    desc: {
      ar: "محاكاة هجمات حقيقية لكشف الثغرات وإصلاحها قبل استغلالها من المهاجمين.",
      en: "Real-world attack simulation to find and fix vulnerabilities before attackers do.",
    },
    features: [
      { ar: "اختبار اختراق شبكي وتطبيقي", en: "Network & application pentesting" },
      { ar: "كشف ثغرات OWASP Top 10", en: "OWASP Top 10 detection" },
      { ar: "تقرير فني + تنفيذي", en: "Technical + executive report" },
      { ar: "إعادة الاختبار بعد الإصلاح", en: "Retest after remediation" },
    ],
    price: "$2,500",
    period: { ar: "لكل حملة اختبار", en: "per engagement" },
  },
  {
    icon: Network,
    color: "var(--neon-pink)",
    name: { ar: "الباقة المؤسسية (Cisco)", en: "Enterprise Package (Cisco)" },
    tagline: {
      ar: "حماية على مستوى المؤسسات",
      en: "Enterprise-grade protection",
    },
    desc: {
      ar: "هندسة شبكات مؤسسية بمعايير Cisco مع عزل DMZ وحماية متقدمة متعددة الطبقات.",
      en: "Cisco-standard enterprise network engineering with DMZ isolation and multi-layer protection.",
    },
    features: [
      { ar: "هندسة شبكة بمعايير Cisco", en: "Cisco-standard network design" },
      { ar: "عزل DMZ وتقسيم الشبكات", en: "DMZ isolation & segmentation" },
      { ar: "أنظمة كشف/منع التسلل (IDS/IPS)", en: "IDS/IPS systems" },
      { ar: "مراقبة 24/7 + استجابة فورية", en: "24/7 monitoring + response" },
    ],
    price: "$3,500",
    period: {
      ar: "بدء + $250/شهر صيانة",
      en: "Setup + $250/mo maintenance",
    },
  },
  {
    icon: Globe,
    color: "var(--neon-green)",
    name: { ar: "تأمين المواقع الإلكترونية", en: "Web Application Security" },
    tagline: { ar: "حمِ موقعك من الاختراق", en: "Protect your website" },
    desc: {
      ar: "تحليل وكشف نقاط الضعف في المواقع وتطبيقات الويب وحمايتها من الهجمات.",
      en: "Analyze and secure websites and web apps against attacks.",
    },
    features: [
      { ar: "فحص ثغرات تطبيقات الويب", en: "Web app vulnerability scanning" },
      { ar: "حماية من SQL Injection و XSS", en: "SQL Injection & XSS protection" },
      { ar: "تأمين WAF وشهادات SSL", en: "WAF & SSL hardening" },
      { ar: "تدقيق الكود البرمجي", en: "Code audit" },
    ],
    price: "$800",
    period: { ar: "لكل موقع", en: "per website" },
  },
  {
    icon: AlertTriangle,
    color: "var(--neon-blue)",
    name: { ar: "الاستجابة للحوادث", en: "Incident Response" },
    tagline: { ar: "عند وقوع الأزمة", en: "When crisis strikes" },
    desc: {
      ar: "استجابة فورية للحوادث الأمنية، احتواء الاختراق، والتحقيق الجنائي الرقمي.",
      en: "Immediate incident response, breach containment, and digital forensics.",
    },
    features: [
      { ar: "استجابة طارئة خلال ساعات", en: "Emergency response within hours" },
      { ar: "احتواء وعزل الأنظمة المخترقة", en: "Contain & isolate breached systems" },
      { ar: "تحقيق جنائي رقمي", en: "Digital forensics investigation" },
      { ar: "خطة استعادة بعد الحادث", en: "Post-incident recovery plan" },
    ],
    price: "$1,200",
    period: { ar: "لكل حادثة", en: "per incident" },
  },
  {
    icon: FileCheck,
    color: "var(--neon-pink)",
    name: { ar: "الامتثال والتدريب", en: "Compliance & Training" },
    tagline: { ar: "ثقافة أمنية مستدامة", en: "Sustainable security culture" },
    desc: {
      ar: "مساعدة المنشآت على الامتثال للمعايير وتدريب الفرق على أفضل الممارسات الأمنية.",
      en: "Help organizations comply with standards and train teams on security best practices.",
    },
    features: [
      { ar: "تقييم الامتثال (ISO/PCI-DSS)", en: "Compliance audit (ISO/PCI-DSS)" },
      { ar: "سياسات وإجراءات أمنية", en: "Security policies & procedures" },
      { ar: "تدريب الفريق على التوعية الأمنية", en: "Team security awareness training" },
      { ar: "متابعة دورية وتحديثات", en: "Ongoing follow-up & updates" },
    ],
    price: "$600",
    period: { ar: "لكل برنامج", en: "per program" },
  },
];

export default function Products() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="products" className="py-24 px-5 relative">
      {/* subtle bg accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {t("products.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("products.title")}
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {t("products.subtitle")}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name.en} delay={i * 100}>
                <article
                  className={`group relative h-full bg-surface rounded-xl overflow-hidden border transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.6)] flex flex-col ${
                    p.popular
                      ? "border-neon-green/60 shadow-[0_0_25px_rgba(0,255,204,0.15)]"
                      : "border-edge hover:border-neon-green/50"
                  }`}
                >
                  {/* Popular ribbon */}
                  {p.popular && (
                    <div className="absolute top-0 inset-x-0 bg-neon-green text-[#05080f] text-center text-xs font-bold py-1.5">
                      {t("products.popular")} ⚡
                    </div>
                  )}

                  <div className={`p-6 ${p.popular ? "pt-10" : ""}`}>
                    {/* Icon + name */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl border transition-transform group-hover:scale-110"
                        style={{
                          borderColor: p.color,
                          backgroundColor: `color-mix(in srgb, ${p.color} 12%, transparent)`,
                          boxShadow: `0 0 18px color-mix(in srgb, ${p.color} 25%, transparent)`,
                        }}
                      >
                        <Icon size={24} style={{ color: p.color }} />
                      </div>
                      <span
                        className="text-[10px] mono-tech uppercase tracking-wider px-2 py-1 rounded border"
                        style={{
                          color: p.color,
                          borderColor: `color-mix(in srgb, ${p.color} 40%, transparent)`,
                        }}
                      >
                        {isAr ? p.tagline.ar : p.tagline.en}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: p.color }}
                    >
                      {isAr ? p.name.ar : p.name.en}
                    </h3>
                    <p className="text-fg/65 text-sm leading-relaxed mb-5 min-h-[3.5em]">
                      {isAr ? p.desc.ar : p.desc.en}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-5">
                      {p.features.map((f) => (
                        <li
                          key={f.en}
                          className="flex items-start gap-2 text-sm text-fg/75"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          {isAr ? f.ar : f.en}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto p-6 pt-0">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span
                        className="text-3xl font-black mono-tech"
                        style={{ color: p.color }}
                      >
                        {p.price}
                      </span>
                    </div>
                    <p className="text-xs text-fg/50 mb-4">
                      {isAr ? p.period.ar : p.period.en}
                    </p>

                    <a
                      href="#contact"
                      className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                        p.popular
                          ? "bg-neon-green text-[#05080f] hover:shadow-[0_0_15px_rgba(0,255,204,0.5)]"
                          : "border-2 border-edge text-fg hover:border-neon-green hover:text-neon-green"
                      }`}
                    >
                      {t("products.cta")}
                      <Arrow size={15} />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Note */}
        <Reveal className="text-center mt-10">
          <p className="text-sm text-fg/45">{t("products.note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
