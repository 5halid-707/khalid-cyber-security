"use client";

import {
  Award,
  BadgeCheck,
  ExternalLink,
  Calendar,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Reveal from "./reveal";
import TypedHeading from "./typed-heading";
import { useI18n } from "./i18n";

type Cert = {
  image: string;
  title: { ar: string; en: string };
  issuer: { ar: string; en: string };
  date: string;
  verifyUrl: string;
  color: string;
};

const certs: Cert[] = [
  {
    image: "/certs/cpd-250.svg",
    title: {
      ar: "شهادة CPD المعتمدة — 250 ساعة تطوير مهني",
      en: "CPD Certified — 250 Professional Development Hours",
    },
    issuer: { ar: "CPD UK — المملكة المتحدة", en: "CPD UK — United Kingdom" },
    date: "2026",
    verifyUrl: "https://cpduk.co.uk/",
    color: "#00ffcc",
  },
  {
    image: "/certs/ibm-cybersecurity.svg",
    title: {
      ar: "IBM SkillsBuild — شهادة الأمن السيبراني",
      en: "IBM SkillsBuild — Cybersecurity Certificate",
    },
    issuer: { ar: "IBM — أمريكا", en: "IBM — USA" },
    date: "Feb 11, 2026",
    verifyUrl: "https://www.credly.com/users/khalid-mohammed-alharbi",
    color: "#00a8e8",
  },
  {
    image: "/certs/ibm-cloud-security.svg",
    title: {
      ar: "IBM — أمن السحابة (Cloud Security)",
      en: "IBM — Cloud Security Badge",
    },
    issuer: { ar: "IBM SkillsBuild", en: "IBM SkillsBuild" },
    date: "Feb 11, 2026",
    verifyUrl: "https://www.credly.com/users/khalid-mohammed-alharbi",
    color: "#1ba0d7",
  },
  {
    image: "/certs/ibm-grc.svg",
    title: {
      ar: "IBM — الحوكمة والمخاطر والامتثال (GRC)",
      en: "IBM — Governance, Risk & Compliance",
    },
    issuer: { ar: "IBM SkillsBuild", en: "IBM SkillsBuild" },
    date: "Feb 08, 2026",
    verifyUrl: "https://www.credly.com/users/khalid-mohammed-alharbi",
    color: "#0a84ff",
  },
  {
    image: "/certs/ibm-security-ops.svg",
    title: {
      ar: "IBM — عمليات وإدارة الأمن (Security Ops)",
      en: "IBM — Security Operations & Management",
    },
    issuer: { ar: "IBM SkillsBuild", en: "IBM SkillsBuild" },
    date: "Feb 11, 2026",
    verifyUrl: "https://www.credly.com/users/khalid-mohammed-alharbi",
    color: "#0066ff",
  },
  {
    image: "/certs/cisco-ethical-hacker.svg",
    title: {
      ar: "Cisco — الهاكر الأخلاقي (Ethical Hacker)",
      en: "Cisco — Ethical Hacker Badge",
    },
    issuer: { ar: "Cisco Networking Academy", en: "Cisco Networking Academy" },
    date: "Aug 05, 2025",
    verifyUrl: "https://www.credly.com/users/khalid-mohammed-alharbi",
    color: "#1ba0d7",
  },
  {
    image: "/certs/hp-professional-networking.svg",
    title: {
      ar: "HP LIFE — الشبكات الاحترافية",
      en: "HP LIFE — Professional Networking",
    },
    issuer: { ar: "HP LIFE", en: "HP LIFE" },
    date: "2025",
    verifyUrl: "https://www.life-global.org/",
    color: "#0096d6",
  },
  {
    image: "/certs/alison-cyber.svg",
    title: {
      ar: "Alison — أساسيات الأمن السيبراني (250 ساعة)",
      en: "Alison — Cyber Security Essentials (250 hrs)",
    },
    issuer: { ar: "Alison — أيرلندا", en: "Alison — Ireland" },
    date: "Feb 01, 2026",
    verifyUrl: "https://alison.com/",
    color: "#00ffcc",
  },
];

export default function CertificateGallery() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="certificates" className="py-24 px-5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(0,168,232,0.10), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,255,204,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {t("certs.eyebrow")}
          </p>
          <TypedHeading
            text={t("certs.title")}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-3xl mx-auto mb-5">
            {t("certs.subtitle")}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        {/* Stats bar — 21 شهادة, 5 جهات, 250+ ساعة, 100% موثّق */}
        <Reveal className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { num: "21", label: isAr ? "شهادة" : "Certificates", color: "var(--neon-green)", icon: Award },
              { num: "5", label: isAr ? "جهات إصدار" : "Issuing Bodies", color: "var(--neon-blue)", icon: Building2 },
              { num: "250+", label: isAr ? "ساعة CPD" : "CPD Hours", color: "var(--neon-pink)", icon: ShieldCheck },
              { num: "100%", label: isAr ? "موثّق" : "Verified", color: "var(--neon-green)", icon: BadgeCheck },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="text-center p-4 rounded-lg bg-surface/60 border border-edge hover:border-neon-green/30 transition-colors"
                >
                  <Icon size={18} className="mx-auto mb-1.5" style={{ color: s.color }} />
                  <div className="text-2xl font-black mono-tech" style={{ color: s.color }}>
                    {s.num}
                  </div>
                  <div className="text-[10px] text-fg/50 mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Certificates grid — responsive with horizontal swipe on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((c, idx) => (
            <Reveal key={c.image} delay={idx * 50}>
              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl bg-surface/60 border-2 border-edge hover:bg-surface/80 transition-all overflow-hidden"
                style={{ borderColor: `${c.color}30` }}
              >
                {/* Top accent line */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${c.color}, transparent)`,
                  }}
                />

                {/* Certificate image */}
                <div className="relative aspect-[4/3] bg-[#0a0e16] overflow-hidden border-b border-edge">
                  <img
                    src={c.image}
                    alt={isAr ? c.title.ar : c.title.en}
                    className="w-full h-full object-contain p-3 transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Verify badge overlay */}
                  <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-neon-green/40">
                    <BadgeCheck size={11} className="text-neon-green" />
                    <span className="text-[8px] text-neon-green font-bold mono-tech">
                      {isAr ? "موثّق" : "VERIFIED"}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p
                    className="text-[10px] mono-tech font-bold mb-1.5 flex items-center gap-1"
                    style={{ color: c.color }}
                  >
                    <Building2 size={11} />
                    {isAr ? c.issuer.ar : c.issuer.en}
                  </p>
                  <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-3">
                    {isAr ? c.title.ar : c.title.en}
                  </h3>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] text-fg/50 mono-tech">
                      <Calendar size={10} />
                      {c.date}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold transition-colors"
                      style={{ color: c.color }}
                    >
                      {t("certs.verify")}
                      <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Verify note */}
        <Reveal className="text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30">
            <ShieldCheck size={16} className="text-neon-blue" />
            <p className="text-sm text-fg/70">
              {isAr
                ? "جميع الشهادات موثّقة إلكترونياً — اضغط أي شهادة للتحقق منها على Credly"
                : "All certificates are electronically verified — click any to verify on Credly"}
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
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
