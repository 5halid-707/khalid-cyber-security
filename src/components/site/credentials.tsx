import { Award, Clock, BadgeCheck, Building2 } from "lucide-react";
import Reveal from "./reveal";

const credentials = [
  {
    icon: Award,
    title: "شهادة CPD المعتمدة",
    issuer: "The CPD Certification Service — المملكة المتحدة",
    detail: "سجل تطوير مهني معتمد دولياً يثبت الاستمرارية في التعلّم والتطوير",
    color: "var(--neon-green)",
  },
  {
    icon: Clock,
    title: "250 ساعة تدريب متخصص",
    issuer: "ساعة تدريب فعلي معتمدة",
    detail: "تدريب مكثف يشمل أساسيات الأمن السيبراني وحماية الشبكات",
    color: "var(--neon-blue)",
  },
  {
    icon: BadgeCheck,
    title: "Cyber Security Essentials",
    issuer: "Alison — دورة معتمدة",
    detail: "إتقان أساسيات الأمن السيبراني ومبادئه وممارساته",
    color: "var(--neon-pink)",
  },
];

const platforms = [
  {
    name: "Alison",
    desc: "منصة تعليمية معتمدة عالمياً",
    url: "alison.com",
  },
  {
    name: "Cisco",
    desc: "تدريب شبكات معتمد من Cisco",
    url: "cisco.com",
  },
  {
    name: "TryHackMe",
    desc: "تدريب عملي على اختبار الاختراق",
    url: "tryhackme.com",
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="py-24 px-5 bg-surface/50 border-y border-edge">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-blue/70 tracking-[0.3em] mb-3">
            {"// CERTIFICATIONS & CREDENTIALS"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            الشهادات والاعتمادات
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            خبرة موثّقة بشهادات معتمدة دولياً — ضمان الجودة والمصداقية
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-blue rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
        </Reveal>

        {/* Credential cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 120}>
                <div className="relative h-full bg-[#0d1117] rounded-xl p-6 border border-edge hover:border-neon-green/40 transition-colors">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 border"
                    style={{
                      borderColor: c.color,
                      backgroundColor: `color-mix(in srgb, ${c.color} 12%, transparent)`,
                    }}
                  >
                    <Icon size={24} style={{ color: c.color }} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-1.5"
                    style={{ color: c.color }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-sm text-white/90 font-medium mb-2">
                    {c.issuer}
                  </p>
                  <p className="text-sm text-fg/60 leading-relaxed">
                    {c.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Training platforms */}
        <Reveal>
          <div className="bg-[#0d1117] rounded-xl p-7 border border-edge">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={18} className="text-neon-green" />
              <h3 className="text-white font-bold">
                منصات التدريب المعتمدة
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-edge hover:border-neon-green/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center shrink-0">
                    <span className="mono-tech text-neon-green font-bold text-sm">
                      {p.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{p.name}</p>
                    <p className="text-fg/50 text-xs">{p.desc}</p>
                    <p className="mono-tech text-[10px] text-neon-blue/70 mt-0.5">
                      {p.url}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
