// components/site/json-ld.tsx — Structured data for Google Rich Results
"use client";

import { SITE_URL } from "@/lib/site-config";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "خالد محمد عودة الحربي",
  alternateName: "Khalid Al-harbi",
  jobTitle: "Cyber Security Expert",
  description:
    "خبير أمن سيبراني معتمد CPD من المملكة المتحدة. خدمات اختبار اختراق، حماية الشبكات، تأمين المواقع، والاستجابة للحوادث الأمنية.",
  url: SITE_URL,
  image: `${SITE_URL}/khalid-portrait-opt.jpg`,
  email: "mailto:khalid-alharbi@zohomail.sa",
  telephone: "+966575015019",
  nationality: "Saudi Arabian",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "السعودية",
  },
  knowsAbout: [
    "Penetration Testing",
    "Network Security",
    "Cisco Networking",
    "Incident Response",
    "Digital Forensics",
    "OWASP Top 10",
    "Kali Linux",
    "Cloud Security (AWS)",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Coventry University",
    sameAs: "https://www.coventry.ac.uk/",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "CPD Certified (250 hours)",
      credentialCategory: "Professional Development",
      recognizedBy: {
        "@type": "Organization",
        name: "The CPD Certification Service",
        sameAs: "https://cpduk.co.uk",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Cisco Network Technician",
      url: "https://www.netacad.com/",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "IBM SkillsBuild Cybersecurity",
      url: "https://www.credly.com/",
    },
  ],
  sameAs: ["https://wa.me/966575015019", "https://github.com/5halid-707", "https://www.linkedin.com/in/khalid-alharbi-8953a4b3"],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "K.Al-harbi Cyber Security Services",
  alternateName: "خدمات خالد الحربي للأمن السيبراني",
  description:
    "خدمات أمن سيبراني احترافية: اختبار اختراق، حماية الشبكات، تأمين المواقع، الاستجابة للحوادث، الامتثال والتدريب.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.svg`,
  telephone: "+966575015019",
  email: "khalid-alharbi@zohomail.sa",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "السعودية",
  },
  areaServed: ["SA", "GCC", "Worldwide"],
  provider: { "@id": `${SITE_URL}/#person` },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ما هي خدمات الأمن السيبراني التي تقدمها؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "أقدم 7 خدمات رئيسية: الباقة الأساسية للحماية، اختبار الاختراق، الباقة المؤسسية Cisco، تأمين المواقع، الاستجابة للحوادث، الامتثال والتدريب، وتطوير موقع/تطبيق شامل.",
      },
    },
    {
      "@type": "Question",
      name: "هل شهاداتك موثّقة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، جميع شهاداتي موثّقة على Credly و CPD UK ويمكن التحقق منها إلكترونيًا.",
      },
    },
    {
      "@type": "Question",
      name: "هل تقدم استشارة أمنية مجانية؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، أقدم تقييمًا أمنيًا مجانيًا مبدئيًا وعرض سعر مخصص لاحتياجات منشأتك.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "خدمات الأمن السيبراني", item: `${SITE_URL}/#products` },
    { "@type": "ListItem", position: 3, name: "تواصل معنا", item: `${SITE_URL}/#contact` },
  ],
};

export default function JsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
