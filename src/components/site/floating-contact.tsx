"use client";

import { useState } from "react";
import { Share2, X, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  const items = [
    {
      href: "https://wa.me/966575015019?text=مرحبا%20خالد،%20أرغب%20بطلب%20إحدى%20خدماتك%20في%20الأمن%20السيبراني",
      icon: MessageCircle,
      color: "#25D366",
      label: "WhatsApp",
    },
    {
      href: "https://linkedin.com",
      icon: Linkedin,
      color: "#0A66C2",
      label: "LinkedIn",
    },
    {
      href: "https://github.com",
      icon: Github,
      color: "#ffffff",
      label: "GitHub",
    },
    {
      href: "mailto:kmalharbi.c@gmail.com?subject=استفسار%20عن%20خدمات%20الأمن%20السيبراني",
      icon: Mail,
      color: "#ff00cc",
      label: "Email",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[998] flex flex-col items-center gap-3 pointer-events-none">
      {/* Floating items */}
      {open && (
        <div
          className="flex flex-col gap-3 pointer-events-auto"
        >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={item.label}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className="w-12 h-12 rounded-full bg-surface border border-edge flex items-center justify-center transition-all duration-300 hover:scale-110"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = item.color;
                (e.currentTarget as HTMLElement).style.color = item.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.color = "";
              }}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "إغلاق القائمة" : "فتح قائمة التواصل"}
        className="w-14 h-14 rounded-full bg-neon-blue text-white flex items-center justify-center shadow-[0_0_18px_var(--neon-blue)] hover:scale-110 transition-transform pointer-events-auto"
      >
        {open ? <X size={24} /> : <Share2 size={24} />}
      </button>
    </div>
  );
}
