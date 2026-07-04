import { ShieldHalf, Code2, Megaphone } from "lucide-react";
import Reveal from "./reveal";

const services = [
  {
    icon: ShieldHalf,
    color: "var(--neon-green)",
    title: "الأمن السيبراني",
    desc: "اختبار اختراق، هندسة شبكات (pfSense/Cisco)، وحماية البيانات.",
    points: ["اختبار اختراق احترافي", "هندسة شبكات مؤسسية", "حماية من الاختراق"],
  },
  {
    icon: Code2,
    color: "var(--neon-blue)",
    title: "برمجة التطبيقات",
    desc: "تطبيقات كاشير، قواعد بيانات شاملة، وتصميم مواقع متجر إلكتروني.",
    points: ["أنظمة نقاط بيع (POS)", "قواعد بيانات متكاملة", "متاجر إلكترونية"],
  },
  {
    icon: Megaphone,
    color: "var(--neon-pink)",
    title: "التسويق والتصميم",
    desc: "إعلانات (مثل أمازون)، إنفوجرافيك، وتصميم مودلز (عبايات، ذهب).",
    points: ["إعلانات احترافية", "تصميم مودلز 3D", "مونتاج فيديو"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {"// OUR SERVICES"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            خدماتنا المتكاملة
          </h2>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 150}>
                <article className="group relative h-full bg-surface border border-edge rounded-xl p-7 text-center transition-all duration-400 hover:-translate-y-2 hover:border-neon-green hover:shadow-[0_10px_40px_-10px_rgba(0,255,204,0.25)]">
                  {/* corner accent */}
                  <span
                    className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: s.color }}
                  />
                  <span
                    className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: s.color }}
                  />

                  <div
                    className="mx-auto mb-5 w-16 h-16 flex items-center justify-center rounded-2xl border transition-transform group-hover:scale-110"
                    style={{
                      borderColor: s.color,
                      backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                      boxShadow: `0 0 18px color-mix(in srgb, ${s.color} 25%, transparent)`,
                    }}
                  >
                    <Icon size={30} style={{ color: s.color }} />
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: s.color }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-fg/70 text-sm leading-relaxed mb-5">
                    {s.desc}
                  </p>

                  <ul className="space-y-2 text-right">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 justify-end text-sm text-fg/80"
                      >
                        <span>{p}</span>
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: s.color }}
                        />
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
