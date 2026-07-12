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
      ar: "تقرير الحماية واختبار الاختراق وإغلاق الثغرات",
      en: "Protection, Penetration Testing & Vulnerability Remediation Report",
    },
    desc: {
      ar: "تقرير أمني احترافي شامل (53 خطوة موثّقة) يحمي شبكاتك ومواقعك وتطبيقاتك الإلكترونية وقواعد بياناتك وكاميراتك من الاختراق مع تحليل اختبارات اختراق لاكتشاف الثغرات وإغلاق جميع الثغرات على شبكتك. صُمم للمؤسسات الصغيرة والمتوسطة والكبيرة وللأفراد — يغطي إعداد pfSense Firewall + Windows Server 2025 + اختبار اختراق Active Directory كامل + إغلاق الثغرات + إعادة الاختبار.",
      en: "Comprehensive professional security report (53 documented steps) protecting your networks, websites, electronic applications, databases, and cameras from breaches with penetration test analysis to discover vulnerabilities and close all vulnerabilities on your network. Designed for small, medium, and large organizations plus individuals — covers pfSense Firewall setup + Windows Server 2025 + full Active Directory penetration test + vulnerability remediation + re-testing.",
    },
    file: "/reports/pfSense-AD-Penetration-Test-Report.docx",
    icon: ShieldCheck,
    color: "var(--neon-green)",
    stats: [
      { label: { ar: "خطوة موثّقة", en: "Documented Steps" }, value: "53" },
      { label: { ar: "ثغرات مكتشفة ومغلقة", en: "Vulns Found & Fixed" }, value: "5" },
      { label: { ar: "نسبة الإغلاق", en: "Remediation Rate" }, value: "100%" },
    ],
    highlights: [
      { ar: "🛡️ حماية شبكاتك: إعداد pfSense Firewall (ZFS + WAN/LAN + DHCP + قواعد جدار الحماية + حظر Nmap)", en: "🛡️ Network Protection: pfSense Firewall setup (ZFS + WAN/LAN + DHCP + firewall rules + Nmap blocking)" },
      { ar: "🔐 حماية مواقعك وتطبيقاتك: Windows Server 2025 + Active Directory (Domain Controller + OUs + GPO + 5 مستخدمين)", en: "🔐 Web & App Protection: Windows Server 2025 + Active Directory (DC + OUs + GPO + 5 users)" },
      { ar: "📷 حماية كاميراتك من الاختراق: تأمين كاميرات المراقبة + منع الوصول غير المصرّح + عزلها عن شبكة البيانات", en: "📷 Camera Protection: secure surveillance cameras + block unauthorized access + network segmentation" },
      { ar: "🔍 تحليل اختبارات الاختراق لاكتشاف الثغرات: Nmap + Impacket + Responder + BloodHound + Hashcat + Wireshark", en: "🔍 Penetration Test Analysis: Nmap + Impacket + Responder + BloodHound + Hashcat + Wireshark" },
      { ar: "🚨 اكتشاف الثغرات: SMB Null Session + LLMNR Poisoning + GPP Passwords + LDAP RootDSE + Credential Interception", en: "🚨 Vulnerability Discovery: SMB Null Session + LLMNR Poisoning + GPP Passwords + LDAP RootDSE + Credential Interception" },
      { ar: "🔒 إغلاق جميع الثغرات على شبكتك: GPO + Registry Hardening + عزل الكاميرات + إعادة اختبار ناجح 100%", en: "🔒 Close All Network Vulnerabilities: GPO + Registry Hardening + camera isolation + successful Re-Testing 100%" },
      { ar: "💾 حماية قاعدة بياناتك: منع اعتراض بيانات الاعتماد + حظر الوصول غير المصرّح", en: "💾 Database Protection: prevent credential interception + block unauthorized access" },
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
                        {isAr ? "تحميل التقرير الكامل (DOCX)" : "Download Full Report (DOCX)"}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Target Audience — لمن هذا التقرير */}
        <Reveal className="mt-10">
          <div className="p-6 rounded-2xl bg-surface/60 border border-edge">
            <h3 className="text-center text-lg font-bold text-white mb-2">
              {isAr ? "📊 لمن هذا التقرير؟" : "📊 Who Is This Report For?"}
            </h3>
            <p className="text-center text-sm text-fg/60 mb-6">
              {isAr
                ? "يغطي احتياجات جميع فئات العملاء — من الأفراد للمؤسسات الكبيرة"
                : "Covers all client segments — from individuals to large enterprises"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "👤",
                  titleAr: "الأفراد", titleEn: "Individuals",
                  descAr: "حماية بياناتك الشخصية وأجهزتك المنزلية", descEn: "Protect personal data and home devices",
                  color: "#00ffcc",
                },
                {
                  icon: "🏢",
                  titleAr: "المؤسسات الصغيرة", titleEn: "Small Businesses",
                  descAr: "1-50 موظف — متاجر، شركات ناشئة، استشارات", descEn: "1-50 employees — shops, startups, consultancies",
                  color: "#00a8e8",
                },
                {
                  icon: "🏬",
                  titleAr: "المؤسسات المتوسطة", titleEn: "Medium Organizations",
                  descAr: "50-250 موظف — شركات، مدارس، عيادات", descEn: "50-250 employees — companies, schools, clinics",
                  color: "#ff00cc",
                },
                {
                  icon: "🏛️",
                  titleAr: "المؤسسات الكبيرة", titleEn: "Large Enterprises",
                  descAr: "250+ موظف — شركات حكومية، بنوك، مصانع", descEn: "250+ employees — gov, banks, manufacturing",
                  color: "#00ffcc",
                },
              ].map((seg, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border bg-[#0d1117] text-center hover:scale-105 transition-transform"
                  style={{ borderColor: `${seg.color}40` }}
                >
                  <div className="text-3xl mb-2">{seg.icon}</div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: seg.color }}>
                    {isAr ? seg.titleAr : seg.titleEn}
                  </h4>
                  <p className="text-[11px] text-fg/55 leading-relaxed">
                    {isAr ? seg.descAr : seg.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What you get — ماذا تحصل عليه */}
        <Reveal className="mt-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-neon-green/10 to-transparent border border-neon-green/30">
            <h3 className="text-center text-lg font-bold text-neon-green mb-4">
              {isAr ? "🎯 ماذا تحصل عليه مع هذا التقرير؟" : "🎯 What You Get With This Report?"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { ar: "🛡️ حماية شبكاتك من الاختراق والهجمات السيبرانية", en: "🛡️ Network protection from breaches and cyber attacks" },
                { ar: "🔐 تأمين مواقعك وتطبيقاتك الإلكترونية", en: "🔐 Secure your websites and electronic applications" },
                { ar: "📷 حماية كاميراتك من الاختراق والتجسس", en: "📷 Protect your cameras from breaches and spying" },
                { ar: "💾 حماية قاعدة بياناتك من السرقة والتسريب", en: "💾 Protect your database from theft and leakage" },
                { ar: "🔍 تحليل اختبارات اختراق لاكتشاف الثغرات", en: "🔍 Penetration test analysis to discover vulnerabilities" },
                { ar: "🔒 إغلاق جميع الثغرات على شبكتك + إعادة اختبار", en: "🔒 Close all vulnerabilities on your network + re-testing" },
                { ar: "📋 توثيق احترافي ثنائي اللغة (عربي/إنجليزي)", en: "📋 Professional bilingual documentation (AR/EN)" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-fg/80">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-neon-green" />
                  <span>{isAr ? item.ar : item.en}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

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
