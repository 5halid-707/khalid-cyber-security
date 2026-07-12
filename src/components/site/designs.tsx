"use client";

import {
  Palette,
  PenTool,
  Image as ImageIcon,
  Megaphone,
  Layout,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

type DesignService = {
  icon: typeof Palette;
  color: string;
  name: { ar: string; en: string };
  desc: { ar: string; en: string };
  examples: { ar: string; en: string }[];
};

const designServices: DesignService[] = [
  {
    icon: PenTool,
    color: "var(--neon-green)",
    name: { ar: "تصميم الشعارات", en: "Logo Design" },
    desc: {
      ar: "تصميم شعارات احترافية فريدة تعكس هوية علامتك التجارية — من المفهوم الأول حتى التسليم النهائي بصيغ متعددة.",
      en: "Professional unique logo designs that reflect your brand identity — from first concept to final delivery in multiple formats.",
    },
    examples: [
      { ar: "شعارات نصية", en: "Wordmarks" },
      { ar: "شعارات رمزية", en: "Symbol logos" },
      { ar: "شعارات مركبة", en: "Combination marks" },
    ],
  },
  {
    icon: Palette,
    color: "var(--neon-blue)",
    name: { ar: "الهوية البصرية", en: "Visual Identity" },
    desc: {
      ar: "بناء هوية بصرية متكاملة — ألوان، خطوط، عناصر رسومية، ودليل استخدام كامل يحافظ على اتساق علامتك التجارية.",
      en: "Complete visual identity systems — colors, typography, graphic elements, and full brand guidelines ensuring consistency.",
    },
    examples: [
      { ar: "لوحة الألوان", en: "Color palette" },
      { ar: "دليل الهوية", en: "Brand guidelines" },
      { ar: "عناصر مساعدة", en: "Supporting elements" },
    ],
  },
  {
    icon: Megaphone,
    color: "var(--neon-pink)",
    name: { ar: "تصميم الإعلانات", en: "Ad Design" },
    desc: {
      ar: "تصميم إعلانات احترافية بأسلوب Amazon والمتاجر العالمية — إعلانات سوشيال ميديا، بانرات، وإعلانات مبيعات تحوّل المتصفح لعميل.",
      en: "Professional ad designs in Amazon/global store style — social media ads, banners, and sales ads that convert browsers to buyers.",
    },
    examples: [
      { ar: "إعلانات سوشيال", en: "Social ads" },
      { ar: "بانرات ويب", en: "Web banners" },
      { ar: "إعلانات أمازون", en: "Amazon-style ads" },
    ],
  },
  {
    icon: ImageIcon,
    color: "var(--neon-green)",
    name: { ar: "تصميم المودلز 3D", en: "3D Model Design" },
    desc: {
      ar: "تصميم مودلز ثلاثية الأبعاد للمنتجات — عبايات، ذهب، شنط، إكسسوارات، وأي منتج تحتاج لعرضه بجودة عالية.",
      en: "3D product modeling — abayas, gold, bags, accessories, and any product you need to showcase in high quality.",
    },
    examples: [
      { ar: "عبايات وأزياء", en: "Abayas & fashion" },
      { ar: "ذهب ومجوهرات", en: "Gold & jewelry" },
      { ar: "شنط وإكسسوارات", en: "Bags & accessories" },
    ],
  },
  {
    icon: Layout,
    color: "var(--neon-blue)",
    name: { ar: "تصميم الواجهات UI/UX", en: "UI/UX Design" },
    desc: {
      ar: "تصميم واجهات تطبيقات ومواقع احترافية — تجربة مستخدم سلسة وواجهة بصرية جذابة تحقق أهدافك التسويقية.",
      en: "Professional app and website UI design — smooth UX and attractive visual interface achieving your marketing goals.",
    },
    examples: [
      { ar: "تطبيقات موبايل", en: "Mobile apps" },
      { ar: "مواقع ويب", en: "Websites" },
      { ar: "لوحات تحكم", en: "Dashboards" },
    ],
  },
  {
    icon: Sparkles,
    color: "var(--neon-pink)",
    name: { ar: "تصميم السوشيال ميديا", en: "Social Media Design" },
    desc: {
      ar: "تصميم محتوى سوشيال ميديا متكامل — بوستات، ستوريز، كفرات، ومحتوى تسويقي يجذب جمهورك ويزيد التفاعل.",
      en: "Complete social media content design — posts, stories, covers, and marketing content that engages your audience.",
    },
    examples: [
      { ar: "بوستات وستوريز", en: "Posts & stories" },
      { ar: "كفرات صفحات", en: "Page covers" },
      { ar: "محتوى تسويقي", en: "Marketing content" },
    ],
  },
];

export default function Designs() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="designs" className="py-24 px-5 relative">
      {/* Ambient gradient background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,255,204,0.08), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,0,204,0.08), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-pink/70 tracking-[0.3em] mb-3">
            {"// CREATIVE DESIGNS"}
          </p>
          <TypedHeading
            text={isAr ? "قسم التصاميم والإبداع البصري" : "Designs & Visual Creativity"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "تصاميم احترافية تجمع بين الجمال والوظيفة — من الشعارات والهوية البصرية إلى الإعلانات والمودلز ثلاثية الأبعاد"
              : "Professional designs combining beauty and function — from logos and visual identity to ads and 3D models"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-pink rounded-full shadow-[0_0_10px_var(--neon-pink)]" />
        </Reveal>

        {/* Designs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {designServices.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.name.en} delay={i * 80}>
                <div
                  className="group relative h-full p-5 rounded-xl bg-surface/60 border-2 border-edge hover:-translate-y-1 transition-all overflow-hidden"
                  style={{ borderColor: "var(--edge, #1f2937)" }}
                >
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${d.color}08, transparent 60%)`,
                    }}
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: d.color, boxShadow: `0 0 8px ${d.color}` }}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border mb-4 group-hover:scale-110 transition-transform"
                      style={{
                        borderColor: `${d.color}50`,
                        backgroundColor: `${d.color}10`,
                      }}
                    >
                      <Icon size={24} style={{ color: d.color }} />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: d.color }}
                    >
                      {isAr ? d.name.ar : d.name.en}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-fg/65 leading-relaxed mb-4">
                      {isAr ? d.desc.ar : d.desc.en}
                    </p>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-1.5">
                      {d.examples.map((ex) => (
                        <span
                          key={ex.en}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-surface border border-edge text-fg/60"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: d.color }}
                          />
                          {isAr ? ex.ar : ex.en}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal className="text-center mt-10">
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 bg-neon-pink text-white font-bold px-8 py-4 rounded-md shadow-[0_0_15px_rgba(255,0,204,0.4)] hover:shadow-[0_0_25px_rgba(255,0,204,0.7)] hover:-translate-y-0.5 transition-all min-h-[52px]"
          >
            <Sparkles size={20} />
            {isAr ? "اطلب تصميمك الآن" : "Request Your Design Now"}
            <ExternalLink size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
