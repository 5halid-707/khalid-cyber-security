import { CheckCircle2, Globe2, Cpu, Lock } from "lucide-react";
import Reveal from "./reveal";

const expertise = [
  "أساسيات الأمن السيبراني ومبادئه",
  "كشف ثغرات الأنظمة واختبار الاختراق",
  "حماية الشبكات والأجهزة",
  "تأمين المواقع الإلكترونية",
  "الحماية من البرمجيات الخبيثة",
  "الاستجابة الفورية للتهديدات",
  "حماية المعلومات السرية",
  "الأخلاقيات والامتثال الأمني",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-5 relative">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              {/* Decorative frame */}
              <div className="absolute -inset-3 bg-gradient-to-br from-neon-green/20 via-transparent to-neon-blue/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-neon-green/40 shadow-[0_0_40px_rgba(0,255,204,0.15)]">
                <img
                  src="/khalid-portrait.png"
                  alt="م. خالد الحربي - مهندس أمن سيبراني"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent" />
                {/* Name plate */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#05080f] to-transparent">
                  <p className="text-neon-green mono-tech text-sm">{"// ENGINEER"}</p>
                  <p className="text-white text-xl font-bold">
                    خالد محمد الحربي
                  </p>
                  <p className="text-fg/60 text-sm">
                    Cyber Security Specialist
                  </p>
                </div>
              </div>
              {/* Floating credential chip */}
              <div className="absolute -top-4 -right-4 bg-surface border border-neon-green/50 rounded-lg px-3 py-2 shadow-lg">
                <p className="text-[10px] text-fg/50">معتمد من</p>
                <p className="text-xs font-bold text-neon-green">CPD UK</p>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal className="order-1 lg:order-2" delay={150}>
            <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
              {"// ABOUT ME"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
              مهندس أمن سيبراني معتمد
            </h2>
            <div className="w-20 h-1 bg-neon-green rounded-full mb-6 shadow-[0_0_10px_var(--neon-green)]" />

            <p className="text-fg/75 leading-relaxed mb-5">
              أنا المهندس خالد محمد العضاض الحربي، متخصص في الأمن السيبراني حاصل
              على شهادة <span className="text-neon-green font-semibold">CPD</span>{" "}
              المعتمدة من المملكة المتحدة بعد إتمام 250 ساعة تدريب متخصص. أمتلك
              شهادة{" "}
              <span className="text-neon-blue font-semibold">
                IBM SkillsBuild Cybersecurity
              </span>{" "}
              و7 أوسمة مهارية من IBM، إضافة إلى شهادة{" "}
              <span className="text-neon-pink font-semibold">
                Cisco Network Technician
              </span>{" "}
              و7 دورات من Cisco Networking Academy، و3 مسارات احترافية (15 دورة)
              من <span className="text-neon-green font-semibold">Coventry University</span>{" "}
              البريطانية عبر FutureLearn.
            </p>
            <p className="text-fg/75 leading-relaxed mb-7">
              أعمل على حماية الأنظمة والشبكات من التهديدات السيبرانية، وكشف
              الثغرات قبل استغلالها، وتأمين البيانات الحساسة وفق أحدث المعايير
              العالمية. كل شهاداتي المهنية موثّقة على منصة Credly العالمية
              وقابلة للتحقق إلكترونياً. هدفي تحويل خبرتي التقنية إلى حلول أمنية
              عملية تحمي أعمالك.
            </p>

            {/* Expertise grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-7">
              {expertise.map((e) => (
                <div key={e} className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-neon-green shrink-0"
                  />
                  <span className="text-sm text-fg/80">{e}</span>
                </div>
              ))}
            </div>

            {/* Mini badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Globe2, label: "Alison" },
                { icon: Cpu, label: "Cisco" },
                { icon: Lock, label: "TryHackMe" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-edge text-sm text-fg/70"
                  >
                    <Icon size={14} className="text-neon-blue" />
                    {b.label}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
