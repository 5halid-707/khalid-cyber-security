"use client";

import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Code2,
  Network,
  Lock,
  ScrollText,
  CheckCircle2,
  Info,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";

type Course = { name: string; progress: number };
type Track = {
  icon: typeof ShieldCheck;
  color: string;
  university: string;
  title: string;
  titleAr: string;
  status: string;
  overall: number;
  courses: Course[];
};

const tracks: Track[] = [
  {
    icon: ShieldCheck,
    color: "var(--neon-green)",
    university: "Coventry University · FutureLearn",
    title: "Digital Security Training: Cyber Threats and Risk Management",
    titleAr: "تدريب الأمن الرقمي: التهديدات السيبرانية وإدارة المخاطر",
    status: "مكتمل",
    overall: 100,
    courses: [
      { name: "The Cyber Security Landscape", progress: 100 },
      { name: "Risk Management and Security Vulnerabilities", progress: 100 },
      { name: "Information Security Policy and Management", progress: 100 },
      { name: "Cryptography and Digital Certificates", progress: 100 },
      {
        name: "The Future of Cyber Security and Emerging Technologies",
        progress: 100,
      },
    ],
  },
  {
    icon: Code2,
    color: "var(--neon-blue)",
    university: "Coventry University · FutureLearn",
    title: "Information Security Design and Development",
    titleAr: "تصميم وتطوير الأمن المعلوماتي",
    status: "مكتمل 99%",
    overall: 99,
    courses: [
      {
        name: "How Cyber Security Affects the Software Development Life Cycle",
        progress: 100,
      },
      { name: "Secure System Analysis and Design", progress: 96 },
      { name: "Security System and Application Development", progress: 100 },
      { name: "System Security Testing and Maintenance", progress: 100 },
      { name: "Current Issues in Secure Development", progress: 100 },
    ],
  },
  {
    icon: Network,
    color: "var(--neon-pink)",
    university: "Coventry University · FutureLearn",
    title: "Network Security and Defence",
    titleAr: "أمن الشبكات والدفاع السيبراني",
    status: "مكتمل",
    overall: 100,
    courses: [
      { name: "Introduction to Network Security and Defence", progress: 100 },
      { name: "Network Security and Defence: A History of IT", progress: 100 },
      {
        name: "Network Security and Defence: Network Environments",
        progress: 100,
      },
      {
        name: "Network Security and Defence: Security Architecture",
        progress: 100,
      },
      { name: "The Future of Network Security and Defence", progress: 100 },
    ],
  },
];

function ProgressRing({ value, color }: { value: number; color: string }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#1f2937"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-xs font-bold mono-tech"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
    </div>
  );
}

export default function AcademicCredentials() {
  const { t } = useI18n();
  return (
    <section id="academic" className="py-24 px-5 relative">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {t("academic.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("academic.title")}
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {t("academic.subtitle")}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        {/* University banner */}
        <Reveal className="mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-neon-green/10 via-surface to-neon-blue/10 border border-neon-green/30">
            <div className="w-14 h-14 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center shrink-0">
              <GraduationCap size={28} className="text-neon-green" />
            </div>
            <div className="text-center sm:text-right flex-1">
              <p className="text-white font-bold text-lg">Coventry University</p>
              <p className="text-fg/60 text-sm">
                جامعة بريطانية حكومية • عبر منصة FutureLearn العالمية
              </p>
            </div>
            <div className="flex gap-3 text-center">
              <div>
                <div className="text-2xl font-black text-neon-green mono-tech">
                  3
                </div>
                <div className="text-xs text-fg/50">مسارات</div>
              </div>
              <div>
                <div className="text-2xl font-black text-neon-blue mono-tech">
                  15
                </div>
                <div className="text-xs text-fg/50">دورات</div>
              </div>
              <div>
                <div className="text-2xl font-black text-neon-pink mono-tech">
                  ~150h
                </div>
                <div className="text-xs text-fg/50">ساعة دراسة</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ExpertTracks */}
        <div className="space-y-6">
          {tracks.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={i * 120}>
                <article className="bg-surface rounded-xl border border-edge overflow-hidden hover:border-neon-green/30 transition-colors">
                  {/* Track header */}
                  <div className="p-6 border-b border-edge flex flex-col sm:flex-row sm:items-center gap-4">
                    <div
                      className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl border"
                      style={{
                        borderColor: t.color,
                        backgroundColor: `color-mix(in srgb, ${t.color} 12%, transparent)`,
                        boxShadow: `0 0 18px color-mix(in srgb, ${t.color} 25%, transparent)`,
                      }}
                    >
                      <Icon size={24} style={{ color: t.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] mono-tech uppercase tracking-wider px-2 py-0.5 rounded border"
                          style={{
                            color: t.color,
                            borderColor: `color-mix(in srgb, ${t.color} 40%, transparent)`,
                          }}
                        >
                          ExpertTrack
                        </span>
                        <span className="text-[10px] text-fg/40">
                          {t.university}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-base sm:text-lg leading-tight"
                        style={{ color: t.color }}
                      >
                        {t.titleAr}
                      </h3>
                      <p className="text-xs text-fg/50 mt-0.5 truncate">
                        {t.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <ProgressRing value={t.overall} color={t.color} />
                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{ color: t.color }}
                        >
                          {t.status}
                        </p>
                        <p className="text-[10px] text-fg/50">
                          {t.courses.length} دورات
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Courses list */}
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {t.courses.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-2.5 py-1.5 border-b border-edge/40 last:border-0"
                      >
                        {c.progress === 100 ? (
                          <CheckCircle2
                            size={15}
                            className="shrink-0"
                            style={{ color: t.color }}
                          />
                        ) : (
                          <BookOpen
                            size={15}
                            className="shrink-0 text-fg/40"
                          />
                        )}
                        <span className="text-sm text-fg/80 flex-1 leading-tight">
                          {c.name}
                        </span>
                        <span
                          className="mono-tech text-[10px] shrink-0"
                          style={{
                            color: c.progress === 100 ? t.color : "#6b7280",
                          }}
                        >
                          {c.progress}%
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Skills gained */}
        <Reveal className="mt-10">
          <div className="bg-surface/50 rounded-xl p-6 border border-edge">
            <div className="flex items-center gap-2 mb-4">
              <ScrollText size={18} className="text-neon-blue" />
              <h3 className="text-white font-bold">{t("academic.skills_title")}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "إدارة المخاطر السيبرانية",
                "سياسات الأمن المعلوماتي",
                "التشفير والشهادات الرقمية",
                "دورة حياة التطوير الآمن (SDLC)",
                "تحليل وتصميم الأنظمة الآمنة",
                "اختبار أمن الأنظمة",
                "بنية أمن الشبكات",
                "الدفاع السيبراني",
                "التقنيات الناشئة في الأمن",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1117] border border-edge text-xs text-fg/75"
                >
                  <Lock size={11} className="text-neon-green" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Honest clarification about ExpertTracks */}
        <Reveal className="mt-6">
          <div className="bg-neon-blue/5 rounded-xl p-5 border border-neon-blue/25">
            <div className="flex items-start gap-3">
              <Info
                size={18}
                className="text-neon-blue shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm text-fg/80 leading-relaxed">
                  <span className="text-neon-blue font-bold">
                    {t("academic.clarify.title")}
                  </span>{" "}
                  {t("academic.clarify.body")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
