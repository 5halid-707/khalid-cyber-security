"use client";

import {
  FileText,
  Download,
  ShieldCheck,
  Bug,
  Lock,
  Server,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

type Report = {
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  file: string;
  icon: typeof FileText;
  color: string;
  stats: { label: { ar: string; en: string }; value: string }[];
  highlights: { ar: string; en: string }[];
};

const reports: Report[] = [
  {
    title: {
      ar: "تقرير اختبار اختراق Active Directory + pfSense",
      en: "Active Directory Penetration Test + pfSense Report",
    },
    desc: {
      ar: "تقرير أمني شامل (48 خطوة) يوثّق إعداد pfSense Firewall + Windows Server 2025 + اختبار اختراق Active Directory كامل مع المعالجة وإعادة الاختبار.",
      en: "Comprehensive security report (48 steps) documenting pfSense Firewall setup + Windows Server 2025 + full Active Directory penetration test with remediation and re-testing.",
    },
    file: "/reports/pfSense-AD-Penetration-Test-Report.docx",
    icon: ShieldCheck,
    color: "var(--neon-green)",
    stats: [
      { label: { ar: "خطوة فحص", en: "Test Steps" }, value: "48" },
      { label: { ar: "ثغرات مكتشفة", en: "Vulnerabilities" }, value: "5" },
      { label: { ar: "نسبة المعالجة", en: "Remediation" }, value: "100%" },
    ],
    highlights: [
      { ar: "إعداد pfSense بـ ZFS + DHCP + قواعد جدار الحماية", en: "pfSense setup with ZFS + DHCP + firewall rules" },
      { ar: "Active Directory: Domain Controller + OUs + GPO", en: "Active Directory: DC + OUs + GPO" },
      { ar: "اختبار اختراق: Nmap + Impacket + Responder + BloodHound + Hashcat", en: "Pen test: Nmap + Impacket + Responder + BloodHound + Hashcat" },
      { ar: "اكتشاف: SMB Null Session + LLMNR Poisoning + GPP Passwords", en: "Findings: SMB Null Session + LLMNR Poisoning + GPP Passwords" },
      { ar: "المعالجة: GPO + Registry Hardening + Re-Testing", en: "Remediation: GPO + Registry Hardening + Re-Testing" },
    ],
  },
];

export default function SecurityReports() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="reports" className="py-24 px-5 relative bg-surface/30">
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {"// SECURITY REPORTS"}
          </p>
          <TypedHeading
            text={isAr ? "التقارير الأمنية الموثّقة" : "Documented Security Reports"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "تقارير اختبار اختراق حقيقية — توثيق احترافي ثنائي اللغة لكل مرحلة من الإعداد حتى المعالجة"
              : "Real penetration test reports — professional bilingual documentation from setup to remediation"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        {/* Reports */}
        <div className="space-y-6">
          {reports.map((report, i) => {
            const Icon = report.icon;
            return (
              <Reveal key={report.file} delay={i * 100}>
                <div
                  className="relative p-6 rounded-2xl bg-[#0d1117] border-2 overflow-hidden"
                  style={{ borderColor: `${report.color}40` }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 20% 50%, ${report.color}15, transparent 60%)`,
                    }}
                  />

                  <div className="relative flex flex-col lg:flex-row gap-6">
                    {/* Left: Icon + Stats */}
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center border shrink-0"
                          style={{
                            borderColor: `${report.color}50`,
                            backgroundColor: `${report.color}10`,
                            boxShadow: `0 0 20px ${report.color}30`,
                          }}
                        >
                          <Icon size={28} style={{ color: report.color }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold leading-tight" style={{ color: report.color }}>
                            {isAr ? report.title.ar : report.title.en}
                          </h3>
                          <p className="text-xs text-fg/50 mt-0.5">DOCX • 11 MB</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {report.stats.map((stat, j) => (
                          <div
                            key={j}
                            className="text-center p-2 rounded-lg border"
                            style={{ borderColor: `${report.color}30`, backgroundColor: `${report.color}05` }}
                          >
                            <div className="text-xl font-black mono-tech" style={{ color: report.color }}>
                              {stat.value}
                            </div>
                            <div className="text-[9px] text-fg/50 mt-0.5">
                              {isAr ? stat.label.ar : stat.label.en}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Description + Highlights + Download */}
                    <div className="lg:w-2/3">
                      <p className="text-sm text-fg/70 leading-relaxed mb-4">
                        {isAr ? report.desc.ar : report.desc.en}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 mb-5">
                        {report.highlights.map((h, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-fg/65">
                            <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: report.color }} />
                            <span>{isAr ? h.ar : h.en}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tools used */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {["Kali Linux", "Nmap", "Impacket", "Hashcat", "Responder", "BloodHound", "Wireshark", "pfSense", "Windows Server 2025", "GPO"].map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] px-2 py-1 rounded-md bg-surface border border-edge text-fg/60 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Download button */}
                      <a
                        href={report.file}
                        download
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all min-h-[44px] touch-manipulation"
                        style={{
                          backgroundColor: report.color,
                          color: "#05080f",
                          boxShadow: `0 0 15px ${report.color}40`,
                        }}
                      >
                        <Download size={18} />
                        {isAr ? "تحميل التقرير (DOCX)" : "Download Report (DOCX)"}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Verification note */}
        <Reveal className="mt-8">
          <div className="flex items-center justify-center gap-2 text-center p-4 rounded-xl bg-neon-green/5 border border-neon-green/20">
            <ShieldCheck size={18} className="text-neon-green shrink-0" />
            <p className="text-sm text-fg/70">
              {isAr
                ? "كل تقاريرنا موثّقة بالصور والأوامر الفعلية — شفافية كاملة قبل التعاقد"
                : "All reports documented with screenshots and actual commands — full transparency before contracting"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
