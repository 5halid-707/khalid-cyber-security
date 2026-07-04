import { Github, Linkedin, Mail, MessageCircle, ShieldCheck, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="mt-auto border-t border-edge bg-[#070b14]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        {/* CTA banner */}
        <div className="text-center mb-12 pb-12 border-b border-edge">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            جاهز لحماية أعمالك؟
          </h2>
          <p className="text-fg/60 mb-6 max-w-xl mx-auto">
            تواصل معي اليوم للحصول على استشارة أمنية مجانية وعرض سعر مخصص
            لاحتياجات منشأتك
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/9665XXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-neon-green text-[#05080f] font-bold px-7 py-3 rounded-md hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all"
            >
              <MessageCircle size={18} />
              تواصل عبر واتساب
            </a>
            <a
              href="mailto:khalid@example.com"
              className="inline-flex items-center justify-center gap-2 border-2 border-neon-blue text-neon-blue font-bold px-7 py-3 rounded-md hover:bg-neon-blue/10 transition-all"
            >
              <Mail size={18} />
              راسلني بريدياً
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={22} className="text-neon-green" />
              <span className="mono-tech text-xl text-glow-green">
                K.Al-harbi
              </span>
            </div>
            <p className="text-fg/60 text-sm leading-relaxed mb-3">
              م. خالد محمد الحربي — مهندس أمن سيبراني معتمد CPD. أحمي أنظمتك
              وبياناتك من التهديدات السيبرانية باحترافية.
            </p>
            <p className="flex items-center gap-1.5 text-xs text-fg/40">
              <MapPin size={13} />
              المملكة العربية السعودية
            </p>
          </div>

          {/* Quick links */}
          <div className="md:text-center">
            <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-fg/60 hover:text-neon-green transition-colors">
                  نبذة عني
                </a>
              </li>
              <li>
                <a href="#products" className="text-fg/60 hover:text-neon-green transition-colors">
                  خدماتي ومنتجاتي
                </a>
              </li>
              <li>
                <a href="#credentials" className="text-fg/60 hover:text-neon-green transition-colors">
                  الشهادات والاعتمادات
                </a>
              </li>
              <li>
                <a href="#tools" className="text-fg/60 hover:text-neon-green transition-colors">
                  الأدوات والتقنيات
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:text-left">
            <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
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
            &copy; {new Date().getFullYear()} م. خالد الحربي — Cyber Security
            Services. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
