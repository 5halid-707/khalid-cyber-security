"use client";

import {
  Terminal,
  ShieldCheck,
  Cloud,
  GraduationCap,
  BookOpen,
  Server,
  Cpu,
  Globe2,
  Award,
  ExternalLink,
} from "lucide-react";
import Reveal from "./reveal";
import TypedHeading from "./typed-heading";
import { useI18n } from "./i18n";

type Platform = {
  name: { ar: string; en: string };
  flag: string;
  origin: { ar: string; en: string };
  color: string;
  icon: typeof Terminal;
  courses: { ar: string; en: string }[];
};

const platforms: Platform[] = [
  {
    name: { ar: "TryHackMe", en: "TryHackMe" },
    flag: "🇬🇧",
    origin: { ar: "بريطانيا", en: "United Kingdom" },
    color: "#88cc14",
    icon: ShieldCheck,
    courses: [
      { ar: "الفريق الأحمر - اختراق احترافي", en: "Red Team - Professional Hacking" },
      { ar: "Mr. Robot - اختراق أخلاقي", en: "Mr. Robot - Ethical Hacking" },
      { ar: "Airplane - اختراق أخلاقي", en: "Airplane - Ethical Hacking" },
      { ar: "Solar System - أفضل هاكر", en: "Solar System - Top Hacker" },
      { ar: "Steel Mountain - اختراق أخلاقي", en: "Steel Mountain - Ethical Hacking" },
      { ar: "Juice Shop - محلل ثغرات", en: "Juice Shop - Vulnerability Analyst" },
      { ar: "Bark Web Server - اختراق أخلاقي", en: "Bark Web Server - Ethical Hacking" },
    ],
  },
  {
    name: { ar: "Cybrary", en: "Cybrary" },
    flag: "🇺🇸",
    origin: { ar: "أمريكا", en: "United States" },
    color: "#00a8e8",
    icon: BookOpen,
    courses: [
      { ar: "هاكر أخلاقي", en: "Ethical Hacker" },
      { ar: "إدارة الأمن والمخاطر", en: "Security & Risk Management" },
      { ar: "إدارة الهوية والوصول", en: "Identity & Access Management" },
      { ar: "أمن الوصول", en: "Access Security" },
      { ar: "الهندسة الأمنية والمعمارية", en: "Security Engineering & Architecture" },
      { ar: "التقييم والاختبار الأمني", en: "Security Assessment & Testing" },
      { ar: "مطور برمجيات آمنة", en: "Secure Software Developer" },
    ],
  },
  {
    name: { ar: "Cisco (Udemy)", en: "Cisco (Udemy)" },
    flag: "🌐",
    origin: { ar: "Cisco Networking", en: "Cisco Networking" },
    color: "#1ba0d7",
    icon: Server,
    courses: [
      { ar: "CCNA - شبكات سيسكو كاملة", en: "CCNA - Complete Cisco Networks" },
      { ar: "CCNP - مختبرات GNS3 متقدمة", en: "CCNP - Advanced GNS3 Labs" },
      { ar: "Cisco Meraki Wireless", en: "Cisco Meraki Wireless" },
      { ar: "أمن سيسكو من الصفر", en: "Cisco Security from Scratch" },
      { ar: "MPLS - Cisco CCNP", en: "MPLS - Cisco CCNP" },
      { ar: "IPv6 - Cisco CCNP", en: "IPv6 - Cisco CCNP" },
      { ar: "GNS3 - مختبرات VPN و GRE", en: "GNS3 - VPN & GRE Labs" },
      { ar: "مختبرات التبديل متعدد الطبقات", en: "Multi-layer Switching Labs" },
      { ar: "Cisco Live 2019 - Python و Ansible", en: "Cisco Live 2019 - Python & Ansible" },
    ],
  },
  {
    name: { ar: "Amazon AWS", en: "Amazon AWS" },
    flag: "🟧",
    origin: { ar: "أمازون - السحابة", en: "Amazon - Cloud" },
    color: "#ff9900",
    icon: Cloud,
    courses: [
      { ar: "AWS Cloud Practitioner - معتمد", en: "AWS Cloud Practitioner - Certified" },
      { ar: "AWS Solutions Architect - معتمد", en: "AWS Solutions Architect - Certified" },
      { ar: "AWS Developer - معتمد", en: "AWS Developer - Certified" },
    ],
  },
  {
    name: { ar: "تطوير مهني", en: "Professional Development" },
    flag: "📈",
    origin: { ar: "منصات متعددة", en: "Multiple Platforms" },
    color: "#00ffcc",
    icon: GraduationCap,
    courses: [
      { ar: "HP LIFE - IT لنجاح الأعمال", en: "HP LIFE - IT for Business Success" },
      { ar: "HP LIFE - إدارة الاتصال", en: "HP LIFE - Communication Management" },
      { ar: "HP LIFE - عرض البيانات", en: "HP LIFE - Data Presentation" },
      { ar: "HP LIFE - أساسيات التمويل", en: "HP LIFE - Finance Basics" },
      { ar: "HP LIFE - إدارة المخزون", en: "HP LIFE - Inventory Management" },
      { ar: "SoloLearn - Python/SQL/PHP/CSS/HTML", en: "SoloLearn - Python/SQL/PHP/CSS/HTML" },
      { ar: "ICDL - رخصة قيادة الحاسب الدولية", en: "ICDL - International Computer Driving License" },
      { ar: "IEEE - البحث في الهندسة", en: "IEEE - Engineering Research" },
      { ar: "Taylor & Francis - البحث العلمي", en: "Taylor & Francis - Scientific Research" },
    ],
  },
  {
    name: { ar: "AWS والسحابة", en: "AWS & Cloud" },
    flag: "☁️",
    origin: { ar: "Udemy + معاهد", en: "Udemy + Institutes" },
    color: "#ff00cc",
    icon: Cpu,
    courses: [
      { ar: "Udemy - اختراق أخلاقي واختبار اختراق", en: "Udemy - Ethical Hacking & Penetration Testing" },
      { ar: "Udemy - نمذجة ثلاثية الأبعاد Blender", en: "Udemy - 3D Modeling Blender" },
      { ar: "Udemy - أساسيات Salesforce", en: "Udemy - Salesforce Fundamentals" },
      { ar: "Udemy - تقسيم الشبكات المتقدم", en: "Udemy - Advanced Network Subnetting" },
      { ar: "معهد نخبة القادة - مستويات 3 و 5 إنجليزي", en: "Elite Leaders Institute - English Levels 3 & 5" },
      { ar: "مؤسسة الملكة رانيا - العلامة التجارية الشخصية", en: "Queen Rania Foundation - Personal Branding" },
      { ar: "منشآت - التشغيل بإتقان", en: "Monshaat - Operations Excellence" },
      { ar: "منشآت - إعداد أدلة تشغيلية", en: "Monshaat - Operational Manuals" },
    ],
  },
];

export default function TrainingLabs() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";

  const totalCourses = platforms.reduce((sum, p) => sum + p.courses.length, 0);

  return (
    <section id="training" className="py-24 px-5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,255,204,0.08), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,0,204,0.06), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {t("training.eyebrow")}
          </p>
          <TypedHeading
            text={t("training.title")}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-3xl mx-auto mb-5">
            {t("training.subtitle")}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        {/* Quick stats bar */}
        <Reveal className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { num: `${platforms.length}`, label: isAr ? "منصات عالمية" : "Global Platforms", color: "var(--neon-green)" },
              { num: `${totalCourses}+`, label: isAr ? "دورة وتدريب" : "Courses & Labs", color: "var(--neon-blue)" },
              { num: "50+", label: isAr ? "ساعة مختبر" : "Lab Hours", color: "var(--neon-pink)" },
              { num: "100%", label: isAr ? "تطبيق عملي" : "Hands-on", color: "var(--neon-green)" },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center p-3 rounded-lg bg-surface/50 border border-edge"
              >
                <div className="text-xl font-black mono-tech" style={{ color: s.color }}>
                  {s.num}
                </div>
                <div className="text-[10px] text-fg/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Platforms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {platforms.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name.en} delay={idx * 50}>
                <div
                  className="group h-full rounded-2xl bg-surface/60 border-2 border-edge hover:bg-surface/80 transition-all overflow-hidden"
                  style={{ borderColor: `${p.color}30` }}
                >
                  {/* Top accent line */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, ${p.color}, transparent)`,
                    }}
                  />

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border"
                        style={{
                          borderColor: `${p.color}50`,
                          backgroundColor: `${p.color}15`,
                          boxShadow: `0 0 14px ${p.color}25`,
                        }}
                      >
                        <Icon size={22} style={{ color: p.color }} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold" style={{ color: p.color }}>
                            {isAr ? p.name.ar : p.name.en}
                          </h3>
                          <span className="text-base" aria-hidden>{p.flag}</span>
                        </div>
                        <p className="text-[11px] text-fg/50">
                          {isAr ? p.origin.ar : p.origin.en}
                        </p>
                      </div>
                      <span
                        className="text-[10px] mono-tech font-bold px-2 py-1 rounded-full border"
                        style={{
                          color: p.color,
                          borderColor: `${p.color}50`,
                          backgroundColor: `${p.color}10`,
                        }}
                      >
                        {p.courses.length}
                      </span>
                    </div>

                    {/* Course list — scrollable */}
                    <ul className="space-y-1.5 max-h-64 overflow-y-auto pr-1 custom-scroll-training">
                      {p.courses.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-fg/75 p-1.5 rounded-md hover:bg-white/5 transition-colors"
                        >
                          <span
                            className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                          <span>{isAr ? c.ar : c.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal className="text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30">
            <Award size={16} className="text-neon-green" />
            <p className="text-sm text-fg/70">
              {isAr
                ? "كل التدريبات موثّقة — تحقق من الشهادات في معرض الشهادات أدناه"
                : "All training is verified — check certificates in the gallery below"}
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .custom-scroll-training::-webkit-scrollbar { width: 4px; }
        .custom-scroll-training::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll-training::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.3); border-radius: 3px; }
        .custom-scroll-training::-webkit-scrollbar-thumb:hover { background: rgba(0,168,232,0.5); }
      `}</style>
    </section>
  );
}
