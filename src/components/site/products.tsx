import {
  ShieldCheck,
  Bug,
  Network,
  Globe,
  AlertTriangle,
  FileCheck,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./reveal";

type Product = {
  icon: LucideIcon;
  color: string;
  name: string;
  tagline: string;
  desc: string;
  features: string[];
  price: string;
  period: string;
  popular?: boolean;
};

const products: Product[] = [
  {
    icon: ShieldCheck,
    color: "var(--neon-green)",
    name: "الباقة الأساسية للحماية",
    tagline: "الدرع الأول لمنشأتك",
    desc: "تقييم أمني شامل وتأمين أساسي للأنظمة والشبكات بأسلوب مفتوح المصدر.",
    features: [
      "تقييم أمني شامل للبنية التحتية",
      "تأمين نقاط الدخول الأساسية",
      "إعداد جدار حماية pfSense",
      "تقرير ثغرات مفصّل",
    ],
    price: "$1,500",
    period: "بدء + $100/شهر صيانة",
    popular: true,
  },
  {
    icon: Bug,
    color: "var(--neon-blue)",
    name: "اختبار الاختراق الاحترافي",
    tagline: "اخترق قبل أن يخترقوك",
    desc: "محاكاة هجمات حقيقية لكشف الثغرات وإصلاحها قبل استغلالها من المهاجمين.",
    features: [
      "اختبار اختراق شبكي وتطبيقي",
      "كشف ثغرات OWASP Top 10",
      "تقرير فني + تنفيذي",
      "إعادة الاختبار بعد الإصلاح",
    ],
    price: "$2,500",
    period: "لكل حملة اختبار",
  },
  {
    icon: Network,
    color: "var(--neon-pink)",
    name: "الباقة المؤسسية (Cisco)",
    tagline: "حماية على مستوى المؤسسات",
    desc: "هندسة شبكات مؤسسية بمعايير Cisco مع عزل DMZ وحماية متقدمة متعددة الطبقات.",
    features: [
      "هندسة شبكة بمعايير Cisco",
      "عزل DMZ وتقسيم الشبكات",
      "أنظمة كشف/منع التسلل (IDS/IPS)",
      "مراقبة 24/7 + استجابة فورية",
    ],
    price: "$3,500",
    period: "بدء + $250/شهر صيانة",
  },
  {
    icon: Globe,
    color: "var(--neon-green)",
    name: "تأمين المواقع الإلكترونية",
    tagline: "حمِ موقعك من الاختراق",
    desc: "تحليل وكشف نقاط الضعف في المواقع وتطبيقات الويب وحمايتها من الهجمات.",
    features: [
      "فحص ثغرات تطبيقات الويب",
      "حماية من SQL Injection و XSS",
      "تأمين WAF وشهادات SSL",
      "تدقيق الكود البرمجي",
    ],
    price: "$800",
    period: "لكل موقع",
  },
  {
    icon: AlertTriangle,
    color: "var(--neon-blue)",
    name: "الاستجابة للحوادث",
    tagline: "عند وقوع الأزمة",
    desc: "استجابة فورية للحوادث الأمنية، احتواء الاختراق، والتحقيق الجنائي الرقمي.",
    features: [
      "استجابة طارئة خلال ساعات",
      "احتواء وعزل الأنظمة المخترقة",
      "تحقيق جنائي رقمي",
      "خطة استعادة بعد الحادث",
    ],
    price: "$1,200",
    period: "لكل حادثة",
  },
  {
    icon: FileCheck,
    color: "var(--neon-pink)",
    name: "الامتثال والتدريب",
    tagline: "ثقافة أمنية مستدامة",
    desc: "مساعدة المنشآت على الامتثال للمعايير وتدريب الفرق على أفضل الممارسات الأمنية.",
    features: [
      "تقييم الامتثال (ISO/PCI-DSS)",
      "سياسات وإجراءات أمنية",
      "تدريب الفريق على التوعية الأمنية",
      "متابعة دورية وتحديثات",
    ],
    price: "$600",
    period: "لكل برنامج",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 px-5 relative">
      {/* subtle bg accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center mb-14">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {"// PROFESSIONAL SERVICES"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            مهاراتي محوّلة إلى منتجات احترافية
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            باقات خدمات أمن سيبراني مصممة بعناية لحماية أعمالك — من التقييم
            الأساسي حتى الحماية المؤسسية المتقدمة
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name} delay={i * 100}>
                <article
                  className={`group relative h-full bg-surface rounded-xl overflow-hidden border transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.6)] flex flex-col ${
                    p.popular
                      ? "border-neon-green/60 shadow-[0_0_25px_rgba(0,255,204,0.15)]"
                      : "border-edge hover:border-neon-green/50"
                  }`}
                >
                  {/* Popular ribbon */}
                  {p.popular && (
                    <div className="absolute top-0 inset-x-0 bg-neon-green text-[#05080f] text-center text-xs font-bold py-1.5">
                      الأكثر طلباً ⚡
                    </div>
                  )}

                  <div className={`p-6 ${p.popular ? "pt-10" : ""}`}>
                    {/* Icon + name */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl border transition-transform group-hover:scale-110"
                        style={{
                          borderColor: p.color,
                          backgroundColor: `color-mix(in srgb, ${p.color} 12%, transparent)`,
                          boxShadow: `0 0 18px color-mix(in srgb, ${p.color} 25%, transparent)`,
                        }}
                      >
                        <Icon size={24} style={{ color: p.color }} />
                      </div>
                      <span
                        className="text-[10px] mono-tech uppercase tracking-wider px-2 py-1 rounded border"
                        style={{
                          color: p.color,
                          borderColor: `color-mix(in srgb, ${p.color} 40%, transparent)`,
                        }}
                      >
                        {p.tagline}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: p.color }}
                    >
                      {p.name}
                    </h3>
                    <p className="text-fg/65 text-sm leading-relaxed mb-5 min-h-[3.5em]">
                      {p.desc}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-5">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-fg/75"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto p-6 pt-0">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span
                        className="text-3xl font-black mono-tech"
                        style={{ color: p.color }}
                      >
                        {p.price}
                      </span>
                    </div>
                    <p className="text-xs text-fg/50 mb-4">{p.period}</p>

                    <a
                      href="#contact"
                      className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                        p.popular
                          ? "bg-neon-green text-[#05080f] hover:shadow-[0_0_15px_rgba(0,255,204,0.5)]"
                          : "border-2 border-edge text-fg hover:border-neon-green hover:text-neon-green"
                      }`}
                    >
                      اطلب الخدمة
                      <ArrowLeft size={15} />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Note */}
        <Reveal className="text-center mt-10">
          <p className="text-sm text-fg/45">
            جميع الأسعار تقديرية وقابلة للتخصيص حسب حجم المنشأة واحتياجاتها —
            تواصل معي للحصول على عرض سعر مخصص
          </p>
        </Reveal>
      </div>
    </section>
  );
}
