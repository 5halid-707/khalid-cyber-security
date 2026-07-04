import { ArrowUpLeft } from "lucide-react";
import Reveal from "./reveal";

const projects = [
  {
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop",
    title: "تأمين شبكات المؤسسات",
    desc: "تقسيم شبكات وعزل DMZ بواسطة pfSense.",
    tag: "الأمن السيبراني",
    color: "var(--neon-green)",
  },
  {
    img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1528&auto=format&fit=crop",
    title: "تصميم مودلز (عبايات/ذهب)",
    desc: "تصميم 3D لمنتجات الماركات للمتاجر.",
    tag: "التسويق والتصميم",
    color: "var(--neon-pink)",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    title: "تطبيق كاشير (POS)",
    desc: "نظام نقاط بيع متكامل مع تقارير مالية.",
    tag: "برمجة التطبيقات",
    color: "var(--neon-blue)",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-blue/70 tracking-[0.3em] mb-3">
            {"// PORTFOLIO"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            معرض الإبداعات
          </h2>
          <div className="w-20 h-1 mx-auto bg-neon-blue rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 150}>
              <article className="shine-wrap group relative bg-surface rounded-xl overflow-hidden border border-edge transition-all duration-500 hover:border-neon-green hover:shadow-[0_0_25px_rgba(0,255,204,0.2)]">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale contrast-125 opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border"
                    style={{
                      color: p.color,
                      borderColor: `color-mix(in srgb, ${p.color} 50%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${p.color} 15%, transparent)`,
                    }}
                  >
                    {p.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-lg font-bold mb-2 flex items-center justify-between"
                    style={{ color: p.color }}
                  >
                    {p.title}
                    <ArrowUpLeft
                      size={18}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </h3>
                  <p className="text-fg/70 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
