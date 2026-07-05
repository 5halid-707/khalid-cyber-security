"use client";

import { useState, type ReactNode } from "react";
import {
  ChevronDown,
  Wrench,
  BadgeCheck,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Cloud,
  Scale,
  Siren,
  ShieldAlert,
  Lock,
  Bug,
  Cpu,
  Network,
  Award,
  Clock,
  Info,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Receipt,
  Loader2,
} from "lucide-react";
import Reveal from "./reveal";
import TypedHeading from "./typed-heading";
import { useI18n } from "./i18n";
import PayPalButton from "./paypal-button";

/* ============================================================
   ACCORDION ITEM WRAPPER
   ============================================================ */
function AccordionItem({
  index,
  icon,
  color,
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  marketingAr,
  marketingEn,
  isOpen,
  onToggle,
  children,
}: {
  index: number;
  icon: typeof Wrench;
  color: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  marketingAr: string;
  marketingEn: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const Icon = icon;
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
        isOpen
          ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
          : "shadow-none"
      }`}
      style={{
        borderColor: isOpen ? color : "#1f2937",
        background: isOpen
          ? `linear-gradient(135deg, ${color}08, transparent 60%)`
          : "transparent",
      }}
    >
      {/* Header — clickable */}
      <button
        onClick={onToggle}
        className="w-full p-5 md:p-6 flex items-center gap-4 text-right hover:bg-white/[0.02] transition-colors group"
      >
        {/* Number badge */}
        <span
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black mono-tech border"
          style={{
            color,
            borderColor: `${color}50`,
            backgroundColor: `${color}10`,
          }}
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* Icon */}
        <span
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110"
          style={{
            color,
            borderColor: `${color}50`,
            backgroundColor: `${color}15`,
            boxShadow: isOpen ? `0 0 18px ${color}40` : "none",
          }}
        >
          <Icon size={22} />
        </span>

        {/* Titles */}
        <div className="flex-1 min-w-0 text-right">
          <h3
            className="text-lg md:text-xl font-black leading-tight"
            style={{ color: isOpen ? color : "#fff" }}
          >
            {isAr ? titleAr : titleEn}
          </h3>
          <p className="text-xs md:text-sm text-fg/50 mt-0.5">
            {isAr ? subtitleAr : subtitleEn}
          </p>
        </div>

        {/* Expand indicator */}
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            color,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={20} />
        </span>
      </button>

      {/* Marketing copy bar */}
      {isOpen && (
        <div
          className="px-5 md:px-6 pb-3 -mt-1"
          style={{ borderTop: `1px solid ${color}20` }}
        >
          <div
            className="flex items-start gap-2 p-3 rounded-lg mt-3"
            style={{ backgroundColor: `${color}08` }}
          >
            <Sparkles size={14} className="shrink-0 mt-0.5" style={{ color }} />
            <p className="text-sm text-fg/70 leading-relaxed">
              {isAr ? marketingAr : marketingEn}
            </p>
          </div>
        </div>
      )}

      {/* Expandable content */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? "3000px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 md:px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 1: TOOLS & PLATFORMS
   ============================================================ */
const TOOLS = [
  { name: "IBM", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg" },
  { name: "Cisco", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cisco/cisco-original.svg" },
  { name: "Kali Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kali/kali-linux-wordmark.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flutter", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "WordPress", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Photoshop", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "Premiere Pro", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg" },
];
const TEXT_PLATFORMS = [
  { name: "Coventry University", color: "#00ffcc" },
  { name: "FutureLearn", color: "#de00a5" },
  { name: "Credly", color: "#ff6c00" },
  { name: "TryHackMe", color: "#88cc14" },
  { name: "CPD UK", color: "#00a8e8" },
  { name: "Alison", color: "#00ffcc" },
];

function ToolsContent() {
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-6">
        {TOOLS.map((t) => (
          <div
            key={t.name}
            className="aspect-square rounded-xl bg-surface border border-edge flex items-center justify-center p-2 hover:border-neon-green/40 hover:scale-105 transition-all"
            title={t.name}
          >
            <img src={t.src} alt={t.name} className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {TEXT_PLATFORMS.map((p) => (
          <span
            key={p.name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-edge text-xs font-bold"
            style={{ color: p.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }} />
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 2: PROFESSIONAL CREDENTIALS
   ============================================================ */
type Badge = { name: string; nameAr: string; icon: typeof Cloud; date: string; verify: string };

const ibmBadges: Badge[] = [
  { name: "Cybersecurity Fundamentals", nameAr: "أساسيات الأمن السيبراني", icon: ShieldCheck, date: "Jul 10, 2025", verify: "https://www.credly.com/users/khalid-mohammed-alharbi" },
  { name: "Cloud Security", nameAr: "أمن السحابة", icon: Cloud, date: "Feb 11, 2026", verify: "https://www.credly.com/badges/87e082ec-9ebd-4203-9a42-e22178c6a647" },
  { name: "Governance, Risk, Compliance & Data Privacy", nameAr: "الحوكمة والمخاطر والامتثال", icon: Scale, date: "Feb 08, 2026", verify: "https://www.credly.com/badges/c648e19b-35c5-467a-bd18-0263ecf6e332" },
  { name: "Incident Response & Systems Forensics", nameAr: "الاستجابة للحوادث والتحقيق الجنائي", icon: Siren, date: "Feb 11, 2026", verify: "https://www.credly.com/badges/60abf309-e6c8-4eaf-95bf-2550a8f00dde" },
  { name: "Security Operations & Management", nameAr: "عمليات وإدارة الأمن", icon: ShieldAlert, date: "Feb 11, 2026", verify: "https://www.credly.com/badges/78da6b71-cda4-404f-bb44-1ed9d4aaaed1" },
  { name: "System & Network Security", nameAr: "أمن الأنظمة والشبكات", icon: Lock, date: "Feb 10, 2026", verify: "https://www.credly.com/badges/2c4d7da9-99a7-409a-b738-e05ec98ac9eb" },
  { name: "Vulnerability Management", nameAr: "إدارة الثغرات", icon: Bug, date: "Feb 08, 2026", verify: "https://www.credly.com/badges/b6d9842c-4fca-47f8-8ede-be76621c52aa" },
  { name: "Information Technology Fundamentals", nameAr: "أساسيات تقنية المعلومات", icon: Cpu, date: "Feb 12, 2026", verify: "https://www.credly.com/badges/0445dd62-210e-4d26-91cb-23d927580fcb" },
];
const ciscoBadges: Badge[] = [
  { name: "Network Technician Career Path", nameAr: "مسار فني الشبكات", icon: Network, date: "Aug 07, 2025", verify: "https://www.credly.com/badges/cisco-network-technician" },
  { name: "Ethical Hacker", nameAr: "الهاكر الأخلاقي", icon: Bug, date: "Aug 05, 2025", verify: "https://www.credly.com/badges/cisco-ethical-hacker" },
];
const opswatBadges: Badge[] = [
  { name: "OPSWAT Introduction to Critical Infrastructure Protection (ICIP)", nameAr: "مقدمة OPSWAT لحماية البنية التحتية الحرجة", icon: ShieldAlert, date: "Aug 05, 2025", verify: "https://www.credly.com/badges/opswat-icip" },
];
const alisonBadges: Badge[] = [
  { name: "Cyber Security Essentials Course", nameAr: "دورة أساسيات الأمن السيبراني (250 ساعة)", icon: ShieldCheck, date: "Feb 01, 2026", verify: "https://alison.com/courses/cyber-security-essentials" },
];

function BadgeRow({ badges, color }: { badges: Badge[]; color: string }) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {badges.map((b) => {
        const Icon = b.icon;
        return (
          <a
            key={b.name}
            href={b.verify}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-3 rounded-xl bg-[#0d1117] border border-edge hover:border-neon-blue/50 transition-all"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border" style={{ borderColor: `${color}50`, backgroundColor: `${color}10` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs leading-tight">{b.nameAr}</p>
              <p className="text-fg/40 text-[10px] truncate">{b.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="mono-tech text-[9px]" style={{ color: `${color}99` }}>{b.date}</span>
                <span className="inline-flex items-center gap-0.5 text-[9px] text-fg/40 group-hover:text-neon-blue transition-colors">
                  <BadgeCheck size={10} />
                  {isAr ? "تحقق" : "Verify"}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function CredentialsContent() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="space-y-6">
      {/* Top credential banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#0d1117] border border-neon-green/40">
          <div className="flex items-center gap-2 mb-1">
            <Award size={16} className="text-neon-green" />
            <span className="text-xs font-bold text-neon-green">CPD UK</span>
          </div>
          <p className="text-[10px] text-fg/60">{isAr ? "250 ساعة تطوير مهني" : "250 CPD Hours"}</p>
        </div>
        <div className="p-3 rounded-xl bg-[#0d1117] border border-neon-blue/40">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap size={16} className="text-neon-blue" />
            <span className="text-xs font-bold text-neon-blue">IBM SkillsBuild</span>
          </div>
          <p className="text-[10px] text-fg/60">{isAr ? "شهادة + 8 أوسمة" : "Certificate + 8 Badges"}</p>
        </div>
        <div className="p-3 rounded-xl bg-[#0d1117] border border-neon-pink/40">
          <div className="flex items-center gap-2 mb-1">
            <Network size={16} className="text-neon-pink" />
            <span className="text-xs font-bold text-neon-pink">Cisco</span>
          </div>
          <p className="text-[10px] text-fg/60">{isAr ? "2 وسام موثّق" : "2 Verified Badges"}</p>
        </div>
      </div>

      {/* IBM badges */}
      <div>
        <p className="text-xs text-fg/50 mb-2 font-bold">{isAr ? "أوسمة IBM SkillsBuild (8)" : "IBM SkillsBuild Badges (8)"}</p>
        <BadgeRow badges={ibmBadges} color="#00a8e8" />
      </div>
      {/* Cisco badges */}
      <div>
        <p className="text-xs text-fg/50 mb-2 font-bold">{isAr ? "أوسمة Cisco (2)" : "Cisco Badges (2)"}</p>
        <BadgeRow badges={ciscoBadges} color="#ff00cc" />
      </div>
      {/* OPSWAT + Alison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-fg/50 mb-2 font-bold">{isAr ? "شهادة OPSWAT" : "OPSWAT"}</p>
          <BadgeRow badges={opswatBadges} color="#00ffcc" />
        </div>
        <div>
          <p className="text-xs text-fg/50 mb-2 font-bold">{isAr ? "شهادة Alison" : "Alison"}</p>
          <BadgeRow badges={alisonBadges} color="#00ffcc" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-center">
        <BadgeCheck size={14} className="text-neon-green" />
        <p className="text-xs text-fg/40">{isAr ? "جميع الأوسمة موثّقة على Credly وقابلة للتحقق إلكترونياً" : "All badges verified on Credly"}</p>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 3: ACADEMIC EDUCATION (Coventry)
   ============================================================ */
type Track = {
  icon: typeof ShieldCheck;
  color: string;
  titleAr: string;
  title: string;
  overall: number;
  courses: { name: string; progress: number }[];
};
const tracks: Track[] = [
  {
    icon: ShieldCheck, color: "var(--neon-green)",
    titleAr: "تدريب الأمن الرقمي: التهديدات وإدارة المخاطر",
    title: "Digital Security Training: Cyber Threats and Risk Management",
    overall: 100,
    courses: [
      { name: "The Cyber Security Landscape", progress: 100 },
      { name: "Risk Management and Security Vulnerabilities", progress: 100 },
      { name: "Information Security Policy and Management", progress: 100 },
      { name: "Cryptography and Digital Certificates", progress: 100 },
      { name: "The Future of Cyber Security and Emerging Technologies", progress: 100 },
    ],
  },
  {
    icon: Cpu, color: "var(--neon-blue)",
    titleAr: "تصميم وتطوير الأمن المعلوماتي",
    title: "Information Security Design and Development",
    overall: 99,
    courses: [
      { name: "How Cyber Security Affects the SDLC", progress: 100 },
      { name: "Secure System Analysis and Design", progress: 96 },
      { name: "Security System and Application Development", progress: 100 },
      { name: "System Security Testing and Maintenance", progress: 100 },
      { name: "Current Issues in Secure Development", progress: 100 },
    ],
  },
  {
    icon: Network, color: "var(--neon-pink)",
    titleAr: "أمن الشبكات والدفاع السيبراني",
    title: "Network Security and Defence",
    overall: 100,
    courses: [
      { name: "Introduction to Network Security and Defence", progress: 100 },
      { name: "Network Security and Defence: A History of IT", progress: 100 },
      { name: "Network Security and Defence: Network Environments", progress: 100 },
      { name: "Network Security and Defence: Security Architecture", progress: 100 },
      { name: "The Future of Network Security and Defence", progress: 100 },
    ],
  },
];

function AcademicContent() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="space-y-4">
      {/* University banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neon-green/10 to-transparent border border-neon-green/30">
        <div className="w-11 h-11 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center shrink-0">
          <GraduationCap size={22} className="text-neon-green" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">Coventry University</p>
          <p className="text-fg/50 text-[10px]">{isAr ? "جامعة بريطانية • FutureLearn" : "UK University • FutureLearn"}</p>
        </div>
        <div className="flex gap-3 text-center">
          <div><div className="text-lg font-black text-neon-green mono-tech">3</div><div className="text-[9px] text-fg/50">{isAr ? "مسارات" : "Tracks"}</div></div>
          <div><div className="text-lg font-black text-neon-blue mono-tech">15</div><div className="text-[9px] text-fg/50">{isAr ? "دورات" : "Courses"}</div></div>
          <div><div className="text-lg font-black text-neon-pink mono-tech">~150h</div><div className="text-[9px] text-fg/50">{isAr ? "ساعة" : "Hours"}</div></div>
        </div>
      </div>

      {/* Tracks */}
      {tracks.map((t) => {
        const Icon = t.icon;
        return (
          <div key={t.title} className="rounded-xl bg-[#0d1117] border border-edge overflow-hidden">
            <div className="p-4 border-b border-edge flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ borderColor: `${t.color}50`, backgroundColor: `${t.color}10` }}>
                <Icon size={18} style={{ color: t.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-xs leading-tight">{t.titleAr}</p>
                <p className="text-fg/40 text-[10px] truncate">{t.title}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="mono-tech text-sm font-black" style={{ color: t.color }}>{t.overall}%</span>
              </div>
            </div>
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {t.courses.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 py-1">
                  {c.progress === 100 ? <CheckCircle2 size={12} style={{ color: t.color }} /> : <Clock size={12} className="text-fg/40" />}
                  <span className="text-[10px] text-fg/70 flex-1 leading-tight">{c.name}</span>
                  <span className="mono-tech text-[9px]" style={{ color: c.progress === 100 ? t.color : "#6b7280" }}>{c.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Transparent clarification */}
      <div className="bg-neon-blue/5 rounded-lg p-3 border border-neon-blue/25 flex items-start gap-2">
        <Info size={14} className="text-neon-blue shrink-0 mt-0.5" />
        <p className="text-xs text-fg/70 leading-relaxed">
          <span className="text-neon-blue font-bold">{isAr ? "توضيح شفاف: " : "Transparent note: "}</span>
          {isAr
            ? "مسارات ExpertTrack برامج تدريبية عالية المستوى من Coventry University عبر FutureLearn — تركز على المهارات العملية وتختلف عن الشهادات الجامعية التقليدية."
            : "ExpertTracks are high-level training programs from Coventry University via FutureLearn — they focus on practical skills and differ from traditional academic degrees."}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 4: ACADEMIC CONSULTING PREMIUM
   ============================================================ */
type AProduct = {
  icon: typeof ShieldCheck;
  color: string;
  nameAr: string;
  name: string;
  track: string;
  trackProgress: number;
  descAr: string;
  desc: string;
  deliverablesAr: string[];
  deliverables: string[];
  price: string;
};

const aProducts: AProduct[] = [
  {
    icon: ShieldCheck, color: "var(--neon-green)",
    nameAr: "استشارات إدارة المخاطر السيبرانية", name: "Cyber Risk Management Consulting",
    track: "Digital Security Training", trackProgress: 100,
    descAr: "تقييم شامل لمخاطر منشأتك، صياغة سياسات أمنية، وتطبيق التشفير.",
    desc: "Comprehensive risk assessment, security policy formulation, and cryptography implementation.",
    deliverablesAr: ["تقييم شامل للتهديدات", "سياسة أمن معلوماتي", "تطبيق التشفير", "تقرير تنفيذي"],
    deliverables: ["Threat assessment", "Security policy", "Cryptography setup", "Executive report"],
    price: "$2,000",
  },
  {
    icon: Cpu, color: "var(--neon-blue)",
    nameAr: "تصميم وتطوير أنظمة آمنة", name: "Secure System Design & Development",
    track: "Information Security Design", trackProgress: 99,
    descAr: "مراجعة وتصميم دورة حياة التطوير الآمن (SDLC) وهندسة بنية آمنة.",
    desc: "Secure SDLC review and secure architecture engineering.",
    deliverablesAr: ["مراجعة Secure SDLC", "تصميم بنية آمنة", "اختبار أمني شامل", "خطة صيانة"],
    deliverables: ["Secure SDLC review", "Secure architecture", "Security testing", "Maintenance plan"],
    price: "$3,000",
  },
  {
    icon: Network, color: "var(--neon-pink)",
    nameAr: "هندسة الدفاع السيبراني للشبكات", name: "Network Defense Engineering",
    track: "Network Security and Defence", trackProgress: 100,
    descAr: "تصميم بنية أمن شبكات متعددة الطبقات واستراتيجية دفاع متكاملة.",
    desc: "Multi-layer network security architecture and integrated defense strategy.",
    deliverablesAr: ["بنية متعددة الطبقات", "استراتيجية دفاع", "مراقبة التهديدات", "تحصين مستقبلي"],
    deliverables: ["Multi-layer architecture", "Defense strategy", "Threat monitoring", "Future hardening"],
    price: "$2,800",
  },
];

function AcademicProductsContent() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {aProducts.map((p) => {
        const Icon = p.icon;
        return (
          <div
            key={p.name}
            className="rounded-xl overflow-hidden border-2 bg-surface flex flex-col"
            style={{ borderColor: `${p.color}40` }}
          >
            {/* Premium top strip */}
            <div className="px-3 py-1.5 flex items-center justify-between" style={{ background: `linear-gradient(90deg, ${p.color}25, transparent)` }}>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: p.color }}>
                <GraduationCap size={11} />
                {isAr ? "مدعوم بـ Coventry" : "Coventry-backed"}
              </span>
              <span className="mono-tech text-[9px] font-bold" style={{ color: p.color }}>{p.trackProgress}% ACADEMIC</span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border" style={{ borderColor: `${p.color}50`, backgroundColor: `${p.color}10` }}>
                  <Icon size={18} style={{ color: p.color }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight" style={{ color: p.color }}>{isAr ? p.nameAr : p.name}</h4>
                  <p className="text-[9px] text-fg/40">{isAr ? `من: ${p.track}` : `From: ${p.track}`}</p>
                </div>
              </div>
              <p className="text-xs text-fg/60 leading-relaxed mb-3">{isAr ? p.descAr : p.desc}</p>
              <ul className="space-y-1 mb-3 flex-1">
                {(isAr ? p.deliverablesAr : p.deliverables).map((d) => (
                  <li key={d} className="flex items-start gap-1.5 text-[11px] text-fg/70">
                    <CheckCircle2 size={11} className="shrink-0 mt-0.5" style={{ color: p.color }} /> {d}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-edge">
                <span className="text-xl font-black mono-tech" style={{ color: p.color }}>{p.price}</span>
                <div className="mt-2">
                  <PayPalButton itemName={p.name} amount={parseFloat(p.price.replace(/[^0-9.]/g, ""))} compact />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function InteractiveShowcase() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const sections = [
    {
      icon: Wrench,
      color: "#00ffcc",
      titleAr: "منصات الاعتماد والأدوات",
      titleEn: "Tools & Platforms",
      subtitleAr: "أعمل بأحدث التقنيات والمنصات العالمية",
      subtitleEn: "Working with cutting-edge tech & global platforms",
      marketingAr: "🚀 أستخدم نفس الأدوات التي تستخدمها أكبر شركات الأمن السيبراني في العالم — من Kali Linux لاختبار الاختراق إلى Cisco لإدارة الشبكات. كل مشروع أبنيه يستفيد من أفضل التقنيات المتاحة.",
      marketingEn: "🚀 I use the same tools used by the world's top cyber security firms — from Kali Linux for pentesting to Cisco for network management. Every project benefits from the best available technology.",
      content: <ToolsContent />,
    },
    {
      icon: BadgeCheck,
      color: "#00a8e8",
      titleAr: "الشهادات المهنية الموثّقة",
      titleEn: "Verified Professional Credentials",
      subtitleAr: "12+ شهادة موثّقة على Credly — قابلة للتحقق إلكترونياً",
      subtitleEn: "12+ verified credentials on Credly — electronically verifiable",
      marketingAr: "🏆 لا أدّعي الخبرة — أثبتها بشهادات موثّقة من IBM و Cisco و OPSWAT و Alison و CPD UK. كل وسام له رابط تحقق مباشر على Credly يمكنك التحقق منه بنفسك قبل التعاقد.",
      marketingEn: "🏆 I don't claim expertise — I prove it with verified credentials from IBM, Cisco, OPSWAT, Alison, and CPD UK. Every badge has a direct Credly verification link you can check yourself before contracting.",
      content: <CredentialsContent />,
    },
    {
      icon: GraduationCap,
      color: "#ff00cc",
      titleAr: "التعليم الأكاديمي المعتمد",
      titleEn: "Certified Academic Education",
      subtitleAr: "3 مسارات و15 دورة من Coventry University البريطانية",
      subtitleEn: "3 tracks and 15 courses from Coventry University, UK",
      marketingAr: "🎓 تعلمت الأمن السيبراني من جامعة بريطانية حكومية معتمدة — ليس من دورات يوتيوب عشوائية. 3 مسارات احترافية تغطي إدارة المخاطر، تصميم الأنظمة الآمنة، والدفاع السيبراني. هذا العمق الأكاديمي ينعكس على جودة كل خدمة أقدمها.",
      marketingEn: "🎓 I learned cyber security from an accredited UK university — not random YouTube tutorials. 3 professional tracks covering risk management, secure system design, and cyber defense. This academic depth reflects in the quality of every service I offer.",
      content: <AcademicContent />,
    },
    {
      icon: Sparkles,
      color: "#00ffcc",
      titleAr: "الاستشارات الأكاديمية Premium",
      titleEn: "Academic-Backed Premium Consulting",
      subtitleAr: "خدمات استشارية مدعومة بتعليم Coventry — بأسعار premium",
      subtitleEn: "Consulting backed by Coventry education — premium pricing",
      marketingAr: "💎 لماذا تدفع أكثر؟ لأن هذه الخدمات ليست مجرد خبرة عملية — إنها مدمجة مع عمق أكاديمي موثّق من جامعة بريطانية. كل استشارة مدعومة بمسار تدريبي محدد أكملته بنسبة 99-100%. هذا يعني حلولاً أكثر شمولية واحترافية.",
      marketingEn: "💎 Why pay more? Because these services aren't just practical experience — they're integrated with verified academic depth from a UK university. Each consultation is backed by a specific training track I completed at 99-100%. This means more comprehensive, professional solutions.",
      content: <AcademicProductsContent />,
    },
  ];

  return (
    <section id="showcase" className="py-24 px-5 relative">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-blue/70 tracking-[0.3em] mb-3">
            {"// EXPLORE MY SERVICES"}
          </p>
          <TypedHeading
            text={isAr ? "استكشف خدماتي بالتفصيل" : "Explore My Services in Detail"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "اضغط على أي قسم لعرض الخدمة المقدمة بالكامل — كل قسم يحتوي على تفاصيل احترافية وشاملة"
              : "Click any section to reveal the full service offered — each section contains professional, comprehensive details"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-blue rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
        </Reveal>

        {/* Accordion items */}
        <div className="space-y-4">
          {sections.map((s, i) => (
            <AccordionItem
              key={i}
              index={i + 1}
              icon={s.icon}
              color={s.color}
              titleAr={s.titleAr}
              titleEn={s.titleEn}
              subtitleAr={s.subtitleAr}
              subtitleEn={s.subtitleEn}
              marketingAr={s.marketingAr}
              marketingEn={s.marketingEn}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {s.content}
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
