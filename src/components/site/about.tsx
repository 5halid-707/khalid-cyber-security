"use client";

import {
  CheckCircle2,
  ShieldCheck,
  Bug,
  Network,
  Lock,
  Globe,
  Code2,
  Server,
  Eye,
  ScrollText,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

const expertise = [
  { ar: "أساسيات الأمن السيبراني ومبادئه", en: "Cyber Security Fundamentals & Principles", icon: ShieldCheck },
  { ar: "كشف الثغرات واختبار الاختراق", en: "Vulnerability Assessment & Penetration Testing", icon: Bug },
  { ar: "حماية الشبكات والأجهزة", en: "Network & Endpoint Protection", icon: Network },
  { ar: "تأمين المواقع والتطبيقات", en: "Web & Application Security", icon: Globe },
  { ar: "أمن السحابة (Cloud Security)", en: "Cloud Security", icon: Server },
  { ar: "التشفير والشهادات الرقمية", en: "Cryptography & Digital Certificates", icon: Lock },
  { ar: "الاستجابة للحوادث والتحقيق الجنائي", en: "Incident Response & Digital Forensics", icon: Eye },
  { ar: "تصميم وتطوير الأنظمة الآمنة", en: "Secure System Design & Development", icon: Code2 },
];

// Real partner / platform logos with brand info
const platforms = [
  {
    name: "Coventry University",
    short: "Coventry",
    role: { ar: "تعليم أكاديمي بريطاني", en: "UK Academic Education" },
    color: "#00ffcc",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#00ffcc" strokeWidth="3" />
        <path d="M30 50 L45 65 L70 35" fill="none" stroke="#00ffcc" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "IBM SkillsBuild",
    short: "IBM",
    role: { ar: "أوسمة مهارية معتمدة", en: "Verified Skill Badges" },
    color: "#00a8e8",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#00a8e8" strokeWidth="3" />
        <text x="50" y="58" textAnchor="middle" fill="#00a8e8" fontSize="22" fontWeight="bold" fontFamily="sans-serif">IBM</text>
      </svg>
    ),
  },
  {
    name: "Cisco Networking Academy",
    short: "Cisco",
    role: { ar: "شهادة Network Technician", en: "Network Technician Certified" },
    color: "#ff00cc",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#ff00cc" strokeWidth="3" />
        <text x="50" y="56" textAnchor="middle" fill="#ff00cc" fontSize="16" fontWeight="bold" fontFamily="sans-serif">CISCO</text>
      </svg>
    ),
  },
  {
    name: "CPD Certification Service UK",
    short: "CPD UK",
    role: { ar: "250 ساعة تطوير مهني", en: "250 CPD Hours" },
    color: "#00ffcc",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,8 60,38 92,38 66,58 76,90 50,70 24,90 34,58 8,38 40,38" fill="none" stroke="#00ffcc" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "FutureLearn",
    short: "FutureLearn",
    role: { ar: "منصة التعليم العالمية", en: "Global Learning Platform" },
    color: "#de00a5",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#de00a5" strokeWidth="3" />
        <path d="M30 45 Q50 25 70 45" fill="none" stroke="#de00a5" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 60 Q50 40 70 60" fill="none" stroke="#de00a5" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Credly",
    short: "Credly",
    role: { ar: "منصة التحقق العالمية", en: "Global Verification Platform" },
    color: "#ff6c00",
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="45" r="22" fill="none" stroke="#ff6c00" strokeWidth="3" />
        <path d="M38 55 L38 80 L50 72 L62 80 L62 55" fill="none" stroke="#ff6c00" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function About() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="about" className="py-24 px-5 relative">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              {/* Decorative neon glow frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-neon-green/25 via-neon-blue/15 to-neon-pink/20 rounded-3xl blur-2xl animate-glow-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-br from-neon-green/30 via-transparent to-neon-blue/30 rounded-2xl" />

              {/* Photo container with cyber corners */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-neon-green/60 shadow-[0_0_50px_rgba(0,255,204,0.2)]">
                <img
                  src="/khalid-portrait-opt.jpg"
                  alt="Eng. Khalid Al-harbi - Cyber Security Engineer"
                  className="w-full h-auto aspect-square object-cover"
                />
                {/* Subtle scan-line overlay for cyber aesthetic */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,204,0.08) 3px, transparent 4px)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent" />

                {/* Name plate */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#05080f] via-[#05080f]/80 to-transparent">
                  <p className="text-neon-green mono-tech text-xs tracking-widest mb-1">
                    {t("about.nameplate.role")}
                  </p>
                  <p className="text-white text-xl font-bold">
                    {t("about.nameplate.name")}
                  </p>
                  <p className="text-fg/60 text-sm">
                    {t("about.nameplate.rolefull")}
                  </p>
                </div>

                {/* Cyber corner accents */}
                <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-neon-green rounded-tr-md" />
                <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-neon-green rounded-tl-md" />
              </div>

              {/* Floating credential chips */}
              <div className="absolute -top-3 -right-3 bg-surface border border-neon-green/60 rounded-lg px-3 py-2 shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                <p className="text-[10px] text-fg/50">{t("about.chip.cpd_top")}</p>
                <p className="text-xs font-bold text-neon-green">
                  {t("about.chip.cpd_val")}
                </p>
              </div>
              <div className="absolute -bottom-3 -left-3 bg-surface border border-neon-blue/60 rounded-lg px-3 py-2 shadow-[0_0_15px_rgba(0,168,232,0.3)]">
                <p className="text-[10px] text-fg/50">{t("about.chip.coventry_top")}</p>
                <p className="text-xs font-bold text-neon-blue">
                  {t("about.chip.coventry_val")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal className="order-1 lg:order-2" delay={150}>
            <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
              {t("about.eyebrow")}
            </p>
            <TypedHeading
              text={t("about.title")}
              as="h2"
              className="text-3xl md:text-4xl font-black text-white mb-5 animate-neon-flicker"
              prefix="> "
            />
            <div className="w-20 h-1 bg-neon-green rounded-full mb-6 shadow-[0_0_10px_var(--neon-green)]" />

            <p className="text-fg/80 leading-relaxed mb-4 text-base">
              {isAr ? (
                <>
                  هل سألت نفسك يوماً:{" "}
                  <span className="text-white font-semibold">
                    "هل شبكتي آمنة حقاً؟"
                  </span>{" "}
                  أنا الخبير خالد محمد عودة الحربي — وأنا هنا لأجيبك على هذا السؤال
                  بثقة. لست مجرد شخص يقرأ عن الأمن السيبراني؛ أنا من قضى{" "}
                  <span className="text-neon-green font-bold">+250 ساعة</span>{" "}
                  يتعلّم من{" "}
                  <span className="text-neon-green font-semibold">
                    Coventry University
                  </span>{" "}
                  البريطانية، وحصل على{" "}
                  <span className="text-neon-blue font-bold">12+ شهادة</span>{" "}
                  موثّقة من{" "}
                  <span className="text-neon-blue font-semibold">IBM</span> و{" "}
                  <span className="text-neon-pink font-semibold">Cisco</span> و{" "}
                  <span className="text-neon-green font-semibold">OPSWAT</span>{" "}
                  — كلها قابلة للتحقق على Credly بضغطة زر.
                </>
              ) : (
                <>
                  Ever asked yourself:{" "}
                  <span className="text-white font-semibold">
                    "Is my network truly secure?"
                  </span>{" "}
                  I'm Khalid Mohammed Al-harbi — and I'm here to answer that with
                  confidence. I'm not just someone who reads about cyber security;
                  I've spent{" "}
                  <span className="text-neon-green font-bold">250+ hours</span>{" "}
                  learning from{" "}
                  <span className="text-neon-green font-semibold">
                    Coventry University
                  </span>{" "}
                  (UK), earned{" "}
                  <span className="text-neon-blue font-bold">12+ verified credentials</span>{" "}
                  from{" "}
                  <span className="text-neon-blue font-semibold">IBM</span>,{" "}
                  <span className="text-neon-pink font-semibold">Cisco</span>, and{" "}
                  <span className="text-neon-green font-semibold">OPSWAT</span> — all
                  verifiable on Credly with one click.
                </>
              )}
            </p>

            <p className="text-fg/70 leading-relaxed mb-4">
              {isAr
                ? "ماذا يعني ذلك لك؟ يعني أنك لا تتعامل مع شخص يدّعي الخبرة — بل مع خبير أثبتها بشهادات موثّقة دولارياً. كل ثغرة أكشفها، كل نظام أؤمّنه، وكل شبكة أحميها — مدعومة بعمق أكاديمي وممارسة عملية مختبرة."
                : "What does that mean for you? It means you're not dealing with someone who claims expertise — you're dealing with a professional who proved it with internationally verified credentials. Every vulnerability I find, every system I secure, every network I protect — is backed by academic depth and tested practical experience."}
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[
                { num: "12+", label: isAr ? "شهادة موثّقة" : "Verified Certs", color: "var(--neon-green)" },
                { num: "5", label: isAr ? "مشاريع منجزة" : "Live Projects", color: "var(--neon-blue)" },
                { num: "100%", label: isAr ? "شفافية كاملة" : "Full Transparency", color: "var(--neon-pink)" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center p-3 rounded-lg bg-surface/50 border border-edge hover:border-neon-green/30 transition-colors"
                >
                  <div className="text-2xl font-black mono-tech" style={{ color: s.color }}>
                    {s.num}
                  </div>
                  <div className="text-[10px] text-fg/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA line */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-neon-green/5 border border-neon-green/20 mb-7">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse shrink-0" />
              <p className="text-sm text-fg/70">
                {isAr
                  ? "🏆 لا تدّعي — أثبت. كل شهادتي موثّقة على Credly. تحقق بنفسك قبل أن تتعاقد."
                  : "🏆 I don't claim — I prove. Every credential is verified on Credly. Check for yourself before you contract."}
              </p>
            </div>

            {/* Expertise grid */}
            <h3 className="flex items-center gap-2 text-white font-bold mb-4">
              <ShieldCheck size={18} className="text-neon-green" />
              {t("about.exp_title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-8">
              {expertise.map((e) => {
                const Icon = e.icon;
                return (
                  <div
                    key={e.en}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface/50 transition-colors"
                  >
                    <span className="w-7 h-7 shrink-0 rounded-md bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                      <Icon size={14} className="text-neon-green" />
                    </span>
                    <span className="text-sm text-fg/80">
                      {isAr ? e.ar : e.en}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Platform logos */}
            <h3 className="flex items-center gap-2 text-white font-bold mb-4">
              <ScrollText size={18} className="text-neon-blue" />
              {t("about.platforms_title")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-surface/60 border border-edge hover:border-neon-green/40 transition-all"
                  title={p.name}
                >
                  <span
                    className="w-9 h-9 shrink-0 p-1 rounded-md border"
                    style={{
                      borderColor: `${p.color}50`,
                      backgroundColor: `${p.color}10`,
                    }}
                  >
                    {p.svg}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-bold truncate"
                      style={{ color: p.color }}
                    >
                      {p.short}
                    </p>
                    <p className="text-[10px] text-fg/50 truncate leading-tight">
                      {isAr ? p.role.ar : p.role.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
