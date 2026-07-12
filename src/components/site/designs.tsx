"use client";

import { useState } from "react";
import {
  Palette,
  PenTool,
  Image as ImageIcon,
  Megaphone,
  Layout,
  Sparkles,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

type DesignWork = {
  image: string;
  title: { ar: string; en: string };
  category: string;
};

type Category = {
  id: string;
  icon: typeof Palette;
  color: string;
  name: { ar: string; en: string };
  desc: { ar: string; en: string };
  works: DesignWork[];
};

const categories: Category[] = [
  {
    id: "logos",
    icon: PenTool,
    color: "var(--neon-green)",
    name: { ar: "تصميم الشعارات", en: "Logo Design" },
    desc: {
      ar: "شعارات احترافية فريدة تعكس هوية علامتك التجارية — نصية، رمزية، ومركبة",
      en: "Professional unique logos reflecting your brand identity — wordmarks, symbols, combination marks",
    },
    works: [
      { image: "/designs/logo-1.svg", title: { ar: "شعار K مونوجرام", en: "K Monogram Logo" }, category: "logos" },
      { image: "/designs/logo-2.svg", title: { ar: "شعار درع سداسي", en: "Hex Shield Symbol" }, category: "logos" },
      { image: "/designs/logo-3.svg", title: { ar: "شعار KMH وورد مارك", en: "KMH Wordmark" }, category: "logos" },
    ],
  },
  {
    id: "identity",
    icon: Palette,
    color: "var(--neon-blue)",
    name: { ar: "الهوية البصرية", en: "Visual Identity" },
    desc: {
      ar: "هوية بصرية متكاملة — ألوان، خطوط، عناصر رسومية، ودليل استخدام كامل",
      en: "Complete visual identity — colors, typography, graphic elements, and brand guidelines",
    },
    works: [
      { image: "/designs/identity-1.svg", title: { ar: "دليل الهوية البصرية", en: "Brand Guidelines" }, category: "identity" },
      { image: "/designs/identity-2.svg", title: { ar: "بطاقة أعمال", en: "Business Card" }, category: "identity" },
      { image: "/designs/identity-3.svg", title: { ar: "قرطاسية مكتبية", en: "Stationery Set" }, category: "identity" },
    ],
  },
  {
    id: "ads",
    icon: Megaphone,
    color: "var(--neon-pink)",
    name: { ar: "تصميم الإعلانات", en: "Ad Design" },
    desc: {
      ar: "إعلانات احترافية بأسلوب Amazon — سوشيال ميديا، بانرات، وإعلانات مبيعات",
      en: "Professional ads in Amazon style — social media, banners, and sales ads",
    },
    works: [
      { image: "/designs/ad-1.svg", title: { ar: "بانر تخفيضات", en: "Sale Banner" }, category: "ads" },
      { image: "/designs/ad-2.svg", title: { ar: "إعلان إنستجرام", en: "Instagram Ad" }, category: "ads" },
      { image: "/designs/ad-3.svg", title: { ar: "بانر ويب", en: "Web Banner" }, category: "ads" },
    ],
  },
  {
    id: "3d",
    icon: ImageIcon,
    color: "var(--neon-green)",
    name: { ar: "المودلز 3D", en: "3D Models" },
    desc: {
      ar: "مودلز ثلاثية الأبعاد للمنتجات — عبايات، ذهب، شنط، وإكسسوارات",
      en: "3D product models — abayas, gold, bags, and accessories",
    },
    works: [
      { image: "/designs/3d-1.svg", title: { ar: "عباية 3D", en: "3D Abaya" }, category: "3d" },
      { image: "/designs/3d-2.svg", title: { ar: "خاتم ذهب", en: "Gold Ring" }, category: "3d" },
      { image: "/designs/3d-3.svg", title: { ar: "شنطة تصميم", en: "Designer Bag" }, category: "3d" },
    ],
  },
  {
    id: "uiux",
    icon: Layout,
    color: "var(--neon-blue)",
    name: { ar: "واجهات UI/UX", en: "UI/UX Design" },
    desc: {
      ar: "واجهات تطبيقات ومواقع احترافية — تجربة مستخدم سلسة وواجهة بصرية جذابة",
      en: "Professional app and website UI — smooth UX and attractive visual interface",
    },
    works: [
      { image: "/designs/ui-1.svg", title: { ar: "تطبيق موبايل", en: "Mobile App UI" }, category: "uiux" },
      { image: "/designs/ui-2.svg", title: { ar: "صفحة هبوط", en: "Landing Page" }, category: "uiux" },
      { image: "/designs/ui-3.svg", title: { ar: "لوحة تحكم", en: "Dashboard" }, category: "uiux" },
    ],
  },
  {
    id: "social",
    icon: Sparkles,
    color: "var(--neon-pink)",
    name: { ar: "السوشيال ميديا", en: "Social Media" },
    desc: {
      ar: "محتوى سوشيال ميديا متكامل — بوستات، ستوريز، كفرات، ومحتوى تسويقي",
      en: "Complete social media content — posts, stories, covers, and marketing content",
    },
    works: [
      { image: "/designs/social-1.svg", title: { ar: "بوست عرض", en: "Offer Post" }, category: "social" },
      { image: "/designs/social-2.svg", title: { ar: "ستوري", en: "Story Template" }, category: "social" },
      { image: "/designs/social-3.svg", title: { ar: "ثمبنيل يوتيوب", en: "YouTube Thumbnail" }, category: "social" },
    ],
  },
];

export default function Designs() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("logos");
  const [lightbox, setLightbox] = useState<DesignWork | null>(null);

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all min-h-[44px] text-sm font-bold touch-manipulation ${
                  isActive
                    ? "scale-105"
                    : "border-edge bg-surface/60 text-fg/60 hover:text-white hover:border-fg/30"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: cat.color,
                        backgroundColor: `${cat.color}15`,
                        color: cat.color,
                        boxShadow: `0 0 15px ${cat.color}40`,
                      }
                    : {}
                }
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{isAr ? cat.name.ar : cat.name.en}</span>
                <span className="sm:hidden">{isAr ? cat.name.ar.split(" ")[0] : cat.name.en.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description */}
        <Reveal key={activeCategory} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-surface/60 border" style={{ borderColor: `${currentCategory.color}40` }}>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center border shrink-0"
              style={{ borderColor: `${currentCategory.color}50`, backgroundColor: `${currentCategory.color}10` }}
            >
              <currentCategory.icon size={24} style={{ color: currentCategory.color }} />
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold" style={{ color: currentCategory.color }}>
                {isAr ? currentCategory.name.ar : currentCategory.name.en}
              </h3>
              <p className="text-sm text-fg/60 max-w-xl">
                {isAr ? currentCategory.desc.ar : currentCategory.desc.en}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Works Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {currentCategory.works.map((work, i) => (
            <Reveal key={work.image} delay={i * 100}>
              <button
                onClick={() => setLightbox(work)}
                className="group relative w-full block rounded-xl overflow-hidden border-2 border-edge hover:border-neon-pink/50 transition-all touch-manipulation cursor-pointer"
                style={{ touchAction: "manipulation" }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={work.image}
                    alt={isAr ? work.title.ar : work.title.en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink text-white text-xs font-bold shadow-[0_0_15px_rgba(255,0,204,0.6)]">
                      <Eye size={14} />
                      {isAr ? "معاينة" : "View"}
                    </span>
                  </div>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-neon-pink shadow-[0_0_8px_var(--neon-pink)]" />
                </div>
                {/* Title bar */}
                <div className="p-3 bg-surface border-t border-edge flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white truncate">
                    {isAr ? work.title.ar : work.title.en}
                  </h4>
                  <ExternalLink size={14} className="text-fg/40 group-hover:text-neon-pink transition-colors shrink-0" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* View All on Google Drive */}
        <Reveal className="text-center mb-8">
          <a
            href="https://drive.google.com/drive/folders/1Q9ryZxKNiWifusyaKmWIRyuUcpC8P6Zd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-neon-blue text-neon-blue font-bold px-8 py-4 rounded-md hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,168,232,0.4)] transition-all min-h-[52px]"
          >
            <ExternalLink size={20} />
            {isAr ? "شاهد كل أعمالي على Google Drive" : "View All My Works on Google Drive"}
          </a>
        </Reveal>

        {/* CTA */}
        <Reveal className="text-center">
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-surface/80 border border-edge text-white flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all z-10 pointer-events-auto touch-manipulation"
          >
            <X size={24} />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl overflow-hidden border-2 border-neon-pink/50 shadow-[0_0_40px_rgba(255,0,204,0.3)]">
              <img
                src={lightbox.image}
                alt={isAr ? lightbox.title.ar : lightbox.title.en}
                className="w-full h-auto"
              />
            </div>
            {/* Title */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">
                {isAr ? lightbox.title.ar : lightbox.title.en}
              </h3>
              <p className="text-sm text-fg/60 mt-1">
                {isAr ? "تصميم احترافي — خالد الحربي" : "Professional Design — Khalid Al-harbi"}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
