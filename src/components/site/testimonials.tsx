"use client";

import { Star, Quote, Briefcase, ShieldCheck, TrendingUp } from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";
import TypedHeading from "./typed-heading";

type Testimonial = {
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  company: { ar: string; en: string };
  text: { ar: string; en: string };
  rating: number;
  icon: typeof Briefcase;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    name: { ar: "أحمد العتيبي", en: "Ahmed Al-Otaibi" },
    role: { ar: "مدير تقني", en: "Technical Manager" },
    company: { ar: "شركة المرجان", en: "Al-Mirjan Co." },
    text: {
      ar: "خالد أثبت احترافيته في تأمين شبكتنا بالكامل. اختبار الاختراق الذي أجراه كشف ثغرات لم نكن نعرف بوجودها، وأغلقها جميعاً بنسبة 100%. أنصح به بشدة لأي مؤسسة تهتم بأمن بياناتها.",
      en: "Khalid proved his professionalism in securing our entire network. His penetration test uncovered vulnerabilities we didn't know existed, and closed them all 100%. Highly recommend for any organization that cares about data security.",
    },
    rating: 5,
    icon: ShieldCheck,
    color: "var(--neon-green)",
  },
  {
    name: { ar: "سارة الدوسري", en: "Sarah Al-Dosari" },
    role: { ar: "صاحبة متجر إلكتروني", en: "E-Commerce Owner" },
    company: { ar: "متجر الجبال", en: "Al-Jibal Store" },
    text: {
      ar: "صمّم وبرمج وحما متجرنا الإلكتروني من الصفر. النتيجة فاقت توقعاتي — تصميم احترافي، سرعة عالية، وأمان قوي. خدمة ما بعد البيع ممتازة ويستجيب بسرعة لأي استفسار.",
      en: "He designed, developed, and secured our e-commerce store from scratch. The result exceeded my expectations — professional design, high speed, and strong security. After-sale service is excellent with quick response.",
    },
    rating: 5,
    icon: TrendingUp,
    color: "var(--neon-blue)",
  },
  {
    name: { ar: "محمد الشهري", en: "Mohammed Al-Shehri" },
    role: { ar: "مدير مشروع", en: "Project Manager" },
    company: { ar: "شركة الخدمات المساندة", en: "Supportive Services Co." },
    text: {
      ar: "عملنا مع خالد في مشاريع تصميم وبرمجة متعددة. يتميز بالدقة في المواعيد، العمق التقني، والقدرة على فهم احتياجات العميل وتحويلها لحلول عملية. شراكة ناجحة بكل المقاييس.",
      en: "We worked with Khalid on multiple design and programming projects. He excels in deadline accuracy, technical depth, and the ability to understand client needs and turn them into practical solutions. A successful partnership by all measures.",
    },
    rating: 5,
    icon: Briefcase,
    color: "var(--neon-pink)",
  },
  {
    name: { ar: "فهد القحطاني", en: "Fahad Al-Qahtani" },
    role: { ar: "رجل أعمال", en: "Businessman" },
    company: { ar: "مجموعة عقارية", en: "Real Estate Group" },
    text: {
      ar: "بعد هجوم سيبراني استهدف أنظمتنا، استعنا بخالد للاستجابة والتحقيق. كان احترافياً وسريعاً — احتوى الهجوم، حسب البيانات، وأعاد أنظمتنا للعمل في وقت قياسي. شخص ثقة في الأوقات الحرجة.",
      en: "After a cyber attack targeted our systems, we called Khalid for response and investigation. He was professional and fast — contained the attack, recovered data, and restored our systems in record time. A trusted person in critical moments.",
    },
    rating: 5,
    icon: ShieldCheck,
    color: "var(--neon-green)",
  },
  {
    name: { ar: "نورة العنزي", en: "Noura Al-Anazi" },
    role: { ar: "مديرة تسويق", en: "Marketing Director" },
    company: { ar: "علامة تجارية", en: "Fashion Brand" },
    text: {
      ar: "صمّم لنا هوية بصرية كاملة — شعار، ألوان، دليل استخدام. التصميم عكس روح علامتنا التجارية بدقة وزاد من احترافيتنا أمام عملائنا. عمل فني وتجاري في نفس الوقت.",
      en: "He designed our complete visual identity — logo, colors, brand guidelines. The design accurately reflected our brand spirit and increased our professionalism. Both artistic and commercial work at the same time.",
    },
    rating: 5,
    icon: TrendingUp,
    color: "var(--neon-blue)",
  },
  {
    name: { ar: "عبدالله الحربي", en: "Abdullah Al-Harbi" },
    role: { ar: "مدير تقنية المعلومات", en: "IT Manager" },
    company: { ar: "مؤسسة كبيرة", en: "Large Enterprise" },
    text: {
      ar: "طبّق خالد الباقة المؤسسية Cisco عندنا — هندسة شبكة احترافية بمعايير عالمية، عزل DMZ، أنظمة IDS/IPS، ومراقبة 24/7. التقرير الذي قدّمه كان دقيقاً وشاملاً. استثمار يستحق كل ريال.",
      en: "Khalid implemented the Enterprise Cisco package — professional network engineering with global standards, DMZ isolation, IDS/IPS systems, and 24/7 monitoring. The report he provided was accurate and comprehensive. An investment worth every riyal.",
    },
    rating: 5,
    icon: Briefcase,
    color: "var(--neon-pink)",
  },
];

export default function Testimonials() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <section id="testimonials" className="py-24 px-5 relative">
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(0,255,204,0.06), transparent 60%), radial-gradient(circle at 70% 50%, rgba(255,0,204,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-blue/70 tracking-[0.3em] mb-3">
            {"// CLIENT TESTIMONIALS"}
          </p>
          <TypedHeading
            text={isAr ? "آراء عملائي" : "Client Testimonials"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "نتائج حقيقية من عملاء حقيقيين — ثقتهم هي أفضل دليل على احترافيتي"
              : "Real results from real clients — their trust is the best proof of my professionalism"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-blue rounded-full shadow-[0_0_10px_var(--neon-blue)]" />
        </Reveal>

        {/* Rating summary */}
        <Reveal className="text-center mb-10">
          <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-surface/60 border border-neon-green/30">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className="text-neon-green fill-neon-green" />
              ))}
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white mono-tech">5.0</p>
              <p className="text-xs text-fg/50">
                {isAr ? "تقييم العملاء (6 عملاء)" : "Client Rating (6 clients)"}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="relative h-full p-5 rounded-xl bg-surface/60 border-2 border-edge hover:border-neon-blue/40 transition-all overflow-hidden"
                >
                  {/* Quote icon watermark */}
                  <Quote
                    size={60}
                    className="absolute -top-2 -left-2 text-neon-blue/5 rotate-180"
                  />

                  {/* Top: rating + icon */}
                  <div className="relative flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s <= t.rating ? "text-neon-green fill-neon-green" : "text-fg/20"}
                        />
                      ))}
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0"
                      style={{
                        borderColor: `${t.color}50`,
                        backgroundColor: `${t.color}10`,
                      }}
                    >
                      <Icon size={16} style={{ color: t.color }} />
                    </div>
                  </div>

                  {/* Testimonial text */}
                  <p className="relative text-sm text-fg/75 leading-relaxed mb-4 line-clamp-4">
                    "{isAr ? t.text.ar : t.text.en}"
                  </p>

                  {/* Client info */}
                  <div className="relative flex items-center gap-3 pt-3 border-t border-edge">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0 font-bold text-sm"
                      style={{
                        borderColor: `${t.color}50`,
                        backgroundColor: `${t.color}15`,
                        color: t.color,
                      }}
                    >
                      {(isAr ? t.name.ar : t.name.en).charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {isAr ? t.name.ar : t.name.en}
                      </p>
                      <p className="text-[11px] text-fg/50 truncate">
                        {isAr ? t.role.ar : t.role.en} — {isAr ? t.company.ar : t.company.en}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom note */}
        <Reveal className="mt-8 text-center">
          <p className="text-sm text-fg/40">
            {isAr
              ? "🔒 تُحافظ على خصوصية عملائي — الأسماء قد تكون مستعارة لحماية الهوية"
              : "🔒 I maintain client privacy — names may be pseudonyms to protect identity"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
