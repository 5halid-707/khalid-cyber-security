"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MessagesSquare, ShieldCheck, BadgeCheck } from "lucide-react";

const WORDS = [
  "أحمي شبكتك من الاختراق...",
  "أكشف ثغرات أنظمتك قبل المهاجمين...",
  "أؤمّن بياناتك الحساسة احترافياً...",
  "أبني درعاً سيبرانياً لا يُخترق...",
];

export default function Hero() {
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = WORDS[indexRef.current];
      if (deletingRef.current) {
        charRef.current -= 1;
        setText(current.substring(0, charRef.current));
      } else {
        charRef.current += 1;
        setText(current.substring(0, charRef.current));
      }

      let speed = deletingRef.current ? 45 : 95;

      if (!deletingRef.current && charRef.current === current.length) {
        speed = 2200;
        deletingRef.current = true;
      } else if (deletingRef.current && charRef.current === 0) {
        deletingRef.current = false;
        indexRef.current = (indexRef.current + 1) % WORDS.length;
        speed = 500;
      }

      timeout = setTimeout(tick, speed);
    };

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 cyber-grid-bg overflow-hidden"
    >
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-khalid.png)" }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(rgba(5,8,15,0.92), rgba(5,8,15,0.96)), radial-gradient(circle at 50% 30%, rgba(0,255,204,0.15), transparent 60%)",
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 right-[15%] w-40 h-40 rounded-full bg-neon-green/10 blur-3xl animate-glow-pulse z-0" />
      <div className="absolute bottom-1/4 left-[15%] w-52 h-52 rounded-full bg-neon-blue/10 blur-3xl animate-glow-pulse z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl">
        {/* CPD credential badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-neon-green/40 bg-neon-green/5 backdrop-blur-sm">
          <BadgeCheck size={16} className="text-neon-green" />
          <span className="text-xs md:text-sm text-neon-green font-medium">
            معتمد CPD — المملكة المتحدة • 250 ساعة تدريب
          </span>
        </div>

        <p className="mono-tech text-sm md:text-base text-neon-green/80 mb-4 tracking-widest">
          {"// CYBER SECURITY ENGINEER"}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-glow-white mb-3 leading-tight">
          م. خالد الحربي
        </h1>

        <p className="text-lg md:text-2xl text-fg/70 font-medium mb-8">
          مهندس أمن سيبراني • خبير حماية البيانات والشبكات
        </p>

        <div className="h-12 md:h-14 mb-10 flex justify-center">
          <div
            dir="rtl"
            className="mono-tech text-2xl md:text-3xl text-neon-green border-r-4 border-neon-green pr-3 cursor-blink min-h-[1.2em]"
            style={{ textShadow: "0 0 8px rgba(0,255,204,0.7)" }}
          >
            {text}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 bg-neon-green text-[#05080f] font-bold px-8 py-3 rounded-md shadow-[0_0_15px_rgba(0,255,204,0.4)] hover:shadow-[0_0_25px_rgba(0,255,204,0.7)] hover:-translate-y-0.5 transition-all"
          >
            <ShieldCheck size={18} />
            اكتشف خدماتي
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-neon-blue text-neon-blue font-bold px-8 py-3 rounded-md hover:bg-neon-blue/10 transition-all"
          >
            <MessagesSquare size={18} />
            تواصل معي
          </a>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-14">
          {[
            { num: "250+", label: "ساعة تدريب CPD" },
            { num: "3", label: "منصات معتمدة" },
            { num: "6", label: "باقات خدمات" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-4xl font-black text-neon-green mono-tech">
                {s.num}
              </div>
              <div className="text-xs md:text-sm text-fg/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-fg/40">
        <span className="text-xs mono-tech">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-neon-green to-transparent" />
      </div>
    </section>
  );
}
