"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

const dict: Record<Lang, Record<string, string>> = {
  ar: {
    // Brand / tagline
    "brand.name": "K.Al-harbi",
    "brand.role": "Cyber Security Expert",
    "brand.tagline": "خبير أمن سيبراني معتمد",

    // Nav
    "nav.home": "الرئيسية",
    "nav.about": "نبذة عني",
    "nav.products": "خدماتي",
    "nav.portfolio": "أعمالي",
    "nav.designs": "تصاميمي",
    "nav.showcase": "استكشف خدماتي",
    "nav.training": "تدريبي",
    "nav.credentials": "الشهادات",
    "nav.academic": "استشارات أكاديمية",
    "nav.education": "التعليم",
    "nav.contact": "تواصل",

    // Hero
    "hero.cpd_badge": "معتمد CPD — المملكة المتحدة • 250 ساعة تدريب",
    "hero.subtitle": "خبير أمن سيبراني • خبير حماية البيانات والشبكات",
    "hero.services_line": "اختبار اختراق وحماية • تصميم متاجر ومواقع • تسويق إلكتروني",
    "hero.title": "م. خالد الحربي",
    "hero.subtitle_role": "باحث أمني — The Hackers One العالمية",
    "hero.cta.services": "اكتشف خدماتي",
    "hero.cta.contact": "تواصل معي",
    "hero.scroll": "SCROLL",
    "hero.stats.cpd": "ساعة CPD",
    "hero.stats.creds": "اعتماد موثّق",
    "hero.stats.services": "خدمات احترافية",
    "hero.stats.tracks": "مسارات Coventry",

    // About
    "about.eyebrow": "// ABOUT ME",
    "about.title": "خبير أمن سيبراني معتمد",
    "about.nameplate.role": "// CYBER SECURITY EXPERT",
    "about.nameplate.name": "م. خالد محمد الحربي",
    "about.nameplate.rolefull": "Cyber Security Specialist",
    "about.chip.cpd_top": "معتمد من",
    "about.chip.cpd_val": "CPD UK",
    "about.chip.coventry_top": "Coventry",
    "about.chip.coventry_val": "University",
    "about.exp_title": "المجالات التي أتقنها",
    "about.platforms_title": "منصات الاعتماد والشركاء",
    "about.cta_available": "⚡ متاح لمشروعك التالي — تواصل معي واحصل على تقييم أمني مجاني",

    // Products
    "products.eyebrow": "// PROFESSIONAL SERVICES",
    "products.title": "مهاراتي محوّلة إلى منتجات احترافية",
    "products.subtitle":
      "باقات خدمات أمن سيبراني مصممة بعناية لحماية أعمالك — من التقييم الأساسي حتى الحماية المؤسسية المتقدمة",
    "products.popular": "الأكثر طلباً",
    "products.cta": "اطلب الخدمة",
    "products.note":
      "جميع الأسعار تقديرية وقابلة للتخصيص حسب حجم المنشأة واحتياجاتها — تواصل معي للحصول على عرض سعر مخصص",

    // Academic credentials
    "academic.eyebrow": "// ACADEMIC EDUCATION",
    "academic.title": "التعليم الأكاديمي المعتمد",
    "academic.subtitle":
      "3 مسارات تدريبية متقدمة و15 دورة من Coventry University البريطانية عبر منصة FutureLearn العالمية",
    "academic.banner.title": "Coventry University",
    "academic.banner.subtitle":
      "جامعة بريطانية حكومية • عبر منصة FutureLearn العالمية",
    "academic.banner.tracks": "مسارات",
    "academic.banner.courses": "دورات",
    "academic.banner.hours": "ساعة دراسة",
    "academic.skills_title": "المهارات المكتسبة",
    "academic.clarify.title": "توضيح شفاف:",
    "academic.clarify.body":
      "مسارات ExpertTrack هي برامج تدريبية عالية المستوى تقدمها Coventry University عبر FutureLearn — تركز على المهارات العملية المتقدمة وتختلف عن الشهادات الجامعية التقليدية (البكالوريوس/الماجستير). هي تعكس التزامي بالتطوير المهني المستمر في الأمن السيبراني، لا لقباً أكاديمياً.",

    // Academic products
    "aproducts.eyebrow": "// ACADEMIC-BACKED PREMIUM SERVICES",
    "aproducts.title": "خدمات استشارية مدعومة بالتعليم الأكاديمي",
    "aproducts.subtitle":
      "باقات premium مستوحاة من مسارات Coventry University — تدمج العمق الأكاديمي مع التطبيق المهني لتقديم حلول عالية الجودة",
    "aproducts.badge": "مدعوم بـ Coventry University",
    "aproducts.cta": "اطلب الاستشارة",
    "aproducts.trust":
      "كل خدمة مدعومة بمعرفة أكاديمية موثّقة من Coventry University البريطانية",

    // Credentials
    "creds.eyebrow": "// VERIFIED CREDENTIALS",
    "creds.title": "الشهادات والاعتمادات الموثّقة",
    "creds.subtitle":
      "أكثر من 16 اعتماداً وشهادة موثّقة من مؤسسات عالمية — كل شهادة قابلة للتحقق إلكترونياً",
    "creds.ibm.title": "أوسمة IBM SkillsBuild المهارية",
    "creds.ibm.subtitle": "(7 أوسمة قابلة للتحقق على Credly)",
    "creds.cisco.title": "دورات Cisco Networking Academy المكتملة",
    "creds.cisco.subtitle": "(7 دورات)",
    "creds.verify": "تحقق",
    "creds.verify_note":
      "جميع الأوسمة موثّقة على منصة Credly العالمية ويمكن التحقق منها إلكترونياً بالضغط على أي وسام",

    // Training & Labs
    "training.eyebrow": "// HANDS-ON TRAINING & LABS",
    "training.title": "تدريبات ومختبرات عملية",
    "training.subtitle":
      "أكثر من 50 دورة وتدريب عملي في منصات عالمية — TryHackMe، Cybrary، Cisco، AWS، HP، وغيرها",

    // Certificate Gallery
    "certs.eyebrow": "// CERTIFICATE GALLERY",
    "certs.title": "معرض الشهادات",
    "certs.subtitle":
      "جميع شهاداتي واعتماداتي المعتمدة من مؤسسات عالمية — IBM، Cisco، HP، CPD UK — قابلة للتحقق إلكترونياً",
    "certs.verify": "تحقق",
    "certs.issuer": "جهة الإصدار",
    "certs.date": "التاريخ",

    // Tools
    "tools.eyebrow": "// ECOSYSTEM & CREDENTIAL PLATFORMS",

    // Footer
    "footer.cta.title": "جاهز لحماية أعمالك؟",
    "footer.cta.subtitle":
      "تواصل معي اليوم للحصول على استشارة أمنية مجانية وعرض سعر مخصص لاحتياجات منشأتك",
    "footer.cta.whatsapp": "تواصل عبر واتساب",
    "footer.cta.email": "راسلني بريدياً",
    "footer.quick_links": "روابط سريعة",
    "footer.contact": "تواصل معنا",
    "footer.copyright":
      "خالد الحربي — Cyber Security Services. جميع الحقوق محفوظة.",

    // Chatbot
    "chatbot.title": "مساعد خالد الذكي",
    "chatbot.online": "متصل الآن",
    "chatbot.placeholder": "اكتب استفسارك هنا...",
    "chatbot.welcome":
      "مرحباً بك! 👋 أنا مساعد خالد الحربي — خبير الأمن السيبراني المعتمد.\nكيف أقدر أساعدك اليوم؟ يمكنك سؤالي عن الخدمات أو الأسعار أو المؤهلات.",
  },

  en: {
    "brand.name": "K.Al-harbi",
    "brand.role": "Cyber Security Expert",
    "brand.tagline": "Certified Cyber Security Expert",

    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Services",
    "nav.portfolio": "Portfolio",
    "nav.designs": "Designs",
    "nav.showcase": "Showcase",
    "nav.training": "Training",
    "nav.credentials": "Credentials",
    "nav.academic": "Academic Consulting",
    "nav.education": "Education",
    "nav.contact": "Contact",

    "hero.cpd_badge": "CPD Certified — United Kingdom • 250 training hours",
    "hero.subtitle":
      "Cyber Security Expert • Data & Network Protection Specialist",
    "hero.services_line":
      "Penetration Testing & Security • E-Commerce & Web Design • Digital Marketing",
    "hero.title": "Eng. Khalid Al-harbi",
    "hero.subtitle_role": "Security Researcher — The Hackers One Global",
    "hero.cta.services": "Explore Services",
    "hero.cta.contact": "Contact Me",
    "hero.scroll": "SCROLL",
    "hero.stats.cpd": "CPD Hours",
    "hero.stats.creds": "Verified Credentials",
    "hero.stats.services": "Professional Services",
    "hero.stats.tracks": "Coventry Tracks",

    "about.eyebrow": "// ABOUT ME",
    "about.title": "Certified Cyber Security Expert",
    "about.nameplate.role": "// CYBER SECURITY EXPERT",
    "about.nameplate.name": "Eng. Khalid Mohammed Al-harbi",
    "about.nameplate.rolefull": "Cyber Security Specialist",
    "about.chip.cpd_top": "Certified by",
    "about.chip.cpd_val": "CPD UK",
    "about.chip.coventry_top": "Coventry",
    "about.chip.coventry_val": "University",
    "about.exp_title": "Areas of Expertise",
    "about.platforms_title": "Certification Platforms & Partners",
    "about.cta_available":
      "⚡ Available for your next project — contact me for a free security assessment",

    "products.eyebrow": "// PROFESSIONAL SERVICES",
    "products.title": "My Skills Transformed into Professional Products",
    "products.subtitle":
      "Cyber security service packages carefully designed to protect your business — from basic assessment to advanced enterprise protection",
    "products.popular": "Most Requested",
    "products.cta": "Request Service",
    "products.note":
      "All prices are estimates and customizable based on organization size and needs — contact me for a tailored quote",

    "academic.eyebrow": "// ACADEMIC EDUCATION",
    "academic.title": "Certified Academic Education",
    "academic.subtitle":
      "3 advanced tracks and 15 courses from Coventry University (UK) via the global FutureLearn platform",
    "academic.banner.title": "Coventry University",
    "academic.banner.subtitle":
      "UK public university • via the global FutureLearn platform",
    "academic.banner.tracks": "Tracks",
    "academic.banner.courses": "Courses",
    "academic.banner.hours": "Study Hours",
    "academic.skills_title": "Skills Acquired",
    "academic.clarify.title": "Transparent Note:",
    "academic.clarify.body":
      "ExpertTracks are high-level training programs offered by Coventry University via FutureLearn — they focus on advanced practical skills and differ from traditional academic degrees (Bachelor/Master). They reflect my commitment to continuous professional development in cyber security, not an academic title.",

    "aproducts.eyebrow": "// ACADEMIC-BACKED PREMIUM SERVICES",
    "aproducts.title": "Consulting Services Backed by Academic Education",
    "aproducts.subtitle":
      "Premium packages inspired by Coventry University tracks — merging academic depth with professional practice for high-quality solutions",
    "aproducts.badge": "Backed by Coventry University",
    "aproducts.cta": "Request Consultation",
    "aproducts.trust":
      "Every service is backed by verified academic knowledge from Coventry University, UK",

    "creds.eyebrow": "// VERIFIED CREDENTIALS",
    "creds.title": "Verified Certifications & Credentials",
    "creds.subtitle":
      "More than 16 verified certifications from global institutions — each verifiable electronically",
    "creds.ibm.title": "IBM SkillsBuild Skill Badges",
    "creds.ibm.subtitle": "(7 badges verifiable on Credly)",
    "creds.cisco.title": "Completed Cisco Networking Academy Courses",
    "creds.cisco.subtitle": "(7 courses)",
    "creds.verify": "Verify",
    "creds.verify_note":
      "All badges are verified on the global Credly platform — click any badge to verify electronically",

    "training.eyebrow": "// HANDS-ON TRAINING & LABS",
    "training.title": "Hands-on Training & Labs",
    "training.subtitle":
      "More than 50 courses and practical labs on global platforms — TryHackMe, Cybrary, Cisco, AWS, HP, and more",

    "certs.eyebrow": "// CERTIFICATE GALLERY",
    "certs.title": "Certificate Gallery",
    "certs.subtitle":
      "All my certifications from global institutions — IBM, Cisco, HP, CPD UK — verifiable electronically",
    "certs.verify": "Verify",
    "certs.issuer": "Issuer",
    "certs.date": "Date",

    "tools.eyebrow": "// ECOSYSTEM & CREDENTIAL PLATFORMS",

    "footer.cta.title": "Ready to protect your business?",
    "footer.cta.subtitle":
      "Contact me today for a free security consultation and a tailored quote for your organization's needs",
    "footer.cta.whatsapp": "Contact via WhatsApp",
    "footer.cta.email": "Email Me",
    "footer.quick_links": "Quick Links",
    "footer.contact": "Contact",
    "footer.copyright":
      "Khalid Al-harbi — Cyber Security Services. All rights reserved.",

    "chatbot.title": "Khalid's AI Assistant",
    "chatbot.online": "Online now",
    "chatbot.placeholder": "Type your inquiry here...",
    "chatbot.welcome":
      "Welcome! 👋 I'm Khalid Al-harbi's assistant — a certified Cyber Security Expert.\nHow can I help you today? Ask me about services, pricing, or credentials.",
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((p) => (p === "ar" ? "en" : "ar")),
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (key: string) => dict[lang][key] ?? key,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
