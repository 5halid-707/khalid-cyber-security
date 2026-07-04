"use client";

import {
  Award,
  BadgeCheck,
  ExternalLink,
  Cloud,
  Scale,
  Siren,
  ShieldAlert,
  Lock,
  Bug,
  Cpu,
  GraduationCap,
  Network,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";

type Badge = {
  name: string;
  nameAr: string;
  icon: typeof Cloud;
  date: string;
  verify: string;
};

// Real IBM SkillsBuild badges (verifiable on Credly)
const ibmBadges: Badge[] = [
  {
    name: "Cloud Security",
    nameAr: "أمن السحابة",
    icon: Cloud,
    date: "Feb 11, 2026",
    verify:
      "https://www.credly.com/badges/87e082ec-9ebd-4203-9a42-e22178c6a647",
  },
  {
    name: "Governance, Risk, Compliance & Data Privacy",
    nameAr: "الحوكمة والمخاطر والامتثال",
    icon: Scale,
    date: "Feb 08, 2026",
    verify:
      "https://www.credly.com/badges/c648e19b-35c5-467a-bd18-0263ecf6e332",
  },
  {
    name: "Incident Response & Systems Forensics",
    nameAr: "الاستجابة للحوادث والتحقيق الجنائي",
    icon: Siren,
    date: "Feb 11, 2026",
    verify:
      "https://www.credly.com/badges/60abf309-e6c8-4eaf-95bf-2550a8f00dde",
  },
  {
    name: "Security Operations & Management",
    nameAr: "عمليات وإدارة الأمن",
    icon: ShieldAlert,
    date: "Feb 11, 2026",
    verify:
      "https://www.credly.com/badges/78da6b71-cda4-404f-bb44-1ed9d4aaaed1",
  },
  {
    name: "System & Network Security",
    nameAr: "أمن الأنظمة والشبكات",
    icon: Lock,
    date: "Feb 10, 2026",
    verify:
      "https://www.credly.com/badges/2c4d7da9-99a7-409a-b738-e05ec98ac9eb",
  },
  {
    name: "Vulnerability Management",
    nameAr: "إدارة الثغرات",
    icon: Bug,
    date: "Feb 08, 2026",
    verify:
      "https://www.credly.com/badges/b6d9842c-4fca-47f8-8ede-be76621c52aa",
  },
  {
    name: "Information Technology Fundamentals",
    nameAr: "أساسيات تقنية المعلومات",
    icon: Cpu,
    date: "Feb 12, 2026",
    verify:
      "https://www.credly.com/badges/0445dd62-210e-4d26-91cb-23d927580fcb",
  },
];

const ciscoCourses = [
  "Ethical Hacker",
  "Network Defense",
  "Endpoint Security",
  "Cyber Threat Management",
  "Networking Basics",
  "Networking Devices & Initial Configuration",
  "Network Support & Security",
];

export default function Credentials() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";

  return (
    <section
      id="credentials"
      className="py-24 px-5 bg-surface/50 border-y border-edge"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-blue/70 tracking-[0.3em] mb-3">
            {t("creds.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t("creds.title")}
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {t("creds.subtitle")}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-blue rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
        </Reveal>

        {/* Top credential banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* CPD UK */}
          <Reveal>
            <div className="relative h-full bg-[#0d1117] rounded-xl p-6 border border-neon-green/40 shadow-[0_0_25px_rgba(0,255,204,0.08)]">
              <div className="absolute top-4 left-4">
                <Award size={28} className="text-neon-green" />
              </div>
              <div className="pl-12">
                <p className="text-xs text-neon-green/70 mono-tech mb-1">
                  {"// CPD UK"}
                </p>
                <h3 className="text-lg font-bold text-neon-green mb-1.5">
                  شهادة CPD المعتمدة
                </h3>
                <p className="text-sm text-white/90 font-medium mb-2">
                  The CPD Certification Service — UK
                </p>
                <p className="text-sm text-fg/60 leading-relaxed">
                  250 ساعة تطوير مهني مستمر معتمدة دولياً (2026)
                </p>
              </div>
            </div>
          </Reveal>

          {/* IBM SkillsBuild Cybersecurity Certificate */}
          <Reveal delay={120}>
            <div className="relative h-full bg-[#0d1117] rounded-xl p-6 border border-neon-blue/40 shadow-[0_0_25px_rgba(0,168,232,0.08)]">
              <div className="absolute top-4 left-4">
                <GraduationCap size={28} className="text-neon-blue" />
              </div>
              <div className="pl-12">
                <p className="text-xs text-neon-blue/70 mono-tech mb-1">
                  {"// IBM SKILLSBUILD"}
                </p>
                <h3 className="text-lg font-bold text-neon-blue mb-1.5">
                  شهادة الأمن السيبراني
                </h3>
                <p className="text-sm text-white/90 font-medium mb-2">
                  IBM SkillsBuild Cybersecurity
                </p>
                <a
                  href="https://www.credly.com/badges/4302166d-927b-4610-98a0-7b856c955268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-neon-blue hover:underline"
                >
                  <BadgeCheck size={13} />
                  تحقق من الشهادة
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Cisco Network Technician */}
          <Reveal delay={240}>
            <div className="relative h-full bg-[#0d1117] rounded-xl p-6 border border-neon-pink/40 shadow-[0_0_25px_rgba(255,0,204,0.08)]">
              <div className="absolute top-4 left-4">
                <Network size={28} className="text-neon-pink" />
              </div>
              <div className="pl-12">
                <p className="text-xs text-neon-pink/70 mono-tech mb-1">
                  {"// CISCO NETWORKING ACADEMY"}
                </p>
                <h3 className="text-lg font-bold text-neon-pink mb-1.5">
                  Network Technician
                </h3>
                <p className="text-sm text-white/90 font-medium mb-2">
                  Cisco Networking Academy — Aug 2025
                </p>
                <p className="text-sm text-fg/60 leading-relaxed">
                  مسار فني شبكات معتمد — موقّع من مدير Cisco Academy
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* IBM SkillsBuild badges grid */}
        <Reveal>
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap size={20} className="text-neon-blue" />
            <h3 className="text-xl font-bold text-white">
              {t("creds.ibm.title")}
            </h3>
            <span className="text-xs text-fg/50 mr-2">
              {t("creds.ibm.subtitle")}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ibmBadges.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.name} delay={i * 60}>
                <a
                  href={b.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-xl bg-[#0d1117] border border-edge hover:border-neon-blue/50 hover:bg-neon-blue/5 transition-all"
                >
                  <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg bg-neon-blue/10 border border-neon-blue/30 group-hover:scale-110 transition-transform">
                    <Icon size={20} className="text-neon-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight mb-0.5">
                      {b.nameAr}
                    </p>
                    <p className="text-fg/50 text-xs truncate mb-1.5">
                      {b.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="mono-tech text-[10px] text-neon-blue/70">
                        {b.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-fg/40 group-hover:text-neon-blue transition-colors">
                        <BadgeCheck size={11} />
                        تحقق
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Cisco courses completed */}
        <Reveal>
          <div className="bg-[#0d1117] rounded-xl p-7 border border-edge">
            <div className="flex items-center gap-2 mb-5">
              <Network size={18} className="text-neon-pink" />
              <h3 className="text-white font-bold">
                {t("creds.cisco.title")}
              </h3>
              <span className="text-xs text-fg/50 mr-2">
                {t("creds.cisco.subtitle")}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ciscoCourses.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-surface border border-edge"
                >
                  <BadgeCheck size={16} className="text-neon-pink shrink-0" />
                  <span className="text-sm text-fg/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Verification note */}
        <Reveal>
          <div className="mt-8 flex items-center justify-center gap-2 text-center">
            <BadgeCheck size={16} className="text-neon-green" />
            <p className="text-sm text-fg/50">{t("creds.verify_note")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
