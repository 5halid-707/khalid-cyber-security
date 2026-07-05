"use client";

import { Github, Linkedin, Mail, MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import { useI18n } from "./i18n";

export default function Footer() {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";

  const quickLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#products", label: t("nav.products") },
    { href: "#academic-products", label: t("nav.academic") },
    { href: "#credentials", label: t("nav.credentials") },
    { href: "#academic", label: t("nav.education") },
  ];

  return (
    <footer id="contact" className="mt-auto border-t border-edge bg-[#070b14]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        {/* CTA banner */}
        <div className="text-center mb-12 pb-12 border-b border-edge">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            {t("footer.cta.title")}
          </h2>
          <p className="text-fg/60 mb-6 max-w-xl mx-auto">
            {t("footer.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/9665XXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neon-green text-[#05080f] font-bold px-7 py-3 rounded-md hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all"
            >
              <MessageCircle size={18} />
              {t("footer.cta.whatsapp")}
            </a>
            <a
              href="mailto:khalid@example.com"
              className="inline-flex items-center justify-center gap-2 border-2 border-neon-blue text-neon-blue font-bold px-7 py-3 rounded-md hover:bg-neon-blue/10 transition-all"
            >
              <Mail size={18} />
              {t("footer.cta.email")}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={22} className="text-neon-green" />
              <span className="mono-tech text-xl text-glow-green">
                {t("brand.name")}
              </span>
            </div>
            <p className="text-fg/60 text-sm leading-relaxed mb-3">
              {isAr
                ? "م. خالد محمد عودة الحربي — خبير أمن سيبراني معتمد CPD. أحمي أنظمتك وبياناتك من التهديدات السيبرانية باحترافية."
                : "Eng. Khalid Mohammed Al-harbi — CPD-certified Cyber Security Engineer. I protect your systems and data from cyber threats with professionalism."}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-fg/40">
              <MapPin size={13} />
              {isAr ? "المملكة العربية السعودية" : "Saudi Arabia"}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:text-center">
            <h4 className="text-white font-bold mb-4">{t("footer.quick_links")}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-fg/60 hover:text-neon-green transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:text-left">
            <h4 className="text-white font-bold mb-4">{t("footer.contact")}</h4>
            <div className="flex gap-3 md:justify-start justify-start">
              <a
                href="https://wa.me/9665XXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-edge flex items-center justify-center text-fg/70 hover:text-[#25D366] hover:border-[#25D366] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-edge flex items-center justify-center text-fg/70 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-edge flex items-center justify-center text-fg/70 hover:text-white hover:border-white transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:khalid@example.com"
                className="w-10 h-10 rounded-full border border-edge flex items-center justify-center text-fg/70 hover:text-neon-pink hover:border-neon-pink transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-edge text-center">
          <p className="text-fg/40 text-sm">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
