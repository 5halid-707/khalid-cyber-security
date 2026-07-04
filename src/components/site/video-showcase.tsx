"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, ShoppingBag, Globe, Film, Megaphone, Bug } from "lucide-react";
import Reveal from "./reveal";
import { useI18n } from "./i18n";

const SERVICES = [
  { icon: ShieldCheck, color: "var(--neon-green)", ar: "أمن الشبكات", en: "Network Security" },
  { icon: ShoppingBag, color: "var(--neon-blue)", ar: "تصميم المتاجر", en: "Store Design" },
  { icon: Globe, color: "var(--neon-pink)", ar: "المواقع الإلكترونية", en: "Websites" },
  { icon: Film, color: "var(--neon-green)", ar: "المونتاج", en: "Video Editing" },
  { icon: Megaphone, color: "var(--neon-blue)", ar: "التسويق الإلكتروني", en: "Digital Marketing" },
  { icon: Bug, color: "var(--neon-pink)", ar: "اختبار الاختراق", en: "Penetration Testing" },
];

export default function VideoShowcase({ videoSrc }: { videoSrc?: string }) {
  const { lang, t } = useI18n();
  const isAr = lang === "ar";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const goFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };

  return (
    <section id="showcase-video" className="py-24 px-5 relative">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center mb-12">
          <p className="mono-tech text-xs text-neon-pink/70 tracking-[0.3em] mb-3">
            {"// MARKETING SHOWCASE"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {isAr ? "مقطع تسويقي لأعمالي" : "Marketing Showcase Video"}
          </h2>
          <p className="text-fg/60 max-w-2xl mx-auto mb-5">
            {isAr
              ? "جولة سريعة على جميع خدماتي — من أمن الشبكات إلى تصميم المتاجر والمونتاج والتسويق"
              : "A quick tour of all my services — from network security to store design, editing, and marketing"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-pink rounded-full shadow-[0_0_10px_var(--neon-pink)]" />
        </Reveal>

        {/* Video player */}
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden border-2 border-neon-pink/40 shadow-[0_0_40px_rgba(255,0,204,0.15)] group">
            {videoSrc ? (
              <>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full aspect-video bg-black object-cover"
                  loop
                  muted={muted}
                  playsInline
                  preload="metadata"
                  poster=""
                />
                {/* Custom controls overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        aria-label={playing ? "Pause" : "Play"}
                        className="w-10 h-10 rounded-full bg-neon-pink text-white flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        {playing ? <Pause size={18} /> : <Play size={18} className="mr-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        aria-label={muted ? "Unmute" : "Mute"}
                        className="w-9 h-9 rounded-full bg-surface/80 border border-edge text-white flex items-center justify-center hover:border-neon-pink transition-colors"
                      >
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                    <button
                      onClick={goFullscreen}
                      aria-label="Fullscreen"
                      className="w-9 h-9 rounded-full bg-surface/80 border border-edge text-white flex items-center justify-center hover:border-neon-pink transition-colors"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
                {/* Play button overlay when paused */}
                {!playing && (
                  <button
                    onClick={togglePlay}
                    aria-label="Play video"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                  >
                    <span className="w-20 h-20 rounded-full bg-neon-pink/90 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,204,0.6)] hover:scale-110 transition-transform">
                      <Play size={32} className="text-white ml-1" />
                    </span>
                  </button>
                )}
              </>
            ) : (
              /* Placeholder when video not yet generated */
              <div className="aspect-video bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] flex flex-col items-center justify-center gap-4 p-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-neon-pink/30 border-t-neon-pink animate-spin" />
                  <Play size={28} className="text-neon-pink/50 absolute inset-0 m-auto" />
                </div>
                <p className="text-neon-pink mono-tech text-sm tracking-widest">
                  {isAr ? "// جاري تجهيز المقطع التسويقي //" : "// PREPARING MARKETING VIDEO //"}
                </p>
                <p className="text-fg/50 text-xs text-center max-w-md">
                  {isAr
                    ? "سيكون المقطع جاهزاً قريباً — يغطي أمن الشبكات، تصميم المتاجر، المواقع، المونتاج، التسويق، والاختراق"
                    : "Video coming soon — covers network security, store design, websites, editing, marketing, and penetration testing"}
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {/* Services covered grid */}
        <Reveal className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.en}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface/60 border border-edge hover:border-neon-pink/40 transition-colors text-center"
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center border"
                    style={{
                      borderColor: `${s.color}50`,
                      backgroundColor: `${s.color}10`,
                    }}
                  >
                    <Icon size={18} style={{ color: s.color }} />
                  </span>
                  <span className="text-[11px] text-fg/70 font-medium">
                    {isAr ? s.ar : s.en}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
