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
  ExternalLink,
  Briefcase,
  Search,
  Building2,
  Calendar,
  FlaskConical,
  ClipboardCheck,
  FolderKanban,
  Hotel,
  ShoppingCart,
  Settings,
  Calculator,
  Gem,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

// Professional work experience — خبراتي المهنية في الشركات
const workExperience = [
  {
    role: { ar: "باحث أمني", en: "Security Researcher" },
    company: { ar: "ذا هكر ون", en: "TheHackerOne" },
    period: { ar: "حالياً", en: "Current" },
    current: true,
    url: "https://thehackerone.com",
    desc: {
      ar: "أعمل حالياً كباحث أمني في شركة ذي هكر ون العالمية — أبحث عن الثغرات، أحلل التهديدات، وأساهم في تطوير حلول أمنية متقدمة لحماية المنظومات.",
      en: "Currently working as a Security Researcher at TheHackerOne — researching vulnerabilities, analyzing threats, and contributing to advanced security solutions.",
    },
    icon: Search,
    color: "var(--neon-green)",
  },
  {
    role: { ar: "مدير مختبر جيوتقنية", en: "Geotechnical Lab Manager" },
    company: { ar: "شركة الدكتور عايد عيد العصيمي", en: "Dr. Aied Eid Al-Osaimi Co." },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "أدرت المختبر الجيوتقني وأشرفت على الفحوصات والتجارب التقنية — ضمان دقة النتائج ومراقبة جودة العمل المخبري وفق المعايير المعتمدة.",
      en: "Managed the geotechnical lab and supervised technical tests and experiments — ensuring result accuracy and monitoring lab work quality per approved standards.",
    },
    icon: FlaskConical,
    color: "var(--neon-blue)",
  },
  {
    role: { ar: "فني مختبر", en: "Lab Technician" },
    company: { ar: "شركة أر آر سي", en: "RRC Company" },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "عملت كفني مختبر — أجريت الفحوصات والتجارب المخبرية، جهّزت العينات، ووثّقت النتائج التقنية بدقة عالية.",
      en: "Worked as a lab technician — conducted lab tests and experiments, prepared samples, and documented technical results with high accuracy.",
    },
    icon: ClipboardCheck,
    color: "var(--neon-pink)",
  },
  {
    role: { ar: "مشرف مشاريع", en: "Projects Supervisor" },
    company: { ar: "شركة المرجان", en: "Al-Mirjan Company" },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "أشرفت على تنفيذ المشاريع وضمان إنجازها وفق الجدول الزمني والمواصفات — تنسيق الفرق ومراقبة جودة التنفيذ.",
      en: "Supervised project execution ensuring on-time delivery per specs — coordinating teams and monitoring execution quality.",
    },
    icon: FolderKanban,
    color: "var(--neon-green)",
  },
  {
    role: { ar: "مشرف منتجع + مصمم مواقع ومتاجر", en: "Resort Supervisor & Web/Store Designer" },
    company: { ar: "منتجع سيشيلز + فندق بلو كورال", en: "Seychelles Resort + Blue Coral Hotel" },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "أشرفت على إدارة منتجع سيشيلز، ومصمم مواقع ومتاجر إلكترونية لفندق بلو كورال ومنتجع سيشيلز — جمعت بين الإدارة والتصميم التقني.",
      en: "Supervised Seychelles Resort operations and designed websites & e-commerce stores for Blue Coral Hotel and Seychelles Resort — blending management with technical design.",
    },
    icon: Hotel,
    color: "var(--neon-blue)",
  },
  {
    role: { ar: "مصمم ومبرمج وحامي متجر سوبر ماركت الجبال", en: "Designer, Developer & Security Specialist" },
    company: { ar: "شركة الجبال الاقتصادية المحدودة", en: "Al-Jibal Economic Co. Ltd." },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "صمّمت وبرمجت وحميت متجر سوبر ماركت الجبال الإلكتروني — من التصميم والتطوير حتى تأمين الموقع وحماية بيانات العملاء.",
      en: "Designed, developed, and secured Al-Jibal Supermarket e-commerce store — from design and development to site security and customer data protection.",
    },
    icon: ShoppingCart,
    color: "var(--neon-pink)",
  },
  {
    role: { ar: "مدير إداري", en: "Administrative Manager" },
    company: { ar: "الخدمات المساندة المحدودة للدعم اللوجستي (كامباوند سعودي أوجيه)", en: "Supportive Services Co. (Saudi Oger Compound)" },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "أدرت العمليات الإدارية في موقع كامباوند شركة سعودي أوجيه — الإشراف على الفرق اللوجستية وضمان سير العمليات بكفاءة.",
      en: "Managed administrative operations at Saudi Oger Compound site — supervising logistics teams and ensuring efficient operations.",
    },
    icon: Settings,
    color: "var(--neon-green)",
  },
  {
    role: { ar: "مدير حسابات", en: "Accounts Manager" },
    company: { ar: "شركة STC", en: "STC (Saudi Telecom Company)" },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "أدرت الحسابات المالية في شركة الاتصالات السعودية STC — متابعة الفواتير والمصروفات والتقارير المالية بدقة.",
      en: "Managed financial accounts at STC — tracking invoices, expenses, and financial reports with accuracy.",
    },
    icon: Calculator,
    color: "var(--neon-blue)",
  },
  {
    role: { ar: "مشرف معرض", en: "Exhibition Supervisor" },
    company: { ar: "تيفاني العالمية للمجوهرات", en: "Tiffany & Co. International Jewelry" },
    period: { ar: "سابقاً", en: "Previous" },
    current: false,
    desc: {
      ar: "أشرفت على معرض تيفاني العالمية للمجوهرات — إدارة العرض وتنسيق القطع وتقديم تجربة عملاء راقية.",
      en: "Supervised Tiffany International Jewelry exhibition — managing displays, coordinating pieces, and delivering premium customer experience.",
    },
    icon: Gem,
    color: "var(--neon-pink)",
  },
];

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
    url: "https://www.coventry.ac.uk/",
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
    url: "https://skillsbuild.org/",
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
    url: "https://www.netacad.com/",
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
    url: "https://cpduk.co.uk/",
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
    url: "https://www.futurelearn.com/",
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
    url: "https://www.credly.com/users/khalid-mohammed-alharbi",
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
                  alt="Khalid Al-harbi - Cyber Security Expert"
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

            {/* Professional Work Experience — خبراتي المهنية */}
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={20} className="text-neon-blue" />
              <h3 className="text-lg font-bold text-white">
                {isAr ? "خبراتي المهنية" : "Professional Experience"}
              </h3>
              <span className="text-xs text-fg/40 mono-tech mr-1">
                ({workExperience.length} {isAr ? "وظائف" : "roles"})
              </span>
            </div>
            <p className="text-xs text-fg/50 mb-4">
              {isAr
                ? "مسيرة مهنية متنوعة عبر شركات رائدة — من الإدارة والمختبرات إلى الأمن السيبراني والبحث العلمي"
                : "A diverse career across leading companies — from management and labs to cyber security and research"}
            </p>
            <div className="space-y-2.5 mb-8 max-h-[640px] overflow-y-auto pr-1 custom-scroll">
              {workExperience.map((job, i) => {
                const Icon = job.icon;
                return (
                  <div
                    key={i}
                    className="relative p-3 sm:p-4 rounded-xl bg-surface/60 border transition-all hover:bg-surface/80"
                    style={{ borderColor: job.current ? `${job.color}60` : "#1f2937" }}
                  >
                    {job.current && (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-green/15 border border-neon-green/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-[9px] text-neon-green font-bold mono-tech">
                          {isAr ? "حالياً" : "NOW"}
                        </span>
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      {/* Number badge */}
                      <span
                        className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-black mono-tech border"
                        style={{
                          color: job.color,
                          borderColor: `${job.color}50`,
                          backgroundColor: `${job.color}10`,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Icon */}
                      <span
                        className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border"
                        style={{
                          borderColor: `${job.color}50`,
                          backgroundColor: `${job.color}10`,
                          boxShadow: job.current ? `0 0 12px ${job.color}30` : "none",
                        }}
                      >
                        <Icon size={18} style={{ color: job.color }} />
                      </span>
                      <div className="flex-1 min-w-0 pr-14">
                        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                          <h4 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: job.color }}>
                            {isAr ? job.role.ar : job.role.en}
                          </h4>
                        </div>
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-neon-green transition-colors mb-1"
                          >
                            <Building2 size={11} className="shrink-0" />
                            <span className="truncate">{isAr ? job.company.ar : job.company.en}</span>
                            <ExternalLink size={9} className="shrink-0 opacity-50" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-white mb-1">
                            <Building2 size={11} className="shrink-0" />
                            <span className="truncate">{isAr ? job.company.ar : job.company.en}</span>
                          </span>
                        )}
                        <p className="text-[11px] sm:text-xs text-fg/55 leading-relaxed mb-1.5 line-clamp-2">
                          {isAr ? job.desc.ar : job.desc.en}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[9px] text-fg/40 mono-tech">
                          <Calendar size={9} />
                          {isAr ? job.period.ar : job.period.en}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <style>{`
              .custom-scroll::-webkit-scrollbar { width: 5px; }
              .custom-scroll::-webkit-scrollbar-track { background: transparent; }
              .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.3); border-radius: 3px; }
              .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,168,232,0.5); }
              .line-clamp-2 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            `}</style>

            {/* Expertise grid — خبراتي العملية */}
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck size={20} className="text-neon-green" />
              <h3 className="text-lg font-bold text-white">
                {isAr ? "خبراتي العملية" : "My Practical Expertise"}
              </h3>
            </div>
            <p className="text-xs text-fg/50 mb-4">
              {isAr
                ? "8 مجالات أمن سيبراني أتقنها عملياً — من الاختراق الأخلاقي حتى الدفاع السيبراني"
                : "8 cyber security domains I master practically — from ethical hacking to cyber defense"}
            </p>
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
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 p-2.5 rounded-lg bg-surface/60 border border-edge hover:border-neon-green/40 hover:bg-surface/80 transition-all cursor-pointer"
                  title={`${p.name} — ${isAr ? "اضغط للزيارة" : "Click to visit"}`}
                >
                  <span
                    className="w-9 h-9 shrink-0 p-1 rounded-md border group-hover:scale-110 transition-transform"
                    style={{
                      borderColor: `${p.color}50`,
                      backgroundColor: `${p.color}10`,
                    }}
                  >
                    {p.svg}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-bold truncate flex items-center gap-1"
                      style={{ color: p.color }}
                    >
                      {p.short}
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </p>
                    <p className="text-[10px] text-fg/50 truncate leading-tight">
                      {isAr ? p.role.ar : p.role.en}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
