import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-edge bg-[#070b14]"
    >
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="mono-tech text-2xl text-glow-green inline-block mb-3"
            >
              &lt;EliteTech/&gt;
            </a>
            <p className="text-fg/60 text-sm leading-relaxed">
              وكالة النخبة التقنية - شريكك الموثوق في الأمن السيبراني، برمجة
              التطبيقات، والتسويق الرقمي.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:text-center">
            <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-fg/60 hover:text-neon-green transition-colors">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#tools" className="text-fg/60 hover:text-neon-green transition-colors">
                  أدواتنا
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-fg/60 hover:text-neon-green transition-colors">
                  أعمالنا
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
                href="mailto:your@email.com"
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
            &copy; {new Date().getFullYear()} Elite Tech Agency. جميع الحقوق
            محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
